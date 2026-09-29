/**
 * Static region landing page (one per Texas metro).
 * Rendered 100% at build time — crawlers and AI assistants get the full
 * content with zero JavaScript (FAQ uses native <details>).
 * Not part of the SPA bundle; see scripts/prerender.mjs + scripts/prerender.
 */
import React from 'react';
import { Phone, Mail, CheckCircle2 } from 'lucide-react';
import type { Region, Lang } from './regions';

const PHONE_TEL = 'tel:+12818149431';
const PHONE_DISPLAY = '(281) 814-9431';
const EMAIL = 'alelyhm@outlook.com';

const UI = {
  en: {
    role: 'Medicare Broker · TX',
    home: 'Home',
    langSwitch: '/es/',
    langLabel: 'Español',
    badge: 'Free Medicare consultation',
    ctaCall: 'Call',
    ctaForm: 'Request a call back',
    citiesTitle: 'Cities we serve',
    whatTitle: 'What we compare for you',
    whatAccent: '— always free',
    what: [
      { t: 'Medicare Advantage', d: 'All-in-one plans available in your ZIP code, compared against the doctors you already use.' },
      { t: 'Medigap / Supplements', d: 'Filled-gap coverage over Original Medicare — premiums, deductibles and what each lettered plan really covers.' },
      { t: 'Part D drug plans', d: 'Your actual prescriptions, matched against each plan\'s formulary so 2026\'s $2,100 cap works in your favor.' },
    ],
    faqKicker: 'Local answers',
    faqTitle: (area: string) => `FAQ from ${area} clients`,
    ctaTitle: 'Talk with Alely — free, in your language',
    ctaSubtitle: 'One-on-one, no pressure. She will call you back within 24 business hours.',
    hours: 'Mon–Fri, 9 am – 5 pm',
    disclaimer: 'Alely Medrano is a licensed independent insurance broker. Not affiliated with or endorsed by any government agency.',
  },
  es: {
    role: 'Asesora de Medicare · TX',
    home: 'Inicio',
    langSwitch: '/',
    langLabel: 'English',
    badge: 'Asesoría de Medicare gratis',
    ctaCall: 'Llama ahora',
    ctaForm: 'Pide una llamada',
    citiesTitle: 'Ciudades que atendemos',
    whatTitle: 'Lo que comparamos por ti',
    whatAccent: '— siempre gratis',
    what: [
      { t: 'Medicare Advantage', d: 'Planes disponibles con tu código postal, cotejados con los doctores que ya atienden.' },
      { t: 'Medigap / Suplementos', d: 'Cubre lo que Medicare original deja abierto — primas, deducibles y qué significa cada plan por letra.' },
      { t: 'Parte D — medicamentos', d: 'Tus medicinas de verdad, contra la lista de cada plan, para que el tope de $2,100 de 2026 juegue a tu favor.' },
    ],
    faqKicker: 'Respuestas locales',
    faqTitle: (area: string) => `Preguntas de clientes de ${area}`,
    ctaTitle: 'Habla con Alely — gratis y en tu idioma',
    ctaSubtitle: 'Uno a uno y sin presión. Te devuelve la llamada dentro de 24 horas laborales.',
    hours: 'Lunes a viernes, 9 am – 5 pm',
    disclaimer: 'Alely Medrano es una agente independiente licenciada de seguros. No tiene afiliación ni respaldo de ninguna agencia gubernamental.',
  },
} as const;

