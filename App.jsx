// // App.js
// import 'react-native-gesture-handler'; // MUST be at the very top
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { View, Text, StyleSheet, StatusBar } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';
// // Temporarily comment out if Icon causes issues
// // import Icon from 'react-native-vector-icons/Feather';
// import HomeScreen from './src/screens/HomeScreen';

// const Stack = createStackNavigator();

// // Splash Screen Component
// const SplashScreen = ({ navigation }) => {
//   useEffect(() => {
//     setTimeout(() => {
//       navigation.replace('Home');
//     }, 2500);
//   }, []);

//   return (
//     <LinearGradient colors={['#4A90E2', '#67B6FF']} style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
//       <Animatable.View
//         animation="bounceIn"
//         duration={1500}
//         style={styles.logoContainer}
//       >
//         <Text style={{ fontSize: 80, color: '#FFF' }}>☁️</Text>
//       </Animatable.View>
      
//       <Animatable.Text
//         animation="fadeInUp"
//         delay={800}
//         style={styles.appName}
//       >
//         Weather App
//       </Animatable.Text>
      
//       <Animatable.Text
//         animation="fadeInUp"
//         delay={1000}
//         style={styles.tagline}
//       >
//         Your personal weather companion
//       </Animatable.Text>
      
//       <Animatable.View
//         animation="fadeIn"
//         delay={1500}
//         style={styles.loadingContainer}
//       >
//         <View style={styles.loadingDot} />
//         <View style={[styles.loadingDot, styles.loadingDotMiddle]} />
//         <View style={styles.loadingDot} />
//       </Animatable.View>
//     </LinearGradient>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logoContainer: {
//     marginBottom: 30,
//   },
//   appName: {
//     fontSize: 36,
//     fontWeight: '300',
//     color: '#FFF',
//     letterSpacing: 2,
//     marginBottom: 10,
//   },
//   tagline: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginBottom: 50,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   loadingDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#FFF',
//     marginHorizontal: 5,
//     opacity: 0.3,
//   },
//   loadingDotMiddle: {
//     opacity: 0.6,
//   },
// });

// export default App;











// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { View, Text, StyleSheet, StatusBar } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';
// import HomeScreen from './src/screens/HomeScreen';

// const Stack = createStackNavigator();

// const SplashScreen = ({ navigation }) => {
//   useEffect(() => {
//     setTimeout(() => {
//       navigation.replace('Home');
//     }, 2500);
//   }, []);

//   return (
//     <LinearGradient 
//       colors={['#1a1a2e', '#16213e', '#0f3460']} 
//       style={styles.container}
//       start={{x: 0, y: 0}}
//       end={{x: 1, y: 1}}
//     >
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
//       {/* Decorative circles */}
//       <View style={styles.decorativeCircle1} />
//       <View style={styles.decorativeCircle2} />
      
//       <Animatable.View
//         animation="bounceIn"
//         duration={1500}
//         style={styles.logoContainer}
//       >
//         <View style={styles.logoBackground}>
//           <Text style={styles.logoEmoji}>🌤️</Text>
//         </View>
//       </Animatable.View>
      
//       <Animatable.Text
//         animation="fadeInUp"
//         delay={800}
//         style={styles.appName}
//       >
//         SkyView
//       </Animatable.Text>
      
//       <Animatable.Text
//         animation="fadeInUp"
//         delay={1000}
//         style={styles.tagline}
//       >
//         Weather refined for you
//       </Animatable.Text>
      
