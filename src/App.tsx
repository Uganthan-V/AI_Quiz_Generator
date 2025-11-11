// src/App.tsx
import { useState } from 'react';
import ApiKeyManager from './components/ApiKeyManager';
import QuizGenerator from './components/QuizGenerator';
import './App.css'; // <-- Make sure this is imported

export default function App() {
  const [showKeyInput, setShowKeyInput] = useState(false);

  const handleKeyMissing = () => {
    setShowKeyInput(true);
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="app max-w-4xl mx-auto">
        <header className="header">
          <h1>AI Quiz Generator</h1>
          <div className="api-key-container">
            <ApiKeyManager onKeySaved={() => setShowKeyInput(false)} />
          </div>
        </header>

        <main className="quiz-generator">
          {showKeyInput ? (
            <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#333] text-center">
              <p className="text-lg mb-4 text-[#e0e0e0]">
                Please enter your Gemini API key to continue.
              </p>
              <ApiKeyManager onKeySaved={() => setShowKeyInput(false)} />
            </div>
          ) : (
            <QuizGenerator onKeyMissing={handleKeyMissing} />
          )}
        </main>
      </div>
    </div>
  );
}