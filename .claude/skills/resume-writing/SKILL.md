---
name: resume-writing
description: Write tailored, human-sounding, ATS-safe resume content from verified source documents. Use whenever drafting or revising resume bullets, summaries, skills sections, or deciding what goes on a resume for a specific job description.
---

# Resume Writing

You are writing a document a human recruiter skims in 7 seconds and an ATS parses literally. Both must pass. The candidate's credibility is on the line: one invented claim discovered in an interview kills the application.

## Golden rules

1. **Truth over impressiveness.** Every claim must be traceable to a source document (the general resume or a project source doc). If a source file has an "honesty notes" section, those notes override everything — never state a designed-for feature as shipped.
   - **Only `[shipped]`-tagged claims may appear on a resume.** Project docs tag every capability `[shipped]` / `[partial]` / `[planned]` / `[stub]` (see the "Claim tagging" spec in `.claude/commands/update-project.md`). A resume may draw ONLY from `[shipped]` claims. `[partial]`, `[planned]`, and `[stub]` work is off-limits — never written in any framing, not even softened to "designed" or "prototyped". If it isn't fully built and grep-verifiable in the repo, it does not go on the resume. Power comes from surfacing real shipped work, not from wording incomplete work generously.
2. **Tailored over complete.** The resume answers one question: "can this person do THIS job?" Cut anything that doesn't help answer it, even if it's good work.
3. **Specific over generic.** "27 unit tests covering FIFO lot matching" beats "extensive test coverage". Concrete nouns and numbers from the source docs are the whole game.
4. **One page.** For candidates under ~8 years of experience, always one page. Density is a feature: a tight page reads as judgment.

## Source-of-truth discipline

- Never invent employers, titles, dates, metrics, users, revenue, or team sizes.
- Scale honesty: a solo portfolio project is "built" / "designed" / "shipped" — never "led a team", never implied production traffic it doesn't have.
- Numbers may only come from source docs. If the doc says "38 tests", write 38 (or "35+"), never round up to 50.
- A metric-free specific bullet is fine. A fabricated percentage is not. Never write "improved performance by 40%" unless the 40% exists in a source doc.
- You may **reframe** and **reorder** facts freely; you may never **upgrade** them. Reframing a `[partial]` claim into a bullet is an upgrade — don't. Only `[shipped]` claims are eligible.

## Experience bullets are selected verbatim, not written

Work-experience bullets are **not authored here.** Each experience in `profile/general-resume.md` has a fixed, user-vetted bullet library (synced from `profile/source.json`). For the Experience section you **select** a JD-relevant subset that fits the page and use each chosen bullet **exactly as written** — never reword, trim, merge, re-punctuate, re-spell, or "improve" it. Tailoring an experience to a JD means *choosing which bullets and their order*, nothing else. Include as many as fit after skills/projects; dropping bullets for space is expected. The "Bullet craft", "Human voice", and JD-spelling-mirroring guidance below governs **project bullets, summaries, and skills rows only** — the parts you still author. If you catch yourself editing the words of an experience bullet, stop: that breaks the honesty control.

## Bullet craft (project bullets / summaries — NOT experience)

**Formula (default, then vary):** strong verb + what was built/done + key tech (JD keywords) + honest outcome or scale.

> Built a streaming CSV ingestion pipeline (Busboy, csv-parser) with manual backpressure and batched inserts, handling uploads up to 1 GB without loading files into memory.

- 3–6 bullets for the most relevant entry, 2–3 for others. First bullet of each entry = the most JD-relevant fact, not the chronologically first.
- **Every project needs at least two bullets, or it's cut.** A project reduced to a single bullet earns no impact — it reads as a stub and wastes a line. If a project's `[shipped]` material can't honestly support two distinct bullets for this JD, drop the whole project rather than list it with one. (Applies to the Projects section; experience entries follow the verbatim-selection rule above.)
- One idea per bullet. If a bullet has "and ... and", split or cut.
- Length must vary. A resume where every bullet is exactly two lines reads machine-generated.
- Past tense for past work, present tense only for a current role's ongoing duties.
- No first person ("I", "my"), no articles at bullet start ("Built..." not "I built the...").

**Good verbs** (pick to match the actual action): built, designed, implemented, shipped, wrote, migrated, debugged, automated, modeled, reduced, cut, sped up, added, refactored, deployed, tested, integrated, profiled.

**Metric hygiene:** counts of real things (tests, endpoints, tables, tools, lines, exchanges supported) are the safest metrics for solo/portfolio work. Percentages need a baseline; if the source doc doesn't give one, don't manufacture one.

## Human voice — kill the AI tells

