import React, { useState, useEffect, useCallback } from 'react';
import huggingFaceService from '../../services/huggingFaceService';
import speechService from '../../services/speechService';
import audioService from '../../services/audioService';
import DSAVisualizer from './DSAVisualizer';
import Quiz from './Quiz';
import './StoryViewer.css';

const StoryViewer = ({ userPreferences, currentTopic }) => {
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [backgroundSound, setBackgroundSound] = useState('');
  const [isVisualizerPlaying, setIsVisualizerPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.3);

  const generateStory = useCallback(async () => {
    if (!userPreferences || !currentTopic) return;

    setIsLoading(true);
    setError('');
    
    try {
      const prompt = huggingFaceService.createPrompt(userPreferences, currentTopic);
      const generatedStory = await huggingFaceService.generateStory(prompt, userPreferences, currentTopic);
      setStory(generatedStory);
    } catch (err) {
      console.error('Story generation error:', err);
      setStory(getFallbackStory());
    } finally {
      setIsLoading(false);
    }
  }, [userPreferences, currentTopic]);

  const getFallbackStory = () => {
    const fallbackStories = {
      arrays: `In the ${userPreferences.theme} Kingdom of Data, you discover an ancient treasure vault with numbered chests lined up in perfect order. Each chest has a unique index number, making it incredibly easy to find any treasure instantly! 

The Elder explains: "Arrays are like these numbered treasure chests. Want the third item? Just use index 2 (we start counting from 0). Finding items is blazingly fast - O(1) time complexity! But beware, inserting items in the middle requires shifting all subsequent chests, which takes O(n) time."

You practice: arr[0] gives you the first treasure, arr.push() adds a new chest at the end. This ${userPreferences.level} knowledge will serve you well in your ${userPreferences.theme} quest!`,

      stacks: `Deep in the ${userPreferences.theme} Tower of Computation, you encounter a magical pile of scrolls. The ancient rule is clear: "Last scroll in, first scroll out!"

The wise sage demonstrates: "This is a Stack - LIFO principle in action! Push operations add scrolls to the top (O(1)), pop operations remove from the top (O(1)). Perfect for tracking function calls, undo operations, or checking if parentheses are balanced!"

You watch in amazement as scrolls appear and disappear from the top only. "The bottom scrolls remain untouched until all above them are removed," the sage notes. Your ${userPreferences.level} mind grasps the elegant simplicity of this ${userPreferences.theme} structure.`,

      queues: `The ${userPreferences.theme} Marketplace teaches you patience and fairness. Citizens line up in an orderly queue - first come, first served!

"This is the Queue data structure," announces the market master. "FIFO - First In, First Out! Enqueue adds people at the rear (O(1)), dequeue removes from the front (O(1) with proper implementation). Essential for breadth-first search, task scheduling, and printer queues!"

You observe how the line moves naturally forward. Everyone waits their turn. No cutting allowed! This fair system becomes clear to your ${userPreferences.level} understanding in this ${userPreferences.theme} adventure.`,

      'linked-lists': `In the ${userPreferences.theme} Forest of Connections, each magical stone points to the next stone in the path. Unlike the rigid arrays, these stones can be rearranged dynamically!

The forest spirit explains: "Each node has data and a 'next' pointer. Insertion at head? O(1)! Deletion at head? O(1)! But finding the middle element requires traversing from the start - O(n). The trade-off for dynamic size!"

You trace the path: head → node1 → node2 → ... → null. Breaking and reconnecting links lets you insert or delete without moving other elements. Perfect for your ${userPreferences.level} ${userPreferences.theme} journey where flexibility matters!`,

      graphs: `The ${userPreferences.theme} world spreads before you as an interconnected web of cities, roads, and relationships. Each city is a vertex, each road an edge. This is the mighty Graph!

The cartographer reveals: "Graphs model real relationships! Social networks, maps, dependencies - all graphs! We represent them with adjacency lists or matrices. Use BFS for shortest paths, DFS for connectivity, Dijkstra's for weighted paths!"

You see nodes connected in complex patterns - cycles, multiple paths, weights. Unlike trees, graphs can have cycles! Your ${userPreferences.level} mind expands to grasp these ${userPreferences.theme} connections.`,

      trees: `Rising before you in the ${userPreferences.theme} Garden stands the Tree of Hierarchy. One root at the top, branches spreading downward, leaves at the bottom.

The gardener teaches: "Binary trees have at most 2 children per node. Binary Search Trees keep left < parent < right, enabling O(log n) search! Balanced trees maintain height, preventing worst-case O(n) degradation."

You trace the structure: root → left subtree, right subtree. Inorder traversal gives sorted data. Preorder for copying, postorder for deletion. Your ${userPreferences.level} skills grow in this ${userPreferences.theme} garden of organized data!`,

      sorting: `The ${userPreferences.theme} Library of Order overwhelms you with chaos - books scattered everywhere! But you learn the ancient sorting arts...

The librarian demonstrates: "Bubble Sort compares neighbors, O(n²) but simple. Quick Sort uses divide-and-conquer, O(n log n) average. Merge Sort is stable, O(n log n) guaranteed. Each has its place!"

You practice arranging numbers: [5,2,8,1,9]. Bubble sort bubbles large values right. Quick sort picks pivots. Merge sort splits and merges. Your ${userPreferences.level} ${userPreferences.theme} training makes you a sorting master!`,

      recursion: `In the ${userPreferences.theme} Hall of Mirrors, reflections create infinite reflections. Each mirror shows a smaller version of the same scene - this is Recursion!

The mystic explains: "A function calling itself with smaller inputs! Base case stops infinite recursion. Recursive case breaks problems down. Perfect for trees, backtracking, and divide-and-conquer!"

You compute factorial(5): 5 * factorial(4) → 4 * factorial(3) → ... → base case 1. The call stack unwinds, returning results upward. Your ${userPreferences.level} mind sees the ${userPreferences.theme} elegance of self-reference!`
    };
    
    return fallbackStories[currentTopic] || `Welcome to your ${userPreferences.theme} adventure learning ${currentTopic}! Prepare for an interactive journey through data structures and algorithms.`;
  };

  const toggleListenMode = async () => {
    if (!isListening) {
      // Start text-to-speech
      setIsSpeaking(true);
      speechService.speak(story, 1, 1, 1);
      setIsListening(true);
    } else {
      // Stop text-to-speech
      speechService.stopSpeaking();
      setIsSpeaking(false);
      setIsListening(false);
    }
  };

  const handleVoiceInput = async () => {
    if (!isRecording) {
      // Start recording
      const started = await speechService.startRecording();
      if (started) {
        setIsRecording(true);
        setTranscribedText('🎤 Listening... Speak now!');
      } else {
        setTranscribedText('❌ Could not access microphone. Please allow microphone permissions.');
      }
    } else {
      // Stop recording and transcribe
      try {
        setTranscribedText('⏳ Processing your speech...');
        const text = await speechService.stopRecording();
        
        if (text && text.trim()) {
          setTranscribedText(`✅ You said: "${text}"`);
          setIsRecording(false);
          
          // Process the transcribed text to generate a DSA story
          await generateStoryFromVoice(text);
          audioService.playSoundEffect('complete');
        } else {
          setTranscribedText('❌ Could not understand. Please try again and speak clearly.');
          setIsRecording(false);
        }
      } catch (error) {
        console.error('Voice input error:', error);
        setTranscribedText('❌ Error: ' + error.message + '. Try using Web Speech fallback or check your microphone.');
        setIsRecording(false);
      }
    }
  };

  const generateStoryFromVoice = async (voiceInput) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Extract DSA topic from voice input
      const input = voiceInput.toLowerCase();
      
      // Map common phrases to DSA topics
      const topicMapping = {
        'array': 'arrays',
        'arrays': 'arrays',
        'list': 'arrays',
        'stack': 'stacks',
        'stacks': 'stacks',
        'queue': 'queues',
        'queues': 'queues',
        'linked list': 'linked-lists',
        'linked lists': 'linked-lists',
        'tree': 'trees',
        'trees': 'trees',
        'binary tree': 'trees',
        'graph': 'graphs',
        'graphs': 'graphs',
        'sort': 'sorting',
        'sorting': 'sorting',
        'recursion': 'recursion',
        'recursive': 'recursion'
      };
      
      // Find matching topic
      let detectedTopic = null;
      for (const [keyword, topic] of Object.entries(topicMapping)) {
        if (input.includes(keyword)) {
          detectedTopic = topic;
          break;
        }
      }
      
      if (detectedTopic) {
        // Generate story for the detected topic
        const prompt = huggingFaceService.createPrompt(userPreferences, detectedTopic);
        const generatedStory = await huggingFaceService.generateStory(prompt, userPreferences, detectedTopic);
        setStory(generatedStory);
        setTranscribedText(`✅ You said: "${voiceInput}" - Teaching you about ${detectedTopic.replace('-', ' ')}!`);
      } else {
        // Use fallback story for current topic
        setStory(getFallbackStory());
        setTranscribedText(`✅ You said: "${voiceInput}" - Couldn't detect a DSA topic. Try saying: "teach me arrays", "explain stacks", "show me trees", etc.`);
      }
    } catch (err) {
      console.error('Story generation from voice error:', err);
      setStory(getFallbackStory());
      setTranscribedText(`✅ You said: "${voiceInput}" - Generated a fallback story.`);
    } finally {
      setIsLoading(false);
    }
  };

  const playBackgroundSound = (soundType) => {
    if (soundType === backgroundSound) {
      audioService.stopBackgroundMusic();
      setBackgroundSound('');
    } else {
      audioService.playBackgroundMusic(soundType, audioVolume);
      setBackgroundSound(soundType);
    }
  };

  const toggleVisualizerPlay = () => {
    setIsVisualizerPlaying(!isVisualizerPlaying);
    audioService.playSoundEffect('click');
  };

  const handleQuizComplete = (score) => {
    setShowQuiz(false);
    audioService.playSoundEffect('complete');
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setAudioVolume(newVolume);
    audioService.setVolume(newVolume);
  };

  useEffect(() => {
    generateStory();
  }, [generateStory]);

  const formatTopicName = (topic) => {
    return topic.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="story-viewer-container">
      {/* Enhanced Header Section */}
      <div className="story-header">
        <div className="topic-info">
          <div className="topic-badge-wrapper">
            <div className="topic-badge">{formatTopicName(currentTopic)}</div>
            <div className="topic-icon">🚀</div>
          </div>
          <h1>Your {userPreferences.theme} Learning Adventure</h1>
          <p className="level-indicator">
            <span className="level-badge">{userPreferences.level}</span>
            <span className="theme-badge-small">{userPreferences.theme}</span>
          </p>
        </div>
        
        <div className="action-buttons">
          <button 
            className={`btn-icon ${isListening ? 'active' : ''}`}
            onClick={toggleListenMode}
            title="Listen to Story"
          >
            <span className="icon">{isListening ? '🔊' : '🎧'}</span>
            <span className="btn-text">{isListening ? 'Speaking...' : 'Listen'}</span>
          </button>
          
          <button 
            className={`btn-icon ${isRecording ? 'recording' : ''}`}
            onClick={handleVoiceInput}
            title="Voice Input"
          >
            <span className="icon">🎤</span>
            <span className="btn-text">{isRecording ? 'Stop' : 'Voice'}</span>
          </button>
          
          <button 
            className={`btn-icon ${isVisualizerPlaying ? 'active' : ''}`}
            onClick={toggleVisualizerPlay}
            title="Auto-play visualization"
          >
            <span className="icon">{isVisualizerPlaying ? '⏸' : '▶'}</span>
            <span className="btn-text">{isVisualizerPlaying ? 'Pause' : 'Play'}</span>
          </button>
          
          <button 
            className="btn-icon btn-quiz"
            onClick={() => setShowQuiz(!showQuiz)}
            title="Take Quiz"
          >
            <span className="icon">📝</span>
            <span className="btn-text">Quiz</span>
          </button>
          
          <button 
            className="btn-icon btn-regenerate"
            onClick={generateStory}
            disabled={isLoading}
            title="Generate new story"
          >
            <span className="icon">✨</span>
            <span className="btn-text">{isLoading ? '...' : 'New'}</span>
          </button>
        </div>
      </div>

      {/* Voice Input Feedback */}
      {transcribedText && (
        <div className="transcription-box">
          <span className="icon">🎙️</span>
          <div className="transcription-content">
            <strong>Voice Input:</strong>
            <p>{transcribedText}</p>
            <small style={{ marginTop: '8px', display: 'block', opacity: 0.7, fontSize: '0.85rem' }}>
              💡 <strong>Try saying:</strong> "teach me arrays", "explain stacks", "show me trees", "tell me about graphs", "sorting algorithms", etc.
            </small>
          </div>
          <button 
            className="btn-close-transcription"
            onClick={() => setTranscribedText('')}
          >
            ✕
          </button>
        </div>
      )}

      {/* Quiz Section */}
      {showQuiz && (
        <Quiz topic={currentTopic} onComplete={handleQuizComplete} />
      )}

      {/* Split Screen: Story + Visualizer */}
      <div className="split-view-container">
        {/* Story Content Panel */}
        <div className="story-content-panel">
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner-advanced">
                <div className="spinner-inner"></div>
              </div>
              <h3>Crafting Your Story...</h3>
              <p>Weaving magic into data structures</p>
              <div className="loading-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          ) : (
            <div className="story-card-advanced">
              <div className="story-header-card">
                <div className="floating-particles">
                  <span>✨</span><span>💫</span><span>⭐</span>
                </div>
                <h2>The Tale of {formatTopicName(currentTopic)}</h2>
                <div className="story-meta">
                  <span className="theme-tag">{userPreferences.theme}</span>
                  <span className="level-tag">{userPreferences.level}</span>
                </div>
              </div>
              
              <div className="story-text-content">
                {story.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="story-paragraph">{paragraph}</p>
                ))}
              </div>
              
              {error && (
                <div className="info-note">
                  <span className="icon">💡</span>
                  Using enhanced educational content
                </div>
              )}
            </div>
          )}
        </div>

        {/* Visualizer Panel */}
        <div className="visualizer-panel">
          <DSAVisualizer 
            topic={currentTopic} 
            isPlaying={isVisualizerPlaying}
            onStepComplete={() => audioService.playSoundEffect('click')}
          />
        </div>
      </div>

      {/* Enhanced Audio Controls Section */}
      <div className="audio-section-advanced">
        <div className="audio-header">
          <h3>🎵 Immersive Audio Experience</h3>
          <div className="volume-control">
            <span className="volume-icon">🔊</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={audioVolume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
            <span className="volume-value">{Math.round(audioVolume * 100)}%</span>
          </div>
        </div>
        
        <div className="sound-grid-advanced">
          {[
            { type: 'nature', icon: '🌲', label: 'Nature', color: '#10B981' },
            { type: 'battle', icon: '⚔️', label: 'Battle', color: '#EF4444' },
            { type: 'sci-fi', icon: '🚀', label: 'Sci-Fi', color: '#3B82F6' },
            { type: 'mystery', icon: '🔮', label: 'Mystery', color: '#8B5CF6' },
            { type: 'adventure', icon: '🗺️', label: 'Adventure', color: '#F59E0B' },
            { type: 'fantasy', icon: '🧙', label: 'Fantasy', color: '#EC4899' }
          ].map(sound => (
            <button 
              key={sound.type}
              className={`sound-btn-advanced ${backgroundSound === sound.type ? 'active' : ''}`}
              onClick={() => playBackgroundSound(sound.type)}
              style={{ '--theme-color': sound.color }}
            >
              <div className="sound-icon-wrapper">
                <span className="sound-icon">{sound.icon}</span>
                {backgroundSound === sound.type && (
                  <div className="audio-wave">
                    <span></span><span></span><span></span>
                  </div>
                )}
              </div>
              <span className="sound-label">{sound.label}</span>
            </button>
          ))}
        </div>
        
        {backgroundSound && (
          <div className="current-sound-indicator">
            <div className="sound-playing-animation">
              <span></span><span></span><span></span><span></span>
            </div>
            <span className="sound-info">
              Playing <strong>{backgroundSound}</strong> ambiance
            </span>
            <button 
              className="btn-stop"
              onClick={() => {
                audioService.stopBackgroundMusic();
                setBackgroundSound('');
              }}
            >
              Stop ⏹
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;