import { NextResponse } from 'next/server';

const formData = {
  tipo: 'personal',
  nombreMarca: 'Alexander Cast',
  expertiseDiferenciador:
    'Emprendedor digital con mas de 6 anos construyendo negocios de ecommerce y dropshipping desde cero, sin capital inicial. Fundador de KREOON e Infiny Group.',
  anosExperiencia: 6,
  ubicacionGeografica: 'Bogota, Colombia',
  idiomas: ['Espanol'],
  industriaNicho: 'Ecommerce y Dropshipping para emprendedores latinoamericanos',
  comoPierciben:
    'Como alguien que ya lo hizo, que habla sin filtros y sin poses, que no vende humo sino resultados reales con metodologias probadas. Directo, accesible y confiable.',

  perfilDemografico:
    'Hombres y mujeres de 20 a 35 anos en Latinoamerica, con o sin experiencia en negocios, que tienen trabajo o estan desempleados y buscan una fuente de ingresos adicional o principal desde internet. Tienen acceso a un celular o computadora basica.',
  problemaPrincipal:
    'No saben como empezar a vender por internet sin tener capital, sin tener inventario propio, y sin conocimiento tecnico. Se sienten perdidos ante la cantidad de informacion contradictoria y estafas en el mercado.',
  resultadoDeseado:
    'Ganar entre $3,000 y $5,000 USD por mes de forma consistente vendiendo productos fisicos por internet, con un negocio que funcione de manera semi-automatica y les de libertad de tiempo y ubicacion.',
  nivelSofisticacion: 1,
  objecionesPrincipales: [
    'No tengo dinero para empezar',
    'Ya lo intente antes y no funciono',
    'No soy bueno con la tecnologia',
    'Como se que esto no es una estafa',
    'No tengo tiempo porque trabajo todo el dia',
  ],
  competenciaDirecta: [
    '@juandaeffi',
    '@alexbezerraoficial',
    'Dropshipping con Javier',
    'Ecommerce Hacks LATAM',
  ],
  ventajaCompetitiva:
    'A diferencia de los demas gurus que muestran resultados sin explicar el proceso real, Alexander muestra exactamente como construyo sus negocios desde cero con errores incluidos, sin promesas infladas, con metodologias replicables para el contexto latinoamericano.',
  costoNoActuar:
    'Cada mes que pasa sin iniciar es un mes mas de depender de un solo ingreso, sin ahorros, sin libertad. La inflacion sube, el empleo es inestable y las oportunidades en internet se llenan de competencia. El costo de no actuar es seguir exactamente igual en 1, 2 o 5 anos.',
  errorPrincipal:
    'El error principal es buscar el negocio perfecto antes de actuar. La gente pasa meses investigando, comparando cursos y esperando el momento ideal que nunca llega. La accion imperfecta supera siempre a la inaccion perfecta.',
  aQuienNoAyudo:
    'Personas que buscan hacerse ricas de la noche a la manana sin esfuerzo, que no estan dispuestas a dedicar al menos 2 horas diarias, o que quieren resultados sin seguir el proceso.',

  queOfrece:
    'Mentoria grupal e individual en ecommerce y dropshipping para latinoamericanos que quieren construir su primer negocio digital. Incluye metodo paso a paso, comunidad activa, plantillas y soporte directo con Alexander.',
  promesaRealista:
    'En 90 dias tendras tu tienda online funcionando, tus primeras ventas reales, y un sistema basico de operacion que puedes escalar. No prometemos hacerte millonario, prometemos darte el sistema y el acompanamiento para que llegues a tus primeros $1,000 USD al mes.',
  precioInversion: 'Programa grupal desde $497 USD / Mentoria individual desde $1,500 USD',
  formatoEntrega:
    'Clases en vivo semanales + comunidad privada de WhatsApp + modulos grabados + sesiones 1 a 1 opcionales. Todo 100% online.',
  garantia: '7 dias de satisfaccion o devolucion sin preguntas',
  noPromete:
    'No promete resultados en dias, no garantiza ingresos especificos, no es un sistema automatico sin esfuerzo, no funciona para quien no siga el proceso.',
  resultadosClientes:
    'Diana Mile: paso de 0 a su primera venta en 3 semanas. Estudiante en Medellin cerro su primer mes con $800 USD. Mas de 47 alumnos con tiendas activas en los ultimos 12 meses.',

  estiloComuncacional:
    'Directo, sin filtros, como si le hablaras a un amigo cercano que te da la verdad sin azucar. Usa ejemplos reales, numeros concretos y no tiene miedo de hablar de los fracasos propios. Mezcla autoridad con cercania, nunca suena a corporativo ni a vendedor.',
  expresionesNaturales: [
    'Sin mentiras',
    'Te lo digo de frente',
    'Yo lo hice, tu tambien puedes',
    'Eso es humo, vamos a lo que funciona',
    'El sistema existe, solo hay que seguirlo',
    'No se trata de suerte, se trata de metodo',
    'La excusa mas cara es el miedo',
    'Empieza feo, perfecciona despues',
    'Los resultados hablan',
    'Esto no es para flojos',
    'Dale',
    'Pon atencion porque esto cambia todo',
    'Yo estuve donde estas tu',
    'No vengo a venderte humo',
    'El mercado no miente',
  ],
  prohibiciones: [
    'Jamas decir hazte rico rapido o gana dinero facil',
    'No usar lenguaje corporativo ni tecnicismos innecesarios',
    'No prometer resultados sin esfuerzo',
    'Nunca usar frases genericas tipo el exito esta en tus manos',
    'No hablar de competidores con irrespeto o desprecio',
    'No usar signos de exclamacion en exceso',
    'Nunca minimizar las dificultades del proceso',
    'No sonar desesperado o vendedor agresivo',
    'Prohibido el copy estilo URGENTE ULTIMAS HORAS',
    'No publicar precios directamente en redes sociales',
  ],
  nivelFormalidad: 3,
  usoHumor: 'Si, pero contextual. Humor colombiano, seco y directo.',
  regionalismos:
    'Parce, man, bacano, full, brutal. Colombianismos naturales que no excluyen a otros paises LATAM.',
  temasSensibles:
    'Evitar comparaciones directas con competidores especificos. No hablar de politica ni religion. Cuidado con contenido sobre dinero que pueda sonar a estafa.',

  mensajeCentral:
    'Cualquier persona puede ganar de $3,000 a $5,000 USD por mes vendiendo productos fisicos por internet, sin inventario, sin experiencia previa y desde cualquier lugar de Latinoamerica.',
  pilares: [
    { nombre: 'Mentalidad y motivacion', porcentaje: 25 },
    { nombre: 'Opiniones y tendencias del mercado', porcentaje: 25 },
    { nombre: 'Negocios digitales y emprendimiento', porcentaje: 25 },
    { nombre: 'Dropshipping y Ecommerce tactico', porcentaje: 25 },
  ],

  propositoMarca:
    'Existimos para demostrar que cualquier latinoamericano puede construir un negocio digital rentable desde cero, sin capital, sin contactos y sin conocimiento previo, y asi romper el ciclo de dependencia laboral que nos limita generacion tras generacion.',
  creenciasFundamentales: [
    'El acceso a herramientas de negocio no deberia depender del pais donde naciste',
    'Cualquier persona con disciplina y el sistema correcto puede construir libertad financiera',
    'Los fracasos son datos, no definiciones de quien eres',
    'La informacion sin accion no vale nada',
    'Un negocio real se construye con metodologia, no con suerte',
  ],
  queRechaza: [
    'Los cursos que prometen resultados en 7 dias sin esfuerzo',
    'Los gurus que esconden sus fracasos y solo muestran el Lamborghini',
    'El marketing basado en el miedo y la manipulacion emocional extrema',
    'Los sistemas que funcionan solos mientras duermes sin trabajo previo',
  ],
  limitesEticos: [
    'Nunca vender un producto que no he probado o que no recomendaria a mi familia',
    'Siempre revelar los riesgos reales del negocio antes de vender',
    'No crear falsas urgencias ni escasez artificial para presionar una compra',
    'No usar testimonios falsos ni resultados no verificables',
  ],
  historiaOrigen:
    'Empece vendiendo en internet desde un apartamento en Bogota sin capital, con una laptop prestada y sin saber nada de ecommerce. Cometi todos los errores posibles. Pero aprendi cada detalle del sistema y eventualmente construi negocios que me dieron la libertad que buscaba. Cree Alexander Cast para que nadie tenga que aprender por las malas lo que yo aprendi a precio de sangre.',
  historiaBatallas:
    'Tuve un negocio que colapso por una mala decision de proveedor y perdi todo lo invertido. Hubo meses donde no sabia si iba a poder pagar el arriendo. Mi familia no creia en lo que hacia. Esos momentos son los que mas me dan autoridad para hablar de resiliencia y metodo.',
  historiaLogros:
    'Construi un portafolio de negocios digitales que factura consistentemente. Funde KREOON e Infiny Group. Ayude a mas de 200 personas a generar sus primeros ingresos online. Construi una comunidad de mas de 50,000 seguidores interesados en ecommerce real.',

  objetivoPrincipal: 'leads',
  kpiCritico: 'Prospectos calificados por semana que solicitan informacion del programa. Meta: 50 por semana.',
  frecuenciaContenido:
    'Diario en Instagram y TikTok, minimo 1 pieza por dia. YouTube: 2 videos por semana. LinkedIn: 3 posts semanales.',
  plataformas: ['Instagram', 'TikTok', 'YouTube', 'LinkedIn'],
  tiempoPorSemana: 15,
  presupuesto: '$500 USD por mes para pauta',
  equipo: 'Asistente de contenido part-time y editor de video freelance',
  timeline: '6 meses para alcanzar 100k seguidores en Instagram y 500 prospectos mensuales',

  productosSecundarios: [
    'Comunidad privada mensual $97 USD por mes',
    'Templates de tiendas Shopify $47 USD',
    'Auditoria de tienda 1 a 1 $297 USD',
  ],
  colaboraciones: [
    'Podcast de negocios digitales LATAM',
    'Alianza con herramienta de dropshipping (deal de afiliado)',
    'Colaboraciones con creadores de finanzas personales',
  ],
  temporadasEventos: [
    'Hot Sale Mayo: campana especial de lanzamiento',
    'Black Friday Noviembre: descuento en programa',
    'Webinar gratuito mensual: primer jueves del mes',
  ],
  restricciones: [
    'No mencionar precios en redes sociales, siempre llevar a DM',
    'No hablar de competidores directos por nombre en contenido publico',
  ],
  integracionesNecesarias: [
    'Hotmart para ventas del programa',
    'WhatsApp Business para atencion a prospectos',
    'Mailchimp para secuencia de email marketing',
    'n8n para automatizaciones internas',
  ],
  figurasReferencia: {
    heroInfluencer: '@juandaeffi',
    competidoresDirectos: ['@alexbezerraoficial', 'Dropshipping con Javier', 'Ecommerce Hacks LATAM'],
    creadoresIndustria: ['@alexhormozi', '@garyvee', '@hubermanlab', 'My First Million Podcast'],
  },
};

export async function GET() {
  const json = JSON.stringify(formData);
  const completed = JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7]);

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Cargando datos de prueba...</title></head><body><script>
sessionStorage.setItem('brand-intake-form', ${JSON.stringify(json)});
sessionStorage.setItem('brand-intake-completed', ${JSON.stringify(completed)});
window.location.href = '/form';
<\/script><p style="font-family:sans-serif;padding:2rem">Cargando datos de prueba...</p></body></html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
