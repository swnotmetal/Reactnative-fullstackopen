import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notification = ({ message, type }) => {
    console.log('Notification message:', message);
  return (
    <View style={[styles.container, type === 'success' ? styles.success : styles.error]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  success: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  error: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  message: {
    color: '#155724',
    fontSize: 16,
  },
});

export default Notification;