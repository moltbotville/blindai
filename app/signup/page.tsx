'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/lib/questionnaire';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [basicInfo, setBasicInfo] = useState({
    email: '',
    name: '',
    age: 25,
    gender: 'female',
    lookingFor: 'male',
    city: 'Helsinki'
  });

  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleBasicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1);
  };

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...basicInfo,
          answers
        })
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/dashboard?userId=${data.userId}`);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Let's get started</h1>
            
            <form onSubmit={handleBasicSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={basicInfo.email}
                  onChange={e => setBasicInfo({ ...basicInfo, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Name (first name only)</label>
                <input
                  type="text"
                  required
                  value={basicInfo.name}
                  onChange={e => setBasicInfo({ ...basicInfo, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <input
                  type="number"
                  min="18"
                  max="99"
                  required
                  value={basicInfo.age}
                  onChange={e => setBasicInfo({ ...basicInfo, age: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">I am</label>
                <select
                  value={basicInfo.gender}
                  onChange={e => setBasicInfo({ ...basicInfo, gender: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="non-binary">Non-binary</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Looking for</label>
                <select
                  value={basicInfo.lookingFor}
                  onChange={e => setBasicInfo({ ...basicInfo, lookingFor: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option value="male">Men</option>
                  <option value="female">Women</option>
                  <option value="any">Anyone</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  required
                  value={basicInfo.city}
                  onChange={e => setBasicInfo({ ...basicInfo, city: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition"
              >
                Continue to Questionnaire
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionIndex = Object.keys(answers).length;
  const isComplete = currentQuestionIndex >= questions.length;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">All done! 🎉</h1>
            <p className="text-gray-600 mb-8">
              Our AI will analyze your answers and start finding compatible matches.
            </p>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Find My Matches'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round((currentQuestionIndex / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-pink-600 h-2 rounded-full transition-all"
                style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-800">{question.question}</h2>

          {question.type === 'text' && (
            <textarea
              value={answers[question.id] || ''}
              onChange={e => handleAnswer(question.id, e.target.value)}
              placeholder={question.placeholder}
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 mb-4"
            />
          )}

          {question.type === 'select' && (
            <select
              value={answers[question.id] || ''}
              onChange={e => handleAnswer(question.id, e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 mb-4"
            >
              <option value="">Choose...</option>
              {question.options?.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}

          {question.type === 'scale' && (
            <div className="mb-4">
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={answers[question.id] || 3}
                onChange={e => handleAnswer(question.id, parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{question.labels?.[0]}</span>
                <span>{question.labels?.[1]}</span>
              </div>
            </div>
          )}

          {question.type === 'multiselect' && (
            <div className="space-y-2 mb-4">
              {question.options?.map(opt => (
                <label key={opt} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={(answers[question.id] || []).includes(opt)}
                    onChange={e => {
                      const current = answers[question.id] || [];
                      const updated = e.target.checked
                        ? [...current, opt]
                        : current.filter((v: string) => v !== opt);
                      handleAnswer(question.id, updated);
                    }}
                    className="rounded text-pink-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              if (!answers[question.id]) {
                alert('Please answer this question');
                return;
              }
              setAnswers({ ...answers });
            }}
            disabled={!answers[question.id]}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
