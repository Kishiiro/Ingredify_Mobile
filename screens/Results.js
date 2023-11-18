import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Pressable, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postData } from '../services/api';
import { Searchbar } from 'react-native-paper';
import { categories, colors } from "../components/common/Constant";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from '@expo/vector-icons/FontAwesome';


const Results = ({ route }) => {
  const { selectedIngredientIds } = route.params;
  const [recipeData, setRecipeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigation = useNavigation();
  

  
  const renderRecipeItem = ({ item }) => (
    <Pressable
      onPress={() =>
        navigation.navigate('RecipeDetailsScreen', {
          item: {
            RecipeName: item.RecipeName,
            MealType: item.MealType,
            Description: item.Description,
            CookingInstruction: item.CookingInstruction,
            Preparation: item.Preparation,
            ingredients: item.ingredients,
            steps: item.steps,
          },
        })
      }
      style={styles.recipeItem}
    >
      <Image
        source={require('../assets/images/curry.png')}
        style={styles.recipeImage}
      />
      <Text style={styles.recipeName}>{item.RecipeName}</Text>
    </Pressable>
  );
  const data = {
    IngredientsID: selectedIngredientIds
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postData('/pantry/ingredients', data);

        if (response.status === 200) {
          // Handle the response data here
          setRecipeData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedIngredientIds]);

  // Function to filter recipes based on search query
  const filterRecipes = (recipes, query) => {
    if (!recipes) {
      return [];
    }
  
    return recipes.filter(
      (recipe) =>
        recipe.RecipeName &&
        recipe.RecipeName.toLowerCase().includes(query.toLowerCase())
    );
  };
  

  // Update the filtered recipes based on the search query
  useEffect(() => {
    const filtered = filterRecipes(recipeData, searchQuery);
    setFilteredRecipes(filtered);
  }, [searchQuery, recipeData]);


  

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      <Searchbar
        placeholder="Search for recipes"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        style={styles.searchbar}
      />

      <View style={styles.recipeContainer}>
        <Text style={styles.recipeTitle}>Recipes</Text>
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.RecipeName}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
      },
      headerText: {
        fontSize: 22,
        fontWeight: "700",
        color: '#333',
      },
      headerIcon: {
        color: '#f96163',
      },
      categoriesContainer: {
        marginTop: 22,
      },
      categoriesTitle: {
        fontSize: 22,
        fontWeight: "bold",
      },
      categoriesScrollView: {
        marginTop: 16,
      },
      categoryItem: {
        marginRight: 36,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
        marginBottom: 16,
      },
      categoryText: {
        fontSize: 18,
      },
      recipeContainer: {
        marginTop: 22,
        flex: 1,
      },
      recipeTitle: {
        fontSize: 22,
        fontWeight: "bold",
      },
      recipeItem: {
        backgroundColor: colors.COLOR_LIGHT,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 7,
        borderRadius: 16,
        marginVertical: 16,
        alignItems: "center",
        paddingHorizontal: 35,
        paddingVertical: 26,
      },
      recipeImage: {
        width: 150,
        height: 150,
        resizeMode: "center",
      },
      recipeName: {
        fontSize: 18,
        marginTop: 8,
      },
      searchbar: {
        marginVertical: 16,
        borderRadius: 30,
      },
  // Make sure to update any references to specific colors, fonts, or images
});

export default Results;
