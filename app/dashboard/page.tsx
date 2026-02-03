'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Match {
  id: number;
  name: string;
  age: number;
  score: number;
  reasoning: string;
  proposedDate?: {
    time: string;
    location: string;
  };
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setError('No user ID provided');
      setLoading(false);
      return;
    }

    fetchMatches();
  }, [userId]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/matches?userId=${userId}`);
      const data = await response.json();

      if (data.success) {
        setMatches(data.matches);
      } else {
        setError(data.error || 'Could not load matches');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (matchId: number) => {
    try {
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          matchId,
          action: 'accept'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Match accepted! 🎉 We\'ll notify them and coordinate the date.');
        // Remove accepted match from list
        setMatches(matches.filter(m => m.id !== matchId));
      } else {
        alert(data.error || 'Could not accept match');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  const handleReject = (matchId: number) => {
    // For now, just remove from UI
    setMatches(matches.filter(m => m.id !== matchId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding your matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Matches</h1>
          <p className="text-gray-600">
            Our AI analyzed compatibility and found these potential matches for you
          </p>
        </div>

        {matches.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No matches yet
            </h2>
            <p className="text-gray-600">
              We're still analyzing the pool. Check back soon, or invite friends to join!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map(match => (
              <div key={match.id} className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {match.name}, {match.age}
                    </h3>
                    <div className="mt-2">
                      <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {match.score}% Compatible
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Why this match?</h4>
                  <p className="text-gray-600">{match.reasoning}</p>
                </div>

                {match.proposedDate && (
                  <div className="bg-purple-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-700 mb-2">📅 Suggested Date</h4>
                    <p className="text-gray-600">
                      <strong>{match.proposedDate.time}</strong> at {match.proposedDate.location}
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => handleAccept(match.id)}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition"
                  >
                    ✓ Accept Date
                  </button>
                  <button
                    onClick={() => handleReject(match.id)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg transition"
                  >
                    ✗ Pass
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={fetchMatches}
            className="text-pink-600 hover:text-pink-700 font-semibold"
          >
            Refresh Matches
          </button>
        </div>
      </div>
    </div>
  );
}
