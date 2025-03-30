import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  FlatList,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import headerStyles from '../../Styles/HeaderStyles';

const lessonData = [
  {
    id: '1',
    title: 'Bài 1: Giới thiệu',
    duration: '15 phút',
    isLocked: false,
    type: 'video'
  },
  {
    id: '2',
    title: 'Bài 2: Ngữ pháp cơ bản',
    duration: '25 phút',
    isLocked: false,
    type: 'lesson'
  },
  {
    id: '3',
    title: 'Bài 3: Luyện tập',
    duration: '20 phút',
    isLocked: true,
    type: 'exercise'
  }
];

const JoinCourse = ({ route, navigation }) => {
  const { course } = route.params;

  const handleStartLesson = (lesson) => {
    if (lesson.isLocked) {
      Alert.alert('Thông báo', 'Hoàn thành các bài học trước để mở khóa!');
      return;
    }

    // Điều hướng dựa vào loại bài học
    switch (lesson.type) {
      case 'video':
        navigation.navigate('VideoLesson', { lesson });
        break;
      case 'lesson':
        navigation.navigate('TextLesson', { lesson });
        break;
      case 'exercise':
        navigation.navigate('Exercise', { lesson });
        break;
    }
  };

  const renderLessonItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.lessonItem}
      onPress={() => handleStartLesson(item)}
    >
      <View style={styles.lessonContent}>
        <View style={styles.lessonIcon}>
          <FontAwesome5 
            name={item.type === 'video' ? 'play-circle' : item.type === 'lesson' ? 'book' : 'pencil-alt'} 
            size={20} 
            color={item.isLocked ? '#999' : '#6a0dad'}
          />
        </View>
        <View style={styles.lessonInfo}>
          <Text style={[styles.lessonTitle, item.isLocked && styles.lockedText]}>
            {item.title}
          </Text>
          <Text style={styles.lessonDuration}>{item.duration}</Text>
        </View>
        {item.isLocked && (
          <FontAwesome5 name="lock" size={16} color="#999" />
        )}
      </View>
      <View style={[styles.progressBar, item.isLocked && styles.lockedProgress]} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={headerStyles.container}>
        <View style={headerStyles.headerRow}>
          <TouchableOpacity 
            style={headerStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={headerStyles.title}>Khóa học của tôi</Text>
          <View style={{width: 40}} />
        </View>
      </View>

      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={styles.courseInfo}>
              <Image source={{ uri: course.image }} style={styles.courseImage} />
              <View style={styles.courseDetails}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.teacherName}>{course.teacher}</Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <Text style={styles.progressTitle}>Tiến độ học tập</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '30%' }]} />
              </View>
              <Text style={styles.progressText}>30% hoàn thành</Text>
            </View>

            <View style={styles.lessonsSection}>
              <Text style={styles.sectionTitle}>Danh sách bài học</Text>
            </View>
          </>
        )}
        data={lessonData}
        renderItem={renderLessonItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  courseInfo: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  courseDetails: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center'
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  teacherName: {
    fontSize: 14,
    color: '#666'
  },
  progressSection: {
    padding: 16,
    backgroundColor: '#f8f4ff'
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginBottom: 8
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6a0dad',
    borderRadius: 4
  },
  progressText: {
    fontSize: 14,
    color: '#666'
  },
  lessonsSection: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16
  },
  lessonItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0e6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  lessonInfo: {
    flex: 1
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4
  },
  lessonDuration: {
    fontSize: 14,
    color: '#666'
  },
  lockedText: {
    color: '#999'
  },
  lockedProgress: {
    backgroundColor: '#f5f5f5'
  }
});

export default JoinCourse;
