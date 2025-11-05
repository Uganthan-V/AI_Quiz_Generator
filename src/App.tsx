// src/App.tsx
import { useState } from 'react';
import ApiKeyManager from './components/ApiKeyManager';
import QuizGenerator from './components/QuizGenerator';

export default function App() {
  const [showKeyInput, setShowKeyInput] = useState(false);

  const handleKeyMissing = () => {
    setShowKeyInput(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gemini Quiz Generator</h1>
          <ApiKeyManager onKeySaved={() => setShowKeyInput(false)} />
        </header>

        {showKeyInput ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <p className="text-lg mb-4">Please enter your Gemini API key to continue.</p>
            <ApiKeyManager onKeySaved={() => setShowKeyInput(false)} />
          </div>
        ) : (
          <QuizGenerator onKeyMissing={handleKeyMissing} />
        )}
      </div>
    </div>
  );
}