export const personal = {
  full_name: "Mohammed Zidan C",
  display_name: "Mohammed Zidan",
  tagline_line1: "ASPIRING CHIP DESIGNER",
  tagline_line2: "VLSI · RTL Design · Digital Logic",
  bio: "Undergraduate specializing in VLSI design and digital systems. Passionate about Verilog HDL, Computer Architecture, and solving complex logic problems. Precision-first. Architecture-obsessed. Building the chips of tomorrow.",
  location: "Chennai, Tamil Nadu, India",
  email: "mohammedzidanc@gmail.com",
  github: "https://github.com/MohammedZidanC",
  linkedin: "https://www.linkedin.com/in/mohammed-zidan-c-16a367324",
  goal: "To evolve into an industry-ready VLSI/RTL Engineer with robust fundamentals and pragmatic design acumen.",
  photo: "/me.png",
};

export const education = [
  {
    institution: "SRM Institute of Science and Technology",
    location: "Chennai",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Electronics and Communication Engineering",
    dates: "2024 – 2028",
    note: "Currently pursuing with focus on VLSI and Digital Systems",
    url: "http://www.srmuniv.ac.in/",
    logo: "/Logos/srm.png",
    icon: "university",
  },
  {
    institution: "Brilliant Study Centre Pala",
    location: "Kerala",
    degree: "Entrance Examination Preparation",
    field: "Engineering & Medical Competitive Exams",
    dates: "2023 – 2024",
    note: "Intensive preparation year for national competitive engineering exams",
    url: "https://brilliantpala.org/",
    logo: "/Logos/pala.png",
    icon: "book",
  },
  {
    institution: "De Paul Public School",
    location: "Kerala",
    degree: "Class 12 (Higher Secondary)",
    field: "Mathematics and Computer Science",
    dates: "2022 – 2023",
    note: "Completed higher secondary education with a major in Computer Science",
    url: "https://www.depaulpublicschool.com/",
    logo: "/Logos/depaul.png",
    icon: "school",
  },
  {
    institution: "De Paul Public School",
    location: "Kerala",
    degree: "Class 10 (Secondary)",
    field: "General Education",
    dates: "2020 – 2021",
    note: "Completed secondary education with distinction",
    url: "https://www.depaulpublicschool.com/",
    logo: "/Logos/depaul.png",
    icon: "school",
  },
];

export const skills: Record<string, string[]> = {
  "Hardware & HDL": ["Verilog HDL", "RTL Design", "Digital Logic", "CMOS Concepts", "Computer Architecture"],
  "Programming": ["C++", "Python", "Dart", "JavaScript"],
  "Tools & Platforms": ["ModelSim", "Hugging Face", "Flask", "SQLite", "Flutter", "Riverpod"],
  "Web & UI": ["HTML/CSS", "React", "Next.js", "Tailwind CSS", "Material UI"],
  "Concepts": ["ASIC Design", "Verification", "Embedded Systems", "OOP", "State Management"],
};

export const coreSkills = ["Verilog HDL", "RTL Design", "CMOS Concepts", "ASIC Design"];

export const categoryColors: Record<string, string> = {
  "Hardware & HDL": "#7c3aed",
  "Programming": "#06b6d4",
  "Tools & Platforms": "#10b981",
  "Web & UI": "#f59e0b",
  "Concepts": "#ef4444",
};

