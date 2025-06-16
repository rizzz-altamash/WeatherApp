// // src/components/WeatherCard.js
// import React, { useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   Dimensions,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import * as Animatable from 'react-native-animatable';
// // Removed Lottie import - using simple animations instead

// const { width } = Dimensions.get('window');

// const WeatherCard = ({ weather, city }) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.8)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         tension: 20,
//         friction: 7,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const getWeatherIcon = (condition) => {
//     const iconMap = {
//       'Clear': 'sun',
//       'Clouds': 'cloud',
//       'Rain': 'cloud-rain',
//       'Drizzle': 'cloud-drizzle',
//       'Thunderstorm': 'cloud-lightning',
//       'Snow': 'cloud-snow',
//       'Mist': 'wind',
//       'Fog': 'wind',
//     };
//     return iconMap[condition] || 'sun';
//   };

//   const temperature = Math.round(weather.main.temp);
//   const feelsLike = Math.round(weather.main.feels_like);
//   const condition = weather.weather[0].main;
//   const description = weather.weather[0].description;

//   return (
//     <Animated.View
//       style={[
//         styles.container,
//         {
//           opacity: fadeAnim,
//           transform: [{ scale: scaleAnim }],
//         },
//       ]}
//     >
//       <View style={styles.header}>
//         <Animatable.Text
//           animation="fadeIn"
//           delay={500}
//           style={styles.cityName}
//         >
//           {city}
//         </Animatable.Text>
//         <Animatable.Text
//           animation="fadeIn"
//           delay={700}
//           style={styles.date}
//         >
//           {new Date().toLocaleDateString('en-US', {
//             weekday: 'long',
//             month: 'long',
//             day: 'numeric',
//           })}
//         </Animatable.Text>
//       </View>

//       <View style={styles.mainWeather}>
//         <Animatable.View
//           animation="bounceIn"
//           delay={800}
//           style={styles.iconContainer}
//         >
//           {/* Lottie animations commented out for now */}
//           {/* If you add Lottie later, uncomment this: */}
//           {/* <LottieView
//             source={getWeatherAnimation(condition)}
//             autoPlay
//             loop
//             style={styles.weatherAnimation}
//           /> */}
          
//           {/* Using icon instead: */}
//           <Icon
//             name={getWeatherIcon(condition)}
//             size={100}
//             color="#FFF"
//           />
//         </Animatable.View>

//         <Animatable.View
//           animation="fadeInUp"
//           delay={1000}
//           style={styles.temperatureContainer}
//         >
//           <Text style={styles.temperature}>{temperature}°</Text>
//           <Text style={styles.condition}>{description}</Text>
//           <Text style={styles.feelsLike}>Feels like {feelsLike}°</Text>
//         </Animatable.View>
//       </View>

//       <Animatable.View
//         animation="fadeInUp"
//         delay={1200}
//         style={styles.detailsContainer}
//       >
//         <View style={styles.detailItem}>
//           <Icon name="wind" size={20} color="rgba(255, 255, 255, 0.8)" />
//           <Text style={styles.detailText}>{weather.wind.speed} m/s</Text>
//           <Text style={styles.detailLabel}>Wind</Text>
//         </View>

//         <View style={styles.detailItem}>
//           <Icon name="droplet" size={20} color="rgba(255, 255, 255, 0.8)" />
//           <Text style={styles.detailText}>{weather.main.humidity}%</Text>
//           <Text style={styles.detailLabel}>Humidity</Text>
//         </View>

//         <View style={styles.detailItem}>
//           <Icon name="eye" size={20} color="rgba(255, 255, 255, 0.8)" />
//           <Text style={styles.detailText}>{(weather.visibility / 1000).toFixed(1)} km</Text>
//           <Text style={styles.detailLabel}>Visibility</Text>
//         </View>
//       </Animatable.View>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   cityName: {
//     fontSize: 32,
//     fontWeight: '300',
//     color: '#FFF',
//     letterSpacing: 1,
//   },
//   date: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginTop: 5,
//   },
//   mainWeather: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   iconContainer: {
//     marginBottom: 20,
//   },
//   weatherAnimation: {
//     width: 200,
//     height: 200,
//   },
//   temperatureContainer: {
//     alignItems: 'center',
//   },
//   temperature: {
//     fontSize: 72,
//     fontWeight: '200',
//     color: '#FFF',
//   },
//   condition: {
//     fontSize: 20,
//     color: '#FFF',
//     textTransform: 'capitalize',
//     marginTop: 5,
//   },
//   feelsLike: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginTop: 5,
//   },
//   detailsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 20,
//     padding: 20,
//   },
//   detailItem: {
//     alignItems: 'center',
//   },
//   detailText: {
//     fontSize: 18,
//     color: '#FFF',
//     fontWeight: '500',
//     marginTop: 5,
//   },
//   detailLabel: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.7)',
//     marginTop: 3,
//   },
// });

