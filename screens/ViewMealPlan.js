import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ViewMealPlan = ({ route }) => {
  const { recipeData, selectedDate } = route.params;
  const navigation = useNavigation();

  const navigateToSearchMeal = (mealType) => {
    navigation.navigate('SearchMealScreen', { mealType, selectedDate });
  };

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  // Update the screen width when the window dimensions change
  const handleOrientationChange = () => {
    setScreenWidth(Dimensions.get('window').width);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      // Remove the event listener when the component unmounts
      Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  const isPortrait = screenWidth < 600; // Adjust this threshold as needed for your layout

  // Filter the recipe data into Breakfast, Lunch, and Dinner sections
  const breakfastRecipes = recipeData ? recipeData.filter((recipe) => recipe.MealType === 'Breakfast') : [];
  const lunchRecipes = recipeData ? recipeData.filter((recipe) => recipe.MealType === 'Lunch') : [];
  const dinnerRecipes = recipeData ? recipeData.filter((recipe) => recipe.MealType === 'Dinner') : [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Meal Plan</Text>

      <ScrollView contentContainerStyle={styles.recipeContainer}>
        <Text style={styles.sectionHeading}>
          Breakfast
          <TouchableOpacity onPress={() => navigateToSearchMeal('Breakfast')}>
            <Text style={styles.addButton}>View Meal Plan</Text>
          </TouchableOpacity>
        </Text>
        {breakfastRecipes.map((recipe) => (
          <View key={recipe.RecipeID} style={isPortrait ? styles.recipeItem : styles.landscapeRecipeItem}>
            <Text style={styles.recipeName}>{recipe.RecipeName}</Text>
          </View>
        ))}

        <Text style={styles.sectionHeading}>
          Lunch
          <TouchableOpacity onPress={() => navigateToSearchMeal('Lunch')}>
            <Text style={styles.addButton}>View Meal Plan</Text>
          </TouchableOpacity>
        </Text>
        {lunchRecipes.map((recipe) => (
          <View key={recipe.RecipeID} style={isPortrait ? styles.recipeItem : styles.landscapeRecipeItem}>
            <Text style={styles.recipeName}>{recipe.RecipeName}</Text>
          </View>
        ))}

        <Text style={styles.sectionHeading}>
          Dinner
          <TouchableOpacity onPress={() => navigateToSearchMeal('Dinner')}>
            <Text style={styles.addButton}>View Meal Plan</Text>
          </TouchableOpacity>
        </Text>

        {dinnerRecipes.map((recipe) => (
          <View key={recipe.RecipeID} style={isPortrait ? styles.recipeItem : styles.landscapeRecipeItem}>
            <Text style={styles.recipeName}>{recipe.RecipeName}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7f7e9',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recipeContainer: {
    alignItems: 'center',
  },
  recipeItem: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  landscapeRecipeItem: {
    width: '45%', // Adjust the width for landscape mode
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    marginRight: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  addButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default ViewMealPlan;
