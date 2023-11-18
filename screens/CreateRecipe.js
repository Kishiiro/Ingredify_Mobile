import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet } from 'react-native';
import { postData } from '../services/api';


const CreateRecipe = ({ route }) => {
  // Extract selected ingredients from route parameters
  const { selectedIngredients } = route.params;

  const [recipeName, setRecipeName] = useState('');
  const [mealType, setMealType] = useState('');
  const [cookingInstruction, setCookingInstruction] = useState('');
  const [description, setDescription] = useState('');
  const [restrictionsId, setRestrictionsId] = useState('');
  const [preparation, setPreparation] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [recipeImage, setRecipeImage] = useState(null); // Store the image as a file or URL

  // Function to handle image selection
  const handleImageSelection = () => {
    // Implement image selection logic here
  };

  // Function to handle recipe submission
  const handleSubmit = async () => {
    try {

      const selectedIngredientsData = selectedIngredients.map((ingredient) => ({
        id: ingredient.id,
        quantity: ingredient.quantity,
        measurement: ingredient.measurement,
      }));
      // Create an object to hold the recipe data
      const recipeData = {
        RecipeName: recipeName,
        CookingInstruction: cookingInstruction,
        Description: description,
        RestrictionsID: restrictionsId,
        Preparation: preparation,
        DifficultyLevel: difficultyLevel,
        MealType: mealType,
        VidioUrl: videoUrl,
        RecipeImage: recipeImage,
        Detail: selectedIngredientsData, // Pass the selected ingredients as Detail
      };

      // Send a POST request to /pantry/create with the recipe data
      const response = await postData('/pantry/create', recipeData);
      console.log(recipeData)
      if (response.status === 200) {
        // Successfully created the recipe
        // You can handle any further actions here, such as navigation

        // Navigate back to the previous screen (if needed)
        navigation.goBack();
      } else {
        // Handle error response
        console.log('Failed to create recipe');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Recipe</Text>

      <View style={styles.imageContainer}>
        {recipeImage ? (
          <Image source={{ uri: recipeImage }} style={styles.recipeImage} />
        ) : (
          <Button title="Select Recipe Image" onPress={handleImageSelection} />
        )}
      </View>

      <TextInput
        placeholder="Recipe Name"
        style={styles.input}
        value={recipeName}
        onChangeText={setRecipeName}
      />

      <TextInput
        placeholder="Meal Type"
        style={styles.input}
        value={mealType}
        onChangeText={setMealType}
      />

      {/* Display selected ingredients */}
      <Text style={styles.heading}>Selected Ingredients</Text>
      <View>
        {selectedIngredients.map((ingredient, index) => (
          <View key={index} style={styles.selectedIngredient}>
            <View style={styles.ingredientContainer}>
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
              <Text style={styles.ingredientQuantity}>{ingredient.quantity} {ingredient.measurements}</Text>
            </View>
          </View>
        ))}
      </View>

      <TextInput
        placeholder="Cooking Instruction"
        style={styles.input}
        value={cookingInstruction}
        onChangeText={setCookingInstruction}
        multiline
      />

      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        placeholder="Restrictions ID"
        style={styles.input}
        value={restrictionsId}
        onChangeText={setRestrictionsId}
      />

      <TextInput
        placeholder="Preparation"
        style={styles.input}
        value={preparation}
        onChangeText={setPreparation}
        multiline
      />

      <TextInput
        placeholder="Difficulty Level"
        style={styles.input}
        value={difficultyLevel}
        onChangeText={setDifficultyLevel}
      />

      <TextInput
        placeholder="Video URL"
        style={styles.input}
        value={videoUrl}
        onChangeText={setVideoUrl}
      />
    {/* Create Recipe button */}
    <Button title="Create Recipe" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  selectedIngredient: {
    backgroundColor: '#4CAF50', // Green background color
    padding: 10,
    marginBottom: 8,
    borderRadius: 4,
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientName: {
    fontSize: 16,
    color: '#fff', // White text color
  },
  ingredientQuantity: {
    fontSize: 16,
    color: '#fff', // White text color
  },
  recipeImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
  },
});

export default CreateRecipe;
