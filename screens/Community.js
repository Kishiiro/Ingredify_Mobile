import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const posts = [
    {
      id: '1',
      title: 'Biko with Peanuts',
      username: 'By Ison',
      likes: '2.1K',
      image: require('../assets/images/curry.png'), // Replace with your local image
      isRecommended: true,
    },
    {
      id: '2',
      title: 'Bikol Express',
      username: 'By User',
      likes: '3.4K',
      image: require('../assets/images/chicken.png'), // Replace with your local image
      isRecommended: false,
    },
    // ... more posts
  ];

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <TouchableOpacity>
          <Icon name="times" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <Image source={item.image} style={styles.postImage} />
      <View style={styles.postFooter}>
        <Text style={styles.postUser}>{item.username}</Text>
        <Text style={styles.postLikes}>{item.likes}</Text>
      </View>
      {item.isRecommended && (
        <Text style={styles.recommendedText}>Recommended for life style!!</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
        <Icon name="search" size={20} style={styles.searchIcon} />
      </View>
      <Text style={styles.sharePrompt}>Want to share your recipe? Post it here!</Text>
      <Text style={styles.sectionHeader}>Top Meals</Text>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7f7e9',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    padding: 8,
    fontSize: 18,
  },
  searchIcon: {
    padding: 5,
  },
  sharePrompt: {
    marginHorizontal: 10,
    marginBottom: 5,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  postContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  postUser: {
    fontStyle: 'italic',
  },
  postLikes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendedText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default Community;
