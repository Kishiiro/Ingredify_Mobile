import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Footer = () => {
  return (
    
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2023 React Services</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 50,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
});

export default Footer;
