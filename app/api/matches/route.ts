import { NextRequest, NextResponse } from 'next/server';
import { findMatches, createMatch } from '@/lib/matcher';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'userId required' },
      { status: 400 }
    );
  }

  try {
    const matches = await findMatches(parseInt(userId));
    
    return NextResponse.json({
      success: true,
      matches: matches.map(m => ({
        id: m.user.id,
        name: m.user.name,
        age: m.user.age,
        score: Math.round(m.score * 100),
        reasoning: m.reasoning,
        proposedDate: m.proposedDate
      }))
    });
  } catch (error) {
    console.error('Matching error:', error);
    return NextResponse.json(
      { error: 'Could not find matches' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, matchId, action } = await request.json();

    if (!userId || !matchId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (action === 'accept') {
      // Get match details to calculate score
      const matches = await findMatches(userId);
      const match = matches.find(m => m.user.id === matchId);
      
      if (!match) {
        return NextResponse.json(
          { error: 'Match not found' },
          { status: 404 }
        );
      }

      // Create match in database
      const matchDbId = await createMatch(
        userId,
        matchId,
        match.score,
        match.reasoning
      );

      return NextResponse.json({
        success: true,
        message: 'Match accepted! We\'ll notify them.',
        matchId: matchDbId
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Match action error:', error);
    return NextResponse.json(
      { error: 'Could not process action' },
      { status: 500 }
    );
  }
}
