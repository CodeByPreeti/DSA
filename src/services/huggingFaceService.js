/* eslint-disable unicode-bom */
// ============================================
//  GEN AI SERVICE - FREE AI Integration
// ============================================
// Priority: Groq (fastest) → Gemini → HuggingFace Inference Providers
// All options are 100% FREE with generous limits
// Updated: Nov 2025 - Migrated to new HF Inference Providers API
// ============================================

// Import AI SDKs
import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';

class HuggingFaceService {
  constructor() {
    // ========================================
    // 🏆 GROQ API Configuration (RECOMMENDED - Fastest & Most Reliable)
    // ========================================
    // Get FREE API key from: https://console.groq.com/keys
    // Add to .env: REACT_APP_GROQ_API_KEY=your_key_here
    // Free Tier: 30 requests/minute, 14,400/day
    // Models: llama-3.1-8b-instant (fastest), mixtral-8x7b, gemma2-9b
    this.groqApiKey = process.env.REACT_APP_GROQ_API_KEY || '';
    this.groqClient = null;
    
    if (this.groqApiKey) {
      console.log('🚀 Groq API key loaded:', this.groqApiKey.substring(0, 10) + '...');
      this.groqClient = new Groq({ 
        apiKey: this.groqApiKey,
        dangerouslyAllowBrowser: true // Required for browser usage
      });
    } else {
      console.warn('⚠️ Groq API key NOT found - get FREE key at: https://console.groq.com');
    }
    
    // ========================================
    // 🤖 GOOGLE GEMINI Configuration (Fallback)
    // ========================================
    // Get FREE API key from: https://makersuite.google.com/app/apikey
    // Add to .env: REACT_APP_GEMINI_API_KEY=your_key_here
    // Free Tier: 15 requests/minute, 1500/day
    this.geminiApiKey = process.env.REACT_APP_GEMINI_API_KEY || '';
    
    if (this.geminiApiKey) {
      console.log('✅ Gemini API key loaded:', this.geminiApiKey.substring(0, 10) + '...');
      this.genAI = new GoogleGenerativeAI(this.geminiApiKey);
    } else {
      console.warn('⚠️ Gemini API key NOT found');
      this.genAI = null;
    }
    
    // ========================================
    // 🔧 HUGGINGFACE Inference Providers (Backup)
    // ========================================
    // Get FREE token from: https://huggingface.co/settings/tokens
    // Add to .env: REACT_APP_HF_TOKEN=your_token_here
    // NOTE: Migrated to new Inference Providers API (Nov 2025)
    // Old endpoint (api-inference.huggingface.co) deprecated
    // New endpoint: router.huggingface.co/hf-inference/
    this.hfToken = process.env.REACT_APP_HF_TOKEN || '';
    
    if (this.hfToken) {
      console.log('✅ HuggingFace token loaded (using new Inference Providers API)');
    }
    
    // Gradio Space (legacy - often unstable)
    this.gradioSpace = 'Aaryan17/mistralai-Mistral-7B-Instruct-v0-2';
    this.gradioAPIEndpoint = `https://aaryan17-mistralai-mistral-7b-instruct-v0-2.hf.space`;
    
    this.maxRetries = 3;
    this.timeout = 30000;
    // Updated to new Inference Providers API (November 2025)
    this.fallbackModels = [
      'https://router.huggingface.co/hf-inference/models/google/flan-t5-large',
      'https://router.huggingface.co/hf-inference/models/gpt2',
      'https://router.huggingface.co/hf-inference/models/TinyLlama/TinyLlama-1.1B-Chat-v1.0'
    ];
  }

