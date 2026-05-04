'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FormSidebar } from '@/components/form/FormSidebar';
import { ProgressBar } from '@/components/form/ProgressBar';
import { TypeSelector } from '@/components/form/TypeSelector';
import { IdentitySection } from '@/components/form/IdentitySection';
import { AudienceSection } from '@/components/form/AudienceSection';
import { ValueSection } from '@/components/form/ValueSection';
import { VoiceSection } from '@/components/form/VoiceSection';
import { PillarsSection } from '@/components/form/PillarsSection';
import { PhilosophySection } from '@/components/form/PhilosophySection';
import { ObjectivesSection } from '@/components/form/ObjectivesSection';
import { ContextSection } from '@/components/form/ContextSection';
import { BrandType } from '@/types/brand';

const TOTAL_STEPS = 8;

const STEP_LABELS = [
  'Tipo de Marca',
  'Identidad',
  'Audiencia',
  'Propuesta de Valor',
  'Voz y Tono',
  'Pilares',
  'Filosofia',
  'Objetivos',
  'Contexto',
];

const STEP_DESCRIPTIONS = [
  'Cuéntanos qué tipo de marca estamos construyendo.',
  'Los datos fundamentales que identifican tu marca en el mercado.',
  'A quién le hablas y qué problema real les resuelves.',
  'Qué ofreces, cuánto vale y por qué vale ese precio.',
  'El ADN comunicacional exacto de tu marca — cómo hablas.',
  'Los temas de contenido que vas a crear y en qué proporción.',
  'Los valores, creencias y propósito profundo de la marca.',
  'Tus metas, plataformas y recursos disponibles.',
  'Información adicional que afina el sistema.',
];

interface FormState {
  tipo: BrandType;
  nombreMarca: string;
  expertiseDiferenciador: string;
  anosExperiencia: number;
  ubicacionGeografica: string;
  idiomas: string[];
  industriaNicho: string;
  perfilDemografico: string;
  problemaPrincipal: string;
  resultadoDeseado: string;
  nivelSofisticacion: number;
  objecionesPrincipales: string[];
  competenciaDirecta: string[];
  ventajaCompetitiva: string;
  queOfrece: string;
  promesaRealista: string;
  precioInversion: string;
  formatoEntrega: string;
  garantia: string;
  noPromete: string;
  estiloComuncacional: string;
  expresionesNaturales: string[];
  prohibiciones: string[];
  nivelFormalidad: number;
  usoHumor: string;
  regionalismos: string;
  temasSensibles: string;
  pilares: Array<{ nombre: string; porcentaje: number }>;
  creenciasFundamentales: string[];
  queRechaza: string[];
  limitesEticos: string[];
  propositoMarca: string;
  historiaOrigen: string;
  historiaBatallas: string;
  historiaLogros: string;
  mensajeCentral: string;
  comoPierciben: string;
  costoNoActuar: string;
  errorPrincipal: string;
  aQuienNoAyudo: string;
  resultadosClientes: string;
  figurasReferencia: { heroInfluencer: string; competidoresDirectos: string[]; creadoresIndustria: string[] };
  objetivoPrincipal: 'awareness' | 'leads' | 'ventas' | 'comunidad';
  kpiCritico: string;
  frecuenciaContenido: string;
  plataformas: string[];
  tiempoPorSemana: number;
  presupuesto: string;
  equipo: string;
  timeline: string;
  productosSecundarios: string[];
  colaboraciones: string[];
  temporadasEventos: string[];
  restricciones: string[];
  integracionesNecesarias: string[];
}

const DEFAULT_STATE: FormState = {
  tipo: 'personal',
  nombreMarca: '',
  expertiseDiferenciador: '',
  anosExperiencia: 1,
  ubicacionGeografica: '',
  idiomas: [],
  industriaNicho: '',
  perfilDemografico: '',
  problemaPrincipal: '',
  resultadoDeseado: '',
  nivelSofisticacion: 2,
  objecionesPrincipales: [],
  competenciaDirecta: [],
  ventajaCompetitiva: '',
  queOfrece: '',
  promesaRealista: '',
  precioInversion: '',
  formatoEntrega: '',
  garantia: '',
  noPromete: '',
  estiloComuncacional: '',
  expresionesNaturales: [],
  prohibiciones: [],
  nivelFormalidad: 5,
  usoHumor: 'Moderado',
  regionalismos: '',
  temasSensibles: '',
  pilares: [],
  creenciasFundamentales: [],
  queRechaza: [],
  limitesEticos: [],
  propositoMarca: '',
  historiaOrigen: '',
  historiaBatallas: '',
  historiaLogros: '',
  mensajeCentral: '',
  comoPierciben: '',
  costoNoActuar: '',
  errorPrincipal: '',
  aQuienNoAyudo: '',
  resultadosClientes: '',
  figurasReferencia: { heroInfluencer: '', competidoresDirectos: [], creadoresIndustria: [] },
  objetivoPrincipal: 'awareness',
  kpiCritico: '',
  frecuenciaContenido: '',
  plataformas: [],
  tiempoPorSemana: 10,
  presupuesto: '',
  equipo: '',
  timeline: '',
  productosSecundarios: [],
  colaboraciones: [],
  temporadasEventos: [],
  restricciones: [],
  integracionesNecesarias: [],
};

