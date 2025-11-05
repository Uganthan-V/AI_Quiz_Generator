// // src/components/OptionButton.tsx
// import { cn } from '../utils/cn';

// interface OptionButtonProps {
//   option: string;
//   correct: string;
//   selected: boolean;
//   disabled: boolean;
//   onSelect: () => void;
// }

// export default function OptionButton({
//   option,
//   correct,
//   selected,
//   disabled,
//   onSelect,
// }: OptionButtonProps) {
//   const isCorrect = selected && option === correct;
//   const isIncorrect = selected && option !== correct;

//   return (
//     <button
//       onClick={onSelect}
//       disabled={disabled}
//       className={cn(
//         'w-full text-left p-3 rounded-lg border transition-all duration-300',
//         'hover:bg-gray-50 disabled:cursor-not-allowed',
//         selected
//           ? isCorrect
//             ? 'bg-green-100 border-green-500 text-green-800'
//             : 'bg-red-100 border-red-500 text-red-800'
//           : 'border-gray-300 bg-white'
//       )}
//     >
//       {option}
//       {isCorrect && ' Correct'}
//       {isIncorrect && ' Incorrect'}
//     </button>
//   );
// }


// src/components/OptionButton.tsx
interface OptionButtonProps {
  option: string;
  correct: string;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}

export default function OptionButton({
  option,
  correct,
  selected,
  disabled,
  onSelect,
}: OptionButtonProps) {
  const isCorrect = selected && option === correct;
  const isIncorrect = selected && option !== correct;

  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`option-button ${
        isCorrect ? 'option-correct' : isIncorrect ? 'option-incorrect' : ''
      }`}
    >
      {option}
    </button>
  );
}