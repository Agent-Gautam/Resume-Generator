# Resume Generator

Give Claude Code a job-description link; get back a tailored, honest, one-page PDF resume plus a brutal review of your fit.

## Usage

```
/write-resume <jd-url>
/write-resume <jd-url> jake       # use templates/jake.tex instead of default
```

Output lands in `companies/<company>/<role>/`: `jd.md`, `resume.tex`, `resume.pdf`, `review.md`.

Keeping project docs current (no manual rebuilding — it mines the repo's git history since the last sync):

```
/update-project cryptax                        # sync doc + memory from D:\repos\buddy-*
/update-project blood-link D:\repos\blood-link-supabase   # scaffold a NEW doc from a repo
/update-project koinx "shipped X feature"      # repo not local: facts via a short interview
```

## Before first use

1. Fill in `profile/general-resume.md` (contact, education, experience, skills). Generation is blocked until this is done.
2. Add one source doc per project in `projects/` — follow the structure of `projects/cryptax.md` (facts, pre-written bullets, skill→evidence table, honesty notes).

## How it works

- `CLAUDE.md` — orientation + hard rules for the AI.
- `.claude/commands/write-resume.md` — the pipeline definition.
- `.claude/skills/resume-writing/` — human-sounding, ATS-safe writing craft (shareable).
- `.claude/skills/latex-resume/` — LaTeX authoring/compiling craft (shareable).
- `memory/` — cross-session digests so Claude doesn't rescan every file each run.
- `npm run pdf -- <file.tex>` — LaTeX→PDF via the bundled Tectonic engine (`tools/`), no system LaTeX needed.
