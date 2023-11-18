import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const sampleIngredients = [
  { id: 1, name: 'Apple', image: 'https://example.com/apple.jpg', measurement: 'pcs' },
  { id: 2, name: 'Banana', image: 'https://example.com/banana.jpg', measurement: 'pcs' },
  { id: 3, name: 'Orange', image: 'https://example.com/orange.jpg', measurement: 'pcs' },
  { id: 4, name: 'Mango', image: 'https://example.com/mango.jpg', measurement: 'pcs' },
  // Add more sample ingredients as needed
];

const Pantry = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation(); // Access the navigation prop

  const onChangeSearch = (query) => {
    setSearchQuery(query);

    // Implement your search logic here
    const filteredIngredients = sampleIngredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredIngredients);
  };

  const addIngredientToSelected = (ingredient) => {
    if (!selectedIngredients.some((selected) => selected.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, { ...ingredient, quantity: 1 }]);
    }
    setSearchQuery('');
  };

  const increaseIngredientQuantity = (index) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients[index].quantity += 1;
    setSelectedIngredients(updatedIngredients);
  };

  const decreaseIngredientQuantity = (index) => {
    const updatedIngredients = [...selectedIngredients];
    if (updatedIngredients[index].quantity > 1) {
      updatedIngredients[index].quantity -= 1;
      setSelectedIngredients(updatedIngredients);
    } else {
      // If quantity becomes one or zero, remove the ingredient
      updatedIngredients.splice(index, 1);
      setSelectedIngredients(updatedIngredients);
    }
  };

  const findRecipes = async () => {
    // Get the IDs of selected ingredients as a comma-separated string
    const selectedIngredientIds = selectedIngredients.map((ingredient) => ingredient.id).join(',');

    // Navigate to the "Results" screen and pass the selected ingredient IDs as a string
    navigation.navigate('Results', { selectedIngredientIds });
  };
  const CreateRecipe = () => {
    // Pass the selected ingredients to the CreateRecipe screen as a parameter
    navigation.navigate('CreateRecipe', { selectedIngredients });
  };
  console.log(selectedIngredients)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="#000" />
        <Text style={styles.headerTitle}>SmartPantry</Text>
      </View>

      <Searchbar
        placeholder="Search for ingredients"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />

      <ScrollView>
        {selectedIngredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Image source={{ uri: ingredient.image }} style={styles.ingredientImage} />
            <Text style={styles.ingredientName}>
              {ingredient.name} ({ingredient.quantity} {ingredient.measurement})
            </Text>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => decreaseIngredientQuantity(index)}>
                <Icon name="remove" size={24} color="#000" />
              </TouchableOpacity>
              <Text>{ingredient.quantity}</Text>
              <TouchableOpacity onPress={() => increaseIngredientQuantity(index)}>
                <Icon name="add" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {searchResults.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {searchResults.map((ingredient, index) => (
              <TouchableOpacity
                key={index}
                style={styles.searchResultItem}
                onPress={() => addIngredientToSelected(ingredient)}
              >
                <Image source={{ uri: ingredient.image }} style={styles.ingredientImage} />
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={findRecipes}>
        <Text style={styles.buttonText}>Find Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={CreateRecipe}>
        <Text style={styles.buttonText}>Create Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7f7e9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  searchbar: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
  },
  ingredientImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  ingredientName: {
    flex: 1,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    margin: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
  },
});

export default Pantry;
