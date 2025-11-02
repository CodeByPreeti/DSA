# DSA Storytelling Platform# DSA Storytelling Platform# DSA Storyteller# 🚀 Interactive DSA Storytelling Platform



An interactive educational web application for learning Data Structures and Algorithms through AI-powered narrative generation, real-time visualizations, and speech synthesis.



## AbstractAn interactive educational web application for learning Data Structures and Algorithms through AI-powered narrative generation, real-time visualizations, and speech synthesis.



This project presents a novel approach to computer science education by combining storytelling methodologies with interactive visualizations and artificial intelligence. The platform transforms abstract DSA concepts into contextual narratives, enhancing student engagement and knowledge retention through multimodal learning experiences.



## Table of Contents## AbstractAn interactive Data Structures & Algorithms learning platform that transforms complex concepts into engaging stories with AI-powered narration and visualization.---



- [Features](#features)

- [System Architecture](#system-architecture)

- [Technical Stack](#technical-stack)This project presents a novel approach to computer science education by combining storytelling methodologies with interactive visualizations and artificial intelligence. The platform transforms abstract DSA concepts into contextual narratives, enhancing student engagement and knowledge retention through multimodal learning experiences.

- [Prerequisites](#prerequisites)

- [Installation](#installation)

- [Configuration](#configuration)

- [Usage](#usage)## Table of Contents## 🚀 Features## 🎉 **LATEST UPDATE: Gradio API Fixed!**

- [Project Structure](#project-structure)

- [Deployment](#deployment)

- [Academic Context](#academic-context)

- [Contributors](#contributors)- [Features](#features)

- [License](#license)

- [System Architecture](#system-architecture)

## Features

- [Technical Stack](#technical-stack)- **AI-Powered Story Generation**: Generate educational stories using Groq API with Gemini and HuggingFace fallbacks**Your app now uses proper Gradio Space integration with:**

### Core Functionality

- [Prerequisites](#prerequisites)

1. **AI-Powered Content Generation**

   - Integration with multiple AI providers (Groq, Google Gemini, HuggingFace)- [Installation](#installation)- **Interactive Learning**: Visual DSA concepts with animations and diagrams- ✅ Server-Sent Events (SSE) streaming

   - Automatic fallback mechanism for service reliability

   - Contextual story generation based on DSA concepts- [Configuration](#configuration)

   - Dynamic content adaptation to user skill level

- [Usage](#usage)- **Smart Narration**: Text-to-speech with word-by-word highlighting- ✅ HuggingFace token support (optional)

2. **Interactive Visualizations**

   - Step-by-step algorithm execution display- [Project Structure](#project-structure)

   - Real-time data structure state representation

   - Configurable animation speed and playback controls- [Deployment](#deployment)- **Customizable Experience**: 8 font choices for personalized reading- ✅ Multiple AI model fallbacks

   - Support for common DSA topics: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting Algorithms, Recursion

- [Academic Context](#academic-context)

3. **Speech Synthesis Integration**

   - Text-to-speech narration with Web Speech API- [Contributors](#contributors)- **Progress Tracking**: Quiz system to test understanding- ✅ Enhanced console logging

   - Word-by-word highlighting synchronized with audio output

   - Customizable font selection (8 font families)- [License](#license)

   - Adjustable speech parameters

- **Mobile Responsive**: Seamless experience across all devices- ✅ Faster animations

4. **Assessment System**

   - Multiple-choice questionnaires per topic## Features

   - Immediate feedback mechanism

   - Progress tracking and score calculation

   - Iterative learning support

### Core Functionality

5. **User Interface**

   - Responsive design for multiple device form factors## 🛠️ Tech Stack**📚 New Documentation:**

   - Modern CSS animations and transitions

   - Orange theme color scheme1. **AI-Powered Content Generation**

   - Accessibility-compliant components

   - Integration with multiple AI providers (Groq, Google Gemini, HuggingFace)- 📖 **[COMPLETE_SETUP.md](./COMPLETE_SETUP.md)** - Start here!

## System Architecture

   - Automatic fallback mechanism for service reliability

### Frontend Architecture

   - Contextual story generation based on DSA concepts- **Frontend**: React 19.2.0- 🔑 **[HUGGINGFACE_TOKEN_GUIDE.md](./HUGGINGFACE_TOKEN_GUIDE.md)** - Get better AI stories (2 min setup)

```

┌─────────────────────────────────────────────────────┐   - Dynamic content adaptation to user skill level

│              React Application Layer                │

│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │- **Routing**: React Router v6- ⚡ **[QUICK_FIX_GUIDE.md](./QUICK_FIX_GUIDE.md)** - Quick reference

│  │   Landing    │  │     Auth     │  │   Main    │ │

│  │     Page     │→ │  Component   │→ │    App    │ │2. **Interactive Visualizations**

│  └──────────────┘  └──────────────┘  └───────────┘ │

└─────────────────────────────────────────────────────┘   - Step-by-step algorithm execution display- **AI Services**: Groq API, Google Gemini, HuggingFace- 🔧 **[API_FIX_SUMMARY.md](./API_FIX_SUMMARY.md)** - Technical details

                          ↓

┌─────────────────────────────────────────────────────┐   - Real-time data structure state representation

│            Component Hierarchy                      │

│  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │   - Configurable animation speed and playback controls- **Speech**: Web Speech API

│  │Preferences │  │   Story    │  │     Quiz     │  │

│  │  Manager   │→ │  Viewer    │→ │   System     │  │   - Support for common DSA topics: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Sorting Algorithms, Recursion

│  └────────────┘  └────────────┘  └──────────────┘  │

└─────────────────────────────────────────────────────┘- **Styling**: Custom CSS with animations**🚀 Quick Setup:**

                          ↓

┌─────────────────────────────────────────────────────┐3. **Speech Synthesis Integration**

│              Service Layer                          │

│  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │   - Text-to-speech narration with Web Speech API1. App is running at http://localhost:3000

│  │   AI Gen   │  │   Speech   │  │    Audio     │  │

│  │  Service   │  │  Service   │  │   Service    │  │   - Word-by-word highlighting synchronized with audio output

│  └────────────┘  └────────────┘  └──────────────┘  │

└─────────────────────────────────────────────────────┘   - Customizable font selection (8 font families)## 📦 Installation2. Click "New" button to generate stories

```

   - Adjustable speech parameters

### AI Service Integration

3. **Optional**: Add HuggingFace token for better AI ([Guide](./HUGGINGFACE_TOKEN_GUIDE.md))

The application implements a cascade pattern for AI service availability:

4. **Assessment System**

1. **Primary**: Groq API (Llama 3.1 model) - Optimized for speed

2. **Secondary**: Google Gemini API - Balanced performance   - Multiple-choice questionnaires per topic```bash

3. **Tertiary**: HuggingFace Inference Providers - Fallback option

   - Immediate feedback mechanism

## Technical Stack

   - Progress tracking and score calculation# Install dependencies---

### Frontend Technologies

   - Iterative learning support

- **Framework**: React 19.2.0

- **Routing**: React Router v6npm install

- **Build Tool**: Create React App 5.0.1

- **Styling**: CSS3 with custom animations5. **User Interface**

- **State Management**: React Hooks (useState, useEffect, useCallback)

   - Responsive design for multiple device form factors# Getting Started with Create React App

### External APIs and Services

   - Modern CSS animations and transitions

- **AI Content Generation**

  - Groq SDK v0.34.0   - Dark mode color scheme# Start development server

  - Google Generative AI v0.24.1

  - HuggingFace Inference Providers API   - Accessibility-compliant components



- **Web APIs**npm start

  - Web Speech API (SpeechSynthesis, SpeechRecognition)

  - Web Audio API (audio context management)## System Architecture



### Development Dependencies



- **Testing**: Jest, React Testing Library### Frontend Architecture

- **HTTP Client**: Axios 1.13.1

- **Performance Monitoring**: Web Vitals 2.1.4# Build for production[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).



## Prerequisites```



### System Requirements┌─────────────────────────────────────────────────────┐npm run build



- **Node.js**: Version 16.x or higher│              React Application Layer                │

- **npm**: Version 8.x or higher

- **Memory**: Minimum 4GB RAM (8GB recommended)│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │```[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

- **Storage**: 500MB available disk space

- **Browser**: Modern browser with ES6+ support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)│  │   Landing    │  │     Auth     │  │   Main    │ │



### Optional Requirements│  │     Page     │→ │  Component   │→ │    App    │ │



- HuggingFace API token for enhanced AI capabilities│  └──────────────┘  └──────────────┘  └───────────┘ │

- Groq API key for optimal performance

- Google Gemini API key for backup generation└─────────────────────────────────────────────────────┘## 🌐 Deployment[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)## Available Scripts



## Installation                          ↓



### Step 1: Clone Repository┌─────────────────────────────────────────────────────┐



```bash│            Component Hierarchy                      │

git clone https://github.com/CodeByPreeti/DSA.git

cd DSA│  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │This app is ready for Railway deployment:

```

│  │Preferences │  │   Story    │  │     Quiz     │  │

### Step 2: Install Dependencies

│  │  Manager   │→ │  Viewer    │→ │   System     │  │

```bash

npm install│  └────────────┘  └────────────┘  └──────────────┘  │

```

└─────────────────────────────────────────────────────┘1. Push to GitHub repository> An immersive, interactive platform for learning Data Structures and Algorithms through storytelling, visualizations, and voice-powered features.In the project directory, you can run:

This will install all required packages listed in `package.json`.

                          ↓

### Step 3: Verify Installation

┌─────────────────────────────────────────────────────┐2. Connect Railway to your GitHub repo

```bash

node --version  # Should display v16.x or higher│              Service Layer                          │

npm --version   # Should display v8.x or higher

```│  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │3. Railway will auto-detect React and deploy



## Configuration│  │   AI Gen   │  │   Speech   │  │    Audio     │  │



### Environment Variables (Optional)│  │  Service   │  │  Service   │  │   Service    │  │4. Set environment variables if needed



The application includes embedded API keys for demonstration purposes. For production deployment, configure the following environment variables:│  └────────────┘  └────────────┘  └──────────────┘  │



```env└─────────────────────────────────────────────────────┘## 📋 Table of Contents### `npm start`

# AI Service API Keys

REACT_APP_GROQ_API_KEY=your_groq_api_key_here```

REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here

REACT_APP_HF_TOKEN=your_huggingface_token_here## 👥 Team

```

### AI Service Integration

### Railway Deployment Configuration



For Railway deployment, no environment variables are required as API keys are embedded in the application code. The app will work out of the box.

The application implements a cascade pattern for AI service availability:

**Optional**: If you want to use your own API keys, add them in Railway's environment variables section:

- `REACT_APP_GROQ_API_KEY`**MBM University - 7th Semester - Minor Project 2025**

- `REACT_APP_GEMINI_API_KEY`

- `REACT_APP_HF_TOKEN`1. **Primary**: Groq API (Llama 3.1 model) - Optimized for speed



### Obtaining API Keys2. **Secondary**: Google Gemini API - Balanced performance- [Features](#-features)Runs the app in the development mode.\



1. **Groq API**: Register at [console.groq.com](https://console.groq.com)3. **Tertiary**: HuggingFace Inference Providers - Fallback option

2. **Google Gemini**: Obtain key from [Google AI Studio](https://makersuite.google.com/app/apikey)

3. **HuggingFace**: Generate token at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)- Poonam - Developer



## Usage## Technical Stack



### Development Server- Preeti - Developer- [Tech Stack](#-tech-stack)Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



Start the development server with hot-reloading:### Frontend Technologies



```bash- Rohit - Developer

npm start

```- **Framework**: React 19.2.0



The application will be available at `http://localhost:3000`- **Routing**: React Router v6- Tamannah - Developer- [Prerequisites](#-prerequisites)



### Production Build- **Build Tool**: Create React App 5.0.1



Generate optimized production build:- **Styling**: CSS3 with custom animations



```bash- **State Management**: React Hooks (useState, useEffect, useCallback)

npm run build

```## 📄 License- [Installation](#-installation)The page will reload when you make changes.\



Output will be in the `build/` directory.### External APIs and Services



### Running Tests



Execute test suite:- **AI Content Generation**



```bash  - Groq SDK v0.34.0MIT License - Educational Project  - [Windows](#windows)You may also see any lint errors in the console.

npm test

```  - Google Generative AI v0.24.1



### Application Workflow  - HuggingFace Inference Providers API



1. **Authentication**: Access the landing page and proceed to login/signup

2. **Preferences**: Configure learning level (beginner/intermediate/advanced) and theme

3. **Topic Selection**: Choose a DSA topic from the main dashboard- **Web APIs**---  - [macOS](#macos)

4. **Learning**: Read AI-generated story with synchronized visualization

5. **Narration**: Activate text-to-speech for audio learning  - Web Speech API (SpeechSynthesis, SpeechRecognition)

6. **Assessment**: Complete quiz questions for knowledge validation

7. **Progress**: Track scores and iterate learning as needed  - Web Audio API (audio context management)



## Project Structure



```### Development DependenciesBuilt with ❤️ by Team poopreetrohitamannah  - [Linux](#linux)### `npm test`

dsa-storytelling-app/

├── public/                          # Static assets

│   ├── index.html                   # HTML entry point

│   ├── manifest.json                # PWA manifest- **Testing**: Jest, React Testing Library

│   ├── ok.png                       # Application logo

│   ├── audio/                       # Audio files- **HTTP Client**: Axios 1.13.1- [Running the Application](#-running-the-application)

│   └── team/                        # Team member images

│       ├── poonam.jpg- **Performance Monitoring**: Web Vitals 2.1.4

│       ├── preeti.png

│       ├── rohit.jpg- [Project Structure](#-project-structure)Launches the test runner in the interactive watch mode.\

│       └── tamannah.png

├── src/                             # Source code## Prerequisites

│   ├── components/                  # React components

│   │   ├── auth/                    # Authentication components- [Usage Guide](#-usage-guide)See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

│   │   │   ├── Login.js

│   │   │   └── Login.css### System Requirements

│   │   ├── dashboard/               # User dashboard

│   │   │   ├── Preferences.js- [Deployment](#-deployment)

│   │   │   └── Preferences.css

│   │   └── learning/                # Learning components- **Node.js**: Version 16.x or higher

│   │       ├── AIChatBot.js         # AI chatbot interface

│   │       ├── AIChatBot.css- **npm**: Version 8.x or higher- [Contributing](#-contributing)### `npm run build`

│   │       ├── DSAVisualizer.js     # Visualization engine

│   │       ├── DSAVisualizer.css- **Memory**: Minimum 4GB RAM (8GB recommended)

│   │       ├── StoryViewer.js       # Main learning interface

│   │       ├── StoryViewer.css- **Storage**: 500MB available disk space- [Team](#-team)

│   │       ├── StoryProgress.js     # Progress tracker

│   │       ├── StoryProgress.css- **Browser**: Modern browser with ES6+ support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

│   │       ├── Quiz.js              # Assessment component

│   │       └── Quiz.css- [License](#-license)Builds the app for production to the `build` folder.\

│   ├── pages/                       # Page components

│   │   ├── LandingPage.js           # Landing page### Optional Requirements

│   │   ├── LandingPage.css

│   │   └── LoginPage.js             # Login page wrapperIt correctly bundles React in production mode and optimizes the build for the best performance.

│   ├── services/                    # Service layer

│   │   ├── audioService.js          # Audio management- HuggingFace API token for enhanced AI capabilities

│   │   ├── speechService.js         # Speech synthesis/recognition

│   │   └── huggingFaceService.js    # AI story generation- Groq API key for optimal performance---

│   ├── styles/                      # Global styles

│   │   └── global.css- Google Gemini API key for backup generation

│   ├── App.js                       # Root component

│   ├── App.css                      # Root stylesThe build is minified and the filenames include the hashes.\

│   ├── index.js                     # Application entry

│   ├── index.css                    # Base styles## Installation

│   ├── setupTests.js                # Test configuration

│   └── reportWebVitals.js           # Performance monitoring## ✨ FeaturesYour app is ready to be deployed!

├── .env.example                     # Environment template

├── .gitignore                       # Git ignore rules### Step 1: Clone Repository

├── package.json                     # Dependencies manifest

├── package-lock.json                # Dependency lock file

└── README.md                        # Documentation

``````bash



## Deploymentgit clone https://github.com/CodeByPreeti/DSA.git### 🎓 **Interactive Learning**See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



### Railwaycd DSA



Railway deployment is straightforward as the application is pre-configured:```- **8 DSA Topics**: Arrays, Stacks, Queues, Linked Lists, Trees, Graphs, Sorting, Recursion



1. **Connect Repository**: Link your GitHub repository (https://github.com/CodeByPreeti/DSA) to Railway

2. **Auto-Detection**: Railway automatically detects React configuration

3. **Automatic Deployment**: Push to main branch triggers deployment### Step 2: Install Dependencies- **Step-by-step visualizations** with play/pause controls### `npm run eject`

4. **No Environment Variables Required**: App works with embedded API keys



**Optional Configuration**:

- Add custom domain in Railway settings```bash- **Code snippets** with syntax highlighting and explanations

- Configure environment variables for custom API keys (optional)

- Set build command: `npm run build` (auto-detected)npm install

- Set start command: `npm start` (auto-detected)

```- **Big-O complexity analysis** for each operation**Note: this is a one-way operation. Once you `eject`, you can't go back!**

### Vercel



```bash

npm install -g vercelThis will install all required packages listed in `package.json`.

vercel

```



### Netlify### Step 3: Verify Installation### 🤖 **Gen AI Powered Stories**



```bash- **FREE Hugging Face Models**: GPT-2 & TinyLlama (no API key required!)

npm run build

# Deploy build/ folder via Netlify web interface```bash- **Unique Stories Every Time**: Click "✨ New" to regenerate with different narrative

```

node --version  # Should display v16.x or higher- **Story-Related Code Comments**: Code snippets connect to story narrative

### GitHub Pages

npm --version   # Should display v8.x or higher- **Dynamic Generation**: Stories change based on your preferences and level

Add to `package.json`:

```- **Voice/Text Input**: Say or type any topic to get instant AI explanations

```json

{- **Multiple Model Fallback**: Automatically tries backup models if primary is busy

  "homepage": "https://codebypreeti.github.io/DSA",

  "scripts": {## Configuration

    "predeploy": "npm run build",

    "deploy": "gh-pages -d build"### 🎤 **Voice-Powered Interface**

  }

}### Environment Variables (Optional)- **Speech-to-Text**: Record voice commands like "teach me arrays"

```

- **Text-to-Speech**: Listen to stories narrated with adjustable voice settings

Deploy:

Create a `.env` file in the root directory for API configuration:- **IIT Madras ASR API** integration with Web Speech API fallback

```bash

npm install --save-dev gh-pages- **Voice commands** trigger automatic AI story generation for requested topics

npm run deploy

``````env



## Academic Context# AI Service API Keys (Optional - fallbacks are available)



### Educational MethodologyREACT_APP_GROQ_API_KEY=your_groq_api_key_here



This platform implements constructivist learning theory by providing:REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here### 🎵 **Immersive Audio Experience**## Learn More



- **Active Learning**: Interactive visualizations requiring user engagementREACT_APP_HF_TOKEN=your_huggingface_token_here

- **Contextual Learning**: Abstract concepts embedded in narrative contexts

- **Multimodal Input**: Visual, auditory, and textual learning channels```- **6 Dynamic Themes**: Nature 🌳, Battle ⚔️, Sci-Fi 🚀, Mystery 🔍, Adventure 🏔️, Fantasy 🧙

- **Immediate Feedback**: Real-time assessment with explanations



### Research Applications

**Note**: API keys are embedded in the application for demonstration purposes. For production deployment, use environment variables.- **Generative Background Music** using Web Audio APIYou can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Potential research areas:



- Effectiveness of narrative-based CS education

- Impact of multimodal learning on algorithm comprehension### Obtaining API Keys- **Sound Effects** for interactions (clicks, correct/wrong answers)

- AI-generated content quality assessment

- User engagement metrics in interactive learning platforms



### Course Integration1. **Groq API**: Register at [console.groq.com](https://console.groq.com)- **Volume Controls** with real-time adjustmentTo learn React, check out the [React documentation](https://reactjs.org/).



Suitable for:2. **Google Gemini**: Obtain key from [Google AI Studio](https://makersuite.google.com/app/apikey)



- Undergraduate Data Structures courses3. **HuggingFace**: Generate token at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

- Algorithm Design and Analysis modules

- Computer Science fundamentals

- Self-paced learning programs

## Usage### 📝 **Assessment System**### Code Splitting

## Contributors



### Project Team

### Development Server- **16 MCQ Questions** (2 per topic)

**MBM University - Department of Computer Science**  

**7th Semester - Minor Project 2025**



| Name | Role | Contribution |Start the development server with hot-reloading:- **Instant Feedback** with detailed explanationsThis section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

|------|------|--------------|

| Poonam | Developer | Content creation, UI components |

| Preeti | Developer | Frontend architecture, styling |

| Rohit | Developer | Backend integration, deployment |```bash- **Score Tracking** with percentage calculation

| Tamannah | Developer | Testing, documentation |

npm start

### Academic Supervision

```- **Retry & Continue** options for flexible learning### Analyzing the Bundle Size

- **Institution**: Maharaja Bir Bikram University

- **Program**: Bachelor of Computer Applications

- **Semester**: 7th Semester

- **Academic Year**: 2024-2025The application will be available at `http://localhost:3000`

- **Project Type**: Minor Project



## License

### Production Build### 🎨 **Beautiful UI/UX**This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

This project is licensed under the MIT License - suitable for educational and research purposes.



## Contact

Generate optimized production build:- **Stunning Animations**: Shimmer effects, floating particles, gradient borders

**Project Repository**: [https://github.com/CodeByPreeti/DSA](https://github.com/CodeByPreeti/DSA)



**Issues**: [https://github.com/CodeByPreeti/DSA/issues](https://github.com/CodeByPreeti/DSA/issues)

```bash- **Responsive Design**: Mobile, tablet, and desktop optimized### Making a Progressive Web App

---

npm run build

**Last Updated**: November 2025  

**MBM University - 7th Semester - Minor Project 2025**```- **Custom Loading States**: 3-ring spinner, skeleton screens




Output will be in the `build/` directory.- **Interactive Elements**: Hover effects, ripple animations, glow statesThis section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)



### Running Tests



Execute test suite:---### Advanced Configuration



```bash

npm test

```## 🛠 Tech StackThis section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)



### Application Workflow



1. **Authentication**: Access the landing page and proceed to login/signup### **Frontend**### Deployment

2. **Preferences**: Configure learning level (beginner/intermediate/advanced) and theme

3. **Topic Selection**: Choose a DSA topic from the main dashboard- **React 19.2.0** - UI Framework with functional components & hooks

4. **Learning**: Read AI-generated story with synchronized visualization

5. **Narration**: Activate text-to-speech for audio learning- **Create React App** - Build tooling and development serverThis section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

6. **Assessment**: Complete quiz questions for knowledge validation

7. **Progress**: Track scores and iterate learning as needed- **CSS3** - Modern styling with animations, gradients, and flexbox/grid



## Project Structure### `npm run build` fails to minify



```### **APIs & Services**

dsa-storytelling-app/

├── public/                          # Static assets- **IIT Madras ASR API** - Speech-to-text transcriptionThis section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

│   ├── index.html                   # HTML entry point

│   ├── manifest.json                # PWA manifest- **Web Speech API** - Text-to-speech & speech recognition fallback

│   ├── ok.png                       # Application logo- **Web Audio API** - Generative ambient music and sound effects

│   ├── audio/                       # Audio files- **MediaRecorder API** - Audio recording for voice input

│   └── team/                        # Team member images

│       ├── poonam.jpg### **Backend (Optional)**

│       ├── preeti.png- **Python 3.8+** with Flask/Gradio

│       ├── rohit.jpg- **Hugging Face Transformers** (DialoGPT-medium) for AI story generation

│       └── tamannah.png- *Note: Frontend works standalone with fallback stories*

├── src/                             # Source code

│   ├── components/                  # React components---

│   │   ├── auth/                    # Authentication components

│   │   │   ├── Login.js## 📦 Prerequisites

│   │   │   └── Login.css

│   │   ├── dashboard/               # User dashboard### **Required**

│   │   │   ├── Preferences.js- **Node.js**: v16.x or higher

│   │   │   └── Preferences.css- **npm**: v8.x or higher (comes with Node.js)

│   │   └── learning/                # Learning components

│   │       ├── AIChatBot.js         # AI chatbot interface### **Optional (for AI story generation)**

│   │       ├── AIChatBot.css- **Python**: 3.8 or higher

│   │       ├── DSAVisualizer.js     # Visualization engine- **pip**: Latest version

│   │       ├── DSAVisualizer.css

│   │       ├── StoryViewer.js       # Main learning interface### **System Requirements**

│   │       ├── StoryViewer.css- **RAM**: 4GB minimum, 8GB recommended

│   │       ├── StoryProgress.js     # Progress tracker- **Disk Space**: 500MB for dependencies

│   │       ├── StoryProgress.css- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

│   │       ├── Quiz.js              # Assessment component

│   │       └── Quiz.css---

│   ├── pages/                       # Page components

│   │   ├── LandingPage.js           # Landing page## 💻 Installation

│   │   ├── LandingPage.css

│   │   └── LoginPage.js             # Login page wrapper### **Windows**

│   ├── services/                    # Service layer

│   │   ├── audioService.js          # Audio management1. **Install Node.js**

│   │   ├── speechService.js         # Speech synthesis/recognition   - Download from [nodejs.org](https://nodejs.org/)

│   │   └── huggingFaceService.js    # AI story generation   - Run installer and follow prompts

│   ├── styles/                      # Global styles   - Verify installation:

│   │   └── global.css     ```powershell

│   ├── App.js                       # Root component     node --version

│   ├── App.css                      # Root styles     npm --version

│   ├── index.js                     # Application entry     ```

│   ├── index.css                    # Base styles

│   ├── setupTests.js                # Test configuration2. **Clone Repository**

│   └── reportWebVitals.js           # Performance monitoring   ```powershell

├── .env.example                     # Environment template   cd Downloads

├── .gitignore                       # Git ignore rules   git clone https://github.com/Rampyaaryans/Minor-Project-7th-Sem.git

├── package.json                     # Dependencies manifest   cd Minor-Project-7th-Sem

├── package-lock.json                # Dependency lock file   ```

└── README.md                        # Documentation

```3. **Install Dependencies**

   ```powershell

## Deployment   npm install

   ```

### Railway

### **macOS**

1. Connect GitHub repository to Railway

2. Railway auto-detects React configuration1. **Install Homebrew** (if not installed)

3. Deployment initiates automatically on push   ```bash

4. Application available at generated URL   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

   ```

### Vercel

2. **Install Node.js via Homebrew**

```bash   ```bash

npm install -g vercel   brew install node

vercel   ```

```   

   Or download directly from [nodejs.org](https://nodejs.org/)

### Netlify

3. **Verify Installation**

```bash   ```bash

npm run build   node --version

# Deploy build/ folder via Netlify web interface   npm --version

```   ```



### GitHub Pages4. **Clone Repository**

   ```bash

Add to `package.json`:   cd ~/Downloads

   git clone https://github.com/Rampyaaryans/Minor-Project-7th-Sem.git

```json   cd Minor-Project-7th-Sem

{   ```

  "homepage": "https://codebypreeti.github.io/DSA",

  "scripts": {5. **Install Dependencies**

    "predeploy": "npm run build",   ```bash

    "deploy": "gh-pages -d build"   npm install

  }   ```

}

```   > **Note for macOS users**: If you encounter permission errors, use:

   > ```bash

Deploy:   > sudo npm install --unsafe-perm=true --allow-root

   > ```

```bash   > Or fix npm permissions: [Fixing npm permissions](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

npm install --save-dev gh-pages

npm run deploy### **Linux (Ubuntu/Debian)**

```

1. **Install Node.js**

## Academic Context   ```bash

   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

### Educational Methodology   sudo apt-get install -y nodejs

   ```

This platform implements constructivist learning theory by providing:

2. **Verify Installation**

- **Active Learning**: Interactive visualizations requiring user engagement   ```bash

- **Contextual Learning**: Abstract concepts embedded in narrative contexts   node --version

- **Multimodal Input**: Visual, auditory, and textual learning channels   npm --version

- **Immediate Feedback**: Real-time assessment with explanations   ```



### Research Applications3. **Clone Repository**

   ```bash

Potential research areas:   cd ~/Downloads

   git clone https://github.com/Rampyaaryans/Minor-Project-7th-Sem.git

- Effectiveness of narrative-based CS education   cd Minor-Project-7th-Sem

- Impact of multimodal learning on algorithm comprehension   ```

- AI-generated content quality assessment

- User engagement metrics in interactive learning platforms4. **Install Dependencies**

   ```bash

### Course Integration   npm install

   ```

Suitable for:

---

- Undergraduate Data Structures courses

- Algorithm Design and Analysis modules## 🚀 Running the Application

- Computer Science fundamentals

- Self-paced learning programs### **Development Mode**



## Contributors#### Windows (PowerShell)

```powershell

### Project Teamnpm start

```

**MBM University - Department of Computer Science**

**7th Semester - Minor Project 2025**#### macOS / Linux (Terminal)

```bash

| Name | Role | Contribution |npm start

|------|------|--------------|```

| Poonam | Developer | Content creation, UI components |

| Preeti | Developer | Frontend architecture, styling |The app will automatically open at [http://localhost:3000](http://localhost:3000)

| Rohit | Developer | Backend integration, deployment |

| Tamannah | Developer | Testing, documentation |> **Note**: The development server supports hot-reloading. Changes to source files will automatically refresh the browser.



### Academic Supervision### **Production Build**



- **Institution**: Maharaja Bir Bikram University1. **Create optimized build**

- **Program**: Bachelor of Computer Applications   ```bash

- **Semester**: 7th Semester   npm run build

- **Academic Year**: 2024-2025   ```

- **Project Type**: Minor Project

2. **Serve production build locally** (install serve first)

## License   ```bash

   npm install -g serve

This project is licensed under the MIT License. See LICENSE file for details.   serve -s build -p 3000

   ```

## References

### **Running Backend (Optional - for AI Stories)**

1. React Documentation: [https://react.dev](https://react.dev)

2. Web Speech API: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)1. **Navigate to deployment folder**

3. HuggingFace Transformers: [https://huggingface.co/docs](https://huggingface.co/docs)   ```bash

4. Groq API Documentation: [https://console.groq.com/docs](https://console.groq.com/docs)   cd deployment

   ```

## Contact

2. **Install Python dependencies**

**Repository**: [https://github.com/CodeByPreeti/DSA](https://github.com/CodeByPreeti/DSA)   ```bash

   # macOS/Linux

**Issues**: [https://github.com/CodeByPreeti/DSA/issues](https://github.com/CodeByPreeti/DSA/issues)   pip3 install -r requirements.txt

   

---   # Windows

   pip install -r requirements.txt

**Last Updated**: November 2025   ```


3. **Run the server**
   ```bash
   # macOS/Linux
   python3 app.py
   
   # Windows
   python app.py
   ```

---

## 📁 Project Structure

```
dsa-storytelling-app/
├── public/
│   ├── index.html          # HTML template
│   ├── manifest.json       # PWA manifest
│   └── audio/              # Audio assets folder
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.js    # Authentication component
│   │   │   └── Login.css
│   │   ├── dashboard/
│   │   │   ├── Preferences.js   # User preferences
│   │   │   └── Preferences.css
│   │   └── learning/
│   │       ├── DSAVisualizer.js      # Interactive visualizations
│   │       ├── DSAVisualizer.css
│   │       ├── StoryViewer.js        # Main learning interface
│   │       ├── StoryViewer.css
│   │       ├── Quiz.js               # MCQ assessment
│   │       └── Quiz.css
│   ├── pages/
│   │   └── LoginPage.js    # Login page wrapper
│   ├── services/
│   │   ├── audioService.js          # Web Audio API service
│   │   ├── speechService.js         # Speech-to-text & TTS
│   │   └── huggingFaceService.js    # Story generation
│   ├── styles/
│   │   └── global.css      # Global styles
│   ├── App.js              # Root component
│   ├── App.css
│   └── index.js            # Entry point
├── deployment/
│   ├── app.py              # Python backend (optional)
│   ├── requirements.txt    # Python dependencies
│   └── README.md
├── package.json            # npm dependencies
├── .gitignore
├── FEATURES.md             # Detailed feature documentation
├── IMPLEMENTATION_SUMMARY.md
└── README.md               # This file
```

---

## 📖 Usage Guide

### **Getting Started**

1. **Launch the app** at [http://localhost:3000](http://localhost:3000)
2. **Login/Signup** with your credentials
3. **Set preferences**: Choose difficulty level and theme
4. **Select a DSA topic** from the dashboard

### **Learning with Visualizations**

1. **Click a topic** (e.g., Arrays, Stacks)
2. **Read the story** in the left panel
3. **Watch visualization** in the right panel
4. **Use controls**:
   - ▶️ **Play**: Auto-advance through steps
   - ⏸ **Pause**: Stop animation
   - ⏭️ **Next**: Manual step forward
   - ⏮️ **Previous**: Step backward
   - 🔄 **Reset**: Start from beginning

### **Voice Features**

#### Speech-to-Text
1. **Click 🎤 microphone button**
2. **Allow microphone access** when prompted
3. **Speak clearly**: "teach me arrays" or "explain stacks"
4. **Click again** to stop recording
5. **View transcription** - Story auto-generates for detected topic

#### Text-to-Speech
1. **Click 🔊 speaker button**
2. **Listen** to story narration
3. **Click again** to stop

### **Background Audio**

1. **Scroll to audio section**
2. **Choose a theme**: Nature, Battle, Sci-Fi, Mystery, Adventure, Fantasy
3. **Adjust volume** with slider
4. **Click theme again** to stop

### **Taking Quizzes**

1. **Click 📝 Quiz button**
2. **Answer 2 MCQ questions** for the topic
3. **See instant feedback** (correct/incorrect with explanations)
4. **View final score** and percentage
5. **Retry** or **Continue Learning**

---

## 🌐 Deployment

### **Vercel (Recommended)**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### **Netlify**

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Drag `build/` folder** to [Netlify Drop](https://app.netlify.com/drop)

### **GitHub Pages**

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to `package.json`**
   ```json
   "homepage": "https://Rampyaaryans.github.io/Minor-Project-7th-Sem",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### **Code Style**
- Use **ES6+ syntax**
- Follow **React Hooks** best practices
- Write **meaningful commit messages**
- Add **comments** for complex logic

---

## 👥 Team

### **7th Semester Students**

| Name | Role | GitHub |
|------|------|--------|
| **Rohit** | Lead Developer & Architecture | [@Rampyaaryans](https://github.com/Rampyaaryans) |
| **Preeti** | UI/UX Design & Frontend | - |
| **Tamannah** | Backend Integration & Testing | - |
| **Poonam** | Content Creation & Documentation | - |

---

## 🐛 Troubleshooting

### **Common Issues**

#### **Port 3000 already in use**
```bash
# macOS/Linux
killall -9 node

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### **npm install fails on macOS**
```bash
sudo chown -R $USER /usr/local/lib/node_modules
npm install
```

#### **Microphone not working**
- Check browser permissions: `chrome://settings/content/microphone`
- Use HTTPS or localhost (required for Web APIs)
- Allow microphone access when prompted

#### **Audio not playing**
- Check browser audio permissions
- Increase volume slider in app
- Try different browser (Chrome recommended)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **IIT Madras** for the ASR API
- **Hugging Face** for transformer models
- **React Community** for excellent documentation
- **Web Speech API** contributors

---

## 📞 Contact

**Project Repository**: [https://github.com/Rampyaaryans/Minor-Project-7th-Sem](https://github.com/Rampyaaryans/Minor-Project-7th-Sem)

**Issues**: [Report a bug](https://github.com/Rampyaaryans/Minor-Project-7th-Sem/issues)

---

<div align="center">
  
### Made with ❤️ by Team DSA Storytellers

**🌟 Star this repo if you found it helpful! 🌟**

</div>