// export default WeatherCard;

























// import React, { useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Animated,
//   Dimensions,
//   ImageBackground,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';

// const { width } = Dimensions.get('window');

// const WeatherCard = ({ weather, city }) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.8)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         tension: 20,
//         friction: 7,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const getWeatherIcon = (condition) => {
//     const iconMap = {
//       'Clear': 'sun',
//       'Clouds': 'cloud',
//       'Rain': 'cloud-rain',
//       'Drizzle': 'cloud-drizzle',
//       'Thunderstorm': 'cloud-lightning',
//       'Snow': 'cloud-snow',
//       'Mist': 'wind',
//       'Fog': 'wind',
//     };
//     return iconMap[condition] || 'sun';
//   };

//   const getWeatherEmoji = (condition) => {
//     const emojiMap = {
//       'Clear': '☀️',
//       'Clouds': '☁️',
//       'Rain': '🌧️',
//       'Drizzle': '🌦️',
//       'Thunderstorm': '⛈️',
//       'Snow': '❄️',
//       'Mist': '🌫️',
//       'Fog': '🌫️',
//     };
//     return emojiMap[condition] || '☀️';
//   };

//   const temperature = Math.round(weather.main.temp);
//   const feelsLike = Math.round(weather.main.feels_like);
//   const condition = weather.weather[0].main;
//   const description = weather.weather[0].description;

//   return (
//     <Animated.View
//       style={[
//         styles.container,
//         {
//           opacity: fadeAnim,
//           transform: [{ scale: scaleAnim }],
//         },
//       ]}
//     >
//       {/* Glass morphism card */}
//       <View style={styles.glassCard}>
//         <LinearGradient
//           colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.05)']}
//           style={styles.gradientOverlay}
//           start={{x: 0, y: 0}}
//           end={{x: 1, y: 1}}
//         />
        
//         {/* Header Section */}
//         <View style={styles.header}>
//           <View style={styles.locationContainer}>
//             <Icon name="map-pin" size={16} color="#FFF" style={styles.locationIcon} />
//             <Text style={styles.cityName}>{city}</Text>
//           </View>
//           <Text style={styles.date}>
//             {new Date().toLocaleDateString('en-US', {
//               weekday: 'short',
//               month: 'short',
//               day: 'numeric',
//             })}
//           </Text>
//         </View>

//         {/* Main Weather Display */}
//         <View style={styles.mainWeather}>
//           <View style={styles.temperatureRow}>
//             <Text style={styles.weatherEmoji}>{getWeatherEmoji(condition)}</Text>
//             <View style={styles.tempContainer}>
//               <Text style={styles.temperature}>{temperature}</Text>
//               <Text style={styles.degree}>°C</Text>
//             </View>
//           </View>
          
//           <View style={styles.conditionContainer}>
//             <Text style={styles.condition}>{description}</Text>
//             <View style={styles.feelsLikeContainer}>
//               <Icon name="thermometer" size={14} color="rgba(255,255,255,0.6)" />
//               <Text style={styles.feelsLike}>Feels like {feelsLike}°</Text>
//             </View>
//           </View>
//         </View>

//         {/* Divider */}
//         <View style={styles.divider} />

//         {/* Weather Details */}
//         <View style={styles.detailsGrid}>
//           <View style={styles.detailCard}>
//             <View style={styles.detailIconContainer}>
//               <Icon name="wind" size={20} color="#4A90E2" />
//             </View>
//             <Text style={styles.detailValue}>{weather.wind.speed}</Text>
//             <Text style={styles.detailUnit}>m/s</Text>
//             <Text style={styles.detailLabel}>Wind</Text>
//           </View>

//           <View style={styles.detailCard}>
//             <View style={styles.detailIconContainer}>
//               <Icon name="droplet" size={20} color="#5DADE2" />
//             </View>
//             <Text style={styles.detailValue}>{weather.main.humidity}</Text>
//             <Text style={styles.detailUnit}>%</Text>
//             <Text style={styles.detailLabel}>Humidity</Text>
//           </View>

