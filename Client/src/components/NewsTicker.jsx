import React, { useState, useEffect } from 'react';

const newsItems = [
  "⚡ NĂM 1848: Tuyên ngôn của Đảng Cộng sản công bố tại Luân Đôn — Cương lĩnh chính trị đầu tiên của giai cấp vô sản thế giới.",
  "📜 THỰC TIỄN BIỆN CHỨNG: Lực lượng sản xuất phát triển là mầm mống phá vỡ quan hệ sản xuất lỗi thời.",
  "💡 C.MÁC: 'Các nhà triết học chỉ giải thích thế giới bằng nhiều cách khác nhau, vấn đề là cải tạo thế giới.'",
  "🇻🇳 VIỆT NAM 1986: Đại hội VI khởi xướng công cuộc Đổi mới, mở đường cho Kinh tế thị trường định hướng XHCN.",
  "🔬 KHOA HỌC TỰ NHIÊN: Học thuyết tiến hóa của Darwin & Định luật bảo toàn năng lượng — 2 trong 3 tiền đề KHTN của CNXHKH.",
  "⚖️ V.I.LÊNIN: 'Liên hiệp công nhân tất cả các dân tộc' — Cương lĩnh giải quyết vấn đề dân tộc toàn cầu."
];

export default function NewsTicker() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % newsItems.length);
        setFade(true);
      }, 300);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      style={{ 
        borderBottom: '1px solid var(--border-color)', 
        backgroundColor: 'var(--accent-burgundy-glow)', 
        padding: '0.4rem 2rem',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        overflow: 'hidden',
        transition: 'background-color 0.4s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap', fontWeight: 'bold', color: 'var(--accent-burgundy)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.7rem' }}>
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-burgundy)', animation: 'pulseDot 1.5s infinite' }}></span>
        BẢN TIN LÝ LUẬN
      </div>

      <div style={{ flex: 1, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', color: 'var(--text-primary)', fontStyle: 'italic', transition: 'opacity 0.3s ease', opacity: fade ? 1 : 0 }}>
        {newsItems[index]}
      </div>

      <style>{`
        @keyframes pulseDot {
          0% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
