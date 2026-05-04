'use client';

import { BrandType } from '@/types/brand';
import { Card } from '@/components/ui/card';

interface TypeSelectorProps {
  value: BrandType;
  onChange: (type: BrandType) => void;
}

const OPTIONS: Array<{ id: BrandType; label: string; description: string; emoji: string }> = [
  {
    id: 'personal',
    label: 'Marca Personal',
    description: 'Coach, consultor, experto, influencer, profesional independiente',
    emoji: '👤',
  },
  {
    id: 'producto',
    label: 'Producto',
    description: 'Producto físico o digital, ecommerce, SaaS, app',
    emoji: '📦',
  },
  {
    id: 'servicio',
    label: 'Servicio / Empresa',
    description: 'Agencia, estudio, empresa de servicios, B2B',
    emoji: '🏢',
  },
];

export function TypeSelector({ value, onChange }: TypeSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">¿Qué tipo de marca estructuraremos?</h2>
        <p className="mt-2 text-gray-600">
          Selecciona el tipo que mejor describe tu marca. Esto adaptará las preguntas del formulario.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {OPTIONS.map((option) => (
          <Card
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`p-6 cursor-pointer transition-all border-2 ${
              value === option.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="text-4xl mb-3">{option.emoji}</div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">{option.label}</h3>
            <p className="text-sm text-gray-600">{option.description}</p>
            {value === option.id && (
              <div className="mt-3 text-blue-600 text-sm font-medium">✓ Seleccionado</div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
