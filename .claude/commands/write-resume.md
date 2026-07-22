---
description: Generate a JD-tailored resume (LaTeX + PDF + review file) from a job posting URL
argument-hint: <jd-url> [template-name]
---

Arguments: `$ARGUMENTS` — the FIRST token is the JD URL; an optional SECOND token is a template name (a file in `templates/`, without .tex). Referred to below as <jd-url> and <template>.

Follow this process exactly. Load the `resume-writing` and `latex-resume` skills before steps 5 and 6.

## 1. Load memory first (token discipline)

Read `memory/digest.md`. It contains the profile digest, per-project digests, and tooling notes. Do NOT read every file in `projects/` — the digests tell you which full files are worth opening. If the digest is missing or its staleness check fails (see the protocol inside it), rebuild the affected entries first, then continue.

**Gate:** if `memory/digest.md` says the profile is unfilled, or `profile/general-resume.md` still contains `TODO` markers for contact/education, stop and ask the user to fill it in — a resume cannot be generated without real identity data.

## 2. Fetch the JD

1. Try WebFetch on <jd-url>.
2. If blocked or the content is a login wall / JS shell (common: LinkedIn, some portals), use the Chrome browser tools to open the URL and read the page text.
3. If both fail, ask the user to paste the JD text.

Extract: company name, exact role title, location/remote, seniority, must-have skills, nice-to-have skills, exact keyword spellings, responsibilities, and anything unusual (visa, clearance, specific domain).

## 3. Create the output folder and save the JD

Folder: `companies/<company-kebab-case>/<role-kebab-case>/` (e.g. `companies/stripe/backend-engineer-payments/`). If the folder already exists from a previous run, add a `-2` suffix rather than overwriting.

Save the extracted JD as `jd.md` in that folder: the URL, fetch date, and the full JD text (cleaned of navigation junk). This is the scoring source of truth for step 7.

## 4. Select evidence

Using the project digests in memory, choose the 2–3 projects that best match the JD's must-haves. Read ONLY the chosen projects' full source docs in `projects/` (they contain pre-written bullets, skill-to-evidence indexes, and honesty notes). Read the relevant sections of `profile/general-resume.md`.

**Eligibility filter:** project claims and pre-written bullets carry status tags (`[shipped]` / `[partial]` / `[planned]` / `[stub]`). Only `[shipped]` claims may become resume content — treat everything else as if it did not exist. If a chosen project's `[shipped]` material is too thin to match the JD, pick a different project.

## 5. Write the content (load the `resume-writing` skill)

Draft the resume content per that skill: tailored ordering, JD keyword mirroring, honest claims only, human voice. Respect every project's honesty notes. **Only `[shipped]`-tagged claims are eligible** — a bullet built from `[partial]`/`[planned]`/`[stub]` material is a fabrication; drop the underlying JD keyword and record it as a gap in step 7 instead.

## 6. Produce LaTeX + PDF (load the `latex-resume` skill)

1. Copy `templates/<template>.tex` (or `templates/default.tex` if no template was given) to the output folder as `resume.tex`.
2. Fill the content section per the skill's macro API and escaping rules.
3. Compile: `npm run pdf -- "companies/<company>/<role>/resume.tex"`.
4. Fix any compile errors (read the `.log`). Confirm exactly 1 page; apply the fitting playbook if not.

## 7. Write the review file

Create `review.md` in the same folder with:

```markdown
# Review — <Company> / <Role>
Generated: <date> | JD: <url> | Resume: resume.pdf

## Match score: NN/100
| Dimension | Weight | Score | Notes |
|---|---|---|---|
| Must-have skills | 40 | | which are evidenced, which are missing |
| Experience level & domain | 25 | | seniority fit, domain fit |
| Nice-to-haves | 15 | | |
| Education / certs | 10 | | |
| Evidence quality | 10 | | how concrete/verifiable the matching claims are |

## Keyword coverage
| JD keyword | On resume? | Where / why not |

Any keyword dropped because it mapped only to `[partial]`/`[planned]`/`[stub]` work must appear here marked NO/PARTIAL with the reason (e.g. "charts are [planned] in blood-link — not built").

## Gaps (honest)
What the JD asks for that the candidate genuinely lacks — not softened. Include capabilities that exist only as non-`[shipped]` work; a `[planned]` feature is a gap, not a claim.

## Likely rejection reasons (ranked)
The 2–4 most probable reasons a recruiter/ATS rejects this application.

## What would raise the score
Concrete actions (a feature to add to an existing project, a cert, a skill to learn) — actionable, not generic.
```

Score honestly. A 55 that tells the truth is worth more than a flattering 85.

## 8. Update memory

- Append one row to the log in `memory/applications.md` (date, company, role, score, folder).
- If you rebuilt or added any digest entries in step 1, make sure `memory/digest.md` is saved with updated stamps.

## 9. Report

Tell the user: PDF path, match score, top 2 gaps, and anything you had to assume. Keep it short.
