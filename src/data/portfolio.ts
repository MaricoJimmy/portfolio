import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  profile: {
    name: { en: "Vu Van Tung", vi: "Vũ Văn Tùng" },
    eyebrow: { en: "Hello — I'm", vi: "Xin chào — Mình là" },
    role: {
      en: "Software Engineer / Aspiring AI Engineer",
      vi: "Kỹ sư phần mềm / Hướng tới AI Engineer",
    },
    tagline: {
      en: "I build computer-vision systems that turn pixels into useful decisions.",
      vi: "Mình xây dựng hệ thống thị giác máy tính biến dữ liệu hình ảnh thành quyết định hữu ích.",
    },
    biography: {
      en: "A software engineer at UDATA and USTH graduate focused on computer vision, applied AI, and reliable engineering workflows.",
      vi: "Kỹ sư phần mềm tại UDATA, tốt nghiệp USTH, tập trung vào thị giác máy tính, AI ứng dụng và quy trình kỹ thuật đáng tin cậy.",
    },
    philosophy: {
      en: "Measure before claiming, keep training and inference consistent, and design every system for the person who must trust its output.",
      vi: "Đo lường trước khi khẳng định, giữ nhất quán giữa huấn luyện và suy luận, đồng thời thiết kế hệ thống cho người cần tin vào kết quả của nó.",
    },
    goal: {
      en: "Grow into an AI Engineer who ships practical, measurable computer-vision products.",
      vi: "Trở thành AI Engineer có khả năng đưa các sản phẩm thị giác máy tính thực tiễn và đo lường được vào vận hành.",
    },
    email: "vuvantung204@gmail.com",
    portrait: "/images/vu-van-tung-profile.png",
  },
  navigation: [
    { id: "home", label: { en: "Home", vi: "Trang chủ" } },
    { id: "about", label: { en: "About", vi: "Giới thiệu" } },
    { id: "skills", label: { en: "Skills", vi: "Kỹ năng" } },
    { id: "projects", label: { en: "Projects", vi: "Dự án" } },
    { id: "experience", label: { en: "Experience", vi: "Hành trình" } },
    { id: "contact", label: { en: "Contact", vi: "Liên hệ" } },
  ],
  socialLinks: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/MaricoJimmy",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/t%C3%B9ng-v%C5%A9-v%C4%83n-7b85493b7/",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:vuvantung204@gmail.com",
    },
  ],
  skillGroups: [
    {
      id: "ai-computer-vision",
      title: { en: "AI & Computer Vision", vi: "AI & Thị giác máy tính" },
      description: {
        en: "Detection, pose, tracking, temporal modeling, and semantic retrieval.",
        vi: "Phát hiện, pose, tracking, mô hình thời gian và truy xuất ngữ nghĩa.",
      },
      skills: [
        "Python",
        "PyTorch",
        "OpenCV",
        "YOLO",
        "MediaPipe",
        "SAHI",
        "BoT-SORT",
        "TCN",
      ],
    },
    {
      id: "applied-nlp",
      title: { en: "Applied NLP", vi: "NLP ứng dụng" },
      description: {
        en: "Document extraction, embeddings, vector search, and ranking pipelines.",
        vi: "Trích xuất tài liệu, embedding, tìm kiếm vector và pipeline xếp hạng.",
      },
      skills: ["Sentence Transformers", "FAISS", "OCR", "NER", "Gemini Vision"],
    },
    {
      id: "software-engineering",
      title: { en: "Software Engineering", vi: "Kỹ thuật phần mềm" },
      description: {
        en: "Typed interfaces, web APIs, testing, and maintainable product delivery.",
        vi: "Interface có kiểu dữ liệu, API web, kiểm thử và phát triển sản phẩm dễ bảo trì.",
      },
      skills: ["TypeScript", "JavaScript", "React", "Flask", "REST APIs", "Git"],
    },
  ],
  projects: [
    {
      id: "fall-detection",
      name: { en: "Multi-Person Fall Detection", vi: "Phát hiện té ngã đa người" },
      category: "ai-cv",
      summary: {
        en: "A tracked pose-sequence pipeline that identifies fall events for each person in RGB video.",
        vi: "Pipeline chuỗi pose có tracking để nhận diện sự kiện té ngã cho từng người trong video RGB.",
      },
      challenge: {
        en: "Keep multi-person tracking and temporal classification consistent while avoiding train–inference pose mismatch.",
        vi: "Giữ nhất quán tracking đa người và phân loại theo thời gian, tránh sai lệch pose giữa huấn luyện và suy luận.",
      },
      solution: {
        en: "YOLOv8-Pose and BoT-SORT feed independent two-second pose buffers into a four-block temporal convolutional network.",
        vi: "YOLOv8-Pose và BoT-SORT tạo buffer pose hai giây độc lập cho từng người trước khi đưa vào TCN bốn khối.",
      },
      limitation: {
        en: "The baseline uses clip-level weak supervision and is not clinical validation.",
        vi: "Baseline dùng giám sát yếu ở cấp clip và không phải đánh giá lâm sàng.",
      },
      technologies: ["Python", "PyTorch", "YOLOv8-Pose", "BoT-SORT", "TCN"],
      repositoryUrl: "https://github.com/MaricoJimmy/Fall_detection",
      metrics: [
        { label: "Accuracy", value: "93.23%" },
        { label: "Precision", value: "92.98%" },
        { label: "Recall", value: "91.77%" },
        { label: "F1", value: "92.37%" },
        { label: "ROC-AUC", value: "97.81%" },
      ],
      // Provenance: MaricoJimmy/Fall_detection — reports/assets/pipeline.png
      preview: {
        kind: "real",
        src: "/images/projects/fall-detection-pipeline.png",
        source: "Fall_detection/reports/assets/pipeline.png",
      },
    },
    {
      id: "traffic-sign-recognition",
      name: { en: "Street Sign Recognition", vi: "Nhận diện biển báo giao thông" },
      category: "ai-cv",
      summary: {
        en: "Small-object traffic-sign detection comparing a YOLOv8s baseline with sliced inference.",
        vi: "Nhận diện biển báo kích thước nhỏ, so sánh YOLOv8s baseline với suy luận chia lát ảnh.",
      },
      challenge: {
        en: "Distant and partially occluded signs occupy very few pixels in full-resolution frames.",
        vi: "Biển báo ở xa hoặc bị che khuất chỉ chiếm rất ít pixel trong khung hình đầy đủ.",
      },
      solution: {
        en: "SAHI sliced inference improved small-object coverage over the YOLOv8s baseline.",
        vi: "Suy luận chia lát SAHI cải thiện khả năng bao phủ vật thể nhỏ so với YOLOv8s baseline.",
      },
      limitation: {
        en: "Reported results belong to the documented Zalo Traffic Sign evaluation setup.",
        vi: "Kết quả được báo cáo theo cấu hình đánh giá Zalo Traffic Sign đã ghi trong dự án.",
      },
      technologies: ["PyTorch", "YOLOv8s", "SAHI", "OpenCV", "Ultralytics"],
      repositoryUrl: "https://github.com/MaricoJimmy/streetsignrecognitionproject",
      metrics: [
        { label: "mAP50", value: "0.894" },
        { label: "mAP50-95", value: "0.642" },
        { label: "Precision", value: "0.826" },
        { label: "Recall", value: "0.803" },
      ],
      // Provenance: MaricoJimmy/streetsignrecognitionproject — plots/performance_comparison.png
      preview: {
        kind: "real",
        src: "/images/projects/street-sign-performance.png",
        source: "streetsignrecognitionproject/plots/performance_comparison.png",
      },
    },
    {
      id: "smart-cv-matching",
      name: { en: "Smart CV Matching", vi: "Ghép nối CV thông minh" },
      category: "nlp",
      summary: {
        en: "A resume-to-job retrieval system combining document extraction, embeddings, and vector search.",
        vi: "Hệ thống truy xuất CV–việc làm kết hợp trích xuất tài liệu, embedding và tìm kiếm vector.",
      },
      challenge: {
        en: "Normalize heterogeneous CV files and rank semantically relevant opportunities.",
        vi: "Chuẩn hóa nhiều định dạng CV và xếp hạng cơ hội phù hợp về ngữ nghĩa.",
      },
      solution: {
        en: "OCR and NER feed Sentence Transformer embeddings into a FAISS HNSW index exposed through Flask.",
        vi: "OCR và NER tạo đầu vào cho Sentence Transformer, sau đó truy vấn chỉ mục FAISS HNSW qua Flask.",
      },
      limitation: {
        en: "No performance score is published because the repository does not document a reliable evaluation.",
        vi: "Không công bố điểm hiệu năng vì repository chưa có đánh giá đủ tin cậy.",
      },
      technologies: ["Flask", "Sentence Transformers", "FAISS", "OCR", "NER"],
      repositoryUrl: "https://github.com/MaricoJimmy/Smart-CV-Matching-using-AI-NLP",
      metrics: [],
      preview: { kind: "abstract" },
    },
    {
      id: "gesture-interface",
      name: { en: "Gesture-Controlled Interface", vi: "Giao diện điều khiển bằng cử chỉ" },
      category: "interaction",
      summary: {
        en: "Real-time hand tracking for cursor movement, pinch click, finger counting, and air drawing.",
        vi: "Theo dõi bàn tay thời gian thực để di chuyển chuột, pinch-click, đếm ngón và vẽ trong không khí.",
      },
      challenge: {
        en: "Translate noisy camera landmarks into stable, intentional desktop interactions.",
        vi: "Chuyển landmark nhiễu từ camera thành thao tác desktop ổn định và có chủ đích.",
      },
      solution: {
        en: "MediaPipe Tasks landmarks, coordinate interpolation, smoothing, and gesture-state rules drive PyAutoGUI.",
        vi: "Landmark MediaPipe Tasks, nội suy tọa độ, làm mượt và luật trạng thái cử chỉ điều khiển PyAutoGUI.",
      },
      limitation: {
        en: "MediaPipe pip builds on Windows commonly fall back to CPU when GPU delegation is unavailable.",
        vi: "Bản MediaPipe cài bằng pip trên Windows thường fallback CPU khi GPU delegate không khả dụng.",
      },
      technologies: ["MediaPipe", "OpenCV", "NumPy", "PyAutoGUI"],
      repositoryUrl: "https://github.com/MaricoJimmy/Count-finger-and-control-mouse-with-mediapipe",
      metrics: [],
      preview: { kind: "abstract" },
    },
    {
      id: "ai-drawing-recognition",
      name: { en: "AI Drawing Recognition", vi: "AI nhận dạng hình vẽ" },
      category: "interaction",
      summary: {
        en: "Draw with an index-finger gesture and ask Gemini Vision to recognize the resulting canvas.",
        vi: "Vẽ bằng cử chỉ ngón trỏ và dùng Gemini Vision nhận dạng nội dung trên canvas.",
      },
      challenge: {
        en: "Combine gesture input, a live canvas, and an asynchronous vision request without blocking camera feedback.",
        vi: "Kết hợp cử chỉ, canvas trực tiếp và yêu cầu vision bất đồng bộ mà không chặn phản hồi camera.",
      },
      solution: {
        en: "MediaPipe tracks the drawing gesture while a background thread submits captured canvas images to Gemini.",
        vi: "MediaPipe theo dõi cử chỉ vẽ, còn background thread gửi ảnh canvas đã chụp đến Gemini.",
      },
      limitation: {
        en: "Recognition requires a configured Gemini API key and network access.",
        vi: "Nhận dạng cần Gemini API key đã cấu hình và kết nối mạng.",
      },
      technologies: ["MediaPipe", "OpenCV", "Gemini Vision", "Pillow"],
      repositoryUrl: "https://github.com/MaricoJimmy/Guess-object-with-Mediapipe-",
      metrics: [],
      preview: { kind: "abstract" },
    },
  ],
  journey: [
    {
      id: "usth",
      period: { en: "2022 — 2026", vi: "2022 — 2026" },
      role: { en: "University Student", vi: "Sinh viên đại học" },
      organization: {
        en: "University of Science and Technology of Hanoi",
        vi: "Trường Đại học Khoa học và Công nghệ Hà Nội",
      },
      description: {
        en: "Built a foundation in software engineering and developed applied AI and computer-vision projects.",
        vi: "Xây dựng nền tảng kỹ thuật phần mềm và phát triển các dự án AI, thị giác máy tính ứng dụng.",
      },
    },
    {
      id: "udata-intern",
      period: { en: "Apr — Jul 2026", vi: "04 — 07/2026" },
      role: { en: "Software Engineer Intern", vi: "Thực tập sinh Kỹ sư phần mềm" },
      organization: { en: "UDATA JSC", vi: "Công ty Cổ phần UDATA" },
      description: {
        en: "Started a professional software-engineering journey at UDATA.",
        vi: "Bắt đầu hành trình kỹ thuật phần mềm chuyên nghiệp tại UDATA.",
      },
    },
    {
      id: "udata-fresher",
      period: { en: "Jul 2026 — Present", vi: "07/2026 — Hiện tại" },
      role: { en: "Fresher Software Engineer", vi: "Fresher Software Engineer" },
      organization: { en: "UDATA JSC", vi: "Công ty Cổ phần UDATA" },
      description: {
        en: "Continuing to grow through production-oriented software work while moving toward AI engineering.",
        vi: "Tiếp tục phát triển qua công việc phần mềm định hướng sản phẩm, đồng thời tiến tới AI Engineering.",
      },
    },
  ],
  ui: {
    skipToContent: { en: "Skip to content", vi: "Bỏ qua đến nội dung" },
    languageLabel: { en: "Choose language", vi: "Chọn ngôn ngữ" },
    openMenu: { en: "Open menu", vi: "Mở menu" },
    closeMenu: { en: "Close menu", vi: "Đóng menu" },
    exploreProjects: { en: "Explore projects", vi: "Khám phá dự án" },
    contactMe: { en: "Contact me", vi: "Liên hệ mình" },
    viewCaseStudy: { en: "View case study", vi: "Xem chi tiết" },
    repository: { en: "View repository", vi: "Xem repository" },
    close: { en: "Close", vi: "Đóng" },
    allProjects: { en: "All", vi: "Tất cả" },
    abstractPreview: { en: "Abstract preview", vi: "Minh họa trừu tượng" },
    copied: { en: "Email copied", vi: "Đã sao chép email" },
    copyFailed: {
      en: "Copy failed — use the email link instead",
      vi: "Không thể sao chép — hãy dùng liên kết email",
    },
    copyEmail: { en: "Copy email", vi: "Sao chép email" },
  },
};
