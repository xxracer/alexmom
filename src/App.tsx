/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ShieldPlus, Phone, Cake, ClipboardCheck, Pill, ArrowRight, Send, Mail, Globe, Calendar, Menu, X, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const DICTIONARY = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Medicare Options',
      contact: 'Contact',
    },
    hero: {
      badge: 'Expert Medicare Broker Since 2015',
      title: 'Your Trusted Medicare Broker',
      subtitle: 'Simplifying your Medicare choices with 11 years of dedicated experience. We help you to find the personalized coverage you truly deserve.',
      cta1: 'Free Consultation',
      cta2: 'Talk to ME',
      alely_alt: 'Alely Medrano, Licensed Medicare Broker providing expert 2026/2027 guidance',
    },
    services: {
      title: 'Precision Medicare',
      title_accent: 'Advisory 2026',
      subtitle: 'Don\'t let 2026 changes catch you off guard. We provide analysis of your health coverage options and what is most important for YOU. Take advantage of benefits you would actually use.',
      scroll: 'Discover 2026 Options',
      items: [
        {
          title: "Expert Medicare Guidance",
          desc: "Whether you're Dual Eligible, choosing Advantage, or exploring Supplement Plans — I will analyze and give you a complete picture of what each option looks like."
        },
        {
          title: "Advantage Optimization",
          desc: "Plan options are shifting in 2026. We analyze your specific local market to find the highest value Medicare Advantage options."
        },
        {
          title: "Prescription Drug Savings",
          desc: "Benefiting from the 2026 $2,100 out-of-pocket limit. We find plans that cover your medications at the absolute lowest cost."
        }
      ],
      quote: '"In 2026, Medicare isn\'t just about insurance; it\'s about navigating the most significant policy shifts in a decade with absolute clarity."',
    },
    about: {
      badge: 'Over a Decade of Excellence',
      title: 'A Local Legacy of',
      title_accent: 'Medicare Trust',
      quote: '"My mission for 2026 is simple: to protect our community members from the confusion of new regulations through personalized, one-on-one sessions."',
      p1: "Since 2015, I've seen Medicare evolve. The 2026 changes represent a milestone, and my experience allows me to translate these complexities into simple, actionable choices for you.",
      p2: "I am an independent broker, meaning I work for you—not the insurance companies. My loyalty is to your health and your financial peace of mind.",
      name: 'Alely Medrano',
      role: 'Founding Medicare Specialist',
      img_alt: 'Alely Medrano helping a local senior understand their Medicare options',
    },
    faq: {
      title: 'Medicare 2026',
      title_accent: 'Answers',
      subtitle: 'Everything you need to know about the 2026 shifts in coverage, costs, and new protections.',
      items: [
        {
          q: "What are the major Medicare changes for 2026?",
          a: "The headline change is the new $2,100 annual out-of-pocket cap for Part D prescription drugs. Additionally, Medicare will begin using newly negotiated prices for several high-cost drugs, and coverage is expanding for GLP-1 weight-loss medications."
        },
        {
          q: "I missed Open Enrollment, can I still change my plan for 2026?",
          a: "Yes. From January 1 to March 31, 2026, you can use the Medicare Advantage Open Enrollment Period (MAOEP). Also, if you have both Medicare and Medicaid, or qualify for a Special Election Period (SEP), you may have additional options."
        },
        {
          q: "How does the $2,100 Part D cap work in 2026?",
          a: "Once you spend $2,100 on covered prescriptions in 2026, you pay $0 for the rest of the year. This is part of the final phase-in of the Inflation Reduction Act's drug cost protections."
        },
        {
          q: "When does the next enrollment cycle for 2027 start?",
          a: "Annual Enrollment for 2027 will begin on October 15 and run through December 7, 2026. This is when you should review the new 2027 plan benefits."
        }
      ]
    },
    contact: {
      title: 'Ready for a Better Medicare Experience?',
      subtitle: 'Alely will call you back within 24 hours to discuss your options personally.',
      labels: {
        name: 'Your Full Name',
        phone: 'Phone Number',
        zip: 'ZIP / Area Code',
      },
      placeholders: {
        name: 'Jane Smith',
        phone: '(555) 000-0000',
        zip: '90210',
      },
      button: 'Request Call Back',
      success_title: 'Request Received!',
      success_msg: 'Thank you for reaching out. Alely will contact you personally within 24 hours.',
      success_button: 'Send Another Request',
      insurances_label: 'Insurance Plans Selected',
      insurances_none: 'No insurance plan selected',
    },
    insurances: {
      badge: 'Accepted Insurance Plans',
      title: 'Insurance Plans',
      title_accent: 'We Work With',
      subtitle: 'We work with the most trusted insurance carriers so you can get the coverage that best fits your needs.',
      toggle_hint: 'Select the plans your client uses — they will be included in the request',
      cta: 'Continue to Contact Form',
    },
    footer: {
      desc: 'Alely Medrano: Leading independent Medicare Broker specializing in Advantage, Part D, and Supplemental plans since 2015.',
      contact_title: 'Direct Advocacy',
      nav_title: 'Quick Access',
      cms_disclaimer: 'CMS Required Disclaimer: We do not offer every plan available in your area. Any information we provide is limited to those plans we do offer in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.',
      copyright: '© 2026 Alely Medrano Medicare Solutions. All rights reserved.',
      endorsement: 'Not connected with or endorsed by the U.S. government or the federal Medicare program.',
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      services: 'Opciones de Medicare',
      contact: 'Contacto',
    },
    hero: {
      badge: 'Asesora de Medicare Experta desde 2015',
      title: 'Tu Asesora de Confianza de Medicare',
      subtitle: 'Simplificando tus opciones de Medicare con 11 años de experiencia dedicada. Te ayudamos a encontrar la cobertura personalizada que realmente mereces.',
      cta1: 'Consulta Gratuita',
      cta2: 'Habla Conmigo',
      alely_alt: 'Alely Medrano, Asesora de Medicare Licenciada brindando guía experta para 2026/2027',
    },
    services: {
      title: 'Asesoría de Medicare',
      title_accent: 'de Precisión 2026',
      subtitle: 'No dejes que los cambios de 2026 te tomen por sorpresa. Te brindamos un análisis de tus opciones de cobertura de salud y lo que es más importante para TI. Aprovecha los beneficios que realmente usarías.',
      scroll: 'Descubre Opciones 2026',
      items: [
        {
          title: "Guía Experta de Medicare",
          desc: "Ya seas Dual Elegible, estés eligiendo Advantage o explorando planes Suplementarios — analizaré y te daré una imagen completa de cómo se ve cada opción."
        },
        {
          title: "Optimización Advantage",
          desc: "Las opciones de planes están variando en 2026. Analizamos tu mercado local específico para encontrar las mejores opciones de Medicare Advantage."
        },
        {
          title: "Ahorro en Medicamentos",
          desc: "Aprovechando el límite de $2,100 en gastos de bolsillo de 2026. Encontramos los planes que cubren tus medicinas al menor costo posible."
        }
      ],
      quote: '"En 2026, Medicare no se trata solo de seguros; se trata de navegar los cambios de política más significativos en una década con absoluta claridad."',
    },
    about: {
      badge: 'Más de una Década de Excelencia',
      title: 'Un Legado Local de',
      title_accent: 'Confianza en Medicare',
      quote: '"Mi misión para 2026 es simple: proteger a nuestra comunidad de la confusión de las nuevas regulaciones mediante sesiones personalizadas uno a uno."',
      p1: "Desde 2015, he visto evolucionar a Medicare. Los cambios de 2026 representan un hito, y mi experiencia me permite traducir estas complejidades en opciones simples para ti.",
      p2: "Soy una asesora independiente, lo que significa que trabajo para ti, no para las aseguradoras. Mi lealtad es con tu salud y tu tranquilidad financiera.",
      name: 'Alely Medrano',
      role: 'Especialista Fundadora en Medicare',
      img_alt: 'Alely Medrano ayudando a un residente local a entender sus opciones de Medicare',
    },
    faq: {
      title: 'Medicare 2026',
      title_accent: 'Respuestas',
      subtitle: 'Todo lo que necesitas saber sobre los cambios de 2026 en cobertura, costos y nuevas protecciones.',
      items: [
        {
          q: "¿Cuáles son los cambios principales de Medicare para 2026?",
          a: "El cambio principal es el nuevo límite anual de $2,100 en gastos de bolsillo para la Parte D. Además, Medicare comenzará a usar precios negociados para medicamentos de alto costo y se expandirá la cobertura para medicamentos de pérdida de peso GLP-1."
        },
        {
          q: "Perdí la Inscripción Abierta, ¿aún puedo cambiar mi plan para 2026?",
          a: "Sí. Del 1 de enero al 31 de marzo de 2026, puedes usar el Periodo de Inscripción Abierta de Medicare Advantage (MAOEP). También, si tienes Medicare y Medicaid, puedes calificar para un Periodo Especial (SEP)."
        },
        {
          q: "¿Cómo funciona el límite de $2,100 de la Parte D en 2026?",
          a: "Una vez que gastes $2,100 en medicamentos cubiertos en 2026, pagarás $0 el resto del año. Esto completa la fase final de protección de costos de medicamentos de la Ley de Reducción de Inflación."
        },
        {
          q: "¿Cuándo comienza el próximo ciclo de inscripción para 2027?",
          a: "La Inscripción Anual para 2027 comenzará el 15 de octubre y terminará el 7 de diciembre de 2026. Es el momento de revisar los nuevos beneficios del año 2027."
        }
      ]
    },
    contact: {
      title: '¿Listo para una mejor experiencia con Medicare?',
      subtitle: 'Alely te devolverá la llamada en menos de 24 horas para discutir tus opciones personalmente.',
      labels: {
        name: 'Nombre Completo',
        phone: 'Número de Teléfono',
        zip: 'Código Postal',
      },
      placeholders: {
        name: 'Juana Pérez',
        phone: '(555) 000-0000',
        zip: '90210',
      },
      button: 'Solicitar Llamada',
      success_title: '¡Solicitud Recibida!',
      success_msg: 'Gracias por contactarnos. Alely se comunicará contigo personalmente en menos de 24 horas.',
      success_button: 'Enviar otra solicitud',
      insurances_label: 'Planes de Seguro Seleccionados',
      insurances_none: 'Ningún plan de seguro seleccionado',
    },
    insurances: {
      badge: 'Planes de Seguro Aceptados',
      title: 'Seguros',
      title_accent: 'Con los que Trabajamos',
      subtitle: 'Trabajamos con los aseguradores más confiables para que puedas obtener la cobertura que mejor se adapta a tus necesidades.',
      toggle_hint: 'Selecciona los planes que usa tu cliente — se incluirán en la solicitud',
      cta: 'Continuar al Formulario de Contacto',
    },
    footer: {
      desc: 'Alely Medrano: Asesora independiente líder en Medicare, especializada en planes Advantage, Parte D y Suplementarios desde 2015.',
      contact_title: 'Defensoría Directa',
      nav_title: 'Acceso Rápido',
      cms_disclaimer: 'Descargo de responsabilidad requerido por CMS: No ofrecemos todos los planes disponibles en su área. Cualquier información que proporcionemos se limita a los planes que sí ofrecemos en su área. Comuníquese con Medicare.gov o al 1-800-MEDICARE para obtener información sobre todas sus opciones.',
      copyright: '© 2026 Alely Medrano Medicare Solutions. Todos los derechos reservados.',
      endorsement: 'No estamos conectados ni respaldados por el gobierno de los EE. UU. ni por el programa federal de Medicare.',
    }
  }
};