**Banned words/phrases** (these mark the text as machine-written to any 2025+ recruiter):
spearheaded, leveraged/leveraging, delved, honed, meticulous(ly), seamless(ly), cutting-edge, state-of-the-art, passionate, dynamic, results-driven, detail-oriented, self-starter, synergy, utilize(d), championed, empowered, elevated, holistic, robust and scalable (as a filler pair), innovative solutions, "various", "numerous", "etc.", "successfully" (if it shipped, it succeeded — the word adds nothing).

**Structural tells to avoid:**
- Every bullet ending in ", resulting in X% improvement" — the signature AI cadence.
- Triple-adjective lists ("scalable, reliable, and performant").
- Identical grammatical structure across all bullets.
- Em-dash overuse; buzzword chains in the summary.
- A "Professional Summary" full of adjectives and zero facts. If a summary is used at all (only when the JD strongly suggests seniority or a career-change narrative), it is 2–3 lines of pure fact: role identity, strongest proof points, target-relevant domain.

**The read-aloud test:** if a bullet would sound absurd said out loud to an interviewer's face ("I spearheaded the leveraging of cutting-edge technologies"), rewrite it in the words you'd actually say ("I built the upload pipeline").

## Tailoring to a JD

1. Extract from the JD: must-have skills, nice-to-haves, exact keyword spellings, seniority level, domain language.
2. **Mirror exact spellings** once each, naturally: if the JD says "PostgreSQL", don't write only "Postgres"; if it says "Node.js", not "NodeJS". ATS keyword match is literal.
3. **Reorder everything by relevance to this JD:** skills rows, project order, bullet order within entries. The top third of the page must scream this role.
4. Cut ruthlessly: a JD for a backend role doesn't need three frontend bullets. Keep at most one line that shows breadth.
5. Do not keyword-stuff. Every JD keyword that appears must be attached to a real `[shipped]` claim. A skills-section keyword with no supporting bullet is weak; a keyword backed only by `[partial]`/`[planned]` work, or one the candidate doesn't actually know, is a lie — leave it out and record it as a gap in the review instead.
6. Match the JD's noun for the role in the resume's framing (e.g. the JD says "Backend Engineer" — the projects chosen and bullets emphasized should describe backend engineering, even if the source project is full-stack).

## ATS mechanics

- Standard section names only: Skills, Experience, Projects, Education, Certifications. No cute variants.
- No tables, text boxes, images, icons, columns, or headers/footers for critical data.
- Spell out an acronym once if the JD uses the long form ("continuous integration (CI)").
- Dates in a consistent "Mon YYYY – Mon YYYY" format. Location for every entry.
- Contact line: city, phone, email, GitHub, LinkedIn — all as plain readable text.
- **Project links are mandatory.** Every project entry carries a live-demo link and a GitHub link (URLs in `profile/general-resume.md`'s Projects table, sourced from `source.json`). Render both on the project heading — e.g. a right-aligned `\href{live}{Live} $|$ \href{repo}{Code}` pair — using the exact URLs. A recruiter clicking through to a working demo is high-signal; don't drop the links to save space. Use the precise URL string given (don't "correct" a subdomain that looks like a typo — flag it to the user instead).
- **Location = the JD's location, with a remote-distance exception.** Default: set the header city to the location named in the JD (e.g. JD "Bengaluru" → `Bengaluru, India`; "Noida, India — Hybrid" → `Noida, India`) — this passes location filters and signals fit (candidate is open to relocation anywhere in India). Exceptions, both → `Mohali, Punjab, India`:
  1. The JD names **no** location (or is remote with no city).
  2. The role is **remote** AND the JD's city is **outside the north-India belt** (beyond Delhi / Gurgaon / Noida — e.g. Bengaluru, Hyderabad, Mumbai, Pune, Chennai, Kolkata). A remote job needs no relocation signal, so a distant city is pointless and incongruous — use the real home city instead.
  - So: on-site/hybrid anywhere → JD city. Remote **within** north India (Delhi/Gurgaon/Noida/Chandigarh and nearer) → JD city. Remote **outside** north India → Mohali. No location → Mohali. Never default to the home city merely because it's in the profile.

## Section order

For students / early-career / career-switchers where projects are the strongest evidence: **Skills → Projects → Experience → Education**. For candidates whose employment matches the JD: **Skills → Experience → Projects → Education**. Decide per JD, not by habit.

## Final self-check (run before declaring the draft done)

- [ ] Every claim traceable to a `[shipped]` claim in a source doc; no `[partial]`/`[planned]`/`[stub]` work appears; honesty notes respected.
- [ ] Zero banned words; read-aloud test passes on every bullet.
- [ ] Every JD must-have that the candidate genuinely has appears with exact JD spelling.
- [ ] Top third of the page is unmistakably aimed at this role.
- [ ] Bullet lengths and structures vary; no metric-cadence repetition.
- [ ] One page. Standard sections. No orphan keywords.
