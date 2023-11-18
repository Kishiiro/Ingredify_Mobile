// CustomTabs.js

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import DashboardStackNavigator from '../../navigation/DashboardStackNavigator'; 
import PantryStackNavigator from '../../navigation/PantryStackNavigator'; 
import MealPlanStackNavigator from '../../navigation/MealPlanStackNavigator'; 

import MealPlan from '../../screens/MealPlan';
import Pantry from '../../screens/Pantry';
import Community from '../../screens/Community';
import Profile from '../../screens/Profile';
import CustomDrawerContent from './CustomDrawerContent'; 

const Tab = createBottomTabNavigator();

const CustomDrawer = ({ screens }) => {
  const navigation = useNavigation();
  console.log('screens:::', screens);

  return (
    <Tab.Navigator initialRouteName="Dashboard">
      {
        screens.map(screen => {
          let Component = null;
          let options = {};

          switch (screen.component) {
            case 'Dashboard':
              // Use DashboardStackNavigator instead of Dashboard
              Component = DashboardStackNavigator;
              break;
            case 'MealPlan':
              Component = MealPlanStackNavigator;
              break;
            case 'Pantry':
              Component = PantryStackNavigator;
              break;
            case 'Community':
              Component = Community;
              break;             
            case 'Profile':
              Component = Profile;
              options = {
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Icon
                      name="gear"
                      size={30}
                      color="black"
                      style={{ marginRight: 20 }}
                    />
                  </TouchableOpacity>
                ),
              };                
              break;                               
            default:
              console.warn('Invalid screen component:', screen.component);
              Component = () => <View><Text>Error: Invalid screen component: {screen.component}</Text></View>;
          }

          if (Component) {
            return (
              <Tab.Screen 
                key={screen.name}
                name={screen.name} 
                component={Component}
                options={{
                  ...options, 
                  tabBarIcon: ({ color, size }) => (
                    <Icon 
                      name={screen.icon} 
                      color={color}
                      size={size}
                    />
                  ),
                }}
              />
            );
          }
        })
      }
    </Tab.Navigator>
  );
};

export default CustomDrawer;