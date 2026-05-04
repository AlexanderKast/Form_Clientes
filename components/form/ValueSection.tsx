'use client';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ValueSectionProps {
  queOfrece: string;
  promesaRealista: string;
  precioInversion: string;
  formatoEntrega: string;
  garantia: string;
  noPromete: string;
  resultadosClientes: string;
  onUpdate: (field: string, value: unknown) => void;
}

export function ValueSection({
  queOfrece,
  promesaRealista,
  precioInversion,
  formatoEntrega,
  garantia,
  noPromete,
  resultadosClientes,
  onUpdate,
}: ValueSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Propuesta de Valor</h2>
        <p className="mt-1 text-gray-600">Define exactamente qué ofreces y a qué precio.</p>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="queOfrece">¿Qué ofreces? (producto / servicio / solución) *</Label>
          <Textarea
            id="queOfrece"
            className="mt-1 min-h-[100px]"
            value={queOfrece}
            onChange={(e) => onUpdate('queOfrece', e.target.value)}
            placeholder="Describe tu oferta principal con detalle: qué incluye, cómo funciona, qué entrega..."
          />
        </div>

        <div>
          <Label htmlFor="promesaRealista">Promesa realista *</Label>
          <Textarea
            id="promesaRealista"
            className="mt-1 min-h-[80px]"
            value={promesaRealista}
            onChange={(e) => onUpdate('promesaRealista', e.target.value)}
            placeholder='Ej: "En 90 días tendrás un sistema de ventas automatizado generando $3k/mes"'
          />
        </div>

        <div>
          <Label htmlFor="precioInversion">Precio / Inversión *</Label>
          <Input
            id="precioInversion"
            className="mt-1"
            value={precioInversion}
            onChange={(e) => onUpdate('precioInversion', e.target.value)}
            placeholder="Ej: Desde $497 USD / Suscripción $97/mes / Desde $2.500.000 COP"
          />
        </div>

        <div>
          <Label htmlFor="formatoEntrega">Formato de entrega *</Label>
          <Textarea
            id="formatoEntrega"
            className="mt-1 min-h-[80px]"
            value={formatoEntrega}
            onChange={(e) => onUpdate('formatoEntrega', e.target.value)}
            placeholder="Ej: Programa 1:1 de 8 semanas por Zoom / Plataforma online 24/7 / Servicio mensual con reunión semanal..."
          />
        </div>

        <div>
          <Label htmlFor="garantia">Garantía (opcional)</Label>
          <Input
            id="garantia"
            className="mt-1"
            value={garantia}
            onChange={(e) => onUpdate('garantia', e.target.value)}
            placeholder='Ej: "30 días de devolución sin preguntas"'
          />
        </div>

        <div>
          <Label htmlFor="noPromete">¿Qué NO prometes? *</Label>
          <Textarea
            id="noPromete"
            className="mt-1 min-h-[80px]"
            value={noPromete}
            onChange={(e) => onUpdate('noPromete', e.target.value)}
            placeholder='Ej: "No prometemos resultados de la noche a la mañana. Requiere trabajo consistente durante 3+ meses."'
          />
          <p className="text-xs text-gray-500 mt-1">Esto construye credibilidad y filtra clientes incorrectos.</p>
        </div>

        <div>
          <Label htmlFor="resultadosClientes">
            Resultados reales con clientes{' '}
            <span className="text-gray-400 font-normal">(opcional)</span>
          </Label>
          <Textarea
            id="resultadosClientes"
            className="mt-1 min-h-[100px]"
            value={resultadosClientes}
            onChange={(e) => onUpdate('resultadosClientes', e.target.value)}
            placeholder={'Menciona ejemplos concretos con nombres o perfiles:\nEj: "Juan (35, vendedor) pasó de 0 a $4k/mes en 60 días siguiendo el método. Ana cerró su primera venta enterprise en semana 3 del programa."'}
          />
          <p className="text-xs text-gray-500 mt-1">Si no tienes clientes aún, describe el resultado que esperas lograr en tu primer caso de éxito.</p>
        </div>
      </div>
    </div>
  );
}
