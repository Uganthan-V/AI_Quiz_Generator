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
    <div className="api-key-container">
      {savedKey && !showInput ? (
        <>
          <span className="text-sm text-[#94a3b8]">
            API Key: <span className="font-mono">{maskedKey}</span>
          </span>
          <button
            onClick={() => setShowInput(true)}
            className="btn-change text-xs"
          >
            Change
          </button>
          <button
            onClick={handleDelete}
            className="btn-delete text-xs"
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
            className="text-sm"
            autoFocus
          />
          <button onClick={handleSave} className="btn-save text-sm">
            Save
          </button>
          {savedKey && (
            <button
              onClick={() => setShowInput(false)}
              className="text-sm text-[#94a3b8] hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}