import React, { useState } from 'react';
import { playSoftClick } from '../utils/soundEffects';

export default function SocialistRadar() {
  const [metrics, setMetrics] = useState({
    llsx: 80,
    qhsx: 75,
    culture: 70,
    democracy: 85,
    ruleOfLaw: 80
  });

  const handleChange = (key, value) => {
    playSoftClick();
    setMetrics(prev => ({ ...prev, [key]: Number(value) }));
  };

  const values = Object.values(metrics);
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const gap = maxVal - minVal;

  let statusText = 'Phát triển Cân bằng Biện chứng';
  let statusColor = 'var(--color-success)';
  let statusDesc = 'Các chỉ số kinh tế, xã hội và chính trị đang đồng bộ phù hợp, tạo động lực phát triển bền vững.';

  if (gap > 35) {
    statusText = 'Mất Cân bằng Cấu trúc Xã hội';
    statusColor = 'var(--color-error)';
    statusDesc = 'Sự chênh lệch quá lớn giữa trình độ LLSX và QHSX/Văn hóa có thể kìm hãm sự tiến bộ hoặc tạo xung đột.';
  } else if (avg < 50) {
    statusText = 'Chậm phát triển Tiềm năng';
    statusColor = 'var(--color-warning)';
    statusDesc = 'Năng suất và ý thức xã hội cần được thúc đẩy thông qua Đổi mới sáng tạo và Nâng cao dân trí.';
  }

  return (
    <div className="card" style={{ padding: '2rem', border: '1px solid var(--border-color)', margin: '2.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--accent-burgundy)' }}>
            📊 Mô phỏng Chỉ số Cân bằng Hình thái Xã hội
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Điều chỉnh 5 trụ cột chính trị - xã hội để kiểm tra sự ổn định biện chứng
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>Chỉ số Đồng bộ</span>
          <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-serif)', color: statusColor }}>
            {avg} / 100
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Sliders Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              <span>1. Trình độ Lực lượng Sản xuất (Đại công nghiệp/AI)</span>
              <strong>{metrics.llsx}%</strong>
            </div>
            <input 
              type="range" min="20" max="100" value={metrics.llsx} 
              onChange={e => handleChange('llsx', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-burgundy)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              <span>2. Quan hệ Sản xuất (Sở hữu công hữu/Phân phối)</span>
              <strong>{metrics.qhsx}%</strong>
            </div>
            <input 
              type="range" min="20" max="100" value={metrics.qhsx} 
              onChange={e => handleChange('qhsx', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              <span>3. Nền tảng Văn hóa - Tư tưởng XHCN</span>
              <strong>{metrics.culture}%</strong>
            </div>
            <input 
              type="range" min="20" max="100" value={metrics.culture} 
              onChange={e => handleChange('culture', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-burgundy)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              <span>4. Mức độ Dân chủ Xã hội Chủ nghĩa</span>
              <strong>{metrics.democracy}%</strong>
            </div>
            <input 
              type="range" min="20" max="100" value={metrics.democracy} 
              onChange={e => handleChange('democracy', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              <span>5. Hiệu lực Nhà nước Pháp quyền XHCN</span>
              <strong>{metrics.ruleOfLaw}%</strong>
            </div>
            <input 
              type="range" min="20" max="100" value={metrics.ruleOfLaw} 
              onChange={e => handleChange('ruleOfLaw', e.target.value)}
              style={{ width: '100%', accentColor: 'var(--accent-burgundy)' }}
            />
          </div>
        </div>

        {/* Live Visualizer Gauge */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'var(--bg-linen)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem', textAlign: 'center' }}>
            Báo cáo Đánh giá Cấu trúc Biện chứng
          </span>

          <div style={{ textAlign: 'center', margin: '0.5rem 0 1rem 0' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: statusColor, marginBottom: '0.35rem' }}>
              {statusText}
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {statusDesc}
            </p>
          </div>

          {/* Animated Bar Graphic */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {[
              { label: 'LLSX', val: metrics.llsx, color: 'var(--accent-burgundy)' },
              { label: 'QHSX', val: metrics.qhsx, color: 'var(--accent-gold)' },
              { label: 'Văn hóa', val: metrics.culture, color: 'var(--accent-burgundy)' },
              { label: 'Dân chủ', val: metrics.democracy, color: 'var(--accent-gold)' },
              { label: 'Pháp quyền', val: metrics.ruleOfLaw, color: 'var(--accent-burgundy)' }
            ].map((bar) => (
              <div key={bar.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
                <span style={{ width: '70px', color: 'var(--text-muted)', fontWeight: 'bold' }}>{bar.label}</span>
                <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${bar.val}%`, height: '100%', backgroundColor: bar.color, transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
                </div>
                <span style={{ width: '35px', textAlign: 'right', fontWeight: 'bold' }}>{bar.val}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
