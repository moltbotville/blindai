import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const users = db.prepare(`
      SELECT id, email, name, age, gender, looking_for, city, created_at, active
      FROM users
      ORDER BY created_at DESC
    `).all();

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Could not fetch users' },
      { status: 500 }
    );
  }
}
