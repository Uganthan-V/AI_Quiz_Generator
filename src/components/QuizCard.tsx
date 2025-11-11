// // src/components/QuizCard.tsx
// import { useState } from 'react';
// import OptionButton from './OptionButton';
// import type { QuizQuestion } from '../utils/gemini';   // ← type-only

// interface QuizCardProps {
//   question: QuizQuestion;
// }

// export default function QuizCard({ question }: QuizCardProps) {
//   const [selected, setSelected] = useState<string | null>(null);

//   const handleSelect = (option: string) => {
//     if (selected) return;
//     setSelected(option);
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
//       <h3 className="text-lg font-semibold mb-4">
//         {question.id}. {question.question}
//       </h3>
//       <div className="space-y-3">
//         {question.options.map((opt) => (
//           <OptionButton
//             key={opt}
//             option={opt}
//             correct={question.correct}
//             selected={selected === opt}
//             disabled={!!selected}
//             onSelect={() => handleSelect(opt)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// src/components/QuizCard.tsx
import { useState } from 'react';
import OptionButton from './OptionButton';
import type { QuizQuestion } from '../utils/gemini';

interface QuizCardProps {
  question: QuizQuestion;
}

export default function QuizCard({ question }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
  };

  return (
    <div className="quiz-card">
      <h3 className="quiz-question">
        {question.id}. {question.question}
      </h3>
      <div className="space-y-3">
        {question.options.map((opt: string) => (
          <OptionButton
            key={opt}
            option={opt}
            correct={question.correct}
            selected={selected === opt}
            disabled={!!selected}
            onSelect={() => handleSelect(opt)}
          />
        ))}
      </div>
    </div>
  );
}