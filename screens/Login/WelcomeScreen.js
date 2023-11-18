import { Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useFonts } from 'expo-font';

const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Montserrat_ExtraBold: require("../../assets/fonts/Montserrat_ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    // Font is still loading, return a loading state or null
    return null; 
  }

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handleNavigateToWelcomeScreen2 = () => {
    navigation.navigate('WelcomeScreen2');
  };

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#D5ECC3" }}>
      <Text style={{
        color: "#8AD77E",
        fontSize: 40,
        fontWeight: "bold",
        fontFamily: 'Montserrat_ExtraBold',
        textAlign: "left",
        width: 200,
        marginTop: 35,
        marginRight: 120
      }}>
        Enjoy cooking
      </Text>
      <Text
        style={{
          fontSize: 18,
          color: "#000000",
          marginTop: 2,
          marginBottom: 20,
          width: 320,
          marginRight: 5
        }}>
        Delicious and healthy personalized recipes at your fingertips
      </Text>
      <Image
        source={require("../../assets/cook.png")}
        style={{
          width: "40%",
          aspectRatio: 1.2,
        }}
        resizeMode="contain"
      />

      <TouchableOpacity
        onPress={handleNavigateToLogin}
        style={{
          backgroundColor: "#8AD77E",
          borderRadius: 40,
          paddingVertical: 11,
          width: "50%",
          alignItems: "center",
          marginTop: 50,
          borderWidth: 2,
          borderColor: "#4CAF50"
        }}>
        <Text style={{ fontSize: 18, color: "#2D5926", fontWeight: "700", }}>
          SIGN IN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleNavigateToWelcomeScreen2}
        style={{
          backgroundColor: "#8AD77E",
          borderRadius: 40,
          paddingVertical: 11,
          width: "50%",
          alignItems: "center",
          marginTop: 20,
          borderWidth: 2,
          borderColor: "#4CAF50"
        }}>
        <Text style={{ fontSize: 18, color: "#2D5926", fontWeight: "700", }}>
          SIGN UP
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
