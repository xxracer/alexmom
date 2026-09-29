/**
 * Region pages: one hand-written landing page per Texas metro region.
 * Covering all city keywords this way (instead of 40 templated city pages)
 * avoids Google's thin/doorway-page penalty — each page here has unique,
 * human content. See keyword-research/README.md for the cluster mapping.
 */

export type Lang = 'en' | 'es';

export interface RegionCopy {
  title: string;
  description: string;
  h1: string;
  area: string;
  welcome: string;
  intro: string[];
  faq: { q: string; a: string }[];
}

export interface Region {
  id: string;
  slug: string;
  cities: string[];
  i18n: Record<Lang, RegionCopy>;
}

export const REGIONS: Region[] = [
  {
    id: 'houston',
    slug: 'houston',
    cities: ['Houston', 'Pasadena', 'Katy', 'Spring', 'Cypress', 'The Woodlands', 'Sugar Land', 'Pearland'],
    i18n: {
      en: {
        title: 'Medicare Broker in Houston, TX | Alely Medrano',
        description:
          'Free one-on-one Medicare guidance across the Houston area, in English and Spanish. Licensed broker Alely Medrano compares Advantage, Part D and Medigap for 2026/2027.',
        h1: 'Medicare help in the Houston area, explained one-on-one',
        area: 'the Houston area',
        welcome: 'From the Heights to Pearland',
        intro: [
          'Houston is home. Since 2015 I have been advising Medicare families across the metro — Katy, Cypress, Spring, Sugar Land, Pasadena, Pearland, The Woodlands — and the first thing I tell everyone is the same: breathe. Those plan letters that keep piling up? We open them together, one page at a time.',
          'Because I am an independent broker, I work for you — not for the insurance companies. I compare the Advantage, Part D and Medigap options actually available for your ZIP code, match them against the doctors you already see, and tell you honestly when a plan is not right for you.',
        ],
        faq: [
          {
            q: 'Do you serve clients in both English and Spanish in Houston?',
            a: 'Yes. I advise Houston families in English and Spanish — whatever wording you can trust to fully understand your health coverage is the right language for your appointment.',
          },
          {
            q: 'How do you know which Houston plans actually cover my doctors?',
            a: 'Every comparison starts with your ZIP code and your list of doctors and prescriptions. A plan is only "a good value" if its network and drug formulary work for you — so we check those first, before any premium is even mentioned.',
          },
          {
            q: 'Is the consultation really free for Houston residents?',
            a: 'Yes. My compensation comes from the insurance carriers, never from you. You get the same one-on-one session whether we end up changing your plan or keeping exactly what you have.',
          },
        ],
      },
      es: {
        title: 'Asesora de Medicare en Houston, TX | Alely Medrano',
        description:
          'Asesoría gratuita de Medicare en todo el área de Houston, en español e inglés. Alely Medrano, asesora licenciada, compara Advantage, Parte D y Medigap para 2026/2027.',
        h1: 'Asesoría de Medicare en Houston, explicada uno a uno',
        area: 'el área de Houston',
        welcome: 'De Katy a Pasadena, de Cypress a Pearland',
        intro: [
          'Houston es mi casa. Desde 2015 acompaño a familias de todo el área metropolitana para que Medicare deje de ser un quebradero de cabeza. Esas cartas del plan que siguen llegando a tu buzón y quedan sin abrir — las leemos juntas, página por página, en tu idioma.',
          'Como soy independiente, trabajo para ti, no para las aseguradoras. Comparamos los planes de Advantage, Parte D y Medigap que sí están disponibles con tu código postal, revisamos que tus doctores sigan en la red, y te digo con franqueza cuando un plan no te conviene.',
        ],
        faq: [
          {
            q: '¿Atiende también en español a las familias de Houston?',
            a: 'Sí. Doy asesoría en español e inglés — el idioma que te dé más tranquilidad de entender tus coberturas es el idioma de tu cita.',
          },
          {
            q: '¿Cómo saben que el plan cubre a mis doctores en Houston?',
            a: 'Toda comparación empieza por tu código postal y tu lista de doctores. Un plan solo "vale la pena" si su red y su lista de medicamentos funcionan para ti — eso lo revisamos primero.',
          },
          {
            q: '¿La consulta es realmente gratis en Houston?',
            a: 'Sí. Me pagan las aseguradoras, nunca tú. Recibes la misma asesoría personalizada ya sea que decidamos cambiar tu plan o mantenerlo tal cual está.',
          },
        ],
      },
    },
  },
  {
    id: 'dallas-fort-worth',
    slug: 'dallas-fort-worth',
    cities: ['Dallas', 'Fort Worth', 'Arlington', 'Plano', 'Irving', 'Garland', 'Frisco', 'McKinney', 'Grand Prairie', 'Denton'],
    i18n: {
      en: {
        title: 'Medicare Broker in Dallas–Fort Worth | Alely Medrano',
        description:
          'Free one-on-one Medicare guidance across Dallas–Fort Worth, in English and Spanish. Licensed broker Alely Medrano compares Advantage, Part D and Medigap for 2026/2027.',
        h1: 'Medicare help across Dallas–Fort Worth, explained one-on-one',
        area: 'the Dallas–Fort Worth Metroplex',
        welcome: 'From Plano to Arlington',
        intro: [
          'The Metroplex is one of the most mobile Medicare markets in Texas. Families move from Dallas to Frisco, from Arlington to McKinney — and every move, big or small, can change which plans cover you well. I help you understand what your new address opens (and what it does not), before you make a change you might regret.',
          'My promise is the same as it has been since 2015: independent advice in plain language. Whether you are retiring in Plano, helping a parent in Grand Prairie, or comparing Medigap plans from Denton, the session belongs to you — not to any carrier.',
        ],
        faq: [
          {
            q: 'I just moved to the Dallas area. Does Medicare follow me?',
            a: 'Medicare itself follows you anywhere in the U.S., but Advantage and Part D plans are ZIP-code based — a move is a Special Enrollment Period that lets you change plans. Bring your new address to the conversation and we will check what is available now.',
          },
          {
            q: 'How do you choose between Advantage and a supplement in the Metroplex?',
            a: 'By your priorities, not by a brochure. If seeing any specialist without referrals matters to you, we weigh Medigap. If low monthly premiums and extra benefits matter more, we compare Advantage networks for your ZIP code. We walk both paths out loud.',
          },
          {
            q: 'Can my parents in Garland and I, in Irving, share the same appointment?',
            a: 'Absolutely — families compare plans together all the time. One call, everyone gets their questions answered in the language they prefer, and each person leaves with the plan that fits them.',
          },
        ],
      },
      es: {
        title: 'Asesora de Medicare en Dallas–Fort Worth | Alely Medrano',
        description:
          'Asesoría gratuita de Medicare en Dallas–Fort Worth, en español e inglés. Alely Medrano, asesora licenciada, compara Advantage, Parte D y Medigap para 2026/2027.',
        h1: 'Asesoría de Medicare en Dallas–Fort Worth, explicada uno a uno',
        area: 'Dallas–Fort Worth',
        welcome: 'De Plano a Arlington, de Frisco a Irving',
        intro: [
          'En el Metroplex la gente se muda muchísimo dentro de Texas. Familias que se van de Garland a Frisco, de Arlington a McKinney — y cada mudanza puede cambiar qué planes te cubren bien. Te explico qué abre (y qué no) esa nueva dirección antes de tomar un cambio que puedas arrepentirte.',
          'Mi promesa es la misma desde 2015: asesoría independiente, en palabras claras. Ya sea que te retires en Dallas, ayudes a una mamá en Grand Prairie o compares suplementos desde Denton, la sesión es tuya — no de ninguna aseguradora.',
        ],
        faq: [
          {
            q: 'Me acabo de mover al área de Dallas, ¿Medicare me sigue?',
            a: 'Medicare te sigue a cualquier parte del país, pero los planes de Advantage y Parte D dependen de tu código postal. Una mudanza es un Periodo Especial de Inscripción que te permite cambiar de plan — traeme tu dirección nueva y revisamos qué tienes disponible.',
          },
          {
            q: '¿Cómo decido entre Advantage y un suplemento?',
            a: 'Por tus prioridades, no por un folleto. Si quieres ver cualquier especialista sin referencias, pesamos el Medigap. Si prefieres primas mensuales bajas y beneficios extra, comparamos redes de Advantage en tu zona. Lo conversamos los dos caminos antes de decidir.',
          },
          {
            q: '¿Mis papás (en Garland) y yo (en Irving) podemos hacer la cita juntos?',
            a: 'Claro que sí — las familias comparan planes juntas todo el tiempo. Una misma llamada, todos salen con sus preguntas resueltas, cada quien en su idioma.',
          },
        ],
      },
    },
  },
  {
    id: 'central-texas',
    slug: 'central-texas',
    cities: ['Austin', 'Round Rock', 'Waco', 'Temple', 'Killeen', 'College Station'],
    i18n: {
      en: {
        title: 'Medicare Broker in Austin & Central Texas | Alely Medrano',
        description:
          'Free one-on-one Medicare guidance in Austin, Round Rock, Waco, Temple and Central Texas, in English and Spanish. Broker Alely Medrano compares Advantage, Part D and Medigap.',
        h1: 'Medicare help in Austin and Central Texas, explained one-on-one',
        area: 'Austin and Central Texas',
        welcome: 'From Round Rock to College Station',
        intro: [
          'Central Texas keeps growing — and so does the number of neighbors turning 65 in Austin, Round Rock, Temple, Killeen, Waco and College Station every month. If that is you this year, the clock matters: your Initial Enrollment Period opens three months before your birthday month and closes three months after. Miss it, and some doors cost extra for life.',
          'That is the part I make simple. One conversation, in whichever language you prefer, and you will know exactly when your windows are, what your Part B penalty risk really is, and which plan changes are worth taking.',
        ],
        faq: [
          {
            q: 'I turn 65 this year in Round Rock — when do I need to act?',
            a: 'Your Initial Enrollment Period starts 3 months before your birthday month. That conversation is best held early, because if you keep employer coverage or delay Part B, the consequences differ a lot. Call me a few months ahead and we will get your timeline right.',
          },
          {
            q: 'Is Central Texas a different Medicare market from Houston?',
            a: 'Yes — Advantage networks and Part D formularies are quoted county by county. That is why I never give a plan answer until I know your ZIP code. Your Central Texas options are real locally, not a statewide average.',
          },
          {
            q: 'Do you help military families around Fort Cavazos (Killeen)?',
            a: 'Yes. Transitioning from Tricare to Medicare has its own timeline and its own traps. I have walked many Central Texas families through it — bring your questions and we will sort out what keeps you covered.',
          },
        ],
      },
      es: {
        title: 'Asesora de Medicare en Austin y Texas Central | Alely Medrano',
        description:
          'Asesoría gratuita de Medicare en Austin, Round Rock, Waco, Temple y Texas Central, en español e inglés. Alely Medrano compara Advantage, Parte D y Medigap para 2026/2027.',
        h1: 'Asesoría de Medicare en Austin y el centro de Texas, explicada uno a uno',
        area: 'Austin y el centro de Texas',
        welcome: 'De Round Rock a College Station',
        intro: [
          'El centro de Texas crece todos los años, y con él crece el número de vecinos que cumplen 65 en Austin, Round Rock, Temple, Killeen, Waco y College Station. Si te toca este año, el calendario importa: tu periodo inicial de inscripción abre 3 meses antes del mes de tu cumpleaños y cierra 3 meses después.',
          'Eso es justo lo que hago sencillo. Una conversación, en el idioma que prefieras, y salen sabiendo exactamente cuándo son tus ventanas, si corres riesgo de multa por Parte B, y qué cambios en tu plan valen la pena.',
        ],
        faq: [
          {
            q: 'Cumplo 65 este año en Round Rock, ¿cuándo tengo que moverme?',
            a: 'Tu periodo inicial de inscripción arranca 3 meses antes del mes de tu cumpleaños. La conversación conviene tenerla temprano: si sigues trabajando o retrasas la Parte B, las consecuencias cambian mucho. Llámame con tiempo y armamos tu calendario.',
          },
          {
            q: '¿Austin es un mercado de Medicare distinto al de Houston?',
            a: 'Sí — las redes de Advantage y las listas de medicamentos se cotizan condado por condado. Por eso nunca doy una respuesta de plan sin saber tu código postal: tus opciones en el centro de Texas son las tuyas, no un promedio del estado.',
          },
          {
            q: '¿Ayudan a familias militares cerca de Fort Cavazos (Killeen)?',
            a: 'Sí. Pasar de Tricare a Medicare tiene su propio calendario y sus propias trampas. Traigo acompañando a familias de la zona por años — tráeme tus dudas y ordenamos lo que te mantiene cubierto.',
          },
        ],
      },
    },
  },
  {
    id: 'rio-grande-valley',
    slug: 'rio-grande-valley',
    cities: ['McAllen', 'Laredo', 'Brownsville', 'Mission'],
    i18n: {
      en: {
        title: 'Medicare Broker in the Rio Grande Valley | Alely Medrano',
        description:
          'Free one-on-one Medicare guidance in McAllen, Laredo, Brownsville and Mission, TX — in English and Spanish. Licensed broker Alely Medrano compares plans for 2026/2027.',
        h1: 'Medicare help in the Rio Grande Valley, explained one-on-one',
        area: 'the Rio Grande Valley',
        welcome: 'McAllen, Laredo, Brownsville and Mission',
        intro: [
          'In the Valley, a Medicare appointment should never be a vocabulary lesson. My sessions with families in McAllen, Mission, Laredo and Brownsville are mostly held in Spanish — because handing your health to paperwork you do not understand is never the right call.',
          'The Valley also tells us something important about Medicare itself: some of the richest plan benefits in Texas show up exactly where the need is highest. I read the fine print on every plan available in Hidalgo, Webb and Cameron counties and explain, simply, what each one gives you and takes from you.',
        ],
        faq: [
          {
            q: 'Can the whole consultation be in Spanish in the Valley?',
            a: 'Absolutely. From the first call to the day your plan is locked in, the entire session can be en español — and a bilingual family member is always welcome to join the call.',
          },
          {
            q: 'Does having both Medicare and Medicaid (dual eligible) change my options?',
            a: 'It usually makes them better, not worse. Dual eligible plans in the Valley can include extra benefits — but they change year to year, so the plan that fit you last year may not fit in 2027. That review is exactly what I do, free of charge.',
          },
          {
            q: 'I live in Laredo but my kids help me with paperwork from another state. Can you include them?',
            a: 'Of course. With your permission, I can include a family member on a three-way call — many Valley families handle Medicare this way, and it works beautifully.',
          },
        ],
      },
      es: {
        title: 'Asesora de Medicare en el Valle del Río Grande | Alely Medrano',
        description:
          'Asesoría gratuita de Medicare en McAllen, Laredo, Brownsville y Mission — en español. Alely Medrano, asesora licenciada, compara Advantage, Parte D y Medigap para 2026/2027.',
        h1: 'Asesoría de Medicare en el Valle, todo en tu idioma',
        area: 'el Valle del Río Grande',
        welcome: 'McAllen, Mission, Laredo y Brownsville',
        intro: [
          'En el Valle, una cita sobre Medicare no debería ser una clase de inglés. Mis sesiones con familias de McAllen, Mission, Laredo y Brownsville son mayormente en español — porque entregar tu salud a un papeleo que no entiendes, no.',
          'El Valle escribe una lección importante: algunos de los beneficios más abundantes de Texas aparecen justo donde la necesidad es mayor. Yo leo la letra pequeña de cada plan disponible en tus condados — Hidalgo, Cameron, Webb — y te explico, sencillo, qué te da y qué te quita cada uno.',
        ],
        faq: [
          {
            q: '¿Toda la asesoría puede ser en español en el Valle?',
            a: 'Sí — de hecho, es lo más común. Desde la primera llamada hasta que tu plan queda cerrado, todo en español. Y si un familiar bilingüe quiere acompañarte en la llamada, bienvenido.',
          },
          {
            q: 'Tengo Medicare y Medicaid a la vez (dual), ¿eso cambia mis opciones?',
            a: 'Normalmente sí, para bien. Los planes dual en el Valle pueden incluir beneficios extra — pero cambian de un año a otro, y lo que te cuadraba el año pasado puede no cuadrar para 2027. Justo esa revisión es lo que hago, sin costo.',
          },
          {
            q: 'Vivo en Laredo y mis hijos me ayudan desde otro estado, ¿los incluyo?',
            a: 'Claro. Con tu permiso, puedo poner a un familiar en la misma llamada — muchas familias del Valle manejan Medicare así, y funciona de maravilla.',
          },
        ],
      },
    },
  },
  {
    id: 'san-antonio',
    slug: 'san-antonio',
    cities: ['San Antonio', 'Corpus Christi'],
    i18n: {
      en: {
        title: 'Medicare Broker in San Antonio, TX | Alely Medrano',
        description:
          'Free one-on-one Medicare guidance in San Antonio and Corpus Christi, in English and Spanish. Licensed broker Alely Medrano compares Advantage, Part D and Medigap for 2026/2027.',
        h1: 'Medicare help in San Antonio, explained one-on-one',
        area: 'San Antonio',
        welcome: 'San Antonio and Corpus Christi',
        intro: [
          'From Stone Oak to the Southside, San Antonio turns 65 every single day — and every birthday is a deadline that most people learn about too late. I sit with San Antonio families (and our neighbors down in Corpus Christi) and turn the Medicare calendar into dates you can actually hold on to.',
          'Independent advice means I look at every plan available in Bexar and Nueces counties, then tell you the truth: which ones fit your doctors, your medications and your budget — and which ones are simply marketing.',
        ],
        faq: [
          {
            q: 'My plan letters mention changes every fall. Which ones actually matter in San Antonio?',
            a: 'The Annual Enrollment letter (arrives before October 15) and any mid-year notice of plan termination or network change. We read those together — many "changes" are cosmetic, but the few that matter can shuffle your network or your drug costs.',
          },
          {
            q: 'Can you see clients from Corpus Christi?',
            a: 'Yes — sessions work just as well by phone for the Coastal Bend, and Medicare plans there are quoted for your own county, not San Antonio\'s.',
          },
          {
            q: 'Is there a downside to switching plans too often?',
            a: 'Sometimes. Switching Advantage carriers year after year can cost you things you cannot get back — like a Medigap lock-in or a guaranteed period you skipped. Real advice includes telling you when to stay, not just when to move.',
          },
        ],
      },
      es: {
        title: 'Asesora de Medicare en San Antonio, TX | Alely Medrano',
        description:
          'Asesoría gratuita de Medicare en San Antonio y Corpus Christi, en español e inglés. Alely Medrano, asesora licenciada, compara Advantage, Parte D y Medigap para 2026/2027.',
        h1: 'Asesoría de Medicare en San Antonio, explicada uno a uno',
        area: 'San Antonio',
        welcome: 'San Antonio y Corpus Christi',
        intro: [
          'De Stone Oak al lado sur, en San Antonio cumple 65 alguien cada día — y cada cumpleaños es un plazo que la mayoría se entera de tarde. Me siento con las familias de San Antonio (y con nuestros vecinos de Corpus Christi) y transformo el calendario de Medicare en fechas que sí puedes seguir.',
          'Asesoría independiente es revisar cada plan disponible en los condados de Bexar y Nueces y decirte la verdad: cuáles encajan con tus doctores, tus medicamentos y tu bolsillo — y cuáles son solo pura publicidad.',
        ],
        faq: [
          {
            q: 'Cada otoño me llegan cartas con cambios, ¿cuáles importan de verdad en San Antonio?',
            a: 'La carta de la Inscripción Anual (llega antes del 15 de octubre) y cualquier aviso a mitad de año de que tu plan desaparece o cambia de red. Esas las leemos juntas — la mayoría de los "cambios" son de cartón, pero los pocos que cuentan pueden mover tu red o tu costo de medicamentos.',
          },
          {
            q: '¿Atiende a personas de Corpus Christi?',
            a: 'Sí — por teléfono funciona igual de bien, y los planes de allá se cotizan con tus propios condados, no con los de San Antonio.',
          },
          {
            q: '¿Hay alguna desventaja por cambiar de plan muy seguido?',
            a: 'A veces sí. Cambiar de aseguradora cada año puede costarte cosas que no se recuperan — como ventanas de Medigap que se cerraron. Una buena asesoría incluye decirte cuándo conviene quedarte quieto.',
          },
        ],
      },
    },
  },
  {
    id: 'west-texas',
    slug: 'west-texas',
    cities: ['El Paso', 'Lubbock', 'Amarillo', 'Midland', 'Odessa', 'Abilene', 'Wichita Falls'],
    i18n: {
      en: {
        title: 'Medicare Broker in El Paso & West Texas | Alely Medrano',
        description:
          'Free one-on-one Medicare guidance in El Paso, Lubbock, Amarillo, Midland and across West Texas, in English and Spanish. Broker Alely Medrano compares plans for 2026/2027.',
        h1: 'Medicare help in El Paso and West Texas, explained one-on-one',
        area: 'El Paso and West Texas',
        welcome: 'El Paso, Lubbock, Amarillo, Midland and beyond',
        intro: [
          'West Texas teaches you what a plan is really worth. When the nearest in-network specialist is a two-hour drive from Midland, or your pharmacy of choice matters as much as the premium, plan geography is not a detail — it is the decision.',
          'I compare every Advantage and Medigap option that serves El Paso, Lubbock, Amarillo and the Panhandle, with special attention to networks, travel coverage and drug formularies. The goal: you never discover a coverage gap at the worst possible time.',
        ],
        faq: [
          {
            q: 'With so few specialists in my area, which plan keeps the most options open?',
            a: 'That is the single most common question I get from West Texas, and the honest answer depends on your specific doctors. Advantage HMOs trade flexibility for lower premiums; PPOs and Medigap keep more doors open. We map your actual doctors before anything else.',
          },
          {
            q: 'Does Medicare cover me when I travel out of West Texas?',
            a: 'Original Medicare covers you anywhere in the U.S. Advantage HMOs generally do not outside emergencies — but many plans add travel benefits or networks that help. If you travel often, we treat it as a top-priority criterion, not an afterthought.',
          },
          {
            q: '¿La asesoría para El Paso se puede hacer 100% en español?',
            a: 'Cien por ciento — acompaño a familias de El Paso en español e inglés desde hace más de una década. El idioma lo decides tú.',
          },
        ],
      },
      es: {
        title: 'Asesora de Medicare en El Paso y el Oeste de Texas | Alely Medrano',
        description:
          'Asesoría gratuita de Medicare en El Paso, Lubbock, Amarillo, Midland y todo el oeste de Texas, en español. Alely Medrano compara Advantage, Parte D y Medigap para 2026/2027.',
        h1: 'Asesoría de Medicare en El Paso y el oeste de Texas, uno a uno',
        area: 'El Paso y el oeste de Texas',
        welcome: 'El Paso, Lubbock, Amarillo, Midland y más allá',
        intro: [
          'El oeste de Texas te enseña lo que de verdad vale un plan. Cuando el especialista más cercano en tu red queda a dos horas de Midland, y tu farmacia favorita pesa tanto como la prima mensual, la geografía del plan no es un detalle — es la decisión.',
          'Comparamos todos los planes de Advantage y Medigap que atienden a El Paso, Lubbock, Amarillo y la región, con ojo especial en las redes, la cobertura al viajar y tus medicamentos. La meta: que nunca descubras un hueco de cobertura en el peor momento.',
        ],
        faq: [
          {
            q: 'Hay pocos especialistas en mi zona, ¿qué plan me deja más puertas abiertas?',
            a: 'Es la pregunta que más recibo del oeste de Texas, y la respuesta honesta depende de tus doctores concretos. Los HMO de Advantage sacrifican flexibilidad por primas bajas; los PPO y los suplementos dejan más abierta la puerta. Primero mapeamos tus doctores.',
          },
          {
            q: '¿Me cubre Medicare cuando viajo fuera del oeste de Texas?',
            a: 'Medicare original te cubre en todo el país. Los HMO de Advantage, por lo general, no — salvo emergencias —, aunque muchos planes añaden beneficios de viaje. Si viajas seguido, lo tratamos como prioridad número uno.',
          },
          {
            q: '¿La asesoría para El Paso puede ser 100% en español?',
            a: 'Cien por ciento — acompaño a familias de El Paso en español e inglés desde hace más de una década. Y si un familiar quiere entrar en la llamada, bienvenido.',
          },
        ],
      },
    },
  },
  {
    id: 'east-texas',
    slug: 'east-texas',
    cities: ['Tyler', 'Longview', 'Beaumont'],
    i18n: {
      en: {
        title: 'Medicare Broker in East Texas | Alely Medrano',
        description:
          'Free one-on-one Medicare guidance in Tyler, Longview and Beaumont, in English and Spanish. Licensed broker Alely Medrano compares Advantage, Part D and Medigap for 2026/2027.',
        h1: 'Medicare help in East Texas, explained one-on-one',
        area: 'East Texas',
        welcome: 'Tyler, Longview and Beaumont',
        intro: [
          'East Texas keeps things personal — and so do I. Whether you are choosing your first Medicare plan in Tyler at 65, or your Medicare card has lived in your wallet in Longview for twenty years, the review works the same way: your doctors first, your prescriptions second, the premium last.',
          'Plan choices in Smith, Gregg and Jefferson counties are quoted locally, and they shift every year. I do the county-by-county work so that by the end of one phone call you know what changed, what improved and what needs an action.',
        ],
        faq: [
          {
            q: 'Do rural East Texas ZIP codes have different plans than Tyler?',
            a: 'Often yes — a plan can cover Smith County and skip a neighboring one entirely. That is why every session starts with the ZIP code, not the carrier. If you live between Tyler and Longview, we verify what is truly available at your address.',
          },
          {
            q: 'I have had the same Advantage plan in Beaumont for years. Should I still review it?',
            a: 'Yes — even a plan that "never changes" is re-priced and re-networked every January across its whole service area. A free annual review is how you find out the small shifts before they find you.',
          },
          {
            q: 'Can you help me coordinate Medicare with my retirement plan?',
            a: 'That is one of the most valuable things we do together. Whether it is a union plan, COBRA after a layoff, or a retiree coverage decision in Tyler — coordinating the order of enrollment wrong can create a penalty that lasts for life. Let\'s get it right once, correctly.',
          },
        ],
      },
      es: {
        title: 'Asesora de Medicare en el Este de Texas | Alely Medrano',
        description:
          'Asesoría gratuita de Medicare en Tyler, Longview y Beaumont, en español e inglés. Alely Medrano, asesora licenciada, compara Advantage, Parte D y Medigap para 2026/2027.',
        h1: 'Asesoría de Medicare en el este de Texas, explicada uno a uno',
        area: 'el este de Texas',
        welcome: 'Tyler, Longview y Beaumont',
        intro: [
          'En el este de Texas las cosas se tratan con calma — y así trabajo yo. Ya sea que estés eligiendo tu primer plan de Medicare en Tyler a los 65 años, o que llevas la tarjeta en la cartera desde hace veinte años en Longview: primero tus doctores, después tus medicinas, y la prima al final.',
          'Los planes disponibles en los condados de Smith, Gregg y Jefferson se cotizan localmente, y cambian cada enero. Durante una llamada sabrás qué cambió, qué mejoró y qué necesita una decisión tuya.',
        ],
        faq: [
          {
            q: '¿Los planes en zonas rurales del este de Texas son distintos a los de Tyler?',
            a: 'Con frecuencia sí — un plan puede cubrir el condado de Smith y saltarse por completo el vecino. Por eso toda comparación arranca con tu código postal, no con la aseguradora.',
          },
          {
            q: 'Llevo el mismo plan de Advantage en Beaumont hace años, ¿igual debo revisar?',
            a: 'Sí — aunque el plan "nunca cambia", cada enero se re-precia y re-cambia de red en toda su zona. La revisión anual gratuita es cómo te enteras de los cambios antes de que te alcancen.',
          },
          {
            q: '¿Me ayudan a coordinar Medicare con mi retiro o plan de jubilación?',
            a: 'Es de lo más valioso que hacemos. Ya sea un plan sindical, COBRA tras un recorte o cobertura de retiro — inscribirse en el orden equivocado puede crear una multa que dura toda la vida. Hagamos el calendario una sola vez, y bien.',
          },
        ],
      },
    },
  },
];

export function regionBySlug(slug: string): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}