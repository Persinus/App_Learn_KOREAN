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
import { useSelector } from 'react-redux';
import headerStyles from '../../Styles/HeaderStyles';

const JoinCourse = ({ route, navigation }) => {
  const { course } = route.params;
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  const translations = {
    vn: {
      myCourses: 'Khóa học của tôi',
      progress: 'Tiến độ học tập',
      complete: 'hoàn thành',
      lessonList: 'Danh sách bài học',
      alertTitle: 'Thông báo',
      alertMessage: 'Hoàn thành các bài học trước để mở khóa!',
      updating: 'Tính năng đang được cập nhật',
    },
    en: {
      myCourses: 'My Courses',
      progress: 'Learning Progress',
      complete: 'completed',
      lessonList: 'Lesson List',
      alertTitle: 'Notice',
      alertMessage: 'Complete previous lessons to unlock!',
      updating: 'Feature is being updated',
    },
  };

  const t = translations[language];

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
      flex: 1,
    },
    courseInfo: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderBottomColor: isDarkMode ? '#444' : '#e3e7fd',
      borderBottomWidth: 1.5,
      borderRadius: 16,
      margin: 16,
      padding: 16,
      elevation: 2,
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      shadowOpacity: isDarkMode ? 0.08 : 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      flexDirection: 'row',
      alignItems: 'center',
    },
    courseName: {
      color: isDarkMode ? '#fff' : '#4b46f1',
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 8,
    },
    teacherName: {
      color: isDarkMode ? '#ccc' : '#666',
      fontSize: 14,
    },
    progressSection: {
      backgroundColor: isDarkMode ? '#232323' : '#e3e7fd',
      borderRadius: 16,
      marginHorizontal: 16,
      marginBottom: 16,
      padding: 16,
    },
    progressTitle: {
      color: isDarkMode ? '#fff' : '#4b46f1',
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 12,
    },
    progressBar: {
      backgroundColor: isDarkMode ? '#444' : '#eee',
      height: 8,
      borderRadius: 4,
      marginBottom: 8,
    },
    progressFill: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
      height: '100%',
      borderRadius: 4,
    },
    progressText: {
      color: isDarkMode ? '#ccc' : '#666',
      fontSize: 14,
    },
    sectionTitle: {
      color: isDarkMode ? '#fff' : '#4b46f1',
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 16,
    },
    lessonItem: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderRadius: 16,
      marginBottom: 16,
      elevation: 2,
      borderWidth: 1.5,
      borderColor: isDarkMode ? '#FFD70033' : '#e3e7fd',
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      shadowOpacity: isDarkMode ? 0.08 : 0.12,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    lessonIcon: {
      backgroundColor: isDarkMode ? '#333' : '#e3e7fd',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    lessonTitle: {
      color: isDarkMode ? '#fff' : '#4b46f1',
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 4,
    },
    lessonDuration: {
      color: isDarkMode ? '#ccc' : '#666',
      fontSize: 14,
    },
    lockedText: {
      color: '#999',
    },
    lockedProgress: {
      backgroundColor: isDarkMode ? '#555' : '#f5f5f5',
    },
    updatingText: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      textAlign: 'center',
      marginTop: 32,
      fontSize: 16,
      fontWeight: 'bold',
    },
  };

  // Lấy danh sách bài học từ course.lessons
  const lessonData = Array.isArray(course.lessons) ? course.lessons : [];

  const handleStartLesson = (lesson) => {
    if (lesson.isLocked) {
      Alert.alert(t.alertTitle, t.alertMessage);
      return;
    }

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
      style={[styles.lessonItem, dynamicStyles.lessonItem]}
      onPress={() => handleStartLesson(item)}
    >
      <View style={styles.lessonContent}>
        <View style={[styles.lessonIcon, dynamicStyles.lessonIcon]}>
          <FontAwesome5 
            name={item.type === 'video' ? 'play-circle' : item.type === 'lesson' ? 'book' : 'pencil-alt'} 
            size={20} 
            color={item.isLocked ? '#999' : isDarkMode ? '#FFD700' : '#6a0dad'}
          />
        </View>
        <View style={styles.lessonInfo}>
          <Text style={[
            styles.lessonTitle, 
            dynamicStyles.lessonTitle, 
            item.isLocked && dynamicStyles.lockedText
          ]}>
            {item.title[language] || item.title.vn || item.title.en || 'Bài học'}
          </Text>
          <Text style={[styles.lessonDuration, dynamicStyles.lessonDuration]}>
            {item.duration[language] || item.duration.vn || item.duration.en || ''}
          </Text>
        </View>
        {item.isLocked && (
          <FontAwesome5 name="lock" size={16} color="#999" />
        )}
      </View>
      <View style={[
        styles.progressBar, 
        dynamicStyles.progressBar, 
        item.isLocked && dynamicStyles.lockedProgress
      ]} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={headerStyles.container}>
        <View style={headerStyles.headerRow}>
          <TouchableOpacity 
            style={headerStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={headerStyles.title}>{t.myCourses}</Text>
          <View style={{width: 40}} />
        </View>
      </View>

      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={[styles.courseInfo, dynamicStyles.courseInfo]}>
              <Image source={{ uri: course.image }} style={styles.courseImage} />
              <View style={styles.courseDetails}>
                <Text style={[styles.courseName, dynamicStyles.courseName]}>{course.name}</Text>
                <Text style={[styles.teacherName, dynamicStyles.teacherName]}>{course.teacher}</Text>
              </View>
            </View>

            <View style={[styles.progressSection, dynamicStyles.progressSection]}>
              <Text style={[styles.progressTitle, dynamicStyles.progressTitle]}>{t.progress}</Text>
              <View style={[styles.progressBar, dynamicStyles.progressBar]}>
                <View style={[styles.progressFill, dynamicStyles.progressFill, { width: '30%' }]} />
              </View>
              <Text style={[styles.progressText, dynamicStyles.progressText]}>30% {t.complete}</Text>
            </View>

            <View style={styles.lessonsSection}>
              <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{t.lessonList}</Text>
            </View>
          </>
        )}
        data={lessonData}
        renderItem={renderLessonItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={dynamicStyles.updatingText}>{t.updating}</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  courseInfo: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  courseDetails: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  teacherName: {
    fontSize: 14,
  },
  progressSection: {
    padding: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
  },
  lessonsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  lessonItem: {
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 14,
  },
  lockedText: {
    color: '#999',
  },
  lockedProgress: {
    backgroundColor: '#f5f5f5',
  },
});

export default JoinCourse;
