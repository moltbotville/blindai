import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  age: z.number().min(18).max(99),
  gender: z.enum(['male', 'female', 'non-binary']),
  lookingFor: z.enum(['male', 'female', 'any']),
  city: z.string().min(2),
  answers: z.record(z.string(), z.any())
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = signupSchema.parse(body);

    // Check if email already exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(data.email);
    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Insert user
    const stmt = db.prepare(`
      INSERT INTO users (email, name, age, gender, looking_for, city, questionnaire_data)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.email,
      data.name,
      data.age,
      data.gender,
      data.lookingFor,
      data.city,
      JSON.stringify(data.answers)
    );

    return NextResponse.json({
      success: true,
      userId: result.lastInsertRowid,
      message: 'Welcome to BlindAI! We\'ll start finding matches for you.'
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Invalid data' },
      { status: 400 }
    );
  }
}
