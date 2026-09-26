# Mohammed Zidan C — Portfolio

Personal portfolio for Mohammed Zidan C, a B.Tech Electronics and Communication Engineering student focused on VLSI, RTL design, digital systems, and software projects.

**Live site:** [mohammedzidanc.vercel.app](https://mohammedzidanc.vercel.app)<br />
**GitHub:** [github.com/MohammedZidanC](https://github.com/MohammedZidanC)

## About this site

This project preserves the visual design and motion language of the live portfolio while bringing its profile data up to date. It includes an animated hero, biography and stats, skills, education, seven public project/repository entries, seventeen documented credential and recognition entries, and contact links.

Credential cards open in an accessible in-page dialog with a rendered certificate preview. The original PDF and issuer verification links remain available from the dialog where provided. The community-service certificate is displayed as a preview; its full-resolution source scan remains outside the repository. A reported team award remains listed as it appears on the existing portfolio; its handwritten participant and date details need confirmation, so its scan is not published.

## Sections

- **Hero:** animated introduction, portrait, role rotation, and section links.
- **About:** engineering focus, education context, languages, and portfolio stats.
- **Skills:** hardware and HDL, programming, tools, web and UI, and engineering concepts.
- **Education:** four-entry academic timeline.
- **Projects:** seven entries linked to their public source repositories, with a live demo where available.
- **Credentials:** seventeen entries across technical, professional-development, membership, community work, and a reported team award.
- **Contact:** email, GitHub, LinkedIn, Instagram, and Facebook.

## Selected projects

| Project | Year | Stack | Links |
|---|---:|---|---|
| NYX-AI Chatbot | 2025 | Python, Gemma 2B, Hugging Face, NLP | [Source](https://github.com/MohammedZidanC/NYX) |
| VANTAGE | 2025 | Python, Flask, SQLite, JavaScript | [Source](https://github.com/MohammedZidanC/VANTAGE) |
| FileSnap | 2026 | Flutter, Dart, Riverpod | [Source](https://github.com/MohammedZidanC/FileSnap) |
| To-Do List Application | 2025 | Python, UI design, state management | [Source](https://github.com/MohammedZidanC/To-Do-List) |
| Health Advisor AI | 2026 | JavaScript, Gemini API, Vercel | [Source](https://github.com/MohammedZidanC/Health_Advisor) · [Live](https://health-advisor-eight.vercel.app) |
| Portfolio | 2026 | Next.js, TypeScript, React, Three.js | [Source](https://github.com/MohammedZidanC/Portfolio) · [Live](https://mohammedzidanc.vercel.app) |
| Engineering Profile | 2026 | Verilog, RTL, digital logic | [Source](https://github.com/MohammedZidanC/MohammedZidanC) |

## Credentials

| Credential | Issuer |
|---|---|
| Verilog HDL — Hands On | Maven Silicon |
| Digital Logic Design: A Complete Guide | Udemy |
| Signals and Systems: A Foundation of Signal Processing | Udemy |
| CS107: C++ Programming | Saylor Academy |
| Python Bootcamp: 30 Hours of Step by Step Python Lessons | Udemy |
| Reuse and Remodel — 1st Prize (reported team award) | SRMIST · Department of Mechanical Engineering |
| Embedded Systems & IoT Workshop | SRMIST · Team ARL |
| Claude Code 101 | Anthropic |
| Freedom with AI Masterclass | Freedom with AI |
| Developer Tools & Methodologies | POD.ai |
| Employability Skills | Udemy |
| Employability Skills Mastery · Lecture Series I | Udemy |
| Job Readiness & Professional Development Program | Udemy · EDUCBA |
| Understanding Sustainable Development Goals (SDGs) | Udemy |
| Engineering Job Simulation | Forage · British Airways |
| Student Membership | ISTE · SRMIST |
| Community Connect · Certificate of Merit | Wayanad Muslim Orphanage |

## Tech stack

- Next.js 14 App Router and React 18
- TypeScript and Tailwind CSS
- Three.js, React Three Fiber, and ShaderGradient for WebGL effects
- Canvas and CSS for interactive motion
- Local project, portrait, and credential assets

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create a production build with `npm run build`.

## Publishing

### Deploy from GitHub with Vercel

1. Push this repository to GitHub and import it into Vercel.
2. Keep the Vercel **Root Directory** at the repository root; this directory contains the app's `package.json` and lockfile.
3. Use the Next.js framework preset. Vercel installs with `npm ci` and builds with `npm run build` from `vercel.json`.
4. No environment variables are currently required.

Keep the private source `Certifications/` archive outside the repository; only the explicitly prepared public assets in `public/Certifications/` and `public/CertificationPreviews/` belong in the deployed site. Review those public files before making the GitHub repository public.
