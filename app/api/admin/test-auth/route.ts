import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  const payload = token ? await verifyToken(token) : null;
  const authorized = Boolean(payload?.roles?.includes('admin'));
  return NextResponse.json(
    { authenticated: authorized },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
