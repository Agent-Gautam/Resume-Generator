# General Resume — Master Source Document

> **Purpose.** The single factual source for everything that is NOT a project: identity, education, work experience, skills, certifications, links. Every resume pulls from here. This file is canonical; `source.json` in the root was the original import (2026-07-04) and is not read by the pipeline.

## Contact
- **Full name:** Gautam Anand
- **Headline title:** Software Engineer
- **City, Country:** Mohali, Punjab, India
- **Phone:** +91 7717484812
- **Email:** gautam.anand.ptu@gmail.com
- **GitHub:** https://github.com/Agent-Gautam
- **LinkedIn:** https://www.linkedin.com/in/gautam-anand-ptu

## Target
- **Roles:** Software Engineer (frontend / full-stack / backend variants per JD)
- **Locations / remote preference:** Remote, or open to relocate anywhere in India
- **Earliest start date:** Immediate (B.Tech completed 2026; KoinX internship ended Jun 2026)

## Education
- **Degree:** B.Tech, Computer Science
- **Institution:** I.K. Gujral Punjab Technical University
- **Dates:** 2022 – 2026
- **CGPA:** 8.6 / 10
- **City:** Punjab, India

- **Degree:** Full Stack Web Development Training — Grade S (>80%)
- **Institution:** NIELIT
- **Dates:** 2024

## Work experience

> **Bullet-selection rule (binding).** Each experience below carries a fixed **verbatim bullet library** (synced from `profile/source.json` → `workExperience[].description`). To build a resume, **select** a JD-relevant subset that fits one page and drop it in **exactly as written** — never reword, trim, merge, re-punctuate, or re-spell a bullet. JD tailoring for experience = *choosing which bullets and in what order*, nothing else. Not every bullet is included in a given resume; how many fit depends on the JD and the space left after skills/projects. (This differs from project bullets and skills rows, which may still be reworded/spelling-mirrored per the JD.) Keep this library in sync with `source.json` — if one changes, update the other.

### Software Engineer Intern (Frontend) — KoinX
- **Dates:** Jun 2025 – Jun 2026
- **Location:** Remote
- **Bullet library (verbatim — select, never modify):**
  1. Shipped 11 production features across 7 repositories in a fast-moving startup codebase, working primarily in React/TypeScript/Next.js and navigating an unfamiliar large-scale codebase by tracing existing patterns before extending them.
  2. Designed reusable components (OTP input, chart suite, filter display) for the org's shared design system, consumed across multiple product surfaces — requiring backward-compatible APIs as the components scaled beyond their original use case.
  3. Owned feature decisions end-to-end — incorporating code-review feedback to revise implementation approaches, debugging and iterating independently rather than shipping first drafts.
  4. Owned the transaction-categorization and internal-transfer surface of KoinX's accounting platform across ~12 shipped changes — categorization flows, uncategorize/re-recognize actions, workspace-level transfer settings (React, TypeScript, Redux Toolkit).
  5. Built AI-powered transaction search with natural-language filtering and recent-search history, plus the applied-filters display layer that made complex filter state legible to users.
  6. Contributed 19 PRs to xui, the org's shared component library consumed by three products — charting suite, OTP input, virtualized-select refactor, and a precision-loss warning on financial amount display.
  7. Hardened correctness in a domain where errors carry tax-filing consequences: removed timezone dependency in transaction timestamp conversion, added null-safety across amount/currency rendering.
  8. Drove frontend performance work in the final phase — bundle-size reduction, component memoization, and a dependency audit removing unused packages.

