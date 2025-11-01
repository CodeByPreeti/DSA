class AudioService {
  constructor() {
    this.audioContext = null;
    this.currentAudio = null;
    this.backgroundAudio = null;
    this.isMuted = false;
  }

  // Initialize audio context
  initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Get theme-based background music URLs (using free APIs)
  getBackgroundMusicUrl(theme) {
    // Using free background music - you can replace with your preferred sources
    const musicMap = {
      adventure: 'https://www.bensound.com/bensound-music/bensound-epic.mp3',
      'sci-fi': 'https://www.bensound.com/bensound-music/bensound-scifi.mp3',
      mystery: 'https://www.bensound.com/bensound-music/bensound-enigmatic.mp3',
      fantasy: 'https://www.bensound.com/bensound-music/bensound-betterdays.mp3',
      nature: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
      battle: 'https://www.bensound.com/bensound-music/bensound-actionable.mp3'
    };

    return musicMap[theme] || musicMap.adventure;
  }

  // Play background music for theme
  async playBackgroundMusic(theme, volume = 0.3) {
    try {
      // Stop existing audio
      if (this.backgroundAudio) {
        this.backgroundAudio.pause();
        this.backgroundAudio = null;
      }

      this.backgroundAudio = new Audio();
      this.backgroundAudio.loop = true;
      this.backgroundAudio.volume = volume;
      
      // For demo, we'll use a data URI or you can replace with actual URLs
      // Using oscillator to generate theme-appropriate tones
      this.playGeneratedAmbience(theme, volume);
      
      return true;
    } catch (error) {
      console.error('Error playing background music:', error);
      return false;
    }
  }

  // Generate theme-appropriate ambience using Web Audio API
  playGeneratedAmbience(theme, volume = 0.3) {
    this.initAudioContext();
    
    if (this.backgroundAudio) {
      this.stopBackgroundMusic();
    }

    const themeConfigs = {
      adventure: { frequencies: [220, 330, 440], type: 'sine', lfoRate: 0.5 },
      'sci-fi': { frequencies: [150, 300, 450], type: 'square', lfoRate: 2 },
      mystery: { frequencies: [110, 165, 220], type: 'triangle', lfoRate: 0.3 },
      fantasy: { frequencies: [261.63, 329.63, 392], type: 'sine', lfoRate: 0.8 },
      nature: { frequencies: [196, 293.66, 392], type: 'sine', lfoRate: 0.2 },
      battle: { frequencies: [100, 200, 300], type: 'sawtooth', lfoRate: 3 }
    };

    const config = themeConfigs[theme] || themeConfigs.adventure;
    
    // Create oscillators for ambient sound
    this.oscillators = [];
    config.frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const lfo = this.audioContext.createOscillator();
      const lfoGain = this.audioContext.createGain();

      oscillator.type = config.type;
      oscillator.frequency.value = freq;

      // LFO for subtle variations
      lfo.frequency.value = config.lfoRate;
      lfoGain.gain.value = freq * 0.1;

      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);

      gainNode.gain.value = volume / config.frequencies.length;
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.start();
      lfo.start();

      this.oscillators.push({ oscillator, gainNode, lfo });
    });

    this.backgroundAudio = { type: 'generated', oscillators: this.oscillators };
  }

  // Stop background music
  stopBackgroundMusic() {
    if (this.backgroundAudio) {
      if (this.backgroundAudio.type === 'generated') {
        this.oscillators.forEach(({ oscillator, lfo }) => {
          oscillator.stop();
          lfo.stop();
        });
        this.oscillators = [];
      } else if (this.backgroundAudio.pause) {
        this.backgroundAudio.pause();
        this.backgroundAudio.currentTime = 0;
      }
      this.backgroundAudio = null;
    }
  }

  // Play sound effect
  playSoundEffect(type) {
    this.initAudioContext();
    
    const effects = {
      correct: { frequency: 800, duration: 0.2 },
      wrong: { frequency: 200, duration: 0.3 },
      click: { frequency: 400, duration: 0.1 },
      complete: { frequency: 600, duration: 0.5 },
      newTopic: { frequency: 500, duration: 0.3 }
    };

    const config = effects[type] || effects.click;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = config.frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + config.duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + config.duration);
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (this.backgroundAudio) {
      if (this.backgroundAudio.type === 'generated') {
        this.oscillators.forEach(({ gainNode }) => {
          gainNode.gain.value = this.isMuted ? 0 : 0.3 / this.oscillators.length;
        });
      } else if (this.backgroundAudio.volume !== undefined) {
        this.backgroundAudio.volume = this.isMuted ? 0 : 0.3;
      }
    }
    
    return this.isMuted;
  }

  // Set volume
  setVolume(volume) {
    if (this.backgroundAudio) {
      if (this.backgroundAudio.type === 'generated') {
        this.oscillators.forEach(({ gainNode }) => {
          gainNode.gain.value = volume / this.oscillators.length;
        });
      } else if (this.backgroundAudio.volume !== undefined) {
        this.backgroundAudio.volume = volume;
      }
    }
  }
}

const audioService = new AudioService();
export default audioService;
