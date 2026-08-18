import { NextResponse } from 'next/server';
import { getRemoteFeatureFlags } from '@/app/lib/remote-flags';

// Replaces the old standalone server.js process. As a Next.js Route Handler
// this ships and runs as part of the same app on Vercel, instead of a
// separate Node server that had no equivalent in a serverless deployment.
export async function GET() {
  const data = await getRemoteFeatureFlags();

  return NextResponse.json(data, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
}
