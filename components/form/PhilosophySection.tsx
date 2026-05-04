'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

interface PhilosophySectionProps {
  creenciasFundamentales: string[];
  queRechaza: string[];
  limitesEticos: string[];
  propositoMarca: string;
  historiaOrigen: string;
  historiaBatallas: string;
  historiaLogros: string;
  onUpdate: (field: string, value: unknown) => void;
}

function DynamicList({
  label,
  description,
  items,
  onAdd,
  onRemove,
  placeholder,
  min,
  max,
  chipColor,
}: {
  label: string;
  description?: string;
  items: string[];
  onAdd: (v: string) => void;
  onRemove: (i: number) => void;
  placeholder: string;
  min: number;
  max: number;
  chipColor: string;
}) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const v = input.trim();
    if (v && items.length < max) {
      onAdd(v);
      setInput('');
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <Label className="text-sm font-semibold text-slate-700">
          {label}
          <span
            className={`ml-2 text-xs font-normal ${
              items.length >= min ? 'text-green-600' : 'text-orange-500'
            }`}
          >
            {items.length}/{min} minimo
          </span>
        </Label>
        {description && (
          <p className="text-xs text-slate-400 mt-1">{description}</p>
        )}
      </div>

      {items.length < max && (
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
            placeholder={placeholder}
          />
          <Button type="button" variant="outline" onClick={handleAdd} aria-label={`Agregar a ${label}`}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className={`flex items-start gap-2 p-3 rounded-lg ${chipColor}`}>
            <span className="text-xs font-bold text-slate-400 mt-0.5 flex-shrink-0">{i + 1}.</span>
            <span className="flex-1 text-sm text-slate-700">{item}</span>
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="text-slate-300 hover:text-red-500 transition-colors flex-shrink-0"
              aria-label={`Eliminar "${item}"`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {items.length < min && (
        <p className="text-xs text-orange-600">
          Faltan {min - items.length} elemento(s)
        </p>
      )}
    </div>
  );
}

export function PhilosophySection({
  creenciasFundamentales,
  queRechaza,
  limitesEticos,
  propositoMarca,
  historiaOrigen,
  historiaBatallas,
  historiaLogros,
  onUpdate,
}: PhilosophySectionProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Filosofia e Identidad Profunda</h2>
        <p className="mt-1 text-slate-500">
          Los valores y creencias que definen el alma de la marca. Esta seccion le da caracter al sistema.
        </p>
      </div>

      <div className="space-y-7">
        {/* Proposito de marca */}
        <div className="space-y-2">
          <Label htmlFor="propositoMarca" className="text-sm font-semibold text-slate-700">
            Proposito de la marca *
          </Label>
          <p className="text-xs text-slate-400">
            El &quot;por que&quot; mas profundo. Mas alla de hacer dinero — que cambio quieres generar en el mundo.
          </p>
          <Textarea
            id="propositoMarca"
            className="min-h-[110px]"
            value={propositoMarca}
            onChange={(e) => onUpdate('propositoMarca', e.target.value)}
            placeholder="Ej: Democratizar el acceso a educacion financiera para jovenes latinoamericanos que nunca recibieron estas herramientas en casa..."
          />

          {/* Helper formula */}
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <p className="text-xs font-semibold text-indigo-700 mb-2">Tip: completa esta formula para inspirarte</p>
            <p className="text-xs text-indigo-600 leading-relaxed italic">
              &quot;Existimos para{' '}
              <span className="font-semibold">[verbo de accion]</span> a{' '}
              <span className="font-semibold">[tu audiencia]</span> para que puedan{' '}
              <span className="font-semibold">[resultado transformacional]</span> y asi{' '}
              <span className="font-semibold">[impacto mayor en el mundo]</span>.&quot;
            </p>
            <p className="text-xs text-indigo-500 mt-2">
              Ejemplo: &quot;Existimos para empoderar a madres emprendedoras latinoamericanas para que puedan escalar su negocio sin sacrificar tiempo con su familia, y asi demostrar que el exito no requiere elegir entre familia o carrera.&quot;
            </p>
          </div>

          {propositoMarca.length > 0 && propositoMarca.length < 30 && (
            <p className="text-xs text-orange-600">
              Necesitas al menos 30 caracteres ({30 - propositoMarca.length} mas)
            </p>
          )}
        </div>

        <DynamicList
          label="Creencias fundamentales"
          description="Verdades que tu marca defiende profundamente sobre su industria o el mundo. Las que guian cada decision de contenido."
          items={creenciasFundamentales}
          onAdd={(v) => onUpdate('creenciasFundamentales', [...creenciasFundamentales, v])}
          onRemove={(i) =>
            onUpdate('creenciasFundamentales', creenciasFundamentales.filter((_, j) => j !== i))
          }
          placeholder='Ej: "Cualquier persona puede aprender a invertir si tiene las herramientas correctas"'
          min={3}
          max={7}
          chipColor="bg-blue-50 border border-blue-200"
        />

        <DynamicList
          label="Que rechaza la marca"
          description="Practicas, actitudes o ideas que tu marca activamente rechaza y le daria verguenza asociarse."
          items={queRechaza}
          onAdd={(v) => onUpdate('queRechaza', [...queRechaza, v])}
          onRemove={(i) => onUpdate('queRechaza', queRechaza.filter((_, j) => j !== i))}
          placeholder='Ej: "Los gurus que prometen hacerse rico en 30 dias sin esfuerzo"'
          min={2}
          max={5}
          chipColor="bg-red-50 border border-red-200"
        />

        <DynamicList
          label="Limites eticos"
          description="Lineas que tu marca jamas cruzaria, por ninguna suma de dinero ni presion externa."
          items={limitesEticos}
          onAdd={(v) => onUpdate('limitesEticos', [...limitesEticos, v])}
          onRemove={(i) => onUpdate('limitesEticos', limitesEticos.filter((_, j) => j !== i))}
          placeholder='Ej: "Nunca promover inversiones sin advertir claramente los riesgos"'
          min={2}
          max={5}
          chipColor="bg-slate-50 border border-slate-200"
        />

        {/* Historia de origen */}
        <div className="space-y-2">
          <Label htmlFor="historiaOrigen" className="text-sm font-semibold text-slate-700">
            Historia de origen{' '}
            <span className="font-normal text-slate-400">(opcional)</span>
          </Label>
          <p className="text-xs text-slate-400">
            El momento o experiencia que llevo a crear esta marca. Esta historia se puede usar en contenido de conexion con la audiencia.
          </p>
          <Textarea
            id="historiaOrigen"
            className="min-h-[100px]"
            value={historiaOrigen}
            onChange={(e) => onUpdate('historiaOrigen', e.target.value)}
            placeholder="Cuanta el momento fundacional: que estabas viviendo, que problema te frustro o que oportunidad viste que nadie mas estaba aprovechando..."
          />
        </div>

        {/* Batallas */}
        <div className="space-y-2">
          <Label htmlFor="historiaBatallas" className="text-sm font-semibold text-slate-700">
            Las batallas mas duras que atravesaste{' '}
            <span className="font-normal text-slate-400">(opcional)</span>
          </Label>
          <p className="text-xs text-slate-400">
            Los momentos dificiles, fracasos o crisis que superaste — profesional y personalmente. El contenido de vulnerabilidad mas poderoso sale de aqui.
          </p>
          <Textarea
            id="historiaBatallas"
            className="min-h-[100px]"
            value={historiaBatallas}
            onChange={(e) => onUpdate('historiaBatallas', e.target.value)}
            placeholder="Ej: Perder todo mi capital en el primer negocio y tener que volver a empezar desde cero. Que mi familia no creyera en lo que estaba construyendo durante 2 anos..."
          />
        </div>

        {/* Logros */}
        <div className="space-y-2">
          <Label htmlFor="historiaLogros" className="text-sm font-semibold text-slate-700">
            Tus mejores logros{' '}
            <span className="font-normal text-slate-400">(opcional)</span>
          </Label>
          <p className="text-xs text-slate-400">
            Los hitos mas importantes que has alcanzado — numeros, reconocimientos, momentos de quiebre positivos. Sirven para anclar autoridad en el contenido.
          </p>
          <Textarea
            id="historiaLogros"
            className="min-h-[100px]"
            value={historiaLogros}
            onChange={(e) => onUpdate('historiaLogros', e.target.value)}
            placeholder="Ej: Pasar de $0 a $10k/mes en 8 meses. Hablar en mi primer evento para 500 personas. Ser mencionado en Forbes LATAM. Construir un equipo de 8 personas..."
          />
        </div>
      </div>
    </div>
  );
}
