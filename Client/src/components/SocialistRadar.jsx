import React, { useState } from 'react';
import { playSoftClick } from '../utils/soundEffects';

export default function SocialistRadar() {
  const [indicators, setIndicators] = useState({
    llsx: 65,
    qhsx: 60, 
    vh: 55,   
    dc: 70,   
    pq: 65   
  });

  const handleChange = (key, value) => {
    setIndicators(prev => ({
      ...prev,
      [key]: Number(value)
    }));
  };

  const { llsx, qhsx, vh, dc, pq } = indicators;
  const values = [llsx, qhsx, vh, dc, pq];
  
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const diff = maxVal - minVal;

  const econGap = llsx - qhsx;
  const cultureGap = llsx - vh;
  const demoGap = llsx - ((dc + pq) / 2);
  let stateMeta = {
    title: 'Hình thái Quá độ Tiên tiến',
    desc: 'Các trụ cột phát triển đồng bộ, mâu thuẫn biện chứng được giải quyết hài hòa.',
    advice: 'Tiếp tục thúc đẩy đổi mới sáng tạo, chuyển đổi số và nâng cao chất lượng cuộc sống.',
    statusClass: 'status-good',
    color: 'var(--color-success)',
    bgColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'var(--color-success)'
  };

  if (avg < 35) {
    stateMeta = {
      title: 'Khủng hoảng Sơ khai & Trầm lắng',
      desc: 'Hình thái kinh tế - xã hội ở mức phát triển rất thấp, lực lượng sản xuất yếu kém.',
      advice: 'Tập trung đẩy mạnh công nghiệp hóa, hiện đại hóa và nâng cao trình độ dân trí.',
      statusClass: 'status-danger',
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.08)',
      borderColor: '#ef4444'
    };
  } else if (econGap > 35) {
    stateMeta = {
      title: 'Mâu thuẫn LLSX & QHSX (Lệch pha Kinh tế)',
      desc: 'Lực lượng sản xuất phát triển nóng nhưng Quan hệ sản xuất chưa thích ứng kịp.',
      advice: 'Cần điều chỉnh ngay thể chế sở hữu, quản lý và phân phối để tránh bóc lột tư bản.',
      statusClass: 'status-warning',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.08)',
      borderColor: '#f59e0b'
    };
  } else if (demoGap > 30) {
    stateMeta = {
      title: 'Mâu thuẫn Kiến trúc Thượng tầng (Thiếu Dân chủ/Pháp quyền)',
      desc: 'Kinh tế tăng trưởng nhưng Thiết chế Dân chủ và Pháp quyền XHCN bị chậm chân.',
      advice: 'Cần tăng cường thực thi Dân chủ XHCN và xây dựng Nhà nước Pháp quyền của dân, do dân, vì dân.',
      statusClass: 'status-warning',
      color: '#d97706',
      bgColor: 'rgba(217, 119, 6, 0.08)',
      borderColor: '#d97706'
    };
  } else if (cultureGap > 35) {
    stateMeta = {
      title: 'Mâu thuẫn Văn hóa & Giá trị Tinh thần',
      desc: 'Công nghệ & Kinh tế phát triển nhưng Nền tảng Văn hóa con người bị suy giảm.',
      advice: 'Cần tập trung phát triển văn hóa XHCN tiên tiến, đậm đà bản sắc và xây dựng con người toàn diện.',
      statusClass: 'status-warning',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.08)',
      borderColor: '#8b5cf6'
    };
  } else if (avg >= 85 && diff <= 18) {
    stateMeta = {
      title: 'Xã hội Chủ nghĩa Hài hòa & Tối ưu',
      desc: 'Lực lượng sản xuất hiện đại kết hợp hoàn hảo với Quan hệ sản xuất tiến bộ và Dân chủ số.',
      advice: 'Đạt trạng thái tối ưu theo mục tiêu "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh".',
      statusClass: 'status-ideal',
      color: 'var(--accent-gold)',
      bgColor: 'var(--accent-gold-glow)',
      borderColor: 'var(--accent-gold)'
    };
  }

  return (
    <div className="card page-transition" style={{ padding: '2rem', border: '1px solid var(--border-color)', margin: '2.5rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <span className="article-cat" style={{ color: 'var(--accent-gold)' }}>Mô phỏng Động lực học Lịch sử</span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginTop: '0.25rem' }}>
          Mô phỏng Chỉ số Cân bằng Hình thái Xã hội
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0.5rem auto 0 auto' }}>
          Thử nghiệm kéo các thanh trượt bên dưới để mô phỏng tác động biện chứng giữa 5 trụ cột phát triển xã hội theo thời gian thực.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              <span>⚙️ Lực lượng sản xuất:</span>
              <span style={{ color: 'var(--accent-burgundy)' }}>{llsx}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={llsx}
              onChange={(e) => handleChange('llsx', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-burgundy)', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              <span>🤝 Quan hệ sản xuất:</span>
              <span style={{ color: 'var(--accent-burgundy)' }}>{qhsx}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={qhsx}
              onChange={(e) => handleChange('qhsx', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-burgundy)', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              <span>🏛️ Văn hóa & Con người:</span>
              <span style={{ color: 'var(--accent-burgundy)' }}>{vh}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={vh}
              onChange={(e) => handleChange('vh', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-burgundy)', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              <span>🗳️ Dân chủ xã hội chủ nghĩa:</span>
              <span style={{ color: 'var(--accent-burgundy)' }}>{dc}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={dc}
              onChange={(e) => handleChange('dc', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-burgundy)', cursor: 'pointer' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
              <span>⚖️ Nhà nước Pháp quyền:</span>
              <span style={{ color: 'var(--accent-burgundy)' }}>{pq}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={pq}
              onChange={(e) => handleChange('pq', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-burgundy)', cursor: 'pointer' }}
            />
          </div>
        </div>
        <div 
          className="page-transition" 
          style={{ 
            padding: '1.75rem', 
            borderRadius: 'var(--radius-md)', 
            border: `2px solid ${stateMeta.borderColor}`, 
            backgroundColor: stateMeta.bgColor,
            textAlign: 'center'
          }}
        >
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: stateMeta.color, fontWeight: 'bold' }}>
            Chỉ số Cân bằng Biện chứng
          </span>
          <div style={{ fontSize: '3.2rem', fontFamily: 'var(--font-serif)', fontWeight: '900', color: stateMeta.color, margin: '0.25rem 0' }}>
            {avg}%
          </div>

          <h3 style={{ fontSize: '1.1rem', color: stateMeta.color, margin: '0.5rem 0' }}>
            {stateMeta.title}
          </h3>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: '1.5' }}>
            {stateMeta.desc}
          </p>

          <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem', textAlign: 'left' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
              💡 Khuyên nghị Biện chứng:
            </span>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {stateMeta.advice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
