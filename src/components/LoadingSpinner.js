// src/components/LoadingSpinner.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';

export const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <Animatable.View
        animation={{
          0: { rotate: '0deg' },
          1: { rotate: '360deg' },
        }}
        iterationCount="infinite"
        duration={1500}
        easing="linear"
      >
        <Icon name="sun" size={50} color="#FFF" />
      </Animatable.View>
      <Animatable.Text
        animation="pulse"
        iterationCount="infinite"
        style={styles.text}
      >
        Loading Weather...
      </Animatable.Text>
    </View>
  );
};