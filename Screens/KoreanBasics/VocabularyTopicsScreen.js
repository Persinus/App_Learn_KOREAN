import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import headerStyles from '../../Styles/HeaderStyles';

const topics = [
  {
    id: '1',
    title: 'Gia đình',
    description: 'Từ vựng về các thành viên trong gia đình',
    icon: '👪',
    image: require('../../assets/illustration1.jpg')
  },
  {
    id: '2',
    title: 'Số đếm',
    description: 'Số đếm cơ bản trong tiếng Hàn',
    icon: '🔢',
    image: require('../../assets/illustration2.jpg')
  },
  {
    id: '3',
    title: 'Màu sắc',
    description: 'Các màu sắc cơ bản',
    icon: '🎨',
    image: require('../../assets/illustration1.jpg')
  },
  {
    id: '4',
    title: 'Thức ăn',
    description: 'Từ vựng về món ăn và đồ uống',
    icon: '🍲',
    image: require('../../assets/illustration2.jpg')
  },
  {
    id: '5',
    title: 'Quần áo',
    description: 'Từ vựng về quần áo và thời trang',
    icon: '👕',
    image: require('../../assets/illustration1.jpg')
  }
];

const VocabularyTopicsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={headerStyles.container}>
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#4b46f1" />
        </TouchableOpacity>
        <Text style={headerStyles.title}>Chủ Đề Từ Vựng</Text>
      </View>

      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.topicCard}
            onPress={() => navigation.navigate('VocabularyDetailScreen', { topic: item })}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.topicIcon}>{item.icon}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.topicTitle}>{item.title}</Text>
              <Text style={styles.topicDescription}>{item.description}</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#4b46f1" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    padding: 16,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  topicIcon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default VocabularyTopicsScreen;