function validateStep(step: number, data: FormState): string[] {
  const errors: string[] = [];

  if (step === 0) {
    // TypeSelector — always valid
  } else if (step === 1) {
    if (!data.nombreMarca || data.nombreMarca.length < 2) errors.push('Nombre de marca requerido');
    if (!data.industriaNicho || data.industriaNicho.length < 3) errors.push('Industria/nicho requerido');
    if (!data.expertiseDiferenciador || data.expertiseDiferenciador.length < 10) errors.push('Expertise requerido (mínimo 10 caracteres)');
    if (!data.ubicacionGeografica || data.ubicacionGeografica.length < 3) errors.push('Ubicación requerida');
    if (data.idiomas.length === 0) errors.push('Agrega al menos un idioma');
  } else if (step === 2) {
    if (!data.perfilDemografico || data.perfilDemografico.length < 20) errors.push('Perfil demográfico requerido (mínimo 20 caracteres)');
    if (!data.problemaPrincipal || data.problemaPrincipal.length < 20) errors.push('Problema principal requerido');
    if (!data.resultadoDeseado || data.resultadoDeseado.length < 20) errors.push('Resultado deseado requerido');
    if (data.objecionesPrincipales.length < 3) errors.push('Mínimo 3 objeciones principales');
    if (data.competenciaDirecta.length < 1) errors.push('Agrega al menos un competidor');
    if (!data.ventajaCompetitiva || data.ventajaCompetitiva.length < 20) errors.push('Ventaja competitiva requerida');
    if (!data.costoNoActuar || data.costoNoActuar.length < 20) errors.push('Describe el costo de no actuar (mínimo 20 caracteres)');
    if (!data.errorPrincipal || data.errorPrincipal.length < 20) errors.push('Describe el error principal del cliente (mínimo 20 caracteres)');
    if (!data.aQuienNoAyudo || data.aQuienNoAyudo.length < 10) errors.push('Define a quién no puedes ayudar');
  } else if (step === 3) {
    if (!data.queOfrece || data.queOfrece.length < 20) errors.push('Descripción de oferta requerida');
    if (!data.promesaRealista || data.promesaRealista.length < 20) errors.push('Promesa realista requerida');
    if (!data.precioInversion || data.precioInversion.length < 5) errors.push('Precio/inversión requerido');
    if (!data.formatoEntrega || data.formatoEntrega.length < 10) errors.push('Formato de entrega requerido');
    if (!data.noPromete || data.noPromete.length < 10) errors.push('Indica qué no prometes');
  } else if (step === 4) {
    if (!data.estiloComuncacional || data.estiloComuncacional.length < 10) errors.push('Estilo comunicacional requerido');
    if (data.expresionesNaturales.length < 15) errors.push(`Necesitas ${15 - data.expresionesNaturales.length} expresiones naturales más`);
    if (data.prohibiciones.length < 10) errors.push(`Necesitas ${10 - data.prohibiciones.length} prohibiciones más`);
    if (!data.usoHumor) errors.push('Selecciona el nivel de humor');
  } else if (step === 5) {
    if (!data.mensajeCentral || data.mensajeCentral.length < 20) errors.push('El mensaje central es requerido (mínimo 20 caracteres)');
    if (data.pilares.length < 3) errors.push('Necesitas mínimo 3 pilares');
    const total = data.pilares.reduce((s, p) => s + p.porcentaje, 0);
    if (total !== 100) errors.push(`Los pilares suman ${total}%, deben sumar exactamente 100%`);
  } else if (step === 6) {
    if (!data.propositoMarca || data.propositoMarca.length < 30) errors.push('Propósito de marca requerido (mínimo 30 caracteres)');
    if (data.creenciasFundamentales.length < 3) errors.push('Mínimo 3 creencias fundamentales');
    if (data.queRechaza.length < 2) errors.push('Mínimo 2 elementos que rechaza');
    if (data.limitesEticos.length < 2) errors.push('Mínimo 2 límites éticos');
  } else if (step === 7) {
    if (!data.kpiCritico || data.kpiCritico.length < 5) errors.push('KPI crítico requerido');
    if (!data.frecuenciaContenido || data.frecuenciaContenido.length < 5) errors.push('Frecuencia de contenido requerida');
    if (data.plataformas.length === 0) errors.push('Selecciona al menos una plataforma');
    if (!data.timeline || data.timeline.length < 5) errors.push('Timeline requerido');
  }

  return errors;
}

