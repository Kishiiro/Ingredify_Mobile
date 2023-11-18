import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecipeDetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const renderCookingInstructions = () => {
    if (typeof item.CookingInstruction === 'string') {
      const instructionsArray = item.CookingInstruction.split('\n');
      return instructionsArray.map((instruction, index) => (
        <View key={index} style={styles.instructionItem}>
          <FontAwesome name={'circle'} size={10} color={'black'} style={styles.circleIcon} />
          <Text style={styles.instructionText}>{instruction}</Text>
        </View>
      ));
    }
    return null;
  };

  const renderStarRating = (difficultyLevel) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= difficultyLevel ? 'star' : 'star-o'} // Filled or outline star based on difficulty level
          size={20}
          color="#FFD700" // Color of the stars
          style={styles.starIcon}
        />
      );
    }
    return <View style={styles.starRatingContainer}>{stars}</View>;
  };

  return (
    <View style={{ backgroundColor: item.color, flex: 1 }}>
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome name={'arrow-circle-left'} size={28} color="white" />
        </TouchableOpacity>
        <FontAwesome name={'heart-o'} size={28} color="white" />
      </SafeAreaView>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <Image source={require('../assets/images/curry.png')} style={styles.recipeImage} />
          <Text style={styles.recipeName}>{item.RecipeName}</Text>
          <Text style={styles.detailText}>{`Meal Type: ${item.MealType || 'Not Available'}`}</Text>
          <Text style={styles.detailText}>{`Description: ${item.Description || 'Not Available'}`}</Text>
          {item.CookingInstruction && (
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>Cooking Instructions:</Text>
              {renderCookingInstructions()}
            </View>
          )}
          <View style={styles.inlineContainer}>
            <Text style={styles.difficultyTitle}>Difficulty Level:</Text>
            {renderStarRating(item.DifficultyLevel)}
          </View>
          <View style={styles.staticBoxesContainer}>
            <View style={styles.horizontalContainer}>
              {item.Preparation && (
                <View style={styles.staticBox}>
                  <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>⏰</Text>
                  <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>{item.Preparation}</Text>
                </View>
              )}
              {!item.Preparation && (
                <View style={styles.staticBox}>
                  <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>⏰</Text>
                  <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>Not Available</Text>
                </View>
              )}
              {item.calories && (
                <View style={styles.staticBox}>
                  <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>🔥</Text>
                  <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>{item.calories}</Text>
                </View>
              )}
              {!item.calories && (
                <View style={styles.staticBox}>
                  <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>🔥</Text>
                  <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>Not Available</Text>
                </View>
              )}
            </View>
            {item.VideoURL && (
              <View style={styles.staticBox}>
                <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>🎥</Text>
                <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>{item.VideoURL}</Text>
              </View>
            )}
            {!item.VideoURL && (
              <View style={styles.staticBox}>
                <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>🎥</Text>
                <Text style={{ fontSize: 20, fontWeight: '400', textAlign: 'left' }}>Not Available</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 140,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  recipeImage: {
    height: 300,
    width: 300,
    position: 'absolute',
    top: -150,
  },
  recipeName: {
    marginTop: 150,
    fontSize: 28,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 20,
    marginVertical: 16,
    
  },
  instructionsContainer: {
    marginVertical: 16,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  circleIcon: {
    marginRight: 8,
    marginTop: 8,
  },
  instructionText: {
    fontSize: 20,
  },
  difficultyContainer: {
    marginVertical: 16,
  },
  difficultyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  starRatingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    marginRight: 4,
  },
  staticBoxesContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginVertical: 16,
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  staticBox: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default RecipeDetailsScreen;
