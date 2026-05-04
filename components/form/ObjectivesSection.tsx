'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

const OBJETIVO_OPTIONS = [
  { id: 'awareness', label: 'Awareness', description: 'Dar a conocer la marca, alcance masivo', emoji: '📢' },
  { id: 'leads', label: 'Generación de leads', description: 'Captar prospectos interesados', emoji: '🎯' },
  { id: 'ventas', label: 'Ventas directas', description: 'Convertir seguidores en compradores', emoji: '💰' },
  { id: 'comunidad', label: 'Comunidad', description: 'Construir una comunidad fiel y activa', emoji: '❤️' },
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
    if (plataformas.includes(p)) {
      onUpdate('plataformas', plataformas.filter((x) => x !== p));
    } else {
      onUpdate('plataformas', [...plataformas, p]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Objetivos y Recursos</h2>
        <p className="mt-1 text-gray-600">Define qué quieres lograr y con qué recursos cuentas.</p>
      </div>

      <div className="space-y-5">
        <div>
          <Label>Objetivo principal *</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            {OBJETIVO_OPTIONS.map((opt) => (
              <Card
                key={opt.id}
                onClick={() => onUpdate('objetivoPrincipal', opt.id)}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  objetivoPrincipal === opt.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{opt.emoji}</div>
                <div className="font-semibold text-sm">{opt.label}</div>
                <div className="text-xs text-gray-500 mt-1">{opt.description}</div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="kpiCritico">KPI crítico *</Label>
          <Input
            id="kpiCritico"
            className="mt-1"
            value={kpiCritico}
            onChange={(e) => onUpdate('kpiCritico', e.target.value)}
            placeholder="Ej: Leads por mes / Tasa de conversión / Seguidores activos / Ventas mensuales"
          />
        </div>

        <div>
          <Label htmlFor="frecuenciaContenido">Frecuencia de contenido *</Label>
          <Input
            id="frecuenciaContenido"
            className="mt-1"
            value={frecuenciaContenido}
            onChange={(e) => onUpdate('frecuenciaContenido', e.target.value)}
            placeholder="Ej: 5 posts/semana en Instagram + 1 video YouTube semanal"
          />
        </div>

        <div>
          <Label>Plataformas *</Label>
          <p className="text-xs text-gray-500 mt-1">Selecciona todas las que apliquen.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {PLATAFORMAS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => togglePlataforma(p)}
                className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                  plataformas.includes(p)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {plataformas.length === 0 && (
            <p className="text-xs text-orange-600 mt-1">Selecciona al menos una plataforma</p>
          )}
        </div>

        <div>
          <Label>Tiempo disponible por semana: {tiempoPorSemana} horas</Label>
          <Slider
            value={[tiempoPorSemana]}
            onValueChange={(vals) => onUpdate('tiempoPorSemana', (vals as number[])[0])}
            min={1}
            max={40}
            step={1}
            className="mt-3"
          />
        </div>

        <div>
          <Label htmlFor="presupuesto">Presupuesto mensual para contenido (opcional)</Label>
          <Input
            id="presupuesto"
            className="mt-1"
            value={presupuesto}
            onChange={(e) => onUpdate('presupuesto', e.target.value)}
            placeholder="Ej: $500 USD/mes / Sin presupuesto por ahora"
          />
        </div>

        <div>
          <Label htmlFor="equipo">Equipo disponible (opcional)</Label>
          <Textarea
            id="equipo"
            className="mt-1"
            value={equipo}
            onChange={(e) => onUpdate('equipo', e.target.value)}
            placeholder="Ej: Solo yo por ahora / Tengo 1 community manager part-time / Equipo de 3 personas"
          />
        </div>

        <div>
          <Label htmlFor="timeline">Timeline / horizonte del proyecto *</Label>
          <Input
            id="timeline"
            className="mt-1"
            value={timeline}
            onChange={(e) => onUpdate('timeline', e.target.value)}
            placeholder="Ej: Resultados esperados en 90 días / Lanzamiento en junio 2026"
          />
        </div>
      </div>
    </div>
  );
}
