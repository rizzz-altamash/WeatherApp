// // src/services/geminiAPI.js
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { GEMINI_API_KEY } from '@env';
// import { 
//   getCompleteSystemPrompt, 
//   getWeatherBasedSuggestions,
//   SYSTEM_PROMPTS 
// } from './geminiPrompts';

// class GeminiService {
//   constructor() {
//     if (!GEMINI_API_KEY) {
//       console.error('GEMINI_API_KEY is not defined in environment variables');
//     }
//     this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
//     this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//     this.chatHistory = [];
//   }

//   async sendMessage(message, weatherContext = null) {
//     try {
//       // Prepare enhanced weather context with wind direction
//       const enhancedWeatherContext = weatherContext ? {
//         ...weatherContext,
//         windDirection: weatherContext.windDeg ? this.getWindDirection(weatherContext.windDeg) : null
//       } : null;

//       // Get complete system prompt with weather context
//       const systemPrompt = getCompleteSystemPrompt(enhancedWeatherContext);

//       // Add message to history
//       this.chatHistory.push({ role: 'user', content: message });

//       // Create chat session with history
//       const chat = this.model.startChat({
//         history: [
//           {
//             role: 'user',
//             parts: [{ text: systemPrompt }],
//           },
//           {
//             role: 'model',
//             parts: [{ text: SYSTEM_PROMPTS.INITIAL_GREETING }],
//           },
//           ...this.chatHistory.map(msg => ({
//             role: msg.role === 'user' ? 'user' : 'model',
//             parts: [{ text: msg.content }],
//           })),
//         ],
//         generationConfig: {
//           temperature: 0.7,
//           topK: 1,
//           topP: 0.95,
//           maxOutputTokens: 1024,
//         },
//       });

//       const result = await chat.sendMessage(message);
//       const response = await result.response;
//       const text = response.text();

//       // Add response to history
//       this.chatHistory.push({ role: 'assistant', content: text });

//       // Keep history manageable (last 20 messages)
//       if (this.chatHistory.length > 20) {
//         this.chatHistory = this.chatHistory.slice(-20);
//       }

//       return text;
//     } catch (error) {
//       console.error('Gemini API Error:', error);
      
//       // Provide helpful error messages
//       if (error.message?.includes('API key')) {
//         throw new Error('API key issue. Please check your Gemini API key configuration.');
//       } else if (error.message?.includes('quota')) {
//         throw new Error('My server is down. Please try again later.');
//       } else if (error.message?.includes('network')) {
//         throw new Error('Network error. Please check your internet connection.');
//       } else if (error.message?.includes('invalid')) {
//         throw new Error('Invalid request. Please try rephrasing your question.');
//       }
      
//       throw error;
//     }
//   }

//   // Helper function to convert wind degrees to direction
//   getWindDirection(deg) {
//     const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
//                        'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
//     const index = Math.round(deg / 22.5) % 16;
//     return directions[index];
//   }

//   // Get contextual suggestions based on weather (uses imported function)
//   getWeatherBasedSuggestions(weatherContext) {
//     return getWeatherBasedSuggestions(weatherContext);
//   }

//   // Clear chat history
//   clearHistory() {
//     this.chatHistory = [];
//   }

//   // Get chat history (useful for debugging or exporting)
//   getHistory() {
//     return this.chatHistory;
//   }

//   // Set custom temperature for responses (0.0 - 1.0)
//   setTemperature(temp) {
//     this.temperature = Math.max(0, Math.min(1, temp));
//   }
// }

// export const geminiService = new GeminiService();
















