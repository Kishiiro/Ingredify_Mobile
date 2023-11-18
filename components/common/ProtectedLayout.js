import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the necessary navigation hook

const ProtectedLayout = ({ children }) => {
  const navigation = useNavigation();

  // Simulate authentication status (you should replace this with your actual authentication logic)
  const isAuthenticated = true;

  // Check if the user is authenticated
  if (!isAuthenticated) {
    // Redirect to the login screen or show a message to the user
    navigation.navigate('Login'); // Replace 'Login' with the correct screen name for your login screen
    return null;
  }

  // If the user is authenticated, render the protected content
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default ProtectedLayout;
