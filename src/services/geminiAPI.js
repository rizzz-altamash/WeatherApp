// // src/services/geminiAPI.js
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { GEMINI_API_KEY } from '@env';

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
//       // Build context-aware prompt
//       let contextPrompt = `You are WeathronixAI, a helpful weather assistant integrated into the Weathronix weather app powered by skAI. 
//       You can help users understand weather conditions, provide weather-related advice, and answer questions about the weather.
//       Be friendly, concise, and helpful. Use weather emojis when appropriate.
//       Keep responses brief unless the user asks for detailed information.`;

//       if (weatherContext) {
//         // Enhanced context with more weather data
//         contextPrompt += `\n\nCurrent weather context:
//         - Location: ${weatherContext.city}, ${weatherContext.country || ''}
//         - Temperature: ${weatherContext.temperature}°C (feels like ${weatherContext.feelsLike}°C)
//         - Condition: ${weatherContext.condition}
//         - Description: ${weatherContext.description}
//         - Humidity: ${weatherContext.humidity}%
//         - Wind: ${weatherContext.windSpeed} m/s${weatherContext.windDeg ? ` from ${this.getWindDirection(weatherContext.windDeg)}` : ''}
//         - Pressure: ${weatherContext.pressure} hPa
//         - Visibility: ${weatherContext.visibility ? `${(weatherContext.visibility / 1000).toFixed(1)} km` : 'N/A'}
//         - UV Index: ${weatherContext.uvIndex || 'N/A'}
//         - Sunrise: ${weatherContext.sunrise || 'N/A'}
//         - Sunset: ${weatherContext.sunset || 'N/A'}`;

//         // Add forecast context if available
//         if (weatherContext.forecast) {
//           contextPrompt += `\n\nUpcoming weather:`;
//           weatherContext.forecast.slice(0, 3).forEach((day, index) => {
//             contextPrompt += `\n- ${index === 0 ? 'Today' : `Day ${index + 1}`}: ${day.condition}, ${day.tempMin}°C - ${day.tempMax}°C`;
//           });
//         }
//       }

//       // Add message to history
//       this.chatHistory.push({ role: 'user', content: message });

//       // Create chat session with history
//       const chat = this.model.startChat({
//         history: [
//           {
//             role: 'user',
//             parts: [{ text: contextPrompt }],
//           },
//           {
//             role: 'model',
//             parts: [{ text: 'I understand. I\'m WeathronixAI, ready to help with weather-related questions!' }],
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
//         throw new Error('API quota exceeded. Please try again later.');
//       } else if (error.message?.includes('network')) {
//         throw new Error('Network error. Please check your internet connection.');
//       }
      
//       throw error;
//     }
//   }

//   // Helper function to convert wind degrees to direction
//   getWindDirection(deg) {
//     const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
//     const index = Math.round(deg / 22.5) % 16;
//     return directions[index];
//   }

//   // Get contextual suggestions based on weather
//   getWeatherBasedSuggestions(weatherContext) {
//     if (!weatherContext) return [];

//     const suggestions = [];
//     const temp = weatherContext.temperature;
//     const condition = weatherContext.condition.toLowerCase();

//     // Temperature-based suggestions
//     if (temp < 0) {
//       suggestions.push('How to stay warm today?');
//     } else if (temp > 30) {
//       suggestions.push('How to stay cool?');
//     }

//     // Condition-based suggestions
//     if (condition.includes('rain')) {
//       suggestions.push('Will I need an umbrella?');
//     } else if (condition.includes('snow')) {
//       suggestions.push('Is it safe to drive?');
//     } else if (condition.includes('clear')) {
//       suggestions.push('Good day for outdoor activities?');
//     }

//     // UV Index suggestion
//     if (weatherContext.uvIndex && weatherContext.uvIndex > 5) {
//       suggestions.push('Do I need sunscreen?');
//     }

//     // General suggestions
//     suggestions.push('What should I wear today?');
    
//     return suggestions.slice(0, 4); // Return max 4 suggestions
//   }

//   clearHistory() {
//     this.chatHistory = [];
//   }
// }

// export const geminiService = new GeminiService();
















// src/services/geminiAPI.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '@env';
import { 
  getCompleteSystemPrompt, 
  getWeatherBasedSuggestions,
  SYSTEM_PROMPTS 
} from './geminiPrompts';

class GeminiService {
  constructor() {
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not defined in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.chatHistory = [];
  }

  async sendMessage(message, weatherContext = null) {
    try {
      // Prepare enhanced weather context with wind direction
      const enhancedWeatherContext = weatherContext ? {
        ...weatherContext,
        windDirection: weatherContext.windDeg ? this.getWindDirection(weatherContext.windDeg) : null
      } : null;

      // Get complete system prompt with weather context
      const systemPrompt = getCompleteSystemPrompt(enhancedWeatherContext);

      // Add message to history
      this.chatHistory.push({ role: 'user', content: message });

      // Create chat session with history
      const chat = this.model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }],
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
          temperature: 0.7,
          topK: 1,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      const result = await chat.sendMessage(message);
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
      
      // Provide helpful error messages
      if (error.message?.includes('API key')) {
        throw new Error('API key issue. Please check your Gemini API key configuration.');
      } else if (error.message?.includes('quota')) {
        throw new Error('API quota exceeded. Please try again later.');
      } else if (error.message?.includes('network')) {
        throw new Error('Network error. Please check your internet connection.');
      } else if (error.message?.includes('invalid')) {
        throw new Error('Invalid request. Please try rephrasing your question.');
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

  // Get contextual suggestions based on weather (uses imported function)
  getWeatherBasedSuggestions(weatherContext) {
    return getWeatherBasedSuggestions(weatherContext);
  }

  // Clear chat history
  clearHistory() {
    this.chatHistory = [];
  }

  // Get chat history (useful for debugging or exporting)
  getHistory() {
    return this.chatHistory;
  }

  // Set custom temperature for responses (0.0 - 1.0)
  setTemperature(temp) {
    this.temperature = Math.max(0, Math.min(1, temp));
  }
}

export const geminiService = new GeminiService();