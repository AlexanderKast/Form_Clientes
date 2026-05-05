'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DriveFile {
  fileId: string;
  fileName: string;
  webViewLink: string;
}

interface SubmitResult {
  intake: DriveFile;
  estrategia: DriveFile;
  voz: DriveFile;
}

const DOCS = [
  {
    key: 'estrategia' as const,
    label: 'Brief de Estrategia',
    desc: 'Posicionamiento, audiencia, propuesta de valor y semillas de contenido.',
    color: 'rgba(212,160,23,0.15)',
    border: 'rgba(212,160,23,0.3)',
    text: '#D4A017',
  },
  {
    key: 'voz' as const,
    label: 'Guía de Voz y Tono',
    desc: 'Expresiones, prohibiciones y ejemplos de copy por pilar.',
    color: 'rgba(168,85,247,0.1)',
    border: 'rgba(168,85,247,0.25)',
    text: '#a855f7',
  },
  {
    key: 'intake' as const,
    label: 'Intake Completo (datos raw)',
    desc: 'Todos los campos tal como fueron ingresados — para alimentar agentes IA.',
    color: 'rgba(34,197,94,0.06)',
    border: 'rgba(34,197,94,0.2)',
    text: '#4ade80',
  },
];

export default function ThankYouPage() {
  const [result, setResult] = useState<SubmitResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('submit_result');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.intake?.fileId) setResult(parsed as SubmitResult);
        sessionStorage.removeItem('submit_result');
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ background: '#0A0A0B' }}>
      <div className="max-w-2xl w-full space-y-6">

        <div className="flex items-center justify-center mb-2">
          <Image
            src="/AC_Mesa de trabajo 1.png"
            alt="Alexander Cast"
            width={500}
            height={500}
            style={{ width: '140px', height: 'auto' }}
          />
        </div>

        <div className="rounded-2xl p-8 text-center" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.07)' }}>

          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(34,197,94,0.12)', border: '2px solid rgba(34,197,94,0.3)' }}
          >
            <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">Intake recibido</h1>
          <p className="text-stone-400 text-lg mb-8">
            Tu información llegó correctamente. Se generaron 3 documentos listos para trabajar tu marca.
          </p>

          {result && (
            <div className="mb-8 space-y-3 text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">Documentos generados en Google Drive</p>
              {DOCS.map(({ key, label, desc, color, border, text }) => {
                const doc = result[key];
                return (
                  <div key={key} className="p-4 rounded-xl" style={{ background: color, border: `1px solid ${border}` }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white mb-0.5">{label}</p>
                        <p className="text-xs text-stone-500">{desc}</p>
                      </div>
                      <a
                        href={doc.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-xs font-medium underline transition-opacity hover:opacity-70"
                        style={{ color: text }}
                      >
                        Abrir →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-left space-y-4 mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">Próximos pasos</h2>

            {[
              { n: '1', title: 'Revisión (24 h)', desc: 'Alexander revisa tu intake y valida que la información esté completa.' },
              { n: '2', title: 'Construcción (48–72 h)', desc: 'Diseño del sistema completo: agentes, skills, knowledge base y templates adaptados a tu voz.' },
              { n: '3', title: 'Entrega + capacitación', desc: 'Recibes el sistema listo con una sesión 1-on-1 de implementación y 15 días de soporte.' },
            ].map((s) => (
              <div key={s.n} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black"
                  style={{ background: 'linear-gradient(135deg, #F2CB51, #D4A017)' }}
                >
                  {s.n}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{s.title}</p>
                  <p className="text-sm text-stone-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <p className="text-xs text-stone-600 mb-3">¿Alguna pregunta urgente?</p>
            <a href="mailto:founder@kreoon.com" className="text-sm transition-colors" style={{ color: '#D4A017' }}>
              founder@kreoon.com
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/" className="text-sm text-stone-600 hover:text-stone-400 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
