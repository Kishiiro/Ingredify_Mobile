import React, { useContext, useState, useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { postData } from '../services/api'; 
import AuthContext from '../services/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';




const Profile = () => {
  const BASE_URL = process.env.API_BASE_URL;
  const { setAuthenticated } = useContext(AuthContext);
  const navigation = useNavigation();  
  const [Name, setName] = useState('');
  const [Subscription, setSubscription] = useState('');
  const [UserName, setUserName] = useState('');
  const [userLoginPassword, setUserLoginPassword] = useState('');
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [userInfo, setUserInfo] = useState(null);


  const selectImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
  
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!pickerResult.canceled) {
      const source = { uri: pickerResult.assets[0].uri };
      setProfileImageUri(source.uri);
    }
  };
  
  const handleImageSelection = () => {
    Alert.alert(
      "Select Photo",
      "Choose an option",
      [
        { 
          text: "Take Photo", 
          onPress: () => takePhoto() 
        },
        { 
          text: "Choose from Library", 
          onPress: () => selectImage() 
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };
  
  const takePhoto = async () => {
    let cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
    if (cameraPermissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }
  
    let cameraResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!cameraResult.canceled) {
      setProfileImageUri(cameraResult.assets[0].uri);
    }
  };
  
  

  const [Date ]= useState('2023-11-11');

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem('user_info');
        if (userInfoString !== null) {
          const userInfoData = JSON.parse(userInfoString);
          setUserInfo(userInfoData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
    fetchComorbidityInfo();
  }, []);
  
  const fetchComorbidityInfo = async () => {
    try {
      
      const response = await postData('/pantry/recipe'); 
      console.log('comorbidity::', response);

    if (response.status === 200) {
      // Save tokens in local storage
      await AsyncStorage.setItem('RecipeName', response.data.data[0].RecipeName);
      //await AsyncStorage.setItem('refresh_token', response.data.refresh_token);
      //await AsyncStorage.setItem('user_info', JSON.stringify(response.data.user_info));
      
      setAuthenticated(true);
    }
  } catch (error) {
    console.log('Error:', error);
  }    
  };
  

  const updatePassword = async () => {
    try {
      const changepassword = {
        UserLoginPassword: userLoginPassword,
      };

      const response = await postData('/profile/update/password', changepassword);
      console.log('response login::', response);
      
      
      if (response.status === 200) {
        Alert.alert("Success", "Password changed successfully");
    
        setUserLoginPassword('');
      } else {
        Alert.alert("Error", "Password change failed");
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const profilePictureUrl = userInfo ? BASE_URL + '/media/' + userInfo.ProfilePicUrl : null;

  return (
    <View style={styles.container}>
      
      {/* Top Bar */}
      <TouchableOpacity style={styles.topBar} onPress={() => navigation.navigate('Dashboard')}>
        <Icon name="arrow-left" size={20} />
        <Icon name="ellipsis-v" size={20} />
      </TouchableOpacity>

      {profilePictureUrl ? (
        // <Image
        //   source={{ uri: profilePictureUrl }}
        //   style={styles.profileImage}
        // />
      <TouchableOpacity onPress={handleImageSelection}>
        <Image
          source={{ uri: profileImageUri || profilePictureUrl }}
          style={styles.profileImage}
        />
      </TouchableOpacity>


      ) : (
        <Image
          source={require('../assets/profileimg.jpg')}
          style={styles.profileImage}
        />
      )}

      <Text style={styles.profileName}>{userInfo ? userInfo.ProfileFirstName + ' ' + userInfo.ProfileLastName : ''}</Text>



      {/* Menu Options */}
      <View style={styles.menuOption}>
        <Text>Recipe History</Text>
        <Icon name="cog" size={20} />
      </View>

      <View style={styles.menuOption}>
        <Text>Subscription</Text>
        <Text style={styles.menuTextRight}>{Subscription}</Text>
      </View>

      <TouchableOpacity style={styles.menuOption}>
        <Text>UserName</Text>
        <Text style={styles.menuTextRight}>{userInfo ? userInfo.UserLoginName : ''}</Text>
      </TouchableOpacity>

      {/* Password Change Section */}
      <View style={styles.menuOption}>
          <Text>Password</Text>
          <TextInput
            style={styles.menuTextRight}
            placeholder="New Password"
            secureTextEntry={true}
            onChangeText={setUserLoginPassword}
            value={userLoginPassword}
            returnKeyType="done"
          />
        </View>

      {/* Change Password Button */}
      <TouchableOpacity style={styles.button} onPress={updatePassword}>
        <Text>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuOption}>
        <Text>Comorbidity Condition</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuOption}>
        <Text>Dietary Restriction</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} label="Logout"
        onPress={handleLogout}
        icon={({color, size}) => <Icon name="sign-out" color={color} size={size} />}   >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>


  
      
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e7f7e9',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  menuOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 0.5,
    paddingVertical: 10,
  },
  menuTextRight: {
    color: 'gray',
  },
  logoutButton: {
    width: '80%',
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
