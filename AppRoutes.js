import React, { useContext, useState, useEffect } from 'react';
import { View, Text  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postData } from './services/api';
import AuthContext from './services/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';


import Login from './screens/Login/Login';
import Signup from './screens/Login/Signup';
import WelcomeScreen from './screens/Login/WelcomeScreen';
import Loading from './components/common/Loading';
import CustomDrawer from './components/common/CustomDrawer'; 
import WelcomeScreen2 from './screens/Login/WelcomeScreen2';


const Stack = createStackNavigator();


const AppRoutes = () => {
  const navigation = useNavigation();
  const { isAuthenticated, screens, setScreens } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchScreens = async () => {
      try {
        if (isAuthenticated) {
            const data = {
              'ModuleParentID' : 0,
            };
  
            const response = await postData('/navigation', data); 
  
            if (response.status === 200) {
              setScreens(response.data); // Set the screens from the response data
              setLoading(false);
            }

        }
      } catch (error) {
        setError(error);
      setLoading(false);
      }
    }
      
    fetchScreens();
  }, [isAuthenticated]);

  
if (loading && isAuthenticated) {
  return <Loading />;
}

if (error) {
  return <View><Text>Error: {error.message}</Text></View>;
}


  if (isAuthenticated)
   { 
    return (<CustomDrawer screens={screens} />)
   } else {
     return  (
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login Page' }} />
      <Stack.Screen name="Signup" component={Signup} options={{ title: 'Signup Page' }} />    
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: 'WelcomeScreen Page' }} />  
      <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} options={{ title: 'WelcomeScreen2 Page' }} />   
    </Stack.Navigator>
  
     )

    }
  
};

export default AppRoutes;