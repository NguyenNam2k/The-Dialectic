import React, { useState } from 'react';
import { playSoftClick } from '../utils/soundEffects';

const milestones = [
  {
    year: '1848',
    title: 'Tuyên ngôn của Đảng Cộng sản',
    author: 'C.Mác & Ph.Ăngghen',
    desc: 'Tác phẩm lý luận kinh điển đánh dấu sự ra đời chính thức của Chủ nghĩa xã hội khoa học. Khẳng định sứ mệnh lịch sử thế giới của giai cấp công nhân và tính tất yếu thay thế CN tư bản bằng CN xã hội.',
    tag: 'Khởi đầu Lý luận'
  },
  {
    year: '1867',
    title: 'Bộ "Tư bản" - Tập I xuất bản',
    author: 'Karl Marx',
    desc: 'Bản hùng ca kinh tế - triết học luận giải học thuyết Giá trị thặng dư ($m$). Bóc trần cơ chế bóc lột thầm lặng trong công xưởng tư bản, đặt nền móng luận chứng khoa học vững chắc cho CNXHKH.',
    tag: 'Luận chứng Kinh tế'
  },
  {
    year: '1871',
    title: 'Công xã Paris — Nhà nước Vô sản đầu tiên',
    author: 'Giai cấp Công nhân Pari',
    desc: 'Cuộc thử nghiệm lịch sử đầu tiên đập tan bộ máy nhà nước tư sản và thành lập chính quyền của giai cấp công nhân. C.Mác tổng kết bài học quý giá về chuyên chính vô sản và dân chủ công nhân.',
    tag: 'Thực tiễn Khởi đầu'
  },
  {
    year: '1878',
    title: 'Tác phẩm "Chống Dühring"',
    author: 'Friedrich Engels',
    desc: 'Tác phẩm kinh điển trình bày hệ thống hóa trọn vẹn ba bộ phận hợp thành của Chủ nghĩa Mác: Triết học Mác-xít, Kinh tế chính trị học và Chủ nghĩa xã hội khoa học.',
    tag: 'Hệ thống hóa Lý luận'
  },
  {
    year: '1917',
    title: 'Cách mạng Tháng Mười Nga',
    author: 'V.I.Lênin & Đảng Bôn-sê-vích',
    desc: 'Cách mạng XHCN đầu tiên trên thế giới thắng lợi, đưa CNXHKH từ lý luận lý thuyết trở thành thực tiễn lịch sử sinh động và mở ra thời kỳ quá độ lên CNXH trên phạm vi thế giới.',
    tag: 'Hiện thực hóa Thực tiễn'
  },
  {
    year: '1921',
    title: 'Chính sách Kinh tế Mới (NEP)',
    author: 'V.I.Lênin',
    desc: 'Bước phát triển lý luận kiệt xuất về thời kỳ quá độ gián tiếp bỏ qua chế độ tư bản tại các nước tiền tư bản; vận dụng sáng tạo kinh tế nhiều thành phần và thương nghiệp làm đòn bẩy LLSX.',
    tag: 'Phát triển Lý luận Quá độ'
  },
  {
    year: '1945',
    title: 'Hệ thống Xã hội Chủ nghĩa Thế giới',
    author: 'Phong trào Cộng sản Quốc tế',
    desc: 'Chủ nghĩa xã hội phát triển vượt ra khỏi phạm vi một nước, trở thành một hệ thống thế giới hùng mạnh, thúc đẩy mạnh mẽ phong trào giải phóng dân tộc và hòa bình nhân loại.',
    tag: 'Hệ thống Thế giới'
  },
  {
    year: '1986',
    title: 'Đổi mới & Kinh tế Thị trường Định hướng XHCN',
    author: 'Thực tiễn Lý luận Hiện đại',
    desc: 'Bước đột phá lý luận về nhận thức chủ nghĩa xã hội: Kết hợp phát triển kinh tế thị trường mở với giữ vững định hướng XHCN, giải phóng mạnh mẽ sức sản xuất.',
    tag: 'Đột phá Nhận thức'
  },
  {
    year: '2025+',
    title: 'CNXH Kỷ nguyên Số & Trí tuệ Nhân tạo (AI)',
    author: 'Học thuyết Mác-xít Hiện đại',
    desc: 'Vận dụng phép biện chứng giải quyết mâu thuẫn giữa tính xã hội hóa tuyệt đối của dữ liệu/AI với sự chiếm hữu tư nhân tư bản; hướng tới công hữu tri thức và Dân chủ số XHCN.',
    tag: 'Kỷ nguyên Tương lai'
  }
];

