// src/components/ErrorView.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

export const ErrorView = ({ message, onRetry }) => {
  return (
    <Animatable.View animation="fadeIn" style={styles.container}>
      <Icon name="cloud-off" size={60} color="#FFF" style={styles.icon} />
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Icon name="refresh-cw" size={20} color="#FFF" />
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};