const CONTACT_INFO = {
  phone: "(281) 814-9431",
  email: "alelyhm@outlook.com",
  hours: "Mon-Fri, 9am - 5pm"
};

const LazyImage = ({
  src,
  alt,
  className,
  aspect = "aspect-auto",
  width,
  height
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  width?: number;
  height?: number;
}) => (
  <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${aspect} ${className}`}>
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover transition-opacity duration-500 opacity-0"
      onLoad={(e) => (e.currentTarget.classList.remove('opacity-0'), e.currentTarget.classList.add('opacity-100'))}
      referrerPolicy="no-referrer"
    />
  </div>
);

const Signature = () => (
  <svg
    viewBox="0 0 200 60"
    className="w-32 h-12 text-accent-red/60"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      d="M10,40 Q30,10 50,40 T90,40 T130,20 Q150,50 190,30"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
      d="M40,50 L160,45"
    />
  </svg>
);

const ImageCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
  }, [images.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleManualSelect = (i: number) => {
    setIndex(i);
    startTimer(); // Reset countdown on manual click
  };

  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[600px] group">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={images[index]}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => handleManualSelect(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${i === index ? 'bg-accent-red w-8' : 'bg-white/40'
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const FAQSection = React.memo(({ t }: { t: any }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-28 lg:py-48 bg-slate-50 relative overflow-hidden" id="faq">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent-red/5 text-accent-red text-[0.65rem] font-bold tracking-widest uppercase mb-6"
          >
            {t.faq.title_accent}
          </motion.div>
          <h2 className="text-primary mb-6">
            {t.faq.title}
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((item: any, i: number) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group border rounded-[2rem] transition-all duration-500 overflow-hidden ${isOpen ? 'bg-white border-accent-red/20 shadow-xl shadow-primary/5' : 'bg-white/50 border-slate-100 hover:border-slate-200'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left p-8 lg:p-10 flex items-center justify-between gap-6"
                >
                  <span className={`text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-slate-600 group-hover:text-primary'}`}>
                    {item.q}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-accent-red text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                    }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-8 lg:px-10 pb-10">
                        <div className="pt-6 border-t border-slate-50">
                          <p className="text-slate-600 font-medium leading-relaxed max-w-3xl">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

