// src/utils/fetchWithRetry.js

const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

export const fetchWithRetry = async (
  url,
  options = {},
  maxRetries = 3,
  retryDelay = 1000,
  timeout = 10000
) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetchWithTimeout(url, options, timeout);
      
      if (!response.ok) {
        // Don't retry on client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        // Retry on server errors (5xx)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors or abort errors
      if (
        error.message.includes('HTTP 4') ||
        error.message === 'Request timeout' ||
        i === maxRetries - 1
      ) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
    }
  }
  
  throw lastError;
};

// Usage example in weatherAPI.js:
/*
import { fetchWithRetry } from '../utils/fetchWithRetry';

export const weatherAPI = {
  getCurrentWeather: async (lat, lon) => {
    try {
      const url = buildUrl('/weather', {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      });
      
      const response = await fetchWithRetry(url, {}, 3, 1000, 15000);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },
  // ... other methods
};
*/