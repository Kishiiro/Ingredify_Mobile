import React from 'react';
import { View, StyleSheet } from 'react-native';
//import Footer from './Footer'; <Footer />

const Layout = ({ children }) => (
  <View style={styles.container}>
    {children}
    
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
