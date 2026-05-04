'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

function OptionalList({
  label,
  description,
  items,
  placeholder,
  onAdd,
  onRemove,
}: {
  label: string;
  description: string;
  items: string[];
  placeholder: string;
  onAdd: (v: string) => void;
  onRemove: (i: number) => void;
}) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const v = input.trim();
    if (v) {
      onAdd(v);
      setInput('');
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg space-y-3">
      <div>
        <Label>{label}</Label>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder={placeholder}
          className="text-sm"
        />
        <Button type="button" variant="outline" size="sm" onClick={handleAdd}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
              {item}
              <button onClick={() => onRemove(i)}>
                <X className="w-3 h-3 text-gray-400 hover:text-red-500" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

interface FigurasReferencia {
  heroInfluencer: string;
  competidoresDirectos: string[];
  creadoresIndustria: string[];
}

interface ContextSectionProps {
  productosSecundarios: string[];
  colaboraciones: string[];
  temporadasEventos: string[];
  restricciones: string[];
  integracionesNecesarias: string[];
  figurasReferencia: FigurasReferencia;
  onUpdate: (field: string, value: unknown) => void;
}

export function ContextSection({
  productosSecundarios,
  colaboraciones,
  temporadasEventos,
  restricciones,
  integracionesNecesarias,
  figurasReferencia,
  onUpdate,
}: ContextSectionProps) {
  const updateFiguras = (key: keyof FigurasReferencia, value: unknown) => {
    onUpdate('figurasReferencia', { ...figurasReferencia, [key]: value });
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Contexto Adicional</h2>
        <p className="mt-1 text-gray-600">
          Sección opcional. Agrega detalles específicos que necesita el sistema para operar correctamente.
        </p>
      </div>

      {/* Figuras de referencia */}
      <div className="p-5 border border-gray-200 rounded-xl space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Figuras de referencia</h3>
          <p className="text-xs text-gray-500 mt-1">
            Las personas cuyo contenido admiras o sigues. Nos ayudan a entender qué estilo, formato y tono te atrae.
          </p>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">
            Tu Hero Influencer
          </label>
          <p className="text-xs text-gray-400 mt-0.5">La persona que admiras como creador — tu modelo a seguir. Puede ser de cualquier industria.</p>
          <Input
            className="mt-1.5 text-sm"
            value={figurasReferencia.heroInfluencer}
            onChange={(e) => updateFiguras('heroInfluencer', e.target.value)}
            placeholder="Ej: @imangazhi / Alex Hormozi / Lex Fridman"
          />
        </div>

        <OptionalList
          label="Competidores directos (hasta 5)"
          description="Personas o marcas que venden algo igual o muy similar a lo tuyo. Incluye su @handle o nombre."
          items={figurasReferencia.competidoresDirectos}
          placeholder="Ej: @juanperezcoach / TuNombreCompetidor"
          onAdd={(v) => updateFiguras('competidoresDirectos', [...figurasReferencia.competidoresDirectos, v])}
          onRemove={(i) => updateFiguras('competidoresDirectos', figurasReferencia.competidoresDirectos.filter((_, j) => j !== i))}
        />

        <OptionalList
          label="Creadores de tu industria que te inspiran (hasta 5)"
          description="Creadores cuyo contenido te atrae aunque no sean competencia directa. Pueden ser del mercado en inglés."
          items={figurasReferencia.creadoresIndustria}
          placeholder="Ej: @garyvee / @alexhormozi / @hubermanlab"
          onAdd={(v) => updateFiguras('creadoresIndustria', [...figurasReferencia.creadoresIndustria, v])}
          onRemove={(i) => updateFiguras('creadoresIndustria', figurasReferencia.creadoresIndustria.filter((_, j) => j !== i))}
        />
      </div>

      <div className="space-y-4">
        <OptionalList
          label="Productos o servicios secundarios"
          description="Otras ofertas que existen o están planeadas"
          items={productosSecundarios}
          placeholder="Ej: Curso de inversiones para principiantes ($97)"
          onAdd={(v) => onUpdate('productosSecundarios', [...productosSecundarios, v])}
          onRemove={(i) => onUpdate('productosSecundarios', productosSecundarios.filter((_, j) => j !== i))}
        />

        <OptionalList
          label="Colaboraciones y alianzas"
          description="Partners, marcas aliadas, o personas con quien colaboras"
          items={colaboraciones}
          placeholder="Ej: Podcast de Finanzas Para Todos"
          onAdd={(v) => onUpdate('colaboraciones', [...colaboraciones, v])}
          onRemove={(i) => onUpdate('colaboraciones', colaboraciones.filter((_, j) => j !== i))}
        />

        <OptionalList
          label="Temporadas o eventos especiales"
          description="Fechas importantes: lanzamientos, temporadas altas, webinars recurrentes"
          items={temporadasEventos}
          placeholder="Ej: Webinar gratuito cada primer viernes del mes"
          onAdd={(v) => onUpdate('temporadasEventos', [...temporadasEventos, v])}
          onRemove={(i) => onUpdate('temporadasEventos', temporadasEventos.filter((_, j) => j !== i))}
        />

        <OptionalList
          label="Restricciones o limitaciones"
          description="Cosas que el sistema NO puede hacer o mencionar"
          items={restricciones}
          placeholder="Ej: No mencionar precios en redes sociales / No hablar de X servicio aún"
          onAdd={(v) => onUpdate('restricciones', [...restricciones, v])}
          onRemove={(i) => onUpdate('restricciones', restricciones.filter((_, j) => j !== i))}
        />

        <OptionalList
          label="Integraciones necesarias"
          description="Herramientas o plataformas que el sistema debe conocer"
          items={integracionesNecesarias}
          placeholder="Ej: Mailchimp para newsletters / Hotmart para ventas"
          onAdd={(v) => onUpdate('integracionesNecesarias', [...integracionesNecesarias, v])}
          onRemove={(i) => onUpdate('integracionesNecesarias', integracionesNecesarias.filter((_, j) => j !== i))}
        />
      </div>

      <div className="p-4 rounded-xl" style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.2)' }}>
        <p className="text-sm" style={{ color: '#D4A017' }}>
          <strong>Listo para enviar.</strong>{' '}
          <span className="text-stone-400">Al hacer clic en &ldquo;Enviar&rdquo; tu información quedará guardada en Drive y Alexander comenzará a trabajar en tu estrategia.</span>
        </p>
      </div>
    </div>
  );
}