// // src/services/geminiAPI.js
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { 
//   GEMINI_API_KEY_1, 
//   GEMINI_API_KEY_2, 
//   GEMINI_API_KEY_3 
// } from '@env';
// import { 
//   getCompleteSystemPrompt, 
//   getWeatherBasedSuggestions,
//   SYSTEM_PROMPTS 
// } from './geminiPrompts';

// class GeminiService {
//   constructor() {
//     // Initialize API keys array
//     this.apiKeys = [GEMINI_API_KEY_1, GEMINI_API_KEY_2, GEMINI_API_KEY_3].filter(key => key);
    
//     if (this.apiKeys.length === 0) {
//       console.error('No GEMINI_API_KEYs defined in environment variables');
//       throw new Error('No API keys configured');
//     }
    
//     console.log(`Initialized with ${this.apiKeys.length} API key(s)`);
    
//     // Initialize round-robin counter
//     this.currentKeyIndex = 0;
    
//     // Initialize genAI instances for each API key
//     this.genAIInstances = this.apiKeys.map(apiKey => new GoogleGenerativeAI(apiKey));
    
//     // Chat history shared across all instances
//     this.chatHistory = [];
    
//     // Track request count for debugging
//     this.requestCount = 0;
//   }

//   // Get the next API instance in round-robin fashion
//   getNextGenAI() {
//     const genAI = this.genAIInstances[this.currentKeyIndex];
//     const keyNumber = this.currentKeyIndex + 1; // For logging (1-based)
    
//     // Move to next key for next request
//     this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
    
//     // Increment request counter
//     this.requestCount++;
    
//     console.log(`Request #${this.requestCount} using API key #${keyNumber}`);
    
//     return genAI;
//   }

//   async sendMessage(message, weatherContext = null) {
//     try {
//       // Get the next genAI instance in round-robin
//       const genAI = this.getNextGenAI();
//       const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
//       // Prepare enhanced weather context with wind direction
//       const enhancedWeatherContext = weatherContext ? {
//         ...weatherContext,
//         windDirection: weatherContext.windDeg ? this.getWindDirection(weatherContext.windDeg) : null
//       } : null;

//       // Get complete system prompt with weather context
//       const systemPrompt = getCompleteSystemPrompt(enhancedWeatherContext);

//       // Add message to history
//       this.chatHistory.push({ role: 'user', content: message });

//       // Create chat session with history
//       const chat = model.startChat({
//         history: [
//           {
//             role: 'user',
//             parts: [{ text: systemPrompt }],
//           },
//           {
//             role: 'model',
//             parts: [{ text: SYSTEM_PROMPTS.INITIAL_GREETING }],
//           },
//           ...this.chatHistory.map(msg => ({
//             role: msg.role === 'user' ? 'user' : 'model',
//             parts: [{ text: msg.content }],
//           })),
//         ],
//         generationConfig: {
//           temperature: 0.7,
//           topK: 1,
//           topP: 0.95,
//           maxOutputTokens: 1024,
//         },
//       });

//       const result = await chat.sendMessage(message);
//       const response = await result.response;
//       const text = response.text();

//       // Add response to history
//       this.chatHistory.push({ role: 'assistant', content: text });

//       // Keep history manageable (last 20 messages)
//       if (this.chatHistory.length > 20) {
//         this.chatHistory = this.chatHistory.slice(-20);
//       }

//       return text;
//     } catch (error) {
//       console.error('Gemini API Error:', error);
//       console.error(`Failed on API key index: ${(this.currentKeyIndex - 1 + this.apiKeys.length) % this.apiKeys.length}`);
      
//       // Provide helpful error messages
//       if (error.message?.includes('API key')) {
//         throw new Error('API key issue. Please check your Gemini API key configuration.');
//       } else if (error.message?.includes('quota')) {
//         throw new Error('API quota exceeded. Please try again later or add more API keys.');
//       } else if (error.message?.includes('network')) {
//         throw new Error('Network error. Please check your internet connection.');
//       } else if (error.message?.includes('invalid')) {
//         throw new Error('Invalid request. Please try rephrasing your question.');
//       }
      
//       throw error;
//     }
//   }

//   // Helper function to convert wind degrees to direction
//   getWindDirection(deg) {
//     const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
//                        'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
//     const index = Math.round(deg / 22.5) % 16;
//     return directions[index];
//   }

//   // Get contextual suggestions based on weather (uses imported function)
//   getWeatherBasedSuggestions(weatherContext) {
//     return getWeatherBasedSuggestions(weatherContext);
//   }

//   // Clear chat history
//   clearHistory() {
//     this.chatHistory = [];
//   }

//   // Get chat history (useful for debugging or exporting)
//   getHistory() {
//     return this.chatHistory;
//   }

//   // Get current API key stats (useful for monitoring)
//   getApiKeyStats() {
//     return {
//       totalKeys: this.apiKeys.length,
//       currentKeyIndex: this.currentKeyIndex,
//       totalRequests: this.requestCount,
//       requestsPerKey: Math.floor(this.requestCount / this.apiKeys.length),
//       nextKeyToUse: this.currentKeyIndex + 1
//     };
//   }

//   // Manually set which key to use next (useful for testing or recovery)
//   setNextKeyIndex(index) {
//     if (index >= 0 && index < this.apiKeys.length) {
//       this.currentKeyIndex = index;
//       console.log(`Next request will use API key #${index + 1}`);
//     } else {
//       console.error(`Invalid key index: ${index}. Must be between 0 and ${this.apiKeys.length - 1}`);
//     }
//   }

//   // Check if service is properly configured
//   isConfigured() {
//     return this.apiKeys.length > 0;
//   }
// }

// // Create singleton instance with error handling
// let geminiService;
// try {
//   geminiService = new GeminiService();
// } catch (error) {
//   console.error('Failed to initialize GeminiService:', error);
//   // Create a dummy service that will fail gracefully
//   geminiService = {
//     sendMessage: async () => {
//       throw new Error('Gemini service not configured. Please add API keys to your .env file.');
//     },
//     getWeatherBasedSuggestions: () => [],
//     clearHistory: () => {},
//     getHistory: () => [],
//     getApiKeyStats: () => ({ totalKeys: 0, currentKeyIndex: 0, totalRequests: 0 }),
//     isConfigured: () => false
//   };
// }

// export { geminiService };































// src/services/geminiAPI.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  GEMINI_API_KEY_1, 
  GEMINI_API_KEY_2, 
  GEMINI_API_KEY_3 
} from '@env';
import { 
  getCompleteSystemPrompt, 
  getWeatherBasedSuggestions,
  SYSTEM_PROMPTS,
  SEARCH_BAR_REDIRECTS 
} from './geminiPrompts';

