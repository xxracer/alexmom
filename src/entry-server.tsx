/**
 * Shared server-side rendering: one complete HTML document per language.
 * Used at build time by scripts/prerender.mjs (static hosts like Vercel)
 * and at runtime by server.ts (Express hosts).
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import App, { DICTIONARY } from './App';
import { headBlock, regionHeadBlock, type Lang } from './seo';
import { REGIONS } from './regions';
import RegionPage from './RegionPage';

export { REGIONS };
export const REGION_SLUGS = REGIONS.map((r) => r.slug);

/**
 * Static region landing pages: fully server-rendered HTML with the SPA
 * module script stripped (these pages are content-first and need no JS).
 */
export function renderRegionHtml(template: string, slug: string, lang: Lang): string {
  const region = REGIONS.find((r) => r.slug === slug);
  if (!region) throw new Error(`Unknown region slug: ${slug}`);
  const appHtml = renderToString(React.createElement(RegionPage, { region, lang }));
  let html = template
    .replace(/<!--SEO:START-->[\s\S]*?<!--SEO:END-->/, () => regionHeadBlock(region, lang))
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`)
    .replace(/<script[^>]*type="module"[^>]*><\/script>/, '');
  if (lang === 'es') html = html.replace('<html lang="en"', '<html lang="es"');
  return html;
}

export function renderHtml(template: string, lang: Lang): string {
  const appHtml = renderToString(React.createElement(App, { initialLang: lang }));
  let html = template
    .replace(
      /<!--SEO:START-->[\s\S]*?<!--SEO:END-->/,
      () => headBlock(lang, DICTIONARY[lang].faq.items),
    )
    // Prerendered templates carry SSR markers so this stays idempotent.
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`)
    .replace(
      /<!--SSR:START-->[\s\S]*?<!--SSR:END-->/,
      () => `<!--SSR:START-->${appHtml}<!--SSR:END-->`,
    );
  if (lang === 'es') html = html.replace('<html lang="en"', '<html lang="es"');
  return html;
}