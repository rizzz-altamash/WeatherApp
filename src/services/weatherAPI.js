// src/services/weatherAPI.js
import { OPENWEATHER_API_KEY, BASE_URL } from '@env';

const API_KEY = OPENWEATHER_API_KEY;
// Fallback agar .env.local nahi mila
const API_BASE_URL = BASE_URL || 'https://api.openweathermap.org/data/2.5';

const buildUrl = (endpoint, params) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url.toString();
};

export const weatherAPI = {
  getCurrentWeather: async (lat, lon) => {
    try {
      const url = buildUrl('/weather', {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  getWeatherByCity: async (city) => {
    try {
      const url = buildUrl('/weather', {
        q: city,
        appid: API_KEY,
        units: 'metric',
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw error;
    }
  },

  getForecast: async (lat, lon) => {
    try {
      const url = buildUrl('/forecast', {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  },

  getOneCallData: async (lat, lon) => {
    try {
      const url = new URL('https://api.openweathermap.org/data/3.0/onecall');
      url.searchParams.append('lat', lat);
      url.searchParams.append('lon', lon);
      url.searchParams.append('appid', API_KEY);
      url.searchParams.append('units', 'metric');
      url.searchParams.append('exclude', 'minutely,alerts');
      
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching one call data:', error);
      throw error;
    }
  },
};