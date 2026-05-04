'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus } from 'lucide-react';

interface VoiceSectionProps {
  estiloComuncacional: string;
  expresionesNaturales: string[];
  prohibiciones: string[];
  nivelFormalidad: number;
  usoHumor: string;
  regionalismos: string;
  temasSensibles: string;
  onUpdate: (field: string, value: unknown) => void;
}

type InputMode = 'single' | 'bulk';

function ChipList({
  items,
  onRemove,
  colorClass,
}: {
  items: string[];
  onRemove: (i: number) => void;
  colorClass: string;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {items.map((item, i) => (
        <span
          key={i}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${colorClass}`}
        >
          {item}
          <button
            type="button"
            onClick={() => onRemove(i)}
            aria-label={`Eliminar "${item}"`}
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );
}

function ProgressCounter({
  current,
  min,
  label,
}: {
  current: number;
  min: number;
  label: string;
}) {
  const pct = Math.min((current / min) * 100, 100);
  const isDone = current >= min;

  return (
    <div className="space-y-1.5 mb-3">
      <div className="flex items-center justify-between">
        <span className={`text-sm font-semibold ${isDone ? 'text-green-700' : 'text-orange-600'}`}>
          {current}/{min} {label}
        </span>
        {isDone ? (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Completo</span>
        ) : (
          <span className="text-xs text-slate-500">Faltan {min - current}</span>
        )}
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${isDone ? 'bg-green-500' : 'bg-orange-400'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function BulkInputPanel({
  placeholder,
  onAdd,
}: {
  placeholder: string;
  onAdd: (items: string[]) => void;
}) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    const lines = text
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (lines.length > 0) {
      onAdd(lines);
      setText('');
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="min-h-[100px] text-sm"
      />
      <p className="text-xs text-slate-400">Separa cada expresion con Enter o coma.</p>
      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        disabled={!text.trim()}
        className="w-full text-sm"
      >
        <Plus className="w-4 h-4 mr-1.5" />
        Agregar todas
      </Button>
    </div>
  );
}

export function VoiceSection({
  estiloComuncacional,
  expresionesNaturales,
  prohibiciones,
  nivelFormalidad,
  usoHumor,
  regionalismos,
  temasSensibles,
  onUpdate,
}: VoiceSectionProps) {
  const [newExpresion, setNewExpresion] = useState('');
  const [newProhibicion, setNewProhibicion] = useState('');
  const [expresionMode, setExpresionMode] = useState<InputMode>('single');
  const [prohibicionMode, setProhibicionMode] = useState<InputMode>('single');

  const addExpresion = () => {
    const v = newExpresion.trim();
    if (v) {
      onUpdate('expresionesNaturales', [...expresionesNaturales, v]);
      setNewExpresion('');
    }
  };

  const addExpresionBulk = (items: string[]) => {
    const unique = items.filter((item) => !expresionesNaturales.includes(item));
    onUpdate('expresionesNaturales', [...expresionesNaturales, ...unique]);
  };

  const addProhibicion = () => {
    const v = newProhibicion.trim();
    if (v) {
      onUpdate('prohibiciones', [...prohibiciones, v]);
      setNewProhibicion('');
    }
  };

  const addProhibicionBulk = (items: string[]) => {
    const unique = items.filter((item) => !prohibiciones.includes(item));
    onUpdate('prohibiciones', [...prohibiciones, ...unique]);
  };

  const removeExpresion = (i: number) => {
    onUpdate('expresionesNaturales', expresionesNaturales.filter((_, j) => j !== i));
  };

  const removeProhibicion = (i: number) => {
    onUpdate('prohibiciones', prohibiciones.filter((_, j) => j !== i));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Voz y Tono</h2>
        <p className="mt-1 text-slate-500">
          Esta seccion captura el ADN comunicacional de tu marca. Tomatelo con calma — es la mas importante.
        </p>
      </div>

      {/* Estilo comunicacional */}
      <div className="space-y-2">
        <Label htmlFor="estiloComuncacional" className="text-sm font-semibold text-slate-700">
          Estilo comunicacional *
        </Label>
        <p className="text-xs text-slate-400">
          Describe con tus palabras como habla tu marca: tono, actitud, referencias, metaforas que usas.
        </p>
        <Textarea
          id="estiloComuncacional"
          className="min-h-[90px]"
          value={estiloComuncacional}
          onChange={(e) => onUpdate('estiloComuncacional', e.target.value)}
          placeholder="Ej: Cercano y directo, como un amigo experto que te habla sin rodeos. Usa metaforas del mundo real. Jamas condescendiente."
        />
      </div>

      {/* Formalidad y humor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">
            Nivel de formalidad: {nivelFormalidad}/10
          </Label>
          <p className="text-xs text-slate-400">1 = muy informal &nbsp;/&nbsp; 10 = muy formal</p>
          <Slider
            value={[nivelFormalidad]}
            onValueChange={(vals) => onUpdate('nivelFormalidad', (vals as number[])[0])}
            min={1}
            max={10}
            step={1}
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>Informal</span>
            <span>Formal</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">Uso del humor *</Label>
          <p className="text-xs text-slate-400">Con que frecuencia aparece el humor en tu comunicacion.</p>
          <Select value={usoHumor} onValueChange={(v) => onUpdate('usoHumor', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alto">Alto — humor frecuente</SelectItem>
              <SelectItem value="Moderado">Moderado — ocasionalmente</SelectItem>
              <SelectItem value="Bajo">Bajo — raramente</SelectItem>
              <SelectItem value="Sin humor">Sin humor — tono serio</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Expresiones naturales */}
      <div className="space-y-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
        <div>
          <Label className="text-sm font-semibold text-slate-700">Expresiones naturales *</Label>
          <p className="text-xs text-slate-500 mt-1">
            Frases que tu marca USA frecuentemente. Piensa en como hablas con tus clientes.
          </p>
        </div>

        <ProgressCounter
          current={expresionesNaturales.length}
          min={15}
          label="expresiones minimo"
        />

        {/* Toggle de modo */}
        <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white text-sm w-fit">
          <button
            type="button"
            onClick={() => setExpresionMode('single')}
            className={`px-3 py-1.5 font-medium transition-colors ${
              expresionMode === 'single'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Una por una
          </button>
          <button
            type="button"
            onClick={() => setExpresionMode('bulk')}
            className={`px-3 py-1.5 font-medium transition-colors ${
              expresionMode === 'bulk'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Pegar varias
          </button>
        </div>

        {expresionMode === 'single' ? (
          <div className="flex gap-2">
            <Input
              value={newExpresion}
              onChange={(e) => setNewExpresion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addExpresion())}
              placeholder='Ej: "Dale pues" / "Parce, escuchame" / "Aqui te lo explico"'
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={addExpresion} aria-label="Agregar expresion">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <BulkInputPanel
            placeholder={'Pega aqui tus expresiones:\nDale pues\nParce, escuchame\nVamos que se puede\n"Lo que nadie te cuenta..."'}
            onAdd={addExpresionBulk}
          />
        )}

        {expresionesNaturales.length > 0 && (
          <ChipList
            items={expresionesNaturales}
            onRemove={removeExpresion}
            colorClass="bg-green-100 text-green-800"
          />
        )}
      </div>

      {/* Prohibiciones */}
      <div className="space-y-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
        <div>
          <Label className="text-sm font-semibold text-slate-700">Prohibiciones absolutas *</Label>
          <p className="text-xs text-slate-500 mt-1">
            Frases, terminos o actitudes que la marca NUNCA usaria bajo ningun contexto.
          </p>
        </div>

        <ProgressCounter
          current={prohibiciones.length}
          min={10}
          label="prohibiciones minimo"
        />

        {/* Toggle de modo */}
        <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white text-sm w-fit">
          <button
            type="button"
            onClick={() => setProhibicionMode('single')}
            className={`px-3 py-1.5 font-medium transition-colors ${
              prohibicionMode === 'single'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Una por una
          </button>
          <button
            type="button"
            onClick={() => setProhibicionMode('bulk')}
            className={`px-3 py-1.5 font-medium transition-colors ${
              prohibicionMode === 'bulk'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Pegar varias
          </button>
        </div>

        {prohibicionMode === 'single' ? (
          <div className="flex gap-2">
            <Input
              value={newProhibicion}
              onChange={(e) => setNewProhibicion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addProhibicion())}
              placeholder='Ej: "crack" / "gurú" / jerga vulgar / prometer resultados garantizados'
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={addProhibicion} aria-label="Agregar prohibicion">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <BulkInputPanel
            placeholder={'Pega aqui tus prohibiciones:\nGurú\nCrack\nHacerse rico rapido\nResultados garantizados'}
            onAdd={addProhibicionBulk}
          />
        )}

        {prohibiciones.length > 0 && (
          <ChipList
            items={prohibiciones}
            onRemove={removeProhibicion}
            colorClass="bg-red-100 text-red-800"
          />
        )}
      </div>

      {/* Regionalismos */}
      <div className="space-y-2">
        <Label htmlFor="regionalismos" className="text-sm font-semibold text-slate-700">
          Regionalismos o slang <span className="font-normal text-slate-400">(opcional)</span>
        </Label>
        <p className="text-xs text-slate-400">
          Terminos locales que usa tu audiencia. Ayuda a calibrar el tono geografico del sistema.
        </p>
        <Textarea
          id="regionalismos"
          value={regionalismos}
          onChange={(e) => onUpdate('regionalismos', e.target.value)}
          placeholder="Ej: Usa terminos colombianos como 'bacano', 'parce'. Evita regionalismos de Espana."
        />
      </div>

      {/* Temas sensibles */}
      <div className="space-y-2">
        <Label htmlFor="temasSensibles" className="text-sm font-semibold text-slate-700">
          Temas sensibles a manejar con cuidado <span className="font-normal text-slate-400">(opcional)</span>
        </Label>
        <p className="text-xs text-slate-400">
          Temas que la marca puede tocar pero con mucha delicadeza — el sistema sabrá cómo tratarlos.
        </p>
        <Textarea
          id="temasSensibles"
          value={temasSensibles}
          onChange={(e) => onUpdate('temasSensibles', e.target.value)}
          placeholder="Ej: Politica, religion, comparaciones directas con competidores nombrados..."
        />
      </div>
    </div>
  );
}
