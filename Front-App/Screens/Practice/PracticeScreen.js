import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PracticeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Luyện tập</Text>
      <TouchableOpacity style={styles.practiceButton}>
        <Text style={styles.buttonText}>Flashcards</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.practiceButton}>
        <Text style={styles.buttonText}>Câu hỏi trắc nghiệm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.practiceButton}>
        <Text style={styles.buttonText}>Nghe hiểu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.practiceButton}
        onPress={() => navigation.navigate('VideoListScreen')} // Chuyển sang tab VideoPractice
      >
        <Text style={styles.buttonText}>Xem Video / Âm nhạc</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b46f1',
    marginBottom: 20,
  },
  practiceButton: {
    padding: 16,
    backgroundColor: '#4b46f1',
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default PracticeScreen;
