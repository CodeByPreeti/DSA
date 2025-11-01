import React, { useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import Preferences from './components/dashboard/Preferences';
import StoryViewer from './components/learning/StoryViewer';

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
    <div className="App">
      {!user ? (
        <LoginPage setUser={setUser} />
      ) : !userPreferences ? (
        <Preferences onPreferencesSubmit={handlePreferencesSubmit} />
      ) : (
        <div className="learning-dashboard">
          <header className="app-header">
            <h1>DSA Storyteller</h1>
            <div className="user-info">
              <span>Welcome, {user.name}</span>
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
        </div>
      )}
    </div>
  );
}

export default App;