//           <View style={styles.detailCard}>
//             <View style={styles.detailIconContainer}>
//               <Icon name="eye" size={20} color="#76D7C4" />
//             </View>
//             <Text style={styles.detailValue}>{(weather.visibility / 1000).toFixed(1)}</Text>
//             <Text style={styles.detailUnit}>km</Text>
//             <Text style={styles.detailLabel}>Visibility</Text>
//           </View>
//         </View>
//       </View>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   glassCard: {
//     borderRadius: 30,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//     // elevation: 10,
//   },
//   gradientOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   header: {
//     paddingHorizontal: 25,
//     paddingTop: 25,
//     paddingBottom: 15,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   locationIcon: {
//     marginRight: 6,
//     opacity: 0.8,
//   },
//   cityName: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#FFF',
//     letterSpacing: 0.5,
//   },
//   date: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.6)',
//     fontWeight: '400',
//   },
//   mainWeather: {
//     paddingHorizontal: 25,
//     paddingVertical: 20,
//   },
//   temperatureRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   weatherEmoji: {
//     fontSize: 80,
//   },
//   tempContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   temperature: {
//     fontSize: 72,
//     fontWeight: '200',
//     color: '#FFF',
//     lineHeight: 72,
//   },
//   degree: {
//     fontSize: 32,
//     fontWeight: '300',
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginTop: 10,
//   },
//   conditionContainer: {
//     marginTop: 10,
//   },
//   condition: {
//     fontSize: 18,
//     color: '#FFF',
//     textTransform: 'capitalize',
//     fontWeight: '500',
//     marginBottom: 8,
//   },
//   feelsLikeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   feelsLike: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.7)',
//     marginLeft: 6,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     marginHorizontal: 25,
//   },
//   detailsGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 25,
//     paddingHorizontal: 15,
//   },
//   detailCard: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   detailIconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 15,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   detailValue: {
//     fontSize: 24,
//     color: '#FFF',
//     fontWeight: '600',
//   },
//   detailUnit: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.6)',
//     marginTop: 2,
//   },
//   detailLabel: {
//     fontSize: 12,
//     color: 'rgba(255, 255, 255, 0.5)',
//     marginTop: 4,
//     fontWeight: '400',
//   },
// });

// export default WeatherCard;























