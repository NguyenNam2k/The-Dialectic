import React, { useState, useEffect } from 'react';
import JournalCover from './components/JournalCover';
import ArticleReader from './components/ArticleReader';
import DebateRoundtable from './components/DebateRoundtable';
import ReaderAssessment from './components/ReaderAssessment';
import AmbientBackground from './components/AmbientBackground';
import NewsTicker from './components/NewsTicker';
import { toggleSound, isSoundEnabled, playSoftClick } from './utils/soundEffects';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [selectedChapterId, setSelectedChapterId] = useState(1);

  const [data, setData] = useState({ chapters: [], flashcards: [] });
  const [progress, setProgress] = useState({
    xp: 0,
    level: 1,
    learnedChapters: [],
    debateCompleted: [],
    quizHistory: []
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const validViews = ['dashboard', 'reader', 'debate', 'assessment'];
    const currentHash = window.location.hash.replace('#', '');
    const initialView = validViews.includes(currentHash) ? currentHash : 'dashboard';

    setView(initialView);
    window.history.replaceState({ view: initialView, selectedChapterId: 1 }, '', `#${initialView}`);

    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        setView(event.state.view);
        if (event.state.selectedChapterId) {
          setSelectedChapterId(event.state.selectedChapterId);
        }
      } else {
        const hash = window.location.hash.replace('#', '');
        if (validViews.includes(hash)) {
          setView(hash);
        } else {
          setView('dashboard');
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const changeView = (newView, chapterId = selectedChapterId) => {
    playSoftClick();
    setView(newView);
    if (chapterId) setSelectedChapterId(chapterId);
    window.history.pushState({ view: newView, selectedChapterId: chapterId }, '', `#${newView}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeSelectedChapter = (chId) => {
    playSoftClick();
    setSelectedChapterId(chId);
    setView('reader');
    window.history.pushState({ view: 'reader', selectedChapterId: chId }, '', `#reader`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    async function init() {
      try {
        const dataRes = await fetch('/api/data');
        const dataJson = await dataRes.json();
        setData(dataJson);

        const progRes = await fetch('/api/progress');
        const progJson = await progRes.json();
        setProgress(progJson);
      } catch (error) {
        console.error('Error connecting to backend:', error);
      } finally {
        setLoading(false);
      }
    }
    init();

    const savedTheme = localStorage.getItem('ss_theme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      }
    } else {
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    playSoftClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('ss_theme', nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playSoftClick();
  };

  const saveProgress = async (newProgress) => {
    setProgress(newProgress);
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProgress)
      });
    } catch (e) {
      console.error('Failed to sync progress:', e);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0c080b', color: '#fff', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#be123c', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Đang nạp tòa soạn Dialectic...</p>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  const renderActiveView = () => {
    switch (view) {
      case 'dashboard':
        return (
          <JournalCover
            progress={progress}
            data={data}
            setView={changeView}
            setSelectedChapterId={changeSelectedChapter}
          />
        );
      case 'reader':
        return (
          <ArticleReader
            progress={progress}
            data={data}
            selectedChapterId={selectedChapterId}
            setSelectedChapterId={changeSelectedChapter}
            saveProgress={saveProgress}
            setView={changeView}
          />
        );
      case 'debate':
        return (
          <DebateRoundtable
            progress={progress}
            saveProgress={saveProgress}
            setView={changeView}
          />
        );
      case 'assessment':
        return (
          <ReaderAssessment
            progress={progress}
            data={data}
            saveProgress={saveProgress}
            setView={changeView}
            setSelectedChapterId={changeSelectedChapter}
          />
        );
      default:
        return <div>Lỗi: Không tìm thấy phân hệ chuyên khảo.</div>;
    }
  };

  return (
    <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
      <AmbientBackground theme={theme} />
      <header className="header">
        <div className="header-content">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={() => changeView('dashboard')}>
            <span className="logo-icon">D</span>
            <div className="logo-text">
              <h1>THE DIALECTIC</h1>
              <p>Tạp chí học thuật điện tử</p>
            </div>
          </div>

          <nav className="nav-links">
            <button className={`nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => changeView('dashboard')}>Trang bìa</button>
            <button className={`nav-item ${view === 'reader' ? 'active' : ''}`} onClick={() => changeView('reader')}>Chuyên khảo</button>
            <button className={`nav-item ${view === 'debate' ? 'active' : ''}`} onClick={() => changeView('debate')}>Bàn tròn khoa học</button>
            <button className={`nav-item ${view === 'assessment' ? 'active' : ''}`} onClick={() => changeView('assessment')}>Tự đánh giá</button>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                border: '1.5px double var(--accent-gold)', 
                padding: '0.2rem 0.8rem', 
                fontSize: '0.8rem', 
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span>Scholar Lvl {progress.level}</span>
            </div>
            <button onClick={handleToggleSound} className="theme-toggle" title={soundOn ? "Tắt âm tương tác" : "Bật âm tương tác"}>
              {soundOn ? '🔊' : '🔇'}
            </button>
            <button onClick={toggleTheme} className="theme-toggle" title={theme === 'dark' ? "Chuyển giao diện Sáng" : "Chuyển giao diện Tối"}>
              {theme === 'dark' ? '☀' : '🌙'}
            </button>
          </div>
        </div>
        <NewsTicker />
      </header>
      <main className="main-content">
        {renderActiveView()}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>THE DIALECTIC · Chuyên san Nghiên cứu & Ứng dụng Học tập Chủ nghĩa xã hội khoa học</p>
          <p style={{ marginTop: '0.35rem', fontSize: '0.7rem', opacity: 0.6 }}>&copy; 2026 Biên soạn bởi Nhóm Học tập Đại học. Toàn bộ nội dung dựa trên giáo trình chuẩn quốc gia.</p>
        </div>
      </footer>
    </div>
  );
}
