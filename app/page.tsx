'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Title */}
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Blind<span className="text-pink-600">AI</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl text-gray-600 mb-8">
            Stop swiping. Start dating.
          </p>

          {/* Value Props */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              AI-arranged blind dates with real chemistry
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-4">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-lg mb-2">No More Swiping</h3>
                <p className="text-gray-600">
                  Our AI analyzes deep compatibility and picks your matches
                </p>
              </div>
              
              <div className="p-4">
                <div className="text-4xl mb-3">🎭</div>
                <h3 className="font-bold text-lg mb-2">Blind Dates</h3>
                <p className="text-gray-600">
                  Meet face-to-face. No endless chatting, no profile stalking
                </p>
              </div>
              
              <div className="p-4">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="font-bold text-lg mb-2">Real Chemistry</h3>
                <p className="text-gray-600">
                  Values, communication style, and life goals — not just photos
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">How it works</h2>
            <div className="flex flex-col md:flex-row gap-4 text-left">
              <div className="flex-1 bg-white rounded-lg p-6 shadow-md">
                <div className="text-pink-600 font-bold text-lg mb-2">1. Answer Questions</div>
                <p className="text-gray-600">
                  Tell us about yourself — values, style, dealbreakers
                </p>
              </div>
              
              <div className="flex-1 bg-white rounded-lg p-6 shadow-md">
                <div className="text-pink-600 font-bold text-lg mb-2">2. AI Matches You</div>
                <p className="text-gray-600">
                  We analyze compatibility and suggest dates
                </p>
              </div>
              
              <div className="flex-1 bg-white rounded-lg p-6 shadow-md">
                <div className="text-pink-600 font-bold text-lg mb-2">3. Go On Dates</div>
                <p className="text-gray-600">
                  Accept, show up, and see if there's chemistry
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link 
            href="/signup"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            Get Started
          </Link>

          <p className="text-gray-500 mt-6 text-sm">
            Currently launching in Helsinki • More cities coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
