import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('google_access_token');
  return NextResponse.json({ authenticated: !!token?.value });
}