class GeminiService {
  constructor() {
    // Initialize API keys array
    this.apiKeys = [GEMINI_API_KEY_1, GEMINI_API_KEY_2, GEMINI_API_KEY_3].filter(key => key);
    
    if (this.apiKeys.length === 0) {
      console.error('No GEMINI_API_KEYs defined in environment variables');
      throw new Error('No API keys configured');
    }
    
    console.log(`Initialized with ${this.apiKeys.length} API key(s)`);
    
    // Initialize round-robin counter
    this.currentKeyIndex = 0;
    
    // Initialize genAI instances for each API key
    this.genAIInstances = this.apiKeys.map(apiKey => new GoogleGenerativeAI(apiKey));
    
    // Chat history shared across all instances
    this.chatHistory = [];
    
    // Track request count for debugging
    this.requestCount = 0;
    
    // Track current location for better responses
    this.currentLocation = null;
  }

  // Get the next API instance in round-robin fashion
  getNextGenAI() {
    const genAI = this.genAIInstances[this.currentKeyIndex];
    const keyNumber = this.currentKeyIndex + 1; // For logging (1-based)
    
    // Move to next key for next request
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
    
    // Increment request counter
    this.requestCount++;
    
    console.log(`Request #${this.requestCount} using API key #${keyNumber}`);
    
    return genAI;
  }

