import {Text, View, Image, TouchableOpacity, SafeAreaView, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useFonts } from 'expo-font';



const WelcomeScreen2 = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
    Montserrat_ExtraBold: require("../../assets/fonts/Montserrat_ExtraBold.ttf"),
    });
  
    if (!fontsLoaded) {
      // Font is still loading, return a loading state or null
      return null; 
    }

    const handleNavigateToSignup = () => {
        navigation.navigate('Signup');
    }
    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#D5ECC3"  }}>
            <SafeAreaView style={{ flexDirection: "row", marginHorizontal: 20}}>          
                <Pressable style={{ flex: 1, marginTop:50 }} onPress={() => navigation.goBack()}>
                  <FontAwesome name={"arrow-circle-left"} size={30} color="white"/>
                </Pressable>
      </SafeAreaView>
        <Image
            source={require("../../assets/welcomescreen2.png")}
            style={{
            width: "40%", // Set the width to 80% of the parent container
            aspectRatio: 0.7, // Set the aspect ratio to maintain the image's original aspect ratio
            marginTop: -60
            }}
            resizeMode="contain" // Resize the image to fit within its container
        />

        <Text style={{color: "#000000", 
            fontSize: 25,
            width:360,
            fontWeight: "bold", 
            fontFamily: 'Montserrat_ExtraBold',
            textAlign:"center",
             }}>
            Do you want to explore diverse Recipe?
        </Text>

        <TouchableOpacity
        onPress={handleNavigateToSignup}
        style={{
        backgroundColor: "#8AD77E",
        borderRadius: 40,
        paddingVertical: 11,
        width: "50%",
        alignItems: "center",
        marginTop:20,
        borderWidth: 2,
        borderColor: "#4CAF50"
        }}>
        <Text style={{ fontSize: 18, color: "#2D5926", fontWeight: "700", }}>
        CLICK HERE
        </Text>
        </TouchableOpacity>

        <Text
        style={{
        fontSize: 18,
        color: "#000000",
        marginTop: 15,
        alignItems: "center" }}>
        OR
        </Text>

        <Text style={{color: "#000000", 
        fontSize: 25,
        width:360,
        fontWeight: "bold", 
        fontFamily: 'Montserrat_ExtraBold',
        textAlign:"center",
        marginTop: 10,
        }}>
        Are you an expert willing to help?
        </Text>

        <TouchableOpacity
        onPress={handleNavigateToSignup}
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
        CLICK HERE
        </Text>
        </TouchableOpacity>

        </View>
    );
};

export default WelcomeScreen2;




