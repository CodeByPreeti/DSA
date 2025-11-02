import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Preferences from './components/dashboard/Preferences';
import StoryViewer from './components/learning/StoryViewer';
import AIChatBot from './components/learning/AIChatBot';

function App() {
  const [user, setUser] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const [currentTopic, setCurrentTopic] = useState('arrays');

  const handlePreferencesSubmit = (preferences) => {
    setUserPreferences(preferences);
    // Set initial topic based on preferences
    if (preferences.learningPath === 'complete') {
      setCurrentTopic('arrays'); // Start with arrays for complete journey
    } else if (preferences.learningPath === 'subtopic' && preferences.subtopic) {
      setCurrentTopic(preferences.subtopic);
    } else {
      setCurrentTopic('arrays'); // Default topic
    }
  };

  const handleNextTopic = () => {
    // Simple topic progression for demo
    const topics = ['arrays', 'stacks', 'queues', 'linked-lists', 'sorting', 'trees', 'graphs'];
    const currentIndex = topics.indexOf(currentTopic);
    const nextIndex = (currentIndex + 1) % topics.length;
    setCurrentTopic(topics[nextIndex]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Login Route */}
          <Route 
            path="/login" 
            element={
              !user ? (
                <LoginPage setUser={setUser} />
              ) : (
                <Navigate to="/app" replace />
              )
            } 
          />
          
          {/* Main App Route */}
          <Route
            path="/app"
            element={
              user ? (
                !userPreferences ? (
                  <Preferences onPreferencesSubmit={handlePreferencesSubmit} />
                ) : (
                  <div className="learning-dashboard">
                    <header className="app-header">
                      <div 
                        className="logo-title"
                        onClick={() => {
                          setUserPreferences(null);
                          setCurrentTopic('arrays');
                        }}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }}
                        title="Click to go back to preferences"
                      >
                        <img src="/ok.png" alt="DSA Storyteller Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                        <h1 style={{ margin: 0 }}>DSA Storyteller</h1>
                      </div>
                      <div className="user-info">
                        <span>Welcome, {user.name || user.email}</span>
                        <button onClick={() => setUserPreferences(null)}>Change Preferences</button>
                        <button onClick={() => setUser(null)}>Logout</button>
                      </div>
                    </header>
                    
                    <main className="learning-main">
                      <StoryViewer 
                        userPreferences={userPreferences} 
                        currentTopic={currentTopic} 
                      />
                      
                      <div className="navigation-controls">
                        <button className="next-topic-button" onClick={handleNextTopic}>
                          Next Topic →
                        </button>
                      </div>
                    </main>
                    
                    {/* AI ChatBot */}
                    <AIChatBot />
                  </div>
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          {/* Redirect any unknown route to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;