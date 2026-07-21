import React, { useState } from 'react';
import { playSoftClick, playSuccessChime } from '../utils/soundEffects';

const roundtables = [
  {
    id: 'roundtable-1',
    title: 'Biên bản 01: Xã hội Không tưởng vs Khoa học',
    author: 'Robert Owen & Karl Marx',
    scenario: 'Độc giả đang kiểm duyệt dự thảo biên bản bàn tròn đối thoại học thuật bàn về tính khả thi của chủ nghĩa xã hội cải cách tự nguyện. Vui lòng chọn phương án hiệu đính chính xác.',
    steps: [
      {
        speaker: 'Robert Owen',
        desc: 'Nhà Xã hội Chủ nghĩa Không tưởng',
        text: 'Nhìn xem, tại xưởng dệt New Lanark của tôi, công nhân được chăm sóc, trẻ em được học hành. Các nhà tư bản có lương tâm chỉ cần nhân rộng mô hình này ra toàn thế giới là có thể xóa bỏ bất công mà không cần đấu tranh hay bạo lực!',
        options: [
          {
            text: '[Bình luận biên tập] Lập luận này mang tính không tưởng vì ảo tưởng vào lòng hảo tâm của giới chủ. Bản chất của chủ nghĩa tư bản là tối đa hóa giá trị thặng dư thông qua việc chiếm đoạt lao động làm thuê; giai cấp tư sản không bao giờ tự nguyện từ bỏ lợi ích cốt lõi của mình.',
            isCorrect: true,
            feedback: 'Sửa lỗi biên tập xuất sắc! C.Mác đã chứng minh rằng việc kêu gọi đạo đức giai cấp áp bức mà không thông qua đấu tranh chính trị là một sai lầm phi thực tế.'
          },
          {
            text: '[Bình luận biên tập] Ý kiến của Owen rất thực tế. Chúng ta nên kêu gọi quyên góp từ thiện từ các nhà hảo tâm tư bản để mua lại các phương tiện sản xuất dần dần.',
            isCorrect: false,
            feedback: 'Hiệu đính chưa chuẩn xác. Việc này vẫn đi theo tư duy thỏa hiệp, không giải quyết được mâu thuẫn giai cấp gốc rễ.'
          }
        ]
      },
      {
        speaker: 'Robert Owen',
        desc: 'Nhà Xã hội Chủ nghĩa Không tưởng',
        text: 'Vậy nếu không phải các tri thức thông thái hay nhà công nghiệp cấp tiến thúc đẩy xã hội tốt đẹp lên, thì ai là người đứng ra thay đổi bánh xe lịch sử?',
        options: [
          {
            text: '[Bình luận biên tập] Giai cấp công nhân hiện đại chính là chủ thể cách mạng. Do địa vị kinh tế - xã hội gắn liền với nền đại công nghiệp hiện đại, họ đại diện cho lực lượng sản xuất tiến tiến nhất và có sứ mệnh lịch sử lãnh đạo quần chúng xóa bỏ tư hữu, giải phóng nhân loại.',
            isCorrect: true,
            feedback: 'Chính xác! Sứ mệnh lịch sử thế giới của giai cấp công nhân là phát kiến vĩ đại thứ ba của Mác-Ăngghen, nền tảng chuyển hóa CNXH thành khoa học.'
          },
          {
            text: '[Bình luận biên tập] Giai cấp trí thức học giả và các tầng lớp nông dân tự do mới là lực lượng tiên phong, vì giai cấp công nhân thiếu kiến thức quản lý.',
            isCorrect: false,
            feedback: 'Hiệu đính sai. Trí thức và nông dân đóng vai trò liên minh, không phải giai cấp tiên phong tự thân đại diện cho LLSX hiện đại.'
          }
        ]
      }
    ]
  },
  {
    id: 'roundtable-2',
    title: 'Biên bản 02: Nguồn gốc của Giá trị và Thặng dư',
    author: 'Mr. Bounderby (Nhà tư bản) & Karl Marx',
    scenario: 'Độc giả kiểm duyệt dự thảo tranh biện về nguồn gốc của giá trị thặng dư và bản chất của chế độ tư hữu tư bản chủ nghĩa.',
    steps: [
      {
        speaker: 'Bounderby',
        desc: 'Nhà Tư bản Chủ nghĩa công nghiệp',
        text: 'Nền kinh tế phát triển là nhờ vốn đầu tư, óc quản lý và sự gánh vác rủi ro của những nhà tư bản như tôi! Công nhân chỉ bán sức lao động thông thường, tại sao các anh lại bảo họ bị bóc lột?',
        options: [
          {
            text: '[Bình luận biên tập] Vốn và máy móc chỉ là tư bản bất biến (không tự tăng thêm giá trị). Chỉ có hao phí sức lao động sống của công nhân (tư bản khả biến) mới sản sinh ra giá trị thặng dư mới và bị nhà tư bản chiếm đoạt không công.',
            isCorrect: true,
            feedback: 'Hiệu đính xuất sắc! Học thuyết Giá trị thặng dư đã làm rõ cơ chế bóc lột thầm lặng trong công xưởng tư bản, chỉ ra bản chất kinh tế của sự áp bức.'
          },
          {
            text: '[Bình luận biên tập] Đúng là nhà tư bản gánh vác rủi ro nên thặng dư là phần bù đắp rủi ro xứng đáng, công nhân cần thỏa hiệp chấp nhận.',
            isCorrect: false,
            feedback: 'Sửa đổi sai lệch lý luận. CNXHKH chỉ ra thặng dư là phần lao động không công của công nhân bị tư hữu hóa cưỡng bức.'
          }
        ]
      },
      {
        speaker: 'Bounderby',
        desc: 'Nhà Tư bản Chủ nghĩa công nghiệp',
        text: 'Nhưng tại sao các anh lại đòi xóa bỏ quyền tư hữu tài sản của chúng tôi? Quyền sở hữu tài sản cá nhân là quyền con người thiêng liêng nhất cơ mà!',
        options: [
          {
            text: '[Bình luận biên tập] Quyền tư hữu tư bản chủ nghĩa không phải là sở hữu cá nhân thông thường, mà là quyền chiếm hữu tư liệu sản xuất chủ yếu để bóc lột người khác. Xóa bỏ tư hữu tư bản để thiết lập chế độ công hữu là tất yếu biện chứng để giải phóng sức sản xuất.',
            isCorrect: true,
            feedback: 'Hoàn hảo! Cần phân biệt rõ việc xóa bỏ tư hữu tư liệu sản xuất bóc lột với việc sở hữu tư liệu sinh hoạt cá nhân thông thường.'
          },
          {
            text: '[Bình luận biên tập] Chúng ta sẽ tịch thu mọi của cải cá nhân, kể cả quần áo, đồ đạc của mọi người để chia đều cho xã hội không phân biệt.',
            isCorrect: false,
            feedback: 'Lý giải sai lầm. Đây là quan điểm cực đoan của "chủ nghĩa cộng sản thô sơ" mà Mác đã kịch liệt phê phán.'
          }
        ]
      }
    ]
  },
  {
    id: 'roundtable-3',
    title: 'Biên bản 03: Nhà nước và Chuyên chính Vô sản',
    author: 'Mikhail Bakunin & Friedrich Engels',
    scenario: 'Tranh luận về vai trò của Nhà nước sau cách mạng: Tiêu diệt nhà nước ngay lập tức (Vô chính phủ) hay Trải qua thời kỳ quá độ chuyên chính vô sản?',
    steps: [
      {
        speaker: 'Mikhail Bakunin',
        desc: 'Nhà lý luận Chủ nghĩa Vô chính phủ',
        text: 'Mọi hình thức nhà nước đều là bộ máy áp bức cưỡng chế! Ngay khi cách mạng thành công, chúng ta phải xóa bỏ mọi nhà nước ngay lập tức để trả tự do tuyệt đối cho cá nhân!',
        options: [
          {
            text: '[Bình luận biên tập] Quan điểm vô chính phủ là ảo tưởng và nguy hiểm. Ngay sau cách mạng, giai cấp tư sản phản động vẫn sẽ chống phá quyết liệt; nếu xóa bỏ nhà nước ngay, giai cấp công nhân sẽ không có công cụ tổ chức lực lượng để bảo vệ thành quả cách mạng.',
            isCorrect: true,
            feedback: 'Chính xác! Ph.Ăngghen đã chỉ ra rằng nhà nước XHCN là một "nửa nhà nước" có nhiệm vụ trấn áp lực lượng bóc lột cũ và tổ chức xây dựng xã hội mới.'
          },
          {
            text: '[Bình luận biên tập] Đồng ý với Bakunin. Nhà nước là xấu xa nên việc duy trì bất kỳ nhà nước nào cũng làm suy thoái lý tưởng cách mạng.',
            isCorrect: false,
            feedback: 'Sai lệch lý luận. Phép biện chứng cho thấy nhà nước không thể xóa bỏ bằng sắc lệnh mà sẽ tự tiêu vong dần khi cơ sở giai cấp biến mất.'
          }
        ]
      },
      {
        speaker: 'Bakunin',
        desc: 'Nhà lý luận Chủ nghĩa Vô chính phủ',
        text: 'Vậy nhà nước chuyên chính vô sản khác gì với nhà nước tư sản cũ khi đều dùng quyền lực cưỡng chế?',
        options: [
          {
            text: '[Bình luận biên tập] Nhà nước tư sản là chuyên chính của thiểu số áp bức đối với đa số nhân dân; còn Nhà nước chuyên chính vô sản là quyền lực của đại đa số nhân dân lao động, thực hiện dân chủ xã hội chủ nghĩa rộng rãi.',
            isCorrect: true,
            feedback: 'Xuất sắc! Sự khác biệt về bản chất giai cấp và mục tiêu phục vụ là nhân tố cốt lõi phân biệt nhà nước XHCN với các nhà nước bóc lột cũ.'
          },
          {
            text: '[Bình luận biên tập] Hai nhà nước hoàn toàn giống nhau về mô hình quản lý, chỉ khác tên gọi đại diện Đảng.',
            isCorrect: false,
            feedback: 'Bình luận sai bản chất. Nhà nước XHCN chuyển từ công cụ thống trị giai cấp sang công cụ quản lý xã hội của nhân dân.'
          }
        ]
      }
    ]
  },
  {
    id: 'roundtable-4',
    title: 'Biên bản 04: Thời kỳ Quá độ và Chính sách NEP',
    author: 'Karl Kautsky & V.I. Lenin',
    scenario: 'Cuộc tranh biện gay gắt về con đường quá độ gián tiếp tại các nước chưa trải qua tư bản phát triển và việc sử dụng kinh tế thị trường (NEP).',
    steps: [
      {
        speaker: 'Karl Kautsky',
        desc: 'Nhà giáo điều Chủ nghĩa Mác cơ hội',
        text: 'Nước Nga chưa có nền đại công nghiệp phát triển như nước Anh hay nước Đức. Làm cách mạng xã hội chủ nghĩa ở một nước nông nghiệp lạc hậu là vi phạm quy luật Mác-xít!',
        options: [
          {
            text: '[Bình luận biên tập] Kautsky đã rơi vào chủ nghĩa giáo điều. V.I.Lênin phát triển lý luận Mác: Trong thời kỳ đế quốc chủ nghĩa, cách mạng có thể nổ ra và thắng lợi ở "khâu yếu nhất" của sợi dây xích tư bản chủ nghĩa, sau đó tiến hành quá độ gián tiếp lên CNXH.',
            isCorrect: true,
            feedback: 'Tuyệt vời! Lênin đã vận dụng sáng tạo phép biện chứng lịch sử, phát triển lý luận Mác phù hợp với thực tiễn thời đại mới.'
          },
          {
            text: '[Bình luận biên tập] Kautsky nói đúng. Nước Nga nên nhường lại chính quyền cho giai cấp tư sản phát triển kinh tế 100 năm rồi mới làm cách mạng.',
            isCorrect: false,
            feedback: 'Hiệu đính chưa chuẩn xác. Quan điểm này bỏ lỡ thời cơ lịch sử của giai cấp công nhân Nga.'
          }
        ]
      },
      {
        speaker: 'Karl Kautsky',
        desc: 'Nhà giáo điều Chủ nghĩa Mác cơ hội',
        text: 'Tại sao chính quyền Bôn-sê-vích lại ban hành Chính sách Kinh tế Mới (NEP), khôi phục thương nghiệp tư nhân và tiền tệ? Đó có phải là rút lui về chủ nghĩa tư bản?',
        options: [
          {
            text: '[Bình luận biên tập] Không phải rút lui vô điều kiện, mà là bước lùi chiến lược để tiến lên chắc chắn hơn. NEP sử dụng kinh tế thị trường và tư bản nhà nước làm đòn bẩy phát triển lực lượng sản xuất xã hội hóa, phục hồi nông nghiệp và củng cố liên minh công - nông.',
            isCorrect: true,
            feedback: 'Hoàn hảo! NEP của Lênin là bài học kinh nghiệm vô giá cho mô hình Kinh tế thị trường định hướng XHCN tại Việt Nam.'
          },
          {
            text: '[Bình luận biên tập] Đúng vậy, NEP là sự đầu hàng của chính quyền XHCN trước thị trường tự do tư bản.',
            isCorrect: false,
            feedback: 'Đánh giá sai lệch. Nhà nước XHCN vẫn nắm giữ các ngành kinh tế then chốt để định hướng sự phát triển.'
          }
        ]
      }
    ]
  },
  {
    id: 'roundtable-5',
    title: 'Biên bản 05: Vấn đề Dân tộc và Giải phóng Thuộc địa',
    author: 'Eduard Bernstein & Nguyễn Ái Quốc (Hồ Chí Minh)',
    scenario: 'Biên bản tranh luận tại Quốc tế Cộng sản về phong trào giải phóng dân tộc ở các nước thuộc địa Phương Đông.',
    steps: [
      {
        speaker: 'Eduard Bernstein',
        desc: 'Nhà xét lại Chủ nghĩa Mác',
        text: 'Cách mạng vô sản chỉ có thể nổ ra và quyết định tại các nước chính quốc tư bản phương Tây. Nhân dân các nước thuộc địa kém phát triển chỉ cần chờ đợi giai cấp công nhân phương Tây đến giải phóng!',
        options: [
          {
            text: '[Bình luận biên tập] Đây là tư tưởng tự do tư sản coi thường thuộc địa. Nguyễn Ái Quốc khẳng định: Cách mạng thuộc địa không phụ thuộc thụ động vào chính quốc mà có thể chủ động đứng lên tự giải phóng mình, "đánh gãy một cành cây của con quái vật tư bản" trước khi công nhân phương Tây hành động.',
            isCorrect: true,
            feedback: 'Sửa lỗi xuất sắc! Luận điểm của Hồ Chí Minh là sự bổ sung lý luận kiệt xuất vào kho tàng Chủ nghĩa xã hội khoa học.'
          },
          {
            text: '[Bình luận biên tập] Quan điểm của Bernstein hợp lý vì các nước thuộc địa chưa có giai cấp công nhân đông đảo.',
            isCorrect: false,
            feedback: 'Đánh giá sai lầm. Ở thuộc địa, mâu thuẫn dân tộc cực kỳ gay gắt, tạo động lực cách mạng giải phóng mạnh mẽ.'
          }
        ]
      },
      {
        speaker: 'Bernstein',
        desc: 'Nhà xét lại Chủ nghĩa Mác',
        text: 'Ở các nước nông nghiệp thuộc địa, lực lượng nào sẽ là nòng cốt lãnh đạo cuộc cách mạng giải phóng?',
        options: [
          {
            text: '[Bình luận biên tập] Khối liên minh Công - Nông dưới sự lãnh đạo của Đảng Cộng sản (đội tiên phong của giai cấp công nhân) là lực lượng nòng cốt cốt lõi, kết hợp sức mạnh dân tộc với sức mạnh thời đại.',
            isCorrect: true,
            feedback: 'Chính xác! Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc lấy công - nông làm gốc là kim chỉ nam cho cách mạng Việt Nam.'
          },
          {
            text: '[Bình luận biên tập] Các sĩ phu phong kiến và địa chủ yêu nước sẽ lãnh đạo cuộc cách mạng.',
            isCorrect: false,
            feedback: 'Sai lệch lịch sử. Các phong trào yêu nước hệ tư tưởng phong kiến và tư sản đều đã thất bại bế tắc trước đó.'
          }
        ]
      }
    ]
  },
  {
    id: 'roundtable-6',
    title: 'Biên bản 06: Chủ nghĩa xã hội Kỷ nguyên Số & Trí tuệ Nhân tạo (AI)',
    author: 'Techno-Capitalist Executive & Học giả Biện chứng Hiện đại',
    scenario: 'Biên bản bàn tròn hiện đại về tác động của Trí tuệ nhân tạo (AI), Tự động hóa và Dữ liệu lớn đối với tương lai của Lao động và Chủ nghĩa xã hội.',
    steps: [
      {
        speaker: 'Techno-Capitalist Exec',
        desc: 'Lãnh đạo Tập đoàn Công nghệ Tư bản',
        text: 'Trí tuệ nhân tạo (AI) và Robot tự động hóa sẽ thay thế toàn bộ lao động con người. Chủ nghĩa Mác và lý luận về giai cấp công nhân đã trở nên hoàn toàn lạc hậu trong Kỷ nguyên Số!',
        options: [
          {
            text: '[Bình luận biên tập] Lập luận này nhầm lẫn giữa hình thức lao động và quan hệ sản xuất. AI chỉ là công cụ lao động (tư bản bất biến) do tri thức tích lũy của con người tạo ra. Khi AI phát triển, mâu thuẫn giữa tính xã hội hóa tuyệt đối của dữ liệu/tri thức với sự chiếm hữu tư nhân tư bản chủ nghĩa càng trở nên gay gắt hơn bao giờ hết.',
            isCorrect: true,
            feedback: 'Phân tích sắc bén! Kỷ nguyên AI không làm tiêu vong chủ nghĩa Mác mà ngược lại, làm cho yêu cầu công hữu hóa tri thức XHCN trở nên cấp thiết hơn.'
          },
          {
            text: '[Bình luận biên tập] Đồng ý. Khi có AI thì không còn giá trị thặng dư và giai cấp công nhân biến mất hoàn toàn.',
            isCorrect: false,
            feedback: 'Nhận định sai lầm. AI không tự tạo ra giá trị mới nếu không có sức lao động sáng tạo của con người lập trình và vận hành.'
          }
        ]
      },
      {
        speaker: 'Techno-Capitalist Exec',
        desc: 'Lãnh đạo Tập đoàn Công nghệ Tư bản',
        text: 'Vậy Chủ nghĩa xã hội sẽ vận dụng công nghệ AI và Dữ liệu lớn như thế nào để xây dựng xã hội tương lai?',
        options: [
          {
            text: '[Bình luận biên tập] CNXH sử dụng AI và Dữ liệu lớn để công khai hóa, minh bạch hóa chính quyền số, tối ưu hóa quy hoạch kinh tế phục vụ lợi ích cộng đồng, phân phối lại thành tựu năng suất để giảm giờ làm và giải phóng con người toàn diện.',
            isCorrect: true,
            feedback: 'Hoàn hảo! Đây chính là cốt lõi của Chủ nghĩa xã hội số hiện đại - biến công nghệ từ công cụ bóc lột thành công cụ giải phóng nhân loại.'
          },
          {
            text: '[Bình luận biên tập] CNXH sẽ cấm đoán Trí tuệ nhân tạo để bảo vệ các việc làm thủ công truyền thống.',
            isCorrect: false,
            feedback: 'Quan điểm phản tiến bộ. CNXH luôn đại diện cho lực lượng sản xuất tiên tiến nhất và kế thừa mọi thành tựu văn minh.'
          }
        ]
      }
    ]
  }
];

