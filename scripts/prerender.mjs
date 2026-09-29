/**
 * Build-time prerender: runs after `vite build` and rewrites
 *   dist/index.html    → fully rendered English page
 *   dist/es/index.html → fully rendered Spanish page
 * so static hosts (Vercel, Netlify, any CDN) serve complete content
 * to Google and the AI crawlers that never execute JavaScript.
 * The SSR bundle consumed here is produced by
 *   `vite build --ssr src/entry-server.tsx --outDir .ssg-tmp`
 * (see the "build" script in package.json) and deleted afterwards.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const ssgDir = path.join(root, '.ssg-tmp');
const dist = path.join(root, 'dist');

const { renderHtml, renderRegionHtml, REGION_SLUGS } = await import(
  pathToFileURL(path.join(ssgDir, 'entry-server.js')).href
);
const template = readFileSync(path.join(dist, 'index.html'), 'utf8');

writeFileSync(path.join(dist, 'index.html'), renderHtml(template, 'en'));

mkdirSync(path.join(dist, 'es'), { recursive: true });
writeFileSync(path.join(dist, 'es', 'index.html'), renderHtml(template, 'es'));

// Region landing pages: dist/<slug>/index.html (EN) + dist/es/<slug>/ (ES).
let count = 0;
for (const lang of ['en', 'es']) {
  for (const slug of REGION_SLUGS) {
    const dir = path.join(dist, lang === 'es' ? 'es' : '', slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, 'index.html'), renderRegionHtml(template, slug, lang));
    count++;
  }
}

rmSync(ssgDir, { recursive: true, force: true });
console.log(`Prerendered EN + ES home pages and ${count} region pages (dist/)`);