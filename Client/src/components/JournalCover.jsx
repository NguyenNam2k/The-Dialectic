import React, { useState, useEffect } from 'react';
import DialecticTimeline from './DialecticTimeline';
import SocialistRadar from './SocialistRadar';
import { playSoftClick } from '../utils/soundEffects';

const rawQuotes = [
  { 
    text: "Bản chất của con người không phải là một cái gì trừu tượng vốn có của cá nhân riêng biệt. Trong tính hiện thực của nó, bản chất con người là tổng hòa những quan hệ xã hội.", 
    author: "C. Mác", 
    work: "Luận cương về Feuerbach, Luận cương VI (1845)" 
  },
  { 
    text: "Không có lý luận cách mạng thì không thể có phong trào cách mạng.", 
    author: "V.I. Lênin", 
    work: "Làm gì? (1902)" 
  },
  { 
    text: "Chủ nghĩa cộng sản là chính quyền Xô viết cộng với điện khí hóa toàn quốc.", 
    author: "V.I. Lênin", 
    work: "Vị thế đối nội và đối ngoại của chúng ta và nhiệm vụ của Đảng, 21/11/1920" 
  },
  { 
    text: "Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ.", 
    author: "Hồ Chí Minh", 
    work: "Toàn tập, tập 7, tr. 434" 
  },
  { 
    text: "Các nhà triết học chỉ giải thích thế giới bằng nhiều cách khác nhau, song vấn đề là cải tạo thế giới.", 
    author: "C. Mác", 
    work: "Luận cương về Feuerbach, Luận cương XI (1845)" 
  },
  { 
    text: "Học thuyết của Mác là học thuyết vạn năng vì nó là một học thuyết chính xác.", 
    author: "V.I. Lênin", 
    work: "Ba nguồn gốc và ba bộ phận hợp thành của chủ nghĩa Mác (1913)" 
  },
  { 
    text: "Giai cấp tư sản, trong quá trình thống trị giai cấp chưa đầy một thế kỷ, đã tạo ra những lực lượng sản xuất nhiều hơn và đồ sộ hơn lực lượng sản xuất của tất cả các thế hệ trước kia gộp lại.", 
    author: "C. Mác & Ph. Ăngghen", 
    work: "Tuyên ngôn của Đảng Cộng sản (1848)" 
  },
  { 
    text: "Thực hành dân chủ là cái chìa khoá vạn năng có thể giải quyết mọi khó khăn.", 
    author: "Hồ Chí Minh", 
    work: "Toàn tập, tập 15, tr. 293" 
  },
  { 
    text: "Học tập chủ nghĩa Mác - Lênin là học tập tinh thần, lập trường, quan điểm và phương pháp để vận dụng vào thực tiễn, không phải học thuộc lòng từng câu từng chữ.", 
    author: "Hồ Chí Minh", 
    work: "Bài nói tại Lớp huấn luyện đảng viên (1958)" 
  },
  { 
    text: "Tự do không phải là sự độc lập đối với các quy luật tự nhiên, mà là sự nhận thức được các quy luật đó để phục vụ cho mục đích của con người.", 
    author: "Ph. Ăngghen", 
    work: "Chống Đuy-rinh (1878)" 
  }
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function JournalCover({ progress, data, setView, setSelectedChapterId }) {
  const { chapters = [] } = data;
  const { xp = 0, level = 1, learnedChapters = [] } = progress;

  const [shuffledQuotes, setShuffledQuotes] = useState(() => shuffle(rawQuotes));
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [showExtendedChapters, setShowExtendedChapters] = useState(false);

  useEffect(() => {
    setShuffledQuotes(shuffle(rawQuotes));
    setQuoteIdx(0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % shuffledQuotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [shuffledQuotes.length]);

  const getScholarRank = (lvl) => {
    if (lvl < 3) return 'Độc giả Tập sự';
    if (lvl < 6) return 'Nghiên cứu sinh Biện chứng';
    if (lvl < 10) return 'Học giả Học thuyết Marx';
    return 'Viện sĩ CNXHKH';
  };

  const getChapterCategory = (id) => {
    switch(id) {
      case 1: return 'Nhập môn Triết học';
      case 2: return 'Chủ thể Lịch sử';
      case 3: return 'Hình thái Xã hội';
      case 4: return 'Thiết chế Chính trị';
      case 5: return 'Cơ cấu Xã hội';
      case 6: return 'Tôn giáo & Dân tộc';
      case 7: return 'Đời sống Xã hội';
      case 8: return 'Triết học Mác-xít';
      case 9: return 'Kinh tế Chính trị';
      case 10: return 'Kỷ nguyên AI & Số';
      case 11: return 'Văn hóa & Con người';
      case 12: return 'Việt Nam & 2045';
      default: return 'Lý luận học';
    }
  };

  const coverStory = chapters.find(c => c.id === 2) || chapters[0];
  const mainStories = chapters.filter(c => c.id <= 7);
  const extendedStories = chapters.filter(c => c.id > 7);

  const totalArticles = chapters.length || 12;
  const readCount = (learnedChapters || []).length;
  const percentRead = Math.round((readCount / totalArticles) * 100);

  const currentQuote = shuffledQuotes[quoteIdx] || rawQuotes[0];

  const handleNextQuote = () => {
    playSoftClick();
    setQuoteIdx((prev) => (prev + 1) % shuffledQuotes.length);
  };

  return (
    <div className="cover-container page-transition">
      <div>
        <div className="cover-masthead">
          <p className="cover-issue">Volume I · Tạp chí & E-Book Khảo luận Đặc biệt năm 2026</p>
          <h1 className="cover-title">THE DIALECTIC</h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent-burgundy)', fontWeight: 'bold' }}>
            Tạp chí Nghiên cứu & Khảo luận Chủ nghĩa xã hội khoa học
          </p>
        </div>

        {coverStory && (
          <div className="cover-hero-article card" style={{ padding: '2.5rem', border: '1px solid var(--border-color)', marginBottom: '2.5rem' }}>
            <span className="article-cat">{getChapterCategory(coverStory.id)}</span>
            <h2 className="cover-hero-title">
              {coverStory.title}
            </h2>
            <p className="cover-hero-intro">
              {coverStory.intro}
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                playSoftClick();
                setSelectedChapterId(coverStory.id);
                setView('reader');
              }}
            >
              Đọc chuyên luận tiêu điểm (Chương {coverStory.id}) →
            </button>
          </div>
        )}

        <DialecticTimeline />

        <div className="articles-list">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', textTransform: 'uppercase' }}>
              Mục lục 7 Chương Giáo trình Chuẩn
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>
              7 Chương Cốt lõi
            </span>
          </div>

          {mainStories.map((ch, idx) => (
            <div key={ch.id} className={`article-summary-card stagger-item stagger-${Math.min(idx + 1, 7)}`}>
              <div className="article-summary-content">
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span className="article-cat">{getChapterCategory(ch.id)}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>⏱ {ch.readTime || '8 phút đọc'}</span>
                </div>
                <h3 className="article-title-link" style={{ cursor: 'pointer' }} onClick={() => {
                  playSoftClick();
                  setSelectedChapterId(ch.id);
                  setView('reader');
                }}>
                  Chương {ch.id}: {ch.title}
                </h3>
                <p className="article-excerpt">
                  {ch.intro ? ch.intro.substring(0, 140) : ''}...
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    playSoftClick();
                    setSelectedChapterId(ch.id);
                    setView('reader');
                  }}
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                >
                  {(learnedChapters || []).includes(ch.id) ? '✓ Đọc lại' : 'Đọc bài'}
                </button>
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                playSoftClick();
                setShowExtendedChapters(!showExtendedChapters);
              }}
              style={{ 
                width: '100%', 
                padding: '0.75rem 1.5rem', 
                fontSize: '0.85rem',
                border: '1px dashed var(--accent-gold)',
                color: 'var(--accent-gold)',
                backgroundColor: 'var(--accent-gold-glow)'
              }}
            >
              {showExtendedChapters 
                ? '▲ Thu gọn 5 chuyên đề mở rộng' 
                : '▼ Xem thêm 5 chuyên đề lý luận mở rộng (Chương 8 - 12)'
              }
            </button>
          </div>

          {showExtendedChapters && (
            <div className="page-transition" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem', borderTop: '2px dashed var(--border-color)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--accent-gold)' }}>
                  Chuyên đề Mở rộng (Chương 8 - 12)
                </h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Chuyên sâu & Hiện đại</span>
              </div>

              {extendedStories.map((ch) => (
                <div key={ch.id} className="article-summary-card" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <div className="article-summary-content">
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <span className="article-cat">{getChapterCategory(ch.id)}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>⏱ {ch.readTime || '9 phút đọc'}</span>
                    </div>
                    <h3 className="article-title-link" style={{ cursor: 'pointer' }} onClick={() => {
                      playSoftClick();
                      setSelectedChapterId(ch.id);
                      setView('reader');
                    }}>
                      Chương {ch.id}: {ch.title}
                    </h3>
                    <p className="article-excerpt">
                      {ch.intro ? ch.intro.substring(0, 140) : ''}...
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => {
                        playSoftClick();
                        setSelectedChapterId(ch.id);
                        setView('reader');
                      }}
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                    >
                      {(learnedChapters || []).includes(ch.id) ? '✓ Đọc lại' : 'Đọc bài'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <SocialistRadar />
      </div>

      <div className="sidebar-panel">
        <div>
          <h3 className="sidebar-title">Lời nói đầu E-Book</h3>
          <p className="editorial-note">
            "Tập san & E-Book Biện chứng được biên soạn dưới dạng dòng chảy tạp chí học thuật lai sách điện tử. Toàn bộ kiến thức lý luận chuẩn quốc gia được trực quan hóa thành các biểu đồ động lực học lịch sử, biên bản đối thoại kiểm duyệt và bài khảo luận chuyên sâu."
          </p>
          <p className="editorial-note" style={{ textAlign: 'right', fontWeight: 'bold' }}>
            — Ban Biên Tập
          </p>
        </div>

        <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', margin: '2rem 0', backgroundColor: 'var(--bg-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-gold)' }}>
              💭 Trích dẫn Biện chứng ({quoteIdx + 1}/10)
            </span>
            <button 
              onClick={handleNextQuote}
              style={{ background: 'none', border: 'none', color: 'var(--accent-burgundy)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
            >
              🔄 Trích dẫn khác
            </button>
          </div>
          
          <blockquote key={currentQuote.text} className="page-transition" style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.5', margin: '0.5rem 0' }}>
            "{currentQuote.text}"
          </blockquote>
          
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--accent-burgundy)', fontWeight: 'bold', marginTop: '0.5rem' }}>
            — {currentQuote.author}, <span style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>{currentQuote.work}</span>
          </div>
        </div>

        <div className="card" style={{ border: '1px solid var(--border-color)', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Độ sâu Tri thức Độc giả (12 Chương)
          </h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            <span>Số chương đã tiếp thu</span>
            <strong>{readCount} / {totalArticles} chương</strong>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--border-color)', borderRadius: '10px', marginBottom: '1.5rem', overflow: 'hidden' }}>
            <div style={{ width: `${percentRead}%`, height: '100%', backgroundColor: 'var(--accent-burgundy)', transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>Cấp học vị:</span>
              <strong style={{ color: 'var(--accent-burgundy)' }}>{getScholarRank(level)} (Cấp {level})</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>Học điểm tích lũy:</span>
              <strong>{xp} Điểm luận thuyết</strong>
            </div>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1.5rem' }} 
            onClick={() => {
              playSoftClick();
              setView('assessment');
            }}
          >
            Tự Đánh Giá Độc Giả
          </button>
        </div>
      </div>
    </div>
  );
}