  async generateStory(topic, preferences = {}) {
    console.log('🚀 Starting story generation for:', topic);
    console.log('📋 Available AI Services:');
    console.log('   1. Groq (Llama 3.1) -', this.groqClient ? '✅ Ready' : '❌ Not configured');
    console.log('   2. Google Gemini -', this.genAI ? '✅ Ready' : '❌ Not configured');
    console.log('   3. HuggingFace Inference Providers -', this.hfToken ? '✅ Ready' : '⚠️ Limited rate');
    
    // ============================================
    // PRIORITY 1: Try Groq (Fastest & Most Reliable)
    // ============================================
    if (this.groqClient) {
      try {
        console.log('🚀 [1/4] Trying Groq API (Primary - Fastest)...');
        const groqResult = await this.generateWithGroq(topic, preferences);
        if (groqResult && groqResult.story && groqResult.story.length > 100) {
          console.log('✅ Story generated successfully with Groq!');
          return groqResult;
        }
      } catch (error) {
        console.log('⚠️ Groq API failed:', error.message);
      }
    } else {
      console.log('ℹ️ [1/4] Groq API key not configured - Get FREE key at: https://console.groq.com');
    }

    // ============================================
    // PRIORITY 2: Try Google Gemini (Reliable Fallback)
    // ============================================
    if (this.genAI) {
      try {
        console.log('🤖 [2/4] Trying Google Gemini (Secondary)...');
        const geminiResult = await this.generateWithGemini(topic, preferences);
        if (geminiResult && geminiResult.story && geminiResult.story.length > 100) {
          console.log('✅ Story generated successfully with Gemini!');
          return geminiResult;
        }
      } catch (error) {
        console.log('⚠️ Gemini API failed:', error.message);
      }
    } else {
      console.log('ℹ️ [2/4] Gemini API key not configured');
    }

    // ============================================
    // PRIORITY 3: Try HuggingFace Serverless (Free but Slow)
    // ============================================
    try {
      console.log('🔧 [3/4] Trying HuggingFace Serverless API...');
      const hfResult = await this.generateWithHuggingFaceServerless(topic, preferences);
      if (hfResult && hfResult.story && hfResult.story.length > 100) {
        console.log('✅ Story generated successfully with HuggingFace!');
        return hfResult;
      }
    } catch (error) {
      console.log('⚠️ HuggingFace Serverless failed:', error.message);
    }

    // ============================================
    // PRIORITY 4: Try Gradio Space (Legacy - Often Down)
    // ============================================
    try {
      console.log('📦 [4/4] Trying Gradio Space (Last Resort)...');
      const result = await this.generateWithGradio(topic, preferences);
      if (result && result.story && result.story.length > 100) {
        console.log('✅ Story generated successfully with Gradio!');
        return result;
      }
    } catch (error) {
      console.log('⚠️ Mistral API unavailable:', error.message);
    }

    // Try other fallback models
    for (const modelEndpoint of this.fallbackModels) {
      try {
        console.log(`Trying fallback model: ${modelEndpoint.split('/').pop()}...`);
        const response = await this.callDirectAPI(modelEndpoint, topic, preferences);
        if (response && response.length > 100) {
          console.log('✅ Story generated with fallback model!');
          const code = this.getCodeTemplate(topic);
          return {
            story: response,
            code,
            topic,
            generatedBy: 'HuggingFace Inference API',
            model: modelEndpoint.split('/').pop(),
            timestamp: Date.now()
          };
        }
      } catch (error) {
        console.log(`❌ Model ${modelEndpoint.split('/').pop()} failed, trying next...`);
      }
    }
    
    // Final fallback to rich educational content
    console.log('💡 Using high-quality fallback educational content');
    return this.getFallbackStory(topic, preferences);
  }

