// src/screens/HomeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import { weatherAPI } from '../services/weatherAPI';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import WeeklyForecast from '../components/WeeklyForecast';
import ChatBot from '../components/ChatBot';
import FloatingChatButton from '../components/FloatingChatButton';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [city, setCity] = useState('');
  const [chatVisible, setChatVisible] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Weather App Location Permission',
            message: 'Weather App needs access to your location for local weather',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        console.log(error);
        if (error.code === 2) {
          Alert.alert(
            'Location Services Off',
            'Please turn on location services to get weather for your current location.',
            [
              { text: 'Use Default Location', onPress: () => fetchWeatherData(23.3441, 85.3096) },
              { text: 'Settings', onPress: () => Linking.openSettings() }
            ]
          );
        }
        // fetchWeatherData(40.7128, -74.0060);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      setLoading(true);
      const [currentWeather, forecastData] = await Promise.all([
        weatherAPI.getCurrentWeather(lat, lon),
        weatherAPI.getForecast(lat, lon),
      ]);
      
      setWeather(currentWeather);
      setForecast(forecastData);
      setCity(currentWeather.name);
      // Set initial load to false after first successful fetch
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCitySearch = async (cityName) => {
    try {
      setLoading(true);
      const currentWeather = await weatherAPI.getWeatherByCity(cityName);
      const forecastData = await weatherAPI.getForecast(
        currentWeather.coord.lat,
        currentWeather.coord.lon
      );
      
      setWeather(currentWeather);
      setForecast(forecastData);
      setCity(currentWeather.name);
      setLocation({
        lat: currentWeather.coord.lat,
        lon: currentWeather.coord.lon,
      });
    } catch (error) {
      console.error('Error searching city:', error);
      if (error.message === 'City not found') {
        alert('City not found. Please check the spelling and try again.');
      } else {
        alert('Failed to fetch weather data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (location.lat && location.lon) {
      fetchWeatherData(location.lat, location.lon);
    }
  };

  const getBackgroundGradient = () => {
    if (!weather) return ['#1e3c72', '#2a5298', '#3d7eaa'];
    
    const condition = weather.weather[0].main.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 19; // Day: 6:00am to 6:59pm | Night: 7:00pm to 5:59am 

    if (isNight) {
      switch (condition) {
        case 'clear':
          return ['#0c1445', '#1e3c72', '#2a5298'];
        case 'clouds':
          return ['#1a1a2e', '#16213e', '#0f3460'];
        case 'rain':
        case 'drizzle':
          return ['#1a1a2e', '#2d3561', '#434a77'];
        case 'thunderstorm':
          return ['#0f0c29', '#302b63', '#24243e'];
        case 'snow':
          return ['#2c3e50', '#3498db', '#2980b9'];
        default:
          return ['#0c1445', '#1e3c72', '#2a5298'];
      }
    }

    switch (condition) {
      case 'clear':
        return ['#56CCF2', '#2F80ED', '#2D9CDB'];
      case 'clouds':
        return ['#606c88', '#3f4c6b', '#536976'];
      case 'rain':
      case 'drizzle':
        return ['#4b6cb7', '#182848', '#2c3e50'];
      case 'thunderstorm':
        return ['#373B44', '#4286f4', '#2e3192'];
      case 'snow':
        return ['#E0EAFC', '#CFDEF3', '#b8cce4'];
      default:
        return ['#56CCF2', '#2F80ED', '#2D9CDB'];
    }
  };

  const getBackgroundElements = () => {
    if (!weather) return null;
    
    const condition = weather.weather[0].main.toLowerCase();
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;

    if (isNight && condition === 'clear') {
      // Stars for clear night
      return (
        <>
          {[...Array(20)].map((_, i) => (
            <View
              key={`star-${i}`}
              style={[
                styles.star,
                {
                  top: `${Math.random() * 70}%`,
                  left: `${Math.random() * 100}%`,
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                }
              ]}
            />
          ))}
        </>
      );
    }

    return null;
  };

  // Enhanced weather context preparation function
  const prepareWeatherContext = () => {
    if (!weather) return null;

    // Format time helper
    const formatTime = (timestamp) => {
      if (!timestamp) return 'N/A';
      return new Date(timestamp * 1000).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    };

    // Prepare forecast data if available
    let forecastData = null;
    if (forecast && forecast.list) {
      // Group forecast by day and get daily min/max
      const dailyData = {};
      forecast.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyData[date]) {
          dailyData[date] = {
            temps: [],
            conditions: [],
            pop: 0,
            date: new Date(item.dt * 1000),
          };
        }
        dailyData[date].temps.push(item.main.temp);
        dailyData[date].conditions.push(item.weather[0].main);
        dailyData[date].pop = Math.max(dailyData[date].pop, item.pop || 0);
      });

      // Convert to array and calculate daily stats
      forecastData = Object.values(dailyData).slice(0, 5).map((day) => ({
        date: day.date,
        tempMin: Math.round(Math.min(...day.temps)),
        tempMax: Math.round(Math.max(...day.temps)),
        condition: day.conditions[Math.floor(day.conditions.length / 2)], // Get mid-day condition
        pop: day.pop,
      }));
    }

    // Calculate UV Index if using OneCall API
    // Note: Basic weather API doesn't provide UV, so this would need OneCall API
    const uvIndex = weather.uvi || null;

    return {
      // Location info
      city: city || weather.name,
      country: weather.sys?.country,
      
      // Temperature data
      temperature: Math.round(weather.main.temp),
      feelsLike: Math.round(weather.main.feels_like),
      tempMin: Math.round(weather.main.temp_min),
      tempMax: Math.round(weather.main.temp_max),
      
      // Weather conditions
      condition: weather.weather[0].main,
      description: weather.weather[0].description,
      
      // Atmospheric data
      humidity: weather.main.humidity,
      pressure: weather.main.pressure,
      visibility: weather.visibility,
      
      // Wind data
      windSpeed: weather.wind.speed,
      windDeg: weather.wind.deg,
      windGust: weather.wind.gust,
      
      // Cloud coverage
      clouds: weather.clouds?.all,
      
      // Rain/Snow data (if available)
      rain1h: weather.rain?.['1h'],
      rain3h: weather.rain?.['3h'],
      snow1h: weather.snow?.['1h'],
      snow3h: weather.snow?.['3h'],
      
      // Sun times
      sunrise: formatTime(weather.sys.sunrise),
      sunset: formatTime(weather.sys.sunset),
      
      // UV Index (if available from OneCall API)
      uvIndex: uvIndex,
      
      // Forecast data
      forecast: forecastData,
      
      // Additional metadata
      lastUpdated: new Date(),
      timezone: weather.timezone,
    };
  };

  if (loading && !refreshing) {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 19; // Day: 6:00am to 6:59pm | Night: 7:00pm to 5:59am 
    
    // Show splash-style loading screen only on initial load
    if (isInitialLoad) {
      return (
        <View style={styles.container}>
          {/* Day/Night gradient background */}
          <LinearGradient 
            colors={isNight ? ['#0c1445', '#1e3c72', '#2a5298'] : ['#FFFFFF', '#F0FDF4', '#ECFCCB']} 
            style={StyleSheet.absoluteFillObject}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
          />
          
          {/* Secondary gradient overlay */}
          <LinearGradient
            colors={isNight ? 
              ['rgba(56,134,237,0.1)', 'transparent', 'rgba(100,200,255,0.1)'] : 
              ['rgba(34,197,94,0.05)', 'transparent', 'rgba(251,191,36,0.05)']}
            style={[StyleSheet.absoluteFillObject, {transform: [{rotate: '45deg'}, {scale: 1.5}]}]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          />
          
          <StatusBar barStyle={isNight ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />
          
          {/* Background decoration */}
          <View style={styles.loadingBackgroundDecoration}>
            {/* Glowing orbs with conditional colors */}
            <Animatable.View 
              animation="pulse" 
              iterationCount="infinite" 
              duration={3000}
              style={styles.loadingGlowingOrb1}
            >
              <LinearGradient
                colors={isNight ? 
                  ['rgba(56,134,237,0.15)', 'rgba(56,134,237,0.05)', 'transparent'] :
                  ['rgba(34,197,94,0.15)', 'rgba(34,197,94,0.05)', 'transparent']}
                style={styles.loadingOrbGradient}
              />
            </Animatable.View>
            
            <Animatable.View 
              animation="pulse" 
              iterationCount="infinite" 
              duration={3500}
              delay={500}
              style={styles.loadingGlowingOrb2}
            >
              <LinearGradient
                colors={isNight ?
                  ['rgba(100,200,255,0.15)', 'rgba(100,200,255,0.05)', 'transparent'] :
                  ['rgba(16,185,129,0.15)', 'rgba(16,185,129,0.05)', 'transparent']}
                style={styles.loadingOrbGradient}
              />
            </Animatable.View>
            
            <Animatable.View 
              animation="pulse" 
              iterationCount="infinite" 
              duration={4000}
              delay={1000}
              style={styles.loadingGlowingOrb3}
            >
              <LinearGradient
                colors={isNight ?
                  ['rgba(255,215,0,0.12)', 'rgba(255,215,0,0.04)', 'transparent'] :
                  ['rgba(251,191,36,0.12)', 'rgba(251,191,36,0.04)', 'transparent']}
                style={styles.loadingOrbGradient}
              />
            </Animatable.View>
            
            {/* Geometric shapes */}
            <View style={[styles.loadingLeafShape1, { backgroundColor: isNight ? 'rgba(56,134,237,0.08)' : 'rgba(34,197,94,0.08)' }]} />
            <View style={[styles.loadingLeafShape2, { backgroundColor: isNight ? 'rgba(100,200,255,0.06)' : 'rgba(16,185,129,0.06)' }]} />
            <View style={[styles.loadingLeafShape3, { backgroundColor: isNight ? 'rgba(255,215,0,0.08)' : 'rgba(251,191,36,0.08)' }]} />
            
            {/* Floating circles */}
            <Animatable.View
              animation={{
                0: { transform: [{ translateY: 0 }, { translateX: 0 }] },
                0.5: { transform: [{ translateY: -30 }, { translateX: 20 }] },
                1: { transform: [{ translateY: 0 }, { translateX: 0 }] },
              }}
              iterationCount="infinite"
              duration={5000}
              style={[styles.loadingFloatingCircle1, {
                backgroundColor: isNight ? 'rgba(56,134,237,0.05)' : 'rgba(34,197,94,0.05)',
                borderColor: isNight ? 'rgba(56,134,237,0.1)' : 'rgba(34,197,94,0.1)',
              }]}
            />
            
            <Animatable.View
              animation={{
                0: { transform: [{ translateY: 0 }, { translateX: 0 }] },
                0.5: { transform: [{ translateY: 20 }, { translateX: -15 }] },
                1: { transform: [{ translateY: 0 }, { translateX: 0 }] },
              }}
              iterationCount="infinite"
              duration={4000}
              delay={1000}
              style={[styles.loadingFloatingCircle2, {
                backgroundColor: isNight ? 'rgba(255,215,0,0.05)' : 'rgba(251,191,36,0.05)',
                borderColor: isNight ? 'rgba(255,215,0,0.1)' : 'rgba(251,191,36,0.1)',
              }]}
            />
            
            {/* Weather icons decoration */}
            <View style={styles.loadingIconDecoration}>
              <Animatable.View animation="fadeIn" delay={200} style={[styles.loadingDecorIcon, { top: 100, left: 40 }]}>
                <Icon name="cloud" size={24} color={isNight ? "rgba(100,200,255,0.15)" : "rgba(34,197,94,0.15)"} />
              </Animatable.View>
              <Animatable.View animation="fadeIn" delay={400} style={[styles.loadingDecorIcon, { top: 150, right: 50 }]}>
                <Icon name="sun" size={28} color={isNight ? "rgba(255,215,0,0.15)" : "rgba(251,191,36,0.15)"} />
              </Animatable.View>
              <Animatable.View animation="fadeIn" delay={600} style={[styles.loadingDecorIcon, { bottom: 180, left: 60 }]}>
                <Icon name="wind" size={22} color={isNight ? "rgba(56,134,237,0.12)" : "rgba(16,185,129,0.12)"} />
              </Animatable.View>
            </View>
          </View>
          
          {/* Main loading content */}
          <View style={styles.loadingContentContainer}>
            <Animatable.View
              animation="zoomIn"
              duration={1200}
              style={styles.loadingLogoContainer}
            >
              <LinearGradient
                colors={isNight ? ['#3886ED', '#56B4E9', '#64C8FF'] : ['#10B981', '#22C55E', '#34D399']}
                style={styles.loadingLogoBackground}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
              >
                <View style={styles.loadingLogoInner}>
                  <Animatable.View 
                    animation={{
                      0: { transform: [{ rotate: '0deg' }, { scale: 1 }] },
                      0.5: { transform: [{ rotate: '180deg' }, { scale: 1.1 }] },
                      1: { transform: [{ rotate: '360deg' }, { scale: 1 }] },
                    }}
                    iterationCount="infinite"
                    duration={3000}
                  >
                    <Icon name="sun" size={50} color="#FFFFFF" />
                  </Animatable.View>
                </View>
              </LinearGradient>
              
              {/* Logo shadow */}
              <View style={[styles.loadingLogoShadow, { 
                backgroundColor: isNight ? 'rgba(56,134,237,0.08)' : 'rgba(34,197,94,0.08)' 
              }]} />
            </Animatable.View>
            
            <Animatable.Text
              animation="fadeInUp"
              delay={600}
              style={[styles.loadingMainText, { color: isNight ? '#64C8FF' : '#047857' }]}
            >
              Tuning into the Atmosphere
            </Animatable.Text>
            
            {/* <Animatable.Text
              animation="fadeIn"
              delay={1500}
              style={[styles.loadingSubText, { color: isNight ? '#56B4E9' : '#059669' }]}
            >
              Just a moment
            </Animatable.Text> */}

            <Animatable.Text
              animation="fadeIn"
              delay={1500}
              style={[styles.loadingSubText2, { color: isNight ? '#56B4E9' : '#059669' }]}
            >
              Initializing skAI
            </Animatable.Text>
            
            {/* Three dots loading indicator */}
            <Animatable.View
              animation="fadeIn"
              delay={1000}
              style={styles.loadingDotsContainer}
            >
              <Animatable.View
                animation={{
                  0: { opacity: 0.3, transform: [{ scale: 0.8 }] },
                  0.5: { opacity: 1, transform: [{ scale: 1.2 }] },
                  1: { opacity: 0.3, transform: [{ scale: 0.8 }] },
                }}
                iterationCount="infinite"
                duration={1500}
                style={[styles.loadingDot, styles.loadingDot1]}
              >
                <LinearGradient
                  colors={isNight ? ['#64C8FF', '#3886ED'] : ['#34D399', '#10B981']}
                  style={styles.loadingDotGradient}
                />
              </Animatable.View>
              
              <Animatable.View
                animation={{
                  0: { opacity: 0.3, transform: [{ scale: 0.8 }] },
                  0.5: { opacity: 1, transform: [{ scale: 1.2 }] },
                  1: { opacity: 0.3, transform: [{ scale: 0.8 }] },
                }}
                iterationCount="infinite"
                duration={1500}
                delay={300}
                style={[styles.loadingDot, styles.loadingDot2]}
              >
                <LinearGradient
                  colors={isNight ? ['#56B4E9', '#2F80ED'] : ['#22C55E', '#16A34A']}
                  style={styles.loadingDotGradient}
                />
              </Animatable.View>
              
              <Animatable.View
                animation={{
                  0: { opacity: 0.3, transform: [{ scale: 0.8 }] },
                  0.5: { opacity: 1, transform: [{ scale: 1.2 }] },
                  1: { opacity: 0.3, transform: [{ scale: 0.8 }] },
                }}
                iterationCount="infinite"
                duration={1500}
                delay={600}
                style={[styles.loadingDot, styles.loadingDot3]}
              >
                <LinearGradient
                  colors={isNight ? ['#FFD700', '#FFA500'] : ['#FCD34D', '#FBB040']}
                  style={styles.loadingDotGradient}
                />
              </Animatable.View>
            </Animatable.View>
            
            {/* Location being fetched indicator */}
            <Animatable.View 
              animation="fadeInUp" 
              delay={1200}
              style={styles.loadingLocationContainer}
            >
              <Icon name="map-pin" size={16} color={isNight ? '#56B4E9' : '#10B981'} />
              <Text style={[styles.loadingLocationText, { color: isNight ? '#56B4E9' : '#059669' }]}>
                {city || 'Getting your location ...'}
              </Text>
            </Animatable.View>
          </View>
          
          {/* Bottom decoration */}
          <View style={styles.loadingBottomDecoration}>
            <LinearGradient
              colors={['transparent', isNight ? 'rgba(56,134,237,0.05)' : 'rgba(34,197,94,0.05)']}
              style={styles.loadingBottomGradient}
            />
          </View>
        </View>
      );
    }
    
    // Show original simple loading screen for subsequent loads
    return (
      <LinearGradient colors={['#1e3c72', '#2a5298', '#3d7eaa']} style={styles.container}>
        <View style={styles.backgroundDecoration}>
          <View style={styles.loadingOrb1} />
          <View style={styles.loadingOrb2} />
        </View>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingCard}>
            <Animatable.View animation="rotate" iterationCount="infinite" duration={3000}>
              <View>
                <Icon name="sun" size={40} color="#FFD700" />
              </View>
            </Animatable.View>
            <Text style={styles.loadingText}>Fetching weather data...</Text>
            <Text style={styles.loadingSubtext}>Just a moment</Text>
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      {/* Multiple gradient layers for depth */}
      <LinearGradient 
        colors={getBackgroundGradient()} 
        style={StyleSheet.absoluteFillObject}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
      
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Enhanced background decoration */}
      <View style={styles.backgroundDecoration}>
        {/* Glowing orbs */}
        <View style={styles.glowingOrb1}>
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)', 'transparent']}
            style={styles.orbGradient}
          />
        </View>
        
        <View style={styles.glowingOrb2}>
          <LinearGradient
            colors={['rgba(100,200,255,0.1)', 'rgba(100,200,255,0.05)', 'transparent']}
            style={styles.orbGradient}
          />
        </View>
        
        <View style={styles.glowingOrb3}>
          <LinearGradient
            colors={['rgba(255,200,100,0.08)', 'rgba(255,200,100,0.04)', 'transparent']}
            style={styles.orbGradient}
          />
        </View>
        
        {/* Geometric shapes */}
        <View style={styles.hexagon1} />
        <View style={styles.hexagon2} />
        
        {/* Floating elements */}
        <View style={styles.floatingSquare1} />
        <View style={styles.floatingSquare2} />
        <View style={styles.floatingCircle} />
        
        {/* Weather-specific elements */}
        {getBackgroundElements()}
      </View>
      
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFF"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <SearchBar onSearch={handleCitySearch} />
        
        {weather && (
          <Animatable.View animation="fadeInUp" duration={800}>
            <WeatherCard weather={weather} city={city} />
          </Animatable.View>
        )}

        {forecast && (
          <>
            <Animatable.View animation="fadeInUp" duration={1000} delay={200}>
              <HourlyForecast forecast={forecast} />
            </Animatable.View>

            <Animatable.View animation="fadeInUp" duration={1200} delay={400}>
              <WeeklyForecast forecast={forecast} />
            </Animatable.View>
          </>
        )}

        <TouchableOpacity 
          style={styles.locationButton} 
          onPress={getCurrentLocation}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.08)']}
            style={styles.locationButtonGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          >
            <Icon name="navigation-2" size={18} color="#FFF" />
            <Text style={styles.locationButtonText}>Update Location</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {weather && (
        <>
          <FloatingChatButton onPress={() => setChatVisible(true)} />
          <ChatBot
            visible={chatVisible}
            onClose={() => setChatVisible(false)}
            weatherData={prepareWeatherContext()}
          />
        </>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  glowingOrb1: {
    position: 'absolute',
    width: 500,
    height: 500,
    borderRadius: 250,
    top: -250,
    right: -100,
    opacity: 0.6,
  },
  glowingOrb2: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    bottom: -200,
    left: -150,
    opacity: 0.5,
  },
  glowingOrb3: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    top: '40%',
    right: -100,
    opacity: 0.4,
  },
  orbGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
  },
  hexagon1: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    transform: [{ rotate: '30deg' }],
    top: '20%',
    left: 30,
  },
  hexagon2: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    transform: [{ rotate: '45deg' }],
    bottom: '30%',
    right: 40,
  },
  floatingSquare1: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 15,
    transform: [{ rotate: '15deg' }],
    top: '60%',
    left: 50,
  },
  floatingSquare2: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 10,
    transform: [{ rotate: '-20deg' }],
    top: '35%',
    right: 30,
  },
  floatingCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    bottom: '20%',
    right: '40%',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderRadius: 50,
    opacity: 0.8,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  loadingOrb1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    // backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: 'rgba(199, 205, 88, 0.05)',
    top: -100,
    right: -100,
  },
  loadingOrb2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(106, 233, 63, 0.05)',
    bottom: -50,
    left: -50,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight + 20 || 60,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(88, 234, 55, 0.1)',
    padding: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  loadingSubtext: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 5,
  },
  locationButton: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  locationButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  locationButtonText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // Loading screen styles - Splash screen inspired
  loadingBackgroundDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loadingGlowingOrb1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    top: -150,
    right: -100,
  },
  loadingGlowingOrb2: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    bottom: -180,
    left: -120,
  },
  loadingGlowingOrb3: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    top: '35%',
    right: '20%',
  },
  loadingOrbGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
  },
  loadingLeafShape1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    transform: [{ rotate: '45deg' }, { scaleX: 0.7 }],
    top: '20%',
    left: 30,
  },
  loadingLeafShape2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    transform: [{ rotate: '-30deg' }, { scaleX: 0.6 }],
    bottom: '30%',
    right: 40,
  },
  loadingLeafShape3: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    transform: [{ rotate: '60deg' }, { scaleX: 0.8 }],
    top: '50%',
    left: '25%',
  },
  loadingFloatingCircle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    top: '25%',
    right: 20,
    borderWidth: 1,
  },
  loadingFloatingCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    bottom: '35%',
    left: 30,
    borderWidth: 1,
  },
  loadingIconDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loadingDecorIcon: {
    position: 'absolute',
  },
  loadingContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingLogoContainer: {
    marginBottom: 40,
    position: 'relative',
  },
  loadingLogoBackground: {
    width: 140,
    height: 140,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
  },
  loadingLogoInner: {
    width: 140,
    height: 140,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogoShadow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    top: -10,
    left: -10,
    zIndex: -1,
  },
  loadingMainText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  loadingSubText: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 1,
  },
  loadingSubText2: {
    fontSize: 15,
    marginBottom: 50,
    fontWeight: '400',
    letterSpacing: 1,
  },
  loadingDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  loadingDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginHorizontal: 8,
    overflow: 'hidden',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingDotGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
  },
  loadingLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
  },
  loadingLocationText: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  loadingBottomDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  loadingBottomGradient: {
    flex: 1,
  },
});

export default HomeScreen;