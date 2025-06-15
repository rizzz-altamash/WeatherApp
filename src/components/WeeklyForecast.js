// // src/components/WeeklyForecast.js
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import * as Animatable from 'react-native-animatable';

// const WeeklyForecast = ({ forecast }) => {
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

//   // Group forecast by day
//   const dailyForecast = {};
//   forecast.list.forEach((item) => {
//     const date = new Date(item.dt * 1000).toDateString();
//     if (!dailyForecast[date]) {
//       dailyForecast[date] = {
//         temps: [],
//         weather: item.weather[0],
//         date: new Date(item.dt * 1000),
//         pop: item.pop || 0,
//       };
//     }
//     dailyForecast[date].temps.push(item.main.temp);
//     if (item.pop > dailyForecast[date].pop) {
//       dailyForecast[date].pop = item.pop;
//     }
//   });

//   // Convert to array and calculate min/max temps
//   const dailyData = Object.values(dailyForecast).slice(0, 5).map((day) => ({
//     ...day,
//     tempMin: Math.round(Math.min(...day.temps)),
//     tempMax: Math.round(Math.max(...day.temps)),
//   }));

//   return (
//     <View style={styles.container}>
//       <Animatable.Text
//         animation="fadeIn"
//         delay={300}
//         style={styles.title}
//       >
//         5-Day Forecast
//       </Animatable.Text>

//       <View style={styles.forecastContainer}>
//         {dailyData.map((day, index) => {
//           const dayName = index === 0 ? 'Today' : 
//             day.date.toLocaleDateString('en-US', { weekday: 'short' });

//           return (
//             <Animatable.View
//               key={index}
//               animation="fadeInUp"
//               delay={400 + index * 100}
//             >
//               <TouchableOpacity style={styles.dayItem}>
//                 <Text style={styles.dayName}>{dayName}</Text>
                
//                 <View style={styles.weatherInfo}>
//                   <Icon
//                     name={getWeatherIcon(day.weather.main)}
//                     size={28}
//                     color="#FFF"
//                   />
//                   {day.pop > 0 && (
//                     <View style={styles.precipBadge}>
//                       <Text style={styles.precipPercent}>
//                         {Math.round(day.pop * 100)}%
//                       </Text>
//                     </View>
//                   )}
//                 </View>

//                 <View style={styles.tempContainer}>
//                   <Text style={styles.tempMax}>{day.tempMax}°</Text>
//                   <Text style={styles.tempMin}>{day.tempMin}°</Text>
//                 </View>
//               </TouchableOpacity>
              
//               {index < dailyData.length - 1 && (
//                 <View style={styles.separator} />
//               )}
//             </Animatable.View>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '500',
//     color: '#FFF',
//     marginBottom: 15,
//   },
//   forecastContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 20,
//     padding: 15,
//   },
//   dayItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//   },
//   dayName: {
//     fontSize: 16,
//     color: '#FFF',
//     flex: 1,
//     fontWeight: '500',
//   },
//   weatherInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//   },
//   precipBadge: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     marginLeft: 8,
//   },
//   precipPercent: {
//     fontSize: 12,
//     color: '#FFF',
//   },
//   tempContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   tempMax: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#FFF',
//     marginRight: 10,
//   },
//   tempMin: {
//     fontSize: 18,
//     color: 'rgba(255, 255, 255, 0.7)',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     marginVertical: 5,
//   },
// });

// export default WeeklyForecast;



















// src/components/WeeklyForecast.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const WeeklyForecast = ({ forecast }) => {
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

  const getIconColor = (condition) => {
    const colorMap = {
      'Clear': '#FFD700',
      'Clouds': '#B0C4DE',
      'Rain': '#4682B4',
      'Drizzle': '#87CEEB',
      'Thunderstorm': '#9370DB',
      'Snow': '#F0F8FF',
      'Mist': '#E0E0E0',
      'Fog': '#D3D3D3',
    };
    return colorMap[condition] || '#FFF';
  };

  // Group forecast by day
  const dailyForecast = {};
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        temps: [],
        weather: item.weather[0],
        date: new Date(item.dt * 1000),
        pop: item.pop || 0,
      };
    }
    dailyForecast[date].temps.push(item.main.temp);
    if (item.pop > dailyForecast[date].pop) {
      dailyForecast[date].pop = item.pop;
    }
  });

  const dailyData = Object.values(dailyForecast).slice(0, 5).map((day) => ({
    ...day,
    tempMin: Math.round(Math.min(...day.temps)),
    tempMax: Math.round(Math.max(...day.temps)),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Week Ahead</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>5 Days</Text>
        </View>
      </View>

      <View style={styles.glassCard}>
        <LinearGradient
          colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.05)']}
          style={styles.gradientOverlay}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        />
        
        {dailyData.map((day, index) => {
          const dayName = index === 0 ? 'Today' : 
            day.date.toLocaleDateString('en-US', { weekday: 'short' });
          const isToday = index === 0;

          return (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              delay={400 + index * 100}
            >
              <TouchableOpacity 
                style={[styles.dayItem, isToday && styles.todayItem]}
                activeOpacity={0.7}
              >
                <View style={styles.dayInfo}>
                  <Text style={[styles.dayName, isToday && styles.todayText]}>
                    {dayName}
                  </Text>
                  {isToday && <View style={styles.todayDot} />}
                </View>
                
                <View style={styles.weatherIconContainer}>
                  <Icon
                    name={getWeatherIcon(day.weather.main)}
                    size={24}
                    color={getIconColor(day.weather.main)}
                  />
                  {day.pop > 0 && (
                    <View style={styles.precipChance}>
                      <Text style={styles.precipPercent}>
                        {Math.round(day.pop * 100)}%
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.tempBar}>
                  <Text style={styles.tempMin}>{day.tempMin}°</Text>
                  <View style={styles.tempRange}>
                    {/* <View style={styles.tempRangeBar} /> */}
                  </View>
                  <Text style={styles.tempMax}>{day.tempMax}°</Text>
                </View>
              </TouchableOpacity>
              
              {index < dailyData.length - 1 && (
                <View style={styles.separator} />
              )}
            </Animatable.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  badgeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  glassCard: {
    borderRadius: 25,
    overflow: 'hidden',
    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  todayItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  dayInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dayName: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  todayText: {
    color: '#FFF',
    fontWeight: '600',
  },
  todayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4A90E2',
    marginLeft: 8,
  },
  weatherIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  precipChance: {
    backgroundColor: 'rgba(93, 173, 226, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  precipPercent: {
    fontSize: 11,
    color: '#5DADE2',
    fontWeight: '600',
  },
  tempBar: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.5,
    justifyContent: 'flex-end',
  },
  tempMin: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    marginRight: 10,
  },
  tempMax: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 10,
  },
  tempRange: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  tempRangeBar: {
    position: 'absolute',
    left: '30%',
    right: '20%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 2,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 0,
  },
});

export default WeeklyForecast;