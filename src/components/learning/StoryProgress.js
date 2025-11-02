import React, { useState, useEffect } from 'react';
import './StoryProgress.css';

const StoryProgress = ({ topic, storyData, onMilestone }) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('dsa-story-progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('dsa-story-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [readingTime, setReadingTime] = useState(0);
  const [milestone, setMilestone] = useState(null);

  const topics = [
    'arrays', 'stacks', 'queues', 'linked-lists', 
    'trees', 'graphs', 'sorting', 'recursion'
  ];

  // Track reading time
  useEffect(() => {
    const timer = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update progress
  useEffect(() => {
    if (topic && readingTime > 30) { // Mark as read after 30 seconds
      const newProgress = { ...progress };
      if (!newProgress[topic]) {
        newProgress[topic] = {
          completed: true,
          timestamp: Date.now(),
          readingTime: readingTime
        };
        
        setProgress(newProgress);
        localStorage.setItem('dsa-story-progress', JSON.stringify(newProgress));
        
        // Check milestones
        checkMilestones(newProgress);
      }
    }
  }, [topic, readingTime]);

  const checkMilestones = (currentProgress) => {
    const completedTopics = Object.keys(currentProgress).length;
    
    const milestones = [
      { count: 1, title: '🎯 First Step', message: 'You completed your first topic!' },
      { count: 3, title: '🔥 On Fire', message: 'Three topics mastered!' },
      { count: 5, title: '⭐ Rising Star', message: 'Five topics completed!' },
      { count: 8, title: '🏆 DSA Master', message: 'All topics conquered!' }
    ];

    const achievedMilestone = milestones.find(m => m.count === completedTopics);
    if (achievedMilestone) {
      setMilestone(achievedMilestone);
      if (onMilestone) onMilestone(achievedMilestone);
      setTimeout(() => setMilestone(null), 5000);
    }
  };

  const toggleBookmark = () => {
    if (!storyData) return;
    
    const bookmark = {
      topic,
      timestamp: Date.now(),
      story: storyData.story?.substring(0, 200) + '...',
      generatedBy: storyData.generatedBy
    };

    const existing = bookmarks.findIndex(b => b.topic === topic);
    let newBookmarks;
    
    if (existing >= 0) {
      newBookmarks = bookmarks.filter(b => b.topic !== topic);
    } else {
      newBookmarks = [bookmark, ...bookmarks].slice(0, 20); // Keep max 20
    }
    
    setBookmarks(newBookmarks);
    localStorage.setItem('dsa-story-bookmarks', JSON.stringify(newBookmarks));
  };

  const isBookmarked = bookmarks.some(b => b.topic === topic);
  const completionRate = Math.round((Object.keys(progress).length / topics.length) * 100);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="story-progress-container">
      {/* Milestone Notification */}
      {milestone && (
        <div className="milestone-notification">
          <div className="milestone-content">
            <div className="milestone-icon">{milestone.title.split(' ')[0]}</div>
            <div className="milestone-info">
              <h3>{milestone.title}</h3>
              <p>{milestone.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Overview */}
      <div className="progress-overview">
        <div className="progress-header">
          <h3>Your Learning Journey</h3>
          <span className="completion-badge">{completionRate}% Complete</span>
        </div>

        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${completionRate}%` }}
          >
            <span className="progress-text">{Object.keys(progress).length}/{topics.length}</span>
          </div>
        </div>

        <div className="topic-grid">
          {topics.map(t => (
            <div 
              key={t} 
              className={`topic-chip ${progress[t] ? 'completed' : ''} ${t === topic ? 'active' : ''}`}
              title={progress[t] ? `Completed ${new Date(progress[t].timestamp).toLocaleDateString()}` : 'Not yet completed'}
            >
              <span className="topic-icon">
                {progress[t] ? '✓' : '○'}
              </span>
              <span className="topic-name">
                {t.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Story Stats */}
      <div className="current-story-stats">
        <div className="stat-card">
          <span className="stat-icon">📖</span>
          <div className="stat-info">
            <span className="stat-label">Reading Time</span>
            <span className="stat-value">{formatTime(readingTime)}</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🎯</span>
          <div className="stat-info">
            <span className="stat-label">Current Topic</span>
            <span className="stat-value">{topic?.replace('-', ' ') || 'None'}</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">📚</span>
          <div className="stat-info">
            <span className="stat-label">Bookmarks</span>
            <span className="stat-value">{bookmarks.length}</span>
          </div>
        </div>

        <button 
          className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={toggleBookmark}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark this story'}
        >
          <span className="bookmark-icon">{isBookmarked ? '★' : '☆'}</span>
          <span className="bookmark-text">
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </span>
        </button>
      </div>

      {/* Bookmarks List */}
      {bookmarks.length > 0 && (
        <div className="bookmarks-section">
          <h4>📌 Your Bookmarks</h4>
          <div className="bookmarks-list">
            {bookmarks.slice(0, 5).map((bookmark, index) => (
              <div key={index} className="bookmark-item">
                <div className="bookmark-header">
                  <span className="bookmark-topic">{bookmark.topic.replace('-', ' ')}</span>
                  <span className="bookmark-date">
                    {new Date(bookmark.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="bookmark-preview">{bookmark.story}</p>
                <button 
                  className="remove-bookmark"
                  onClick={() => {
                    const newBookmarks = bookmarks.filter((_, i) => i !== index);
                    setBookmarks(newBookmarks);
                    localStorage.setItem('dsa-story-bookmarks', JSON.stringify(newBookmarks));
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Section */}
      <div className="achievements-section">
        <h4>🏅 Achievements</h4>
        <div className="achievements-grid">
          {[
            { id: 'first', count: 1, icon: '🎯', title: 'First Step', unlocked: Object.keys(progress).length >= 1 },
            { id: 'trio', count: 3, icon: '🔥', title: 'On Fire', unlocked: Object.keys(progress).length >= 3 },
            { id: 'halfway', count: 4, icon: '⚡', title: 'Halfway Hero', unlocked: Object.keys(progress).length >= 4 },
            { id: 'star', count: 5, icon: '⭐', title: 'Rising Star', unlocked: Object.keys(progress).length >= 5 },
            { id: 'almost', count: 7, icon: '🚀', title: 'Almost There', unlocked: Object.keys(progress).length >= 7 },
            { id: 'master', count: 8, icon: '🏆', title: 'DSA Master', unlocked: Object.keys(progress).length >= 8 }
          ].map(achievement => (
            <div 
              key={achievement.id} 
              className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              title={achievement.unlocked ? `Unlocked: ${achievement.title}` : `Complete ${achievement.count} topics to unlock`}
            >
              <span className="achievement-icon">{achievement.icon}</span>
              <span className="achievement-title">{achievement.title}</span>
              {achievement.unlocked && <span className="unlock-sparkle">✨</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryProgress;
