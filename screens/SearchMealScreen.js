import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image, FlatList } from 'react-native';
import { postData } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Searchbar, Button } from 'react-native-paper';

const SearchMealScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipeData, setRecipeData] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedMealType] = useState(route.params.mealType);
  const { selectedDate } = route.params;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await postData('/dashboard'); // Replace with your API endpoint
        if (response.status === 200) {
          setRecipeData(response.data.data || []); // Ensure that data is an array
        } else {
          console.log('Failed to fetch recipes');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
  }, []);

  const handleAddMeal = async () => {
    if (selectedRecipe && selectedMealType && selectedDate) {
      try {
        // Make a POST request to add meal to meal plan
        const response = await postData('/mealplan/add', {
          RecipeID: selectedRecipe.RecipeID,
          MealType: selectedMealType,
          Date: selectedDate,
        });

        if (response.status === 200) {
          // Successfully added meal to meal plan
          // You can handle any further actions here, such as navigation

          // Pass the refreshed data to ViewMealPlan
          navigation.navigate('ViewMealPlan', { selectedDate });
        } else {
          // Handle error response
          console.log('Failed to add meal to meal plan');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderRecipeItem = ({ item }) => (
    <Pressable
      onPress={() => setSelectedRecipe(item)}
      style={[
        styles.recipeItem,
        selectedRecipe === item ? styles.selectedRecipe : null,
      ]}
    >
      <Image
        source={require('../assets/images/curry.png')}
        style={styles.recipeImage}
      />
      <Text style={styles.recipeName}>{item.RecipeName}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Search Meals</Text>
      </View>

      <Searchbar
        placeholder={`Search for ${selectedMealType} recipes`}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={recipeData}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.RecipeID.toString()}
        numColumns={2}
        contentContainerStyle={styles.recipeContainer}
      />

      {selectedRecipe && (
        <Button
          mode="contained"
          onPress={handleAddMeal}
          style={styles.addButton}
        >
          Add Meal
        </Button>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  recipeContainer: {
    marginTop: 22,
  },
  recipeItem: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 16,
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingVertical: 26,
  },
  selectedRecipe: {
    backgroundColor: '#00f', // Change to your desired color for selected recipes
  },
  recipeImage: {
    width: 150,
    height: 150,
    resizeMode: 'center',
  },
  recipeName: {
    fontSize: 18,
    marginTop: 8,
  },
  searchbar: {
    marginVertical: 16,
    borderRadius: 30,
  },
  addButton: {
    marginTop: 16,
  },
});

export default SearchMealScreen;
