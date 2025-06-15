// // src/screens/HomeScreen.js
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   RefreshControl,
//   StatusBar,
//   ImageBackground,
//   Dimensions,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/Feather';
// import Geolocation from 'react-native-geolocation-service';
// import { weatherAPI } from '../services/weatherAPI';
// import SearchBar from '../components/SearchBar';
// import WeatherCard from '../components/WeatherCard';
// import HourlyForecast from '../components/HourlyForecast';
// import WeeklyForecast from '../components/WeeklyForecast';

// const { width, height } = Dimensions.get('window');

// const HomeScreen = () => {
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [location, setLocation] = useState({ lat: null, lon: null });
//   const [city, setCity] = useState('');

//   const scrollViewRef = useRef(null);

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Weather App Location Permission',
//             message: 'Weather App needs access to your location for local weather',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           getCurrentLocation();
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else {
//       getCurrentLocation();
//     }
//   };

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ lat: latitude, lon: longitude });
//         fetchWeatherData(latitude, longitude);
//       },
//       (error) => {
//         console.log(error);
//         // Default to New York if location fails
//         fetchWeatherData(40.7128, -74.0060);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const fetchWeatherData = async (lat, lon) => {
//     try {
//       setLoading(true);
//       const [currentWeather, forecastData] = await Promise.all([
//         weatherAPI.getCurrentWeather(lat, lon),
//         weatherAPI.getForecast(lat, lon),
//       ]);
      
//       setWeather(currentWeather);
//       setForecast(forecastData);
//       setCity(currentWeather.name);
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleCitySearch = async (cityName) => {
//     try {
//       setLoading(true);
//       const currentWeather = await weatherAPI.getWeatherByCity(cityName);
//       const forecastData = await weatherAPI.getForecast(
//         currentWeather.coord.lat,
//         currentWeather.coord.lon
//       );
      
//       setWeather(currentWeather);
//       setForecast(forecastData);
//       setCity(currentWeather.name);
//       setLocation({
//         lat: currentWeather.coord.lat,
//         lon: currentWeather.coord.lon,
//       });
//     } catch (error) {
//       console.error('Error searching city:', error);
//       // Show a user-friendly error message
//       if (error.message === 'City not found') {
//         alert('City not found. Please check the spelling and try again.');
//       } else {
//         alert('Failed to fetch weather data. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     if (location.lat && location.lon) {
//       fetchWeatherData(location.lat, location.lon);
//     }
//   };

//   const getBackgroundGradient = () => {
//     if (!weather) return ['#4A90E2', '#67B6FF'];
    
//     const condition = weather.weather[0].main.toLowerCase();
//     const hour = new Date().getHours();
//     const isNight = hour < 6 || hour > 18;

//     if (isNight) {
//       return ['#0F2027', '#203A43', '#2C5364'];
//     }

//     switch (condition) {
//       case 'clear':
//         return ['#56CCF2', '#2F80ED'];
//       case 'clouds':
//         return ['#757F9A', '#D7DDE8'];
//       case 'rain':
//       case 'drizzle':
//         return ['#4B79A1', '#283E51'];
//       case 'thunderstorm':
//         return ['#373B44', '#4286f4'];
//       case 'snow':
//         return ['#E6DADA', '#274046'];
//       default:
//         return ['#4A90E2', '#67B6FF'];
//     }
//   };

//   if (loading && !refreshing) {
//     return (
//       <LinearGradient colors={['#4A90E2', '#67B6FF']} style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <Animatable.View animation="rotate" iterationCount="infinite">
//             <Icon name="sun" size={50} color="#FFF" />
//           </Animatable.View>
//           <Text style={styles.loadingText}>Loading Weather...</Text>
//         </View>
//       </LinearGradient>
//     );
//   }

//   return (
//     <LinearGradient colors={getBackgroundGradient()} style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
//       <ScrollView
//         ref={scrollViewRef}
//         contentContainerStyle={styles.scrollContent}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor="#FFF"
//           />
//         }
//         showsVerticalScrollIndicator={false}
//       >
//         <SearchBar onSearch={handleCitySearch} />
        
//         {weather && (
//           <Animatable.View animation="fadeInUp" duration={800}>
//             <WeatherCard weather={weather} city={city} />
//           </Animatable.View>
//         )}

//         {forecast && (
//           <>
//             <Animatable.View animation="fadeInUp" duration={1000} delay={200}>
//               <HourlyForecast forecast={forecast} />
//             </Animatable.View>

//             <Animatable.View animation="fadeInUp" duration={1200} delay={400}>
//               <WeeklyForecast forecast={forecast} />
//             </Animatable.View>
//           </>
//         )}

//         <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
//           <Icon name="navigation" size={20} color="#FFF" />
//           <Text style={styles.locationButtonText}>Use Current Location</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingTop: StatusBar.currentHeight || 40,
//     paddingBottom: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#FFF',
//     fontSize: 18,
//     marginTop: 20,
//     fontWeight: '500',
//   },
//   locationButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     padding: 12,
//     borderRadius: 25,
//     marginHorizontal: 20,
//     marginTop: 20,
//   },
//   locationButtonText: {
//     color: '#FFF',
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

// export default HomeScreen;
















// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   RefreshControl,
//   StatusBar,
//   Dimensions,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/Feather';
// import Geolocation from 'react-native-geolocation-service';
// import { weatherAPI } from '../services/weatherAPI';
// import SearchBar from '../components/SearchBar';
// import WeatherCard from '../components/WeatherCard';
// import HourlyForecast from '../components/HourlyForecast';
// import WeeklyForecast from '../components/WeeklyForecast';

// const { width, height } = Dimensions.get('window');

// const HomeScreen = () => {
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [location, setLocation] = useState({ lat: null, lon: null });
//   const [city, setCity] = useState('');

//   const scrollViewRef = useRef(null);

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Weather App Location Permission',
//             message: 'Weather App needs access to your location for local weather',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           getCurrentLocation();
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     } else {
//       getCurrentLocation();
//     }
//   };

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ lat: latitude, lon: longitude });
//         fetchWeatherData(latitude, longitude);
//       },
//       (error) => {
//         console.log(error);
//         fetchWeatherData(40.7128, -74.0060);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const fetchWeatherData = async (lat, lon) => {
//     try {
//       setLoading(true);
//       const [currentWeather, forecastData] = await Promise.all([
//         weatherAPI.getCurrentWeather(lat, lon),
//         weatherAPI.getForecast(lat, lon),
//       ]);
      
