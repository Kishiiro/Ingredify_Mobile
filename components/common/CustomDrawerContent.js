import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Alert, Image, Text, TouchableOpacity } from 'react-native';

import AuthContext from '../../services/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUserInfo } from '../../hooks/useUserInfo';

const CustomDrawerContent = (props) => {
  const { setAuthenticated } = useContext(AuthContext);
  const { navigation } = props;
  const userInfo = useUserInfo();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: async () => {
          try {
            await AsyncStorage.clear();
            setAuthenticated(false);
          } catch (e) {
            console.error(e);
          }
        }}
      ]
    );
  };

  const handleProfileClick = () => {
    // Navigate to the ProfileSettings component
    navigation.navigate('ProfileSettings');
  };

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={handleProfileClick} style={{alignItems: 'center', marginBottom: 20}}>
        <Image
          source={require('../../assets/logo.png')}
          style={{width: 80, height: 80}}
        />
        <Text style={{ fontSize: 16, marginTop: 10, fontWeight: 'bold' }}>
          {userInfo && userInfo.UserLoginName ? userInfo.UserLoginName : 'Loading...'}
        </Text>

      </TouchableOpacity>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        icon={({color, size}) => <Icon name="sign-out" color={color} size={size} />} 
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
