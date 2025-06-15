// src/services/geminiPrompts.js

export const SYSTEM_PROMPTS = {
  // Base system prompt
  BASE_PROMPT: `You are WeathronixAI, a helpful and friendly weather assistant integrated into the Weathronix weather app powered by skAI. 
Your primary role is to help users understand weather conditions, provide weather-related advice, and answer questions about the weather.

Key characteristics:
- Be friendly, conversational, and helpful
- Use weather emojis appropriately (☀️🌧️⛈️❄️🌤️☁️🌫️💨)
- Keep responses concise unless the user asks for detailed information
- Be proactive in offering relevant weather tips and safety advice
- Use a warm, approachable tone while maintaining accuracy
- Reference the app name "Weathronix" naturally when appropriate`,

  // Weather context template
  WEATHER_CONTEXT_TEMPLATE: (context) => `
Current weather context:
- Location: ${context.city}${context.country ? `, ${context.country}` : ''}
- Temperature: ${context.temperature}°C (feels like ${context.feelsLike}°C)
- Condition: ${context.condition}
- Description: ${context.description}
- Humidity: ${context.humidity}%
- Wind: ${context.windSpeed} m/s${context.windDeg ? ` from ${context.windDirection}` : ''}
- Pressure: ${context.pressure} hPa
- Visibility: ${context.visibility ? `${(context.visibility / 1000).toFixed(1)} km` : 'N/A'}
- UV Index: ${context.uvIndex || 'N/A'}
- Sunrise: ${context.sunrise || 'N/A'}
- Sunset: ${context.sunset || 'N/A'}
${context.forecast ? formatForecastContext(context.forecast) : ''}`,

  // Initial greeting
  INITIAL_GREETING: "I understand. I'm WeathronixAI, ready to help with weather-related questions! I can provide weather insights, outfit suggestions, activity recommendations, and safety tips based on current conditions.",

  // Capability descriptions
  CAPABILITIES: `
I can help you with:
1. Current weather explanations and insights
2. Outfit and clothing recommendations
3. Activity suggestions based on weather conditions
4. Weather safety tips and alerts
5. UV protection advice
6. Travel weather considerations
7. Health-related weather impacts
8. Explaining weather phenomena
9. Comparing weather conditions
10. Planning for upcoming weather`,

  // Response guidelines
  RESPONSE_GUIDELINES: `
When responding:
- Always consider the current weather context in your answers
- Provide practical, actionable advice
- Include relevant safety warnings when appropriate
- Use temperature in Celsius as provided
- Consider time of day for recommendations (use sunrise/sunset data)
- Be specific about weather impacts on daily activities
- Mention weather trends if forecast data is available`,

  // Safety priorities
  SAFETY_PRIORITIES: `
Always prioritize safety in extreme weather:
- Thunderstorms: Warn about lightning safety, seek shelter
- High UV: Recommend sun protection
- Extreme heat: Suggest hydration and cooling strategies
- Extreme cold: Advise on hypothermia prevention
- Heavy rain: Mention flood risks and driving safety
- Strong winds: Warn about flying debris
- Poor visibility: Advise caution for travelers`,

  // Conversation examples
  EXAMPLE_INTERACTIONS: `
Example interactions to emulate:

User: "What should I wear today?"
Assistant: "Based on the current temperature of [temp]°C with [condition], I'd recommend [specific clothing suggestions]. Don't forget [weather-specific accessories]! 👕"

User: "Can I go jogging?"
Assistant: "The weather looks [assessment] for jogging! With [conditions], [specific advice]. Best time would be [recommendation based on conditions]. 🏃‍♂️"

User: "Will it rain?"
Assistant: "[Direct answer based on forecast/current conditions]. [Additional context about precipitation probability or timing]. [Practical advice if rain is expected]. ☔"`,
};

