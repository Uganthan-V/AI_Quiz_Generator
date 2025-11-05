// src/components/QuizGenerator.tsx
import { useState } from 'react';
import { generateQuiz } from '../utils/gemini';
import type { Quiz } from '../utils/gemini';
import QuizCard from './QuizCard';

interface QuizGeneratorProps {
  onKeyMissing: () => void;
}

export default function QuizGenerator({ onKeyMissing }: QuizGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    setQuiz(null);

    try {
      const result = await generateQuiz(topic);
      setQuiz(result);
    } catch (err: any) {
      if (err.message.includes('API key')) {
        onKeyMissing();
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Enter a topic (e.g., React Hooks, Python Basics)"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Generating...' : 'Generate Quiz'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {quiz && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">{quiz.topic}</h2>
          <div className="space-y-6">
            {quiz.questions.map((q) => (
              <QuizCard key={q.id} question={q} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}