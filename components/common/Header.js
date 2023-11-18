import React, { useContext } from 'react'; 
import { View, StyleSheet, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import AuthContext from '../../services/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const { setAuthenticated } = useContext(AuthContext);

  const handleMenu = () => {
          // Add your burger menu logic here
          console.log('Burger menu pressed');
          alert(123);
  }

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
  }

  return (
    <View style={[styles.header, { marginTop: StatusBar.currentHeight }]}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={handleMenu}>
          <Image source={require('../../assets/burger.png')} style={styles.burgerIcon} />
        </TouchableOpacity>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={handleLogout}>
          <Image source={require('../../assets/logout.png')} style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  burgerIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  logo: {
    height: 40,
    width: 120,
    resizeMode: 'contain',
  },
  logoutIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});

export default Header;


// import React, { useContext } from 'react'; 
// import { View, StyleSheet, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
// import AuthContext from '../../services/AuthContext';
//import AsyncStorage from '@react-native-async-storage/async-storage';

// const Header = () => {
//   const { setAuthenticated } = useContext(AuthContext);

//   const handleMenu = () => {
//           // Add your burger menu logic here
//           console.log('Burger menu pressed');
//   }

//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "OK", onPress: () => setAuthenticated(false) }
//       ]
//     );
//   }

//   return (
//     <View style={[styles.header, { marginTop: StatusBar.currentHeight }]}>
//       <View style={styles.headerContent}>
//         <TouchableOpacity onPress={handleMenu}>
//           <Image source={require('../../assets/burger.png')} style={styles.burgerIcon} />
//         </TouchableOpacity>
//         <Image source={require('../../assets/logo.png')} style={styles.logo} />
//         <TouchableOpacity onPress={handleLogout}>
//           <Image source={require('../../assets/logout.png')} style={styles.logoutIcon} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     height: 60,
//     backgroundColor: 'skyblue',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   burgerIcon: {
//     height: 30,
//     width: 30,
//     resizeMode: 'contain',
//   },
//   logo: {
//     height: 40,
//     width: 120,
//     resizeMode: 'contain',
//   },
//   logoutIcon: {
//     height: 30,
//     width: 30,
//     resizeMode: 'contain',
//   },
// });

// export default Header;


