import { NextResponse } from 'next/server';
const retired = () => NextResponse.json({ error: 'Shopify commerce has been retired' }, { status: 410 });
export const GET = retired;
export const POST = retired;
export const PUT = retired;
export const PATCH = retired;
