import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Data for videos
const movieVideos = [
  {
    id: '1',
    title: 'Phim 1',
    question: 'What do you think about this movie?',
    youtubeId: 'dTDzDxv-YDo',
    thumbnail: 'https://img.youtube.com/vi/dTDzDxv-YDo/0.jpg',
  },
  {
    id: '2',
    title: 'Phim 2',
    question: 'How can this concept be applied in movies?',
    youtubeId: 'HLk38k25EhU',
    thumbnail: 'https://img.youtube.com/vi/HLk38k25EhU/0.jpg',
  },
];

const musicVideos = [
  {
    id: '3',
    title: 'SAY MY NAME',
    question: '2nd EP title song "ShaLala" OUT NOW',
    youtubeId: 'rPEfIvfmCxM',
    thumbnail: 'https://img.youtube.com/vi/rPEfIvfmCxM/0.jpg',
  },
  {
    id: '4',
    title: 'Can\'t Stop Shining MV',
    question: 'TEMPEST (템페스트) - Can’t Stop Shining MV',
    youtubeId: 'JOiri4g1MnE',
    thumbnail: 'https://img.youtube.com/vi/JOiri4g1MnE/0.jpg',
  },
  {
    id: '5',
    title: 'Blue',
    question: 'How does this music inspire you?',
    youtubeId: '2hwiRN8t8Ok',
    thumbnail: 'https://img.youtube.com/vi/2hwiRN8t8Ok/0.jpg',
  },
];

const VideoList = ({ videos, navigation }) => (
  <View style={styles.container}>
    {videos.map((video) => (
      <TouchableOpacity
        key={video.id}
        style={styles.card}
        onPress={() =>
          navigation.navigate('VideoDetailScreen', {
            youtubeId: video.youtubeId,
            title: video.title,
            question: video.question,
          })
        }
      >
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.question}>{video.question}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const Tab = createMaterialTopTabNavigator();

const VideoListScreen = ({ navigation }) => {
  return (
   
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#4b46f1' },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#ccc',
          tabBarIndicatorStyle: { backgroundColor: '#fff' },
        }}
      >
        <Tab.Screen name="Phim">
          {() => <VideoList videos={movieVideos} navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen name="Nhạc">
          {() => <VideoList videos={musicVideos} navigation={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  thumbnail: {
    width: 120,
    height: 80,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  question: {
    fontSize: 14,
    color: '#666',
  },
});

export default VideoListScreen;
