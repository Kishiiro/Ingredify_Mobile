import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import SearchMealScreen from '../screens/SearchMealScreen';

const Stack = createStackNavigator();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="DashboardHome" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="RecipeDetailsScreen" component={RecipeDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SearchMealScreen" component={SearchMealScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