//       <Animatable.View
//         animation="fadeIn"
//         delay={1500}
//         style={styles.loadingContainer}
//       >
//         <View style={[styles.loadingDot, styles.loadingDot1]} />
//         <View style={[styles.loadingDot, styles.loadingDot2]} />
//         <View style={[styles.loadingDot, styles.loadingDot3]} />
//       </Animatable.View>
//     </LinearGradient>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   decorativeCircle1: {
//     position: 'absolute',
//     width: 300,
//     height: 300,
//     borderRadius: 150,
//     backgroundColor: 'rgba(255, 255, 255, 0.03)',
//     top: -100,
//     right: -100,
//   },
//   decorativeCircle2: {
//     position: 'absolute',
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     backgroundColor: 'rgba(255, 255, 255, 0.02)',
//     bottom: -50,
//     left: -50,
//   },
//   logoContainer: {
//     marginBottom: 40,
//   },
//   logoBackground: {
//     width: 120,
//     height: 120,
//     borderRadius: 30,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   logoEmoji: {
//     fontSize: 60,
//   },
//   appName: {
//     fontSize: 42,
//     fontWeight: '700',
//     color: '#FFF',
//     letterSpacing: 3,
//     marginBottom: 10,
//     textShadowColor: 'rgba(0, 0, 0, 0.3)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 10,
//   },
//   tagline: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.7)',
//     marginBottom: 60,
//     fontWeight: '300',
//     letterSpacing: 1,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   loadingDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#FFF',
//     marginHorizontal: 6,
//   },
//   loadingDot1: {
//     opacity: 0.3,
//   },
//   loadingDot2: {
//     opacity: 0.6,
//   },
//   loadingDot3: {
//     opacity: 1,
//   },
// });

// export default App;




























// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';
// import HomeScreen from './src/screens/HomeScreen';

// const Stack = createStackNavigator();
// const { width, height } = Dimensions.get('window');

// const SplashScreen = ({ navigation }) => {
//   useEffect(() => {
//     setTimeout(() => {
//       navigation.replace('Home');
//     }, 2500);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Primary gradient background */}
//       <LinearGradient 
//         colors={['#1e3c72', '#2a5298', '#3d7eaa']} 
//         style={StyleSheet.absoluteFillObject}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}
//       />
      
//       {/* Secondary mesh gradient overlay */}
//       <LinearGradient
//         colors={['rgba(56,108,252,0.1)', 'transparent', 'rgba(41,72,255,0.1)']}
//         style={[StyleSheet.absoluteFillObject, {transform: [{rotate: '-45deg'}]}]}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}
//       />
      
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
//       {/* Advanced background decoration */}
//       <View style={styles.backgroundDecoration}>
//         {/* Glowing orbs with gradients */}
//         <View style={styles.glowingOrb1}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)', 'transparent']}
//             style={styles.orbGradient}
//           />
//         </View>
        
//         <View style={styles.glowingOrb2}>
//           <LinearGradient
//             colors={['rgba(100,200,255,0.15)', 'rgba(100,200,255,0.05)', 'transparent']}
//             style={styles.orbGradient}
//           />
//         </View>
        
//         <View style={styles.glowingOrb3}>
//           <LinearGradient
//             colors={['rgba(255,200,100,0.1)', 'rgba(255,200,100,0.03)', 'transparent']}
//             style={styles.orbGradient}
//           />
//         </View>
        
//         {/* Geometric patterns */}
//         <View style={styles.geometricPattern1} />
//         <View style={styles.geometricPattern2} />
//         <View style={styles.geometricPattern3} />
        
//         {/* Floating elements */}
//         <View style={styles.floatingRing1} />
//         <View style={styles.floatingRing2} />
        
//         {/* Grid overlay */}
//         <View style={styles.gridOverlay}>
//           {[...Array(8)].map((_, i) => (
//             <View key={`line-${i}`} style={[styles.gridLine, { top: `${i * 12.5}%` }]} />
//           ))}
//         </View>
//       </View>
      
//       <Animatable.View
//         animation="bounceIn"
//         duration={1500}
//         style={styles.logoContainer}
//       >
//         <LinearGradient
//           colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
//           style={styles.logoBackground}
//           start={{x: 0, y: 0}}
//           end={{x: 1, y: 1}}
//         >
//           <View style={styles.logoInner}>
//             <Text style={styles.logoEmoji}>🌤️</Text>
//           </View>
//         </LinearGradient>
//       </Animatable.View>
      
