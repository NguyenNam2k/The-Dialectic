import React, { useState, useEffect } from 'react';
import InfographicLab from './InfographicLab';
import { playSoftClick, playSuccessChime } from '../utils/soundEffects';

const globalFootnotes = {
  'chủ nghĩa xã hội khoa học': {
    title: 'Chủ nghĩa xã hội khoa học (Scientific Socialism)',
    body: 'Một trong ba bộ phận hợp thành chủ nghĩa Mác - Lênin, trực tiếp nghiên cứu quy luật chính trị - xã hội của sự chuyển biến tất yếu lên chủ nghĩa xã hội và chủ nghĩa cộng sản.'
  },
  'lực lượng sản xuất': {
    title: 'Lực lượng sản xuất (Productive Forces)',
    body: 'Biểu hiện quan hệ giữa con người với tự nhiên trong quá trình sản xuất. LLSX bao gồm người lao động với những kỹ năng sản xuất và tư liệu sản xuất, trước hết là công cụ lao động.'
  },
  'quan hệ sản xuất': {
    title: 'Quan hệ sản xuất (Relations of Production)',
    body: 'Quan hệ giữa người với người trong quá trình sản xuất vật chất, bao gồm quan hệ sở hữu tư liệu sản xuất, quan hệ tổ chức quản lý và quan hệ phân phối sản phẩm.'
  },
  'sứ mệnh lịch sử': {
    title: 'Sứ mệnh lịch sử (Historical Mission)',
    body: 'Nhiệm vụ tất yếu do vị thế kinh tế - xã hội khách quan quy định đối với một giai cấp để cải tạo xã hội cũ và thiết lập xã hội mới tiến bộ hơn.'
  },
  'giá trị thặng dư': {
    title: 'Giá trị thặng dư (Surplus Value)',
    body: 'Phần giá trị do lao động hao phí của công nhân làm thuê tạo ra ngoài giá trị sức lao động và bị nhà tư bản chiếm đoạt không công.'
  },
  'chuyên chính vô sản': {
    title: 'Chuyên chính vô sản (Dictatorship of the Proletariat)',
    body: 'Nhà nước kiểu mới của giai cấp công nhân và nhân dân lao động thiết lập sau khi lật đổ chính quyền tư sản, thực hiện dân chủ với đại đa số nhân dân và trấn áp thiểu số áp bức.'
  },
  'giai cấp công nhân': {
    title: 'Giai cấp công nhân (The Working Class)',
    body: 'Tập đoàn xã hội ổn định, hình thành và phát triển cùng với quá trình phát triển của nền công nghiệp hiện đại; họ là lực lượng sản xuất cơ bản và tiên phong nhất.'
  }
};

