import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sql = neon(process.env.POSTGRES_URL!);
    const rows = await sql`
      SELECT entropy_score as entropy, timestamp FROM file_history 
      ORDER BY timestamp ASC LIMIT 50;
    `;
    return NextResponse.json(rows);
  } catch (e) {
    console.error('history query error:', e);
    return NextResponse.json([], { status: 500 });
  }
}
