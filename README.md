# DSA Storytelling Platform

An interactive educational web application for learning Data Structures and Algorithms (DSA) through AI-powered narrative generation, real-time visualizations, and speech synthesis.

Repository: [DSA Storytelling Platform](https://github.com/CodeByPreeti/DSA)

---

## Abstract

This project presents an approach to computer science education that combines storytelling, interactive visualizations, and artificial intelligence. The platform transforms abstract DSA concepts into contextual narratives, enhancing engagement and retention through multimodal learning: text, visuals, and audio. It includes a cascade of AI providers for story generation, synchronized visualizations of algorithm steps, voice features, and an assessment layer.

---

## Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Academic Context](#academic-context)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

---

## Features

1. AI-Powered Story Generation
   - Multiple providers: Groq (Llama 3.1), Google Gemini, Hugging Face Inference API
   - Automatic fallback cascade for reliability
   - Context-aware narratives tailored to topic and skill level
   - Optional Hugging Face token support

2. Interactive Visualizations
   - Step-by-step execution views for algorithms
   - Real-time state representation for common data structures
   - Playback controls: play, pause, next, previous, reset
   - Adjustable animation speed

3. Speech and Audio
   - Text-to-speech narration with Web Speech API
   - Word-by-word highlighting synchronized with narration
   - Speech-to-text commands to request topics
   - Optional background ambient sound using Web Audio API
   - Volume and parameter controls

4. Assessment and Progress
   - Per-topic MCQs with immediate feedback and explanations
   - Score calculation and progress tracking
   - Retry and iterative learning support

5. User Experience
   - Responsive design for mobile, tablet, and desktop
   - Modern CSS animations and transitions
   - Multiple font choices and configurable themes
   - Accessibility-aware components

Supported Topics: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting Algorithms, Recursion.

---

## System Architecture

Frontend (React) with a modular component hierarchy and a service layer for AI, speech, and audio. Optional lightweight Python backend is provided for hosting or experimentation.

High-level layout:
```
┌─────────────────────────────────────────────────────┐
│                 React Application Layer             │
│  Landing → Auth → App (Router v6)                   │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│               Component Hierarchy                   │
│  Preferences → Story Viewer → Quiz                  │
│  DSA Visualizer, Progress Tracking                  │
└─────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────┐
│                   Service Layer                     │
│  AI Generation  |  Speech Service  |  Audio Service │
│  (Groq/Gemini/HF)  (TTS/ASR)          (Web Audio)   │
└─────────────────────────────────────────────────────┘
```

AI service cascade:
1. Primary: Groq API (Llama 3.1) — optimized for speed
2. Secondary: Google Gemini — balanced performance
3. Tertiary: Hugging Face Inference — fallback

---

## Tech Stack

Frontend
- React 19.2.0, React Router v6, Create React App 5.0.1
- CSS3 (custom animations), React Hooks (useState, useEffect, useCallback)
- Axios 1.13.1, Web Vitals 2.1.4

AI and Web APIs
- Groq SDK v0.34.0
- Google Generative AI v0.24.1
- Hugging Face Inference API
- Web Speech API (SpeechSynthesis, SpeechRecognition)
- Web Audio API

Testing and Tooling
- Jest, React Testing Library

Backend (optional)
- Python 3.8+, Flask/Gradio (example service)
- Hugging Face Transformers (optional experimentation)

---

## Prerequisites

System
- Node.js 16.x or higher
- npm 8.x or higher
- Memory: 4 GB minimum (8 GB recommended)
- Disk: 500 MB available
- Browser: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

Optional API Access
- Groq API key (recommended)
- Google Gemini API key (fallback)
- Hugging Face token (optional)

---

## Installation

Clone and install:
```bash
git clone https://github.com/CodeByPreeti/DSA
cd DSA
npm install
```

Verify environment:
```bash
node --version   # >= v16
npm --version    # >= v8
```

Start development server:
```bash
npm start
# Visit http://localhost:3000
```

Create a production build:
```bash
npm run build
# Output in build/
```

Run tests:
```bash
npm test
```

---

## Configuration

Use environment variables to configure API providers.

Create a .env file in the project root:
```env
# AI providers (optional but recommended for production)
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
REACT_APP_HF_TOKEN=your_huggingface_token_here
```

Notes
- Do not commit real API keys to source control.
- Some demos may function with fallbacks, but production deployments should use your own provider keys.
- When deploying to managed platforms (e.g., Vercel, Railway), set the same variables in the platform’s environment settings.

---

## Usage

1. Launch the app at http://localhost:3000
2. Log in or sign up (if authentication is enabled)
3. Set preferences (difficulty level and theme)
4. Choose a DSA topic from the dashboard
5. Learn with the story panel and synchronized visualization
6. Use playback controls to navigate algorithm steps
7. Use text-to-speech to listen to narration
8. Take quizzes and review feedback
9. Track progress and iterate as needed

Speech-to-Text
- Click the microphone button, allow microphone access, speak a topic request (for example, “teach me arrays”), then click to stop.
- The detected topic triggers generation and visualization.

Text-to-Speech
- Click the speaker button to start narration; click again to stop. Adjust voice and parameters in settings.

Background Audio
- Select a theme in the audio section, adjust volume, and toggle on/off as needed.

---

## Project Structure

```
dsa-storytelling-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── ok.png
│   ├── audio/
│   └── team/
│       ├── poonam.jpg
│       ├── preeti.png
│       ├── rohit.jpg
│       └── tamannah.png
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.js
│   │   │   └── Login.css
│   │   ├── dashboard/
│   │   │   ├── Preferences.js
│   │   │   └── Preferences.css
│   │   └── learning/
│   │       ├── AIChatBot.js
│   │       ├── AIChatBot.css
│   │       ├── DSAVisualizer.js
│   │       ├── DSAVisualizer.css
│   │       ├── StoryViewer.js
│   │       ├── StoryViewer.css
│   │       ├── StoryProgress.js
│   │       ├── StoryProgress.css
│   │       ├── Quiz.js
│   │       └── Quiz.css
│   ├── pages/
│   │   ├── LandingPage.js
│   │   ├── LandingPage.css
│   │   └── LoginPage.js
│   ├── services/
│   │   ├── audioService.js
│   │   ├── speechService.js
│   │   └── huggingFaceService.js
│   ├── styles/
│   │   └── global.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── setupTests.js
│   └── reportWebVitals.js
├── deployment/                # Optional Python backend
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
├── .env.example
├── package.json
├── package-lock.json
└── README.md
```

---

## Deployment

Vercel
```bash
npm install -g vercel
vercel
```
- Configure environment variables in Vercel Project Settings.

Netlify
```bash
npm run build
# Drag and drop the build/ folder to Netlify or use CLI
```

GitHub Pages
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to package.json:
   ```json
   {
     "homepage": "https://codebypreeti.github.io/DSA",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

Railway
- Connect the repository [CodeByPreeti/DSA](https://github.com/CodeByPreeti/DSA) to Railway.
- Railway detects the React app automatically.
- Configure environment variables if you are using your own API keys.
- Build command: `npm run build` (auto-detected)
- Start command: `npm start` (auto-detected)

---

## Academic Context

Educational Methodology
- Active learning via interactive visualizations
- Contextual learning through narratives
- Multimodal input (visual, auditory, textual)
- Immediate feedback via assessments

Research Directions
- Efficacy of narrative-based CS instruction
- Impact of multimodal learning on algorithm comprehension
- Quality and reliability of AI-generated educational content
- Engagement and learning outcome analytics

Course Integration
- Undergraduate Data Structures
- Algorithm Design and Analysis
- CS fundamentals and self-paced learning

---

## Contributing

We welcome contributions.

Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a pull request

Code Style
- Use ES6+ and React Hooks best practices
- Write meaningful commit messages
- Add comments for non-trivial logic
- Include tests where applicable

---

## Troubleshooting

Port 3000 in use
```bash
# macOS/Linux
killall -9 node

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

macOS install permissions
```bash
sudo chown -R $USER /usr/local/lib/node_modules
npm install
```

Microphone or audio not working
- Verify browser permissions and use HTTPS or localhost
- Check system audio and in-app volume sliders
- Try a different modern browser

Build fails to minify
- Refer to Create React App troubleshooting:  
  https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

- Project Repository: [DSA Storytelling Platform](https://github.com/CodeByPreeti/DSA)
- Issues: [Report a bug](https://github.com/CodeByPreeti/DSA/issues)

Made by the DSA Storytellers team.
