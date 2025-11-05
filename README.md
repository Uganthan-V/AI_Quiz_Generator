# 🧠 AI Quiz Generator

An AI-powered quiz generator built using **React**, **TypeScript**, and **Vite**.  
This app allows users to generate intelligent quizzes with 10–15 multiple-choice questions using their own **Gemini API key**.  

## 🚀 Features

- ⚙️ **User-provided Gemini API key** — no internal keys used  
- 💾 **Local storage** — API key persists even after refresh  
- 🧩 **Dynamic Quiz Generation** — automatically creates quiz questions and options  
- ✅ **Interactive Quiz UI** — click to select and validate answers  
- ⚡ Built with **React + TypeScript + Vite** for fast performance and clean architecture

---

## 🧱 Project Structure

AI_Quiz_Generator-main/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── ApiKeyManager.tsx     # Manages API key input and local storage
│   │   ├── OptionButton.tsx      # Handles user option selection
│   │   ├── QuizCard.tsx          # Displays question and options
│   │   └── QuizGenerator.tsx     # Calls Gemini API and renders quiz
│   ├── utils/
│   │   ├── gemini.ts             # Handles API communication
│   │   └── storage.ts            # Provides local storage utility functions
│   ├── App.tsx                   # Main app structure
│   ├── App.css                   # App styling
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
git clone https://github.com/yourusername/AI_Quiz_Generator.git
cd AI_Quiz_Generator-main

### 2. Install Dependencies
npm install

### 3. Run the Development Server
npm run dev

Visit http://localhost:5173 in your browser.

---

## 🔑 Usage

1. Enter your **Gemini API key** in the input field (the key will be saved locally).  
2. Click **"Generate Quiz"** to fetch 10–15 AI-generated questions.  
3. Select answers to test your knowledge.  
4. The key remains stored even after page reload.

---

## ⚙️ Tech Stack

- **Frontend:** React + TypeScript  
- **Build Tool:** Vite  
- **API:** Gemini AI (via user-provided key)  
- **Storage:** Local Storage (browser-based persistence)

---

## 📸 Preview

(Add screenshot or demo GIF here if available)

---

## 🤝 Contributing

Pull requests are welcome!  
If you have suggestions or improvements, feel free to fork the repo and submit a PR.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Ugandhan V**  
AI & ML Developer | 5th Sem CSE (AI)  
✨ “Building intelligent and interactive apps with purpose.”
