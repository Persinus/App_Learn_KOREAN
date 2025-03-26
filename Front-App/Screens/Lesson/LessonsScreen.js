import React, { useState } from 'react';
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const lessons = [
  { id: '1', title: 'Bảng chữ cái tiếng Hàn', description: 'Học cách phát âm và viết bảng chữ cái Hangul.', progress: 0 },
  { id: '2', title: 'Ngữ pháp cơ bản', description: 'Những quy tắc ngữ pháp căn bản trong tiếng Hàn.', progress: 50 },
  { id: '3', title: 'Hội thoại hàng ngày', description: 'Những mẫu câu thường gặp trong giao tiếp hàng ngày.', progress: 75 },
  { id: '4', title: 'Từ vựng thông dụng', description: 'Học các từ vựng phổ biến trong cuộc sống.', progress: 100 },
  { id: '5', title: 'Luyện nghe', description: 'Luyện nghe qua các đoạn hội thoại thực tế.', progress: 20 },
  { id: '6', title: 'Luyện viết', description: 'Tập viết chữ Hàn đúng chuẩn.', progress: 10 },
];

// Component thanh tiến trình tùy chỉnh
const ProgressBar = ({ progress }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { width: `${progress}%` }]} />
  </View>
);

const LessonsScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('all');

  const filteredLessons = lessons.filter((lesson) => {
    if (filter === 'all') return true;
    if (filter === 'inProgress') return lesson.progress > 0 && lesson.progress < 100;
    if (filter === 'completed') return lesson.progress === 100;
    return false;
  });

  const renderLessonCard = ({ item }) => (
    <View style={styles.lessonCard}>
      <FontAwesome name="book" size={24} color="#6a0dad" style={styles.icon} />
      <Text style={styles.lessonTitle}>{item.title}</Text>
      <Text style={styles.lessonDescription}>{item.description}</Text>

      {/* Thanh tiến trình */}
      <ProgressBar progress={item.progress} />
      
      <Text style={styles.progressText}>Hoàn thành: {item.progress}%</Text>
      <TouchableOpacity
        style={styles.learnButton}
        onPress={() => navigation.navigate('LessonDetail', { lessonId: item.id })}
      >
        <Text style={styles.learnButtonText}>Vào học</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📖 Khóa học tiếng Hàn</Text>
      
      {/* Bộ lọc */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]} 
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterText}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'inProgress' && styles.activeFilter]} 
          onPress={() => setFilter('inProgress')}
        >
          <Text style={styles.filterText}>Đang học</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]} 
          onPress={() => setFilter('completed')}
        >
          <Text style={styles.filterText}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredLessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLessonCard}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#e0d3f7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: '#6a0dad',
  },
  filterText: {
    color: '#6a0dad',
    fontWeight: 'bold',
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  lessonCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f3e5f5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: {
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#6c757d',
    marginVertical: 8,
  },
  learnButton: {
    backgroundColor: '#6a0dad',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  learnButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0d3f7',
    borderRadius: 4,
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6a0dad',
    borderRadius: 4,
  },
});

export default LessonsScreen;
