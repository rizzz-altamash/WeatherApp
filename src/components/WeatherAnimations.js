// src/components/WeatherAnimations.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

// Rain Animation Component
export const RainAnimation = () => {
  const rainDrops = Array(50).fill(null).map((_, i) => ({
    key: i,
    left: Math.random() * width,
    animationDuration: 1000 + Math.random() * 1000,
    delay: Math.random() * 2000,
    size: Math.random() * 2 + 1,
  }));

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {rainDrops.map((drop) => (
        <Animatable.View
          key={drop.key}
          animation={{
            0: {
              translateY: -10,
              opacity: 0,
            },
            0.1: {
              opacity: 0.5,
            },
            0.9: {
              opacity: 0.5,
            },
            1: {
              translateY: height + 10,
              opacity: 0,
            },
          }}
          duration={drop.animationDuration}
          delay={drop.delay}
          iterationCount="infinite"
          easing="linear"
          style={[
            styles.rainDrop,
            {
              left: drop.left,
              width: drop.size,
              height: drop.size * 15,
            },
          ]}
        />
      ))}
    </View>
  );
};

// Snow Animation Component
export const SnowAnimation = () => {
  const snowFlakes = Array(30).fill(null).map((_, i) => ({
    key: i,
    left: Math.random() * width,
    animationDuration: 5000 + Math.random() * 5000,
    delay: Math.random() * 5000,
    size: Math.random() * 4 + 2,
    swayAmount: Math.random() * 40 - 20,
  }));

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {snowFlakes.map((flake) => (
        <Animatable.View
          key={flake.key}
          animation={{
            0: {
              translateY: -10,
              translateX: 0,
              opacity: 0,
            },
            0.1: {
              opacity: 1,
            },
            0.5: {
              translateX: flake.swayAmount,
            },
            0.9: {
              opacity: 1,
            },
            1: {
              translateY: height + 10,
              translateX: 0,
              opacity: 0,
            },
          }}
          duration={flake.animationDuration}
          delay={flake.delay}
          iterationCount="infinite"
          easing="ease-in-out"
          style={[
            styles.snowFlake,
            {
              left: flake.left,
              width: flake.size,
              height: flake.size,
            },
          ]}
        />
      ))}
    </View>
  );
};

// Lightning Animation Component
export const LightningAnimation = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const flashSequence = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: Math.random() * 3000 + 2000,
          useNativeDriver: true,
        }),
      ]).start(() => flashSequence());
    };

    flashSequence();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.lightning,
        { opacity },
      ]}
      pointerEvents="none"
    />
  );
};

// Cloud Animation Component
export const CloudAnimation = ({ density = 'medium' }) => {
  const clouds = Array(density === 'heavy' ? 6 : 3).fill(null).map((_, i) => ({
    key: i,
    top: Math.random() * height * 0.4,
    size: Math.random() * 100 + 80,
    duration: 20000 + Math.random() * 20000,
    delay: i * 5000,
  }));

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {clouds.map((cloud) => (
        <Animatable.View
          key={cloud.key}
          animation={{
            0: { translateX: -200 },
            1: { translateX: width + 200 },
          }}
          duration={cloud.duration}
          delay={cloud.delay}
          iterationCount="infinite"
          easing="linear"
          style={[
            styles.cloud,
            {
              top: cloud.top,
              width: cloud.size,
              height: cloud.size * 0.6,
            },
          ]}
        />
      ))}
    </View>
  );
};

// Sun Animation Component
export const SunAnimation = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Rotation animation
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 30000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [rotation, scale]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.sunContainer} pointerEvents="none">
      <Animated.View
        style={[
          styles.sun,
          {
            transform: [{ rotate: spin }, { scale }],
          },
        ]}
      >
        <View style={styles.sunCore} />
        {Array(8).fill(null).map((_, i) => (
          <View
            key={i}
            style={[
              styles.sunRay,
              {
                transform: [
                  { rotate: `${i * 45}deg` },
                  { translateY: -40 },
                ],
              },
            ]}
          />
        ))}
      </Animated.View>
    </View>
  );
};

// Fog Animation Component
export const FogAnimation = () => {
  const fogLayers = Array(3).fill(null).map((_, i) => ({
    key: i,
    opacity: 0.3 - i * 0.1,
    duration: 15000 + i * 5000,
  }));

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {fogLayers.map((layer) => (
        <Animatable.View
          key={layer.key}
          animation={{
            0: { translateX: -width },
            1: { translateX: width },
          }}
          duration={layer.duration}
          iterationCount="infinite"
          easing="linear"
          style={[
            styles.fogLayer,
            { opacity: layer.opacity },
          ]}
        />
      ))}
    </View>
  );
};

// Stars for Night Clear Sky
export const StarsAnimation = () => {
  const stars = Array(50).fill(null).map((_, i) => ({
    key: i,
    left: Math.random() * width,
    top: Math.random() * height * 0.7,
    size: Math.random() * 3 + 1,
    duration: 2000 + Math.random() * 3000,
    delay: Math.random() * 3000,
  }));

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {stars.map((star) => (
        <Animatable.View
          key={star.key}
          animation={{
            0: { opacity: 0.1 },
            0.5: { opacity: 1 },
            1: { opacity: 0.1 },
          }}
          duration={star.duration}
          delay={star.delay}
          iterationCount="infinite"
          style={[
            styles.star,
            {
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  rainDrop: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 1,
  },
  snowFlake: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderRadius: 50,
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  lightning: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  cloud: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 100,
  },
  sunContainer: {
    position: 'absolute',
    top: 50,
    right: 50,
  },
  sun: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunCore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
  sunRay: {
    position: 'absolute',
    width: 4,
    height: 30,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  fogLayer: {
    position: 'absolute',
    width: width * 2,
    height: height,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderRadius: 50,
  },
});