import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCode } from '@/lib/google-drive';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return new NextResponse('Error: no code received', { status: 400 });
  }

  try {
    const tokens = await getTokensFromCode(code);

    if (!tokens.refresh_token) {
      return new NextResponse(
        `<html><body style="font-family:sans-serif;padding:2rem;background:#0A0A0B;color:#fff">
          <h2 style="color:#ef4444">No se recibió refresh_token</h2>
          <p>Google solo entrega el refresh_token la primera vez. Revoca el acceso en
          <a href="https://myaccount.google.com/permissions" style="color:#D4A017">myaccount.google.com/permissions</a>
          y vuelve a intentarlo.</p>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    return new NextResponse(
      `<html><body style="font-family:sans-serif;padding:2rem;background:#0A0A0B;color:#fff">
        <h2 style="color:#22c55e">Refresh token obtenido</h2>
        <p style="color:#a8a29e;margin-bottom:1rem">Copia este valor y agrégalo a <code style="color:#D4A017">.env.local</code> como <code style="color:#D4A017">GOOGLE_REFRESH_TOKEN</code>:</p>
        <div style="background:#111113;border:1px solid #333;padding:1rem;border-radius:8px;word-break:break-all;font-family:monospace;font-size:0.85rem;color:#F2CB51">
          ${tokens.refresh_token}
        </div>
        <p style="color:#6b7280;margin-top:1.5rem;font-size:0.85rem">Después de agregar el token al .env.local, reinicia el servidor.</p>
      </body></html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new NextResponse(`Error: ${msg}`, { status: 500 });
  }
}
