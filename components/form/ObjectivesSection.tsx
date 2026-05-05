'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const OBJETIVO_OPTIONS = [
  { id: 'awareness', label: 'Awareness',     description: 'Alcance masivo, dar a conocer la marca', emoji: '📢' },
  { id: 'leads',     label: 'Leads',         description: 'Captar prospectos interesados',           emoji: '🎯' },
  { id: 'ventas',    label: 'Ventas',        description: 'Convertir seguidores en compradores',     emoji: '💰' },
  { id: 'comunidad', label: 'Comunidad',     description: 'Construir audiencia fiel y activa',       emoji: '❤️' },
] as const;

const PLATAFORMAS = [
  'Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'X / Twitter',
  'Facebook', 'Blog / SEO', 'Pinterest', 'Threads', 'WhatsApp',
];

interface ObjectivesSectionProps {
  objetivoPrincipal: 'awareness' | 'leads' | 'ventas' | 'comunidad';
  kpiCritico: string;
  frecuenciaContenido: string;
  plataformas: string[];
  tiempoPorSemana: number;
  presupuesto: string;
  equipo: string;
  timeline: string;
  onUpdate: (field: string, value: unknown) => void;
}

export function ObjectivesSection({
  objetivoPrincipal,
  kpiCritico,
  frecuenciaContenido,
  plataformas,
  tiempoPorSemana,
  presupuesto,
  equipo,
  timeline,
  onUpdate,
}: ObjectivesSectionProps) {
  const togglePlataforma = (p: string) => {
    onUpdate(
      'plataformas',
      plataformas.includes(p) ? plataformas.filter((x) => x !== p) : [...plataformas, p]
    );
  };

  return (
    <div className="space-y-6">
      {/* Objetivo principal */}
      <div className="field-group">
        <Label className="label-text">Objetivo principal *</Label>
        <p className="helper-text">El norte que guía toda la estrategia de contenido.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
          {OBJETIVO_OPTIONS.map((opt) => {
            const isSelected = objetivoPrincipal === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onUpdate('objetivoPrincipal', opt.id)}
                className={`
                  relative p-4 rounded-xl border-2 text-left transition-all
                  hover:-translate-y-0.5 focus:outline-none
                  ${isSelected
                    ? 'border-yellow-400 bg-yellow-400/5 shadow-[0_0_16px_rgba(251,191,36,0.1)]'
                    : 'border-gray-800 bg-gray-950 hover:border-gray-700'
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="text-2xl mb-2">{opt.emoji}</div>
                <div className={`font-semibold text-sm mb-1 ${isSelected ? 'text-yellow-400' : 'text-white'}`}>
                  {opt.label}
                </div>
                <div className="text-xs text-gray-500">{opt.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI crítico */}
      <div className="field-group">
        <Label htmlFor="kpiCritico" className="label-text">KPI crítico *</Label>
        <p className="helper-text">La métrica principal que medirá el éxito.</p>
        <Input
          id="kpiCritico"
          className="mt-2"
          value={kpiCritico}
          onChange={(e) => onUpdate('kpiCritico', e.target.value)}
          placeholder="Ej: 20 leads/mes / 5% tasa conversión / 1000 nuevos seguidores/mes"
        />
      </div>

      {/* Frecuencia de contenido */}
      <div className="field-group">
        <Label htmlFor="frecuenciaContenido" className="label-text">Frecuencia de contenido *</Label>
        <p className="helper-text">¿Con qué regularidad publicarás y en qué formatos?</p>
        <Input
          id="frecuenciaContenido"
          className="mt-2"
          value={frecuenciaContenido}
          onChange={(e) => onUpdate('frecuenciaContenido', e.target.value)}
          placeholder="Ej: 5 Reels/semana en Instagram + 1 video YouTube semanal"
        />
      </div>

      {/* Plataformas */}
      <div className="field-group">
        <Label className="label-text">Plataformas *</Label>
        <p className="helper-text">Selecciona todas las que apliquen.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
          {PLATAFORMAS.map((p) => {
            const isSelected = plataformas.includes(p);
            return (
              <button
                key={p}
                type="button"
                onClick={() => togglePlataforma(p)}
                className={`
                  px-3 py-2 rounded-lg border text-sm font-medium transition-all
                  ${isSelected
                    ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                    : 'border-gray-800 bg-gray-950 text-gray-400 hover:border-gray-700 hover:text-gray-300'
                  }
                `}
              >
                {p}
              </button>
            );
          })}
        </div>
        {plataformas.length === 0 && (
          <p className="error-text">Selecciona al menos una plataforma</p>
        )}
      </div>

      {/* Tiempo por semana */}
      <div className="p-5 rounded-xl bg-gray-950/50 border border-gray-800 space-y-4">
        <div>
          <Label className="label-text">
            Tiempo disponible:{' '}
            <span className="text-yellow-400">{tiempoPorSemana} horas/semana</span>
          </Label>
          <p className="helper-text">Cuánto tiempo real puedes dedicar al contenido.</p>
        </div>
        <Slider
          value={[tiempoPorSemana]}
          onValueChange={(vals) => onUpdate('tiempoPorSemana', (vals as number[])[0])}
          min={1}
          max={40}
          step={1}
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>1 hora</span>
          <span>40 horas</span>
        </div>
      </div>

      {/* Grid: presupuesto + timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="field-group">
          <Label htmlFor="presupuesto" className="label-text">
            Presupuesto mensual{' '}
            <span className="font-normal text-gray-600">(opcional)</span>
          </Label>
          <Input
            id="presupuesto"
            className="mt-2"
            value={presupuesto}
            onChange={(e) => onUpdate('presupuesto', e.target.value)}
            placeholder="Ej: $500 USD/mes"
          />
        </div>

        <div className="field-group">
          <Label htmlFor="timeline" className="label-text">Timeline *</Label>
          <Input
            id="timeline"
            className="mt-2"
            value={timeline}
            onChange={(e) => onUpdate('timeline', e.target.value)}
            placeholder="Ej: Resultados en 90 días"
          />
        </div>
      </div>

      {/* Equipo */}
      <div className="field-group">
        <Label htmlFor="equipo" className="label-text">
          Equipo disponible{' '}
          <span className="font-normal text-gray-600">(opcional)</span>
        </Label>
        <Textarea
          id="equipo"
          className="mt-2"
          value={equipo}
          onChange={(e) => onUpdate('equipo', e.target.value)}
          placeholder="Solo yo por ahora / Tengo 1 community manager part-time / Equipo de 3 personas"
        />
      </div>
    </div>
  );
}
