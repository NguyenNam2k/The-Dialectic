"use strict";

const STORAGE_KEYS = {
  theme: "mln131_theme",
  progress: "mln131_progress"
};

const QUESTION_COUNT_OPTIONS = [10, 20, 30, 40, 50, 60, 70];

const chapters = [
  {
    id: 1,
    title: "Nhập môn Chủ nghĩa xã hội khoa học",
    page: 7,
    intro:
      "Chương 1 giúp người học nắm khái quát sự ra đời, quá trình phát triển, đối tượng nghiên cứu, phương pháp và ý nghĩa của môn Chủ nghĩa xã hội khoa học.",
    sections: [
      {
        title: "1. Sự ra đời của Chủ nghĩa xã hội khoa học",
        points: [
          "Chủ nghĩa xã hội khoa học được hiểu theo hai nghĩa: nghĩa rộng là chủ nghĩa Mác - Lênin; nghĩa hẹp là một trong ba bộ phận hợp thành chủ nghĩa Mác - Lênin.",
          "Sự ra đời của môn học gắn với yêu cầu nhận thức và cải tạo xã hội tư bản chủ nghĩa trong thời kỳ công nghiệp phát triển mạnh.",
          "Bối cảnh trực tiếp là những năm 40 thế kỷ XIX khi phong trào công nhân chuyển từ tự phát sang tự giác và đòi hỏi một lý luận soi đường."
        ]
      },
      {
        title: "2. Điều kiện kinh tế - xã hội và tiền đề tư tưởng",
        points: [
          "Cuộc cách mạng công nghiệp làm xuất hiện nền đại công nghiệp và làm sâu sắc mâu thuẫn giữa lực lượng sản xuất với quan hệ sản xuất tư bản chủ nghĩa.",
          "Phong trào công nhân ở Anh, Pháp, Đức chứng minh giai cấp công nhân đã trở thành lực lượng chính trị độc lập.",
          "Các tiền đề lý luận và khoa học quan trọng gồm: triết học cổ điển Đức, kinh tế chính trị học cổ điển Anh, chủ nghĩa xã hội không tưởng phê phán; cùng các thành tựu như học thuyết tiến hóa, định luật bảo toàn và chuyển hóa năng lượng, học thuyết tế bào."
        ]
      },
      {
        title: "3. Vai trò của C.Mác, Ph.Ăngghen và V.I.Lênin",
        points: [
          "C.Mác và Ph.Ăngghen đã thực hiện ba phát kiến vĩ đại: chủ nghĩa duy vật lịch sử, học thuyết giá trị thặng dư và học thuyết sứ mệnh lịch sử của giai cấp công nhân.",
          "Tuyên ngôn của Đảng Cộng sản (1848) là mốc đánh dấu sự ra đời về cơ bản của Chủ nghĩa xã hội khoa học.",
          "V.I.Lênin phát triển lý luận trong điều kiện chủ nghĩa tư bản chuyển sang giai đoạn đế quốc chủ nghĩa và sau thắng lợi của Cách mạng Tháng Mười Nga."
        ]
      },
      {
        title: "4. Đối tượng và phương pháp nghiên cứu",
        points: [
          "Đối tượng nghiên cứu là các quy luật, tính quy luật chính trị - xã hội của quá trình hình thành và phát triển hình thái kinh tế - xã hội cộng sản chủ nghĩa.",
          "Phương pháp luận chung là chủ nghĩa duy vật biện chứng và chủ nghĩa duy vật lịch sử.",
          "Môn học còn sử dụng các phương pháp như lịch sử - lôgíc, phân tích - tổng hợp, so sánh, tổng kết thực tiễn và tiếp cận liên ngành."
        ]
      },
      {
        title: "5. Ý nghĩa học tập môn học",
        points: [
          "Giúp sinh viên có thế giới quan và phương pháp luận khoa học khi tiếp cận các vấn đề xã hội.",
          "Củng cố niềm tin vào con đường đi lên chủ nghĩa xã hội và vào công cuộc đổi mới ở Việt Nam.",
          "Tạo nền tảng để vận dụng kiến thức vào học tập, công tác và đời sống chính trị - xã hội hiện nay."
        ]
      }
    ],
    keywords: ["CNXHKH", "Tuyên ngôn 1848", "Mác - Ăngghen", "Lênin", "Đối tượng", "Phương pháp", "Ý nghĩa"],
    review: [
      "Phân biệt Chủ nghĩa xã hội khoa học theo nghĩa rộng và nghĩa hẹp.",
      "Nêu các điều kiện kinh tế - xã hội dẫn đến sự ra đời của CNXHKH.",
      "Trình bày ba phát kiến vĩ đại của C.Mác và Ph.Ăngghen.",
      "Nêu đối tượng nghiên cứu và ý nghĩa học tập môn học."
    ]
  },
  {
    id: 2,
    title: "Sứ mệnh lịch sử của giai cấp công nhân",
    page: 27,
    intro:
      "Chương 2 tập trung làm rõ vị trí, đặc điểm, nội dung sứ mệnh lịch sử của giai cấp công nhân và vai trò của Đảng Cộng sản trong quá trình thực hiện sứ mệnh đó.",
    sections: [
      {
        title: "1. Khái niệm và đặc điểm của giai cấp công nhân",
        points: [
          "Giai cấp công nhân là giai cấp của những người lao động trong nền sản xuất công nghiệp hiện đại, trực tiếp hoặc gián tiếp vận hành tư liệu sản xuất có tính xã hội hóa cao.",
          "Đặc trưng cơ bản là lao động công nghiệp, bị tước đoạt tư liệu sản xuất chủ yếu và phải bán sức lao động cho nhà tư bản.",
          "Trong thời đại ngày nay, giai cấp công nhân có sự biến đổi về cơ cấu nghề nghiệp, trình độ tri thức, kỹ năng công nghệ nhưng bản chất không thay đổi."
        ]
      },
      {
        title: "2. Nội dung sứ mệnh lịch sử",
        points: [
          "Về kinh tế: xóa bỏ chế độ chiếm hữu tư nhân tư bản chủ nghĩa, xây dựng chế độ công hữu phù hợp và lực lượng sản xuất hiện đại.",
          "Về chính trị - xã hội: giành chính quyền, thiết lập nhà nước của nhân dân lao động, tổ chức xã hội mới công bằng và tiến bộ.",
          "Về văn hóa - tư tưởng: xây dựng hệ giá trị mới, đấu tranh chống tư tưởng phản tiến bộ và giải phóng con người toàn diện."
        ]
      },
      {
        title: "3. Điều kiện khách quan quy định sứ mệnh",
        points: [
          "Địa vị kinh tế của giai cấp công nhân trong nền đại công nghiệp quy định khả năng lãnh đạo xã hội mới.",
          "Lợi ích cơ bản của giai cấp công nhân thống nhất với lợi ích của đa số nhân dân lao động.",
          "Tính tổ chức, kỷ luật và tinh thần cách mạng triệt để giúp giai cấp công nhân có khả năng đảm đương vai trò lịch sử."
        ]
      },
      {
        title: "4. Điều kiện chủ quan và vai trò của Đảng Cộng sản",
        points: [
          "Bản thân giai cấp công nhân cần trưởng thành về số lượng, chất lượng, ý thức giai cấp và năng lực tổ chức.",
          "Đảng Cộng sản là đội tiên phong, đại biểu trung thành lợi ích của giai cấp công nhân và dân tộc.",
          "Liên minh công - nông - trí thức là cơ sở xã hội để mở rộng lực lượng cách mạng và thực hiện sứ mệnh lịch sử."
        ]
      },
      {
        title: "5. Giai cấp công nhân Việt Nam",
        points: [
          "Giai cấp công nhân Việt Nam ra đời trước giai cấp tư sản dân tộc, gắn bó chặt chẽ với nông dân và dân tộc.",
          "Trong thời kỳ đổi mới, giai cấp công nhân phải đi đầu trong công nghiệp hóa, hiện đại hóa, kinh tế tri thức và chuyển đổi số.",
          "Việc xây dựng giai cấp công nhân vững mạnh là nhiệm vụ chiến lược lâu dài của Đảng, Nhà nước và toàn xã hội."
        ]
      }
    ],
    keywords: ["Giai cấp công nhân", "Sứ mệnh lịch sử", "Đảng Cộng sản", "Liên minh công - nông - trí thức", "Công nhân Việt Nam"],
    review: [
      "Nêu khái niệm và đặc điểm của giai cấp công nhân hiện đại.",
      "Trình bày ba nội dung cơ bản của sứ mệnh lịch sử của giai cấp công nhân.",
      "Phân tích vai trò của Đảng Cộng sản trong việc thực hiện sứ mệnh lịch sử.",
      "Liên hệ sứ mệnh của giai cấp công nhân Việt Nam trong thời kỳ đổi mới."
    ]
  },
  {
    id: 3,
    title: "Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội",
    page: 48,
    intro:
      "Chương 3 giúp người học hiểu bản chất của chủ nghĩa xã hội, tính tất yếu của thời kỳ quá độ và những nội dung xây dựng chủ nghĩa xã hội trong thực tiễn.",
    sections: [
      {
        title: "1. Chủ nghĩa xã hội là gì?",
        points: [
          "Chủ nghĩa xã hội là giai đoạn đầu của hình thái kinh tế - xã hội cộng sản chủ nghĩa, kế thừa thành tựu của nhân loại và tổ chức xã hội trên nền tảng giải phóng con người.",
          "Mục tiêu bao quát là dân giàu, nước mạnh, dân chủ, công bằng, văn minh; con người có điều kiện phát triển toàn diện.",
          "Các đặc trưng cơ bản bao gồm chế độ công hữu phù hợp, nền sản xuất hiện đại, nhà nước của nhân dân, quan hệ xã hội tiến bộ và đời sống tinh thần lành mạnh."
        ]
      },
      {
        title: "2. Tính tất yếu của thời kỳ quá độ",
        points: [
          "Không thể chuyển ngay từ chủ nghĩa tư bản hoặc từ xã hội tiền tư bản lên chủ nghĩa cộng sản hoàn chỉnh mà phải trải qua một thời kỳ quá độ.",
          "Thời kỳ quá độ là giai đoạn cải biến sâu sắc, toàn diện từ xã hội cũ sang xã hội mới trên tất cả các lĩnh vực.",
          "Tính tất yếu bắt nguồn từ sự khác biệt căn bản giữa xã hội cũ và xã hội mới, cũng như yêu cầu tạo lập cơ sở vật chất và kiến trúc thượng tầng phù hợp."
        ]
      },
      {
        title: "3. Đặc điểm của thời kỳ quá độ",
        points: [
          "Tồn tại đan xen cái cũ và cái mới, giữa yếu tố xã hội chủ nghĩa với yếu tố phi xã hội chủ nghĩa.",
          "Cơ cấu kinh tế nhiều thành phần, nhiều hình thức sở hữu và nhiều hình thức phân phối cùng tồn tại trong một thời gian dài.",
          "Đây là quá trình lâu dài, phức tạp, vừa xây dựng vừa đấu tranh để loại bỏ những tàn dư của xã hội cũ."
        ]
      },
      {
        title: "4. Nội dung xây dựng chủ nghĩa xã hội",
        points: [
          "Trên lĩnh vực kinh tế: phát triển lực lượng sản xuất, công nghiệp hóa, hiện đại hóa, hoàn thiện quan hệ sản xuất mới.",
          "Trên lĩnh vực chính trị: xây dựng nhà nước pháp quyền xã hội chủ nghĩa, phát huy dân chủ và tăng cường khối đại đoàn kết toàn dân.",
          "Trên lĩnh vực văn hóa - xã hội: xây dựng con người mới, nâng cao đời sống, thực hiện tiến bộ và công bằng xã hội."
        ]
      },
      {
        title: "5. Liên hệ Việt Nam",
        points: [
          "Việt Nam quá độ lên chủ nghĩa xã hội bỏ qua chế độ tư bản chủ nghĩa nhưng tiếp thu thành tựu nhân loại mà chủ nghĩa tư bản đã tạo ra.",
          "Đường lối đổi mới khẳng định phát triển kinh tế thị trường định hướng xã hội chủ nghĩa là mô hình phù hợp trong thời kỳ quá độ.",
          "Các nhiệm vụ trọng tâm là phát triển kinh tế nhanh và bền vững, giữ vững định hướng xã hội chủ nghĩa và nâng cao chất lượng đời sống nhân dân."
        ]
      }
    ],
    keywords: ["Chủ nghĩa xã hội", "Thời kỳ quá độ", "Đặc trưng", "Kinh tế nhiều thành phần", "Định hướng XHCN"],
    review: [
      "Trình bày khái niệm và đặc trưng cơ bản của chủ nghĩa xã hội.",
      "Vì sao phải trải qua thời kỳ quá độ lên chủ nghĩa xã hội?",
      "Nêu những đặc điểm nổi bật của thời kỳ quá độ.",
      "Liên hệ con đường đi lên chủ nghĩa xã hội ở Việt Nam."
    ]
  },
  {
    id: 4,
    title: "Dân chủ xã hội chủ nghĩa và Nhà nước xã hội chủ nghĩa",
    page: 68,
    intro:
      "Chương 4 làm rõ bản chất, đặc trưng của dân chủ xã hội chủ nghĩa và Nhà nước xã hội chủ nghĩa; từ đó giúp người học hiểu yêu cầu xây dựng nền dân chủ và nhà nước pháp quyền ở Việt Nam.",
    sections: [
      {
        title: "1. Dân chủ xã hội chủ nghĩa",
        points: [
          "Dân chủ xã hội chủ nghĩa là nền dân chủ cao hơn về chất so với các kiểu dân chủ trước đó vì gắn với quyền làm chủ thực sự của nhân dân lao động.",
          "Bản chất của dân chủ xã hội chủ nghĩa thể hiện ở chỗ mọi quyền lực thuộc về nhân dân, dân chủ gắn với kỷ cương và lợi ích của đại đa số nhân dân.",
          "Dân chủ được thực hiện trên tất cả các lĩnh vực: chính trị, kinh tế, văn hóa, xã hội và trong đời sống hằng ngày."
        ]
      },
      {
        title: "2. Nhà nước xã hội chủ nghĩa",
        points: [
          "Nhà nước xã hội chủ nghĩa là tổ chức quyền lực chính trị của nhân dân lao động dưới sự lãnh đạo của giai cấp công nhân thông qua Đảng Cộng sản.",
          "Bản chất của nhà nước xã hội chủ nghĩa thống nhất giữa tính giai cấp công nhân với tính nhân dân rộng rãi và tính dân tộc sâu sắc.",
          "Nhà nước vừa là công cụ chuyên chính với các thế lực chống đối, vừa là công cụ tổ chức xây dựng xã hội mới."
        ]
      },
      {
        title: "3. Chức năng và nhiệm vụ",
        points: [
          "Nhà nước xã hội chủ nghĩa thực hiện các chức năng đối nội và đối ngoại, trong đó trọng tâm là phát triển kinh tế, bảo đảm trật tự xã hội, bảo vệ Tổ quốc và quyền làm chủ của nhân dân.",
          "Dân chủ xã hội chủ nghĩa chỉ được bảo đảm thực chất khi có nhà nước đủ năng lực tổ chức và pháp luật nghiêm minh.",
          "Mối quan hệ giữa dân chủ và pháp luật là thống nhất: dân chủ phải trong khuôn khổ pháp luật và pháp luật phải bảo vệ dân chủ."
        ]
      },
      {
        title: "4. Dân chủ và nhà nước pháp quyền ở Việt Nam",
        points: [
          "Việt Nam xây dựng nền dân chủ xã hội chủ nghĩa gắn với mục tiêu phát huy quyền làm chủ của nhân dân trên mọi lĩnh vực.",
          "Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam của nhân dân, do nhân dân, vì nhân dân đặt dưới sự lãnh đạo của Đảng Cộng sản Việt Nam.",
          "Yêu cầu quan trọng là đẩy mạnh cải cách hành chính, kiểm soát quyền lực, xây dựng đội ngũ cán bộ trong sạch và nâng cao hiệu lực quản lý."
        ]
      },
      {
        title: "5. Ý nghĩa thực tiễn",
        points: [
          "Học chương này giúp phân biệt đúng bản chất dân chủ xã hội chủ nghĩa với các quan niệm dân chủ hình thức.",
          "Giúp thấy rõ vai trò của nhà nước trong bảo đảm quyền con người, quyền công dân và tổ chức phát triển đất nước.",
          "Đây là cơ sở để sinh viên có thái độ đúng đắn với việc thực hiện pháp luật và tham gia đời sống chính trị - xã hội."
        ]
      }
    ],
    keywords: ["Dân chủ XHCN", "Nhà nước XHCN", "Nhà nước pháp quyền", "Quyền làm chủ", "Pháp luật"],
    review: [
      "Nêu bản chất của dân chủ xã hội chủ nghĩa.",
      "Trình bày bản chất và chức năng của Nhà nước xã hội chủ nghĩa.",
      "Phân tích mối quan hệ giữa dân chủ và pháp luật.",
      "Liên hệ việc xây dựng Nhà nước pháp quyền XHCN Việt Nam hiện nay."
    ]
  },
  {
    id: 5,
    title: "Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội",
    page: 89,
    intro:
      "Chương 5 phân tích cơ cấu xã hội - giai cấp trong thời kỳ quá độ, xu hướng biến đổi của các giai cấp, tầng lớp và vai trò của liên minh giai cấp trong xây dựng chủ nghĩa xã hội.",
    sections: [
      {
        title: "1. Cơ cấu xã hội - giai cấp là gì?",
        points: [
          "Cơ cấu xã hội - giai cấp là tổng thể các giai cấp, tầng lớp xã hội cùng mối quan hệ giữa chúng trong một xã hội nhất định.",
          "Trong thời kỳ quá độ, cơ cấu này biến đổi mạnh do sự phát triển kinh tế thị trường, công nghiệp hóa, hiện đại hóa và hội nhập quốc tế.",
          "Nghiên cứu cơ cấu xã hội - giai cấp giúp xác định đúng lực lượng xã hội, chính sách và phương thức vận động quần chúng."
        ]
      },
      {
        title: "2. Các giai cấp, tầng lớp cơ bản",
        points: [
          "Giai cấp công nhân giữ vai trò lãnh đạo thông qua Đảng Cộng sản.",
          "Giai cấp nông dân là lực lượng xã hội to lớn, có vai trò quan trọng trong bảo đảm ổn định chính trị - xã hội và an ninh lương thực.",
          "Đội ngũ trí thức là lực lượng lao động sáng tạo đặc biệt, có vai trò ngày càng lớn trong phát triển kinh tế tri thức và khoa học công nghệ."
        ]
      },
      {
        title: "3. Liên minh giai cấp, tầng lớp",
        points: [
          "Liên minh công nhân - nông dân - trí thức là nền tảng chính trị - xã hội vững chắc của khối đại đoàn kết toàn dân tộc.",
          "Liên minh này xuất phát từ yêu cầu khách quan của cách mạng xã hội chủ nghĩa và từ lợi ích thống nhất lâu dài giữa các lực lượng cơ bản.",
          "Trong thực tiễn cần mở rộng liên minh với doanh nhân, thanh niên, phụ nữ và các tầng lớp xã hội khác theo định hướng phát triển đất nước."
        ]
      },
      {
        title: "4. Xu hướng biến đổi trong thời kỳ quá độ",
        points: [
          "Cơ cấu nghề nghiệp ngày càng đa dạng, xuất hiện nhiều tầng lớp mới và sự dịch chuyển lao động mạnh mẽ giữa các khu vực kinh tế.",
          "Khoảng cách về lợi ích, thu nhập và trình độ có thể gia tăng nếu không có chính sách điều tiết hợp lý.",
          "Do đó cần gắn phát triển kinh tế với tiến bộ, công bằng xã hội và chính sách an sinh bền vững."
        ]
      },
      {
        title: "5. Liên hệ Việt Nam",
        points: [
          "Ở Việt Nam, cơ cấu xã hội - giai cấp đang biến đổi theo hướng hiện đại nhưng vẫn phải bảo đảm ổn định và đồng thuận xã hội.",
          "Đảng và Nhà nước cần xây dựng chính sách hài hòa lợi ích giữa các giai cấp, tầng lớp.",
          "Mục tiêu là phát huy sức mạnh của toàn dân tộc trong xây dựng và bảo vệ Tổ quốc xã hội chủ nghĩa."
        ]
      }
    ],
    keywords: ["Cơ cấu xã hội - giai cấp", "Liên minh công - nông - trí thức", "Biến đổi xã hội", "Đại đoàn kết"],
    review: [
      "Nêu khái niệm cơ cấu xã hội - giai cấp.",
      "Trình bày vai trò của giai cấp công nhân, nông dân và trí thức trong thời kỳ quá độ.",
      "Phân tích tính tất yếu của liên minh công nhân - nông dân - trí thức.",
      "Liên hệ thực tiễn biến đổi cơ cấu xã hội - giai cấp ở Việt Nam hiện nay."
    ]
  },
  {
    id: 6,
    title: "Vấn đề dân tộc và tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội",
    page: 105,
    intro:
      "Chương 6 trang bị kiến thức cơ bản về vấn đề dân tộc, tôn giáo, những nguyên tắc giải quyết các vấn đề này trong thời kỳ quá độ và quan điểm của Đảng, Nhà nước Việt Nam.",
    sections: [
      {
        title: "1. Vấn đề dân tộc",
        points: [
          "Dân tộc được hiểu theo hai nghĩa phổ biến: cộng đồng người ổn định có chung ngôn ngữ, lãnh thổ, kinh tế và văn hóa; hoặc cộng đồng quốc gia - dân tộc.",
          "Vấn đề dân tộc là tổng hòa các mối quan hệ giữa các dân tộc với nhau và giữa các dân tộc với quốc gia - dân tộc.",
          "Trong thời kỳ quá độ, giải quyết đúng vấn đề dân tộc có ý nghĩa chiến lược đối với ổn định và phát triển đất nước."
        ]
      },
      {
        title: "2. Cương lĩnh dân tộc của chủ nghĩa Mác - Lênin",
        points: [
          "Các dân tộc hoàn toàn bình đẳng.",
          "Các dân tộc có quyền tự quyết.",
          "Liên hiệp công nhân tất cả các dân tộc là nguyên tắc xuyên suốt để giải quyết vấn đề dân tộc trên lập trường giai cấp công nhân."
        ]
      },
      {
        title: "3. Vấn đề tôn giáo",
        points: [
          "Tôn giáo là hiện tượng xã hội - lịch sử, phản ánh hiện thực khách quan một cách hư ảo và tồn tại lâu dài trong đời sống xã hội.",
          "Nguồn gốc của tôn giáo gắn với nhận thức, tâm lý, kinh tế - xã hội và những hạn chế trong điều kiện sống của con người.",
          "Trong thời kỳ quá độ, tôn giáo còn tồn tại lâu dài và có những biến đổi cùng với sự phát triển của xã hội."
        ]
      },
      {
        title: "4. Nguyên tắc giải quyết vấn đề dân tộc và tôn giáo",
        points: [
          "Bảo đảm bình đẳng, đoàn kết, tôn trọng và giúp nhau cùng phát triển giữa các dân tộc.",
          "Tôn trọng và bảo đảm quyền tự do tín ngưỡng, tôn giáo và quyền không tín ngưỡng, tôn giáo của công dân.",
          "Kiên quyết đấu tranh với mọi âm mưu lợi dụng dân tộc, tôn giáo để chống phá chế độ, chia rẽ khối đại đoàn kết dân tộc."
        ]
      },
      {
        title: "5. Quan điểm của Đảng và Nhà nước Việt Nam",
        points: [
          "Vấn đề dân tộc và đoàn kết các dân tộc luôn có vị trí chiến lược trong cách mạng Việt Nam.",
          "Chính sách dân tộc và tôn giáo nhất quán là bình đẳng, đoàn kết, tôn trọng, giúp nhau cùng phát triển; đồng thời bảo đảm quyền tự do tín ngưỡng, tôn giáo.",
          "Cần gắn phát triển kinh tế - xã hội vùng đồng bào dân tộc thiểu số với giữ gìn bản sắc văn hóa và bảo đảm quốc phòng, an ninh."
        ]
      }
    ],
    keywords: ["Dân tộc", "Cương lĩnh dân tộc", "Tôn giáo", "Tự do tín ngưỡng", "Đoàn kết dân tộc"],
    review: [
      "Trình bày cương lĩnh dân tộc của chủ nghĩa Mác - Lênin.",
      "Nêu đặc điểm tồn tại của tôn giáo trong thời kỳ quá độ lên CNXH.",
      "Trình bày các nguyên tắc giải quyết vấn đề dân tộc và tôn giáo.",
      "Liên hệ chính sách dân tộc, tôn giáo ở Việt Nam hiện nay."
    ]
  },
  {
    id: 7,
    title: "Vấn đề gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội",
    page: 128,
    intro:
      "Chương 7 giúp người học hiểu bản chất, vị trí, chức năng của gia đình và những định hướng xây dựng gia đình Việt Nam trong thời kỳ quá độ lên chủ nghĩa xã hội.",
    sections: [
      {
        title: "1. Khái niệm và vị trí của gia đình",
        points: [
          "Gia đình là một hình thức cộng đồng xã hội đặc biệt, được hình thành trên cơ sở hôn nhân, huyết thống hoặc nuôi dưỡng.",
          "Gia đình là tế bào của xã hội, môi trường đầu tiên nuôi dưỡng và hình thành nhân cách con người.",
          "Trong thời kỳ quá độ, gia đình vừa chịu tác động của biến đổi xã hội, vừa góp phần duy trì ổn định và phát triển xã hội."
        ]
      },
      {
        title: "2. Chức năng cơ bản của gia đình",
        points: [
          "Chức năng tái sản xuất ra con người.",
          "Chức năng nuôi dưỡng, giáo dục và hình thành nhân cách.",
          "Chức năng kinh tế, tổ chức đời sống vật chất và tiêu dùng; đồng thời thỏa mãn nhu cầu tâm sinh lý, tình cảm của các thành viên."
        ]
      },
      {
        title: "3. Cơ sở xây dựng gia đình mới xã hội chủ nghĩa",
        points: [
          "Gia đình mới được xây dựng trên cơ sở hôn nhân tự nguyện, tiến bộ, một vợ một chồng, vợ chồng bình đẳng.",
          "Quan hệ giữa các thành viên dựa trên tình yêu thương, tôn trọng, trách nhiệm và cùng chia sẻ công việc.",
          "Xây dựng gia đình mới gắn với sự phát triển của kinh tế, văn hóa, pháp luật và chính sách xã hội."
        ]
      },
      {
        title: "4. Biến đổi của gia đình Việt Nam hiện nay",
        points: [
          "Quy mô gia đình nhỏ hơn, mô hình hạt nhân phổ biến hơn, quan hệ gia đình dân chủ hơn.",
          "Tuy nhiên cũng xuất hiện nhiều thách thức như ly hôn, bạo lực gia đình, khoảng cách thế hệ, áp lực kinh tế và tác động của mạng xã hội.",
          "Do đó cần kết hợp vai trò của gia đình, nhà trường, xã hội và pháp luật trong xây dựng gia đình văn hóa."
        ]
      },
      {
        title: "5. Phương hướng xây dựng gia đình Việt Nam",
        points: [
          "Phát huy các giá trị truyền thống tốt đẹp của gia đình Việt Nam đồng thời tiếp thu các giá trị tiến bộ của thời đại.",
          "Thực hiện bình đẳng giới, chăm lo bảo vệ trẻ em, người cao tuổi và các nhóm yếu thế.",
          "Xây dựng gia đình no ấm, tiến bộ, hạnh phúc, văn minh là mục tiêu quan trọng trong phát triển con người Việt Nam toàn diện."
        ]
      }
    ],
    keywords: ["Gia đình", "Chức năng gia đình", "Gia đình mới XHCN", "Bình đẳng giới", "Gia đình Việt Nam"],
    review: [
      "Nêu khái niệm và vị trí của gia đình trong xã hội.",
      "Trình bày các chức năng cơ bản của gia đình.",
      "Phân tích cơ sở xây dựng gia đình mới xã hội chủ nghĩa.",
      "Liên hệ các biến đổi của gia đình Việt Nam hiện nay."
    ]
  }
];

