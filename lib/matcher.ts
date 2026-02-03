import db from './db';

// We'll use fetch to call Anthropic API directly
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  looking_for: string;
  city: string;
  questionnaire_data: string;
}

interface MatchResult {
  compatible: boolean;
  score: number;
  reasoning: string;
  proposedDate?: {
    time: string;
    location: string;
  };
}

export async function findMatches(userId: number): Promise<any[]> {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as User;
  
  if (!user) {
    throw new Error('User not found');
  }

  // Find potential matches (opposite gender/preference, same city, not already matched)
  const potentials = db.prepare(`
    SELECT * FROM users 
    WHERE id != ? 
    AND city = ?
    AND gender = ?
    AND active = 1
    AND id NOT IN (
      SELECT user2_id FROM matches WHERE user1_id = ? AND status != 'rejected'
      UNION
      SELECT user1_id FROM matches WHERE user2_id = ? AND status != 'rejected'
    )
    LIMIT 10
  `).all(userId, user.city, user.looking_for, userId, userId) as User[];

  const matches = [];

  for (const potential of potentials) {
    const result = await analyzeCompatibility(user, potential);
    
    if (result.compatible && result.score > 0.6) {
      matches.push({
        user: potential,
        score: result.score,
        reasoning: result.reasoning,
        proposedDate: result.proposedDate
      });
    }
  }

  // Sort by score
  matches.sort((a, b) => b.score - a.score);

  return matches.slice(0, 3);
}

async function analyzeCompatibility(user1: User, user2: User): Promise<MatchResult> {
  const answers1 = JSON.parse(user1.questionnaire_data);
  const answers2 = JSON.parse(user2.questionnaire_data);

  const prompt = `You are an expert relationship matchmaker. Analyze these two people and determine if they would be compatible for dating.

Person A (${user1.name}, ${user1.age}):
${JSON.stringify(answers1, null, 2)}

Person B (${user2.name}, ${user2.age}):
${JSON.stringify(answers2, null, 2)}

Analyze:
1. Value alignment (life goals, priorities)
2. Communication & conflict styles compatibility
3. Lifestyle compatibility (energy levels, routines)
4. Dealbreakers (any red flags?)
5. Chemistry indicators (humor match, romance styles)

Respond in JSON format:
{
  "compatible": true/false,
  "score": 0.0-1.0,
  "reasoning": "2-3 sentence explanation of why they match (or don't)",
  "proposedDate": {
    "time": "Friday 7pm" (suggest a time),
    "location": "Casual cafe near downtown" (suggest venue type)
  }
}

Be thoughtful and consider deep compatibility, not just surface-level similarities. Sometimes opposites attract if values align.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    const content = data.content?.[0];
    
    if (content?.type === 'text') {
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }

    // Fallback
    return {
      compatible: false,
      score: 0,
      reasoning: 'Could not analyze compatibility'
    };
  } catch (error) {
    console.error('Error analyzing compatibility:', error);
    return {
      compatible: false,
      score: 0,
      reasoning: 'Error in analysis'
    };
  }
}

export async function createMatch(user1Id: number, user2Id: number, score: number, reasoning: string) {
  const stmt = db.prepare(`
    INSERT INTO matches (user1_id, user2_id, compatibility_score, ai_reasoning, status)
    VALUES (?, ?, ?, ?, 'proposed')
  `);
  
  const result = stmt.run(user1Id, user2Id, score, reasoning);
  return result.lastInsertRowid;
}