  // Enhanced message preprocessing to detect location queries
  preprocessMessage(message, weatherContext) {
    const locationPatterns = [
      /weather in (\w+)/i,
      /what's it like in (\w+)/i,
      /how's the weather in (\w+)/i,
      /(\w+) weather/i,
      /temperature in (\w+)/i,
      /is it raining in (\w+)/i,
      /forecast for (\w+)/i,
      /will it rain in (\w+)/i,
      /(\w+) forecast/i,
      /how hot is it in (\w+)/i,
      /how cold is it in (\w+)/i
    ];

    // Check if user is asking about a different location
    for (const pattern of locationPatterns) {
      const match = message.match(pattern);
      if (match) {
        const requestedLocation = match[1].toLowerCase();
        const currentCity = weatherContext?.city?.toLowerCase();
        
        // If asking about a different city, add context to help the AI respond appropriately
        if (currentCity && requestedLocation !== currentCity && 
            !requestedLocation.includes('today') && 
            !requestedLocation.includes('tomorrow') &&
            !requestedLocation.includes('my') &&
            !requestedLocation.includes('here') &&
            !requestedLocation.includes('this')) {
          
          return {
            isLocationQuery: true,
            requestedLocation: requestedLocation,
            enhancedMessage: `${message} [Note: User is asking about ${requestedLocation}, but I only have access to ${weatherContext.city} weather data]`
          };
        }
      }
    }
    
    return {
      isLocationQuery: false,
      enhancedMessage: message
    };
  }