export const projects = [
  {
    title: "NYX-AI Chatbot",
    year: "2025",
    description: "A lightweight AI chatbot using Python and the Gemma 2B IT model, hosted on Hugging Face. Explores NLP fundamentals and local language model inference.",
    tech: ["Python", "Gemma 2B", "Hugging Face", "AI", "NLP"],
    image: "/Projects/nyx.png",
    source: "https://github.com/MohammedZidanC/NYX",
    live: null,
    featured: true,
  },
  {
    title: "VANTAGE",
    year: "2025",
    description: "A full-stack task management application featuring user authentication, an admin panel, and an interactive map-based UI. Production-grade architecture with real database persistence.",
    tech: ["Python", "Flask", "JavaScript", "SQLite", "HTML/CSS"],
    image: "/Projects/vantage.png",
    source: "https://github.com/MohammedZidanC/VANTAGE",
    live: null,
    featured: true,
  },
  {
    title: "FileSnap",
    year: "2026",
    description: "A premium offline-first utility application offering advanced PDF manipulation and dynamic image editing with full client-side privacy. No data leaves the device.",
    tech: ["Flutter", "Dart", "Riverpod", "Material UI"],
    image: "/Projects/Filesnap.png",
    source: "https://github.com/MohammedZidanC/FileSnap",
    live: null,
    featured: true,
  },
  {
    title: "To-Do List Application",
    year: "2025",
    description: "Python-based task manager with a polished dark-mode UI and full state persistence. Clean architecture focused on usability and offline reliability.",
    tech: ["Python", "UI Design", "State Management"],
    image: "/Projects/todo.png",
    source: "https://github.com/MohammedZidanC/To-Do-List",
    live: null,
    featured: false,
  },
];

export const certifications = [
  {
    title: "Verilog HDL – Hands On",
    issuer: "Maven Silicon",
    date: "Oct 2025",
    tags: ["Verilog", "RTL Design"],
    pdf: "/Certifications/235197-Verilog HDL Hands On Mohammed Zidan C.pdf",
    type: "technical" as const,
  },
  {
    title: "Digital Logic Design",
    issuer: "Udemy",
    date: "Oct 2025",
    tags: ["Digital Logic", "Circuits"],
    pdf: "/Certifications/Udemy Digital Logic Design.pdf",
    type: "technical" as const,
  },
  {
    title: "Freedom with AI Masterclass",
    issuer: "Freedom with AI",
    date: "Oct 2025",
    tags: ["AI Tools", "Prompt Engineering"],
    pdf: "/Certifications/Freedom with AI - Certificate.pdf",
    type: "technical" as const,
  },
  {
    title: "Employability Skills",
    issuer: "Udemy",
    date: "Dec 2025",
    tags: ["Soft Skills", "Communication"],
    pdf: "/Certifications/Employability skills.pdf",
    type: "soft" as const,
  },
  {
    title: "Sustainable Development Goals",
    issuer: "Udemy",
    date: "Sept 2025",
    tags: ["SDG", "Sustainability"],
    pdf: "/Certifications/Sustainable development.pdf",
    type: "soft" as const,
  },
  {
    title: "IoT Workshop Participant",
    issuer: "SRM Institute",
    date: "Jan 2026",
    tags: ["IoT", "Embedded"],
    pdf: "/Certifications/IoT Workshop.pdf",
    type: "technical" as const,
  },
  {
    title: "Python Bootcamp",
    issuer: "Udemy",
    date: "Jan 2026",
    tags: ["Python", "Programming"],
    pdf: "/Certifications/Python Bootcamp.pdf",
    type: "technical" as const,
  },
  {
    title: "Reuse and Remodel – 1st Prize 🏆",
    issuer: "SRM Institute",
    date: "Jan 2026",
    tags: ["Innovation", "Product Design"],
    pdf: "/Certifications/Reuse and Remodel.pdf",
    type: "award" as const,
  },
  {
    title: "C++ Programming",
    issuer: "Saylor Academy",
    date: "Mar 2025",
    tags: ["C++", "OOP"],
    pdf: "/Certifications/cpp saylor.pdf",
    type: "technical" as const,
  },
  {
    title: "ISTE Student Membership",
    issuer: "ISTE",
    date: "Oct 2025",
    tags: ["Membership", "Technical"],
    pdf: "/Certifications/ISTE Membership.pdf",
    type: "membership" as const,
  },
];

export const marqueeText =
  "VLSI · RTL DESIGN · CHIP DESIGN · VERILOG · CMOS · DIGITAL LOGIC · COMPUTER ARCHITECTURE · ASIC DESIGN · VERIFICATION · ";

export const scrambleWords = [
  "Chip Designer",
  "RTL Engineer",
  "VLSI Enthusiast",
  "Logic Architect",
];
