const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data', 'data.json');
const DB_FILE = path.join(__dirname, 'data', 'database.json');

if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

if (!fs.existsSync(DB_FILE)) {
  const initialDb = {
    xp: 0,
    level: 1,
    learnedChapters: [],
    debateCompleted: [],
    quizHistory: [],
    bookmarks: []
  };
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf8');
  } catch (e) {}
}

function getData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading data.json:', err);
  }
  return { chapters: [], flashcards: [] };
}

function getProgress() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading database.json:', err);
  }
  return { xp: 0, level: 1, learnedChapters: [], debateCompleted: [], quizHistory: [], bookmarks: [] };
}

function saveProgress(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing database.json:', err);
  }
}

app.get('/api/data', (req, res) => {
  res.json(getData());
});

app.get('/api/progress', (req, res) => {
  res.json(getProgress());
});

app.post('/api/progress', (req, res) => {
  saveProgress(req.body);
  res.json({ success: true, progress: req.body });
});

app.post('/api/quiz/submit', (req, res) => {
  const { score = 0, totalQuestions = 0, duration = 0, answers = [] } = req.body;
  let progress = getProgress();

  const weakChapters = [];
  if (answers && Array.isArray(answers)) {
    const chapterStats = {};
    answers.forEach(a => {
      if (!chapterStats[a.chapter]) chapterStats[a.chapter] = { total: 0, correct: 0 };
      chapterStats[a.chapter].total++;
      if (a.isCorrect) chapterStats[a.chapter].correct++;
    });

    Object.keys(chapterStats).forEach(c => {
      const stat = chapterStats[c];
      const rate = stat.correct / stat.total;
      if (rate < 0.7) {
        weakChapters.push({
          chapterId: Number(c),
          rate: Math.round(rate * 100),
          total: stat.total,
          correct: stat.correct
        });
      }
    });
  }

  const xpGained = Math.round(score * 0.8) + 20;
  const nextXp = (progress.xp || 0) + xpGained;
  const nextLevel = Math.floor(Math.sqrt(nextXp / 100)) + 1;

  const record = {
    date: new Date().toISOString(),
    score,
    totalQuestions,
    duration,
    xpGained,
    weakChapters
  };

  progress.xp = nextXp;
  progress.level = nextLevel;
  progress.quizHistory = [record, ...(progress.quizHistory || [])].slice(0, 50);

  saveProgress(progress);

  res.json({
    success: true,
    xpGained,
    newLevel: nextLevel,
    levelUp: nextLevel > (progress.level || 1),
    weakChapters,
    record
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Server] Server is running on port ${PORT}`);
  });
}

module.exports = app;
