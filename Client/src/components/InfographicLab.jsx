import React, { useState } from 'react';

const formations = [
  {
    id: 1,
    name: 'Cộng sản Nguyên thủy',
    forces: 'Sử dụng công cụ thô sơ tự nhiên (đá, cành cây, xương thú). Lao động mang tính săn bắt - hái lượm tự phát.',
    relations: 'Sở hữu chung đối với tư liệu sản xuất và sản phẩm. Không có tư hữu, không có bóc lột giai cấp.',
    contradictionDesc: 'LLSX phát triển (xuất hiện công cụ kim loại, cung tên) làm tăng năng suất lao động, sản phẩm thặng dư xuất hiện, tạo cơ sở cho tư hữu phát triển.',
    nextName: 'Chiếm hữu Nô lệ'
  },
  {
    id: 2,
    name: 'Chiếm hữu Nô lệ',
    forces: 'Công cụ đồng và sắt sơ khai. Tổ chức sản xuất trồng trọt nông nghiệp và chăn nuôi quy mô lớn.',
    relations: 'Quyền sở hữu tuyệt đối của chủ nô đối với tư liệu sản xuất và đối với cả sức lao động (con người nô lệ).',
    contradictionDesc: 'LLSX phát triển mâu thuẫn với sự tàn nhẫn của QHSX chủ nô. Nô lệ nổi dậy khởi nghĩa vũ trang, phá hoại công cụ sản xuất, đình trệ phát triển.',
    nextName: 'Phong kiến'
  },
  {
    id: 3,
    name: 'Phong kiến',
    forces: 'Kỹ nghệ rèn sắt phát triển, canh tác luân canh chuyên sâu, các ngành thủ công nghiệp chuyên biệt hóa.',
    relations: 'Sở hữu phong kiến về ruộng đất. Nông dân nhận ruộng đất để cày cấy và nộp địa tô cho giai cấp quý tộc địa chủ.',
    contradictionDesc: 'LLSX phát triển vượt bậc (công trường thủ công xuất hiện, máy hơi nước ra đời) xung đột trực tiếp với các quan hệ cát cứ, phường hội phong kiến.',
    nextName: 'Tư bản Chủ nghĩa'
  },
  {
    id: 4,
    name: 'Tư bản Chủ nghĩa',
    forces: 'Đại công nghiệp cơ khí hóa, tự động hóa hàng loạt, hệ thống dây chuyền xã hội hóa cao độ.',
    relations: 'Sở hữu tư hữu tư nhân tư bản chủ nghĩa đối với các tư liệu sản xuất chủ yếu của xã hội, bóc lột giá trị thặng dư.',
    contradictionDesc: 'Mâu thuẫn cơ bản của thời đại: LLSX xã hội hóa ngày càng cao >< QHSX tư hữu tư nhân tư bản chủ nghĩa. Độc lập đòi hỏi phải thay thế bằng quan hệ công hữu.',
    nextName: 'Xã hội Chủ nghĩa'
  },
  {
    id: 5,
    name: 'Xã hội Chủ nghĩa',
    forces: 'Lực lượng sản xuất hiện đại, ứng dụng kinh tế số, tự động hóa hoàn toàn, năng suất vượt bậc.',
    relations: 'Sở hữu xã hội (công hữu) đối với tư liệu sản xuất chủ yếu, phân phối công bằng theo đóng góp lao động.',
    contradictionDesc: 'Không còn mâu thuẫn đối kháng giai cấp. Xã hội giải quyết các mâu thuẫn thứ cấp bằng tự điều chỉnh cải cách dân chủ liên tục.',
    nextName: 'Cộng sản Chủ nghĩa hoàn chỉnh'
  }
];

