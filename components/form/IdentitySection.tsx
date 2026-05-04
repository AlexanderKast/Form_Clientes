'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';
import { BrandType } from '@/types/brand';

interface IdentitySectionProps {
  tipo: BrandType;
  nombreMarca: string;
  expertiseDiferenciador: string;
  anosExperiencia: number;
  ubicacionGeografica: string;
  idiomas: string[];
  industriaNicho: string;
  comoPierciben: string;
  onUpdate: (field: string, value: unknown) => void;
}

function FieldHelper({ text }: { text: string }) {
  return (
    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{text}</p>
  );
}

export function IdentitySection({
  tipo,
  nombreMarca,
  expertiseDiferenciador,
  anosExperiencia,
  ubicacionGeografica,
  idiomas,
  industriaNicho,
  comoPierciben,
  onUpdate,
}: IdentitySectionProps) {
  const [newIdioma, setNewIdioma] = useState('');

  const addIdioma = () => {
    const trimmed = newIdioma.trim();
    if (trimmed && !idiomas.includes(trimmed)) {
      onUpdate('idiomas', [...idiomas, trimmed]);
      setNewIdioma('');
    }
  };

  const removeIdioma = (idx: number) => {
    onUpdate('idiomas', idiomas.filter((_, i) => i !== idx));
  };

  const brandLabel = tipo === 'personal' ? 'Tu nombre o alias publico' : 'Nombre de la marca';
  const brandPlaceholder =
    tipo === 'personal'
      ? 'Ej: Carlos Mendez / @carlomentor'
      : tipo === 'producto'
      ? 'Ej: FinanceFlow / BrandKit Pro'
      : 'Ej: Agencia Crece / Consultora Vivo';

  const expertiseLabel =
    tipo === 'personal' ? 'Tu expertise y diferenciador unico' : 'Propuesta diferenciadora';
  const expertisePlaceholder =
    tipo === 'personal'
      ? 'Ej: Soy contador con 8 anos en startups. Ayudo a founders a pagar menos impuestos legalmente sin perderse en la burocracia...'
      : tipo === 'producto'
      ? 'Ej: Herramienta SaaS que reemplaza 3 apps en una. Unica en LATAM con onboarding en espanol y soporte humano 24/7...'
      : 'Ej: Agencia boutique enfocada en marcas personales. No tomamos mas de 5 clientes al mes. Resultados en 90 dias o reembolso...';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Identidad de Marca</h2>
        <p className="mt-1 text-slate-500">
          Define los elementos fundamentales. Estos datos aparecen en todos los documentos generados — se exacto.
        </p>
      </div>

      <div className="space-y-6">
        {/* Nombre de marca */}
        <div>
          <Label htmlFor="nombreMarca" className="text-sm font-semibold text-slate-700">
            {brandLabel} *
          </Label>
          <FieldHelper text="El nombre exacto que usaremos en todos los documentos. Tal como aparece en tus redes o sitio web." />
          <Input
            id="nombreMarca"
            className="mt-2"
            value={nombreMarca}
            onChange={(e) => onUpdate('nombreMarca', e.target.value)}
            placeholder={brandPlaceholder}
          />
        </div>

        {/* Industria / Nicho */}
        <div>
          <Label htmlFor="industriaNicho" className="text-sm font-semibold text-slate-700">
            Industria / Nicho *
          </Label>
          <FieldHelper text="Se especifico: no solo 'marketing' sino 'marketing digital para tiendas de ropa femenina'. Cuanto mas preciso, mejor funciona el sistema." />
          <Input
            id="industriaNicho"
            className="mt-2"
            value={industriaNicho}
            onChange={(e) => onUpdate('industriaNicho', e.target.value)}
            placeholder="Ej: Finanzas personales para millennials / Coaching de ventas B2B / E-commerce de moda sostenible"
          />
        </div>

        {/* Expertise diferenciador */}
        <div>
          <Label htmlFor="expertiseDiferenciador" className="text-sm font-semibold text-slate-700">
            {expertiseLabel} *
          </Label>
          <FieldHelper text="Lo que te hace UNICO frente a tu competencia. Se especifico y evita frases genericas como 'calidad y servicio'. Menciona anos de experiencia, resultados concretos o metodologias propias." />
          <Textarea
            id="expertiseDiferenciador"
            className="mt-2 min-h-[110px]"
            value={expertiseDiferenciador}
            onChange={(e) => onUpdate('expertiseDiferenciador', e.target.value)}
            placeholder={expertisePlaceholder}
          />
          <div className="flex justify-between mt-1">
            <span />
            <span className={`text-xs ${expertiseDiferenciador.length >= 10 ? 'text-green-600' : 'text-slate-400'}`}>
              {expertiseDiferenciador.length} caracteres {expertiseDiferenciador.length < 10 ? `(minimo 10)` : ''}
            </span>
          </div>
        </div>

        {/* Anos de experiencia */}
        <div>
          <Label htmlFor="anosExperiencia" className="text-sm font-semibold text-slate-700">
            Anos de experiencia en el nicho
          </Label>
          <FieldHelper text="Ayuda a calibrar el nivel de autoridad en el contenido generado. Pon 0 si recien estas empezando." />
          <Input
            id="anosExperiencia"
            type="number"
            className="mt-2 w-28"
            min={0}
            max={50}
            value={anosExperiencia}
            onChange={(e) => onUpdate('anosExperiencia', parseInt(e.target.value) || 0)}
          />
        </div>

        {/* Ubicacion */}
        <div>
          <Label htmlFor="ubicacionGeografica" className="text-sm font-semibold text-slate-700">
            Ubicacion / Mercado geografico *
          </Label>
          <FieldHelper text="El pais o region donde operas PRINCIPALMENTE. Si vendes a varios paises, indicalo. Esto afecta el lenguaje, las referencias culturales y el tono." />
          <Input
            id="ubicacionGeografica"
            className="mt-2"
            value={ubicacionGeografica}
            onChange={(e) => onUpdate('ubicacionGeografica', e.target.value)}
            placeholder="Ej: Colombia, enfocado en LATAM hispanohablante / Espana y Mexico / Estados Unidos (mercado hispano)"
          />
        </div>

        {/* Cómo quieres que te perciban */}
        <div>
          <Label htmlFor="comoPierciben" className="text-sm font-semibold text-slate-700">
            ¿Cómo quieres que te perciban?{' '}
            <span className="font-normal text-slate-400">(opcional)</span>
          </Label>
          <FieldHelper text='Escribe las frases LITERALES que te gustaría que dijera la gente al hablar de ti o tu marca. Ej: "Es el referente en finanzas para jóvenes", "Nunca había entendido esto tan claro".' />
          <Textarea
            id="comoPierciben"
            className="mt-2 min-h-[90px]"
            value={comoPierciben}
            onChange={(e) => onUpdate('comoPierciben', e.target.value)}
            placeholder={'Ej:\n"Cuando quiero aprender de inversiones, siempre pienso en ella primero"\n"Lo que enseña es práctico, no teoría que nadie aplica"\n"Es diferente a todos los otros expertos que he seguido"'}
          />
        </div>

        {/* Idiomas */}
        <div>
          <Label className="text-sm font-semibold text-slate-700">Idiomas *</Label>
          <FieldHelper text="Los idiomas en los que tu marca produce contenido. Agrega uno a la vez y presiona Enter." />
          <div className="flex gap-2 mt-2">
            <Input
              value={newIdioma}
              onChange={(e) => setNewIdioma(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addIdioma())}
              placeholder="Ej: Espanol, Ingles, Portugues"
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={addIdioma} aria-label="Agregar idioma">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {idiomas.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {idiomas.map((idioma, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                >
                  {idioma}
                  <button
                    type="button"
                    onClick={() => removeIdioma(i)}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                    aria-label={`Eliminar ${idioma}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          {idiomas.length === 0 && (
            <p className="text-xs text-orange-600 mt-2">Agrega al menos un idioma</p>
          )}
        </div>
      </div>
    </div>
  );
}
