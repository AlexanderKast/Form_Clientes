'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { X, Plus } from 'lucide-react';

interface Pilar {
  nombre: string;
  porcentaje: number;
}

interface PillarsSectionProps {
  pilares: Pilar[];
  mensajeCentral: string;
  onUpdate: (field: string, value: unknown) => void;
}

const EXAMPLE_PILLARS = [
  { nombre: 'Educacion', porcentaje: 40 },
  { nombre: 'Inspiracion', porcentaje: 25 },
  { nombre: 'Detras de camaras', porcentaje: 20 },
  { nombre: 'Ventas', porcentaje: 15 },
];

const PILLAR_COLORS = [
  'bg-indigo-500',
  'bg-blue-500',
  'bg-violet-500',
  'bg-sky-500',
  'bg-purple-500',
];

export function PillarsSection({ pilares, mensajeCentral, onUpdate }: PillarsSectionProps) {
  const [newNombre, setNewNombre] = useState('');

  const total = pilares.reduce((s, p) => s + p.porcentaje, 0);
  const isComplete = total === 100;

  const addPilar = () => {
    const nombre = newNombre.trim();
    if (!nombre || pilares.length >= 5) return;
    const defaultPct = Math.max(5, Math.min(20, 100 - total));
    onUpdate('pilares', [...pilares, { nombre, porcentaje: defaultPct }]);
    setNewNombre('');
  };

  const removePilar = (idx: number) => {
    onUpdate('pilares', pilares.filter((_, i) => i !== idx));
  };

  const updatePorcentaje = (idx: number, value: number) => {
    const updated = pilares.map((p, i) => (i === idx ? { ...p, porcentaje: value } : p));
    onUpdate('pilares', updated);
  };

  const loadExamples = () => {
    onUpdate('pilares', EXAMPLE_PILLARS);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Pilares de Contenido</h2>
        <p className="mt-1 text-slate-500">
          Define 3 a 5 temas centrales. La distribucion debe sumar exactamente 100%.
        </p>
      </div>

      {/* Mensaje central */}
      <div className="p-5 rounded-xl border-2 border-dashed border-slate-200 space-y-3">
        <div>
          <Label htmlFor="mensajeCentral" className="text-sm font-semibold text-slate-700">
            Tu mensaje central *
          </Label>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Es la creencia o paradigma que quieres implantar en el cerebro de la gente que te sigue. No es un slogan — es una verdad que defiendes con convicción y que guia todo tu contenido.
          </p>
          <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <p className="text-xs text-slate-500 font-medium mb-1">Ejemplos:</p>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>&bull; &ldquo;Cualquier persona puede vivir de su marca personal si domina la creación de contenido estratégico&rdquo;</li>
              <li>&bull; &ldquo;El problema no es que no tengas tiempo — es que no tienes un sistema&rdquo;</li>
              <li>&bull; &ldquo;El contenido que vende no es el más viral, es el más coherente&rdquo;</li>
            </ul>
          </div>
        </div>
        <Textarea
          id="mensajeCentral"
          className="min-h-[80px]"
          value={mensajeCentral}
          onChange={(e) => onUpdate('mensajeCentral', e.target.value)}
          placeholder="La creencia central que quieres que tu audiencia adopte..."
        />
        {mensajeCentral.length > 0 && mensajeCentral.length < 20 && (
          <p className="text-xs text-orange-600">Necesitas al menos 20 caracteres ({20 - mensajeCentral.length} más)</p>
        )}
      </div>

      {/* Sugerencia de ejemplos */}
      {pilares.length === 0 && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
          <p className="text-sm text-indigo-700 font-medium mb-1">Ejemplo tipico para marcas de conocimiento:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {EXAMPLE_PILLARS.map((p) => (
              <span key={p.nombre} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                {p.nombre} ({p.porcentaje}%)
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={loadExamples}
            className="mt-3 text-xs text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-2"
          >
            Cargar estos ejemplos y ajustarlos
          </button>
        </div>
      )}

      {/* Agregar pilar */}
      {pilares.length < 5 && (
        <div>
          <Label className="text-sm font-semibold text-slate-700">Agregar pilar</Label>
          <p className="text-xs text-slate-400 mt-1">
            Escribe el nombre del tema y presiona Enter. Luego ajusta el porcentaje con el slider.
          </p>
          <div className="flex gap-2 mt-2">
            <Input
              value={newNombre}
              onChange={(e) => setNewNombre(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPilar())}
              placeholder="Ej: Educacion / Motivacion / Detras de camaras / Casos de exito"
            />
            <Button type="button" variant="outline" onClick={addPilar} aria-label="Agregar pilar">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Lista de pilares */}
      <div className="space-y-3">
        {pilares.map((pilar, i) => {
          const barColor = PILLAR_COLORS[i % PILLAR_COLORS.length];
          return (
            <Card key={i} className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${barColor}`} />
                  <span className="font-semibold text-slate-800">{pilar.nombre}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removePilar(i)}
                  className="text-slate-300 hover:text-red-500 transition-colors"
                  aria-label={`Eliminar pilar ${pilar.nombre}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Porcentaje de contenido</span>
                  <span className="font-bold text-indigo-600 text-base">{pilar.porcentaje}%</span>
                </div>

                {/* Barra visual del pilar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                    style={{ width: `${pilar.porcentaje}%` }}
                  />
                </div>

                <Slider
                  value={[pilar.porcentaje]}
                  onValueChange={(vals) => updatePorcentaje(i, (vals as number[])[0])}
                  min={5}
                  max={60}
                  step={5}
                />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Total con animacion */}
      {pilares.length > 0 && (
        <div
          className={`p-4 rounded-xl border-2 transition-all ${
            isComplete
              ? 'bg-green-50 border-green-300'
              : 'bg-orange-50 border-orange-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-sm">
                Total acumulado:
              </span>
              <span
                className={`ml-2 text-xl font-black ${
                  isComplete ? 'text-green-700' : 'text-orange-700'
                }`}
              >
                {total}%
              </span>
            </div>
            {isComplete ? (
              <span className="text-green-700 text-sm font-semibold bg-green-100 px-3 py-1 rounded-full">
                Perfecto
              </span>
            ) : (
              <span className="text-orange-700 text-sm font-medium">
                {total < 100
                  ? `Falta ${100 - total}% por asignar`
                  : `Sobra ${total - 100}% — reduce alguno`}
              </span>
            )}
          </div>

          {/* Barra total */}
          <div className="mt-3 w-full h-2 bg-white/70 rounded-full overflow-hidden border border-white">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isComplete ? 'bg-green-500' : total > 100 ? 'bg-red-400' : 'bg-orange-400'
              }`}
              style={{ width: `${Math.min(total, 100)}%` }}
            />
          </div>

          {!isComplete && (
            <p className="text-xs text-orange-600 mt-2">
              Ajusta los sliders hasta que el total sea exactamente 100%.
            </p>
          )}
        </div>
      )}

      {pilares.length < 3 && (
        <p className="text-sm text-orange-600 font-medium">
          Necesitas minimo 3 pilares — agrega {3 - pilares.length} mas.
        </p>
      )}
    </div>
  );
}