// Helper function to format forecast context
function formatForecastContext(forecast) {
  if (!forecast || forecast.length === 0) return '';
  
  let forecastText = '\n\nUpcoming weather:';
  forecast.slice(0, 5).forEach((day, index) => {
    const dayLabel = index === 0 ? 'Today' : 
                    index === 1 ? 'Tomorrow' : 
                    `Day ${index + 1}`;
    forecastText += `\n- ${dayLabel}: ${day.condition}, ${day.tempMin}°C - ${day.tempMax}°C`;
    if (day.pop) {
      forecastText += ` (${Math.round(day.pop * 100)}% chance of rain)`;
    }
  });
  
  return forecastText;
}

// Weather-based conversation starters
export const WEATHER_BASED_SUGGESTIONS = {
  cold: [
    "How to dress warmly today?",
    "Is it too cold for outdoor activities?",
    "Tips for staying warm?",
    "Will it get warmer later?"
  ],
  hot: [
    "How to stay cool today?",
    "Best time to go outside?",
    "Do I need sunscreen?",
    "Hydration tips for this heat?"
  ],
  rainy: [
    "Will I need an umbrella?",
    "How long will the rain last?",
    "Is it safe to drive?",
    "Indoor activity suggestions?"
  ],
  clear: [
    "Good day for outdoor activities?",
    "UV protection needed?",
    "Best parks to visit today?",
    "Sunset time today?"
  ],
  cloudy: [
    "Will the sun come out today?",
    "Good weather for photography?",
    "Will it rain later?",
    "Temperature changes expected?"
  ],
  windy: [
    "Is it too windy for cycling?",
    "Any wind warnings?",
    "How strong are the winds?",
    "Will it calm down later?"
  ],
  snowy: [
    "Road conditions safe?",
    "How much snow expected?",
    "Tips for snow safety?",
    "Will it stick to the ground?"
  ],
  stormy: [
    "Lightning safety tips?",
    "How severe is the storm?",
    "When will it pass?",
    "Should I unplug electronics?"
  ]
};

// Special responses for extreme conditions
export const EXTREME_WEATHER_ALERTS = {
  highTemp: (temp) => temp > 35 ? 
    "⚠️ Extreme heat warning! Please stay hydrated and avoid prolonged sun exposure." : null,
  
  lowTemp: (temp) => temp < -10 ? 
    "⚠️ Extreme cold warning! Dress in layers and limit time outdoors." : null,
  
  highUV: (uv) => uv > 8 ? 
    "⚠️ Very high UV index! Sun protection is essential - use SPF 30+ and seek shade." : null,
  
  strongWind: (speed) => speed > 20 ? 
    "⚠️ Strong wind advisory! Be cautious of flying debris and difficult driving conditions." : null,
  
  heavyRain: (condition) => condition.toLowerCase().includes('heavy') ? 
    "⚠️ Heavy rain alert! Watch for flooding and drive carefully with reduced visibility." : null,
  
  thunder: (condition) => condition.toLowerCase().includes('thunder') ? 
    "⚡ Thunderstorm safety: Stay indoors, avoid tall objects, and don't use corded phones." : null
};

// Activity recommendations based on weather
export const ACTIVITY_RECOMMENDATIONS = {
  outdoor: {
    excellent: [
      "Perfect weather for hiking or nature walks! 🥾",
      "Great day for a picnic in the park! 🧺",
      "Ideal conditions for outdoor sports! ⚽",
      "Beautiful weather for sightseeing! 📸"
    ],
    good: [
      "Nice weather for a short walk",
      "Good for outdoor activities with proper preparation",
      "Suitable for gardening or yard work",
      "Fine for a quick jog"
    ],
    poor: [
      "Better to plan indoor activities today",
      "Not ideal for extended outdoor time",
      "Consider postponing outdoor plans",
      "Indoor alternatives would be more comfortable"
    ]
  }
};

