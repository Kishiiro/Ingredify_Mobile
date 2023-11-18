import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { postData } from '../services/api'; 
import { categories, colors } from "../components/common/Constant";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Searchbar } from 'react-native-paper';

const Dashboard = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [recipeData, setRecipeData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].category);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [pressedCategory, setPressedCategory] = useState(null);

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
            DifficultyLevel: item.DifficultyLevel,
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

  useEffect(() => {
    const DisplayRecipes = async () => {
      try {
        const response = await postData('/dashboard');

        if (response.status === 200) {
          await AsyncStorage.setItem(
            'RecipeName',
            JSON.stringify(response.data.data.map((item) => item.RecipeName))
          );
          await AsyncStorage.setItem('MealType', response.data.data[0].MealType);
          await AsyncStorage.setItem('Description', response.data.data[0].Description);
          await AsyncStorage.setItem('CookingInstruction', response.data.data[0].CookingInstruction);
  
          setRecipeData(response.data.data);
          setSelectedCategory(response.data.data[0].MealType);
        }
      } catch (error) {
        console.log(error);
      }
  
      fetchUserInfo();
    };
  
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
  
    DisplayRecipes();
  }, []);

  const filterRecipesByCategory = (category) => {
    // Filter the recipes based on the selected category
    const filtered = recipeData.filter((item) => item.MealType === category);
    setFilteredRecipes(filtered);

    // Update the selected category and pressedCategory
    setSelectedCategory(category);
    setPressedCategory(category);
  };

  // Function to filter recipes based on search query
  const filterRecipes = (recipes, query) => {
    return recipes.filter(
      (recipe) =>
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
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {userInfo ? 'Hi, ' + userInfo.ProfileFirstName : ''}
        </Text>
        <FontAwesome name="bell-o" size={24} style={styles.headerIcon} />
      </View>

      <Searchbar
        placeholder="Search for recipes"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        style={styles.searchbar}
      />

      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScrollView}
        >
          {categories.map((category, index) => (
            <Pressable
              key={index}
              style={[
                styles.categoryItem,
                {
                  backgroundColor:
                    pressedCategory === category.category
                      ? colors.COLOR_PRIMARY
                      : colors.COLOR_LIGHT,
                },
              ]}
              onPress={() => filterRecipesByCategory(category.category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      pressedCategory === category.category
                        ? colors.COLOR_LIGHT
                        : 'black',
                  },
                ]}
              >
                {category.category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

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
    marginLeft: 8,
    alignItems: "center",
    paddingHorizontal: 20,
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
    maxWidth: 120, 
    textAlign: 'center', 
  },
  searchbar: {
    marginVertical: 16,
    borderRadius: 30,
  },
});

export default Dashboard;