const flashcards = Array.isArray(window.FLASHCARDS) ? window.FLASHCARDS : [];

const state = {
  view: "overview",
  selectedChapterId: 1,
  flashcardFilter: "all",
  flashcardSearch: "",
  flashcardPage: 1,
  flashcardPageSize: 12,
  flippedCards: new Set(),
  quizConfig: {
    chapter: "1",
    mode: "practice",
    count: 10
  },
  quizSession: null,
  progress: loadProgress()
};

function loadProgress() {
  const defaultProgress = { learnedChapters: [], bestScore: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.progress);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      learnedChapters: Array.isArray(parsed.learnedChapters) ? parsed.learnedChapters : [],
      bestScore: typeof parsed.bestScore === "number" ? parsed.bestScore : 0
    };
  } catch (_) {
    return defaultProgress;
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(state.progress));
  updateGlobalProgress();
}

function loadTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.theme);
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    const toggle = document.getElementById("themeToggle");
    if (toggle) toggle.textContent = "☀";
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const isDark = current === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem(STORAGE_KEYS.theme, "light");
    document.getElementById("themeToggle").textContent = "☾";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem(STORAGE_KEYS.theme, "dark");
    document.getElementById("themeToggle").textContent = "☀";
  }
}

function getChapterById(id) {
  return chapters.find((chapter) => chapter.id === Number(id));
}

