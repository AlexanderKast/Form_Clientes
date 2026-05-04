'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { X, Plus } from 'lucide-react';

const SOFISTICACION_LABELS = [
  'Principiante total (0)',
  'Conocimiento básico (1)',
  'Intermedio (2)',
  'Avanzado (3)',
  'Muy avanzado (4)',
  'Experto (5)',
];

interface AudienceSectionProps {
  perfilDemografico: string;
  problemaPrincipal: string;
  resultadoDeseado: string;
  nivelSofisticacion: number;
  objecionesPrincipales: string[];
  competenciaDirecta: string[];
  ventajaCompetitiva: string;
  costoNoActuar: string;
  errorPrincipal: string;
  aQuienNoAyudo: string;
  onUpdate: (field: string, value: unknown) => void;
}

export function AudienceSection({
  perfilDemografico,
  problemaPrincipal,
  resultadoDeseado,
  nivelSofisticacion,
  objecionesPrincipales,
  competenciaDirecta,
  ventajaCompetitiva,
  costoNoActuar,
  errorPrincipal,
  aQuienNoAyudo,
  onUpdate,
}: AudienceSectionProps) {
  const [newObjecion, setNewObjecion] = useState('');
  const [newCompetidor, setNewCompetidor] = useState('');

  const addObjecion = () => {
    const v = newObjecion.trim();
    if (v && objecionesPrincipales.length < 5) {
      onUpdate('objecionesPrincipales', [...objecionesPrincipales, v]);
      setNewObjecion('');
    }
  };

  const addCompetidor = () => {
    const v = newCompetidor.trim();
    if (v) {
      onUpdate('competenciaDirecta', [...competenciaDirecta, v]);
      setNewCompetidor('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Audiencia Objetivo</h2>
        <p className="mt-1 text-gray-600">Define quién es tu cliente ideal y qué necesita.</p>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="perfilDemografico">Perfil demográfico detallado *</Label>
          <Textarea
            id="perfilDemografico"
            className="mt-1 min-h-[100px]"
            value={perfilDemografico}
            onChange={(e) => onUpdate('perfilDemografico', e.target.value)}
            placeholder="Edad, género, ocupación, nivel de ingresos, ubicación, intereses, comportamientos..."
          />
        </div>

        <div>
          <Label htmlFor="problemaPrincipal">Problema principal que resuelves *</Label>
          <Textarea
            id="problemaPrincipal"
            className="mt-1 min-h-[80px]"
            value={problemaPrincipal}
            onChange={(e) => onUpdate('problemaPrincipal', e.target.value)}
            placeholder="¿Cuál es el dolor más grande de tu audiencia que tú resuelves?"
          />
        </div>

        <div>
          <Label htmlFor="resultadoDeseado">Resultado deseado por tu audiencia *</Label>
          <Textarea
            id="resultadoDeseado"
            className="mt-1 min-h-[80px]"
            value={resultadoDeseado}
            onChange={(e) => onUpdate('resultadoDeseado', e.target.value)}
            placeholder="¿Qué quieren lograr? ¿Cómo quieren sentirse o verse después de trabajar contigo?"
          />
        </div>

        <div>
          <Label>Nivel de sofisticación de tu audiencia: {SOFISTICACION_LABELS[nivelSofisticacion]}</Label>
          <p className="text-xs text-gray-500 mt-1 mb-3">
            0 = nunca ha oído hablar del tema, 5 = experto que ya conoce todo
          </p>
          <Slider
            value={[nivelSofisticacion]}
            onValueChange={(vals) => onUpdate('nivelSofisticacion', (vals as number[])[0])}
            min={0}
            max={5}
            step={1}
            className="w-full"
          />
        </div>

        <div>
          <Label>Objeciones principales (mínimo 3, máximo 5) — {objecionesPrincipales.length}/5</Label>
          <p className="text-xs text-gray-500 mt-1">¿Por qué razones dudan o no compran?</p>
          {objecionesPrincipales.length < 5 && (
            <div className="flex gap-2 mt-2">
              <Input
                value={newObjecion}
                onChange={(e) => setNewObjecion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addObjecion())}
                placeholder='Ej: "Es muy caro"'
              />
              <Button type="button" variant="outline" onClick={addObjecion}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
          <div className="space-y-2 mt-2">
            {objecionesPrincipales.map((o, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded">
                <span className="flex-1 text-sm">{i + 1}. {o}</span>
                <button onClick={() => onUpdate('objecionesPrincipales', objecionesPrincipales.filter((_, j) => j !== i))}>
                  <X className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
          {objecionesPrincipales.length < 3 && (
            <p className="text-xs text-orange-600 mt-1">Necesitas al menos {3 - objecionesPrincipales.length} objeción(es) más</p>
          )}
        </div>

        <div>
          <Label>Competencia directa *</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={newCompetidor}
              onChange={(e) => setNewCompetidor(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCompetidor())}
              placeholder="Nombre de un competidor"
            />
            <Button type="button" variant="outline" onClick={addCompetidor}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {competenciaDirecta.map((c, i) => (
              <span key={i} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                {c}
                <button onClick={() => onUpdate('competenciaDirecta', competenciaDirecta.filter((_, j) => j !== i))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="ventajaCompetitiva">Ventaja competitiva *</Label>
          <Textarea
            id="ventajaCompetitiva"
            className="mt-1 min-h-[80px]"
            value={ventajaCompetitiva}
            onChange={(e) => onUpdate('ventajaCompetitiva', e.target.value)}
            placeholder="¿Por qué alguien debería elegirte a ti sobre la competencia?"
          />
        </div>

        <div>
          <Label htmlFor="costoNoActuar">¿Cuál es el costo de quedarse sin actuar? *</Label>
          <p className="text-xs text-gray-500 mt-1">
            Si tu cliente NO resuelve su problema ahora, ¿qué tan mala puede llegar a ser su situación? ¿Qué pierde, qué sigue sufriendo, qué oportunidad se le escapa?
          </p>
          <Textarea
            id="costoNoActuar"
            className="mt-2 min-h-[90px]"
            value={costoNoActuar}
            onChange={(e) => onUpdate('costoNoActuar', e.target.value)}
            placeholder='Ej: "Seguir perdiendo tiempo y dinero con estrategias que no funcionan. En 12 meses más estarán en el mismo punto, con más competidores encima y menos energía para arrancar."'
          />
        </div>

        <div>
          <Label htmlFor="errorPrincipal">¿Cuál es el error principal que comete tu cliente? *</Label>
          <p className="text-xs text-gray-500 mt-1">
            El error más común que comete tu cliente ideal en relación al problema que ayudas a resolver — el que impide que consiga los resultados que busca.
          </p>
          <Textarea
            id="errorPrincipal"
            className="mt-2 min-h-[90px]"
            value={errorPrincipal}
            onChange={(e) => onUpdate('errorPrincipal', e.target.value)}
            placeholder='Ej: "Publicar contenido sin estrategia, sin consistencia y esperando que el algoritmo los ayude. Crean mucho pero no tienen claro para quién ni para qué."'
          />
        </div>

        <div>
          <Label htmlFor="aQuienNoAyudo">¿A qué tipo de personas NO puedes ayudar? *</Label>
          <p className="text-xs text-gray-500 mt-1">
            Ser claro en esto filtra clientes incorrectos y hace más creíble tu propuesta. No todo el mundo es tu cliente.
          </p>
          <Textarea
            id="aQuienNoAyudo"
            className="mt-2 min-h-[80px]"
            value={aQuienNoAyudo}
            onChange={(e) => onUpdate('aQuienNoAyudo', e.target.value)}
            placeholder='Ej: "Personas que buscan resultados sin esfuerzo, que no están dispuestas a cambiar hábitos, o que esperan que yo haga todo el trabajo por ellas."'
          />
        </div>
      </div>
    </div>
  );
}