//       <Animatable.Text
//         animation="fadeInUp"
//         delay={800}
//         style={styles.appName}
//       >
//         SkyView
//       </Animatable.Text>
      
//       <Animatable.Text
//         animation="fadeInUp"
//         delay={1000}
//         style={styles.tagline}
//       >
//         Weather refined for you
//       </Animatable.Text>
      
//       <Animatable.View
//         animation="fadeIn"
//         delay={1500}
//         style={styles.loadingContainer}
//       >
//         <View style={[styles.loadingDot, styles.loadingDot1]}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
//             style={styles.dotGradient}
//           />
//         </View>
//         <View style={[styles.loadingDot, styles.loadingDot2]}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)']}
//             style={styles.dotGradient}
//           />
//         </View>
//         <View style={[styles.loadingDot, styles.loadingDot3]}>
//           <LinearGradient
//             colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0.6)']}
//             style={styles.dotGradient}
//           />
//         </View>
//       </Animatable.View>
//     </View>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backgroundDecoration: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   glowingOrb1: {
//     position: 'absolute',
//     width: 400,
//     height: 400,
//     borderRadius: 200,
//     top: -150,
//     right: -100,
//     opacity: 0.7,
//   },
//   glowingOrb2: {
//     position: 'absolute',
//     width: 350,
//     height: 350,
//     borderRadius: 175,
//     bottom: -180,
//     left: -120,
//     opacity: 0.6,
//   },
//   glowingOrb3: {
//     position: 'absolute',
//     width: 250,
//     height: 250,
//     borderRadius: 125,
//     top: '35%',
//     left: '60%',
//     opacity: 0.5,
//   },
//   orbGradient: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 1000,
//   },
//   geometricPattern1: {
//     position: 'absolute',
//     width: 100,
//     height: 100,
//     backgroundColor: 'rgba(255, 255, 255, 0.03)',
//     transform: [{ rotate: '45deg' }],
//     top: '15%',
//     left: 40,
//     borderRadius: 20,
//   },
//   geometricPattern2: {
//     position: 'absolute',
//     width: 80,
//     height: 80,
//     backgroundColor: 'rgba(255, 255, 255, 0.02)',
//     transform: [{ rotate: '30deg' }],
//     bottom: '25%',
//     right: 50,
//     borderRadius: 15,
//   },
//   geometricPattern3: {
//     position: 'absolute',
//     width: 60,
//     height: 60,
//     backgroundColor: 'rgba(255, 255, 255, 0.025)',
//     transform: [{ rotate: '-15deg' }],
//     top: '55%',
//     left: '20%',
//     borderRadius: 10,
//   },
//   floatingRing1: {
//     position: 'absolute',
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     borderWidth: 2,
//     borderColor: 'rgba(255, 255, 255, 0.05)',
//     top: '25%',
//     right: -30,
//   },
//   floatingRing2: {
//     position: 'absolute',
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.03)',
//     bottom: '35%',
//     left: -20,
//   },
//   gridOverlay: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     opacity: 0.03,
//   },
//   gridLine: {
//     position: 'absolute',
//     width: '100%',
//     height: 1,
//     backgroundColor: '#FFF',
//   },
//   logoContainer: {
//     marginBottom: 40,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 20 },
//     shadowOpacity: 0.4,
//     shadowRadius: 30,
//     elevation: 20,
//   },
//   logoBackground: {
//     width: 140,
//     height: 140,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.3)',
//   },
//   logoInner: {
//     width: 120,
//     height: 120,
//     borderRadius: 30,
//     backgroundColor: 'rgba(255, 255, 255, 0.05)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//   },
//   logoEmoji: {
//     fontSize: 65,
//   },
//   appName: {
//     fontSize: 48,
//     fontWeight: '700',
//     color: '#FFF',
//     letterSpacing: 4,
//     marginBottom: 10,
//     textShadowColor: 'rgba(0, 0, 0, 0.4)',
//     textShadowOffset: { width: 0, height: 3 },
//     textShadowRadius: 15,
//   },
//   tagline: {
//     fontSize: 17,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginBottom: 60,
//     fontWeight: '300',
//     letterSpacing: 1.5,
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 5,
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   loadingDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginHorizontal: 7,
//     overflow: 'hidden',
//   },
//   dotGradient: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 6,
//   },
// });