export default function RegionPage({ region, lang }: { region: Region; lang: Lang }) {
  const t = region.i18n[lang];
  const ui = UI[lang];
  const homeUrl = lang === 'en' ? '/' : '/es/';
  const homeLabel = lang === 'en' ? 'Home' : 'Inicio';
  const stateSuffix = lang === 'en' ? 'TX' : 'Texas';

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <a href={homeUrl} className="flex flex-col leading-tight">
            <span className="font-black text-primary tracking-tight text-lg">Medicare One on One</span>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent-red">{ui.role}</span>
          </a>
          <div className="flex items-center gap-3">
            <a href={ui.langSwitch} className="text-sm font-bold text-slate-500 hover:text-accent-red transition-colors">{ui.langLabel}</a>
            <a href={PHONE_TEL} className="hidden sm:flex items-center gap-2 bg-primary hover:bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all">
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Breadcrumb */}
        <nav className="max-w-6xl mx-auto px-6 pt-6 text-sm text-slate-400 font-medium" aria-label="Breadcrumb">
          <a href={homeUrl} className="hover:text-accent-red transition-colors">{homeLabel}</a>
          <span className="mx-2">›</span>
          <span>Texas</span>
          <span className="mx-2">›</span>
          <span className="text-primary">{region.cities[0]}</span>
        </nav>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-10 pb-14">
          <p className="inline-block px-4 py-1.5 rounded-full bg-accent-red/5 text-accent-red text-[0.65rem] font-bold tracking-widest uppercase mb-6">{ui.badge}</p>
          <h1 className="text-primary text-4xl md:text-5xl font-black tracking-tight leading-[1.1] max-w-3xl">
            {t.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-500 font-medium max-w-2xl">
            {t.welcome}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={PHONE_TEL} className="flex items-center gap-3 bg-accent-red hover:bg-accent-red-hover text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-red-500/20 transition-all">
              <Phone className="w-5 h-5" /> {ui.ctaCall}
            </a>
            <a href={`${homeUrl}#contact`} className="bg-slate-50 hover:bg-slate-100 text-primary border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg transition-all">
              {ui.ctaForm}
            </a>
          </div>
        </section>

        {/* Cities chips */}
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-primary mb-4">{ui.citiesTitle}</h2>
          <div className="flex flex-wrap gap-2.5">
            {region.cities.map((city) => (
              <span key={city} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-600">
                {city}, {stateSuffix}
              </span>
            ))}
          </div>
        </section>

        {/* Unique intro copy */}
        <section className="max-w-3xl mx-auto px-6 pb-14 space-y-5">
          {t.intro.map((paragraph, i) => (
            <p key={i} className="text-lg text-slate-600 leading-relaxed font-medium">{paragraph}</p>
          ))}
        </section>

        {/* What we compare */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl text-primary font-bold tracking-tight mb-10">
              {ui.whatTitle} <span className="text-accent-red">{ui.whatAccent}</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {ui.what.map((item) => (
                <div key={item.t} className="bg-white p-8 rounded-[2rem] shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-accent-red mb-5" />
                  <h3 className="text-primary font-bold text-xl mb-3">{item.t}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — native details/summary, works with zero JavaScript */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <p className="inline-block px-4 py-1.5 rounded-full bg-accent-red/5 text-accent-red text-[0.65rem] font-bold tracking-widest uppercase mb-6">{ui.faqKicker}</p>
          <h2 className="text-primary text-3xl font-bold tracking-tight mb-8">{ui.faqTitle(t.area)}</h2>
          <div className="space-y-4">
            {t.faq.map((item) => (
              <details key={item.q} className="group bg-white border border-slate-100 rounded-3xl px-6 py-5 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-primary text-lg gap-4 list-none">
                  {item.q}
                  <span className="text-accent-red transition-transform group-open:rotate-45 text-2xl shrink-0">+</span>
                </summary>
                <p className="mt-4 text-slate-500 font-medium leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="bg-primary rounded-[3rem] p-10 md:p-14 text-center">
            <h2 className="text-white text-3xl md:text-4xl font-black tracking-tight mb-3">{ui.ctaTitle}</h2>
            <p className="text-white/70 text-lg font-medium mb-8 max-w-xl mx-auto">{ui.ctaSubtitle}</p>
            <a href={PHONE_TEL} className="inline-flex items-center gap-3 bg-accent-red hover:bg-[--color-accent-red-hover] text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-xl shadow-red-500/20 transition-all">
              <Phone className="w-6 h-6" /> {PHONE_DISPLAY}
            </a>
            <p className="text-white/50 text-sm font-medium mt-6 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" /> {EMAIL} · {ui.hours}
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-8">
        <p className="max-w-4xl mx-auto px-6 text-center text-xs text-slate-400 leading-relaxed">
          {ui.disclaimer}
        </p>
      </footer>
    </div>
  );
}