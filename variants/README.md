# Resume Variants — pick one, send it, log it

Three pre-built, pre-verified one-page resumes. They exist so a routine application takes **under a
minute** instead of a full `/write-resume` run. Each is a reusable master harvested from the
best-scoring tailored resume in its cluster — the content is already honesty-checked and
already compiles to one page.

| Variant | Send it when the role is… | PDF |
|---|---|---|
| **`frontend-react`** | ReactJS / React / Front End / Frontend / UI / Web Developer — JD leads with React, Next.js, Redux, CSS frameworks | `variants/frontend-react/resume.pdf` |
| **`fullstack`** | Full Stack / MERN / Node.js / Backend (JS-TS) / SDE — JD leads with APIs, databases, auth, or LLM features | `variants/fullstack/resume.pdf` |
| **`generalist`** | Software Engineer / SDE-1 / Trainee / Fresher — **and anything with no real JD**: Wellfound, Naukri, LinkedIn Easy Apply, referrals, drives | `variants/generalist/resume.pdf` |

Read the variant's `spec.md` before sending if you want its keyword list, its known gaps, or the
reason a role maps there.

## Routing rule

1. Read the JD's **first three must-have skills**. Whichever cluster they land in wins.
2. Tie or unclear → `generalist`.
3. No JD at all → `generalist`.
4. The must-haves are a stack that isn't here (Angular, Java, Python/Django, Go, DevOps, mobile) →
   no variant fits and a bespoke resume won't invent the skills either. Apply with `generalist`
   or skip the role.

## The one thing to change: header city

Every variant has a single line near the top of its `.tex`:

```latex
\newcommand{\HeaderCity}{Mohali, Punjab, India}
```

The house rule (`resume-writing` skill, ATS mechanics) is that the header city follows the **job's**
city, because a local-looking address survives location filters. So:

- **On-site / hybrid role with a named city** → change that line to the job's city, recompile
  (`npm run pdf -- "variants/<slug>/resume.tex"`), send. ~15 seconds. Change it back afterwards, or
  let `/apply` do the whole thing into the company folder.
- **No city named, or remote outside north India** → send the shipped PDF as-is (Mohali).

The committed PDFs are all built with the Mohali fallback.

## Applying

Run `/apply <company> <role> [variant] [city] [notes-or-url]`. It picks the variant, handles the city
swap, and appends the row to `memory/applications.md` so you always know which resume went where.
Doing it by hand is fine too — just add the log row, including the variant slug and the date, e.g.
`fullstack@2026-07-27`.

## When to bespoke instead

Run the full `/write-resume <jd-url>` when the job is worth 20 minutes:

- a company you'd genuinely rather work at than the others in the queue
- a JD with an unusual hard requirement that a variant doesn't mirror (a named domain, a specific
  framework you do have evidence for but the variant omits)
- anything past a first-round conversation, where the resume gets read closely
- a referral, where the resume passes through a person rather than an ATS

Bespoke runs still land in `companies/<company>/<role>/` and log with variant `— (bespoke)`.

## Maintaining these

- After anything changes in `profile/general-resume.md` or a `projects/*.md` doc, the variants are
  stale. Refresh the affected sections, recompile all three, confirm `pages: 1`, and re-check each
  `spec.md`'s honesty-check line.
- Never let a variant drift from the hard rules: `[shipped]` claims only, verbatim experience
  bullets, project entries need ≥2 bullets and both links.
- If a fourth cluster shows up in the applications log (three-plus applications whose JD must-haves
  no variant covers), harvest the best-scoring one into a new variant rather than tailoring
  repeatedly.
- `companies/general/all-purpose/` is the retired predecessor of `generalist` — kept for history,
  not for sending.