  async generateWithGradio(topic, preferences) {
    // eslint-disable-next-line no-unused-vars
    const { level = 'beginner', theme = 'adventure', timestamp, randomSeed, forceNew } = preferences;
    const prompt = this.createEnhancedPrompt(topic, level, theme, { timestamp, randomSeed });
    
    try {
      // Using Gradio Space API - Direct prediction endpoint
      // Format: POST /call/{api_name} followed by GET /call/{api_name}/{event_id}
      
      console.log('🔗 Connecting to Gradio Space:', this.gradioSpace);
      console.log('🎲 Using unique seed to generate different story');
      
      // Step 1: Initiate the prediction
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add HF token if available for better rate limits
      if (this.hfToken) {
        headers['Authorization'] = `Bearer ${this.hfToken}`;
        console.log('🔑 Using HuggingFace token for authentication');
      }
      
      const callResponse = await fetch(`${this.gradioAPIEndpoint}/call/predict`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          data: [prompt] // Gradio expects data as an array
        }),
        signal: AbortSignal.timeout(this.timeout)
      });

      if (!callResponse.ok) {
        throw new Error(`Gradio call error: ${callResponse.status} - ${callResponse.statusText}`);
      }

      const callResult = await callResponse.json();
      const eventId = callResult.event_id;
      
      console.log('📡 Prediction initiated, event ID:', eventId);

      // Step 2: Poll for the result using Server-Sent Events (SSE)
      const statusResponse = await fetch(`${this.gradioAPIEndpoint}/call/predict/${eventId}`, {
        method: 'GET',
        headers: headers,
        signal: AbortSignal.timeout(this.timeout)
      });

      if (!statusResponse.ok) {
        throw new Error(`Gradio status error: ${statusResponse.status}`);
      }

      // Read the SSE stream
      const reader = statusResponse.body.getReader();
      const decoder = new TextDecoder();
      let generatedText = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.msg === 'process_completed' && data.output?.data) {
                generatedText = data.output.data[0];
                console.log('✅ Received response from Gradio');
                break;
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
        
        if (generatedText) break;
      }
      
      // Clean up the output
      generatedText = this.cleanGeneratedText(generatedText, prompt);
      
      if (generatedText.length > 100) {
        const code = this.getCodeTemplate(topic);
        return {
          story: generatedText,
          code,
          topic,
          generatedBy: 'Mistral-7B-Instruct (Gradio Space)',
          model: 'mistralai/Mistral-7B-Instruct-v0.2',
          timestamp: Date.now()
        };
      }
      
      throw new Error('Generated text too short');
    } catch (error) {
      console.error('❌ Gradio Space API call failed:', error.message);
      throw error;
    }
  }

  // ============================================
  // 🚀 GROQ API METHOD (FASTEST FREE OPTION)
  // ============================================
  async generateWithGroq(topic, preferences = {}) {
    try {
      console.log('🚀 Calling Groq API (Llama 3.1)...');
      
      if (!this.groqClient) {
        throw new Error('Groq API not initialized - Get FREE key at: https://console.groq.com');
      }

      const { level = 'beginner', theme = 'fantasy' } = preferences;
      
      // Create an engaging prompt
      const prompt = this.createEnhancedPrompt(topic, level, theme, {
        timestamp: Date.now(),
        randomSeed: Math.random()
      });
      
      console.log('📤 Sending request to Groq (llama-3.1-8b-instant)...');
      
      // Call Groq API with llama-3.1-8b-instant (fastest free model)
      const completion = await this.groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are an expert storyteller specializing in making complex programming concepts engaging through creative narratives. Create educational stories that blend entertainment with clear technical explanations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'llama-3.1-8b-instant', // Fastest model, great for stories
        temperature: 0.8,
        max_tokens: 1500,
        top_p: 0.9,
        stream: false
      });
      
      const generatedText = completion.choices[0]?.message?.content;
      
      if (!generatedText || generatedText.length < 100) {
        throw new Error('Generated text too short or empty');
      }
      
      console.log('✅ Received response from Groq');
      console.log('📊 Story length:', generatedText.length, 'characters');
      
      // Clean and format the story
      const cleanedText = this.cleanGeneratedText(generatedText, prompt);
      const code = this.getCodeTemplate(topic);
      
      return {
        story: cleanedText,
        code,
        topic,
        generatedBy: 'Groq - Llama 3.1 8B Instant',
        model: 'llama-3.1-8b-instant',
        timestamp: Date.now(),
        tokens: completion.usage?.total_tokens || 0
      };
      
    } catch (error) {
      console.error('❌ Groq API call failed:', error.message);
      if (error.message?.includes('401')) {
        console.error('🔑 Invalid API key - Get new key at: https://console.groq.com/keys');
      }
      throw error;
    }
  }

  // ============================================
  // 🔧 HUGGINGFACE SERVERLESS API METHOD (Free Backup)
  // ============================================
  async generateWithHuggingFaceServerless(topic, preferences = {}) {
    try {
      console.log('🔧 Calling HuggingFace Inference Providers API (New endpoint)...');
      
      const { level = 'beginner', theme = 'fantasy' } = preferences;
      
      // Use a free serverless model with new Inference Providers API
      const model = 'mistralai/Mixtral-8x7B-Instruct-v0.1'; // Fast and good quality
      const apiUrl = `https://router.huggingface.co/hf-inference/models/${model}`;
      
      // Create prompt
      const prompt = this.createEnhancedPrompt(topic, level, theme, {
        timestamp: Date.now(),
        randomSeed: Math.random()
      });
      
      console.log('📤 Sending request to HuggingFace Inference Providers API...');
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.hfToken && { 'Authorization': `Bearer ${this.hfToken}` })
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 1200,
            temperature: 0.8,
            top_p: 0.9,
            do_sample: true,
            return_full_text: false
          }
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HF API returned ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      let generatedText = '';
      
      if (Array.isArray(data) && data[0]?.generated_text) {
        generatedText = data[0].generated_text;
      } else if (data.generated_text) {
        generatedText = data.generated_text;
      } else if (typeof data === 'string') {
        generatedText = data;
      }
      
      if (!generatedText || generatedText.length < 100) {
        throw new Error('Generated text too short or empty');
      }
      
      console.log('✅ Received response from HuggingFace Serverless');
      console.log('📊 Story length:', generatedText.length, 'characters');
      
      const cleanedText = this.cleanGeneratedText(generatedText, prompt);
      const code = this.getCodeTemplate(topic);
      
      return {
        story: cleanedText,
        code,
        topic,
        generatedBy: 'HuggingFace - Mixtral 8x7B',
        model: 'mixtral-8x7b-instruct',
        timestamp: Date.now()
      };
      
    } catch (error) {
      console.error('❌ HuggingFace Serverless failed:', error.message);
      throw error;
    }
  }

  async generateWithGemini(topic, preferences = {}) {
    try {
      console.log('🤖 Calling Google Gemini API...');
      
      if (!this.genAI) {
        throw new Error('Gemini API not initialized - API key missing');
      }

      const { level = 'beginner', theme = 'fantasy' } = preferences;
      
      // Use Gemini Pro model with safety settings (stable model)
      const model = this.genAI.getGenerativeModel({ 
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
      
      // Create an engaging prompt
      const prompt = this.createEnhancedPrompt(topic, level, theme, {
        timestamp: Date.now(),
        randomSeed: Math.random()
      });
      
      console.log('📤 Sending request to Gemini Pro...');
      console.log('📝 Prompt preview:', prompt.substring(0, 100) + '...');
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      // Check if response was blocked
      if (!response || response.promptFeedback?.blockReason) {
        throw new Error(`Content blocked: ${response.promptFeedback?.blockReason || 'Unknown reason'}`);
      }
      
      const generatedText = response.text();
      console.log('📥 Received response from Gemini, length:', generatedText.length);
      
      if (generatedText.length > 100) {
        const code = this.getCodeTemplate(topic);
        return {
          story: generatedText,
          code,
          topic,
          generatedBy: 'Google Gemini Pro',
          model: 'gemini-pro',
          timestamp: Date.now()
        };
      }
      
      throw new Error('Generated text too short');
    } catch (error) {
      console.error('❌ Gemini API call failed:', error);
      console.error('❌ Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      throw error;
    }
  }

  createEnhancedPrompt(topic, level, theme, options = {}) {
    const topicFormatted = topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Add randomization to ensure different stories each time
    // eslint-disable-next-line no-unused-vars
    const timestamp = options.timestamp || Date.now();
    const randomSeed = options.randomSeed || Math.random();
    const storyNumber = Math.floor(randomSeed * 1000);
    
    const levelInstructions = {
      beginner: `Explain ${topicFormatted} to someone new to programming. Use simple language, everyday analogies, and avoid jargon. Make it fun and easy to understand.`,
      advanced: `Provide a detailed explanation of ${topicFormatted} including time/space complexity, implementation details, real-world applications, and optimization techniques. Use proper computer science terminology.`
    };

    const themeTemplates = {
      adventure: `Create an exciting adventure story where the hero learns about ${topicFormatted} to overcome challenges. Include dramatic moments and character development.`,
      'sci-fi': `Write a science fiction story set in a futuristic world where ${topicFormatted} is crucial technology. Use space, AI, and advanced technology concepts.`,
      mystery: `Craft a detective mystery where understanding ${topicFormatted} helps solve an intriguing case. Include clues, puzzles, and revelations.`,
      fantasy: `Create a fantasy tale with magical elements representing ${topicFormatted}. Use wizards, spells, magical creatures, and kingdoms to explain the concept.`
    };

    return `[INST] You are an expert computer science educator who creates engaging educational stories.

IMPORTANT: Create a COMPLETELY NEW and UNIQUE story (Story #${storyNumber}, Seed: ${randomSeed.toFixed(4)}). DO NOT repeat previous stories. Use different examples, characters, and scenarios.

${themeTemplates[theme] || themeTemplates.adventure}

${levelInstructions[level]}

Requirements:
- Length: 250-350 words
- Include clear analogies that explain ${topicFormatted}
- Make it engaging and memorable
- End with a key takeaway about time/space complexity or use cases
- Use storytelling elements (characters, conflict, resolution)

Write an educational story about ${topicFormatted} now: [/INST]`;
  }

  cleanGeneratedText(text, prompt) {
    // Remove the prompt if it appears in the response
    text = text.replace(prompt, '').trim();
    
    // Remove common artifacts
    text = text.replace(/\[INST\].*?\[\/INST\]/gs, '').trim();
    text = text.replace(/^(Story:|Answer:|Response:)/i, '').trim();
    
    // Remove excessive newlines
    text = text.replace(/\n{3,}/g, '\n\n');
    
    // Ensure proper paragraph formatting
    text = text.split('\n\n').map(p => p.trim()).filter(p => p.length > 0).join('\n\n');
    
    return text;
  }

  createPrompt(topic, preferences) {
    const { level = 'beginner', theme = 'adventure' } = preferences;
    return this.createEnhancedPrompt(topic, level, theme);
  }

  async callDirectAPI(endpoint, topic, preferences) {
    const { level = 'beginner', theme = 'adventure' } = preferences;
    const prompt = `Write an educational ${theme} story about ${topic} in computer science for ${level} level. Make it engaging and teach the concept clearly in 200-300 words.\n\nStory: `;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const headers = { 'Content-Type': 'application/json' };
      
      // Add HF token if available
      if (this.hfToken) {
        headers['Authorization'] = `Bearer ${this.hfToken}`;
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 400,
            temperature: 0.85,
            top_p: 0.92,
            do_sample: true,
            repetition_penalty: 1.15
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      if (!response.ok) throw new Error('API error');

      const result = await response.json();
      let story = Array.isArray(result) ? result[0]?.generated_text : result.generated_text;
      story = story?.replace(prompt, '').trim();
      
      return story;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  getCodeTemplate(topic) {
    const templates = {
      arrays: `// Arrays: The Foundation of Data Storage
let treasureArray = [10, 20, 30, 40, 50];

// ACCESS: O(1) - Instant retrieval by index
console.log("Element at index 2:", treasureArray[2]); // 30

// INSERT at end: O(1) - Fast push
treasureArray.push(60);
console.log("After push:", treasureArray);

// INSERT at middle: O(n) - Must shift elements
treasureArray.splice(2, 0, 25); // Insert 25 at index 2
console.log("After splice:", treasureArray);

// DELETE: O(n) - Requires shifting
treasureArray.splice(3, 1); // Remove element at index 3
console.log("After delete:", treasureArray);

// SEARCH: O(n) - Linear search
let found = treasureArray.find(x => x === 30);
console.log("Found:", found);

// MAP: Transform all elements
let doubled = treasureArray.map(x => x * 2);
console.log("Doubled:", doubled);

// FILTER: Select matching elements
let filtered = treasureArray.filter(x => x > 30);
console.log("Filtered:", filtered);

// REDUCE: Aggregate to single value
let sum = treasureArray.reduce((acc, val) => acc + val, 0);
console.log("Sum:", sum);`,

      stacks: `// Stack: LIFO (Last In, First Out)
class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }
  
  // PUSH: Add to top - O(1)
  push(element) {
    this.items[this.count] = element;
    this.count++;
    return this.count;
  }
  
  // POP: Remove from top - O(1)
  pop() {
    if (this.isEmpty()) return undefined;
    this.count--;
    const item = this.items[this.count];
    delete this.items[this.count];
    return item;
  }
  
  // PEEK: View top without removing - O(1)
  peek() {
    return this.items[this.count - 1];
  }
  
  // isEmpty: Check if empty - O(1)
  isEmpty() {
    return this.count === 0;
  }
  
  // SIZE: Get element count - O(1)
  size() {
    return this.count;
  }
  
  // CLEAR: Empty the stack - O(1)
  clear() {
    this.items = [];
    this.count = 0;
  }
  
  // PRINT: Display stack
  print() {
    console.log(this.items.slice(0, this.count).join(' <- '));
  }
}

// USAGE EXAMPLE
const plateStack = new Stack();
plateStack.push("Plate 1");
plateStack.push("Plate 2");
plateStack.push("Plate 3");
console.log("Top plate:", plateStack.peek()); // Plate 3
plateStack.pop(); // Remove Plate 3
plateStack.print(); // Plate 1 <- Plate 2`,

      queues: `// Queue: FIFO (First In, First Out)
class Queue {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }
  
  // ENQUEUE: Add to rear - O(1)
  enqueue(element) {
    this.items[this.rear] = element;
    this.rear++;
  }
  
  // DEQUEUE: Remove from front - O(1)
  dequeue() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return item;
  }
  
  // PEEK/FRONT: View front without removing - O(1)
  peek() {
    return this.items[this.front];
  }
  
  // isEmpty: Check if empty - O(1)
  isEmpty() {
    return this.rear - this.front === 0;
  }
  
  // SIZE: Get element count - O(1)
  size() {
    return this.rear - this.front;
  }
  
  // CLEAR: Empty the queue - O(1)
  clear() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }
  
  // PRINT: Display queue
  print() {
    const elements = [];
    for (let i = this.front; i < this.rear; i++) {
      elements.push(this.items[i]);
    }
    console.log(elements.join(' <- '));
  }
}

// USAGE EXAMPLE
const customerQueue = new Queue();
customerQueue.enqueue("Customer 1");
customerQueue.enqueue("Customer 2");
customerQueue.enqueue("Customer 3");
console.log("Next customer:", customerQueue.peek()); // Customer 1
customerQueue.dequeue(); // Serve Customer 1
customerQueue.print(); // Customer 2 <- Customer 3`,

      'linked-lists': `// Linked List: Dynamic Data Structure
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // INSERT AT BEGINNING: O(1)
  insertAtBeginning(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  
  // INSERT AT END: O(n)
  insertAtEnd(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }
  
  // INSERT AT POSITION: O(n)
  insertAt(data, position) {
    if (position < 0 || position > this.size) return false;
    if (position === 0) {
      this.insertAtBeginning(data);
      return true;
    }
    
    const newNode = new Node(data);
    let current = this.head;
    let prev = null;
    let index = 0;
    
    while (index < position) {
      prev = current;
      current = current.next;
      index++;
    }
    
    newNode.next = current;
    prev.next = newNode;
    this.size++;
    return true;
  }
  
  // DELETE NODE: O(n)
  delete(data) {
    if (!this.head) return null;
    
    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    
    let current = this.head;
    let prev = null;
    
    while (current && current.data !== data) {
      prev = current;
      current = current.next;
    }
    
    if (current) {
      prev.next = current.next;
      this.size--;
    }
  }
  
  // SEARCH: O(n)
  search(data) {
    let current = this.head;
    let index = 0;
    
    while (current) {
      if (current.data === data) return index;
      current = current.next;
      index++;
    }
    return -1;
  }
  
  // PRINT: O(n)
  print() {
    let current = this.head;
    const elements = [];
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    console.log(elements.join(' -> ') + ' -> null');
  }
}

// USAGE
const list = new LinkedList();
list.insertAtEnd(10);
list.insertAtEnd(20);
list.insertAtBeginning(5);
list.insertAt(15, 2);
list.print(); // 5 -> 10 -> 15 -> 20 -> null`,

      trees: `// Binary Search Tree Implementation
class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  // INSERT: O(log n) average, O(n) worst
  insert(data) {
    const newNode = new TreeNode(data);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    let current = this.root;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }
  
  // SEARCH: O(log n) average
  search(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) return true;
      if (data < current.data) current = current.left;
      else current = current.right;
    }
    return false;
  }
  
  // INORDER TRAVERSAL: Left -> Root -> Right (Sorted!)
  inorder(node = this.root, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.data);
      this.inorder(node.right, result);
    }
    return result;
  }
  
  // PREORDER: Root -> Left -> Right
  preorder(node = this.root, result = []) {
    if (node) {
      result.push(node.data);
      this.preorder(node.left, result);
      this.preorder(node.right, result);
    }
    return result;
  }
  
  // POSTORDER: Left -> Right -> Root
  postorder(node = this.root, result = []) {
    if (node) {
      this.postorder(node.left, result);
      this.postorder(node.right, result);
      result.push(node.data);
    }
    return result;
  }
  
  // FIND MIN: O(log n)
  findMin(node = this.root) {
    while (node.left) node = node.left;
    return node.data;
  }
  
  // FIND MAX: O(log n)
  findMax(node = this.root) {
    while (node.right) node = node.right;
    return node.data;
  }
}

// USAGE
const bst = new BinarySearchTree();
[50, 30, 70, 20, 40, 60, 80].forEach(val => bst.insert(val));
console.log("Inorder (sorted):", bst.inorder());
console.log("Search 40:", bst.search(40));
console.log("Min:", bst.findMin());`,

      graphs: `// Graph Implementation (Adjacency List)
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }
  
  // ADD VERTEX: O(1)
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }
  
  // ADD EDGE: O(1)
  addEdge(vertex1, vertex2) {
    this.adjacencyList.get(vertex1).push(vertex2);
    this.adjacencyList.get(vertex2).push(vertex1); // Undirected
  }
  
  // BFS (Breadth-First Search): O(V + E)
  bfs(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];
    
    visited.add(start);
    
    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);
      
      const neighbors = this.adjacencyList.get(vertex);
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }
  
  // DFS (Depth-First Search): O(V + E)
  dfs(start, visited = new Set(), result = []) {
    visited.add(start);
    result.push(start);
    
    const neighbors = this.adjacencyList.get(start);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.dfs(neighbor, visited, result);
      }
    }
    return result;
  }
  
  // CHECK IF PATH EXISTS
  hasPath(source, destination) {
    const visited = new Set();
    const queue = [source];
    visited.add(source);
    
    while (queue.length > 0) {
      const vertex = queue.shift();
      if (vertex === destination) return true;
      
      const neighbors = this.adjacencyList.get(vertex);
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return false;
  }
  
  // PRINT GRAPH
  print() {
    for (let [vertex, edges] of this.adjacencyList) {
      console.log(\`\${vertex} -> \${edges.join(', ')}\`);
    }
  }
}

// USAGE: Social Network
const socialNetwork = new Graph();
['Alice', 'Bob', 'Charlie', 'Diana'].forEach(person => 
  socialNetwork.addVertex(person)
);
socialNetwork.addEdge('Alice', 'Bob');
socialNetwork.addEdge('Alice', 'Charlie');
socialNetwork.addEdge('Bob', 'Diana');
socialNetwork.addEdge('Charlie', 'Diana');

console.log("BFS from Alice:", socialNetwork.bfs('Alice'));
console.log("DFS from Alice:", socialNetwork.dfs('Alice'));`,

      sorting: `// Sorting Algorithms Comparison

// 1. BUBBLE SORT: O(n²) - Simple but slow
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 2. SELECTION SORT: O(n²) - Consistent
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

// 3. INSERTION SORT: O(n²) worst, O(n) best
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// 4. MERGE SORT: O(n log n) - Guaranteed!
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// 5. QUICK SORT: O(n log n) average - Fastest!
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// TESTING
const unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", unsorted);
console.log("Bubble Sort:", bubbleSort([...unsorted]));
console.log("Merge Sort:", mergeSort([...unsorted]));
console.log("Quick Sort:", quickSort([...unsorted]));`,

      recursion: `// Recursion: Function Calling Itself

// 1. FACTORIAL: Classic example
function factorial(n) {
  // BASE CASE: Stop recursion
  if (n === 0 || n === 1) return 1;
  
  // RECURSIVE CASE: Break problem down
  return n * factorial(n - 1);
}
console.log("5! =", factorial(5)); // 120

// 2. FIBONACCI: Famous sequence
function fibonacci(n) {
  // BASE CASES
  if (n === 0) return 0;
  if (n === 1) return 1;
  
  // RECURSIVE CASE
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log("Fib(7) =", fibonacci(7)); // 13

// 3. FIBONACCI OPTIMIZED (Memoization)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 0) return 0;
  if (n === 1) return 1;
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}
console.log("Fast Fib(50) =", fibMemo(50));

// 4. SUM OF ARRAY
function sumArray(arr) {
  // BASE CASE: Empty array
  if (arr.length === 0) return 0;
  
  // RECURSIVE CASE: First element + sum of rest
  return arr[0] + sumArray(arr.slice(1));
}
console.log("Sum [1,2,3,4,5] =", sumArray([1,2,3,4,5])); // 15

// 5. REVERSE STRING
function reverseString(str) {
  // BASE CASE: Empty or single char
  if (str.length <= 1) return str;
  
  // RECURSIVE CASE: Last char + reverse of rest
  return str[str.length - 1] + reverseString(str.slice(0, -1));
}
console.log("Reverse 'hello' =", reverseString('hello')); // 'olleh'

// 6. POWER FUNCTION
function power(base, exp) {
  // BASE CASE
  if (exp === 0) return 1;
  
  // RECURSIVE CASE
  return base * power(base, exp - 1);
}
console.log("2^10 =", power(2, 10)); // 1024

// 7. BINARY SEARCH (Recursive)
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  // BASE CASE: Not found
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  // BASE CASE: Found
  if (arr[mid] === target) return mid;
  
  // RECURSIVE CASES
  if (arr[mid] > target) {
    return binarySearchRecursive(arr, target, left, mid - 1);
  } else {
    return binarySearchRecursive(arr, target, mid + 1, right);
  }
}

const sorted = [1, 3, 5, 7, 9, 11, 13, 15];
console.log("Find 7:", binarySearchRecursive(sorted, 7)); // Index 3

// 8. FLATTEN NESTED ARRAY
function flattenArray(arr) {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}
console.log("Flatten:", flattenArray([1, [2, [3, 4], 5], 6])); // [1,2,3,4,5,6]`
    };

    return templates[topic] || `// Exploring ${topic}...\nconst example = "Start your journey here";\n\n// This is a fundamental concept in Data Structures and Algorithms\n// Let's learn step by step!`;
  }

  getFallbackStory(topic, preferences) {
    // eslint-disable-next-line no-unused-vars
    const { level = 'beginner', theme = 'adventure' } = preferences;
    
    const detailedStories = {
      arrays: `In a vast digital library, programmer Maya discovered the power of Arrays - the most fundamental data structure in computing.

"Arrays are like numbered storage boxes," explained the wise mentor. "Each box has an index, starting from 0. Want the 5th element? Just use arr[4]!"

Maya learned that arrays excel at RANDOM ACCESS - finding any element in O(1) constant time. Need the 1000th item? Instant! But there's a catch: inserting in the middle requires shifting all elements after it, taking O(n) time.

"When do I use arrays?" Maya asked. "Use them when you need fast lookups, know the size beforehand, or want cache-friendly memory layout," replied the mentor.

Real-world uses: storing pixels in images, implementing other data structures, managing fixed-size collections. Arrays are the building blocks of computer science!

KEY OPERATIONS:
- Access: O(1) - Lightning fast!
- Insert at end: O(1) - Quick push
- Insert at middle: O(n) - Must shift elements
- Delete: O(n) - Requires shifting
- Search: O(n) linear, O(log n) if sorted`,

      stacks: `In a busy restaurant kitchen, Chef Alex discovered the Stack principle while managing dirty plates.

"Last In, First Out!" Alex exclaimed. The stack of plates grew upward - new plates added on top (PUSH), clean plates removed from top (POP). Simple, efficient, organized!

The head chef explained: "Stacks are everywhere! Your browser's back button? A stack of pages. Undo in editors? Stack of actions. Function calls in code? Call stack!"

Alex implemented a Stack in code:
- PUSH: Add to top - O(1)
- POP: Remove from top - O(1)  
- PEEK: View top without removing - O(1)
- isEmpty: Check if empty - O(1)

"Why so fast?" Alex wondered. "Because we only work with the top! No searching, no middle insertions. Pure efficiency!"

REAL-WORLD APPLICATIONS:
- Expression evaluation (calculators)
- Backtracking algorithms (maze solving)
- Syntax parsing (compilers)
- Memory management (call stack)
- Undo/Redo functionality

The LIFO principle changed how Alex thought about problem-solving forever!`,

      queues: `At the Space Station's docking bay, Commander Sam managed incoming ships using a Queue.

"First Come, First Served!" Sam announced. Ships joined at the REAR (enqueue), departed from the FRONT (dequeue). Fair, orderly, predictable!

"This is FIFO - First In, First Out," explained Mission Control. "Unlike stacks, queues maintain arrival order. Perfect for fairness!"

Sam's Queue implementation:
- ENQUEUE: Add to rear - O(1)
- DEQUEUE: Remove from front - O(1)
- FRONT: Check next without removing - O(1)
- isEmpty: Verify empty state - O(1)

"Where else do queues appear?" Sam asked. The list was endless:
- Print job scheduling
- CPU task management
- Breadth-First Search in graphs
- Buffer management in streaming
- Customer service lines
- Network packet routing

QUEUE VARIATIONS:
- Circular Queue: Efficient space usage
- Priority Queue: Weighted ordering
- Deque: Both ends accessible

Understanding queues meant understanding fairness in systems. Commander Sam now saw queues everywhere in the digital universe!`,

      'linked-lists': `In a cosmic treasure hunt, Explorer Jordan found clues scattered across planets, each pointing to the next location.

"This is a Linked List!" Jordan realized. Each node contains DATA and a POINTER to the next node. Unlike arrays with consecutive memory, linked lists scatter across the memory galaxy!

The Guide explained: "Arrays need contiguous space - like parking cars in a row. Linked lists are like a treasure hunt - each clue points to the next, scattered anywhere!"

TYPES OF LINKED LISTS:
1. Singly Linked: One-way arrows (→)
2. Doubly Linked: Two-way arrows (⇄)
3. Circular: Last points to first (↻)

OPERATIONS:
- Insert at beginning: O(1) - Just change head!
- Insert at end: O(n) - Must traverse
- Delete: O(1) if position known
- Search: O(n) - Must follow pointers
- Access by index: O(n) - No random access!

"When do I use linked lists?" Jordan asked.

"Use them when:
- Size changes frequently
- Don't need random access
- Want efficient insertions/deletions
- Memory is fragmented"

REAL APPLICATIONS:
- Music playlists
- Browser history
- Image viewers (next/prev)
- Undo functionality
- Memory management

Jordan understood: Linked lists trade instant access for flexible size!`,

      trees: `In an ancient forest, Data Scientist Riley discovered that trees weren't just plants - they were powerful hierarchical structures!

"Binary Trees!" Riley exclaimed. Each node has at most TWO children: left and right. The top node is the ROOT, bottom nodes are LEAVES.

The Forest Keeper explained: "Trees organize data hierarchically. Like a family tree, file systems, or decision paths!"

TREE TERMINOLOGY:
- Root: Top node
- Parent/Child: Node relationships
- Siblings: Same parent nodes
- Height: Longest path to leaf
- Depth: Distance from root

BINARY SEARCH TREE (BST) RULES:
- Left child < Parent
- Right child > Parent
- Enables fast searching!

OPERATIONS:
- Search: O(log n) balanced, O(n) worst
- Insert: O(log n) balanced
- Delete: O(log n) balanced
- Traversal: O(n) visits all nodes

TRAVERSAL TYPES:
1. Inorder: Left → Root → Right (sorted)
2. Preorder: Root → Left → Right
3. Postorder: Left → Right → Root
4. Level-order: Layer by layer (BFS)

REAL-WORLD USES:
- File systems (folders/files)
- DOM in web browsers
- Expression parsing
- Decision trees in AI
- Database indexing (B-trees)
- Autocomplete features

Riley marveled: "Trees bring O(log n) magic to searching!"`,

      graphs: `At the Galactic Navigation Center, Network Engineer Casey mapped connections between star systems.

"This isn't a tree - it's a GRAPH!" Casey discovered. Nodes (vertices) connected by edges, but WITHOUT hierarchy. Some paths one-way, some two-way!

GRAPH TYPES:
- Directed: One-way streets (→)
- Undirected: Two-way roads (—)
- Weighted: Edges have costs
- Unweighted: All equal

REPRESENTATIONS:
1. Adjacency Matrix: 2D array [i][j]
2. Adjacency List: Array of lists

GRAPH ALGORITHMS:
- BFS (Breadth-First Search): Layer by layer, uses Queue
- DFS (Depth-First Search): Deep dive first, uses Stack
- Dijkstra: Shortest path in weighted graphs
- Topological Sort: Ordering with dependencies

TIME COMPLEXITY:
- BFS/DFS: O(V + E) where V=vertices, E=edges
- Space: O(V) for visited tracking

REAL-WORLD APPLICATIONS:
- Social networks (friends)
- Maps & GPS (cities & roads)
- Web pages (links)
- Network routing
- Recommendation systems
- Dependency resolution
- Circuit design

Casey understood: "Graphs model ANY relationship! They're the ultimate data structure for connections!"

The universe was one giant graph!`,

      sorting: `In the Data Center of Order, Algorithm Master Taylor faced mountains of unsorted data.

"We must bring ORDER from CHAOS!" Taylor declared, studying the ancient sorting algorithms.

BUBBLE SORT - The Simplest:
Compare neighbors, swap if wrong order, repeat.
- Time: O(n²) - Slow for large data
- Space: O(1) - In-place sorting
- Use: Teaching, small datasets

SELECTION SORT:
Find minimum, place at front, repeat.
- Time: O(n²) - Consistent but slow
- Space: O(1) - In-place
- Use: Small lists, memory-constrained

INSERTION SORT:
Build sorted list one element at a time.
- Time: O(n²) worst, O(n) best
- Space: O(1)
- Use: Nearly sorted data, small lists

MERGE SORT - Divide & Conquer:
Split in half, recursively sort, merge.
- Time: O(n log n) - Guaranteed!
- Space: O(n) - Needs extra memory
- Use: Linked lists, stable sorting needed

QUICK SORT - The Speedster:
Pick pivot, partition, recursively sort.
- Time: O(n log n) average, O(n²) worst
- Space: O(log n) - Recursive stack
- Use: General purpose, fastest average

HEAP SORT:
Build heap, repeatedly extract max.
- Time: O(n log n) - Guaranteed
- Space: O(1) - In-place
- Use: When memory is limited

"Which do I use?" Taylor asked.

The answer: "Quick Sort for speed, Merge Sort for stability, Insertion Sort for small data, Bubble Sort for learning!"

REAL APPLICATIONS:
- Database query results
- Search engines
- Priority queues
- Graphics rendering
- Data analysis

Taylor mastered all sorting algorithms, understanding each has its perfect use case!`,

      recursion: `In the Mirror Dimension, Coder Morgan discovered a magical concept: RECURSION - functions that call THEMSELVES!

"To understand recursion," the Mirror whispered, "you must first understand recursion!"

Morgan learned the TWO RULES:
1. BASE CASE: When to STOP (prevents infinite loop!)
2. RECURSIVE CASE: Break problem into smaller version

FACTORIAL EXAMPLE:
factorial(5) = 5 × factorial(4)
factorial(4) = 4 × factorial(3)
factorial(3) = 3 × factorial(2)
factorial(2) = 2 × factorial(1)
factorial(1) = 1 ← BASE CASE!

Then UNWIND: 1 → 2 → 6 → 24 → 120

FIBONACCI SEQUENCE:
fib(n) = fib(n-1) + fib(n-2)
Base: fib(0)=0, fib(1)=1

RECURSION VS ITERATION:
✅ Recursion: Clean, elegant, natural for trees/graphs
❌ Can overflow call stack, slower
✅ Iteration: Fast, memory efficient
❌ Can be complex for certain problems

WHEN TO USE RECURSION:
- Tree/graph traversal
- Divide & conquer (merge sort, quicksort)
- Backtracking (sudoku, maze solving)
- Mathematical sequences
- File system navigation

CLASSIC RECURSIVE PROBLEMS:
- Tower of Hanoi
- N-Queens puzzle
- Permutations & Combinations
- Binary tree operations
- Graph DFS

OPTIMIZATION:
- Memoization: Cache results
- Tail recursion: Compiler optimization
- Convert to iteration if needed

Morgan realized: "Recursion is thinking in smaller, identical problems. Like Russian dolls - each contains a smaller version!"

The Mirror Dimension taught: Every complex problem can be broken into simpler copies of itself!`
    };

    const story = detailedStories[topic] || detailedStories.arrays;
    
    return {
      story,
      code: this.getCodeTemplate(topic),
      topic,
      generatedBy: 'Fallback (Detailed Educational Story)',
      model: 'built-in',
      timestamp: Date.now()
    };
  }
}

const huggingFaceService = new HuggingFaceService();
export default huggingFaceService;
