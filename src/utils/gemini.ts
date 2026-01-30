// src/utils/gemini.ts
import { getApiKey } from './storage';

const MODEL = 'gemini-1.5-pro';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: string;
}
export interface Quiz {
  topic: string;
  questions: QuizQuestion[];
}

/* ------------------------------------------------------------------ */
/*  System prompt – identical to the one you used in the SDK version  */
/* ------------------------------------------------------------------ */
const SYSTEM_PROMPT = `You are an AI Quiz Generator. Given a topic, generate a 10–15 question multiple-choice quiz.
Each question must have exactly 4 options and one correct answer.
Return the quiz **strictly** in this JSON format (no markdown, no extra text):

{
  "topic": "<topic name>",
  "questions": [
    {
      "id": <number>,
      "question": "<question text>",
      "options": ["<opt1>", "<opt2>", "<opt3>", "<opt4>"],
      "correct": "<correct option text>"
    }
  ]
}
Only output valid JSON.`;

/* ------------------------------------------------------------------ */
/*  Public function – call this from QuizGenerator.tsx                */
/* ------------------------------------------------------------------ */
export const generateQuiz = async (topic: string): Promise<Quiz> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('API key not found');

  const url = `${GEMINI_API_URL}?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\nTopic: ${topic}` }],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',   // forces JSON
      temperature: 0.2,
      topK: 1,
      topP: 0.8,
      maxOutputTokens: 2048,
    },
    // **NO** thinkingConfig – it is not part of the public REST API
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const txt = await response.text();
    throw new Error(`Gemini 2.5 Flash API Error: ${response.status} - ${txt}`);
  }

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!raw) throw new Error('Empty response from Gemini 2.5 Flash');

  try {
    return JSON.parse(raw) as Quiz;
  } catch (e) {
    console.error('JSON parse failed – raw output:', raw);
    throw new Error('Invalid JSON from Gemini 2.5 Flash');
  }
};
