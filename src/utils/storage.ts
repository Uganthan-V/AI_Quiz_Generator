// src/utils/storage.ts
export const STORAGE_KEY = 'geminiApiKey';

export const saveApiKey = (key: string): void => {
  localStorage.setItem(STORAGE_KEY, key.trim());
};

export const getApiKey = (): string | null => {
  return localStorage.getItem(STORAGE_KEY);
};

export const deleteApiKey = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};