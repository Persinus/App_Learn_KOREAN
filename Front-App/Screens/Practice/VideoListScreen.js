import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';

// Dữ liệu video
const movieVideos = [
  { id: '1', title: 'Phim 1', question: 'What do you think about this movie?', youtubeId: 'dTDzDxv-YDo', thumbnail: 'https://img.youtube.com/vi/dTDzDxv-YDo/0.jpg' },
  { id: '2', title: 'Phim 2', question: 'How can this concept be applied in movies?', youtubeId: 'HLk38k25EhU', thumbnail: 'https://img.youtube.com/vi/HLk38k25EhU/0.jpg' },
];

const musicVideos = [
  { id: '3', title: 'SAY MY NAME', question: '2nd EP title song "ShaLala" OUT NOW', youtubeId: 'rPEfIvfmCxM', thumbnail: 'https://img.youtube.com/vi/rPEfIvfmCxM/0.jpg' },
  { 
    id: '4', 
    title: "Can't Stop Shining MV", 
    question: 'Xem Bài Hát và trả lời câu hỏi bên dưới ', 
    youtubeId: 'JOiri4g1MnE', 
    thumbnail: 'https://img.youtube.com/vi/JOiri4g1MnE/0.jpg',
    jsonSub: require('../../assets/BaiHat2VietSub.json'), // 🟢 Đường dẫn JSON phụ đề tiếng Việt
    jsonOrigin: require('../../assets/BaiHat2Origin.json'), // 🔵 Đường dẫn JSON phụ đề tiếng Hàn
  },
];

const VideoList = ({ videos, navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0099FF' : '#f8f9fa',
    },
    card: {
      backgroundColor: isDarkMode ? '#444' : '#fff',
    },
    title: {
      color: isDarkMode ? '#fff' : '#333',
    },
    question: {
      color: isDarkMode ? '#ccc' : '#666',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {videos.map((video) => (
        <TouchableOpacity
          key={video.id}
          style={[styles.card, dynamicStyles.card]}
          onPress={() => navigation.navigate('VideoDetailScreen', {
            youtubeId: video.youtubeId,
            title: video.title,
            question: video.question,
            jsonSub: video.jsonSub, // 🟢 Truyền JSON phụ đề tiếng Việt
            jsonOrigin: video.jsonOrigin, // 🔵 Truyền JSON phụ đề tiếng Hàn
          })}
        >
          <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
          <View style={styles.cardContent}>
            <Text style={[styles.title, dynamicStyles.title]}>{video.title}</Text>
            <Text style={[styles.question, dynamicStyles.question]}>{video.question}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const VideoListScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    tabBarStyle: {
      backgroundColor: isDarkMode ? '#444' : '#4b46f1',
    },
    tabBarActiveTintColor: isDarkMode ? '#FFD700' : '#fff',
    tabBarInactiveTintColor: isDarkMode ? '#ccc' : '#ccc',
    tabBarIndicatorStyle: {
      backgroundColor: isDarkMode ? '#FFD700' : '#fff',
    },
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: dynamicStyles.tabBarStyle,
        tabBarActiveTintColor: dynamicStyles.tabBarActiveTintColor,
        tabBarInactiveTintColor: dynamicStyles.tabBarInactiveTintColor,
        tabBarIndicatorStyle: dynamicStyles.tabBarIndicatorStyle,
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
  container: { flex: 1, padding: 16 },
  card: { flexDirection: 'row', borderRadius: 10, marginBottom: 15, overflow: 'hidden', elevation: 4 },
  thumbnail: { width: 120, height: 80 },
  cardContent: { flex: 1, padding: 10, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  question: { fontSize: 14 },
});

export default VideoListScreen;
