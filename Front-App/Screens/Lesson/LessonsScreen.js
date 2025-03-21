// File: /screens/Lessons/LessonsScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';

const lessons = [
  { id: '1', title: 'Bài 1: Bảng chữ cái tiếng Hàn', progress: 0 },
  { id: '2', title: 'Bài 2: Ngữ pháp cơ bản', progress: 50 },
  { id: '3', title: 'Bài 3: Hội thoại hàng ngày', progress: 75 },
  { id: '4', title: 'Bài 4: Từ vựng thông dụng', progress: 100 },
];

const LessonsScreen = ({ navigation }) => {
  const renderLessonCard = ({ item }) => {
    return (
      <View style={styles.lessonCard}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.progressText}>
          Hoàn thành: {item.progress}%
        </Text>
        <TouchableOpacity
          style={styles.learnButton}
          onPress={() => navigation.navigate('LessonDetail', { lessonId: item.id })}
        >
          <Text style={styles.learnButtonText}>Vào học</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách bài học</Text>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLessonCard}
        numColumns={2} // Hiển thị 2 thẻ mỗi hàng
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b46f1',
    marginBottom: 16,
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  lessonCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 12,
  },
  learnButton: {
    backgroundColor: '#4b46f1',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  learnButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LessonsScreen;
