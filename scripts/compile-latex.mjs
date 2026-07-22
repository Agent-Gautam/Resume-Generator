#!/usr/bin/env node
/**
 * LaTeX -> PDF compiler for this project.
 *
 *   Usage:  npm run pdf -- <path-to-file.tex>
 *   Output: <same-folder>/<same-name>.pdf
 *
 * Engine resolution order:
 *   1. Project-local Tectonic  (tools/tectonic/tectonic.exe) — bundled, no install needed
 *   2. tectonic on PATH
 *   3. latexmk / xelatex / pdflatex on PATH
 *
 * Note: Tectonic downloads LaTeX packages on first use (needs internet once),
 * then caches them in %APPDATA%. Subsequent compiles are fast and offline.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const texArg = process.argv[2];

if (!texArg) {
  console.error('Usage: npm run pdf -- <path-to-file.tex>');
  process.exit(2);
}

const texPath = path.resolve(texArg);
if (!existsSync(texPath) || !texPath.toLowerCase().endsWith('.tex')) {
  console.error(`Not a .tex file or not found: ${texPath}`);
  process.exit(2);
}

const outDir = path.dirname(texPath);
const localTectonic = path.join(root, 'tools', 'tectonic', 'tectonic.exe');

const engines = [
  {
    name: 'tectonic (project-local)',
    cmd: localTectonic,
    args: ['--outdir', outDir, '--keep-logs', texPath],
    available: () => existsSync(localTectonic),
  },
  {
    name: 'tectonic (system)',
    cmd: 'tectonic',
    args: ['--outdir', outDir, '--keep-logs', texPath],
  },
  {
    name: 'latexmk',
    cmd: 'latexmk',
    args: ['-pdf', '-interaction=nonstopmode', `-output-directory=${outDir}`, texPath],
  },
  {
    name: 'xelatex',
    cmd: 'xelatex',
    args: ['-interaction=nonstopmode', `-output-directory=${outDir}`, texPath],
  },
  {
    name: 'pdflatex',
    cmd: 'pdflatex',
    args: ['-interaction=nonstopmode', `-output-directory=${outDir}`, texPath],
  },
];

for (const engine of engines) {
  if (engine.available) {
    if (!engine.available()) continue;
  } else {
    const probe = spawnSync(engine.cmd, ['--version'], { stdio: 'ignore' });
    if (probe.error || probe.status !== 0) continue;
  }

  console.log(`[compile-latex] engine: ${engine.name}`);
  const res = spawnSync(engine.cmd, engine.args, { stdio: 'inherit', cwd: outDir });

  if (res.status === 0) {
    const base = path.basename(texPath, '.tex');
    const pdf = path.join(outDir, base + '.pdf');
    console.log(`[compile-latex] OK -> ${pdf}`);
    try {
      const log = readFileSync(path.join(outDir, base + '.log'), 'utf8');
      const m = log.match(/Output written on .*\((\d+) pages?[,)]/);
      if (m) console.log(`[compile-latex] pages: ${m[1]}`);
    } catch {
      /* no log kept — page count unavailable */
    }
    process.exit(0);
  }

  console.error(
    `[compile-latex] FAILED (exit ${res.status}). Read the .log file next to the .tex for the error.`,
  );
  process.exit(1);
}

console.error(
  '[compile-latex] No LaTeX engine found. Expected tools/tectonic/tectonic.exe (bundled with this project) or tectonic/latexmk/xelatex/pdflatex on PATH.',
);
process.exit(3);