const LanguageModal = ({ onSelect }: { onSelect: (lang: 'en' | 'es') => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-xl p-4"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="bg-white rounded-[3rem] p-10 lg:p-16 max-w-2xl w-full shadow-2xl relative overflow-hidden text-center"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-red via-primary to-accent-red" />
      
      <motion.div 
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 text-primary"
      >
        <Globe className="w-10 h-10" />
      </motion.div>

      <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4 tracking-tight">Select Your Language</h2>
      <p className="text-slate-500 font-medium mb-12 text-lg">Selecciona tu idioma para continuar</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          onClick={() => onSelect('en')}
          className="group relative bg-slate-50 hover:bg-primary text-primary hover:text-white p-8 rounded-3xl transition-all duration-500 border border-slate-100 hover:border-primary shadow-sm hover:shadow-xl active:scale-95"
        >
          <span className="block text-2xl font-bold mb-1">English</span>
          <span className="text-sm font-medium opacity-60 group-hover:opacity-80">Medicare Solutions</span>
        </button>
        <button
          onClick={() => onSelect('es')}
          className="group relative bg-slate-50 hover:bg-accent-red text-primary hover:text-white p-8 rounded-3xl transition-all duration-500 border border-slate-100 hover:border-accent-red shadow-sm hover:shadow-xl active:scale-95"
        >
          <span className="block text-2xl font-bold mb-1">Español</span>
          <span className="text-sm font-medium opacity-60 group-hover:opacity-80">Asesoría de Medicare</span>
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const FloatingCTA = ({ t }: { t: any }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [400, 600], [0, 1]);
  const y = useTransform(scrollY, [400, 600], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-8 right-8 z-40 hidden md:block"
    >
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 border border-white/20"
      >
        <Phone className="w-5 h-5 text-accent-red" />
        {t.hero.cta2}
      </motion.a>
    </motion.div>
  );
};

const JSONLD = ({ t }: { t: any }) => {
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": t.faq.items.map((item: any) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };

    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Alely Medrano Medicare Solutions",
      "image": "https://static.wixstatic.com/media/c5947c_0a07e47683704838b0f81d898569c737~mv2.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Professional Dr, Suite 400",
        "addressLocality": "Main City",
        "addressRegion": "ST",
        "postalCode": "12345",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.7128,
        "longitude": -74.0060
      },
      "url": "https://alelymedrano.com",
      "telephone": "+12818149431"
    };

    const addSchema = (schema: any, id: string) => {
      let script = document.getElementById(id) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schema);
    };

    addSchema(faqSchema, 'faq-schema');
    addSchema(businessSchema, 'business-schema');

    return () => {
      document.getElementById('faq-schema')?.remove();
      document.getElementById('business-schema')?.remove();
    };
  }, [t]);

  return null;
};

