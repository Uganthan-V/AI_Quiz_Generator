// // src/components/QuizGenerator.tsx
// import { useState } from 'react';
// import { generateQuiz } from '../utils/gemini';
// import type { Quiz } from '../utils/gemini';
// import QuizCard from './QuizCard';

// interface QuizGeneratorProps {
//   onKeyMissing: () => void;
// }

// export default function QuizGenerator({ onKeyMissing }: QuizGeneratorProps) {
//   const [topic, setTopic] = useState('');
//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleGenerate = async () => {
//     if (!topic.trim()) return;

//     setLoading(true);
//     setError('');
//     setQuiz(null);

//     try {
//       const result = await generateQuiz(topic);
//       setQuiz(result);
//     } catch (err: any) {
//       if (err.message.includes('API key')) {
//         onKeyMissing();
//       } else {
//         setError(err.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//   <div className="space-y-6">
//     <div className="topic-input-group">
//       <input
//         type="text"
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//         onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
//         placeholder="Enter a topic (e.g., React Hooks, Python Basics)"
//         disabled={loading}
//       />
//       <button
//         onClick={handleGenerate}
//         disabled={loading || !topic.trim()}
//       >
//         {loading ? 'Generating...' : 'Generate Quiz'}
//       </button>
//     </div>

//     {error && <div className="error-message">{error}</div>}

//     {quiz && (
//       <div className="quiz-container">
//         <h2 className="quiz-title">{quiz.topic}</h2>
//         <div className="space-y-6">
//           {quiz.questions.map((q) => (
//             <QuizCard key={q.id} question={q} />
//           ))}
//         </div>
//       </div>
//     )}
//   </div>
// );
// }

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
      <div className="topic-input-group">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Enter a topic (e.g., React Hooks, Python Basics)"
          disabled={loading}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
        >
          {loading ? 'Generating...' : 'Generate Quiz'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {quiz && (
        <div className="quiz-container">
          <h2 className="quiz-title">{quiz.topic}</h2>
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