// export default App;
























// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/Feather';
// import HomeScreen from './src/screens/HomeScreen';

// const Stack = createStackNavigator();
// const { width, height } = Dimensions.get('window');

// const SplashScreen = ({ navigation }) => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     // Simulate loading progress
//     const interval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setTimeout(() => navigation.replace('Home'), 200);
//           return 100;
//         }
//         return prev + 5;
//       });
//     }, 100);

//     return () => clearInterval(interval);
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       {/* Primary gradient background */}
//       <LinearGradient 
//         colors={['#0f0c29', '#302b63', '#24243e']} 
//         style={StyleSheet.absoluteFillObject}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}
//       />
      
//       {/* Aurora effect overlay */}
//       <LinearGradient
//         colors={['rgba(0,172,193,0.1)', 'transparent', 'rgba(128,0,128,0.1)']}
//         style={[StyleSheet.absoluteFillObject, {transform: [{rotate: '-30deg'}, {scale: 1.5}]}]}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}
//       />
      
//       <LinearGradient
//         colors={['transparent', 'rgba(255,0,150,0.05)', 'transparent']}
//         style={[StyleSheet.absoluteFillObject, {transform: [{rotate: '45deg'}, {scale: 1.5}]}]}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}
//       />
      
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
//       {/* Advanced background decoration */}
//       <View style={styles.backgroundDecoration}>
//         {/* Animated particles */}
//         {[...Array(15)].map((_, i) => (
//           <Animatable.View
//             key={`particle-${i}`}
//             animation="fadeIn"
//             delay={i * 100}
//             duration={2000}
//             style={[
//               styles.particle,
//               {
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 width: Math.random() * 4 + 2,
//                 height: Math.random() * 4 + 2,
//               }
//             ]}
//           />
//         ))}
        
//         {/* Glowing orbs with pulsing effect */}
//         <Animatable.View 
//           animation="pulse" 
//           iterationCount="infinite" 
//           duration={3000}
//           style={styles.glowingOrb1}
//         >
//           <LinearGradient
//             colors={['rgba(0,172,193,0.2)', 'rgba(0,172,193,0.05)', 'transparent']}
//             style={styles.orbGradient}
//           />
//         </Animatable.View>
        
//         <Animatable.View 
//           animation="pulse" 
//           iterationCount="infinite" 
//           duration={3500}
//           delay={500}
//           style={styles.glowingOrb2}
//         >
//           <LinearGradient
//             colors={['rgba(128,0,128,0.2)', 'rgba(128,0,128,0.05)', 'transparent']}
//             style={styles.orbGradient}
//           />
//         </Animatable.View>
        
//         <Animatable.View 
//           animation="pulse" 
//           iterationCount="infinite" 
//           duration={4000}
//           delay={1000}
//           style={styles.glowingOrb3}
//         >
//           <LinearGradient
//             colors={['rgba(255,0,150,0.15)', 'rgba(255,0,150,0.05)', 'transparent']}
//             style={styles.orbGradient}
//           />
//         </Animatable.View>
        
//         {/* Floating geometric shapes */}
//         <Animatable.View
//           animation={{
//             0: { transform: [{ rotate: '0deg' }, { translateY: 0 }] },
//             1: { transform: [{ rotate: '360deg' }, { translateY: -20 }] },
//           }}
//           iterationCount="infinite"
//           duration={20000}
//           style={styles.floatingCube}
//         >
//           <LinearGradient
//             colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
//             style={styles.cubeGradient}
//           />
//         </Animatable.View>
        
