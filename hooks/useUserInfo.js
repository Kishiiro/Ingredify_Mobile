import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const value = await AsyncStorage.getItem('user_info');
        if(value !== null) {
          const userInfo = JSON.parse(value);
          setUserInfo(userInfo);
        }
      } catch(e) {
        console.error(e);
      }
    };

    fetchUserInfo();
  }, []);

  return userInfo;
};
