// // src/components/HourlyForecast.js
// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Animated,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import * as Animatable from 'react-native-animatable';

// const HourlyForecast = ({ forecast }) => {
//   const scrollX = useRef(new Animated.Value(0)).current;

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

//   const hourlyData = forecast.list.slice(0, 8); // Next 24 hours (3-hour intervals)

//   return (
//     <View style={styles.container}>
//       <Animatable.Text
//         animation="fadeIn"
//         delay={300}
//         style={styles.title}
//       >
//         Hourly Forecast
//       </Animatable.Text>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContainer}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: false }
//         )}
//         scrollEventThrottle={16}
//       >
//         {hourlyData.map((item, index) => {
//           const hour = new Date(item.dt * 1000).getHours();
//           const temp = Math.round(item.main.temp);
//           const condition = item.weather[0].main;

//           return (
//             <Animatable.View
//               key={index}
//               animation="fadeInRight"
//               delay={300 + index * 100}
//               style={styles.hourItem}
//             >
//               <Text style={styles.hour}>
//                 {index === 0 ? 'Now' : `${hour}:00`}
//               </Text>
//               <Icon
//                 name={getWeatherIcon(condition)}
//                 size={30}
//                 color="#FFF"
//                 style={styles.icon}
//               />
//               <Text style={styles.temp}>{temp}°</Text>
//               {item.pop > 0 && (
//                 <View style={styles.precipContainer}>
//                   <Icon name="droplet" size={12} color="#FFF" />
//                   <Text style={styles.precipText}>
//                     {Math.round(item.pop * 100)}%
//                   </Text>
//                 </View>
//               )}
//             </Animatable.View>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '500',
//     color: '#FFF',
//     marginLeft: 20,
//     marginBottom: 15,
//   },
//   scrollContainer: {
//     paddingHorizontal: 15,
//   },
//   hourItem: {
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: 20,
//     padding: 15,
//     marginHorizontal: 5,
//     minWidth: 70,
//   },
//   hour: {
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginBottom: 8,
//   },
//   icon: {
//     marginVertical: 8,
//   },
//   temp: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#FFF',
//     marginTop: 5,
//   },
//   precipContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   precipText: {
//     fontSize: 12,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginLeft: 3,
//   },
// });

// export default HourlyForecast;


























// src/components/HourlyForecast.js
import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const HourlyForecast = ({ forecast }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

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

  const hourlyData = forecast.list.slice(0, 8);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Today's Timeline</Text>
        <Icon name="clock" size={16} color="rgba(255,255,255,0.6)" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {hourlyData.map((item, index) => {
          const hour = new Date(item.dt * 1000).getHours();
          const temp = Math.round(item.main.temp);
          const condition = item.weather[0].main;
          const isNow = index === 0;

          return (
            <Animatable.View
              key={index}
              animation="fadeInRight"
              delay={300 + index * 100}
            >
              <LinearGradient
                colors={isNow ? 
                  ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)'] : 
                  ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.05)']}
                style={[styles.hourItem, isNow && styles.hourItemActive]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
              >
                {isNow && <View style={styles.nowIndicator} />}
                
                <Text style={[styles.hour, isNow && styles.hourActive]}>
                  {isNow ? 'Now' : `${hour < 10 ? '0' : ''}${hour}:00`}
                </Text>
                
                <View style={styles.iconContainer}>
                  <Icon
                    name={getWeatherIcon(condition)}
                    size={26}
                    color={getIconColor(condition)}
                    style={styles.icon}
                  />
                </View>
                
                <Text style={[styles.temp, isNow && styles.tempActive]}>{temp}°</Text>
                
                {item.pop >= 0 && (
                  <View style={styles.precipBadge}>
                    <Icon name="droplet" size={10} color="#5DADE2" />
                    <Text style={styles.precipText}>
                      {Math.round(item.pop * 100)}%
                    </Text>
                  </View>
                )}
              </LinearGradient>
            </Animatable.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 0.5,
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  hourItem: {
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    minWidth: 80,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  hourItemActive: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1.5,
  },
  nowIndicator: {
    position: 'absolute',
    top: 8,
    width: 30,
    height: 3,
    backgroundColor: '#4A90E2',
    borderRadius: 1.5,
  },
  hour: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 12,
    fontWeight: '500',
  },
  hourActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  temp: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tempActive: {
    color: '#FFF',
    fontSize: 20,
  },
  precipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'rgba(93, 173, 226, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  precipText: {
    fontSize: 11,
    color: '#5DADE2',
    marginLeft: 3,
    fontWeight: '600',
  },
});

export default HourlyForecast;