function getFlashcardsByChapter(chapterId) {
  const id = Number(chapterId);
  return flashcards
    .map((card, index) => ({ ...card, _index: index }))
    .filter((card) => card.chapter === id);
}

function updateGlobalProgress() {
  const completed = state.progress.learnedChapters.length;
  const percent = Math.round((completed / chapters.length) * 100);
  const ring = document.getElementById("progressRing");
  const percentEl = document.getElementById("progressPercent");
  const countEl = document.getElementById("completedCount");
  const scoreEl = document.getElementById("bestScore");

  if (ring) ring.style.setProperty("--progress", `${Math.max(percent, 1)}%`);
  if (percentEl) percentEl.textContent = `${percent}%`;
  if (countEl) countEl.textContent = String(completed);
  if (scoreEl) scoreEl.textContent = `${state.progress.bestScore}%`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function setActiveNav(view) {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
}

function goToView(view, options = {}) {
  state.view = view;
  if (options.chapterId) state.selectedChapterId = Number(options.chapterId);
  if (view === "flashcards" && options.chapterId) {
    state.flashcardFilter = String(options.chapterId);
    state.flashcardPage = 1;
  }
  if (view === "quiz" && options.chapterId) {
    state.quizConfig.chapter = String(options.chapterId);
    state.quizConfig.count = 10;
    state.quizSession = null;
  }
  setActiveNav(view);
  renderApp();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderOverview() {
  return `
    <div class="section-heading">
      <div>
        <h2>Tổng quan lộ trình ôn tập</h2>
        <p>Bạn nên học theo đúng thứ tự: lý thuyết → flashcard → trắc nghiệm/kiểm tra.</p>
      </div>
    </div>

    <div class="stats-grid">
      <article class="stat-card">
        <span>Tổng số chương</span>
        <strong>${chapters.length}</strong>
        <p>Đầy đủ theo giáo trình MLN131.</p>
      </article>
      <article class="stat-card">
        <span>Tổng flashcard</span>
        <strong>${flashcards.length}</strong>
        <p>Mỗi chương có đúng 70 flashcard.</p>
      </article>
      <article class="stat-card">
        <span>Trắc nghiệm/chương</span>
        <strong>70</strong>
        <p>Có thể chọn 10, 20, 30, 40, 50, 60 hoặc 70 câu.</p>
      </article>
      <article class="stat-card">
        <span>Tiến độ lý thuyết</span>
        <strong>${state.progress.learnedChapters.length}/7</strong>
        <p>Đánh dấu chương đã học để lưu tiến độ.</p>
      </article>
    </div>

    <div class="note-strip">
      <p><strong>Gợi ý học nhanh:</strong> Đọc tóm tắt từng chương ở mục <strong>Theo chương</strong>, sau đó sang <strong>Flashcard</strong> để nhớ khái niệm, cuối cùng làm <strong>Trắc nghiệm</strong> theo mức 10 → 70 câu.</p>
    </div>

    <div class="step-grid">
      <article class="card step-card">
        <div class="mini-badge">Bước 1</div>
        <h3>Đọc lý thuyết theo chương</h3>
        <p>Từng chương đã được tổng hợp lại theo ý chính để học đọc và nắm hệ thống kiến thức trước khi luyện câu hỏi.</p>
        <button class="primary-btn" data-go="chapters">Xem 7 chương</button>
      </article>
      <article class="card step-card">
        <div class="mini-badge">Bước 2</div>
        <h3>Học 70 flashcard/chương</h3>
        <p>Flashcard giúp ghi nhớ nhanh khái niệm, luận điểm, đặc trưng, nguyên tắc và các ý trọng tâm của từng chương.</p>
        <button class="secondary-btn" data-go="flashcards">Mở flashcard</button>
      </article>
      <article class="card step-card">
        <div class="mini-badge">Bước 3</div>
        <h3>Làm trắc nghiệm hoặc kiểm tra</h3>
        <p>Bạn có thể chọn bài 10, 20, 30, 40, 50, 60 hoặc 70 câu cho từng chương để tự luyện hoặc tự kiểm tra.</p>
        <button class="secondary-btn" data-go="quiz">Bắt đầu làm bài</button>
      </article>
    </div>

    <div class="section-heading" style="margin-top:32px;">
      <div>
        <h2>7 chương trong giáo trình</h2>
        <p>Chọn một chương để đọc lý thuyết chi tiết.</p>
      </div>
    </div>

    <div class="chapter-grid">
      ${chapters.map(renderChapterCard).join("")}
    </div>
  `;
}

function renderChapterCard(chapter) {
  const learned = state.progress.learnedChapters.includes(chapter.id);
  return `
    <article class="card chapter-card">
      <div class="chapter-number">Chương ${chapter.id}</div>
      <h3>${chapter.title}</h3>
      <p>${chapter.intro}</p>
      <div class="chapter-meta">
        <span>Lý thuyết tóm tắt</span>
        <span>70 flashcard</span>
        <span>Tối đa 70 câu hỏi</span>
      </div>
      <footer>
        <span class="status-pill ${learned ? "done" : ""}">${learned ? "Đã học lý thuyết" : "Chưa đánh dấu"}</span>
        <div class="inline-toolbar">
          <button class="small-btn" data-chapter-detail="${chapter.id}">Học chương</button>
        </div>
      </footer>
    </article>
  `;
}

function renderChapters() {
  return `
    <div class="section-heading">
      <div>
        <h2>Học theo chương</h2>
        <p>Đây là phần đọc lý thuyết trước khi sang flashcard hoặc trắc nghiệm.</p>
      </div>
    </div>
    <div class="note-strip">
      <p><strong>Lưu ý:</strong> Sau khi đọc xong một chương, bạn có thể bấm <strong>Đánh dấu đã học lý thuyết</strong> để lưu tiến độ.</p>
    </div>
    <div class="chapter-grid">
      ${chapters.map(renderChapterCard).join("")}
    </div>
  `;
}

function renderChapterDetail(chapterId) {
  const chapter = getChapterById(chapterId);
  if (!chapter) return `<div class="empty-state">Không tìm thấy chương.</div>`;
  const learned = state.progress.learnedChapters.includes(chapter.id);

  return `
    <article class="card chapter-detail">
      <div class="detail-head">
        <div>
          <div class="chapter-number">Chương ${chapter.id} · Trang ${chapter.page}</div>
          <h2>${chapter.title}</h2>
          <p class="detail-intro">${chapter.intro}</p>
          <div class="keywords">
            ${chapter.keywords.map((item) => `<span class="keyword">${item}</span>`).join("")}
          </div>
        </div>
        <div class="detail-actions">
          <button class="primary-btn" data-mark-learned="${chapter.id}">${learned ? "Đã học lý thuyết ✓" : "Đánh dấu đã học lý thuyết"}</button>
          <button class="secondary-btn" data-go-flashcards="${chapter.id}">Học 70 flashcard</button>
          <button class="secondary-btn" data-go-quiz="${chapter.id}">Làm trắc nghiệm</button>
        </div>
      </div>

      <div class="theory-grid">
        ${chapter.sections
          .map(
            (section) => `
              <section class="content-box">
                <h3>${section.title}</h3>
                <ul>
                  ${section.points.map((point) => `<li>${point}</li>`).join("")}
                </ul>
              </section>
            `
          )
          .join("")}
      </div>

      <div class="tip-box">
        <h3>Tự ôn nhanh chương ${chapter.id}</h3>
        <ol>
          ${chapter.review.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      </div>
    </article>
  `;
}

function renderFlashcards() {
  const chapterOptions = ['<option value="all">Tất cả các chương</option>']
    .concat(chapters.map((chapter) => `<option value="${chapter.id}">Chương ${chapter.id} - ${chapter.title}</option>`))
    .join("");

  const query = state.flashcardSearch.trim().toLowerCase();
  const source = flashcards
    .map((card, index) => ({ ...card, _index: index }))
    .filter((card) => (state.flashcardFilter === "all" ? true : String(card.chapter) === state.flashcardFilter))
    .filter((card) => {
      if (!query) return true;
      return `${card.front} ${card.back}`.toLowerCase().includes(query);
    });

  const total = source.length;
  const totalPages = Math.max(1, Math.ceil(total / state.flashcardPageSize));
  if (state.flashcardPage > totalPages) state.flashcardPage = totalPages;
  const start = (state.flashcardPage - 1) * state.flashcardPageSize;
  const visible = source.slice(start, start + state.flashcardPageSize);
  const filterLabel = state.flashcardFilter === "all"
    ? `Tất cả ${flashcards.length} flashcard`
    : `Chương ${state.flashcardFilter} · ${getFlashcardsByChapter(Number(state.flashcardFilter)).length} flashcard`;

  return `
    <div class="section-heading">
      <div>
        <h2>Flashcard ôn tập</h2>
        <p>Mỗi chương có 70 flashcard. Bạn có thể lật thẻ để học theo kiểu hỏi - đáp.</p>
      </div>
    </div>

    <div class="toolbar">
      <select class="select-input" id="flashcardChapterSelect">
        ${chapterOptions}
      </select>
      <input class="search-input" id="flashcardSearchInput" type="search" placeholder="Tìm theo khái niệm, luận điểm..." value="${escapeAttr(state.flashcardSearch)}" />
    </div>

    <div class="note-strip">
      <p><strong>Bộ đang xem:</strong> ${filterLabel}. ${state.flashcardFilter !== "all" ? "Bạn nên đọc lý thuyết chương này trước rồi mới lật thẻ." : "Chọn một chương nếu muốn học tập trung."}</p>
    </div>

    ${visible.length ? `
      <div class="flashcard-grid">
        ${visible.map((card, idx) => renderFlashcardItem(card, start + idx + 1)).join("")}
      </div>
      <div class="pager">
        <span>Trang ${state.flashcardPage}/${totalPages} · Hiển thị ${visible.length}/${total} thẻ</span>
        <div class="inline-toolbar">
          <button class="ghost-btn" data-flash-page="prev" ${state.flashcardPage === 1 ? "disabled" : ""}>← Trang trước</button>
          <button class="ghost-btn" data-flash-page="next" ${state.flashcardPage === totalPages ? "disabled" : ""}>Trang sau →</button>
        </div>
      </div>
    ` : `<div class="empty-state">Không có flashcard nào phù hợp với bộ lọc hiện tại.</div>`}
  `;
}

function renderFlashcardItem(card, displayIndex) {
  const flipped = state.flippedCards.has(card._index);
  return `
    <article class="flip-card ${flipped ? "flipped" : ""}" data-flip-target="${card._index}">
      <div class="flip-card-inner">
        <div class="flip-face front">
          <h4>Mặt trước</h4>
          <p>${card.front}</p>
          <div class="flip-footer">
            <span class="flip-index">Thẻ ${displayIndex} · Chương ${card.chapter}</span>
            <button class="small-btn" data-flip="${card._index}">Lật thẻ</button>
          </div>
        </div>
        <div class="flip-face back">
          <h4>Mặt sau</h4>
          <p>${card.back}</p>
          <div class="flip-footer">
            <span class="flip-index">${card.direction === "reverse" ? "Nhận diện ngược" : "Hỏi → đáp"}</span>
            <button class="small-btn" data-flip="${card._index}">Lật lại</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderQuizSetup() {
  const chapterOptions = ['<option value="all">Ôn ngẫu nhiên từ tất cả chương (tối đa 70 câu)</option>']
    .concat(chapters.map((chapter) => `<option value="${chapter.id}">Chương ${chapter.id} - ${chapter.title}</option>`))
    .join("");

  return `
    <div class="section-heading">
      <div>
        <h2>Trắc nghiệm & kiểm tra</h2>
        <p>Mỗi chương có tối đa 70 câu. Chọn số câu muốn làm: 10, 20, 30, 40, 50, 60 hoặc 70.</p>
      </div>
    </div>

    <div class="quiz-shell">
      <div class="quiz-card">
        <h3>Thiết lập bài làm</h3>
        <div class="toolbar">
          <select id="quizChapterSelect" class="select-input">
            ${chapterOptions}
          </select>
          <select id="quizModeSelect" class="select-input">
            <option value="practice">Chế độ luyện tập (xem đáp án ngay)</option>
            <option value="test">Chế độ kiểm tra (xem kết quả cuối bài)</option>
          </select>
        </div>

        <div class="content-box">
          <h3>Chọn số câu</h3>
          <p>Bạn có thể học từng chặng nhỏ trước rồi tăng dần lên 70 câu.</p>
          <div class="count-grid">
            ${QUESTION_COUNT_OPTIONS.map((count) => `
              <button class="chip-btn ${state.quizConfig.count === count ? "active" : ""}" data-quiz-count="${count}">${count} câu</button>
            `).join("")}
          </div>
        </div>

        <div class="tip-box">
          <h3>Khuyến nghị sử dụng</h3>
          <ol>
            <li>Nếu mới học: đọc lý thuyết theo chương rồi làm 10 hoặc 20 câu.</li>
            <li>Nếu đang ôn thi: tăng dần lên 40, 50, 60 hoặc 70 câu.</li>
            <li>Chế độ luyện tập phù hợp để học từng câu; chế độ kiểm tra phù hợp để tự đánh giá cuối buổi.</li>
          </ol>
        </div>
      </div>

      <aside class="quiz-sidebar">
        <h3>Tóm tắt cấu hình</h3>
        <p><strong>Chương:</strong> ${state.quizConfig.chapter === "all" ? "Ngẫu nhiên tất cả chương" : `Chương ${state.quizConfig.chapter}`}</p>
        <p><strong>Chế độ:</strong> ${state.quizConfig.mode === "practice" ? "Luyện tập" : "Kiểm tra"}</p>
        <p><strong>Số câu:</strong> ${state.quizConfig.count} câu</p>
        <button class="primary-btn" style="width:100%; margin-top:10px;" data-start-quiz="1">Bắt đầu làm bài</button>
      </aside>
    </div>
  `;
}

function renderQuizSession() {
  const session = state.quizSession;
  if (!session) return renderQuizSetup();

  if (session.finished) {
    return renderQuizResult(session);
  }

  const currentQuestion = session.questions[session.currentIndex];
  const answer = session.answers[session.currentIndex];
  const answeredCount = session.answers.filter((item) => item !== null).length;
  const selectedIndex = answer ? answer.selected : null;
  const showFeedback = session.config.mode === "practice" && answer && answer.locked;
  const isLocked = Boolean(answer && answer.locked);

  return `
    <div class="section-heading">
      <div>
        <h2>${session.config.mode === "practice" ? "Bài trắc nghiệm luyện tập" : "Bài kiểm tra"}</h2>
        <p>${session.config.chapter === "all" ? "Ngẫu nhiên từ tất cả chương" : `Chương ${session.config.chapter}`} · ${session.questions.length} câu</p>
      </div>
      <button class="secondary-btn" data-exit-quiz="1">Thoát bài</button>
    </div>

    <div class="quiz-shell">
      <div class="quiz-card">
        <div class="quiz-head">
          <div>
            <p>Câu ${session.currentIndex + 1}/${session.questions.length} · Chương ${currentQuestion.chapter}</p>
            <h3>${currentQuestion.q}</h3>
          </div>
        </div>

        <div>
          ${currentQuestion.options
            .map((option, index) => {
              const letter = String.fromCharCode(65 + index);
              const classNames = ["option-btn"];
              if (selectedIndex === index) classNames.push("selected");
              if (showFeedback) {
                if (index === currentQuestion.answer) classNames.push("correct");
                else if (selectedIndex === index && index !== currentQuestion.answer) classNames.push("wrong");
              }
              return `
                <button class="${classNames.join(" ")}" data-answer="${index}" ${isLocked ? "disabled" : ""}>
                  <strong>${letter}.</strong> ${option}
                </button>
              `;
            })
            .join("")}
        </div>

        ${showFeedback ? renderPracticeFeedback(answer.correct, currentQuestion.explain) : ""}

        <div class="pager">
          <span>${session.config.mode === "practice" ? (showFeedback ? "Xem giải thích rồi chuyển câu tiếp theo." : "Chọn một đáp án để xem kết quả ngay.") : "Chọn đáp án rồi bấm tiếp theo."}</span>
          <div class="inline-toolbar">
            ${session.config.mode === "test" ? `<button class="ghost-btn" data-next-quiz="1" ${selectedIndex === null ? "disabled" : ""}>${session.currentIndex === session.questions.length - 1 ? "Nộp bài" : "Câu tiếp theo"}</button>` : ""}
            ${session.config.mode === "practice" ? `<button class="ghost-btn" data-next-quiz="1" ${showFeedback ? "" : "disabled"}>${session.currentIndex === session.questions.length - 1 ? "Xem kết quả" : "Câu tiếp theo"}</button>` : ""}
          </div>
        </div>
      </div>

      <aside class="quiz-sidebar">
        <h3>Tiến độ</h3>
        <p style="font-size: 40px; font-weight: 800; margin: 4px 0 6px;">${answeredCount}/${session.questions.length}</p>
        <p>Số câu đã chọn đáp án</p>
        <div class="progress-bullets">
          ${session.questions
            .map((_, index) => `<span class="${session.answers[index] ? "done" : ""}">${index + 1}</span>`)
            .join("")}
        </div>
      </aside>
    </div>
  `;
}

function renderPracticeFeedback(isCorrect, explain) {
  return `
    <div class="feedback-box ${isCorrect ? "correct" : "wrong"}">
      <p><strong>${isCorrect ? "Chính xác!" : "Chưa đúng."}</strong></p>
      <p><strong>Gợi nhớ:</strong> ${explain}</p>
    </div>
  `;
}

function renderQuizResult(session) {
  const total = session.questions.length;
  const correctCount = session.answers.filter((item) => item && item.correct).length;
  const score = Math.round((correctCount / total) * 100);
  return `
    <div class="section-heading">
      <div>
        <h2>Kết quả bài ${session.config.mode === "practice" ? "luyện tập" : "kiểm tra"}</h2>
        <p>${session.config.chapter === "all" ? "Ngẫu nhiên từ tất cả chương" : `Chương ${session.config.chapter}`} · ${total} câu</p>
      </div>
      <div class="inline-toolbar">
        <button class="secondary-btn" data-restart-quiz="1">Làm lại cấu hình này</button>
        <button class="primary-btn" data-new-quiz="1">Tạo bài mới</button>
      </div>
    </div>

    <div class="result-box">
      <h3>Bạn làm đúng ${correctCount}/${total} câu</h3>
      <p><strong>Điểm số:</strong> ${score}%</p>
      <p>Điểm cao nhất đã lưu: <strong>${state.progress.bestScore}%</strong></p>
    </div>

    <div class="section-heading" style="margin-top:26px;">
      <div>
        <h2>Xem lại đáp án</h2>
        <p>Phần này giúp bạn rà lại những câu sai để học lại lý thuyết và flashcard.</p>
      </div>
    </div>

    <div class="review-grid">
      ${session.questions.map((question, index) => renderReviewItem(question, session.answers[index], index)).join("")}
    </div>
  `;
}

function renderReviewItem(question, answer, index) {
  const chosenText = answer && answer.selected !== null ? question.options[answer.selected] : "Chưa trả lời";
  return `
    <article class="review-item">
      <div class="chapter-number">Câu ${index + 1} · Chương ${question.chapter}</div>
      <p><strong>${question.q}</strong></p>
      <p class="${answer && answer.correct ? "answer-right" : "answer-wrong"}">Bạn chọn: ${chosenText}</p>
      <p class="answer-right">Đáp án đúng: ${question.options[question.answer]}</p>
      <p><strong>Gợi nhớ:</strong> ${question.explain}</p>
    </article>
  `;
}

function buildQuestionPool(chapterValue) {
  let source;
  if (chapterValue === "all") {
    source = shuffle(
      flashcards.map((card, index) => ({ ...card, _index: index }))
    ).slice(0, 70);
  } else {
    source = getFlashcardsByChapter(Number(chapterValue)).slice(0, 70);
  }

  return source.map((card) => {
    const sameSource = source.filter((item) => item._index !== card._index && item.back !== card.back);
    const distractors = takeUnique(shuffle(sameSource.map((item) => item.back)), 3);
    const options = shuffle([card.back, ...distractors]).slice(0, 4);
    const prompt = card.front.startsWith("Nhận diện nội dung:")
      ? `Khái niệm hoặc nội dung nào phù hợp với mô tả sau? ${card.front.replace("Nhận diện nội dung:", "").trim()}`
      : card.front;

    return {
      chapter: card.chapter,
      q: prompt,
      options,
      answer: options.indexOf(card.back),
      explain: card.back
    };
  });
}

function startQuiz() {
  const pool = buildQuestionPool(state.quizConfig.chapter);
  const selectedCount = Math.min(state.quizConfig.count, pool.length);
  const questions = shuffle(pool).slice(0, selectedCount);
  state.quizSession = {
    config: { ...state.quizConfig },
    questions,
    answers: Array.from({ length: questions.length }, () => null),
    currentIndex: 0,
    finished: false
  };
  renderApp();
}

function answerCurrentQuestion(index) {
  const session = state.quizSession;
  if (!session || session.finished) return;
  const question = session.questions[session.currentIndex];
  if (!question) return;

  if (session.config.mode === "practice") {
    if (session.answers[session.currentIndex]?.locked) return;
    const correct = index === question.answer;
    session.answers[session.currentIndex] = {
      selected: index,
      correct,
      locked: true
    };
  } else {
    session.answers[session.currentIndex] = {
      selected: index,
      correct: index === question.answer,
      locked: false
    };
  }
  renderApp();
}

function nextQuizQuestion() {
  const session = state.quizSession;
  if (!session) return;

  if (session.currentIndex >= session.questions.length - 1) {
    finishQuiz();
    return;
  }

  session.currentIndex += 1;
  renderApp();
}

function finishQuiz() {
  const session = state.quizSession;
  if (!session) return;
  session.finished = true;
  const total = session.questions.length;
  const correctCount = session.answers.filter((item) => item && item.correct).length;
  const score = Math.round((correctCount / total) * 100);
  if (score > state.progress.bestScore) {
    state.progress.bestScore = score;
    saveProgress();
    showToast("Đã cập nhật điểm cao nhất mới.");
  } else {
    updateGlobalProgress();
  }
  renderApp();
}

function markChapterLearned(chapterId) {
  const id = Number(chapterId);
  if (!state.progress.learnedChapters.includes(id)) {
    state.progress.learnedChapters.push(id);
    state.progress.learnedChapters.sort((a, b) => a - b);
    saveProgress();
    showToast(`Đã lưu tiến độ chương ${id}.`);
  } else {
    showToast(`Chương ${id} đã được đánh dấu trước đó.`);
  }
  renderApp();
}

function renderApp() {
  const appView = document.getElementById("appView");
  if (!appView) return;
  let html = "";
  if (state.view === "overview") html = renderOverview();
  if (state.view === "chapters") html = renderChapters();
  if (state.view === "chapter-detail") html = renderChapterDetail(state.selectedChapterId);
  if (state.view === "flashcards") html = renderFlashcards();
  if (state.view === "quiz") html = state.quizSession ? renderQuizSession() : renderQuizSetup();
  appView.innerHTML = html;

  const flashSelect = document.getElementById("flashcardChapterSelect");
  if (flashSelect) flashSelect.value = state.flashcardFilter;
  const quizChapterSelect = document.getElementById("quizChapterSelect");
  if (quizChapterSelect) quizChapterSelect.value = state.quizConfig.chapter;
  const quizModeSelect = document.getElementById("quizModeSelect");
  if (quizModeSelect) quizModeSelect.value = state.quizConfig.mode;
}

function escapeAttr(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function takeUnique(arr, count) {
  const output = [];
  for (const item of arr) {
    if (!output.includes(item)) output.push(item);
    if (output.length === count) break;
  }
  return output;
}

function attachGlobalEvents() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.quizSession = null;
      goToView(btn.dataset.view);
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    if (target.matches("#themeToggle")) {
      toggleTheme();
      return;
    }

    if (target.matches("#resetProgress")) {
      if (window.confirm("Bạn có chắc muốn xóa toàn bộ tiến độ đã lưu không?")) {
        state.progress = { learnedChapters: [], bestScore: 0 };
        saveProgress();
        showToast("Đã xóa tiến độ.");
        renderApp();
      }
      return;
    }

    if (target.dataset.go) {
      state.quizSession = null;
      goToView(target.dataset.go);
      return;
    }

    if (target.dataset.chapterDetail) {
      goToView("chapter-detail", { chapterId: target.dataset.chapterDetail });
      return;
    }

    if (target.dataset.markLearned) {
      markChapterLearned(target.dataset.markLearned);
      return;
    }

    if (target.dataset.goFlashcards) {
      goToView("flashcards", { chapterId: target.dataset.goFlashcards });
      return;
    }

    if (target.dataset.goQuiz) {
      state.quizSession = null;
      goToView("quiz", { chapterId: target.dataset.goQuiz });
      return;
    }

    if (target.dataset.flip) {
      const id = Number(target.dataset.flip);
      if (state.flippedCards.has(id)) state.flippedCards.delete(id);
      else state.flippedCards.add(id);
      renderApp();
      return;
    }

    if (target.dataset.flashPage) {
      if (target.dataset.flashPage === "prev" && state.flashcardPage > 1) state.flashcardPage -= 1;
      if (target.dataset.flashPage === "next") state.flashcardPage += 1;
      renderApp();
      return;
    }

    if (target.dataset.quizCount) {
      state.quizConfig.count = Number(target.dataset.quizCount);
      renderApp();
      return;
    }

    if (target.dataset.startQuiz) {
      startQuiz();
      return;
    }

    if (target.dataset.answer) {
      answerCurrentQuestion(Number(target.dataset.answer));
      return;
    }

    if (target.dataset.nextQuiz) {
      nextQuizQuestion();
      return;
    }

    if (target.dataset.exitQuiz) {
      const shouldExit = window.confirm("Bạn có muốn thoát bài hiện tại không?");
      if (shouldExit) {
        state.quizSession = null;
        renderApp();
      }
      return;
    }

    if (target.dataset.newQuiz) {
      state.quizSession = null;
      renderApp();
      return;
    }

    if (target.dataset.restartQuiz) {
      startQuiz();
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.id === "flashcardChapterSelect") {
      state.flashcardFilter = target.value;
      state.flashcardPage = 1;
      renderApp();
      return;
    }

    if (target.id === "quizChapterSelect") {
      state.quizConfig.chapter = target.value;
      renderApp();
      return;
    }

    if (target.id === "quizModeSelect") {
      state.quizConfig.mode = target.value;
      renderApp();
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === "flashcardSearchInput") {
      state.flashcardSearch = target.value;
      state.flashcardPage = 1;
      renderApp();
    }
  });
}

loadTheme();
attachGlobalEvents();
updateGlobalProgress();
renderApp();
