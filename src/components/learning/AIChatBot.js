import React, { useState, useRef, useEffect } from 'react';
import './AIChatBot.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: '👋 Hi! I\'m your AI assistant powered by FREE AI (Groq/Gemini/HuggingFace). Ask me anything about programming, DSA, or general questions!',
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // ============================================
  // 🚀 GROQ API Configuration (Primary - Fastest)
  // ============================================
  const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY || '';
  const groqClient = GROQ_API_KEY ? new Groq({ 
    apiKey: GROQ_API_KEY,
    dangerouslyAllowBrowser: true 
  }) : null;
  
  // ============================================
  // 🤖 GEMINI API Configuration (Fallback)
  // ============================================
  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';
  const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
  
  // ============================================
  // 🔧 HUGGINGFACE Configuration (Backup)
  // ============================================
  const HF_TOKEN = process.env.REACT_APP_HF_TOKEN || '';
  const GRADIO_ENDPOINT = 'https://aaryan17-mistralai-mistral-7b-instruct-v0-2.hf.space';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const callMistralAPI = async (userQuestion) => {
    try {
      setApiStatus('🔗 Connecting to Gradio Space (Mistral-7B)...');
      
      const prompt = `[INST] ${userQuestion} [/INST]`;
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (HF_TOKEN) {
        headers['Authorization'] = `Bearer ${HF_TOKEN}`;
        setApiStatus('🔑 Using HuggingFace token...');
      }

      console.log('🚀 Sending request to:', GRADIO_ENDPOINT);
      console.log('📝 Question:', userQuestion);

      // Step 1: Initiate prediction
      const callResponse = await fetch(`${GRADIO_ENDPOINT}/call/predict`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          data: [prompt]
        }),
        signal: AbortSignal.timeout(45000)
      });

      if (!callResponse.ok) {
        throw new Error(`API Error: ${callResponse.status} - ${callResponse.statusText}`);
      }

      const callResult = await callResponse.json();
      const eventId = callResult.event_id;
      
      console.log('✅ Request sent! Event ID:', eventId);
      setApiStatus('⏳ Waiting for AI response...');

      // Step 2: Get the result via SSE
      const statusResponse = await fetch(`${GRADIO_ENDPOINT}/call/predict/${eventId}`, {
        method: 'GET',
        headers: headers,
        signal: AbortSignal.timeout(45000)
      });

      if (!statusResponse.ok) {
        throw new Error(`Status Error: ${statusResponse.status}`);
      }

      const reader = statusResponse.body.getReader();
      const decoder = new TextDecoder();
      let generatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.msg === 'process_completed' && data.output?.data) {
                generatedText = data.output.data[0];
                console.log('✅ AI Response received:', generatedText);
                setApiStatus('✅ Response received!');
                break;
              }
              
              if (data.msg === 'process_generating') {
                setApiStatus('🤖 AI is thinking...');
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
        
        if (generatedText) break;
      }

      if (generatedText && generatedText.length > 0) {
        // Clean up the response
        generatedText = generatedText.replace(/\[INST\].*?\[\/INST\]/gs, '').trim();
        return generatedText;
      } else {
        throw new Error('No response generated');
      }

    } catch (error) {
      console.error('❌ API Error:', error);
      setApiStatus('❌ Error occurred');
      throw error;
    }
  };

  // ============================================
  // 🚀 GROQ API CALL (Primary - Fastest)
  // ============================================
  const callGroqAPI = async (userQuestion) => {
    try {
      setApiStatus('🚀 Asking Groq (Llama 3.1)...');
      
      if (!groqClient) {
        throw new Error('Groq API key not configured - Get FREE key at: https://console.groq.com');
      }

      console.log('🚀 Calling Groq API...');
      const completion = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant specializing in programming, data structures, algorithms, and software development. Provide clear, concise, and accurate answers.'
          },
          {
            role: 'user',
            content: userQuestion
          }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.7,
        max_tokens: 800,
        top_p: 0.9
      });
      
      const generatedText = completion.choices[0]?.message?.content;
      
      if (!generatedText) {
        throw new Error('No response generated');
      }
      
      console.log('✅ Groq Response received');
      setApiStatus('✅ Response from Groq!');
      
      return generatedText;

    } catch (error) {
      console.error('❌ Groq API Error:', error);
      setApiStatus('❌ Groq failed');
      throw error;
    }
  };

  const callGeminiAPI = async (userQuestion) => {
    try {
      setApiStatus('🤖 Trying Gemini 1.5 Flash...');
      
      if (!genAI) {
        throw new Error('Gemini API key not configured');
      }

      console.log('🤖 Calling Google Gemini Pro API...');
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-pro',
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
        ],
      });
      
      console.log('📤 Sending question to Gemini:', userQuestion);
      const result = await model.generateContent(userQuestion);
      const response = await result.response;
      
      // Check if blocked
      if (!response || response.promptFeedback?.blockReason) {
        throw new Error(`Content blocked: ${response.promptFeedback?.blockReason || 'Unknown'}`);
      }
      
      const generatedText = response.text();
      
      console.log('✅ Gemini Response received:', generatedText.substring(0, 100) + '...');
      setApiStatus('✅ Response from Gemini!');
      
      return generatedText;
    } catch (error) {
      console.error('❌ Gemini API Error:', error);
      console.error('❌ Full error:', {
        message: error.message,
        name: error.name,
        status: error.status
      });
      setApiStatus('❌ Gemini Error');
      throw error;
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      text: inputText.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setApiStatus('');

    try {
      let response;
      let apiUsed;
      
      console.log('🚀 AI Request started...');
      console.log('📊 Available APIs:');
      console.log('   - Groq:', groqClient ? '✅' : '❌');
      console.log('   - Gemini:', genAI ? '✅' : '❌');
      console.log('   - HuggingFace Token:', HF_TOKEN ? '✅' : '❌');
      
      // ============================================
      // PRIORITY 1: Try Groq (Fastest)
      // ============================================
      if (groqClient) {
        try {
          console.log('🚀 [1/2] Attempting Groq API call...');
          response = await callGroqAPI(userMessage.text);
          apiUsed = 'Groq - Llama 3.1 8B';
          console.log('✅ Groq succeeded!');
        } catch (groqError) {
          console.error('❌ Groq failed:', groqError.message);
        }
      } else {
        console.log('ℹ️ [1/2] Groq not configured - Get FREE key at: https://console.groq.com');
      }
      
      // ============================================
      // PRIORITY 2: Try Gemini (Fallback)
      // ============================================
      if (!response && genAI) {
        try {
          console.log('🤖 [2/2] Attempting Gemini API call...');
          response = await callGeminiAPI(userMessage.text);
          apiUsed = 'Google Gemini Pro';
          console.log('✅ Gemini succeeded!');
        } catch (geminiError) {
          console.error('❌ Gemini failed:', geminiError.message);
        }
      } else if (!response) {
        console.log('ℹ️ [2/2] Gemini not configured');
      }
      
      // ============================================
      // No API worked
      // ============================================
      if (!response) {
        throw new Error('All AI services failed or not configured. Please add at least one API key:\n\n' +
          '🚀 Groq (Recommended): https://console.groq.com/keys\n' +
          '🤖 Gemini: https://makersuite.google.com/app/apikey\n\n' +
          'Add keys to .env file as:\n' +
          'REACT_APP_GROQ_API_KEY=your_key\n' +
          'REACT_APP_GEMINI_API_KEY=your_key');
      }
      
      const botMessage = {
        type: 'bot',
        text: response,
        timestamp: Date.now(),
        apiUsed
      };

      setMessages(prev => [...prev, botMessage]);
      setApiStatus('');
    } catch (error) {
      console.error('❌ Final error caught in handleSend:', error);
      
      const errorMessage = {
        type: 'bot',
        text: `❌ ${error.message}`,
        timestamp: Date.now(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      setApiStatus('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setApiStatus('');
  };

  return (
    <>
      {/* Floating Logo Button */}
      <button 
        className={`chat-float-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        title="AI Chat Assistant"
      >
        <img src="/ok.png" alt="AI Assistant" className="chat-logo" />
        {!isOpen && <span className="pulse-ring"></span>}
      </button>

      {/* Expandable Chat Box */}
      <div className={`chat-container ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-left">
            <img src="/ok.png" alt="AI" className="chat-header-logo" />
            <div className="chat-header-info">
              <h3>AI Assistant</h3>
              <p className="api-indicator">
                <span className="status-dot"></span>
                Ready to help
              </p>
            </div>
          </div>
          <button className="chat-close-btn" onClick={toggleChat}>✕</button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type} ${msg.isError ? 'error' : ''}`}>
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              {apiStatus && <div className="api-status">{apiStatus}</div>}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Ask me anything... (e.g., 'Explain binary search', 'What is recursion?')"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            rows="1"
          />
          <button 
            className="chat-send-btn"
            onClick={handleSend}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? '⏳' : '🚀'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AIChatBot;
