import { useNavigation } from '@react-navigation/native';  
import React, {useEffect, useState, useRef, useContext} from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { postData } from '../../services/api';
import AuthContext from '../../services/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setAuthenticated } = useContext(AuthContext);
  const passwordRef = useRef();
 
  
  const handleNavigateToWelcomeScreen2 = () => {
    return navigation.navigate('WelcomeScreen2');
  }
  
  const handleLogin = async () => {
    const data = {
      username,
      password,
      include_user_info: true
    }

    try {
      const response = await postData('/token', data); 
      console.log('response login::', response);

      if (response.status === 200) {
        // Save tokens in local storage
        await AsyncStorage.setItem('access_token', response.data.access_token);
        await AsyncStorage.setItem('refresh_token', response.data.refresh_token);
        await AsyncStorage.setItem('user_info', JSON.stringify(response.data.user_info));

        setAuthenticated(true);
      }
    } catch (error) {
      console.log('Error:', error);
    }    
  }

  return (
    
    <View style={styles.container}>
    <Text style={styles.title}>Sign In</Text>
    <Image source={require('../../assets/logo.png')} style={styles.logo} />

    
    
    <TextInput
      style={styles.inputEmail}
      placeholder="Email"
      onChangeText={text => setUsername(text)}
      value={username}
      returnKeyType="next"
      onSubmitEditing={() => passwordRef.current.focus()}
    />
    
    <TextInput
      ref={passwordRef}
      style={styles.inputPassword}
      placeholder="Password"
      secureTextEntry
      onChangeText={text => setPassword(text)}
      value={password}
      returnKeyType="done"
      onSubmitEditing={handleLogin}
    />

    <TouchableOpacity style={styles.forgotPassword}>
      <Text style={{ color: '#2D5926', fontSize: 15 }}>Forgot Password?</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={{fontSize: 18, color: "#2D5926", fontWeight: "700"}}>SIGN IN</Text>
    </TouchableOpacity>
    
    <Text style={{marginTop:15, marginBottom:15}}>OR</Text>
    
    
    <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center', 
                  alignItems: 'center',
                  marginTop: 10
                 }}>
      <Text style={{fontSize:18}}>Not a member yer?  </Text>
      <TouchableOpacity onPress={handleNavigateToWelcomeScreen2}>
        <Text style={{color: '#2D5926', fontSize:18}}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D5ECC3',
      padding: 20, // Added padding
      
    },
    logo: {
      width: 250,
      height: 155,
      marginBottom: 150,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      marginLeft: 90
      //elevation: 5, // For Android shadow
    },
    title: {
      fontSize: 19,
      
    },
    inputEmail: {
      borderRadius: 40,
      borderWidth: 1,
      paddingHorizontal:13,
			paddingVertical: 10,
			width: "85%",
			alignItems: "center",
      backgroundColor: "#ffffff",
      marginBottom:10,
      marginTop:-100,
    },
      inputPassword: {
      borderRadius: 40,
      borderWidth: 1,
      paddingHorizontal:13,
      paddingVertical: 10,
      width: "85%",
      alignItems: "center",
      backgroundColor: "#ffffff",
      marginBottom: 10,
      marginTop: 10,
    },
    button: {
      backgroundColor: "#8AD77E",
      borderRadius: 40,
      paddingVertical: 11,
      width: "80%",
      alignItems: "center",
		  marginTop: 10,
      borderWidth: 2,
      borderColor: "#4CAF50",
      color:"#000000"
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    forgotPassword: {
      alignSelf: 'center',
      marginBottom: 30,
      marginTop: 20
      
    },
    socialIcons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '50%',
      marginLeft:13, 
      marginBottom: 20,
    },
  
  });

export default Login;