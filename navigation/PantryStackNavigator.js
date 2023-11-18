import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Pantry from '../screens/Pantry';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import Results from '../screens/Results';
import CreateRecipe from '../screens/CreateRecipe';

const Stack = createStackNavigator();

const PantryStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Pantry">
      <Stack.Screen name="PantryHome" component={Pantry} options={{ headerShown: false }} />
      <Stack.Screen name="Results" component={Results} options={{ headerShown: false }} />
      <Stack.Screen name="RecipeDetailsScreen" component={RecipeDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateRecipe" component={CreateRecipe} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default PantryStackNavigator;