//       setWeather(currentWeather);
//       setForecast(forecastData);
//       setCity(currentWeather.name);
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleCitySearch = async (cityName) => {
//     try {
//       setLoading(true);
//       const currentWeather = await weatherAPI.getWeatherByCity(cityName);
//       const forecastData = await weatherAPI.getForecast(
//         currentWeather.coord.lat,
//         currentWeather.coord.lon
//       );
      
//       setWeather(currentWeather);
//       setForecast(forecastData);
//       setCity(currentWeather.name);
//       setLocation({
//         lat: currentWeather.coord.lat,
//         lon: currentWeather.coord.lon,
//       });
//     } catch (error) {
//       console.error('Error searching city:', error);
//       if (error.message === 'City not found') {
//         alert('City not found. Please check the spelling and try again.');
//       } else {
//         alert('Failed to fetch weather data. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     if (location.lat && location.lon) {
//       fetchWeatherData(location.lat, location.lon);
//     }
//   };

//   const getBackgroundGradient = () => {
//     if (!weather) return ['#1a1a2e', '#16213e', '#0f3460'];
    
//     const condition = weather.weather[0].main.toLowerCase();
//     const hour = new Date().getHours();
//     const isNight = hour < 6 || hour > 18;

//     if (isNight) {
//       return ['#0c0c1e', '#1a1a3e', '#2d2d5e'];
//     }

//     switch (condition) {
//       case 'clear':
//         return ['#396afc', '#2948ff'];
//       case 'clouds':
//         return ['#536976', '#292E49'];
//       case 'rain':
//       case 'drizzle':
//         return ['#2C3E50', '#34495E'];
//       case 'thunderstorm':
//         return ['#1F1C2C', '#928DAB'];
//       case 'snow':
//         return ['#83a4d4', '#b6fbff'];
//       default:
//         return ['#396afc', '#2948ff'];
//     }
//   };

//   if (loading && !refreshing) {
//     return (
//       <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <View style={styles.loadingCard}>
//             <Animatable.View animation="rotate" iterationCount="infinite" duration={3000}>
//               <View style={styles.loadingIconContainer}>
//                 <Icon name="sun" size={40} color="#FFD700" />
//               </View>
//             </Animatable.View>
//             <Text style={styles.loadingText}>Fetching weather data...</Text>
//             <Text style={styles.loadingSubtext}>Just a moment</Text>
//           </View>
//         </View>
//       </LinearGradient>
//     );
//   }

//   return (
//     <LinearGradient 
//       colors={getBackgroundGradient()} 
//       style={styles.container}
//       start={{x: 0, y: 0}}
//       end={{x: 1, y: 1}}
//     >
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
//       {/* Background decoration */}
//       <View style={styles.backgroundDecoration}>
//         <View style={styles.decorativeCircle1} />
//         <View style={styles.decorativeCircle2} />
//         <View style={styles.decorativeCircle3} />
//       </View>
      
//       <ScrollView
//         ref={scrollViewRef}
//         contentContainerStyle={styles.scrollContent}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor="#FFF"
//           />
//         }
//         showsVerticalScrollIndicator={false}
//       >
//         <SearchBar onSearch={handleCitySearch} />
        
//         {weather && (
//           <Animatable.View animation="fadeInUp" duration={800}>
//             <WeatherCard weather={weather} city={city} />
//           </Animatable.View>
//         )}

//         {forecast && (
//           <>
//             <Animatable.View animation="fadeInUp" duration={1000} delay={200}>
//               <HourlyForecast forecast={forecast} />
//             </Animatable.View>

//             <Animatable.View animation="fadeInUp" duration={1200} delay={400}>
//               <WeeklyForecast forecast={forecast} />
//             </Animatable.View>
//           </>
//         )}

//         <TouchableOpacity 
//           style={styles.locationButton} 
//           onPress={getCurrentLocation}
//           activeOpacity={0.8}
//         >
//           <LinearGradient
//             colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.08)']}
//             style={styles.locationButtonGradient}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 0}}
//           >
//             <Icon name="navigation-2" size={18} color="#FFF" />
//             <Text style={styles.locationButtonText}>Update Location</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundDecoration: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   decorativeCircle1: {
//     position: 'absolute',
//     width: 400,
//     height: 400,
//     borderRadius: 200,
//     backgroundColor: 'rgba(255, 255, 255, 0.02)',
//     top: -200,
//     right: -100,
//   },
//   decorativeCircle2: {
//     position: 'absolute',
//     width: 300,
//     height: 300,
//     borderRadius: 150,
//     backgroundColor: 'rgba(255, 255, 255, 0.03)',
//     bottom: -150,
//     left: -100,
//   },
//   decorativeCircle3: {
//     position: 'absolute',
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     backgroundColor: 'rgba(255, 255, 255, 0.02)',
//     top: '40%',
//     right: -50,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingTop: StatusBar.currentHeight + 20 || 60,
//     paddingBottom: 30,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingCard: {
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     padding: 40,
//     borderRadius: 30,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   loadingIconContainer: {
//     width: 80,
//     height: 80,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 40,
//     marginBottom: 20,
//   },
//   loadingText: {
//     color: '#FFF',
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 10,
//   },
//   loadingSubtext: {
//     color: 'rgba(255, 255, 255, 0.6)',
//     fontSize: 14,
//     marginTop: 5,
//   },
//   locationButton: {
//     marginHorizontal: 20,
//     marginTop: 20,
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   locationButtonGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   locationButtonText: {
//     color: '#FFF',
//     marginLeft: 10,
//     fontSize: 16,
//     fontWeight: '600',
//     letterSpacing: 0.5,
//   },
// });

// export default HomeScreen;



















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

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [city, setCity] = useState('');

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
        fetchWeatherData(40.7128, -74.0060);
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
    const isNight = hour < 6 || hour > 18;

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

  if (loading && !refreshing) {
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
});

export default HomeScreen;