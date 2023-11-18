import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postData } from '../services/api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MealPlan = ({ route }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [recipeData, setRecipeData] = useState([]);
  const [noMealPlan, setNoMealPlan] = useState(false);
  const [showViewMealPlanButton, setShowViewMealPlanButton] = useState(false);

  const meals = [
    {
      type: 'Breakfast',
      image: require('../assets/images/curry.png'),
    },
    {
      type: 'Lunch',
      image: require('../assets/images/chicken.png'),
    },
    {
      type: 'Dinner',
      image: require('../assets/images/ramen-org.png'),
    },
  ];

  const formatDate = (date) => {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toDateString();
  };

  const navigation = useNavigation();

  const fetchRecipeDetails = async (recipe) => {
    try {
      const response = await postData('/dashboard', { RecipeName: recipe.RecipeName });

      if (response.status === 200) {
        navigation.navigate('RecipeDetailsScreen', { item: response.data.data[0] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch meal plan data when the screen is focused
      const fetchData = async () => {
        try {
          const response = await postData('/mealplan', { Date: selectedDate });

          if (response.status === 200) {
            await AsyncStorage.setItem(
              'RecipeData',
              JSON.stringify(response.data.data)
            );

            if (response.data.data.length > 0) {
              setRecipeData(response.data.data);
              setNoMealPlan(false);
              setShowViewMealPlanButton(true);
            } else {
              setRecipeData([]);
              setNoMealPlan(true);
              setShowViewMealPlanButton(false);
            }
          }
        } catch (error) {
          console.log(error);
          setRecipeData([]);
          setNoMealPlan(true);
          setShowViewMealPlanButton(false);
        }
      };

      if (selectedDate) {
        fetchData();
      }
    }, [selectedDate])
  );

  const ViewMealPlanButton = () => {
    return (
      <TouchableOpacity
        style={styles.viewMealPlanButton}
        onPress={() => navigation.navigate('ViewMealPlan', { recipeData })}
      >
        <Text style={styles.viewMealPlanButtonText}>View Meal Plan</Text>
      </TouchableOpacity>
    );
  };

  const AddMealPlanButton = () => {
    return (
      <TouchableOpacity
        style={styles.addMealPlanButton}
        onPress={() => navigation.navigate('ViewMealPlan', { recipeData , selectedDate })}
      >
        <Text style={styles.addMealPlanButtonText}>Add Meal Plan</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-left" size={20} />
        <Text style={styles.headerTitle}>Meal Plan</Text>
        <Icon name="ellipsis-v" size={20} />
      </View>

      <View style={styles.dateSelector}>
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
      </View>

      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
      />

      <ScrollView contentContainerStyle={styles.mealContainer}>
        {meals.map((meal) => (
          <Pressable
            key={meal.type}
            style={styles.mealEntry}
            onPress={() => {
              navigation.navigate('SearchMealScreen', {
                mealType: meal.type,
                selectedDate,
              });
            }}
          >
            {meal.image && (
              <Image source={meal.image} style={styles.mealImage} />
            )}
            <Text style={styles.mealType}>
              {meal.type}
              {recipeData.some((item) => item.MealType === meal.type) ? (
                ` - ${recipeData.find((item) => item.MealType === meal.type).RecipeName}`
              ) : (
                ' - No Meal'
              )}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {showViewMealPlanButton ? (
        <ViewMealPlanButton />
      ) : (
        <AddMealPlanButton />
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  dateText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  mealContainer: {
    alignItems: 'center',
  },
  mealEntry: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  mealImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  mealType: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewMealPlanButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    margin: 16,
  },
  viewMealPlanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addMealPlanButton: {
    backgroundColor: '#3F51B5',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    margin: 16,
  },
  addMealPlanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MealPlan;
