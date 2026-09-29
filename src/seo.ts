/**
 * Head SEO + structured data generated server-side per language.
 * Used by server.ts to prerender "/" (English) and "/es/" (Spanish).
 */

export type Lang = 'en' | 'es';

export const SITE_URL = 'https://www.medicareoneonone.com';

import type { Region } from './regions';

const IMAGES = {
  logo: 'https://static.wixstatic.com/media/c5947c_0a07e47683704838b0f81d898569c737~mv2.jpg',
  og: 'https://static.wixstatic.com/media/c5947c_72379b8c01e94d3085ab7e7740d0b557~mv2.jpg/v1/fill/w_1200,h_630,al_c,q_85/hero.jpg',
  portrait: 'https://static.wixstatic.com/media/c5947c_34978e684911475fa14af409bad19ee4~mv2.jpg',
};

const META: Record<Lang, {
  title: string;
  description: string;
  path: string;
  htmlLang: string;
  ogLocale: string;
  ogAltLocale: string;
  ogImageAlt: string;
}> = {
  en: {
    title: 'Texas Medicare Broker Alely Medrano | Advantage, Part D, Medigap',
    description:
      'Free one-on-one Medicare guidance across Texas, in English and Spanish. Licensed broker Alely Medrano compares Advantage, Part D and Medigap for 2026/2027.',
    path: '/',
    htmlLang: 'en-US',
    ogLocale: 'en_US',
    ogAltLocale: 'es_ES',
    ogImageAlt: 'Alely Medrano, Medicare broker',
  },
  es: {
    title: 'Asesora de Medicare en Texas | Alely Medrano',
    description:
      'Guía gratuita de Medicare en Texas, en español e inglés. Alely Medrano, asesora licenciada, te ayuda a comparar Advantage, Parte D y Medigap para 2026/2027.',
    path: '/es/',
    htmlLang: 'es',
    ogLocale: 'es_ES',
    ogAltLocale: 'en_US',
    ogImageAlt: 'Alely Medrano, asesora de Medicare',
  },
};

export function langFromPath(pathname: string): Lang {
  return pathname.replace(/\/+$/, '').endsWith('/es') ? 'es' : 'en';
}

export function schemaGraph(lang: Lang, faqItems: { q: string; a: string }[]) {
  const orgId = `${SITE_URL}/#organization`;
  const personId = `${SITE_URL}/#alely`;
  const pageUrl = lang === 'en' ? `${SITE_URL}/` : `${SITE_URL}/es/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'InsuranceAgency',
        '@id': orgId,
        name: 'Alely Medrano Medicare Solutions',
        alternateName: 'Medicare One on One',
        url: SITE_URL + '/',
        logo: IMAGES.logo,
        image: IMAGES.logo,
        telephone: '+1-281-814-9431',
        email: 'alelyhm@outlook.com',
        areaServed: { '@type': 'AdministrativeArea', name: 'Texas' },
        knowsLanguage: ['en', 'es'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+1-281-814-9431',
          areaServed: 'US-TX',
          availableLanguage: ['en', 'es'],
        },
        founder: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Alely Medrano',
        jobTitle: 'Licensed Medicare Broker',
        worksFor: { '@id': orgId },
        telephone: '+1-281-814-9431',
        email: 'alelyhm@outlook.com',
        image: IMAGES.portrait,
        knowsLanguage: ['en', 'es'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL + '/',
        name: 'Medicare One on One',
        publisher: { '@id': orgId },
        inLanguage: lang === 'en' ? 'en-US' : 'es',
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: META[lang].title,
        description: META[lang].description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': orgId },
        inLanguage: lang === 'en' ? 'en-US' : 'es',
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: lang === 'en' ? 'en-US' : 'es',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };
}

/**
 * Head fragment for the static region landing pages (src/regions.ts).
 * Same structure as headBlock, plus BreadcrumbList schema.
 */
export function regionHeadBlock(region: Region, lang: Lang): string {
  const c = region.i18n[lang];
  const pageUrl = lang === 'en' ? `${SITE_URL}/${region.slug}/` : `${SITE_URL}/es/${region.slug}/`;
  const homeUrl = lang === 'en' ? `${SITE_URL}/` : `${SITE_URL}/es/`;
  const homeName = lang === 'en' ? 'Home' : 'Inicio';
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'InsuranceAgency',
        '@id': `${SITE_URL}/#organization`,
        name: 'Alely Medrano Medicare Solutions',
        alternateName: 'Medicare One on One',
        url: SITE_URL + '/',
        telephone: '+1-281-814-9431',
        areaServed: { '@type': 'AdministrativeArea', name: 'Texas' },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+1-281-814-9431',
          areaServed: 'US-TX',
          availableLanguage: ['en', 'es'],
        },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#alely`,
        name: 'Alely Medrano',
        jobTitle: 'Licensed Medicare Broker',
        knowsLanguage: ['en', 'es'],
        telephone: '+1-281-814-9431',
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: c.title,
        description: c.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        inLanguage: lang === 'en' ? 'en-US' : 'es',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeName, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: 'Texas', item: lang === 'en' ? `${SITE_URL}/` : `${SITE_URL}/es/` },
          { '@type': 'ListItem', position: 3, name: c.area, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: lang === 'en' ? 'en-US' : 'es',
        mainEntity: c.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  }).replace(/</g, '\\u003c');
  return [
    `<title>${c.title}</title>`,
    `<meta name="description" content="${c.description}" />`,
    `<link rel="canonical" href="${pageUrl}" />`,
    `<link rel="alternate" hreflang="en" href="${SITE_URL}/${region.slug}/" />`,
    `<link rel="alternate" hreflang="es" href="${SITE_URL}/es/${region.slug}/" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/${region.slug}/" />`,
    `<meta property="og:url" content="${pageUrl}" />`,
    `<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'es_ES'}" />`,
    `<meta property="og:locale:alternate" content="${lang === 'en' ? 'es_ES' : 'en_US'}" />`,
    `<meta property="og:title" content="${c.title}" />`,
    `<meta property="og:description" content="${c.description}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
}

/**
 * Language-specific head fragment. server.ts swaps the whole
 * <!--SEO:START-->…<!--SEO:END--> region of dist/index.html with this.
 */
export function headBlock(lang: Lang, faqItems: { q: string; a: string }[]): string {
  const m = META[lang];
  const jsonLd = JSON.stringify(schemaGraph(lang, faqItems)).replace(/</g, '\\u003c');
  return [
    `<title>${m.title}</title>`,
    `<meta name="description" content="${m.description}" />`,
    `<link rel="canonical" href="${SITE_URL}${m.path}" />`,
    `<link rel="alternate" hreflang="en" href="${SITE_URL}/" />`,
    `<link rel="alternate" hreflang="es" href="${SITE_URL}/es/" />`,
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`,
    `<meta property="og:url" content="${SITE_URL}${m.path}" />`,
    `<meta property="og:locale" content="${m.ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${m.ogAltLocale}" />`,
    `<meta property="og:title" content="${m.title}" />`,
    `<meta property="og:description" content="${m.description}" />`,
    `<meta property="og:image:alt" content="${m.ogImageAlt}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join('\n    ');
}