function AutoSaveIndicator({ lastSaved }: { lastSaved: Date | null }) {
  if (!lastSaved) return null;

  const timeStr = lastSaved.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex items-center gap-1.5 text-xs text-stone-500">
      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
      Guardado a las {timeStr}
    </div>
  );
}

function FormContent() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    try {
      const saved = sessionStorage.getItem('brand-intake-completed');
      if (saved) return JSON.parse(saved) as number[];
    } catch {}
    return [];
  });
  const [formData, setFormData] = useState<FormState>(() => {
    try {
      const saved = sessionStorage.getItem('brand-intake-form');
      if (saved) return { ...DEFAULT_STATE, ...JSON.parse(saved) };
    } catch {}
    return DEFAULT_STATE;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    sessionStorage.setItem('brand-intake-form', JSON.stringify(formData));
    setLastSaved(new Date());
  }, [formData]);

  useEffect(() => {
    sessionStorage.setItem('brand-intake-completed', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const update = useCallback((field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors([]);
  }, []);

  const handleNext = () => {
    const errs = validateStep(step, formData);
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    setCompletedSteps((prev) => prev.includes(step) ? prev : [...prev, step]);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const handlePrev = () => {
    setErrors([]);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      ...formData,
      garantia: formData.garantia || undefined,
      regionalismos: formData.regionalismos || undefined,
      temasSensibles: formData.temasSensibles || undefined,
      historiaOrigen: formData.historiaOrigen || undefined,
      presupuesto: formData.presupuesto || undefined,
      equipo: formData.equipo || undefined,
      recursosDisponibles: {
        tiempoPorSemana: formData.tiempoPorSemana,
        presupuesto: formData.presupuesto || undefined,
        equipo: formData.equipo || undefined,
      },
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('submit_result', JSON.stringify(data));
        router.push('/thank-you');
      } else {
        setSubmitError(data.error || 'Error al enviar. Intenta de nuevo.');
      }
    } catch {
      setSubmitError('Error de conexión. Verifica tu internet e intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastStep = step === TOTAL_STEPS;
  const motivationalMessages: Record<number, string> = {
    5: 'Vas muy bien, ya pasaste la mitad.',
    6: 'Casi terminamos — esta seccion es poderosa.',
    7: 'Solo dos pasos mas.',
    8: 'Ultimo paso — lo lograste.',
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#0A0A0B' }}>
      {/* Sidebar — solo desktop */}
      <div className="hidden md:flex">
        <FormSidebar currentStep={step} completedSteps={completedSteps} />
      </div>

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header mobile con logo + progreso */}
        <div className="md:hidden px-4 pt-4 pb-3" style={{ background: '#0D0D0F', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center mb-3">
            <Image
              src="/AC_Mesa de trabajo 1.png"
              alt="Alexander Cast"
              width={500}
              height={500}
              style={{ width: '110px', height: 'auto' }}
              priority
            />
          </div>
          <ProgressBar current={step} total={TOTAL_STEPS} completedSteps={completedSteps} />
        </div>

        <div className="flex-1 px-4 md:px-10 py-8 max-w-3xl w-full mx-auto">
          {/* Header de la seccion */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold"
                style={{ background: 'rgba(212,160,23,0.15)', color: '#D4A017', border: '1px solid rgba(212,160,23,0.3)' }}
              >
                {step + 1}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#D4A017' }}>
                Paso {step + 1} de {TOTAL_STEPS + 1}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{STEP_LABELS[step]}</h1>
            <p className="mt-1 text-stone-400">{STEP_DESCRIPTIONS[step]}</p>
            {motivationalMessages[step] && (
              <p className="mt-2 text-xs font-medium" style={{ color: '#D4A017' }}>{motivationalMessages[step]}</p>
            )}
          </div>

          {/* Card principal */}
          <div className="rounded-2xl p-6 md:p-8" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)' }}>
            {step === 0 && (
              <TypeSelector
                value={formData.tipo}
                onChange={(v) => update('tipo', v)}
              />
            )}
            {step === 1 && (
              <IdentitySection
                tipo={formData.tipo}
                nombreMarca={formData.nombreMarca}
                expertiseDiferenciador={formData.expertiseDiferenciador}
                anosExperiencia={formData.anosExperiencia}
                ubicacionGeografica={formData.ubicacionGeografica}
                idiomas={formData.idiomas}
                industriaNicho={formData.industriaNicho}
                comoPierciben={formData.comoPierciben}
                onUpdate={update}
              />
            )}
            {step === 2 && (
              <AudienceSection
                perfilDemografico={formData.perfilDemografico}
                problemaPrincipal={formData.problemaPrincipal}
                resultadoDeseado={formData.resultadoDeseado}
                nivelSofisticacion={formData.nivelSofisticacion}
                objecionesPrincipales={formData.objecionesPrincipales}
                competenciaDirecta={formData.competenciaDirecta}
                ventajaCompetitiva={formData.ventajaCompetitiva}
                costoNoActuar={formData.costoNoActuar}
                errorPrincipal={formData.errorPrincipal}
                aQuienNoAyudo={formData.aQuienNoAyudo}
                onUpdate={update}
              />
            )}
            {step === 3 && (
              <ValueSection
                queOfrece={formData.queOfrece}
                promesaRealista={formData.promesaRealista}
                precioInversion={formData.precioInversion}
                formatoEntrega={formData.formatoEntrega}
                garantia={formData.garantia}
                noPromete={formData.noPromete}
                resultadosClientes={formData.resultadosClientes}
                onUpdate={update}
              />
            )}
            {step === 4 && (
              <VoiceSection
                estiloComuncacional={formData.estiloComuncacional}
                expresionesNaturales={formData.expresionesNaturales}
                prohibiciones={formData.prohibiciones}
                nivelFormalidad={formData.nivelFormalidad}
                usoHumor={formData.usoHumor}
                regionalismos={formData.regionalismos}
                temasSensibles={formData.temasSensibles}
                onUpdate={update}
              />
            )}
            {step === 5 && (
              <PillarsSection
                pilares={formData.pilares}
                mensajeCentral={formData.mensajeCentral}
                onUpdate={update}
              />
            )}
            {step === 6 && (
              <PhilosophySection
                creenciasFundamentales={formData.creenciasFundamentales}
                queRechaza={formData.queRechaza}
                limitesEticos={formData.limitesEticos}
                propositoMarca={formData.propositoMarca}
                historiaOrigen={formData.historiaOrigen}
                historiaBatallas={formData.historiaBatallas}
                historiaLogros={formData.historiaLogros}
                onUpdate={update}
              />
            )}
            {step === 7 && (
              <ObjectivesSection
                objetivoPrincipal={formData.objetivoPrincipal}
                kpiCritico={formData.kpiCritico}
                frecuenciaContenido={formData.frecuenciaContenido}
                plataformas={formData.plataformas}
                tiempoPorSemana={formData.tiempoPorSemana}
                presupuesto={formData.presupuesto}
                equipo={formData.equipo}
                timeline={formData.timeline}
                onUpdate={update}
              />
            )}
            {step === 8 && (
              <ContextSection
                productosSecundarios={formData.productosSecundarios}
                colaboraciones={formData.colaboraciones}
                temporadasEventos={formData.temporadasEventos}
                restricciones={formData.restricciones}
                integracionesNecesarias={formData.integracionesNecesarias}
                figurasReferencia={formData.figurasReferencia}
                onUpdate={update}
              />
            )}

            {/* Errores de validacion */}
            {errors.length > 0 && (
              <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                <p className="font-semibold text-red-400 text-sm mb-2">Corrige estos campos antes de continuar:</p>
                <ul className="space-y-1">
                  {errors.map((e, i) => (
                    <li key={i} className="text-sm text-red-300 flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0">•</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {submitError && (
              <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                <p className="text-sm text-red-300">{submitError}</p>
              </div>
            )}

            {/* Navegacion */}
            <div className="flex items-center justify-between mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={step === 0}
                className="gap-2 border-stone-700 text-stone-300 hover:bg-white/5 bg-transparent"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Anterior
              </Button>

              <AutoSaveIndicator lastSaved={lastSaved} />

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #F2CB51, #D4A017)', color: '#0A0A0B', boxShadow: '0 4px 16px rgba(212,160,23,0.25)' }}
                >
                  Siguiente
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', boxShadow: '0 4px 16px rgba(34,197,94,0.2)' }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Generando documentos...
                    </>
                  ) : (
                    <>
                      Enviar y generar documentos
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function FormPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0B' }}>
          <div className="text-stone-500 text-sm">Cargando...</div>
        </div>
      }
    >
      <FormContent />
    </Suspense>
  );
}
