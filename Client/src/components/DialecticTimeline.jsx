import React, { useState } from 'react';
import { playSoftClick } from '../utils/soundEffects';

const milestones = [
  {
    year: '1848',
    title: 'Tuyên ngôn của Đảng Cộng sản',
    tag: 'Khởi đầu Khoa học',
    summary: 'C.Mác & Ph.Ăngghen xuất bản Tuyên ngôn tại Luân Đôn, chuyển hóa Chủ nghĩa xã hội từ không tưởng thành khoa học chính thức.',
    stat: 'Phát kiến 3/3 vĩ đại'
  },
  {
    year: '1867',
    title: 'Xuất bản Bộ "Tư bản" (Das Kapital)',
    tag: 'Lý luận Kinh tế',
    summary: 'Mác công bố Tập 1 bộ Tư bản, luận giải quy luật vận động của phương thức sản xuất tư bản chủ nghĩa và học thuyết Giá trị thặng dư.',
    stat: 'Giải mã bóc lột tư bản'
  },
  {
    year: '1917',
    title: 'Cách mạng Tháng Mười Nga',
    tag: 'Thực tiễn Hiện thực',
    summary: 'Dưới sự lãnh đạo của V.I.Lênin và Đảng Bôn-sê-vích, nhà nước công nông đầu tiên trên thế giới ra đời, biến lý luận thành hiện thực.',
    stat: 'Nhà nước XHCN đầu tiên'
  },
  {
    year: '1945',
    title: 'Cách mạng Tháng Tám Việt Nam',
    tag: 'Giải phóng Dân tộc',
    summary: 'Chủ tịch Hồ Chí Minh và Đảng Cộng sản Việt Nam lãnh đạo nhân dân đập tan xiềng xích thực dân phong kiến, thành lập Nước VNDCCH.',
    stat: 'Mở đầu kỷ nguyên mới'
  },
  {
    year: '1986',
    title: 'Công cuộc Đổi mới Đất nước',
    tag: 'Vận dụng Sáng tạo',
    summary: 'Đại hội VI khởi xướng đường lối Đổi mới toàn diện, phát triển nền kinh tế thị trường định hướng XHCN, đưa đất nước hội nhập quốc tế.',
    stat: 'Kinh tế thị trường XHCN'
  }
];

export default function DialecticTimeline() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeItem = milestones[selectedIdx];

  const handleSelect = (idx) => {
    playSoftClick();
    setSelectedIdx(idx);
  };

  return (
    <div className="card" style={{ padding: '2rem', border: '1px solid var(--border-color)', margin: '2.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--accent-burgundy)' }}>
          🗓 Dòng thời gian Mốc lịch sử Biện chứng
        </h3>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-gold)', fontWeight: 'bold' }}>
          Khảo luận Tương tác
        </span>
      </div>

      {/* Timeline track nodes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', margin: '2rem 0', padding: '0 1rem' }}>
        {/* Track Line */}
        <div style={{ position: 'absolute', top: '50%', left: '2rem', right: '2rem', height: '3px', backgroundColor: 'var(--border-color)', transform: 'translateY(-50%)', zIndex: 1 }}>
          <div style={{ width: `${(selectedIdx / (milestones.length - 1)) * 100}%`, height: '100%', backgroundColor: 'var(--accent-burgundy)', transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
        </div>

        {/* Nodes */}
        {milestones.map((m, idx) => {
          const isActive = idx === selectedIdx;
          return (
            <button
              key={m.year}
              onClick={() => handleSelect(idx)}
              style={{
                zIndex: 2,
                background: isActive ? 'var(--accent-burgundy)' : 'var(--bg-card)',
                color: isActive ? '#fff' : 'var(--text-primary)',
                border: isActive ? '2px solid var(--accent-burgundy)' : '2px solid var(--border-color)',
                borderRadius: '50px',
                padding: '0.35rem 0.9rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isActive ? 'scale(1.15) translateY(-2px)' : 'scale(1)',
                boxShadow: isActive ? '0 4px 12px var(--accent-burgundy-glow)' : 'none'
              }}
            >
              {m.year}
            </button>
          );
        })}
      </div>
      <div 
        key={activeItem.year}
        className="page-transition" 
        style={{ 
          backgroundColor: 'var(--bg-linen)', 
          border: '1px solid var(--border-color)', 
          borderLeft: '4px solid var(--accent-burgundy)',
          padding: '1.5rem', 
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent-gold)' }}>
            {activeItem.tag} · {activeItem.year}
          </span>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', margin: '0.25rem 0 0.5rem 0', color: 'var(--text-primary)' }}>
            {activeItem.title}
          </h4>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {activeItem.summary}
          </p>
        </div>

        <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem', minWidth: '180px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.25rem' }}>Ý nghĩa thành tựu</span>
          <strong style={{ fontSize: '0.95rem', color: 'var(--accent-burgundy)', fontFamily: 'var(--font-serif)' }}>
            {activeItem.stat}
          </strong>
        </div>
      </div>
    </div>
  );
}
