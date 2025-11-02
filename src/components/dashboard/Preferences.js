import React, { useState } from 'react';
import './Preferences.css';

const Preferences = ({ onPreferencesSubmit }) => {
  const [preferences, setPreferences] = useState({
    theme: '',
    learningPath: '',
    level: '',
    subtopic: ''
  });

  const themes = ['adventure', 'sci-fi', 'mystery', 'fantasy'];
  const learningPaths = ['complete', 'syllabus', 'subtopic'];
  const levels = ['beginner', 'advanced'];
  const subtopics = [
    'arrays', 'queues', 'stacks', 'linked-lists', 
    'sorting', 'trees', 'graphs', 'recursion'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onPreferencesSubmit(preferences);
  };

  const handleChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="preferences-container">
      <div className="preferences-card">
        <div className="preferences-logo">
          <img src="/ok.png" alt="DSA Logo" className="preferences-logo-img" />
        </div>
        <h2 className="preferences-title">Customize Your Learning Journey</h2>
        <p className="preferences-subtitle">Tell us how you want to learn DSA</p>
        
        <form onSubmit={handleSubmit} className="preferences-form">
          {/* Story Theme Selection */}
          <div className="preference-group">
            <h3>Choose Your Story Theme</h3>
            <div className="theme-options">
              {themes.map(theme => (
                <div 
                  key={theme}
                  className={`theme-option ${preferences.theme === theme ? 'selected' : ''}`}
                  onClick={() => handleChange('theme', theme)}
                >
                  <div className={`theme-icon ${theme}`}></div>
                  <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Path Selection */}
          <div className="preference-group">
            <h3>Learning Path</h3>
            <div className="path-options">
              {learningPaths.map(path => (
                <div 
                  key={path}
                  className={`path-option ${preferences.learningPath === path ? 'selected' : ''}`}
                  onClick={() => handleChange('learningPath', path)}
                >
                  {path === 'complete' && '🚀 Complete DSA Journey'}
                  {path === 'syllabus' && '📚 Full DSA Syllabus'}
                  {path === 'subtopic' && '🎯 Specific Subtopic'}
                </div>
              ))}
            </div>
          </div>

          {/* Level Selection */}
          <div className="preference-group">
            <h3>Your Experience Level</h3>
            <div className="level-options">
              {levels.map(level => (
                <div 
                  key={level}
                  className={`level-option ${preferences.level === level ? 'selected' : ''}`}
                  onClick={() => handleChange('level', level)}
                >
                  {level === 'beginner' && '🌱 Beginner'}
                  {level === 'advanced' && '⚡ Advanced'}
                </div>
              ))}
            </div>
          </div>

          {/* Subtopic Selection (only show if not complete journey) */}
          {preferences.learningPath === 'subtopic' && (
            <div className="preference-group">
              <h3>Select DSA Topic</h3>
              <div className="subtopic-options">
                {subtopics.map(subtopic => (
                  <div 
                    key={subtopic}
                    className={`subtopic-option ${preferences.subtopic === subtopic ? 'selected' : ''}`}
                    onClick={() => handleChange('subtopic', subtopic)}
                  >
                    {subtopic.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="start-journey-button"
            disabled={!preferences.theme || !preferences.learningPath || !preferences.level}
          >
            Start Learning Adventure
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;