export default function DialecticTimeline() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [pageStart, setPageStart] = useState(0);

  const VISIBLE_COUNT = 6;

  const handlePrev = () => {
    if (selectedIdx > 0) {
      playSoftClick();
      const nextIdx = selectedIdx - 1;
      setSelectedIdx(nextIdx);
      if (nextIdx < pageStart) {
        setPageStart(Math.max(0, nextIdx));
      }
    }
  };

  const handleNext = () => {
    if (selectedIdx < milestones.length - 1) {
      playSoftClick();
      const nextIdx = selectedIdx + 1;
      setSelectedIdx(nextIdx);
      if (nextIdx >= pageStart + VISIBLE_COUNT) {
        setPageStart(Math.min(milestones.length - VISIBLE_COUNT, nextIdx - VISIBLE_COUNT + 1));
      }
    }
  };

  const handleSelectNode = (globalIdx) => {
    playSoftClick();
    setSelectedIdx(globalIdx);
    if (globalIdx < pageStart) {
      setPageStart(globalIdx);
    } else if (globalIdx >= pageStart + VISIBLE_COUNT) {
      setPageStart(globalIdx - VISIBLE_COUNT + 1);
    }
  };

  const visibleMilestones = milestones.slice(pageStart, pageStart + VISIBLE_COUNT);
  const activeMilestone = milestones[selectedIdx];

  return (
    <div className="card page-transition" style={{ padding: '2rem', border: '1px solid var(--border-color)', margin: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span className="article-cat" style={{ color: 'var(--accent-gold)' }}>Tiến trình Động lực học Lịch sử</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginTop: '0.2rem' }}>
            Dòng Thời Gian Mốc Lịch Sử Biện Chứng (9 Cột mốc)
          </h2>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Hiển thị 6 mốc/lượt · Nhấn ‹ › để chuyển mốc tiếp theo
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', position: 'relative' }}>
        <button
          onClick={handlePrev}
          disabled={selectedIdx === 0}
          style={{
            background: selectedIdx === 0 ? 'transparent' : 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: selectedIdx === 0 ? 'var(--text-muted)' : 'var(--accent-gold)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            cursor: selectedIdx === 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            flexShrink: 0,
            transition: 'all 0.2s ease',
            opacity: selectedIdx === 0 ? 0.3 : 1
          }}
          title="Mốc lịch sử trước"
        >
          ‹
        </button>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            position: 'relative',
            flex: 1,
            overflow: 'hidden',
            padding: '0.75rem 0.5rem'
          }}
        >
          <div 
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '25px', 
              right: '25px', 
              height: '3px', 
              backgroundColor: 'var(--border-color)', 
              zIndex: 0, 
              transform: 'translateY(-50%)' 
            }} 
          />
          <div
            key={pageStart}
            className="page-transition"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              zIndex: 1
            }}
          >
            {visibleMilestones.map((m) => {
              const globalIdx = milestones.findIndex(item => item.year === m.year);
              const isActive = globalIdx === selectedIdx;
              const isPassed = globalIdx <= selectedIdx;

              return (
                <div key={m.year} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <button
                    onClick={() => handleSelectNode(globalIdx)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '50px',
                      border: isActive 
                        ? '2px solid var(--accent-gold)' 
                        : isPassed 
                        ? '1.5px solid var(--accent-burgundy)' 
                        : '1.5px solid var(--border-color)',
                      backgroundColor: isActive 
                        ? 'var(--accent-gold)' 
                        : 'var(--bg-card)',
                      color: isActive 
                        ? '#1c1317' 
                        : isPassed 
                        ? 'var(--accent-burgundy)' 
                        : 'var(--text-muted)',
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isActive ? '0 0 14px var(--accent-gold-glow)' : 'none',
                      transform: isActive ? 'scale(1.12)' : 'scale(1)'
                    }}
                  >
                    {m.year}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={handleNext}
          disabled={selectedIdx === milestones.length - 1}
          style={{
            background: selectedIdx === milestones.length - 1 ? 'transparent' : 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: selectedIdx === milestones.length - 1 ? 'var(--text-muted)' : 'var(--accent-gold)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            cursor: selectedIdx === milestones.length - 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            flexShrink: 0,
            transition: 'all 0.2s ease',
            opacity: selectedIdx === milestones.length - 1 ? 0.3 : 1
          }}
          title="Mốc lịch sử tiếp theo"
        >
          ›
        </button>
      </div>
      {activeMilestone && (
        <div key={activeMilestone.year} className="page-transition" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', fontWeight: '900', color: 'var(--accent-burgundy)' }}>
              {activeMilestone.year}
            </span>
            <span style={{ backgroundColor: 'var(--accent-gold-glow)', color: 'var(--accent-gold)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid var(--accent-gold)' }}>
              {activeMilestone.tag}
            </span>
          </div>

          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {activeMilestone.title}
          </h3>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
            {activeMilestone.desc}
          </p>
        </div>
      )}
    </div>
  );
}