export default function DebateRoundtable({ progress, saveProgress, setView }) {
  const [activeRoundtableId, setActiveRoundtableId] = useState(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const activeRoundtable = roundtables.find(r => r.id === activeRoundtableId);

  const startRoundtable = (id) => {
    playSoftClick();
    setActiveRoundtableId(id);
    setCurrentStepIdx(0);
    setSelectedOptionIdx(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  const handleSelectOption = (idx) => {
    if (showFeedback) return;
    playSoftClick();
    setSelectedOptionIdx(idx);
    setShowFeedback(true);
  };

  const handleNextStep = () => {
    playSoftClick();
    const currentStep = activeRoundtable.steps[currentStepIdx];
    const isCorrect = currentStep.options[selectedOptionIdx].isCorrect;

    if (!isCorrect) {
      setSelectedOptionIdx(null);
      setShowFeedback(false);
      return;
    }

    if (currentStepIdx + 1 < activeRoundtable.steps.length) {
      setCurrentStepIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setShowFeedback(false);
    } else {
      playSuccessChime();
      setIsFinished(true);
      
      const alreadyCompleted = (progress.debateCompleted || []).includes(activeRoundtableId);
      let nextXp = progress.xp || 0;
      let nextDebates = [...(progress.debateCompleted || [])];
      
      if (!alreadyCompleted) {
        nextXp += 40;
        nextDebates.push(activeRoundtableId);
      }
      
      const nextLevel = Math.floor(Math.sqrt(nextXp / 100)) + 1;
      saveProgress({
        ...progress,
        xp: nextXp,
        level: nextLevel,
        debateCompleted: nextDebates
      });
    }
  };

  if (!activeRoundtableId) {
    return (
      <div className="debate-container page-transition">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          {setView && (
            <button className="btn btn-secondary" onClick={() => { playSoftClick(); setView('dashboard'); }} style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}>
              ← Quay lại Trang bìa
            </button>
          )}
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>
            6 Biên bản Tranh biện Học thuật
          </span>
        </div>

        <div className="card" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>Bàn Tròn Tranh Biện Học Thuật (6 Chuyên đề)</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Văn phòng Tổng biên tập Tạp chí The Dialectic. Hiệu đính biên bản đối thoại giữa các nhân vật lịch sử để làm rõ lý luận và chuẩn bị xuất bản số chuyên san.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {roundtables.map((r, idx) => {
            const isDone = (progress.debateCompleted || []).includes(r.id);
            return (
              <div key={r.id} className={`card stagger-item stagger-${Math.min(idx + 1, 7)}`} style={{ display: 'flex', justifyContent: 'space-between', border: isDone ? '1px solid var(--color-success)' : '1px solid var(--border-color)', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="article-cat" style={{ color: isDone ? 'var(--color-success)' : 'var(--accent-gold)' }}>Biên bản số 0{idx + 1}</span>
                    {isDone && <span style={{ color: 'var(--color-success)', fontWeight: 'bold', fontSize: '0.75rem' }}>✓ Đã duyệt xuất bản (+40 XP)</span>}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{r.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Người đối thoại: {r.author}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{r.scenario}</p>
                </div>
                <button className="btn btn-primary" onClick={() => startRoundtable(r.id)}>
                  {isDone ? 'Kiểm duyệt lại' : 'Hiệu đính bản thảo'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const currentStep = activeRoundtable.steps[currentStepIdx];

  return (
    <div className="debate-container page-transition">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button className="btn btn-secondary" onClick={() => { playSoftClick(); setActiveRoundtableId(null); }} style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}>
          ← Trở lại danh mục bản thảo
        </button>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Trang bản thảo {currentStepIdx + 1} / {activeRoundtable.steps.length}
        </span>
      </div>

      {isFinished ? (
        <div className="card page-transition" style={{ border: '2px solid var(--color-success)', background: 'rgba(16, 185, 129, 0.02)', textAlign: 'center', padding: '3rem 2rem' }}>
          <h2 style={{ color: 'var(--color-success)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Bản Thảo Đã Hoàn Thiện!</h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            Biên bản bàn tròn đối thoại học thuật với <strong>{activeRoundtable.author}</strong> đã được kiểm duyệt chính xác các luận điểm và sẵn sàng in xuất bản.
          </p>
          <button className="btn btn-primary" onClick={() => { playSoftClick(); setActiveRoundtableId(null); }}>Quay lại Bàn biên tập</button>
        </div>
      ) : (
        <div>
          {/* Transcript Log Window */}
          <div className="roundtable-log">
            <div className="speaker-line">
              <div className="speaker-tag">
                {currentStep.speaker} <span className="speaker-desc">({currentStep.desc})</span>
              </div>
              <div className="speaker-quote">
                "{currentStep.text}"
              </div>
            </div>
          </div>

          {/* Edit options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-gold)' }}>Chọn chú thích hiệu đính của ban biên tập:</h4>
            {currentStep.options.map((opt, oIdx) => {
              const isSelected = selectedOptionIdx === oIdx;
              let cardStyle = {};
              if (showFeedback && isSelected) {
                cardStyle = opt.isCorrect 
                  ? { borderColor: 'var(--color-success)', background: 'rgba(16, 185, 129, 0.05)' } 
                  : { borderColor: 'var(--color-error)', background: 'rgba(239, 68, 68, 0.05)' };
              }
              return (
                <button
                  key={oIdx}
                  className="debate-option-btn"
                  style={{ ...cardStyle, padding: '1rem 1.25rem', fontSize: '0.9rem', border: isSelected ? '1px solid var(--accent-burgundy)' : '1px solid var(--border-color)' }}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={showFeedback}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          {/* Feedback Box */}
          {showFeedback && (
            <div 
              className={`debate-feedback-box ${currentStep.options[selectedOptionIdx].isCorrect ? 'correct' : 'incorrect'}`}
            >
              <div className="debate-feedback-header" style={{ fontWeight: 'bold' }}>
                {currentStep.options[selectedOptionIdx].isCorrect ? '✓ Hiệu đính chuẩn xác!' : '✗ Lỗi chú giải biên tập!'}
              </div>
              <div className="debate-feedback-body" style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {currentStep.options[selectedOptionIdx].feedback}
              </div>
              <button 
                className="btn btn-primary"
                style={{ 
                  marginTop: '1rem', 
                  backgroundColor: currentStep.options[selectedOptionIdx].isCorrect ? 'var(--color-success)' : 'var(--color-error)',
                  padding: '0.4rem 1rem',
                  fontSize: '0.75rem'
                }}
                onClick={handleNextStep}
              >
                {currentStep.options[selectedOptionIdx].isCorrect ? 'Tiếp tục biên tập →' : 'Chọn chú thích khác'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