export default function InfographicLab({ progress, saveProgress }) {
  const [activeId, setActiveId] = useState(1);
  const [forcesLevel, setForcesLevel] = useState(1);
  const [isShaking, setIsShaking] = useState(false);

  const current = formations.find(f => f.id === activeId) || formations[0];
  const hasContradiction = forcesLevel >= 4;

  const handleResolveConflict = () => {
    setIsShaking(true);
    
    const nextXp = progress.xp + 20;
    const nextLevel = Math.floor(Math.sqrt(nextXp / 100)) + 1;
    saveProgress({
      ...progress,
      xp: nextXp,
      level: nextLevel
    });

    setTimeout(() => {
      setIsShaking(false);
      setForcesLevel(1);
      if (activeId < formations.length) {
        setActiveId(prev => prev + 1);
      } else {
        alert('Đã minh họa hết tiến trình lịch sử! Xã hội đạt trạng thái Cộng sản hoàn chỉnh.');
        setActiveId(1);
      }
    }, 1200);
  };

  return (
    <div className={`infographic-wrapper ${isShaking ? 'infographic-shake' : ''}`}>
      <h3 className="infographic-title">
        Biểu đồ Động lực học Lịch sử: Biện chứng LLSX & QHSX
      </h3>

      {/* Timeline Steps - Wrapped neatly without ugly native scrollbars */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        {formations.map(f => (
          <button
            key={f.id}
            onClick={() => {
              setActiveId(f.id);
              setForcesLevel(1);
            }}
            disabled={isShaking}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              cursor: 'pointer',
              color: f.id === activeId ? 'var(--accent-burgundy)' : 'var(--text-muted)',
              borderBottom: f.id === activeId ? '2px solid var(--accent-burgundy)' : '2px solid transparent',
              padding: '0.4rem 0.8rem',
              transition: 'all 0.25s ease'
            }}
          >
            {f.id}. {f.name}
          </button>
        ))}
      </div>

      {/* Visual Engine Display */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem' }}>
        {/* Left: Diagram Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-linen)' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Mô hình cấu trúc biện chứng
          </div>

          {/* Forces Box */}
          <div style={{ border: '1.5px solid var(--border-color)', padding: '1.25rem', textAlign: 'center', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-card)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-gold)', display: 'block', marginBottom: '0.4rem' }}>
              LỰC LƯỢNG SẢN XUẤT (Cấp {forcesLevel})
            </span>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-primary)' }}>
              {current.forces}
            </p>
          </div>

          <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', color: hasContradiction ? 'var(--color-error)' : 'var(--color-success)' }}>
            {hasContradiction ? '⚡ MÂU THUẪN ĐỐI KHÁNG ⚡' : '⇅ ĐỒNG BỘ PHÙ HỢP ⇅'}
          </div>

          {/* Relations Box */}
          <div style={{ border: '1.5px solid var(--border-color)', padding: '1.25rem', textAlign: 'center', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-card)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-burgundy)', display: 'block', marginBottom: '0.4rem' }}>
              QUAN HỆ SẢN XUẤT
            </span>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-primary)' }}>
              {current.relations}
            </p>
          </div>
        </div>

        {/* Right: Controls & Description */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--text-primary)' }}>
              Hình thái: {current.name}
            </h4>
            
            <div style={{ margin: '1.5rem 0' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block', marginBottom: '0.4rem' }}>
                Kéo slider để tăng năng suất/trình độ LLSX: <strong>Cấp {forcesLevel}</strong>
              </label>
              <input 
                type="range"
                min="1"
                max="5"
                value={forcesLevel}
                onChange={(e) => setForcesLevel(Number(e.target.value))}
                disabled={isShaking}
                style={{ width: '100%', accentColor: 'var(--accent-burgundy)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                <span>Thô sơ</span>
                <span>Cách mạng công nghệ</span>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Khi LLSX tích lũy về trình độ kỹ thuật (slider tăng lên 4-5), nó vượt qua giới hạn sở hữu của QHSX hiện tại, gây ra sự xung đột và phá vỡ cấu trúc cũ.
            </p>
          </div>

          {hasContradiction ? (
            <div style={{ marginTop: '1.5rem', padding: '1.25rem', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-error)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>Phân tích biện chứng:</span>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.5', marginBottom: '1rem' }}>
                {current.contradictionDesc}
              </p>
              <button 
                className="btn btn-primary"
                onClick={handleResolveConflict}
                style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem', background: 'var(--color-error)' }}
              >
                💥 Nổ ra Cách mạng xã hội (+20 XP)
              </button>
            </div>
          ) : (
            <div style={{ marginTop: '1.5rem', padding: '1.25rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Trình độ lực lượng sản xuất đang nằm trong tầm kiểm soát của quan hệ sản xuất. Hãy tăng năng suất để tạo mâu thuẫn biện chứng.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
