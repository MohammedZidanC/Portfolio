export const personal = {
  full_name: "Mohammed Zidan C",
  display_name: "Mohammed Zidan",
  tagline_line1: "ASPIRING CHIP DESIGNER",
  tagline_line2: "VLSI · RTL Design · Digital Logic",
  bio: "Undergraduate specializing in VLSI design and digital systems. Passionate about Verilog HDL, Computer Architecture, and solving complex logic problems. Precision-first. Architecture-obsessed. Building the chips of tomorrow.",
  location: "Chennai, Tamil Nadu, India",
  languages: ["English", "Hindi", "Malayalam"],
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
    note: "CGPA 8.9/10 · Currently pursuing with focus on VLSI and Digital Systems",
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
    note: "83.6% · Completed higher secondary education with a major in Computer Science",
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
    note: "90% · Completed secondary education with distinction",
    url: "https://www.depaulpublicschool.com/",
    logo: "/Logos/depaul.png",
    icon: "school",
  },
];

export const skills: Record<string, string[]> = {
  "Hardware & HDL": ["Verilog HDL", "RTL Design", "Digital Logic", "Digital Electronics", "CMOS Concepts", "VLSI Design Flow", "Timing Concepts", "Computer Architecture", "ASIC Verification"],
  "Programming": ["C++", "Python", "Object-Oriented Programming"],
  "Tools & Platforms": ["ModelSim", "Xilinx Vivado", "Easy EDA", "Git & GitHub", "Hugging Face", "Gradio"],
  "Web & UI": ["HTML/CSS", "React", "Material UI", "UI/UX Design"],
  "Concepts": ["ASIC Design", "Verification", "Signals & Systems", "Signal Processing", "Embedded Systems", "IoT", "State Management", "LLM Integration", "Problem Solving", "Analytical Thinking", "Teamwork", "Technical Communication"],
};

export const coreSkills = ["Verilog HDL", "RTL Design", "CMOS Concepts", "ASIC Design"];

export const categoryColors: Record<string, string> = {
  "Hardware & HDL": "#c6a779",
  "Programming": "#d8d1c3",
  "Tools & Platforms": "#a99b7e",
  "Web & UI": "#e0d6c3",
  "Concepts": "#8c795a",
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
  {
    title: "Health Advisor AI",
    year: "2026",
    description: "A modern medical assistant AI powered by the Google Gemini API. Analyzes patient symptoms, suggests possible conditions, and provides conversational health guidance using natural language processing.",
    tech: ["HTML/CSS", "JavaScript", "Node.js", "Gemini API", "Vercel"],
    image: "/Projects/Health_Advisor.png",
    source: "https://github.com/MohammedZidanC/Health_Advisor",
    live: "https://health-advisor-eight.vercel.app",
    featured: true,
  },  {
    title: "Portfolio",
    year: "2026",
    description: "A cinematic portfolio documenting my engineering interests, selected builds, education, and learning credentials.",
    tech: ["Next.js", "TypeScript", "React", "Three.js"],
    image: "/Projects/portfolio.svg",
    source: "https://github.com/MohammedZidanC/Portfolio",
    live: "https://mohammedzidanc.vercel.app/",
    featured: true,
  },
  {
    title: "Engineering Profile",
    year: "2026",
    description: "A public engineering profile focused on VLSI, RTL, digital logic, ASIC verification, learning notes, and credentials.",
    tech: ["Verilog", "RTL", "Digital Logic", "GitHub"],
    image: "/Projects/engineering-profile.svg",
    source: "https://github.com/MohammedZidanC/MohammedZidanC",
    live: null,
    featured: true,
  },
];

