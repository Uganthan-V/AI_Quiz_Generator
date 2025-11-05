// src/components/ApiKeyManager.tsx
import { useState, useEffect } from 'react';
import { saveApiKey, getApiKey, deleteApiKey } from '../utils/storage';

interface ApiKeyManagerProps {
  onKeySaved: () => void;
}

export default function ApiKeyManager({ onKeySaved }: ApiKeyManagerProps) {
  const [key, setKey] = useState('');
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const stored = getApiKey();
    setSavedKey(stored);
    if (!stored) setShowInput(true);
  }, []);

  const handleSave = () => {
    if (key.trim()) {
      saveApiKey(key);
      setSavedKey(key);
      setKey('');
      setShowInput(false);
      onKeySaved();
    }
  };

  const handleDelete = () => {
    deleteApiKey();
    setSavedKey(null);
    setShowInput(true);
  };

  const maskedKey = savedKey ? '•'.repeat(12) + savedKey.slice(-4) : '';

  return (
    <div className="flex items-center gap-2">
      {savedKey && !showInput ? (
        <>
          <span className="text-sm text-gray-600">API Key: {maskedKey}</span>
          <button
            onClick={() => setShowInput(true)}
            className="text-xs text-blue-600 hover:underline"
          >
            Change
          </button>
          <button
            onClick={handleDelete}
            className="text-xs text-red-600 hover:underline"
          >
            Delete
          </button>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter Gemini API Key"
            className="px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
          {savedKey && (
            <button
              onClick={() => setShowInput(false)}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}