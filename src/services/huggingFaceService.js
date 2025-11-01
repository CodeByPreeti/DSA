class HuggingFaceService {
  constructor() {
    this.apiKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
    this.baseURL = 'https://api-inference.huggingface.co/models';
    this.maxRetries = 2;
    this.timeout = 25000;
  }

  // Use models that work reliably with free API
  getModelForTask() {
    // Using smaller, faster models that work well with free tier
    return 'microsoft/DialoGPT-small'; // More reliable than medium
  }

  async generateStory(prompt, userPreferences, currentTopic) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt} for ${currentTopic}`);

        const response = await fetch(
          `${this.baseURL}/${this.getModelForTask()}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                max_length: 300,
                temperature: 0.7,
                do_sample: true,
                top_p: 0.9,
                repetition_penalty: 1.2
              }
            }),
            signal: controller.signal
          }
        );

        clearTimeout(timeoutId);

        if (response.status === 503) {
          const waitTime = attempt * 3000;
          console.log(`Model loading, waiting ${waitTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }

        if (response.status === 429) {
          throw new Error('Rate limit exceeded - please wait a moment');
        }

        if (!response.ok) {
          // If API fails, return fallback immediately
          throw new Error(`API unavailable - using fallback story`);
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        if (data && data[0] && data[0].generated_text) {
          return data[0].generated_text;
        } else {
          throw new Error('Invalid response format');
        }

      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error.message);
        
        if (attempt === this.maxRetries) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
      }
    }
  }

  createPrompt(userPreferences, currentTopic) {
    return `
      Create a short educational story about ${currentTopic} in data structures.
      Theme: ${userPreferences.theme}
      Level: ${userPreferences.level}
      Make it engaging and under 200 words.
    `;
  }
}

const huggingFaceService = new HuggingFaceService();
export default huggingFaceService;