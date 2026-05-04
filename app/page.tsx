import Link from 'next/link';
import Image from 'next/image';

const HOW_STEPS = [
  {
    step: '1',
    title: 'Completas el formulario (30–45 min)',
    description:
      'Respondes preguntas clave sobre tu marca: identidad, audiencia, voz, pilares de contenido y objetivos. Cuanto más detallado seas, mejor será tu estrategia.',
  },
  {
    step: '2',
    title: 'Analizamos tu marca',
    description:
      'Con la información que nos das, estudiamos a fondo tu marca, tu competencia y tu audiencia para construir una estrategia sólida y diferenciada.',
  },
  {
    step: '3',
    title: 'Diseñamos tu estrategia',
    description:
      'Construimos tu calendario de contenido, los pilares de tu marca y el plan de marketing adaptado exactamente a tus objetivos y recursos.',
  },
  {
    step: '4',
    title: 'Te entregamos todo listo',
    description:
      'Recibes tu estrategia completa con una sesión de implementación para arrancar desde el primer día, sin suposiciones ni improvisaciones.',
  },
];

const DELIVERABLES = [
  { title: 'Estrategia de Marca Completa', desc: 'Posicionamiento, voz, pilares y diferenciadores claros' },
  { title: 'Calendario de Contenido', desc: 'Plan editorial por plataforma y frecuencia' },
  { title: 'Estrategia de Marketing', desc: 'Canales, audiencia y objetivos alineados' },
  { title: 'Brief de Marca', desc: 'Documento maestro con el ADN completo de tu marca' },
  { title: 'Sesión de Implementación', desc: 'Acompañamiento 1-on-1 para arrancar sin fricción' },
  { title: 'Soporte Post-Entrega', desc: '15 días de ajustes incluidos' },
];

const CHECKLIST = [
  'El nombre de tu marca y en qué mercado compites',
  'Qué te diferencia realmente de tu competencia',
  'Quién es tu cliente ideal: edad, situación, problemas reales',
  'Qué producto o servicio es tu oferta principal y cuánto cuesta',
  'Cómo hablas naturalmente de tu marca (frases que usas siempre)',
  'Los temas sobre los que quieres crear contenido',
  'Tu objetivo principal: visibilidad, conseguir clientes o vender',
];

const CASES = [
  {
    name: 'Diana Mile',
    role: 'Fitness Coach + Creadora de Contenido',
    description:
      'Estrategia de contenido y calendario editorial para posicionarse como referente en fitness en Español e Inglés, con pilares claros por plataforma.',
  },
  {
    name: 'Infiny Latam',
    role: 'Agencia de Marketing Digital',
    description:
      'Estrategia B2B con calendario de contenido enfocado en cases de éxito, resultados de clientes y contenido educativo para marcas de ecommerce.',
  },
  {
    name: 'Kreoon',
    role: 'Plataforma de Producción de Contenido',
    description:
      'Plan de marketing de contenido para lanzamiento, con estrategia SEO, contenido educativo en YouTube y posicionamiento de marca en LinkedIn.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center">
          <Image
            src="/AC_Mesa de trabajo 1.png"
            alt="Alexander Cast"
            width={500}
            height={500}
            style={{ width: '120px', height: 'auto' }}
            priority
          />
        </div>
        <Link
          href="/form"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 font-semibold rounded-lg text-sm transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #F2CB51, #D4A017)', color: '#0A0A0B' }}
        >
          Comenzar →
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative px-6 pt-16 pb-24 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold-500/8 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-40 left-1/3 w-[300px] h-[300px] bg-gold-600/5 blur-2xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-300 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            Brand Architect System — by Alexander Cast
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            La estrategia que tu marca
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #F2CB51, #D4A017, #B8860B)' }}
            >
              necesita para crecer
            </span>
          </h1>

          <p className="text-xl text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Construimos la estrategia de marketing y el calendario de contenido de tu marca desde cero,
            basados en quién eres, a quién le hablas y qué quieres lograr.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-2">
            <Link
              href="/form"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl text-lg transition-all shadow-lg hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #F2CB51, #D4A017)',
                color: '#0A0A0B',
                boxShadow: '0 8px 32px rgba(212, 160, 23, 0.25)',
              }}
            >
              Quiero mi estrategia
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-sm text-stone-500">
              30–45 min de formulario · Estrategia entregada en 4–5 días hábiles
            </p>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="px-6 py-20 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Cómo funciona</h2>
            <p className="text-stone-400 text-lg">Un proceso simple. Un resultado concreto.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HOW_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl"
                style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black mb-4 text-black"
                  style={{
                    background: 'linear-gradient(135deg, #F2CB51, #D4A017)',
                    boxShadow: '0 4px 16px rgba(212,160,23,0.2)',
                  }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ RECIBES */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Qué recibes</h2>
            <p className="text-stone-400 text-lg">
              Todo lo que necesitas para que tu marca tenga dirección clara y contenido consistente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DELIVERABLES.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.4)' }}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#D4A017' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS */}
      <section className="px-6 py-20 bg-[#0D0D0F]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Marcas que ya tienen su estrategia</h2>
            <p className="text-stone-400 text-lg">El mismo proceso, aplicado a industrias distintas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASES.map((item) => (
              <div
                key={item.name}
                className="p-6 rounded-2xl"
                style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <h3 className="font-bold text-white mb-1">{item.name}</h3>
                <p className="text-xs font-medium mb-4" style={{ color: '#D4A017' }}>{item.role}</p>
                <p className="text-sm text-stone-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Qué necesitas tener claro</h2>
            <p className="text-stone-400 text-lg">
              Antes de empezar, asegúrate de tener esta información a la mano.
            </p>
          </div>

          <div className="rounded-2xl p-8 space-y-4" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}>
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.4)' }}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: '#D4A017' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-stone-300 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 py-24 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(212,160,23,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">
            Tu marca con estrategia clara
            <br />
            <span style={{ backgroundImage: 'linear-gradient(135deg, #F2CB51, #D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              empieza hoy
            </span>
          </h2>
          <p className="text-stone-400 text-lg">
            30–45 minutos de tu tiempo hoy. Una estrategia que da dirección a tu marca todos los días.
          </p>
          <Link
            href="/form"
            className="inline-flex items-center gap-2 px-10 py-4 font-bold rounded-xl text-lg transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #F2CB51, #D4A017)',
              color: '#0A0A0B',
              boxShadow: '0 8px 40px rgba(212,160,23,0.3)',
            }}
          >
            Quiero mi estrategia
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Alexander Cast" width={28} height={28} />
          <div className="text-xs tracking-[0.15em] uppercase text-stone-500">
            <span className="font-light">Alexander</span> <span className="font-bold">Cast</span>
            <span className="italic ml-2 text-gold-600/60">Digital Business</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs text-stone-600">
          <a href="mailto:founder@kreoon.com" className="hover:text-stone-400 transition-colors">
            founder@kreoon.com
          </a>
          <span>Brand Architect System · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