const MobileMenu = ({ isOpen, onClose, t, onLanguageToggle, lang }: { isOpen: boolean; onClose: () => void; t: any; onLanguageToggle: () => void; lang: string }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm md:hidden"
        />
        <motion.nav
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 inset-inline-end-0 bottom-0 z-50 w-3/4 max-w-sm bg-white ps-8 pe-8 pt-8 pb-8 shadow-2xl md:hidden"
        >
          <div className="flex justify-between items-center mb-12">
            <button onClick={onLanguageToggle} className="flex items-center gap-2 bg-champagne px-3 py-1.5 rounded-lg border border-slate-200" aria-label="Toggle language">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-700">ESP | ENG</span>
            </button>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-accent-red transition-colors" aria-label="Close menu">
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            <a href="#" onClick={onClose} className="text-2xl font-bold tracking-tight text-slate-900 hover:text-accent-red transition-all">{t.nav.home}</a>
            <a href="#about" onClick={onClose} className="text-2xl font-bold tracking-tight text-slate-900 hover:text-accent-red transition-all">{t.nav.about}</a>
            <a href="#services" onClick={onClose} className="text-2xl font-bold tracking-tight text-slate-900 hover:text-accent-red transition-all">{t.nav.services}</a>
            <a href="#contact" onClick={onClose} className="text-2xl font-bold tracking-tight text-slate-900 hover:text-accent-red transition-all">{t.nav.contact}</a>

            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
              className="mt-6 flex items-center justify-center gap-3 bg-accent-red text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-red-500/20"
            >
              <Phone className="w-5 h-5" /> {lang === 'en' ? 'Call Now' : 'Llama Ahora'}
            </a>
          </div>
        </motion.nav>
      </>
    )}
  </AnimatePresence>
);

