import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MealPlan from '../screens/MealPlan';
import ViewMealPlan from '../screens/ViewMealPlan';
import SearchMealScreen from '../screens/SearchMealScreen';

const Stack = createStackNavigator();

const PantryStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MealPlan">
      <Stack.Screen name="MealPlanHome" component={MealPlan} options={{ headerShown: false }} />
      <Stack.Screen name="ViewMealPlan" component={ViewMealPlan} options={{ headerShown: false }} />
      <Stack.Screen name="SearchMealScreen" component={SearchMealScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default PantryStackNavigator;
