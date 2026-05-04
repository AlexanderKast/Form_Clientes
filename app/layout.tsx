import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Brand Architect System | Alexander Cast',
  description: 'Sistema de estrategia de contenido con IA, personalizado para tu marca. Completa el intake y Alexander construye tu sistema en 48–72 horas.',
  keywords: 'estrategia de contenido, IA, marca personal, Alexander Cast, Bogotá, Colombia',
  authors: [{ name: 'Alexander Cast' }],
  openGraph: {
    title: 'Brand Architect System | Alexander Cast',
    description: 'Sistema de estrategia de contenido con IA, personalizado para tu marca.',
    type: 'website',
    locale: 'es_CO',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
