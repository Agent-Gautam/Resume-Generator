# Review — Kaspro IT Solutions / ReactJS Developer
Generated: 2026-07-27 | JD: `jd.md` (kasproit.com/career, listed on Glassdoor) | Resume: resume.pdf | Cover letter: cover-letter.pdf

Submitted through the contact form at kasproit.com/contact-us **with resume.pdf attached** — the form does take an attachment, so this is a normal resume + cover letter application. (An earlier `application-message.md`, written for a textarea-only channel, has been deleted as superseded.)

## Match score: 84/100

| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Must-have skills | 40 | 36 | Every named requirement is now covered. **React / react.js workflows, JavaScript, HTML, CSS** — a year of frontend at KoinX plus React 19 across three projects. **Bootstrap 4/5** — user-attested and on the Skills row (see the honesty note below). **API implementation** — REST work at KoinX plus both ends of Cryptax, including the 401-dedupe token-refresh interceptor. **Troubleshooting / debugging** — the KoinX timezone and null-safety fixes and Blood Link's hardening pass, both on the resume. **Front-end architecture** — shared design-system components and 19 PRs to a library three products consumed. Points withheld because Bootstrap is attested rather than demonstrated, and because "identifying web-based user interactions" is too vague to evidence directly. |
| Experience level & domain | 25 | 19 | The band is 1–3 years and the candidate has ~15 months — inside it, at the bottom. Both engagements were an internship and a 3-month contract rather than permanent roles. Domain fit is moderate: Kaspro is a services company delivering client projects across React, Angular, .NET and WordPress since 2010, and the candidate's only comparable work is the Pixels and Grids contract (UI/UX features across 4 client projects), which is genuinely on-point but short. No experience being billed to a client or working an external delivery deadline at length. |
| Nice-to-haves | 15 | 12 | The posting lists no separate nice-to-haves, so this scores adjacent strengths a services shop would actually use: TypeScript, Next.js, Redux Toolkit, Node.js/Express, PostgreSQL, Git workflow and code review, plus real component-library ownership. Their stack also includes Angular and .NET, which the candidate does not have — that keeps this short of full marks. |
| Education / certs | 10 | 9 | B.Tech CS, CGPA 8.6/10, IKGPTU 2026 — a fresh graduate sitting naturally in a 1–3 year band. Certifications land on-point: JavaScript Algorithms & Data Structures (freeCodeCamp), Node.js/Express.js/SQL (Scrimba), NIELIT Full Stack Web Development (Grade S). |
| Evidence quality | 10 | 8 | Both projects on the resume carry live and repo links, and every figure (11 features, 7 repos, 19 PRs, 27 pages) traces to the profile or an audited project doc. Docked two points because the two requirements Kaspro spells out most concretely — Bootstrap and change documentation — rest on the weakest evidence: user attestation and a single `fixes.md` artifact respectively. |

## Keyword coverage

| JD keyword | On resume? | Where / why not |
|---|---|---|
| React / react.js workflows | YES | Skills row (first entry); KoinX bullets; both project entries in React 19 |
| JavaScript | YES | Skills "Languages" row as JavaScript (ES6); KoinX bullet 1 |
| HTML | YES | Skills "Frontend" row, written as bare **HTML** to mirror the posting |
| CSS | YES | Skills "Frontend" row, alongside Sass and Tailwind CSS |
| **Bootstrap version 4,5** | YES | Skills "Frontend" row as **Bootstrap 4/5**, mirroring the JD's version specificity. **User-attested only** — added to `profile/general-resume.md` on the user's say-so 2026-07-27, on the same footing as MUI and Jest. No repo uses Bootstrap, so it appears in the skills list and in one cover-letter stack mention, and in **no project bullet**. |
| API implementation | YES | Skills "APIs & backend" row (REST API integration); Cryptax interceptor bullet and the Express/Node.js REST API bullet |
| Responsive user interface components | YES | Skills row ("responsive design"); KoinX design-system bullet; Blood Link responsive-interface bullet |
| Troubleshooting / debugging application code | YES | KoinX bullet 3 (timezone dependency, null-safety) — selected specifically for this JD; Blood Link hardening-pass bullet; "debugging" in the Fundamentals skills row |
| Front-end architecture for UI concepts | YES | KoinX design-system bullet (backward-compatible component APIs) and the 19-PRs-to-xui bullet |
| Documenting application changes / updates | PARTIAL | The Blood Link bullet describes a **documented** hardening pass, which is the only real evidence. No formal release-notes, changelog or technical-writing experience exists, and none is claimed. |
| Identifying web-based user interactions | PARTIAL | Implied by the component and UX work rather than stated. The JD phrase is vague enough that no bullet maps to it cleanly, and inventing one would be padding. |

