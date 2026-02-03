import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const matches = db.prepare(`
      SELECT 
        m.*,
        u1.name as user1_name,
        u2.name as user2_name
      FROM matches m
      JOIN users u1 ON m.user1_id = u1.id
      JOIN users u2 ON m.user2_id = u2.id
      ORDER BY m.created_at DESC
    `).all();

    return NextResponse.json({ success: true, matches });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { error: 'Could not fetch matches' },
      { status: 500 }
    );
  }
}