export default function ArticleReader({ progress, data, selectedChapterId, setSelectedChapterId, saveProgress, setView }) {
  const { chapters = [] } = data;
  const [activeNoteKey, setActiveNoteKey] = useState(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  // E-Book Reader Controls State
  const [fontSize, setFontSize] = useState(17); // 15, 17, 20, 23
  const [fontFamily, setFontFamily] = useState('serif'); // 'serif', 'sans', 'mono'
  const [zenMode, setZenMode] = useState(false); // Focus mode hiding sidebars

  const currentChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercent(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!currentChapter) return <div>Đang tải e-book bài viết...</div>;

  const isLearned = (progress.learnedChapters || []).includes(selectedChapterId);
  const isBookmarked = (progress.bookmarks || []).includes(selectedChapterId);

  const handleMarkAsRead = () => {
    playSuccessChime();
    let newLearned = [...(progress.learnedChapters || [])];
    let xpGained = 0;
    
    if (isLearned) {
      newLearned = newLearned.filter(id => id !== selectedChapterId);
    } else {
      newLearned.push(selectedChapterId);
      xpGained = 50;
    }

    const nextXp = (progress.xp || 0) + xpGained;
    const nextLevel = Math.floor(Math.sqrt(nextXp / 100)) + 1;

    saveProgress({
      ...progress,
      xp: nextXp,
      level: nextLevel,
      learnedChapters: newLearned
    });
  };

  const handleToggleBookmark = () => {
    playSoftClick();
    let newBookmarks = [...(progress.bookmarks || [])];
    if (isBookmarked) {
      newBookmarks = newBookmarks.filter(id => id !== selectedChapterId);
    } else {
      newBookmarks.push(selectedChapterId);
    }
    saveProgress({
      ...progress,
      bookmarks: newBookmarks
    });
  };

  const renderParagraphWithHotwords = (text) => {
    let result = [text];
    const words = Object.keys(globalFootnotes).sort((a,b) => b.length - a.length);

    words.forEach(word => {
      const newResult = [];
      result.forEach(chunk => {
        if (typeof chunk !== 'string') {
          newResult.push(chunk);
          return;
        }

        const parts = chunk.split(new RegExp(`(${word})`, 'gi'));
        parts.forEach((part, idx) => {
          if (part.toLowerCase() === word.toLowerCase()) {
            newResult.push(
              <span 
                key={`${word}-${idx}`} 
                className="hotword"
                onClick={() => {
                  playSoftClick();
                  setActiveNoteKey(word.toLowerCase());
                }}
              >
                {part}
              </span>
            );
          } else {
            if (part) newResult.push(part);
          }
        });
      });
      result = newResult;
    });

    return result;
  };

  const fontStyleFamily = fontFamily === 'sans' 
    ? 'var(--font-sans)' 
    : fontFamily === 'mono' 
    ? 'monospace' 
    : 'var(--font-serif)';

  return (
    <div className="reader-container page-transition" style={{ position: 'relative' }}>
      {/* Scroll Progress Bar Top Fixed */}
      <div 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: `${scrollPercent}%`, 
          height: '3.5px', 
          backgroundColor: 'var(--accent-burgundy)', 
          zIndex: 1000, 
          transition: 'width 0.15s ease-out' 
        }} 
      />

      {/* Main E-Book Article Container */}
      <article className="reader-article" style={{ gridColumn: zenMode ? '1 / -1' : undefined, margin: zenMode ? '0 auto' : undefined }}>
        {/* Navigation & E-Book Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={() => { playSoftClick(); setView('dashboard'); }} style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}>
            ← Quay lại Trang bìa
          </button>

          {/* E-Book Reader Controls Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '0.35rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem' }}>
            {/* Font Size Adjusters */}
            <button 
              onClick={() => { playSoftClick(); setFontSize(Math.max(14, fontSize - 2)); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 'bold' }}
              title="Giảm cỡ chữ"
            >
              A-
            </button>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <button 
              onClick={() => { playSoftClick(); setFontSize(Math.min(24, fontSize + 2)); }}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 'bold' }}
              title="Tăng cỡ chữ"
            >
              A+
            </button>
            <span style={{ color: 'var(--text-muted)' }}>|</span>

            {/* Font Family Toggle */}
            <select 
              value={fontFamily} 
              onChange={(e) => { playSoftClick(); setFontFamily(e.target.value); }}
              style={{ 
                backgroundColor: 'var(--bg-card)', 
                color: 'var(--text-primary)', 
                fontSize: '0.75rem', 
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                padding: '0.2rem 0.5rem',
                cursor: 'pointer', 
                outline: 'none' 
              }}
            >
              <option value="serif" style={{ backgroundColor: '#1c1317', color: '#f5f3f0' }}>Phông Chuyên khảo (Serif)</option>
              <option value="sans" style={{ backgroundColor: '#1c1317', color: '#f5f3f0' }}>Phông Hiện đại (Sans)</option>
              <option value="mono" style={{ backgroundColor: '#1c1317', color: '#f5f3f0' }}>Phông Báo cáo (Mono)</option>
            </select>
            <span style={{ color: 'var(--text-muted)' }}>|</span>

            {/* Zen Focus Mode Toggle */}
            <button 
              onClick={() => { playSoftClick(); setZenMode(!zenMode); }}
              style={{ background: 'none', border: 'none', color: zenMode ? 'var(--accent-burgundy)' : 'var(--text-primary)', cursor: 'pointer', fontWeight: 'bold' }}
              title="Bật/Tắt chế độ đọc tập trung Zen"
            >
              {zenMode ? '📖 Đọc chuẩn' : '🧘 Thả lỏng Zen'}
            </button>
            <span style={{ color: 'var(--text-muted)' }}>|</span>

            {/* Bookmark Button */}
            <button 
              onClick={handleToggleBookmark}
              style={{ background: 'none', border: 'none', color: isBookmarked ? 'var(--accent-gold)' : 'var(--text-muted)', cursor: 'pointer' }}
              title="Đánh dấu trang"
            >
              {isBookmarked ? '🔖 Đã lưu trang' : '🔖 Lưu trang'}
            </button>
          </div>

          <span className="reader-article-cat">Chương {currentChapter.id} / 12</span>
        </div>

        <div className="reader-article-header">
          <h1 className="reader-article-title">{currentChapter.title}</h1>
          <div className="reader-article-meta">
            E-Book Chuyên luận · {currentChapter.readTime || '8 phút đọc'} · Trang {currentChapter.page} · Chuyên mục Lý luận Triết học
          </div>
        </div>

        {/* E-Book Body with Dynamic Font Scaling */}
        <div className="reader-article-body" style={{ fontSize: `${fontSize}px`, fontFamily: fontStyleFamily, lineHeight: '1.75' }}>
          <p className="drop-cap" style={{ fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '2rem' }}>
            {renderParagraphWithHotwords(currentChapter.intro)}
          </p>

          {currentChapter.sections.map((sect, sIdx) => {
            const showPullQuote = sIdx === 1;

            return (
              <React.Fragment key={sIdx}>
                <h3 style={{ fontFamily: fontStyleFamily }}>{sect.title}</h3>
                <ul>
                  {sect.points.map((pt, pIdx) => (
                    <li key={pIdx} style={{ marginBottom: '0.8rem', listStyleType: 'square' }}>
                      {renderParagraphWithHotwords(pt)}
                    </li>
                  ))}
                </ul>

                {showPullQuote && currentChapter.review && currentChapter.review[0] && (
                  <blockquote className="pull-quote">
                    "{currentChapter.review[0]}"
                  </blockquote>
                )}
              </React.Fragment>
            );
          })}

          {selectedChapterId === 3 && (
            <div style={{ margin: '3rem 0' }}>
              <div style={{ borderTop: '2px solid var(--border-color)', borderBottom: '2px solid var(--border-color)', padding: '1.5rem 0' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-burgundy)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '0.5rem', textAlign: 'center' }}>
                  Minh họa Kỹ thuật số tích hợp
                </span>
                <InfographicLab progress={progress} saveProgress={saveProgress} />
              </div>
            </div>
          )}

          {/* Chapter Pagination Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', marginTop: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
              disabled={selectedChapterId === 1}
              onClick={() => {
                playSoftClick();
                setSelectedChapterId(selectedChapterId - 1);
                setActiveNoteKey(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              ← Chương trước
            </button>

            <button 
              className={`btn ${isLearned ? 'btn-secondary' : 'btn-primary'}`} 
              onClick={handleMarkAsRead}
              style={{ padding: '0.6rem 1.5rem' }}
            >
              {isLearned ? '✓ Đã đọc xong' : 'Xác nhận hoàn thành chương (+50 XP)'}
            </button>

            <button 
              className="btn btn-secondary" 
              style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
              disabled={selectedChapterId === chapters.length}
              onClick={() => {
                playSoftClick();
                setSelectedChapterId(selectedChapterId + 1);
                setActiveNoteKey(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Chương tiếp theo →
            </button>
          </div>
        </div>
      </article>

      {/* Right Column Sidebar (Hidden in Zen Mode) */}
      {!zenMode && (
        <div className="marginalia">
          <h3 className="sidebar-title" style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            📚 Mục lục E-Book 12 Chương
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '350px', overflowY: 'auto', marginBottom: '2rem', paddingRight: '0.5rem' }}>
            {chapters.map((ch) => {
              const isActive = ch.id === selectedChapterId;
              const isRead = (progress.learnedChapters || []).includes(ch.id);

              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    playSoftClick();
                    setSelectedChapterId(ch.id);
                    setActiveNoteKey(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: isActive ? '1px solid var(--accent-burgundy)' : '1px solid var(--border-color)',
                    backgroundColor: isActive ? 'var(--accent-burgundy-glow)' : 'var(--bg-card)',
                    color: isActive ? 'var(--accent-burgundy)' : 'var(--text-primary)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: isActive ? 'bold' : 'normal',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    Chương {ch.id}: {ch.title}
                  </span>
                  {isRead && <span style={{ color: 'var(--color-success)', fontWeight: 'bold', marginLeft: '0.4rem' }}>✓</span>}
                </button>
              );
            })}
          </div>

          <h3 className="sidebar-title" style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>Bản chú giải học thuật</h3>
          
          {activeNoteKey && globalFootnotes[activeNoteKey] ? (
            <div className="note-box">
              <div className="note-box-title">{globalFootnotes[activeNoteKey].title}</div>
              <div className="note-box-body">{globalFootnotes[activeNoteKey].body}</div>
              <button 
                onClick={() => { playSoftClick(); setActiveNoteKey(null); }}
                style={{ background: 'none', border: 'none', color: 'var(--accent-burgundy)', fontSize: '0.75rem', fontWeight: 'bold', marginTop: '0.75rem', cursor: 'pointer' }}
              >
                Đóng chú thích ×
              </button>
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic', lineHeight: '1.6' }}>
              Gợi ý: Độc giả có thể bấm vào các cụm từ được <span style={{ borderBottom: '1px dashed var(--accent-burgundy)', fontWeight: 'bold', color: 'var(--accent-burgundy)' }}>gạch chân nét đứt</span> trong văn bản để hiển thị chú giải học thuật chi tiết của thuật ngữ đó tại đây.
            </div>
          )}

          {currentChapter.review && (
            <div style={{ marginTop: '2.5rem' }}>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>
                Mối quan tâm biện chứng
              </h4>
              <ul style={{ listStyleType: 'circle', paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {currentChapter.review.map((rev, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>{rev}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
