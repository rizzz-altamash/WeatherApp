// // src/components/FloatingChatButton.js
// import React, { useRef, useEffect } from 'react';
// import {
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import LinearGradient from 'react-native-linear-gradient';

// const FloatingChatButton = ({ onPress }) => {
//   const scaleAnim = useRef(new Animated.Value(0)).current;
//   const rotateAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         tension: 50,
//         friction: 7,
//         delay: 500,
//         useNativeDriver: true,
//       }),
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(rotateAnim, {
//             toValue: 1,
//             duration: 3000,
//             useNativeDriver: true,
//           }),
//           Animated.timing(rotateAnim, {
//             toValue: 0,
//             duration: 3000,
//             useNativeDriver: true,
//           }),
//         ]),
//       ),
//     ]).start();
//   }, []);

//   const spin = rotateAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '360deg'],
//   });

//   return (
//     <Animated.View
//       style={[
//         styles.container,
//         {
//           transform: [{ scale: scaleAnim }],
//         },
//       ]}
//     >
//       <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
//         <LinearGradient
//           colors={['#10B981', '#059669']}
//           style={styles.button}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//         >
//           <Icon name="message-circle" size={24} color="#FFF" />
//           <Animated.View
//             style={[
//               styles.glow,
//               {
//                 transform: [{ rotate: spin }],
//               },
//             ]}
//           />
//         </LinearGradient>
//         <View style={styles.badge}>
//           <Icon name="zap" size={10} color="#FFF" />
//         </View>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 90,
//     right: 20,
//     zIndex: 1000,
//   },
//   button: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#10B981',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   glow: {
//     position: 'absolute',
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 2,
//     borderColor: 'rgba(16,185,129,0.3)',
//   },
//   badge: {
//     position: 'absolute',
//     top: -2,
//     right: -2,
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: '#F59E0B',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#FFF',
//   },
// });

// export default FloatingChatButton;
















// // src/components/FloatingChatButton.js
// import React, { useRef, useEffect } from 'react';
// import {
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import LinearGradient from 'react-native-linear-gradient';

// const FloatingChatButton = ({ onPress }) => {
//   const scaleAnim = useRef(new Animated.Value(0)).current;
//   const pulseAnim = useRef(new Animated.Value(1)).current;
//   const pulseAnim2 = useRef(new Animated.Value(1)).current;
//   const fadeAnim = useRef(new Animated.Value(0.8)).current;
//   const fadeAnim2 = useRef(new Animated.Value(0.5)).current;

//   useEffect(() => {
//     // Initial button entrance animation
//     Animated.spring(scaleAnim, {
//       toValue: 1,
//       tension: 50,
//       friction: 7,
//       delay: 500,
//       useNativeDriver: true,
//     }).start();

//     // First radiating circle animation
//     Animated.loop(
//       Animated.parallel([
//         Animated.sequence([
//           Animated.timing(pulseAnim, {
//             toValue: 1.5,
//             duration: 2000,
//             useNativeDriver: true,
//           }),
//           Animated.timing(pulseAnim, {
//             toValue: 1,
//             duration: 0,
//             useNativeDriver: true,
//           }),
//         ]),
//         Animated.sequence([
//           Animated.timing(fadeAnim, {
//             toValue: 0,
//             duration: 2000,
//             useNativeDriver: true,
//           }),
//           Animated.timing(fadeAnim, {
//             toValue: 0.8,
//             duration: 0,
//             useNativeDriver: true,
//           }),
//         ]),
//       ]),
//     ).start();

//     // Second radiating circle animation (delayed)
//     setTimeout(() => {
//       Animated.loop(
//         Animated.parallel([
//           Animated.sequence([
//             Animated.timing(pulseAnim2, {
//               toValue: 1.5,
//               duration: 2000,
//               useNativeDriver: true,
//             }),
//             Animated.timing(pulseAnim2, {
//               toValue: 1,
//               duration: 0,
//               useNativeDriver: true,
//             }),
//           ]),
//           Animated.sequence([
//             Animated.timing(fadeAnim2, {
//               toValue: 0,
//               duration: 2000,
//               useNativeDriver: true,
//             }),
//             Animated.timing(fadeAnim2, {
//               toValue: 0.5,
//               duration: 0,
//               useNativeDriver: true,
//             }),
//           ]),
//         ]),
//       ).start();
//     }, 1000);
//   }, []);

//   return (
//     <Animated.View
//       style={[
//         styles.container,
//         {
//           transform: [{ scale: scaleAnim }],
//         },
//       ]}
//     >
//       {/* First radiating circle */}
//       <Animated.View
//         style={[
//           styles.radiatingCircle,
//           {
//             transform: [{ scale: pulseAnim }],
//             opacity: fadeAnim,
//           },
//         ]}
//       />
      
//       {/* Second radiating circle */}
//       <Animated.View
//         style={[
//           styles.radiatingCircle,
//           styles.radiatingCircle2,
//           {
//             transform: [{ scale: pulseAnim2 }],
//             opacity: fadeAnim2,
//           },
//         ]}
//       />

//       <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
//         <LinearGradient
//           colors={['#10B981', '#059669']}
//           style={styles.button}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//         >
//           <Icon name="message-circle" size={24} color="#FFF" />
//         </LinearGradient>
        
//         {/* AI Badge */}
//         <View style={styles.badge}>
//           <Icon name="zap" size={10} color="#FFF" />
//         </View>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 20,
//     right: 5,
//     zIndex: 1000,
//     // Add some padding to contain the radiating circles
//     width: 100,
//     height: 100,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#10B981',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   radiatingCircle: {
//     position: 'absolute',
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: 'transparent',
//     borderWidth: 1.5,
//     borderColor: '#10B981',
//   },
//   radiatingCircle2: {
//     borderColor: '#059669',
//   },
//   badge: {
//     position: 'absolute',
//     top: -2,
//     right: -2,
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: '#F59E0B',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#FFF',
//   },
// });

// export default FloatingChatButton;















// src/components/FloatingChatButton.js
import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const FloatingChatButton = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim2 = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim2 = useRef(new Animated.Value(0.5)).current;
  
  // Badge animations
  const badgePulseAnim = useRef(new Animated.Value(1)).current;
  const badgeFadeAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    // Initial button entrance animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // First radiating circle animation
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.5,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.8,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();

    // Second radiating circle animation (delayed)
    setTimeout(() => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulseAnim2, {
              toValue: 1.5,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim2, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(fadeAnim2, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim2, {
              toValue: 0.5,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ).start();
    }, 1000);

    // Badge radiating animation
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(badgePulseAnim, {
            toValue: 2.2,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(badgePulseAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(badgeFadeAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(badgeFadeAnim, {
            toValue: 0.6,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {/* First radiating circle */}
      <Animated.View
        style={[
          styles.radiatingCircle,
          {
            transform: [{ scale: pulseAnim }],
            opacity: fadeAnim,
          },
        ]}
      />
      
      {/* Second radiating circle */}
      <Animated.View
        style={[
          styles.radiatingCircle,
          styles.radiatingCircle2,
          {
            transform: [{ scale: pulseAnim2 }],
            opacity: fadeAnim2,
          },
        ]}
      />

      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={['#34D399', '#059669']}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon name="message-circle" size={24} color="#FFF" />
        </LinearGradient>
        
        {/* Badge Container */}
        <View style={styles.badgeContainer}>
          {/* Badge radiating circle */}
          <Animated.View
            style={[
              styles.badgeRadiatingCircle,
              {
                transform: [{ scale: badgePulseAnim }],
                opacity: badgeFadeAnim,
              },
            ]}
          />
          
          {/* AI Badge */}
          <View style={styles.badge}>
            <Icon name="zap" size={10} color="#FFF" />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 5,
    zIndex: 1000,
    // Add some padding to contain the radiating circles
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  radiatingCircle: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#10B981',
  },
  radiatingCircle2: {
    borderColor: '#059669',
  },
  badgeContainer: {
    position: 'absolute',
    top: -9,
    right: -9,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeRadiatingCircle: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  badge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
});

export default FloatingChatButton;