// src/components/WeatherCard.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const WeatherCard = ({ weather, city }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': 'sun',
      'Clouds': 'cloud',
      'Rain': 'cloud-rain',
      'Drizzle': 'cloud-drizzle',
      'Thunderstorm': 'cloud-lightning',
      'Snow': 'cloud-snow',
      'Mist': 'wind',
      'Fog': 'wind',
    };
    return iconMap[condition] || 'sun';
  };

  const getWeatherEmoji = (condition) => {
    const emojiMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
    };
    return emojiMap[condition] || '☀️';
  };

  const getCardGradient = (condition) => {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;

    if (isNight) {
      return ['rgba(25,28,50,0.3)', 'rgba(45,50,80,0.2)'];
    }

    const gradientMap = {
      'Clear': ['rgba(255,200,0,0.1)', 'rgba(255,220,100,0.05)'],
      'Clouds': ['rgba(150,160,180,0.1)', 'rgba(170,180,200,0.05)'],
      'Rain': ['rgba(70,130,180,0.1)', 'rgba(100,149,237,0.05)'],
      'Drizzle': ['rgba(135,206,235,0.1)', 'rgba(176,224,230,0.05)'],
      'Thunderstorm': ['rgba(147,112,219,0.1)', 'rgba(138,43,226,0.05)'],
      'Snow': ['rgba(240,248,255,0.1)', 'rgba(248,248,255,0.05)'],
      'Mist': ['rgba(224,224,224,0.1)', 'rgba(245,245,245,0.05)'],
      'Fog': ['rgba(211,211,211,0.1)', 'rgba(220,220,220,0.05)'],
    };
    return gradientMap[condition] || ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'];
  };

  const getWeatherPattern = (condition) => {
    const patterns = {
      'Rain': (
        <>
          {[...Array(5)].map((_, i) => (
            <View
              key={`rain-${i}`}
              style={[
                styles.rainDrop,
                {
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 5}%`,
                  opacity: 0.1 - i * 0.02,
                }
              ]}
            />
          ))}
        </>
      ),
      'Snow': (
        <>
          {[...Array(8)].map((_, i) => (
            <View
              key={`snow-${i}`}
              style={[
                styles.snowFlake,
                {
                  left: `${10 + i * 11}%`,
                  top: `${5 + (i % 3) * 30}%`,
                  width: 6 + (i % 3) * 2,
                  height: 6 + (i % 3) * 2,
                  opacity: 0.15 - (i % 3) * 0.05,
                }
              ]}
            />
          ))}
        </>
      ),
      'Clear': (
        <>
          <View style={styles.sunRays}>
            {[...Array(8)].map((_, i) => (
              <View
                key={`ray-${i}`}
                style={[
                  styles.sunRay,
                  {
                    transform: [{ rotate: `${i * 45}deg` }],
                  }
                ]}
              />
            ))}
          </View>
        </>
      ),
      'Clouds': (
        <>
          <View style={[styles.cloudShape, { top: 20, right: 30 }]} />
          <View style={[styles.cloudShape, { top: 50, right: 60, width: 80, height: 30 }]} />
        </>
      ),
    };
    return patterns[condition] || null;
  };

  const temperature = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const condition = weather.weather[0].main;
  const description = weather.weather[0].description;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {/* Glass morphism card */}
      <View style={styles.glassCard}>
        <LinearGradient
          colors={getCardGradient(condition)}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Icon name="map-pin" size={16} color="#FFF" style={styles.locationIcon} />
            <Text style={styles.cityName}>{city}</Text>
          </View>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>

        {/* Main Weather Display */}
        <View style={styles.mainWeather}>
          <View style={styles.temperatureRow}>
            <View style={styles.emojiContainer}>
              <Text style={styles.weatherEmoji}>{getWeatherEmoji(condition)}</Text>
            </View>
            <View style={styles.tempContainer}>
              <Text style={styles.temperature}>{temperature}</Text>
              <Text style={styles.degree}>°C</Text>
            </View>
          </View>
          
          <View style={styles.conditionContainer}>
            <Text style={styles.condition}>{description}</Text>
            <View style={styles.feelsLikeContainer}>
              <Icon name="thermometer" size={14} color="rgba(255,255,255,0.6)" />
              <Text style={styles.feelsLike}>Feels like {feelsLike}°</Text>
            </View>
          </View>
        </View>

        {/* Animated divider */}
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.1)', 'transparent']}
          style={styles.divider}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />

        {/* Weather Details */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailCard}>
            <LinearGradient
              colors={['rgba(108, 234, 112, 0.1)', 'rgba(118,215,196,0.05)']}
              style={styles.detailCardBg}
            >
              <View style={styles.detailIconContainer}>
                <Icon name="eye" size={20} color="#fff" />
              </View>
              <Text style={styles.detailValue}>{(weather.visibility / 1000).toFixed(1)}</Text>
              <Text style={styles.detailUnit}>km</Text>
              <Text style={styles.detailLabel}>Visibility</Text>
            </LinearGradient>
          </View>

          <View style={styles.detailCard}>
            <LinearGradient
              colors={['rgba(74,144,226,0.1)', 'rgba(74,144,226,0.05)']}
              style={styles.detailCardBg}
            >
              <View style={styles.detailIconContainer}>
                <Icon name="wind" size={20} color="#fff" />
              </View>
              <Text style={styles.detailValue}>{weather.wind.speed}</Text>
              <Text style={styles.detailUnit}>m/s</Text>
              <Text style={styles.detailLabel}>Wind</Text>
            </LinearGradient>
          </View>

          <View style={styles.detailCard}>
            <LinearGradient
              colors={['rgba(224, 240, 76, 0.1)', 'rgba(224, 240, 76,0.05)']}
              style={styles.detailCardBg}
            >
              <View style={styles.detailIconContainer}>
                <Icon name="droplet" size={20} color="#fff" />
              </View>
              <Text style={styles.detailValue}>{weather.main.humidity}</Text>
              <Text style={styles.detailUnit}>%</Text>
              <Text style={styles.detailLabel}>Humidity</Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  glassCard: {
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    // elevation: 10,
  },
  weatherPatternContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  rainDrop: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 1,
    transform: [{ rotate: '-15deg' }],
  },
  snowFlake: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderRadius: 50,
  },
  sunRays: {
    position: 'absolute',
    top: 40,
    right: 40,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunRay: {
    position: 'absolute',
    width: 2,
    height: 25,
    backgroundColor: 'rgba(255,200,0,0.2)',
    top: -30,
  },
  cloudShape: {
    position: 'absolute',
    width: 100,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 15,
    position: 'relative',
    zIndex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationIcon: {
    marginRight: 6,
    opacity: 0.8,
  },
  cityName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '400',
  },
  mainWeather: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    position: 'relative',
    zIndex: 1,
  },
  temperatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emojiContainer: {
    position: 'relative',
  },
  weatherEmoji: {
    fontSize: 80,
  },
  emojiGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,200,0,0.1)',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  temperature: {
    fontSize: 72,
    fontWeight: '200',
    color: '#FFF',
    lineHeight: 72,
  },
  degree: {
    fontSize: 32,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 10,
  },
  conditionContainer: {
    marginTop: 10,
  },
  condition: {
    fontSize: 18,
    color: '#FFF',
    textTransform: 'capitalize',
    fontWeight: '500',
    marginBottom: 8,
  },
  feelsLikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feelsLike: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    marginHorizontal: 25,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    paddingHorizontal: 15,
    position: 'relative',
    zIndex: 1,
  },
  detailCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  detailCardBg: {
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailValue: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '600',
  },
  detailUnit: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 4,
    fontWeight: '400',
  },
});

export default WeatherCard;