//         {/* Weather icons constellation */}
//         <View style={styles.iconConstellation}>
//           <Animatable.View animation="fadeIn" delay={200} style={[styles.constellationIcon, { top: 20, left: 30 }]}>
//             <Icon name="cloud" size={20} color="rgba(255,255,255,0.1)" />
//           </Animatable.View>
//           <Animatable.View animation="fadeIn" delay={400} style={[styles.constellationIcon, { top: 60, right: 40 }]}>
//             <Icon name="sun" size={24} color="rgba(255,255,255,0.1)" />
//           </Animatable.View>
//           <Animatable.View animation="fadeIn" delay={600} style={[styles.constellationIcon, { bottom: 80, left: 50 }]}>
//             <Icon name="cloud-rain" size={18} color="rgba(255,255,255,0.08)" />
//           </Animatable.View>
//           <Animatable.View animation="fadeIn" delay={800} style={[styles.constellationIcon, { bottom: 120, right: 30 }]}>
//             <Icon name="wind" size={22} color="rgba(255,255,255,0.1)" />
//           </Animatable.View>
//         </View>
//       </View>
      
//       {/* Main content */}
//       <View style={styles.contentContainer}>
//         <Animatable.View
//           animation="zoomIn"
//           duration={1200}
//           style={styles.logoContainer}
//         >
//           <LinearGradient
//             colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.08)']}
//             style={styles.logoBackground}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//           >
//             <View style={styles.logoInner}>
//               <LinearGradient
//                 colors={['rgba(255,255,255,0.1)', 'transparent']}
//                 style={styles.logoInnerGradient}
//               >
//                 <Animatable.Text 
//                   animation="rotate" 
//                   iterationCount="infinite" 
//                   duration={10000}
//                   easing="linear"
//                   style={styles.logoEmoji}
//                 >
//                   ⛅
//                 </Animatable.Text>
//               </LinearGradient>
//             </View>
//           </LinearGradient>
          
//           {/* Logo glow effect */}
//           <View style={styles.logoGlow} />
//         </Animatable.View>
        
//         <Animatable.Text
//           animation="fadeInUp"
//           delay={600}
//           style={styles.appName}
//         >
//           SkyView
//         </Animatable.Text>
        
//         <Animatable.Text
//           animation="fadeInUp"
//           delay={800}
//           style={styles.tagline}
//         >
//           Weather refined for you
//         </Animatable.Text>
        
//         {/* Premium loading bar */}
//         <Animatable.View
//           animation="fadeIn"
//           delay={1000}
//           style={styles.loadingBarContainer}
//         >
//           <View style={styles.loadingBarBackground}>
//             <Animatable.View 
//               style={[styles.loadingBarFill, { width: `${progress}%` }]}
//             >
//               <LinearGradient
//                 colors={['#00acc1', '#5e35b1', '#ff0096']}
//                 style={styles.loadingGradient}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//               />
//             </Animatable.View>
//           </View>
//           <Text style={styles.loadingText}>Loading weather data...</Text>
//         </Animatable.View>
        
//         {/* Features preview */}
//         <Animatable.View 
//           animation="fadeInUp" 
//           delay={1200}
//           style={styles.featuresContainer}
//         >
//           <View style={styles.featureItem}>
//             <Icon name="map-pin" size={16} color="rgba(255,255,255,0.6)" />
//             <Text style={styles.featureText}>Real-time location</Text>
//           </View>
//           <View style={styles.featureDivider} />
//           <View style={styles.featureItem}>
//             <Icon name="trending-up" size={16} color="rgba(255,255,255,0.6)" />
//             <Text style={styles.featureText}>5-day forecast</Text>
//           </View>
//           <View style={styles.featureDivider} />
//           <View style={styles.featureItem}>
//             <Icon name="droplet" size={16} color="rgba(255,255,255,0.6)" />
//             <Text style={styles.featureText}>Weather details</Text>
//           </View>
//         </Animatable.View>
//       </View>
      