Nothing was dropped for `[partial]`/`[planned]`/`[stub]` reasons. Blood Link's Chart.js analytics and XP gamification stayed off the page as always. Faculty Feedback is mentioned in the cover letter but is not a resume entry — a space decision, not an honesty one.

## Gaps (honest)

1. **Bootstrap is attested, not demonstrated.** The user confirms they know it and it is now in the profile as a skills-list-only entry, so claiming it is legitimate. But no repository shows it, so if the interview includes a practical Bootstrap 5 exercise — grid behaviour, breakpoint utilities, overriding component styles — there is no prior work to fall back on. This is the one skill on the resume with no artifact behind it.
2. **Bottom of the experience band.** ~15 months against 1–3 years, and neither engagement was permanent. Candidates at the top of the band will have shipped two or three client projects end to end.
3. **No automated frontend tests anywhere.** Cryptax's 27 Vitest tests cover the backend tax engine; Blood Link and Faculty Feedback have no test suite at all. For a services company maintaining client code over years, that is a real omission.
4. **No client-delivery track record to speak of.** The 3-month Pixels and Grids contract is the only billed client work. Nothing demonstrates estimating, scope negotiation, or handover — the things an agency actually needs.
5. **Change documentation rests on one artifact.** `fixes.md` on Blood Link is genuine but it is a personal fix log, not release notes or client-facing documentation, which is likely what "documenting application changes and developing updates" means here.
6. **None of their other stack.** Kaspro runs Angular, .NET and WordPress alongside React. On a 4-vacancy generalist hire, someone with even light exposure to a second framework has an edge.

## Likely rejection reasons (ranked)

1. **Application volume.** Four vacancies on a generic React requirement in Mohali draws heavy inbound, and the application arrives through a general contact form that may sit in a shared inbox rather than reaching the hiring manager.
2. **Read as too junior for the band.** ~15 months of internship plus contract may lose to someone with 3 years of permanent agency delivery, even though the stated requirement is met.
3. **Bootstrap probed in a practical round.** It is the first line of their posting and the one skill with no code to show; a hands-on screen would expose the gap that a skills list does not.
4. **Preference for breadth.** A services shop hiring four people may favour candidates who can also be moved onto Angular or .NET work when a client demands it.

## What would raise the score

- **Build something real in Bootstrap 5 and make it public.** Rebuilding one page of an existing project — Blood Link's camp-search page would do — converts the resume's only unbacked claim into a link, and it is a weekend of work.
- **Add React Testing Library and Vitest coverage** over Blood Link's search filtering or Cryptax's token-refresh interceptor. It closes the testing hole for every frontend application, not just this one.
- **Turn `fixes.md` into a proper changelog** with dated entries and before/after notes, and link it from the project README. That gives the "documenting application changes" requirement an artifact instead of a mention.
- **Spend a weekend on a small Angular build.** At a shop running React, Angular and .NET side by side, any Angular familiarity reads as flexibility on a multi-vacancy hire.
- **Follow up in about a week.** A contact-form submission has no tracking; also check whether the role is posted on Indeed or Naukri, where an application is at least logged.

## Assumptions made

- Company identified as **Kaspro IT Solutions** (Glassdoor lists it as "Kaspro Solutions"): their careers page carries this JD word for word, including "1 to 3 years" and 4 vacancies.
- Header city is **Mohali, Punjab, India** — the JD's city for an on-site role, which coincides with the home city. The rule and the profile agree here.
- **Bootstrap 4/5 was added to `profile/general-resume.md`** under the existing user-attested line (alongside MUI and Jest) after the user confirmed it. That line's constraint is binding: skills lists only, never a project bullet.
- Salary is a **Glassdoor estimate** (Rs 3–8L, median Rs 5L), not employer-provided; other Glassdoor figures for the same employer show Rs 2–7L and Rs 4–6L. Treat all three as unreliable.
- Per the user's instruction, the cover letter **does not justify or flag any skill the resume lacks** — gaps live in this file, not in what the employer reads.
