import { google } from 'googleapis';
import { BrandIntakeData } from '@/types/brand';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function uploadToGoogleDrive(data: BrandIntakeData) {
  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  const drive = google.drive({ version: 'v3', auth: oauth2Client });

  const fileName = `INTAKE-${data.nombreMarca}-${Date.now()}.md`;

  const file = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
    },
    media: {
      mimeType: 'text/markdown',
      body: generateCompleteIntake(data),
    },
    fields: 'id, name, webViewLink',
  });

  return {
    fileId: file.data.id!,
    fileName: file.data.name!,
    webViewLink: file.data.webViewLink!,
  };
}

function generateCompleteIntake(data: BrandIntakeData): string {
  const now = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const sofisticacionLabels = [
    'Completamente novato',
    'Conoce conceptos básicos',
    'Experiencia básica',
    'Nivel intermedio',
    'Avanzado',
    'Experto',
  ];

  const formalidadLabel =
    data.nivelFormalidad <= 3
      ? 'Muy casual, cercano'
      : data.nivelFormalidad <= 5
      ? 'Casual profesional'
      : data.nivelFormalidad <= 7
      ? 'Profesional pero cálido'
      : 'Formal / corporativo';

  const objetivoDesc: Record<string, string> = {
    awareness: 'Alcance, visibilidad, reconocimiento de marca',
    leads: 'Generación de prospectos calificados',
    ventas: 'Conversión directa, revenue',
    comunidad: 'Construcción de comunidad, engagement',
  };

  const tipoLabel =
    data.tipo === 'personal'
      ? 'Marca Personal'
      : data.tipo === 'producto'
      ? 'Producto'
      : 'Servicio / Empresa';

  return `# INTAKE COMPLETO: ${data.nombreMarca}

**Fecha:** ${now}
**Tipo:** ${tipoLabel}

---

## 1. IDENTIDAD CORE

- **Nombre:** ${data.nombreMarca}
- **Industria / Nicho:** ${data.industriaNicho}
- **Ubicación:** ${data.ubicacionGeografica}
- **Idiomas:** ${data.idiomas.join(', ')}
- **Años de experiencia:** ${data.anosExperiencia}
- **Diferenciador único:** ${data.expertiseDiferenciador}
${data.comoPierciben ? `\n**Cómo quieren que los perciban:**\n${data.comoPierciben}` : ''}

---

## 2. AUDIENCIA TARGET

**Perfil demográfico:**
${data.perfilDemografico}

**Problema principal:**
${data.problemaPrincipal}

**Resultado deseado:**
${data.resultadoDeseado}

**Nivel de sofisticación:** ${data.nivelSofisticacion}/5 — ${sofisticacionLabels[data.nivelSofisticacion] ?? ''}

**Objeciones principales:**
${data.objecionesPrincipales.map((o, i) => `${i + 1}. ${o}`).join('\n')}

**Competencia directa:**
${data.competenciaDirecta.map((c, i) => `${i + 1}. ${c}`).join('\n')}

**Ventaja competitiva:**
${data.ventajaCompetitiva}

**Costo de no actuar:**
${data.costoNoActuar}

**Error principal del cliente:**
${data.errorPrincipal}

**A quién NO puede ayudar:**
${data.aQuienNoAyudo}

---

## 3. PROPUESTA DE VALOR

**Qué ofrece:**
${data.queOfrece}

**Promesa realista:**
${data.promesaRealista}

- **Precio / Inversión:** ${data.precioInversion}
- **Formato de entrega:** ${data.formatoEntrega}
${data.garantia ? `- **Garantía:** ${data.garantia}` : ''}

**No promete:**
${data.noPromete}

${data.resultadosClientes ? `**Resultados reales con clientes:**\n${data.resultadosClientes}` : ''}

---

## 4. VOZ Y TONO

**Estilo comunicacional:**
${data.estiloComuncacional}

- **Formalidad:** ${data.nivelFormalidad}/10 — ${formalidadLabel}
- **Humor:** ${data.usoHumor}
${data.regionalismos ? `- **Regionalismos:** ${data.regionalismos}` : ''}
${data.temasSensibles ? `\n**Temas sensibles:**\n${data.temasSensibles}` : ''}

**Expresiones naturales (${data.expresionesNaturales.length}):**
${data.expresionesNaturales.map((e, i) => `${i + 1}. "${e}"`).join('\n')}

**Prohibiciones (${data.prohibiciones.length}):**
${data.prohibiciones.map((p, i) => `${i + 1}. NO: ${p}`).join('\n')}

---

## 5. PILARES DE CONTENIDO

**Mensaje central:**
${data.mensajeCentral}

${data.pilares.map((p, i) => `${i + 1}. **${p.nombre}** — ${p.porcentaje}%`).join('\n')}

Total: ${data.pilares.reduce((s, p) => s + p.porcentaje, 0)}%

---

## 6. FILOSOFIA Y VALORES

**Creencias fundamentales:**
${data.creenciasFundamentales.map((c, i) => `${i + 1}. ${c}`).join('\n')}

**Qué rechaza:**
${data.queRechaza.map((r, i) => `${i + 1}. ${r}`).join('\n')}

**Límites éticos:**
${data.limitesEticos.map((l, i) => `${i + 1}. ${l}`).join('\n')}

**Propósito de marca:**
${data.propositoMarca}

${data.historiaOrigen ? `**Historia de origen:**\n${data.historiaOrigen}\n` : ''}
${data.historiaBatallas ? `**Batallas más duras:**\n${data.historiaBatallas}\n` : ''}
${data.historiaLogros ? `**Mejores logros:**\n${data.historiaLogros}` : ''}

---

## 7. OBJETIVOS Y METRICAS

- **Objetivo:** ${data.objetivoPrincipal.toUpperCase()} — ${objetivoDesc[data.objetivoPrincipal] ?? ''}
- **KPI crítico:** ${data.kpiCritico}
- **Frecuencia:** ${data.frecuenciaContenido}
- **Plataformas:** ${data.plataformas.join(', ')}
- **Tiempo / semana:** ${data.recursosDisponibles.tiempoPorSemana}h
${data.recursosDisponibles.presupuesto ? `- **Presupuesto:** ${data.recursosDisponibles.presupuesto}` : ''}
${data.recursosDisponibles.equipo ? `- **Equipo:** ${data.recursosDisponibles.equipo}` : ''}
- **Timeline:** ${data.timeline}

---

## 8. CONTEXTO ESPECIAL

${data.productosSecundarios?.length ? `**Productos / servicios secundarios:**\n${data.productosSecundarios.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n` : ''}
${data.colaboraciones?.length ? `**Colaboraciones activas:**\n${data.colaboraciones.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n` : ''}
${data.temporadasEventos?.length ? `**Temporadas / eventos clave:**\n${data.temporadasEventos.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n` : ''}
${data.restricciones?.length ? `**Restricciones:**\n${data.restricciones.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n` : ''}
${data.integracionesNecesarias?.length ? `**Integraciones necesarias:**\n${data.integracionesNecesarias.map((r, i) => `${i + 1}. ${r}`).join('\n')}\n` : ''}
${data.figurasReferencia ? `**Figuras de referencia:**
- Hero Influencer: ${data.figurasReferencia.heroInfluencer || 'No especificado'}
- Competidores directos: ${data.figurasReferencia.competidoresDirectos?.join(', ') || 'Ninguno'}
- Creadores de industria: ${data.figurasReferencia.creadoresIndustria?.join(', ') || 'Ninguno'}` : ''}

---

## ARQUITECTURA RECOMENDADA

**Agentes:**
${evaluateAgents(data)}

**Presupuesto estimado:** ~${estimateTokenBudget(data)} tokens

---

*Generado por Brand Architect System — Alexander Cast · Digital Business*
`;
}

function evaluateAgents(data: BrandIntakeData): string {
  const agents = ['Orchestrator', 'Strategist', 'Copywriter', 'Analyst'];
  const visualPlatforms = ['Instagram', 'TikTok', 'YouTube', 'Pinterest'];
  if (data.plataformas.some((p) => visualPlatforms.includes(p))) agents.push('Visual Director');
  if (['awareness', 'comunidad'].includes(data.objetivoPrincipal)) agents.push('Virality Engineer');
  if (['YouTube', 'Blog', 'LinkedIn'].some((p) => data.plataformas.includes(p))) agents.push('SEO Optimizer');
  return agents.map((a, i) => `${i + 1}. ${a}`).join('\n');
}

function estimateTokenBudget(data: BrandIntakeData): number {
  let budget = 800;
  const agentsCount =
    4 +
    (data.plataformas.some((p) => ['Instagram', 'TikTok', 'YouTube'].includes(p)) ? 1 : 0) +
    (['awareness', 'comunidad'].includes(data.objetivoPrincipal) ? 1 : 0) +
    (data.plataformas.some((p) => ['YouTube', 'Blog', 'LinkedIn'].includes(p)) ? 1 : 0);
  budget += agentsCount * 400;
  const skillsCount = 3 + Math.min(data.pilares.length * 2, 10);
  budget += skillsCount * 800;
  budget += data.pilares.length * 300;
  return budget;
}

export function getAuthUrl(): string {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/drive.file'],
  });
}

export async function getTokensFromCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}