export const certifications = [
  { title: "Verilog HDL — Hands On", issuer: "Maven Silicon", date: "01 Oct 2025", tags: ["Verilog", "RTL Design"], detail: "A practical introduction to RTL design using Verilog HDL.", pdf: "/Certifications/235197-Verilog HDL Hands On Mohammed Zidan C.pdf", type: "technical" as const },
  { title: "Digital Logic Design: A Complete Guide", issuer: "Udemy", date: "09 Oct 2025", tags: ["Digital Logic", "Circuits"], detail: "6 hours · Instructor: Dr. S. Uma Maheswari.", verify: "https://ude.my/UC-76cbcd52-93cb-42a9-b449-c34c35ec5f7f", pdf: "/Certifications/Udemy Digital Logic Design.pdf", type: "technical" as const },
  { title: "Signals and Systems: A Foundation of Signal Processing", issuer: "Udemy", date: "28 Apr 2026", tags: ["Signals", "Signal Processing"], detail: "25.5 hours · Instructor: Prof. Hitesh Dholakiya · Engineering Funda & Day Dream Software.", verify: "https://ude.my/UC-a2e4de50-5d94-441b-b899-2e69b347af40", pdf: "/Certifications/Udemy Signal Processing.pdf", type: "technical" as const },
  { title: "CS107: C++ Programming", issuer: "Saylor Academy", date: "21 Mar 2025", tags: ["C++", "Object-Oriented Programming"], detail: "40 hours · Score: 90%.", pdf: "/Certifications/cpp saylor.pdf", previewPages: 2, type: "technical" as const },
  { title: "Python Bootcamp: 30 Hours of Step by Step Python Lessons", issuer: "Udemy", date: "13 Mar 2025", tags: ["Python", "Programming"], detail: "30 hours · Instructors: Peter Alkema and Media Training Worldwide Digital.", verify: "https://ude.my/UC-69061030-a1ab-4f3b-85d3-6527147b9ed2", pdf: "/Certifications/Udemy Python Bootcamp.pdf", type: "technical" as const },
  { title: "Reuse and Remodel — 1st Prize", issuer: "SRMIST · Department of Mechanical Engineering", date: "Date to confirm", tags: ["Product Design", "Team Award"], detail: "Existing portfolio and resume materials report a team first-place result in the Reuse and Remodel Product competition. The source scan's handwritten participant and date details are unclear, so the award is listed as reported recognition without publishing the scan.", type: "award" as const },
  { title: "Embedded Systems & IoT Workshop", issuer: "SRMIST · Team ARL", date: "11–12 Aug 2025", tags: ["Embedded Systems", "IoT"], detail: "Hack and Beyond · Workshop on embedded automotive systems and IoT.", pdf: "/Certifications/IoT Workshop.pdf", type: "technical" as const },
  { title: "Claude Code 101", issuer: "Anthropic", date: "Date not listed", tags: ["Developer Tools", "AI"], detail: "Certificate of completion. The source certificate does not list an issue date.", verify: "https://verify.skilljar.com/c/qpo45edumjc3", pdf: "/Certifications/Anthropic Claude Code 101.pdf", type: "technical" as const },
  { title: "Freedom with AI Masterclass", issuer: "Freedom with AI", date: "18 Oct 2025", tags: ["AI Tools", "Prompt Engineering"], detail: "AI tools and prompt engineering · Signed by Avinash Mada.", pdf: "/Certifications/Freedom with AI - Certificate.pdf", type: "technical" as const },
  { title: "Developer Tools & Methodologies", issuer: "POD.ai", date: "Date not listed", tags: ["Command Line", "Developer Tools"], detail: "Expert talk series covering command-line tools, Chrome DevTools, and Visual Studio Code · Presented by Rishu Gupta.", pdf: "/Certifications/POD AI Developer Tools and Methodologies.pdf", type: "technical" as const },
  { title: "Employability Skills", issuer: "Udemy", date: "21 Dec 2025", tags: ["Soft Skills", "Communication"], detail: "3.5 hours · Instructor: Prasad Rajaputra.", verify: "https://ude.my/UC-b686508b-7cf5-4e7e-a88d-126c4b6046da", pdf: "/Certifications/Employability skills.pdf", type: "soft" as const },
  { title: "Employability Skills Mastery · Lecture Series I", issuer: "Udemy", date: "17 Apr 2026", tags: ["Soft Skills", "Employability"], detail: "6.5 hours · Instructor: Thota Raghu.", verify: "https://ude.my/UC-cf6ec101-3f8c-4d26-8a09-57c8774e4418", pdf: "/Certifications/Udemy Employability skills Mastery.pdf", type: "soft" as const },
  { title: "Job Readiness & Professional Development Program", issuer: "Udemy · EDUCBA", date: "17 Apr 2026", tags: ["Job Readiness", "Professional Development"], detail: "24 hours · EDUCBA Bridging the Gap.", verify: "https://ude.my/UC-1f0a3fc4-87f8-46bf-8e84-97d6bbdaa2c5", pdf: "/Certifications/Job Readiness & Professional Development Program.pdf", type: "soft" as const },
  { title: "Understanding Sustainable Development Goals (SDGs)", issuer: "Udemy", date: "29 Sep 2025", tags: ["SDGs", "Sustainability"], detail: "2 hours · Instructor: Boomy Tokan.", verify: "https://ude.my/UC-0f3b1bf8-c682-49a6-99bd-8bdf9ec8f0bf", pdf: "/Certifications/Sustainable development.pdf", type: "soft" as const },
  { title: "Engineering Job Simulation", issuer: "Forage · British Airways", date: "24 Sep 2026", tags: ["Engineering", "Simulation"], detail: "Defect investigation and fix · Forecasting material requirements · Maintenance planning.", pdf: "/Certifications/british airways forage.pdf", type: "soft" as const },
  { title: "Student Membership", issuer: "ISTE · SRMIST", date: "10 Feb 2025 — 10 Feb 2029", tags: ["Membership", "Engineering"], detail: "Professional student membership at SRMIST.", pdf: "/Certifications/ISTE Membership.pdf", type: "membership" as const },
  { title: "Community Connect · Certificate of Merit", issuer: "Wayanad Muslim Orphanage", date: "17–19 Jun 2026 · Issued 20 Jun", tags: ["Volunteering", "Community Service", "Technical"], detail: "Completed the Community Connect volunteer engagement as part of SRMIST’s Community Service and Social Responsibility coursework. The work included a technical review of the IT laboratory, gymnasium, and CCTV system, alongside community service.", preview: "/CertificationPreviews/WMO Volunteering.webp", type: "community" as const },
];

export const marqueeText =
  "VLSI · RTL DESIGN · CHIP DESIGN · VERILOG · CMOS · DIGITAL LOGIC · COMPUTER ARCHITECTURE · ASIC DESIGN · VERIFICATION · ";

export const scrambleWords = [
  "Chip Designer",
  "RTL Engineer",
  "VLSI Enthusiast",
  "Logic Architect",
];
