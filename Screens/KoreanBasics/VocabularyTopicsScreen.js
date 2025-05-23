import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import headerStyles from '../../Styles/HeaderStyles';

// Đa ngôn ngữ
const translations = {
  vn: {
    title: 'Chủ Đề Từ Vựng',
    topics: [
      { id: '1', title: 'Gia đình', description: 'Từ vựng về các thành viên trong gia đình', icon: '👪' },
      { id: '2', title: 'Số đếm', description: 'Số đếm cơ bản trong tiếng Hàn', icon: '🔢' },
      { id: '3', title: 'Màu sắc', description: 'Các màu sắc cơ bản', icon: '🎨' },
      { id: '4', title: 'Thức ăn', description: 'Từ vựng về món ăn và đồ uống', icon: '🍲' },
      { id: '5', title: 'Quần áo', description: 'Từ vựng về quần áo và thời trang', icon: '👕' },
    ],
  },
  en: {
    title: 'Vocabulary Topics',
    topics: [
      { id: '1', title: 'Family', description: 'Vocabulary about family members', icon: '👪' },
      { id: '2', title: 'Numbers', description: 'Basic numbers in Korean', icon: '🔢' },
      { id: '3', title: 'Colors', description: 'Basic colors', icon: '🎨' },
      { id: '4', title: 'Food', description: 'Food and drink vocabulary', icon: '🍲' },
      { id: '5', title: 'Clothes', description: 'Vocabulary about clothes and fashion', icon: '👕' },
    ],
  }
};

const VocabularyTopicsScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f8f9fa',
    },
    topicCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderWidth: 1.5,
      borderColor: isDarkMode ? '#444' : '#e3e7fd',
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    topicIcon: {
      fontSize: 24,
    },
    topicTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFD700' : '#333',
      marginBottom: 4,
    },
    topicDescription: {
      fontSize: 14,
      color: isDarkMode ? '#ccc' : '#666',
    },
    textContainer: {
      flex: 1,
    },
    listContainer: {
      padding: 16,
    },
  };

  return (
    <View style={dynamicStyles.container}>
      <View style={headerStyles.container}>
        <TouchableOpacity
          style={headerStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color={isDarkMode ? "#FFD700" : "#4b46f1"} />
        </TouchableOpacity>
        <Text style={[headerStyles.title, { color: isDarkMode ? "#FFD700" : "#4b46f1" }]}>{t.title}</Text>
      </View>

      <FlatList
        data={t.topics}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={dynamicStyles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={dynamicStyles.topicCard}
            onPress={() => navigation.navigate('VocabularyDetailScreen', { topic: item })}
          >
            <View style={dynamicStyles.iconContainer}>
              <Text style={dynamicStyles.topicIcon}>{item.icon}</Text>
            </View>
            <View style={dynamicStyles.textContainer}>
              <Text style={dynamicStyles.topicTitle}>{item.title}</Text>
              <Text style={dynamicStyles.topicDescription}>{item.description}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color={isDarkMode ? "#FFD700" : "#4b46f1"} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default VocabularyTopicsScreen;