const Header = React.memo(({ onOpenMenu, t, onLanguageToggle, lang }: { onOpenMenu: () => void; t: any; onLanguageToggle: () => void; lang: string }) => {
  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 100], ["5rem", "4rem"]);
  const headerBlur = useTransform(scrollY, [0, 100], ["blur(12px)", "blur(20px)"]);
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.8)"]);
  const headerShadow = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.05)"]);

  return (
    <motion.header
      style={{ backdropFilter: headerBlur, backgroundColor: headerBg, boxShadow: headerShadow }}
      className="sticky top-0 z-40 w-full border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div style={{ height: headerHeight }} className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 sm:gap-3 group transition-transform hover:scale-[1.02] active:scale-95" aria-label="Alely Medrano Home">
            <img
              src="https://static.wixstatic.com/media/c5947c_15370a549d404494b4a4100f16cd538a~mv2.png"
              alt="Alely Medrano Logo"
              className="h-8 sm:h-9 w-auto"
              width={73}
              height={40}
            />
            <h1 className="text-lg sm:text-xl font-bold tracking-tighter text-primary uppercase leading-none">
              Alely <br /> <span className="text-accent-red">Medrano</span>
            </h1>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            <a className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors" href="#">{t.nav.home}</a>
            <a className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors" href="#about">{t.nav.about}</a>
            <a className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors" href="#services">{t.nav.services}</a>
            <a className="text-[0.75rem] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors" href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4 lg:gap-8">
            <button
              onClick={onLanguageToggle}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors group"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-700">ESP | ENG</span>
            </button>

            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-accent-red md:hidden border border-slate-200 active:scale-90 transition-transform"
              aria-label="Call Alely"
            >
              <Phone className="w-5 h-5" />
            </a>

            <a
              className="hidden xl:flex items-center gap-2 bg-primary hover:bg-slate-900 text-white px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10 active:scale-95"
              href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
            >
              <Phone className="w-4 h-4" />
              <span>{CONTACT_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenMenu}
              className="p-1 sm:p-2 md:hidden text-primary active:scale-90 transition-transform"
              aria-label="Open navigation menu"
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
});
const Hero = React.memo(({ t }: { t: any }) => (
  <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-48 overflow-hidden bg-background-light">
    {/* Background Decorative Elements with Floating Motion */}
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-0 inset-inline-end-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl opacity-50"
    />
    <motion.div
      animate={{
        y: [0, 20, 0],
        x: [0, 10, 0]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute bottom-0 inset-inline-start-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-accent-red/[0.03] rounded-full blur-3xl"
    />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative inline-block px-5 py-2 rounded-full bg-slate-50 text-slate-500 text-[0.65rem] font-bold tracking-widest uppercase mb-10 overflow-hidden border border-slate-100"
          >
            <span className="relative z-10">{t.hero.badge}</span>
            <motion.div
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 z-0"
            />
          </motion.div>

          <h2 className="text-primary mb-10 leading-[1.05]">
            {t.hero.title.split('Medicare')[0]} <br />
            <span className="italic font-normal text-slate-800">
              Medicare {t.hero.title.split('Medicare')[1]}
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-slate-500 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <motion.a
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px -10px rgba(220, 38, 38, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent-red hover:bg-slate-900 text-white px-12 py-5.5 rounded-2xl font-bold text-lg shadow-2xl shadow-red-500/20 transition-all text-center tracking-tight relative overflow-hidden group/btn"
              href="#contact"
            >
              <span className="relative z-10">{t.hero.cta1}</span>
              <motion.div
                className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                initial={false}
              />
            </motion.a>
            <motion.a
              whileHover={{
                scale: 1.05,
                y: -2,
                backgroundColor: "rgba(15, 23, 42, 1)",
                color: "rgba(255, 255, 255, 1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-50 text-primary border border-slate-200 px-12 py-5.5 rounded-2xl font-bold text-lg transition-all text-center tracking-tight"
              href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
            >
              <span className="flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 text-accent-red" />
                {t.hero.cta2}
              </span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex-1 w-full max-w-lg lg:max-w-none relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_48px_96px_-12px_rgba(0,0,0,0.15)] border-[0.75rem] border-white aspect-portrait rotate-1 hover:rotate-0 transition-transform duration-700">
            <LazyImage
              src="https://static.wixstatic.com/media/c5947c_34978e684911475fa14af409bad19ee4~mv2.jpg"
              alt={t.hero.alely_alt}
              width={500}
              height={700}
            />
          </div>
          {/* Accent decoration */}
          <div className="absolute -bottom-12 inset-inline-start-0 -translate-x-12 w-48 h-48 bg-accent-red/[0.04] rounded-full blur-3xl z-0" />
        </motion.div>
      </div>
    </div>
  </section>
));

const Services = React.memo(({ t }: { t: any }) => (
  <section className="py-28 lg:py-48 bg-white relative overflow-hidden" id="services">
    {/* Grid Backdrop */}
    <div className="absolute inset-0 grid-hairline opacity-10 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-10">
        <div className="max-w-2xl text-left">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary mb-6"
          >
            {t.services.title} <br />
            <span className="text-primary italic font-normal">{t.services.title_accent}</span>
          </motion.h2>
          <p className="text-xl text-slate-500 font-medium max-w-xl">{t.services.subtitle}</p>
        </div>
        <div className="h-0.5 flex-grow bg-slate-50 hidden lg:block mb-10 mx-16" />
        <div className="text-slate-300 font-bold uppercase tracking-[0.2em] text-[0.6rem] mb-10">{t.services.scroll}</div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 auto-rows-[22rem] lg:auto-rows-[26rem]">
        {/* Large Feature 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.005, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
          viewport={{ once: true }}
          className="md:col-span-8 lg:col-span-12 xl:col-span-8 group relative bg-slate-50 p-12 lg:p-20 rounded-[4rem] transition-all hover:bg-white hover:shadow-2xl hover:shadow-primary/5 overflow-hidden border border-transparent hover:border-slate-100"
        >
          <div className="relative z-10 h-full flex flex-col justify-end">
            <div className="w-24 h-24 bg-primary text-white rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl transition-transform group-hover:-rotate-12 duration-500">
              <Cake className="w-12 h-12" />
            </div>
            <h3 className="text-primary mb-6 leading-none">{t.services.items[0].title}</h3>
            <p className="text-lg text-slate-600 max-w-2xl font-medium leading-relaxed mb-10">
              {t.services.items[0].desc}
            </p>
            <a href="#contact" className="inline-flex items-center gap-4 text-accent-red font-bold text-sm tracking-tight transition-all hover:translate-x-1">
              {t.hero.cta1} <ArrowRight className="w-6 h-6" />
            </a>
          </div>
          <Cake className="absolute -top-16 -right-16 w-80 h-80 text-primary/[0.02] rotate-12 transition-transform duration-1000 group-hover:scale-110" />
        </motion.div>

        {/* Small Feature 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.005, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-4 lg:col-span-6 xl:col-span-4 group relative bg-primary p-12 rounded-[4rem] transition-all hover:bg-slate-900 overflow-hidden shadow-2xl shadow-primary/20"
        >
          <div className="relative z-10 flex flex-col h-full justify-between">
            <ClipboardCheck className="w-14 h-14 text-accent-red" />
            <div>
              <h3 className="text-white mb-6 text-xl">{t.services.items[1].title}</h3>
              <p className="text-slate-200 font-medium text-base leading-relaxed mb-10 opacity-80">
                {t.services.items[1].desc}
              </p>
              <ArrowRight className="text-white w-8 h-8 group-hover:translate-x-3 transition-transform duration-500" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />
        </motion.div>

        {/* Small Feature 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.005, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-4 lg:col-span-6 xl:col-span-4 group relative bg-accent-red p-12 rounded-[4rem] transition-all hover:bg-accent-red-hover overflow-hidden shadow-2xl shadow-red-500/20"
        >
          <div className="relative z-10 flex flex-col h-full justify-between text-white">
            <Pill className="w-14 h-14 text-white" />
            <div>
              <h3 className="text-white mb-6 text-xl">{t.services.items[2].title}</h3>
              <p className="text-white/80 font-medium text-base leading-relaxed mb-10">
                {t.services.items[2].desc}
              </p>
              <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-500" />
            </div>
          </div>
        </motion.div>

        {/* Medium Feature - Trust Quote */}
        <div className="md:col-span-8 lg:col-span-12 xl:col-span-8 bg-slate-50 p-12 lg:p-20 rounded-[4rem] flex items-center">
          <p className="text-xl lg:text-3xl font-display font-bold text-slate-500 italic leading-[1.2] tracking-tight">
            {t.services.quote}
          </p>
        </div>
      </div>
    </div>
  </section>
));

const About = React.memo(({ t }: { t: any }) => {
  const carouselImages = useMemo(() => [
    "/carousel-1.png",
    "/carousel-2.png",
    "/carousel-3.png"
  ], []);

  return (
    <section className="py-20 lg:py-48 bg-champagne relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:flex-1 relative"
          >
            <div className="relative z-10 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl bg-white p-2 md:p-4">
              <ImageCarousel
                images={carouselImages}
                alt={t.about.img_alt}
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-red/5 rounded-full blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="inline-block px-5 py-2 rounded-full bg-primary text-white text-[0.65rem] font-bold tracking-widest uppercase mb-10">
              {t.about.badge}
            </div>
            <h2 className="text-primary mb-10 leading-tight">
              {t.about.title} <br />
              <span className="text-primary italic font-normal">{t.about.title_accent}</span>
            </h2>
            <div className="space-y-8">
              <p className="text-xl font-display font-medium text-slate-600 italic leading-relaxed border-l-4 border-accent-red pl-8 mb-10">
                {t.about.quote}
              </p>
              <p className="text-lg text-slate-700 font-medium leading-relaxed">
                {t.about.p1}
              </p>
              <p className="text-lg text-slate-700 font-medium leading-relaxed">
                {t.about.p2}
              </p>
            </div>

            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden border-4 border-white shadow-xl">
                  <LazyImage
                    src="https://static.wixstatic.com/media/c5947c_34978e684911475fa14af409bad19ee4~mv2.jpg"
                    alt={t.about.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-2xl font-bold text-primary tracking-tight">{t.about.name}</h4>
                  <div className="flex items-center gap-4">
                    <p className="text-slate-400 font-semibold uppercase tracking-widest text-[0.65rem] mt-1">{t.about.role}</p>
                    <Signature />
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <img
                      src="https://static.wixstatic.com/media/c5947c_8e2df9a792dc43838f96239c6ac471ee~mv2.png"
                      alt="UnitedHealthcare Gold Premier Producer since 2020"
                      className="h-14 w-auto"
                    />
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-amber-700">Gold Premier Producer<br/>since 2020</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

const INSURANCE_CARRIERS = [
  {
    id: 'humana', name: 'Humana', color: '#007D69',
    logo: '/logos/humana.svg',
  },
  {
    id: 'devoted', name: 'Devoted Health', color: '#E63946',
    logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQFDL4E2zOPw9w/company-logo_200_200/company-logo_200_200/0/1631318524176?e=2147483647&v=beta&t=hfCxgxqVzl4eH3W-hmIXk4w1DYjpI9WZg-tiU0a4xuY',
  },
  {
    id: 'bcbs', name: 'BlueCross BlueShield', color: '#003087',
    logo: '/logos/bcbs.svg',
  },
  {
    id: 'memorial', name: 'Memorial Hermann', color: '#6B21A8',
    logo: '/logos/memorial.png',
  },
  {
    id: 'ncl', name: 'NCL Health', color: '#7C3AED',
    logo: '/logos/ncl.svg',
  },
  {
    id: 'scan', name: 'SCAN Health Plan', color: '#065F46',
    logo: 'https://scan-q-002.sitecorecontenthub.cloud/api/public/content/scan_logo.png?v=545ec4d8',
  },
  {
    id: 'molina', name: 'Molina Healthcare', color: '#15803D',
    logo: '/logos/molina.svg',
  },
  {
    id: 'wellpoint', name: 'Wellpoint', color: '#1D4ED8',
    logo: '/logos/wellpoint.svg',
  },
  {
    id: 'aetna', name: 'Aetna', color: '#7E1D3F',
    logo: '/logos/aetna.svg',
  },
  {
    id: 'cigna', name: 'Cigna', color: '#1E3A5F',
    logo: '/logos/cigna.svg',
  },
  {
    id: 'verda', name: 'Verda Healthcare', color: '#4D7C0F',
    logo: 'https://verdahealthcare.com/wp-content/uploads/2025/05/Verda-Healthcare-Full-Color-H.svg',
  },
  {
    id: 'community', name: 'Community Health', color: '#92400E',
    logo: 'https://www.communityhealthchoice.org/wp-content/uploads/2020/07/CHC_Logo_150x59_Header-1.png',
  },
  {
    id: 'kelsey', name: 'Kelsey-Seybold', color: '#0F172A',
    logo: '/logos/kelsey.svg',
  },
  {
    id: 'wellcare', name: 'WellCare', color: '#0369A1',
    logo: '/logos/wellcare.svg',
  },
  {
    id: 'united', name: 'UnitedHealthcare', color: '#0077C8',
    logo: '/logos/united.svg',
  },
];

const InsurancePartners = React.memo(({ t, selected, onToggle }: {
  t: any;
  selected: Set<string>;
  onToggle: (id: string) => void;
}) => (
  <section className="py-28 lg:py-40 bg-slate-50 relative overflow-hidden" id="insurances">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    <div className="absolute inset-0 grid-hairline opacity-5 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent-red/5 text-accent-red text-[0.65rem] font-bold tracking-widest uppercase mb-6"
        >
          <ShieldPlus className="w-3.5 h-3.5" />
          {t.insurances.badge}
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary mb-6 leading-tight"
        >
          {t.insurances.title}{' '}
          <span className="italic font-normal text-slate-600">{t.insurances.title_accent}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-3"
        >
          {t.insurances.subtitle}
        </motion.p>
        <p className="text-sm text-slate-400 font-medium">
          {t.insurances.toggle_hint}
        </p>
      </div>

      {/* Carrier grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {INSURANCE_CARRIERS.map((carrier, i) => {
          const isOn = selected.has(carrier.id);
          return (
            <motion.button
              key={carrier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onToggle(carrier.id)}
              aria-pressed={isOn}
              type="button"
              className={`relative group flex flex-col items-center justify-center gap-3 p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer text-center ${
                isOn
                  ? 'border-transparent shadow-xl'
                  : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-md shadow-sm'
              }`}
              style={isOn ? { backgroundColor: carrier.color, borderColor: carrier.color } : {}}
            >
              {/* Animated checkmark */}
              <AnimatePresence>
                {isOn && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-2.5 right-2.5 w-5 h-5 bg-white/30 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Logo or initial fallback */}
              <div className={`w-14 h-10 flex items-center justify-center transition-all ${
                isOn ? 'opacity-90' : 'opacity-100'
              }`}>
                {carrier.logo ? (
                  <img
                    src={carrier.logo}
                    alt={carrier.name}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className={`max-w-full max-h-full object-contain transition-all ${
                      isOn ? 'brightness-0 invert' : ''
                    }`}
                    onError={(e) => {
                      // Fallback to colored initial on image error
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span style="color:${isOn ? '#fff' : carrier.color};font-size:1.25rem;font-weight:900;">${carrier.name.charAt(0)}</span>`;
                      }
                    }}
                  />
                ) : (
                  <span
                    className="text-xl font-black"
                    style={{ color: isOn ? '#fff' : carrier.color }}
                  >
                    {carrier.name.charAt(0)}
                  </span>
                )}
              </div>

              <span className={`text-[0.7rem] font-bold leading-tight transition-colors ${
                isOn ? 'text-white' : 'text-slate-600 group-hover:text-primary'
              }`}>
                {carrier.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* CTA to scroll to form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex justify-center mt-14"
      >
        <a
          href="#contact"
          className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold text-sm tracking-tight shadow-xl shadow-primary/20 hover:bg-accent-red transition-all active:scale-95"
        >
          {t.insurances.cta}
          <ArrowRight className="w-5 h-5" />
        </a>
      </motion.div>
    </div>
  </section>
));

const Contact = React.memo(({ t, selectedInsurances }: { t: any; selectedInsurances: Set<string> }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectedCarriers = INSURANCE_CARRIERS.filter(c => selectedInsurances.has(c.id));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem('fullName') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      zip: (form.elements.namedItem('zip') as HTMLInputElement).value,
      insurances: selectedCarriers.map(c => c.name),
    };

    try {
      await fetch('https://hook.us2.make.com/n93g79chougeo6hr2w8eqpzgg45brgli', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-28 lg:py-48 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[5rem] overflow-hidden bg-primary shadow-2xl shadow-primary/30">
          <div className="absolute inset-0 grid-hairline opacity-10 pointer-events-none" />

          <div className="relative z-10 p-12 lg:p-24 text-center lg:text-left flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 tracking-tighter leading-[0.95]">{t.contact.title}</h2>
              <p className="text-slate-100 text-lg lg:text-2xl font-medium mb-0 opacity-80 leading-relaxed border-l-4 border-accent-red pl-10 max-w-xl mx-auto lg:mx-0">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="flex-1 w-full bg-white p-12 lg:p-16 rounded-[4rem] shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <div>
                      <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-3 ml-2">{t.contact.labels.name}</label>
                      <input
                        name="fullName"
                        type="text"
                        required
                        className="w-full bg-slate-50 border-0 border-b-2 border-slate-100 p-5 rounded-2xl focus:border-accent-red focus:ring-0 transition-all font-medium text-lg placeholder:text-slate-300"
                        placeholder={t.contact.placeholders.name}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-800 ml-2" htmlFor="phone">
                          {t.contact.labels.phone}
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          pattern="[\d\s\(\)\-\+]{7,20}"
                          placeholder={t.contact.placeholders.phone}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-6 text-primary font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-accent-red/20 transition-all text-lg"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-800 ml-2" htmlFor="zip-code">
                          {t.contact.labels.zip}
                        </label>
                        <input
                          id="zip-code"
                          name="zip"
                          type="text"
                          required
                          minLength={5}
                          maxLength={10}
                          placeholder={t.contact.placeholders.zip}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-6 text-primary font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-accent-red/20 transition-all text-lg"
                        />
                      </div>
                    </div>

                    {/* Insurance pills summary inside the form */}
                    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
                      <p className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400 mb-3">
                        {t.contact.insurances_label}
                      </p>
                      {selectedCarriers.length === 0 ? (
                        <p className="text-slate-300 text-sm font-medium">{t.contact.insurances_none}</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {selectedCarriers.map(c => (
                            <span
                              key={c.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-bold"
                              style={{ backgroundColor: c.color }}
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {c.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm font-medium text-center">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-accent-red text-white py-6 rounded-2xl font-bold text-xl tracking-tight shadow-xl shadow-red-500/20 hover:bg-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span>{isLoading ? (t.contact.button === 'Solicitar Llamada' ? 'Enviando...' : 'Sending...') : t.contact.button}</span>
                      {!isLoading && <Send className="w-6 h-6" />}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="form-success"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="text-center py-10 relative overflow-hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.2 }}
                      className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/20 relative z-10"
                    >
                      <CheckCircle2 className="w-12 h-12" />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-green-500 rounded-full -z-10"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tighter">{t.contact.success_title}</h3>
                      <p className="text-lg text-slate-600 font-medium mb-8">
                        {t.contact.success_msg}
                      </p>

                      {/* Show submitted insurances in success screen */}
                      {selectedCarriers.length > 0 && (
                        <div className="mb-8 text-left rounded-2xl bg-slate-50 border border-slate-100 p-5">
                          <p className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400 mb-3">
                            {t.contact.insurances_label}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedCarriers.map(c => (
                              <span
                                key={c.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-bold"
                                style={{ backgroundColor: c.color }}
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                {c.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-accent-red font-bold tracking-widest text-sm hover:text-primary transition-colors border-b-2 border-accent-red pb-1"
                      >
                        {t.contact.success_button}
                      </button>
                    </motion.div>

                    {/* Background celebratory sparkle */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 0, x: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            y: [0, (i % 2 === 0 ? -100 : 100)],
                            x: [0, (i < 3 ? -100 : 100)]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeOut"
                          }}
                          className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent-red rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

const Footer = React.memo(({ t, lang }: { t: any; lang: string }) => (
  <footer className="pt-28 pb-12 bg-slate-50 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
        <div className="lg:col-span-1">
          <a href="#" className="flex items-center gap-3 mb-10 group transition-transform hover:scale-[1.02] active:scale-95">
            <img
              src="https://static.wixstatic.com/media/c5947c_15370a549d404494b4a4100f16cd538a~mv2.png"
              alt="Alely Medrano Logo"
              className="h-10 w-auto"
              width={73}
              height={40}
            />
            <h4 className="text-2xl font-bold tracking-tighter text-primary uppercase leading-tight">
              Alely <br /> <span className="text-accent-red">Medrano</span>
            </h4>
          </a>
          <p className="text-slate-400 font-medium leading-relaxed mb-8 pr-12">
            {t.footer.desc}
          </p>
          <div className="flex gap-4">
            {/* Simple social icon placeholders with ARIA labels */}
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-accent-red transition-colors cursor-pointer" aria-label="Visit our Facebook page">FB</div>
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-accent-red transition-colors cursor-pointer" aria-label="Visit our Instagram page">IG</div>
          </div>
        </div>

        <div>
          <h5 className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-primary mb-10">{t.footer.contact_title}</h5>
          <ul className="space-y-6">
            <li className="flex items-start gap-4 group">
              <Mail className="w-5 h-5 text-accent-red mt-1 group-hover:scale-110 transition-transform" />
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-500 font-medium hover:text-primary transition-colors">{CONTACT_INFO.email}</a>
            </li>
            <li className="flex items-start gap-4 group">
              <Phone className="w-5 h-5 text-accent-red mt-1 group-hover:scale-110 transition-transform" />
              <a href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`} className="text-slate-500 font-medium hover:text-primary transition-colors">{CONTACT_INFO.phone}</a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-[0.65rem] font-bold uppercase tracking-widest text-primary mb-10">{t.footer.nav_title}</h5>
          <ul className="space-y-6">
            <li><a href="#about" className="text-slate-500 font-medium hover:text-accent-red transition-colors text-sm tracking-tight">{t.nav.about}</a></li>
            <li><a href="#services" className="text-slate-500 font-medium hover:text-accent-red transition-colors text-sm tracking-tight">{t.nav.services}</a></li>
            <li><a href="#contact" className="text-slate-500 font-medium hover:text-accent-red transition-colors text-sm tracking-tight">{t.nav.contact}</a></li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-[3rem] shadow-sm">
          <Calendar className="w-10 h-10 text-accent-red mb-6" />
          <h5 className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-primary mb-4 text-center">{lang === 'en' ? 'Availability' : 'Disponibilidad'}</h5>
          <p className="text-slate-500 font-bold mb-2 text-center">{CONTACT_INFO.hours}</p>
          <p className="text-xs text-slate-400 leading-relaxed text-center">
            {lang === 'en' ? 'Response guaranteed within 24 business hours.' : 'Respuesta garantizada en 24 horas laborales.'}
          </p>
        </div>
      </div>

      <div className="pt-12 border-t border-slate-200">
        <div className="max-w-4xl opacity-50 mb-10">
          <p className="text-[0.6rem] text-slate-400 font-medium leading-relaxed uppercase tracking-widest">
            {t.footer.cms_disclaimer}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[0.7rem] text-slate-400 font-medium uppercase tracking-[0.1em]">
            {t.footer.copyright}
          </div>
          <div className="text-[0.7rem] text-slate-400 font-bold uppercase tracking-[0.1em] px-4 py-2 border border-slate-200 rounded-lg">
            {t.footer.endorsement}
          </div>
        </div>
      </div>
    </div>
  </footer>
));

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'es'>('es'); // Default to Spanish (LATAM)
  const [showLangModal, setShowLangModal] = useState(true);
  const [selectedInsurances, setSelectedInsurances] = useState<Set<string>>(new Set());
  const t = DICTIONARY[lang];

  const handleInsuranceToggle = useCallback((id: string) => {
    setSelectedInsurances(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleLanguageToggle = useCallback(() => {
    setLang(prev => (prev === 'en' ? 'es' : 'en'));
  }, []);

  const handleLanguageSelect = (selectedLang: 'en' | 'es') => {
    setLang(selectedLang);
    setShowLangModal(false);
  };



  useEffect(() => {
    if (isMenuOpen || showLangModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen, showLangModal]);

  return (
    <div className="relative flex min-h-screen flex-col bg-background-light text-slate-900 antialiased selection:bg-accent-red selection:text-white">
      <JSONLD t={t} />
      <AnimatePresence>
        {showLangModal && <LanguageModal onSelect={handleLanguageSelect} />}
      </AnimatePresence>
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        t={t}
        onLanguageToggle={handleLanguageToggle}
        lang={lang}
      />
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        t={t}
        onLanguageToggle={handleLanguageToggle}
        lang={lang}
      />
      <main className="flex-grow">
        <Hero t={t} />
        <Services t={t} />
        <About t={t} />
        <InsurancePartners t={t} selected={selectedInsurances} onToggle={handleInsuranceToggle} />
        <Contact t={t} selectedInsurances={selectedInsurances} />
        <FAQSection t={t} />
      </main>
      <Footer t={t} lang={lang} />
      <FloatingCTA t={t} />
    </div>
  );
}