  async sendMessage(message, weatherContext = null) {
    try {
      // Store current location if available
      if (weatherContext?.city) {
        this.currentLocation = weatherContext.city;
      }

      // Preprocess message to detect location queries
      const { isLocationQuery, requestedLocation, enhancedMessage } = this.preprocessMessage(message, weatherContext);

      // Get the next genAI instance in round-robin
      const genAI = this.getNextGenAI();
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      // Prepare enhanced weather context with additional data
      const enhancedWeatherContext = weatherContext ? {
        ...weatherContext,
        windDirection: weatherContext.windDeg ? this.getWindDirection(weatherContext.windDeg) : null,
        // Ensure UV index is properly handled
        uvIndex: weatherContext.uvIndex !== undefined ? weatherContext.uvIndex : null,
        // Add weather quality indicator
        weatherQuality: this.assessWeatherQuality(weatherContext),
        // Add outfit complexity based on weather
        outfitComplexity: this.getOutfitComplexity(weatherContext)
      } : null;

      // Get complete system prompt with weather context
      const systemPrompt = getCompleteSystemPrompt(enhancedWeatherContext);

      // Add location limitation reminder if needed
      const locationReminder = isLocationQuery ? 
        `\n\nREMINDER: The user asked about ${requestedLocation}. Use this search bar redirect (but customize it): "${SEARCH_BAR_REDIRECTS[Math.floor(Math.random() * SEARCH_BAR_REDIRECTS.length)].replace('[city]', requestedLocation)}"` : '';

      // Add message to history
      this.chatHistory.push({ role: 'user', content: message });

      // Create chat session with history
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt + locationReminder }],
          },
          {
            role: 'model',
            parts: [{ text: SYSTEM_PROMPTS.INITIAL_GREETING }],
          },
          ...this.chatHistory.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
          })),
        ],
        generationConfig: {
          temperature: 0.8, // Slightly higher for more personality
          topK: 1,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      const result = await chat.sendMessage(enhancedMessage);
      const response = await result.response;
      const text = response.text();

      // Add response to history
      this.chatHistory.push({ role: 'assistant', content: text });

      // Keep history manageable (last 20 messages)
      if (this.chatHistory.length > 20) {
        this.chatHistory = this.chatHistory.slice(-20);
      }

      return text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      console.error(`Failed on API key index: ${(this.currentKeyIndex - 1 + this.apiKeys.length) % this.apiKeys.length}`);
      
      // Provide helpful error messages with personality
      if (error.message?.includes('API key')) {
        throw new Error('Oops! Looks like my brain needs a reboot. API key issue - please check the configuration! 🔧');
      } else if (error.message?.includes('quota')) {
        throw new Error('I\'ve been chatting too much today! API quota exceeded. Give me a moment... ⏰');
      } else if (error.message?.includes('network')) {
        throw new Error('Can\'t reach my weather satellites! Please check your internet connection 📡');
      } else if (error.message?.includes('invalid')) {
        throw new Error('Hmm, I didn\'t quite catch that. Could you rephrase? 🤔');
      }
      
      throw error;
    }
  }

  // Helper function to convert wind degrees to direction
  getWindDirection(deg) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  }

  // Assess overall weather quality for better responses
  assessWeatherQuality(weatherContext) {
    if (!weatherContext) return 'unknown';
    
    const temp = weatherContext.temperature;
    const condition = weatherContext.condition.toLowerCase();
    const windSpeed = weatherContext.windSpeed;
    const humidity = weatherContext.humidity;
    
    // Perfect weather conditions
    if (temp >= 20 && temp <= 25 && 
        (condition.includes('clear') || condition.includes('sun')) && 
        windSpeed < 5 && 
        humidity < 70) {
      return 'perfect';
    }
    
    // Good weather
    if (temp >= 15 && temp <= 28 && 
        !condition.includes('rain') && 
        !condition.includes('thunder') && 
        windSpeed < 10) {
      return 'good';
    }
    
    // Challenging weather
    if (temp < 0 || temp > 35 || 
        condition.includes('thunder') || 
        condition.includes('heavy') || 
        windSpeed > 20) {
      return 'challenging';
    }
    
    return 'moderate';
  }

  // Get outfit complexity based on weather
  getOutfitComplexity(weatherContext) {
    if (!weatherContext) return 'simple';
    
    const temp = weatherContext.temperature;
    const condition = weatherContext.condition.toLowerCase();
    
    if (temp < 5 || temp > 35) return 'complex';
    if (condition.includes('rain') || condition.includes('snow')) return 'complex';
    if (temp >= 18 && temp <= 25 && condition.includes('clear')) return 'simple';
    
    return 'moderate';
  }

  // Get contextual suggestions based on weather (uses imported function)
  getWeatherBasedSuggestions(weatherContext) {
    return getWeatherBasedSuggestions(weatherContext);
  }

  // Clear chat history
  clearHistory() {
    this.chatHistory = [];
    console.log('Chat history cleared! Fresh start! 🌟');
  }

  // Get chat history (useful for debugging or exporting)
  getHistory() {
    return this.chatHistory;
  }

  // Get current API key stats (useful for monitoring)
  getApiKeyStats() {
    return {
      totalKeys: this.apiKeys.length,
      currentKeyIndex: this.currentKeyIndex,
      totalRequests: this.requestCount,
      requestsPerKey: Math.floor(this.requestCount / this.apiKeys.length),
      nextKeyToUse: this.currentKeyIndex + 1,
      currentLocation: this.currentLocation
    };
  }

  // Manually set which key to use next (useful for testing or recovery)
  setNextKeyIndex(index) {
    if (index >= 0 && index < this.apiKeys.length) {
      this.currentKeyIndex = index;
      console.log(`Next request will use API key #${index + 1}`);
    } else {
      console.error(`Invalid key index: ${index}. Must be between 0 and ${this.apiKeys.length - 1}`);
    }
  }

  // Check if service is properly configured
  isConfigured() {
    return this.apiKeys.length > 0;
  }
}

// Create singleton instance with error handling
let geminiService;
try {
  geminiService = new GeminiService();
} catch (error) {
  console.error('Failed to initialize GeminiService:', error);
  // Create a dummy service that will fail gracefully
  geminiService = {
    sendMessage: async () => {
      throw new Error('Oops! skAI needs API keys to work! Please add GEMINI_API_KEY_1, 2, or 3 to your .env file 🔑');
    },
    getWeatherBasedSuggestions: () => ['Configure API to get started!'],
    clearHistory: () => {},
    getHistory: () => [],
    getApiKeyStats: () => ({ totalKeys: 0, currentKeyIndex: 0, totalRequests: 0 }),
    isConfigured: () => false
  };
}

export { geminiService };