//       {/* Bottom decoration */}
//       <View style={styles.bottomDecoration}>
//         <LinearGradient
//           colors={['transparent', 'rgba(255,255,255,0.02)']}
//           style={styles.bottomGradient}
//         />
//       </View>
//     </View>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
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
//   particle: {
//     position: 'absolute',
//     backgroundColor: 'rgba(255,255,255,0.6)',
//     borderRadius: 50,
//     shadowColor: '#FFF',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.5,
//     shadowRadius: 3,
//   },
//   glowingOrb1: {
//     position: 'absolute',
//     width: 500,
//     height: 500,
//     borderRadius: 250,
//     top: -200,
//     right: -150,
//   },
//   glowingOrb2: {
//     position: 'absolute',
//     width: 400,
//     height: 400,
//     borderRadius: 200,
//     bottom: -150,
//     left: -100,
//   },
//   glowingOrb3: {
//     position: 'absolute',
//     width: 300,
//     height: 300,
//     borderRadius: 150,
//     top: '40%',
//     left: '50%',
//   },
//   orbGradient: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 1000,
//   },
//   floatingCube: {
//     position: 'absolute',
//     width: 80,
//     height: 80,
//     top: '30%',
//     right: 40,
//   },
//   cubeGradient: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 20,
//     transform: [{ rotate: '45deg' }],
//   },
//   iconConstellation: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
//   constellationIcon: {
//     position: 'absolute',
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 40,
//   },
//   logoContainer: {
//     marginBottom: 50,
//     position: 'relative',
//   },
//   logoBackground: {
//     width: 150,
//     height: 150,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     shadowColor: '#00acc1',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.5,
//     shadowRadius: 30,
//     elevation: 20,
//   },
//   logoInner: {
//     width: 130,
//     height: 130,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   logoInnerGradient: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logoEmoji: {
//     fontSize: 70,
//   },
//   logoGlow: {
//     position: 'absolute',
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     backgroundColor: 'rgba(0,172,193,0.1)',
//     top: -25,
//     left: -25,
//     zIndex: -1,
//   },
//   appName: {
//     fontSize: 52,
//     fontWeight: '800',
//     color: '#FFF',
//     letterSpacing: 5,
//     marginBottom: 15,
//     textShadowColor: 'rgba(0,172,193,0.5)',
//     textShadowOffset: { width: 0, height: 4 },
//     textShadowRadius: 20,
//   },
//   tagline: {
//     fontSize: 18,
//     color: 'rgba(255, 255, 255, 0.7)',
//     marginBottom: 60,
//     fontWeight: '300',
//     letterSpacing: 2,
//     textShadowColor: 'rgba(0, 0, 0, 0.3)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 10,
//   },
//   loadingBarContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   loadingBarBackground: {
//     width: '80%',
//     height: 4,
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderRadius: 2,
//     overflow: 'hidden',
//     marginBottom: 15,
//   },
//   loadingBarFill: {
//     height: '100%',
//     borderRadius: 2,
//   },
//   loadingGradient: {
//     flex: 1,
//   },
//   loadingText: {
//     fontSize: 14,
//     color: 'rgba(255,255,255,0.5)',
//     fontWeight: '400',
//     letterSpacing: 1,
//   },
//   featuresContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 80,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   featureText: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.5)',
//     marginLeft: 6,
//     fontWeight: '400',
//   },
//   featureDivider: {
//     width: 1,
//     height: 16,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     marginHorizontal: 15,
//   },
//   bottomDecoration: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 100,
//   },
//   bottomGradient: {
//     flex: 1,
//   },
// });

// export default App;



























