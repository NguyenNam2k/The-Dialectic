import React, { useState, useEffect, useRef } from 'react';
import { playSoftClick, playSuccessChime } from '../utils/soundEffects';

// High-precision Fisher-Yates (Knuth) Shuffle Algorithm
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ReaderAssessment({ progress, data, saveProgress, setView, setSelectedChapterId }) {
  const { chapters = [], flashcards = [] } = data;

  const [setup, setSetup] = useState({
    chapter: 'all',
    count: 20,
    mode: 'practice'
  });

  const [status, setStatus] = useState('setup');
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [practiceChecked, setPracticeChecked] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const [durationSecs, setDurationSecs] = useState(0);

  const [report, setReport] = useState(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const buildQuestionPool = (chapterValue) => {
    let candidateCards = [];
    if (chapterValue === 'all') {
      candidateCards = [...flashcards];
    } else {
      const chapterId = Number(chapterValue);
      candidateCards = flashcards.filter(f => f.chapter === chapterId);
    }

    // Double-pass Fisher-Yates shuffle on the question order
    const shuffledQuestions = shuffle(shuffle(candidateCards));

    return shuffledQuestions.map((card) => {
      // Pick 3 unique distractors from the global flashcard pool
      const otherCards = flashcards.filter(item => item.back !== card.back);
      const shuffledOthers = shuffle(shuffle(otherCards));
      
      const distractors = [];
      for (let item of shuffledOthers) {
        if (!distractors.includes(item.back) && item.back !== card.back) {
          distractors.push(item.back);
        }
        if (distractors.length === 3) break;
      }

      // Combine correct answer + 3 distractors
      const rawOptions = [card.back, ...distractors];
      // Triple-pass shuffle on A, B, C, D option positions
      const options = shuffle(shuffle(shuffle(rawOptions)));
      
      const prompt = card.front.startsWith('Nhận diện nội dung:')
        ? `Khái niệm hoặc nội dung nào phù hợp với mô tả sau? ${card.front.replace('Nhận diện nội dung:', '').trim()}`
        : card.front;

      return {
        chapter: card.chapter,
        q: prompt,
        options,
        answer: options.indexOf(card.back),
        explain: card.back
      };
    });
  };

  const handleStart = () => {
    playSoftClick();
    const pool = buildQuestionPool(setup.chapter);
    const count = Math.min(setup.count, pool.length);
    const selectedQuestions = pool.slice(0, count);

    if (selectedQuestions.length === 0) {
      alert('Không đủ câu hỏi trong ngân hàng để tạo bài đánh giá.');
      return;
    }

    setQuestions(selectedQuestions);
    setUserAnswers({});
    setCurrentIdx(0);
    setPracticeChecked(false);
    setStatus('session');

    const totalTime = count * 45;
    setTimeLeft(totalTime);
    setDurationSecs(totalTime);
    startTimeRef.current = Date.now();

    if (setup.mode === 'exam') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const submitExam = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    playSuccessChime();
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);

    const answersList = questions.map((q, idx) => {
      const chosen = userAnswers[idx];
      return {
        chapter: q.chapter,
        q: q.q,
        isCorrect: chosen === q.answer
      };
    });

    const correctCount = answersList.filter(a => a.isCorrect).length;
    const score = Math.round((correctCount / questions.length) * 100);

    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score,
          totalQuestions: questions.length,
          duration: timeSpent,
          answers: answersList
        })
      });

      const result = await res.json();
      if (result.success) {
        setReport({
          score,
          correctCount,
          totalQuestions: questions.length,
          timeSpent,
          xpGained: result.xpGained,
          newLevel: result.newLevel,
          levelUp: result.levelUp,
          weakChapters: result.weakChapters
        });
        
        saveProgress({
          ...progress,
          xp: (progress.xp || 0) + result.xpGained,
          level: result.newLevel,
          quizHistory: [result.record, ...(progress.quizHistory || [])].slice(0, 50)
        });
        setStatus('report');
      }
    } catch (err) {
      console.error(err);
      const chStats = {};
      answersList.forEach(ans => {
        if (!chStats[ans.chapter]) chStats[ans.chapter] = { total: 0, correct: 0 };
        chStats[ans.chapter].total++;
        if (ans.isCorrect) chStats[ans.chapter].correct++;
      });
      const weak = [];
      Object.keys(chStats).forEach(c => {
        const rate = chStats[c].correct / chStats[c].total;
        if (rate < 0.7) {
          weak.push({
            chapterId: Number(c),
            correct: chStats[c].correct,
            total: chStats[c].total,
            rate: Math.round(rate * 100)
          });
        }
      });

      const xpGained = correctCount * 10;
      const nextXp = (progress.xp || 0) + xpGained;
      const nextLevel = Math.floor(Math.sqrt(nextXp / 100)) + 1;
      const quizRec = {
        date: new Date().toISOString(),
        score,
        totalQuestions: questions.length,
        duration: timeSpent,
        xpGained,
        weakChapters: weak
      };

      setReport({
        score,
        correctCount,
        totalQuestions: questions.length,
        timeSpent,
        xpGained,
        newLevel: nextLevel,
        levelUp: nextLevel > (progress.level || 1),
        weakChapters: weak
      });

      saveProgress({
        ...progress,
        xp: nextXp,
        level: nextLevel,
        quizHistory: [quizRec, ...(progress.quizHistory || [])].slice(0, 50)
      });
      setStatus('report');
    }
  };

  const handleSelectOption = (idx) => {
    if (setup.mode === 'practice' && practiceChecked) return;
    playSoftClick();
    setUserAnswers({ ...userAnswers, [currentIdx]: idx });
  };

  const handlePracticeCheck = () => {
    playSoftClick();
    setPracticeChecked(true);
  };

  const handleNext = () => {
    playSoftClick();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setPracticeChecked(false);
    }
  };

  const handlePrev = () => {
    playSoftClick();
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setPracticeChecked(false);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalBankSize = flashcards.length || 490;

  if (status === 'setup') {
    return (
      <div className="exam-container page-transition">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          {setView && (
            <button className="btn btn-secondary" onClick={() => { playSoftClick(); setView('dashboard'); }} style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}>
              ← Quay lại Trang bìa
            </button>
          )}
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>
            📚 Ngân hàng {totalBankSize} câu hỏi độc lập
          </span>
        </div>

        <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', border: '1px solid var(--border-color)' }}>
          <span className="article-cat">Đọc hiểu & Khảo luận</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
            Tự Đánh Giá Độc Giả
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Hệ thống ngẫu nhiên hóa ngẫu nhiên 100% thứ tự câu hỏi và thứ tự vị trí đáp án (A, B, C, D) từ ngân hàng <strong>{totalBankSize} câu hỏi</strong> chuẩn quốc gia.
          </p>

          <div className="exam-config-row">
            <div className="select-wrapper">
              <label>Chuyên đề kiểm khảo</label>
              <select
                className="custom-select"
                value={setup.chapter}
                onChange={(e) => { playSoftClick(); setSetup({ ...setup, chapter: e.target.value }); }}
              >
                <option value="all">Toàn bộ 12 chuyên khảo ({totalBankSize} câu)</option>
                {chapters.map(ch => {
                  const countInCh = flashcards.filter(f => f.chapter === ch.id).length;
                  return (
                    <option key={ch.id} value={ch.id}>Chương {ch.id}: {ch.title} ({countInCh} câu)</option>
                  );
                })}
              </select>
            </div>

            <div className="select-wrapper">
              <label>Quy mô đánh giá</label>
              <select
                className="custom-select"
                value={setup.count}
                onChange={(e) => { playSoftClick(); setSetup({ ...setup, count: Number(e.target.value) }); }}
              >
                {[10, 20, 30, 50, 70, 100].map(c => (
                  <option key={c} value={c}>{c} câu ngẫu nhiên</option>
                ))}
              </select>
            </div>

            <div className="select-wrapper">
              <label>Phương thức thực hiện</label>
              <select
                className="custom-select"
                value={setup.mode}
                onChange={(e) => { playSoftClick(); setSetup({ ...setup, mode: e.target.value }); }}
              >
                <option value="practice">Đọc hiểu nhanh (Xem đáp án ngay)</option>
                <option value="exam">Đánh giá toàn diện (Bấm giờ)</option>
              </select>
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleStart} style={{ padding: '0.75rem 2rem', marginTop: '1rem' }}>
            Bắt đầu đọc hiểu ({setup.count} câu ngẫu nhiên)
          </button>
        </div>
      </div>
    );
  }

  if (status === 'session') {
    const q = questions[currentIdx];
    const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);
    const chosenOption = userAnswers[currentIdx];

    return (
      <div className="exam-container page-transition">
        <div className="exam-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>Phiếu Đọc Hiểu Tự Đánh Giá</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Bài viết số {q.chapter} · Câu hỏi đọc hiểu số {currentIdx + 1}
            </span>
          </div>

          {setup.mode === 'exam' && (
            <div className={`exam-timer ${timeLeft < 60 ? 'warning' : ''}`} style={{ fontSize: '1rem', padding: '0.3rem 0.75rem' }}>
              ⏱ {formatTime(timeLeft)}
            </div>
          )}
        </div>

        {/* Progress */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
          <span>Tiến trình: {currentIdx + 1} / {questions.length} câu</span>
          <span>Hoàn thành: {progressPercent}%</span>
        </div>
        <div className="exam-progress-bar-container" style={{ height: '4px', marginBottom: '1.75rem' }}>
          <div className="exam-progress-bar" style={{ width: `${progressPercent}%`, backgroundColor: 'var(--accent-burgundy)' }}></div>
        </div>

        {/* Question content */}
        <div className="card" style={{ border: '1px solid var(--border-color)', padding: '2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
            {q.q}
          </h3>

          <div className="options-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {q.options.map((opt, idx) => {
              const isSelected = chosenOption === idx;
              let optionClass = 'option-card';
              if (isSelected) optionClass += ' selected';

              if (setup.mode === 'practice' && practiceChecked) {
                if (idx === q.answer) optionClass += ' correct';
                else if (isSelected && idx !== q.answer) optionClass += ' incorrect';
              }

              return (
                <div
                  key={idx}
                  className={optionClass}
                  style={{
                    border: isSelected ? '1px solid var(--accent-burgundy)' : '1px solid var(--border-color)',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  onClick={() => handleSelectOption(idx)}
                >
                  <div className="option-index">{String.fromCharCode(65 + idx)}</div>
                  <div>{opt}</div>
                </div>
              );
            })}
          </div>

          {setup.mode === 'practice' && practiceChecked && (
            <div className="note-box" style={{ marginTop: '1.5rem' }}>
              <div className="note-box-title">💡 Giải thích lý luận:</div>
              <div className="note-box-body">{q.explain}</div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="exam-actions">
          <button
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={currentIdx === 0}
          >
            ← Câu trước
          </button>

          {setup.mode === 'practice' && !practiceChecked && chosenOption !== undefined && (
            <button className="btn btn-primary" onClick={handlePracticeCheck} style={{ backgroundColor: 'var(--accent-gold)' }}>
              Kiểm tra luận điểm
            </button>
          )}

          {currentIdx + 1 < questions.length ? (
            <button
              className="btn btn-secondary"
              onClick={handleNext}
              disabled={setup.mode === 'practice' && !practiceChecked && chosenOption !== undefined}
            >
              Câu tiếp theo →
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={submitExam}
              disabled={setup.mode === 'practice' && !practiceChecked && chosenOption !== undefined}
            >
              Gửi bài đánh giá
            </button>
          )}
        </div>
      </div>
    );
  }

  if (status === 'report') {
    const getChapterTitle = (chId) => {
      const ch = chapters.find(c => c.id === chId);
      return ch ? `Chương ${chId}: ${ch.title}` : `Chương ${chId}`;
    };

    return (
      <div className="exam-container page-transition">
        <div className="card" style={{ padding: '2.5rem', textAlign: 'center', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
          <span className="article-cat">Báo cáo phê bình độc giả</span>
          <div className="score-display" style={{ fontSize: '3.5rem', color: 'var(--accent-burgundy)', margin: '0.5rem 0' }}>
            {report.score}%
          </div>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            Tiếp thu đúng: <strong>{report.correctCount}</strong>/{report.totalQuestions} câu · Thời gian phân tích: <strong>{Math.floor(report.timeSpent / 60)}p {report.timeSpent % 60}s</strong>
          </h2>
          
          <div style={{ display: 'inline-block', backgroundColor: 'var(--accent-gold-glow)', padding: '0.4rem 1.25rem', borderRadius: '50px', border: '1px solid var(--accent-gold)', fontSize: '0.8rem' }}>
            🏆 Điểm luận thuyết tích lũy: <strong>+{report.xpGained} XP</strong>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="diagnostic-grid">
          {/* Weaknesses */}
          <div className="card" style={{ border: '1px solid var(--color-error)', background: 'rgba(239, 68, 68, 0.01)' }}>
            <h3 style={{ color: 'var(--color-error)', fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(239, 68, 68, 0.1)', paddingBottom: '0.25rem' }}>
              ⚠️ Chuyên luận cần đọc lại (Dưới 70%)
            </h3>
            {report.weakChapters.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: 'var(--color-success)', fontWeight: 'bold' }}>
                Ban Biên Tập Chúc Mừng! Khả năng tiếp thu nội dung của bạn đạt chuẩn toàn bộ chuyên mục!
              </p>
            ) : (
              <div className="weakness-list">
                {report.weakChapters.map((ch, idx) => (
                  <div key={idx} className="weakness-item" style={{ backgroundColor: 'transparent', paddingLeft: '0.5rem', borderLeftColor: 'var(--color-error)' }}>
                    <a
                      href="#read"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedChapterId(ch.chapterId);
                        setView('reader');
                      }}
                      style={{ fontWeight: 'bold', color: 'var(--accent-burgundy)', textDecoration: 'underline' }}
                    >
                      {getChapterTitle(ch.chapterId)}
                    </a>
                    <p>Tỉ lệ chính xác: {ch.correct}/{ch.total} câu ({ch.rate}%)</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Strengths */}
          <div className="card" style={{ border: '1px solid var(--color-success)', background: 'rgba(16, 185, 129, 0.01)' }}>
            <h3 style={{ color: 'var(--color-success)', fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(16, 185, 129, 0.1)', paddingBottom: '0.25rem' }}>
              ✓ Chuyên luận đã tiếp thu tốt (Từ 70%)
            </h3>
            {report.weakChapters.length === report.totalQuestions ? (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Chưa có chuyên mục nào đạt tỷ lệ tiếp thu xuất sắc.</p>
            ) : (
              <div className="strength-list">
                {chapters.filter(ch => {
                  const weakCh = report.weakChapters.find(wc => wc.chapterId === ch.id);
                  const wasInTest = questions.some(q => q.chapter === ch.id);
                  return wasInTest && !weakCh;
                }).map(ch => (
                  <div key={ch.id} className="strength-item" style={{ backgroundColor: 'transparent', paddingLeft: '0.5rem', borderLeftColor: 'var(--color-success)' }}>
                    <strong>{getChapterTitle(ch.id)}</strong>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Đạt chuẩn đánh giá độc giả của ban biên tập.</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => setStatus('setup')}>
            Làm bài khảo sát khác
          </button>
          <button className="btn btn-secondary" onClick={() => setView('dashboard')}>
            Quay lại Trang bìa
          </button>
        </div>
      </div>
    );
  }

  return null;
}