// Clothing recommendations templates
export const CLOTHING_TEMPLATES = {
  freezing: {
    base: "Heavy winter coat, thermal underwear, warm layers",
    accessories: "Winter hat, gloves, scarf, warm boots"
  },
  cold: {
    base: "Warm jacket or coat, long pants, long sleeves",
    accessories: "Light gloves, warm shoes"
  },
  cool: {
    base: "Light jacket or sweater, long pants",
    accessories: "Bring a layer for evening"
  },
  mild: {
    base: "Light long sleeves or t-shirt with cardigan, comfortable pants",
    accessories: "Sunglasses if sunny"
  },
  warm: {
    base: "T-shirt or light shirt, shorts or light pants",
    accessories: "Sun hat, sunglasses"
  },
  hot: {
    base: "Light, breathable clothing, shorts",
    accessories: "Sun hat, sunglasses, water bottle"
  },
  rainy: {
    additional: "Waterproof jacket or umbrella, water-resistant shoes"
  }
};

// Health and wellness tips
export const HEALTH_TIPS = {
  highHumidity: "High humidity can make it feel hotter and may affect breathing. Take it easy and stay hydrated! 💧",
  lowHumidity: "Low humidity can dry out skin and sinuses. Consider using moisturizer and staying hydrated.",
  coldWeather: "Cold weather can affect circulation. Keep moving to stay warm and protect extremities!",
  hotWeather: "Heat can cause exhaustion. Take frequent breaks in shade and drink water regularly.",
  allergyAlert: "Weather conditions may increase pollen. Consider allergy medication if you're sensitive. 🤧"
};

// Export a function to get complete system prompt
export function getCompleteSystemPrompt(weatherContext = null) {
  let prompt = SYSTEM_PROMPTS.BASE_PROMPT;
  
  if (weatherContext) {
    prompt += '\n\n' + SYSTEM_PROMPTS.WEATHER_CONTEXT_TEMPLATE(weatherContext);
    
    // Add any relevant extreme weather alerts
    const alerts = [];
    if (weatherContext.temperature) {
      const tempAlert = EXTREME_WEATHER_ALERTS.highTemp(weatherContext.temperature) || 
                       EXTREME_WEATHER_ALERTS.lowTemp(weatherContext.temperature);
      if (tempAlert) alerts.push(tempAlert);
    }
    
    if (weatherContext.uvIndex) {
      const uvAlert = EXTREME_WEATHER_ALERTS.highUV(weatherContext.uvIndex);
      if (uvAlert) alerts.push(uvAlert);
    }
    
    if (weatherContext.windSpeed) {
      const windAlert = EXTREME_WEATHER_ALERTS.strongWind(weatherContext.windSpeed);
      if (windAlert) alerts.push(windAlert);
    }
    
    if (alerts.length > 0) {
      prompt += '\n\nActive weather alerts:\n' + alerts.join('\n');
    }
  }
  
  prompt += '\n\n' + SYSTEM_PROMPTS.RESPONSE_GUIDELINES;
  prompt += '\n\n' + SYSTEM_PROMPTS.SAFETY_PRIORITIES;
  
  return prompt;
}

// Export function to get weather-based suggestions
export function getWeatherBasedSuggestions(weatherContext) {
  if (!weatherContext) {
    return ["What's the weather like?", "Tell me about today's weather", "Weather forecast", "Any weather alerts?"];
  }
  
  const temp = weatherContext.temperature;
  const condition = weatherContext.condition.toLowerCase();
  
  let category = 'clear';
  
  if (temp < 5) category = 'cold';
  else if (temp > 30) category = 'hot';
  else if (condition.includes('rain') || condition.includes('drizzle')) category = 'rainy';
  else if (condition.includes('cloud')) category = 'cloudy';
  else if (condition.includes('snow')) category = 'snowy';
  else if (condition.includes('thunder')) category = 'stormy';
  else if (weatherContext.windSpeed > 10) category = 'windy';
  
  return WEATHER_BASED_SUGGESTIONS[category] || WEATHER_BASED_SUGGESTIONS.clear;
}