### Full Stack Developer — Pixels and Grids
- **Dates:** Dec 2024 – Feb 2025
- **Location:** Remote
- **Bullet library (verbatim — select, never modify):**
  1. Built full-stack seller and buyer modules for a multi-vendor e-commerce platform (KollaBee), including product CRUD with multi-image uploads (cover, thumbnail, detail) to Supabase, dynamic order/analytics dashboards, and an integrated Razorpay checkout flow.
  2. Implemented the database and authentication layer for a SaaS platform (Conceevo) using Prisma ORM, and shipped a bulk HTML email marketing feature that targeted users opted into platform updates.
  3. Built secure account-management features for an e-commerce seller dashboard, including password reset, forgot-password flow, and multi-bank payment method management.
  4. Wrote test coverage for core lead and appointment modules, and evaluated charting libraries (Nivo, Shadcn) to inform the platform's analytics roadmap.
  5. Delivered UI/UX features across 4 client projects, including conditional discount logic in an admin pricing panel, responsive navigation/search fixes, and reusable CMS-driven public pages.
  6. Updated content, schema, and layout for a healthcare client site (Vyshnavi Hospital) under rapid-turnaround constraints — doctor profile management, schema changes for optional fields, and mobile navigation fixes.
  7. Built a dynamic seller dashboard shell with a sidebar reflecting live route/user state and a reusable page header component, used across the seller-side experience.

## Skills (only ones defensible in an interview)
- **Languages:** C, C++, Python, JavaScript (ES6), TypeScript
- **CS fundamentals:** Data Structures & Algorithms, Problem Solving, OOP, SDLC
- **Frameworks/libraries:** React.js, Next.js, Node.js, Redux
- **Web/styling:** HTML5, CSS, Sass, Tailwind CSS, shadcn/ui
- **Databases:** SQL, PostgreSQL
- **Tools/practices:** Git, GitHub, Agile/Scrum, Code Review, REST APIs
- **User-attested, being learned (OK in skills lists at user's request; no repo evidence yet — never write project bullets about these):** MUI, Jest (added 2026-07-05)

## Projects (index — bullets may ONLY come from a source doc in `projects/`)

> **Links (from `source.json`) — include on every resume project entry.** Each project below carries a live demo + GitHub repo. Put them on the project heading (e.g. jake template's `\resumeProjectHeading` right-side arg, or an inline `Live | Code` link pair). Use the exact URLs here.

| Project | Stack (per source.json) | Live | GitHub | Source doc |
|---|---|---|---|---|
| Cryptax | Next.js, TypeScript, Express.js, PostgreSQL, Gemini API | https://cryp1ax.vercel.app | https://github.com/Agent-Gautam/buddy-backend | `projects/cryptax.md` ✔ |
| Faculty Feedback System | Next.js 16, React 19, TypeScript, PostgreSQL, Prisma 7 | https://give-feedback.vercel.app | https://github.com/Agent-Gautam/faculty-feedback-refactor | `projects/faculty-feedback.md` ✔ |
| Blood Link | Next.js 15, React 19, TypeScript, Supabase (PostgreSQL/PostGIS), Tailwind CSS | https://blood-link2.vercel.app | https://github.com/Agent-Gautam/blood-link-supabase | `projects/blood-link.md` ✔ |

## Achievements
- Runner-up, Code Hunt Competition, GNA University — teams from 20 colleges.
- Runner-up, Byte Battle (Data Structures & Algorithms) competition, IKGPTU.
- 4-star rating in C on HackerRank; 200+ problems solved across LeetCode and GeeksforGeeks.

## Certifications
- Google Cloud Foundations — Google Cloud
- JavaScript Algorithms & Data Structures — freeCodeCamp
- Node.js, Express.js & SQL — Scrimba
<!-- Issuers verified against profile/source.json (the truth) 2026-07-11. -->

<!-- Resume display preference: prefer Certifications over the LeetCode/GFG problem-count and HackerRank C-rating (still true, kept in Achievements above, but omitted from resumes). See memory: prefer-certifications-over-dsa-metrics. -->

## Honesty notes (binding on every generated resume)
- KoinX role was an **internship** — never present it as a full-time position.
- Faculty Feedback System and Blood Link have no verified source docs yet — resumes may name them with stack only, but may NOT carry bullets/claims about them until a source doc exists.
- TODO: add anything else a resume must not claim (e.g. scope limits of the Pixels and Grids work).
