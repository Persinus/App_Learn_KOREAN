import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import headerStyles from '../../Styles/HeaderStyles';
import vocabularyData from '../../data/vocabularyData';

const VocabularyDetailScreen = ({ route, navigation }) => {
  const { topic } = route.params;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState(null);
  
  // Lấy danh sách từ vựng dựa trên chủ đề
  const getVocabularyByTopic = (topicId) => {
    return vocabularyData[topicId] || [];
  };
  
  const vocabulary = getVocabularyByTopic(topic.id);

  const speakWord = (word, id) => {
    if (isSpeaking) return;
    
    setIsSpeaking(true);
    setCurrentSpeakingId(id);
    
    Speech.speak(word, {
      language: 'ko',
      pitch: 1.0,
      rate: 0.9,
      onDone: () => {
        setIsSpeaking(false);
        setCurrentSpeakingId(null);
      },
      onError: () => {
        setIsSpeaking(false);
        setCurrentSpeakingId(null);
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.wordCard}>
      <View style={styles.wordInfo}>
        <Text style={styles.korean}>{item.korean}</Text>
        <Text style={styles.romanization}>{item.romanization}</Text>
        <Text style={styles.vietnamese}>{item.vietnamese}</Text>
      </View>
      <TouchableOpacity 
        style={styles.speakButton}
        onPress={() => speakWord(item.korean, item.id)}
        disabled={isSpeaking}
      >
        {isSpeaking && currentSpeakingId === item.id ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <FontAwesome5 name="volume-up" size={16} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={headerStyles.container}>
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#4b46f1" />
        </TouchableOpacity>
        <Text style={headerStyles.title}>{topic.title}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          {vocabulary.length} từ vựng về {topic.title.toLowerCase()}. Nhấn vào biểu tượng loa để nghe phát âm.
        </Text>

        <FlatList
          data={vocabulary}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 24,
  },
  wordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  wordInfo: {
    flex: 1,
  },
  korean: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  romanization: {
    fontSize: 16,
    color: '#4b46f1',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  vietnamese: {
    fontSize: 16,
    color: '#666',
  },
  speakButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4b46f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});

export default VocabularyDetailScreen;
