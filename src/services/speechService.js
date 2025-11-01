class SpeechService {
  constructor() {
    this.asrEndpoint = 'https://asr.iitm.ac.in/internal/asr/decode';
    this.isRecording = false;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.recognition = null;
  }

  // Web Speech API for real-time speech recognition (fallback)
  initWebSpeechAPI() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser');
      return null;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    
    return this.recognition;
  }

  // Start recording audio
  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      
      console.log('Recording started...');
      return true;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      return false;
    }
  }

  // Stop recording and convert to text
  async stopRecording() {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || !this.isRecording) {
        reject(new Error('No active recording'));
        return;
      }

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.isRecording = false;
        
        // Stop all tracks
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        
        try {
          const text = await this.convertSpeechToText(audioBlob);
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };

      this.mediaRecorder.stop();
    });
  }

  // Convert audio blob to text using IIT Madras ASR API
  async convertSpeechToText(audioBlob) {
    try {
      console.log('Attempting IIT ASR API...');
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      formData.append('language', 'english');
      formData.append('vtt', 'true');

      const response = await fetch(this.asrEndpoint, {
        method: 'POST',
        body: formData,
        timeout: 10000, // 10 second timeout
      });

      if (!response.ok) {
        console.warn(`ASR API returned status: ${response.status}`);
        throw new Error(`ASR API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('ASR API Response:', result);
      
      // Extract text from response (adjust based on actual API response format)
      if (result.transcript || result.text) {
        return result.transcript || result.text;
      }
      
      // If API response is in VTT format, parse it
      if (result.vtt) {
        return this.parseVTT(result.vtt);
      }

      // If response has a message
      if (result.message) {
        return result.message;
      }

      // Try to stringify and return
      const text = result.toString();
      if (text && text !== '[object Object]') {
        return text;
      }

      throw new Error('Could not parse ASR response');
    } catch (error) {
      console.error('IIT ASR API failed:', error);
      console.log('Falling back to Web Speech API...');
      // Fallback to Web Speech API if available
      return this.fallbackToWebSpeech();
    }
  }

  // Parse VTT format to extract text
  parseVTT(vtt) {
    const lines = vtt.split('\n');
    const textLines = lines.filter(line => 
      !line.startsWith('WEBVTT') && 
      !line.includes('-->') && 
      line.trim() !== ''
    );
    return textLines.join(' ');
  }

  // Fallback to Web Speech API
  async fallbackToWebSpeech() {
    return new Promise((resolve, reject) => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        reject(new Error('Speech recognition not available in this browser. Please use Chrome, Edge, or Safari.'));
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      let finalTranscript = '';
      let hasResult = false;

      recognition.onresult = (event) => {
        hasResult = true;
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            finalTranscript += transcript + ' ';
          }
        }
        console.log('Web Speech Result:', finalTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Web Speech error:', event.error);
        if (!hasResult) {
          reject(new Error(`Speech recognition error: ${event.error}. Please check microphone permissions.`));
        }
      };

      recognition.onend = () => {
        if (finalTranscript.trim()) {
          resolve(finalTranscript.trim());
        } else if (!hasResult) {
          reject(new Error('No speech detected. Please speak clearly into your microphone.'));
        }
      };

      try {
        recognition.start();
        console.log('Web Speech API started...');
      } catch (error) {
        reject(new Error('Could not start speech recognition: ' + error.message));
      }
    });
  }

  // Text-to-Speech using Web Speech API
  speak(text, rate = 1, pitch = 1, volume = 1) {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      utterance.lang = 'en-US';

      window.speechSynthesis.speak(utterance);
      return utterance;
    } else {
      console.warn('Text-to-Speech not supported');
      return null;
    }
  }

  // Stop speaking
  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

const speechService = new SpeechService();
export default speechService;
