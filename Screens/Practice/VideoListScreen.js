import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';

// Dữ liệu video
const movieVideos = [
  { 
    id: '1', 
    title: { vn: 'Phim 1', en: 'Movie 1' }, 
    question: { vn: 'Bạn nghĩ gì về bộ phim này?', en: 'What do you think about this movie?' }, 
    youtubeId: '', 
    thumbnail: '' 
  },
  { 
    id: '2', 
    title: { vn: 'Phim 2', en: 'Movie 2' }, 
    question: { vn: 'Khái niệm này có thể áp dụng vào phim như thế nào?', en: 'How can this concept be applied in movies?' }, 
    youtubeId: '', 
    thumbnail: '' 
  },
];

const musicVideos = [
  { 
    id: '3', 
    title: { vn: 'SAY MY NAME', en: 'SAY MY NAME' }, 
    question: { vn: 'Bài hát chủ đề EP thứ 2 "ShaLala" đã phát hành', en: '2nd EP title song "ShaLala" OUT NOW' }, 
    youtubeId: 'rPEfIvfmCxM', 
    thumbnail: 'https://img.youtube.com/vi/rPEfIvfmCxM/0.jpg' 
  },
  { 
    id: '4', 
    title: { vn: "Can't stop Shining", en: "Can't Stop Shining" }, 
    question: { vn: 'Xem bài hát và trả lời câu hỏi bên dưới', en: 'Watch the song and answer the question below' }, 
    youtubeId: 'JOiri4g1MnE', 
    thumbnail: 'https://img.youtube.com/vi/JOiri4g1MnE/0.jpg',
    jsonSub: require('../../assets/BaiHat2VietSub.json'), // 🟢 Đường dẫn JSON phụ đề tiếng Việt
    jsonOrigin: require('../../assets/BaiHat2Origin.json'), // 🔵 Đường dẫn JSON phụ đề tiếng Hàn
  },
];

const VideoList = ({ videos, navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  const dynamicStyles = {
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
    },
    card: {
      flexDirection: 'row',
      borderRadius: 12,
      marginBottom: 15,
      overflow: 'hidden',
      elevation: 4,
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderWidth: 1.5,
      borderColor: isDarkMode ? '#FFD70033' : '#e3e7fd',
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      shadowOpacity: isDarkMode ? 0.08 : 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
    thumbnail: {
      width: 120,
      height: 80,
      backgroundColor: isDarkMode ? '#333' : '#e3e7fd',
    },
    cardContent: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    question: {
      fontSize: 14,
      color: isDarkMode ? '#ccc' : '#666',
    },
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
    <View style={[styles.container, dynamicStyles.container]}>
      {videos.map((video) => (
        <TouchableOpacity
          key={video.id}
          style={[styles.card, dynamicStyles.card]}
          onPress={() => navigation.navigate('VideoDetailScreen', {
            youtubeId: video.youtubeId,
            title: video.title[language],
            question: video.question[language],
            jsonSub: video.jsonSub, // 🟢 Truyền JSON phụ đề tiếng Việt
            jsonOrigin: video.jsonOrigin, // 🔵 Truyền JSON phụ đề tiếng Hàn
          })}
        >
          <Image source={{ uri: video.thumbnail }} style={dynamicStyles.thumbnail} />
          <View style={dynamicStyles.cardContent}>
            <Text style={[styles.title, dynamicStyles.title]}>{video.title[language]}</Text>
            <Text style={[styles.question, dynamicStyles.question]}>{video.question[language]}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const VideoListScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  const translations = {
    vn: { movies: 'Phim', music: 'Nhạc' },
    en: { movies: 'Movies', music: 'Music' },
  };

  const t = translations[language];

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
      <Tab.Screen name={t.movies}>
        {() => <VideoList videos={movieVideos} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name={t.music}>
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