// App.jsx
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      {/* Primary gradient background - Light theme */}
      <LinearGradient 
        colors={['#FFFFFF', '#F0FDF4', '#ECFCCB']} 
        style={StyleSheet.absoluteFillObject}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
      />
      
      {/* Secondary gradient overlay for depth */}
      <LinearGradient
        colors={['rgba(34,197,94,0.05)', 'transparent', 'rgba(251,191,36,0.05)']}
        style={[StyleSheet.absoluteFillObject, {transform: [{rotate: '45deg'}, {scale: 1.5}]}]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      />
      
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Background decoration */}
      <View style={styles.backgroundDecoration}>
        {/* Glowing orbs with green/emerald gradients */}
        <Animatable.View 
          animation="pulse" 
          iterationCount="infinite" 
          duration={3000}
          style={styles.glowingOrb1}
        >
          <LinearGradient
            colors={['rgba(34,197,94,0.15)', 'rgba(34,197,94,0.05)', 'transparent']}
            style={styles.orbGradient}
          />
        </Animatable.View>
        
        <Animatable.View 
          animation="pulse" 
          iterationCount="infinite" 
          duration={3500}
          delay={500}
          style={styles.glowingOrb2}
        >
          <LinearGradient
            colors={['rgba(16,185,129,0.15)', 'rgba(16,185,129,0.05)', 'transparent']}
            style={styles.orbGradient}
          />
        </Animatable.View>
        
        <Animatable.View 
          animation="pulse" 
          iterationCount="infinite" 
          duration={4000}
          delay={1000}
          style={styles.glowingOrb3}
        >
          <LinearGradient
            colors={['rgba(251,191,36,0.12)', 'rgba(251,191,36,0.04)', 'transparent']}
            style={styles.orbGradient}
          />
        </Animatable.View>
        
        {/* Geometric leaf-inspired shapes */}
        <View style={styles.leafShape1} />
        <View style={styles.leafShape2} />
        <View style={styles.leafShape3} />
        
        {/* Floating circles */}
        <Animatable.View
          animation={{
            0: { transform: [{ translateY: 0 }, { translateX: 0 }] },
            0.5: { transform: [{ translateY: -30 }, { translateX: 20 }] },
            1: { transform: [{ translateY: 0 }, { translateX: 0 }] },
          }}
          iterationCount="infinite"
          duration={5000}
          style={styles.floatingCircle1}
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
          style={styles.floatingCircle2}
        />
        
        {/* Weather icons decoration */}
        <View style={styles.iconDecoration}>
          <Animatable.View animation="fadeIn" delay={200} style={[styles.decorIcon, { top: 100, left: 40 }]}>
            <Icon name="cloud" size={24} color="rgba(34,197,94,0.15)" />
          </Animatable.View>
          <Animatable.View animation="fadeIn" delay={400} style={[styles.decorIcon, { top: 150, right: 50 }]}>
            <Icon name="sun" size={28} color="rgba(251,191,36,0.15)" />
          </Animatable.View>
          <Animatable.View animation="fadeIn" delay={600} style={[styles.decorIcon, { bottom: 180, left: 60 }]}>
            <Icon name="wind" size={22} color="rgba(16,185,129,0.12)" />
          </Animatable.View>
        </View>
      </View>
      
      {/* Main content */}
      <View style={styles.contentContainer}>
        <Animatable.View
          animation="zoomIn"
          duration={1200}
          style={styles.logoContainer}
        >
          <LinearGradient
            colors={['#10B981', '#22C55E', '#34D399']}
            style={styles.logoBackground}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          >
            <View style={styles.logoInner}>
              <Icon name="cloud-lightning" size={50} color="#FFFFFF" />
            </View>
          </LinearGradient>
          
          {/* Logo shadow */}
          <View style={styles.logoShadow} />
        </Animatable.View>
        
        <Animatable.Text
          animation="fadeInUp"
          delay={600}
          style={styles.appName}
        >
          Weathronix
        </Animatable.Text>
        
        <Animatable.Text
          animation="fadeInUp"
          delay={800}
          style={styles.tagline}
        >
          Powered by skAI
        </Animatable.Text>
        
        {/* Three dots loading indicator */}
        <Animatable.View
          animation="fadeIn"
          delay={1000}
          style={styles.loadingContainer}
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
              colors={['#34D399', '#10B981']}
              style={styles.dotGradient}
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
              colors={['#22C55E', '#16A34A']}
              style={styles.dotGradient}
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
              colors={['#FCD34D', '#FBB040']}
              style={styles.dotGradient}
            />
          </Animatable.View>
        </Animatable.View>
        
        {/* Features preview */}
        <Animatable.View 
          animation="fadeInUp" 
          delay={1200}
          style={styles.featuresContainer}
        >
          <View style={styles.featureItem}>
            <Icon name="sun" size={16} color="#10B981" />
            <Text style={styles.featureText}>Weather details</Text>
          </View>
          <View style={styles.featureDivider} />
          <View style={styles.featureItem}>
            <Icon name="trending-up" size={16} color="#10B981" />
            <Text style={styles.featureText}>5-days forecasts</Text>
          </View>
          <View style={styles.featureDivider} />
          <View style={styles.featureItem}>
            <Icon name="map-pin" size={16} color="#10B981" />
            <Text style={styles.featureText}>Real-time locations</Text>
          </View>
        </Animatable.View>
      </View>
      
      {/* Bottom decoration */}
      <View style={styles.bottomDecoration}>
        <LinearGradient
          colors={['transparent', 'rgba(34,197,94,0.05)']}
          style={styles.bottomGradient}
        />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
    width: 400,
    height: 400,
    borderRadius: 200,
    top: -150,
    right: -100,
  },
  glowingOrb2: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    bottom: -180,
    left: -120,
  },
  glowingOrb3: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    top: '35%',
    right: '20%',
  },
  orbGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
  },
  leafShape1: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: 'rgba(34,197,94,0.08)',
    borderRadius: 50,
    transform: [{ rotate: '45deg' }, { scaleX: 0.7 }],
    top: '20%',
    left: 30,
  },
  leafShape2: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(16,185,129,0.06)',
    borderRadius: 40,
    transform: [{ rotate: '-30deg' }, { scaleX: 0.6 }],
    bottom: '30%',
    right: 40,
  },
  leafShape3: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(251,191,36,0.08)',
    borderRadius: 30,
    transform: [{ rotate: '60deg' }, { scaleX: 0.8 }],
    top: '50%',
    left: '25%',
  },
  floatingCircle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(34,197,94,0.05)',
    top: '25%',
    right: 20,
    borderWidth: 1,
    borderColor: 'rgba(34,197,94,0.1)',
  },
  floatingCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(251,191,36,0.05)',
    bottom: '35%',
    left: 30,
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.1)',
  },
  iconDecoration: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  decorIcon: {
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
    position: 'relative',
  },
  logoBackground: {
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
  logoInner: {
    width: 140,
    height: 140,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoShadow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(34,197,94,0.08)',
    top: -10,
    left: -10,
    zIndex: -1,
  },
  appName: {
    fontSize: 48,
    fontWeight: '800',
    color: '#047857',
    letterSpacing: 3,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 17,
    color: '#059669',
    marginBottom: 50,
    fontWeight: '400',
    letterSpacing: 1,
  },
  loadingContainer: {
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
  dotGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
  },
  featuresContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    // paddingLeft: 30,
    // paddingRight: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 12,
    color: '#059669',
    marginLeft: 6,
    fontWeight: '500',
  },
  featureDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(16,185,129,0.3)',
    marginHorizontal: 15,
  },
  bottomDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  bottomGradient: {
    flex: 1,
  },
});

export default App;