import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import headerStyles from '../../Styles/HeaderStyles';

const BasicKoreanLessonsScreen = ({ navigation }) => {
  const [currentUnit, setCurrentUnit] = useState(1);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  // Đa ngôn ngữ
  const translations = {
    vn: {
      basicKorean: 'Tiếng Hàn Cơ Bản',
      unit: 'Đơn vị',
      lesson: 'Bài học',
      completed: 'Đã hoàn thành',
      progress: 'Tiến độ',
      lessons: 'Bài',
      unitTitles: [
        'Giao tiếp cơ bản',
        'Cuộc sống hàng ngày',
        'Thói quen và sở thích',
        'Giao thông và địa điểm'
      ],
      lessonTitles: [
        'Chào hỏi và giới thiệu',
        'Gia đình',
        'Số đếm',
        'Ngày tháng',
        'Màu sắc',
        'Nhà cửa',
        'Thời tiết',
        'Đồ ăn',
        'Quần áo',
        'Mua sắm'
      ],
      lessonDescs: [
        'Học cách chào hỏi và tự giới thiệu bản thân.',
        'Học từ vựng về các thành viên trong gia đình.',
        'Học cách đếm số trong tiếng Hàn.',
        'Học cách nói về ngày, tháng, năm trong tiếng Hàn.',
        'Học từ vựng về màu sắc trong tiếng Hàn.',
        'Học từ vựng về nhà cửa và các vật dụng.',
        'Học từ vựng về thời tiết và khí hậu.',
        'Học từ vựng về các món ăn và đồ uống.',
        'Học từ vựng về quần áo và phụ kiện.',
        'Học cách giao tiếp khi đi mua sắm.'
      ]
    },
    en: {
      basicKorean: 'Basic Korean',
      unit: 'Unit',
      lesson: 'Lesson',
      completed: 'Completed',
      progress: 'Progress',
      lessons: 'Lessons',
      unitTitles: [
        'Basic Communication',
        'Daily Life',
        'Habits and Hobbies',
        'Transportation and Places'
      ],
      lessonTitles: [
        'Greetings and Introduction',
        'Family',
        'Numbers',
        'Dates',
        'Colors',
        'House',
        'Weather',
        'Food',
        'Clothes',
        'Shopping'
      ],
      lessonDescs: [
        'Learn how to greet and introduce yourself.',
        'Learn vocabulary about family members.',
        'Learn how to count in Korean.',
        'Learn how to talk about dates in Korean.',
        'Learn vocabulary about colors in Korean.',
        'Learn vocabulary about house and furniture.',
        'Learn vocabulary about weather and climate.',
        'Learn vocabulary about food and drinks.',
        'Learn vocabulary about clothes and accessories.',
        'Learn how to communicate when shopping.'
      ]
    }
  };
  const t = translations[language] || translations.vn;

  // Chia bài học thành các đơn vị (unit) dựa trên cấp độ học tập
  const units = [
    { id: 1, title: `${t.unit} 1: ${t.unitTitles[0]}`, completed: 4, total: 5 },
    { id: 2, title: `${t.unit} 2: ${t.unitTitles[1]}`, completed: 2, total: 5 },
    { id: 3, title: `${t.unit} 3: ${t.unitTitles[2]}`, completed: 0, total: 5 },
    { id: 4, title: `${t.unit} 4: ${t.unitTitles[3]}`, completed: 0, total: 5 },
  ];

  // Danh sách các bài học trong đơn vị hiện tại
  const lessonsByUnit = {
    1: [
      { id: '1', title: `${t.lesson} 1: ${t.lessonTitles[0]}`, description: t.lessonDescs[0], image: require('../../assets/logo-icon.jpg'), progress: 100 },
      { id: '2', title: `${t.lesson} 2: ${t.lessonTitles[1]}`, description: t.lessonDescs[1], image: require('../../assets/logo-icon.jpg'), progress: 100 },
      { id: '3', title: `${t.lesson} 3: ${t.lessonTitles[2]}`, description: t.lessonDescs[2], image: require('../../assets/logo-icon.jpg'), progress: 100 },
      { id: '4', title: `${t.lesson} 4: ${t.lessonTitles[3]}`, description: t.lessonDescs[3], image: require('../../assets/logo-icon.jpg'), progress: 100 },
      { id: '5', title: `${t.lesson} 5: ${t.lessonTitles[4]}`, description: t.lessonDescs[4], image: require('../../assets/logo-icon.jpg'), progress: 0 },
    ],
    2: [
      { id: '6', title: `${t.lesson} 6: ${t.lessonTitles[5]}`, description: t.lessonDescs[5], image: require('../../assets/logo-icon.jpg'), progress: 100 },
      { id: '7', title: `${t.lesson} 7: ${t.lessonTitles[6]}`, description: t.lessonDescs[6], image: require('../../assets/logo-icon.jpg'), progress: 100 },
      { id: '8', title: `${t.lesson} 8: ${t.lessonTitles[7]}`, description: t.lessonDescs[7], image: require('../../assets/logo-icon.jpg'), progress: 0 },
      { id: '9', title: `${t.lesson} 9: ${t.lessonTitles[8]}`, description: t.lessonDescs[8], image: require('../../assets/logo-icon.jpg'), progress: 0 },
      { id: '10', title: `${t.lesson} 10: ${t.lessonTitles[9]}`, description: t.lessonDescs[9], image: require('../../assets/logo-icon.jpg'), progress: 0 },
    ],
    3: [],
    4: []
  };

  // Tính toán tiến độ đơn vị
  const calculateUnitProgress = (unitId) => {
    const lessons = lessonsByUnit[unitId];
    if (!lessons) return 0;
    const completedLessons = lessons.filter(lesson => lesson.progress === 100).length;
    return Math.round((completedLessons / lessons.length) * 100);
  };

  const currentLessons = lessonsByUnit[currentUnit] || [];

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#f8f9fa',
    },
    unitTab: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderColor: isDarkMode ? '#444' : '#eee',
    },
    activeUnitTab: {
      backgroundColor: isDarkMode ? '#202124' : '#e6f0ff',
      borderColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    unitTabText: {
      color: isDarkMode ? '#fff' : '#666',
    },
    activeUnitTabText: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    unitProgressBar: {
      backgroundColor: isDarkMode ? '#444' : '#eee',
    },
    unitProgressFill: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4CAF50',
    },
    currentUnitTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    progressBarContainer: {
      backgroundColor: isDarkMode ? '#444' : '#eee',
    },
    progressBar: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    progressText: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    lessonCard: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
    },
    completedLesson: {
      borderLeftColor: isDarkMode ? '#FFD700' : '#4CAF50',
    },
    lessonTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    lessonDescription: {
      color: isDarkMode ? '#aaa' : '#666',
    },
    lessonProgressBar: {
      backgroundColor: isDarkMode ? '#444' : '#eee',
    },
    lessonProgressFill: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    lessonProgressText: {
      color: isDarkMode ? '#aaa' : '#666',
    },
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      

      {/* Chọn đơn vị học tập */}
      <View style={styles.unitSelector}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={units}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={[
                styles.unitTab, 
                dynamicStyles.unitTab,
                currentUnit === item.id && dynamicStyles.activeUnitTab
              ]}
              onPress={() => setCurrentUnit(item.id)}
            >
              <Text style={[
                styles.unitTabText, 
                dynamicStyles.unitTabText,
                currentUnit === item.id && dynamicStyles.activeUnitTabText
              ]}>
                {`${t.unit} ${item.id}`}
              </Text>
              <View style={[styles.unitProgressBar, dynamicStyles.unitProgressBar]}>
                <View 
                  style={[
                    styles.unitProgressFill, 
                    dynamicStyles.unitProgressFill,
                    {width: `${calculateUnitProgress(item.id)}%`}
                  ]} 
                />
              </View>
              <Text style={styles.unitProgressText}>
                {`${item.completed}/${item.total}`}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Tiêu đề đơn vị hiện tại */}
      <View style={styles.currentUnitHeader}>
        <Text style={[styles.currentUnitTitle, dynamicStyles.currentUnitTitle]}>
          {units.find(u => u.id === currentUnit)?.title || `${t.unit} học tập`}
        </Text>
        <View style={styles.overallProgress}>
          <View style={[styles.progressBarContainer, dynamicStyles.progressBarContainer]}>
            <View 
              style={[
                styles.progressBar, 
                dynamicStyles.progressBar,
                {width: `${calculateUnitProgress(currentUnit)}%`}
              ]} 
            />
          </View>
          <Text style={[styles.progressText, dynamicStyles.progressText]}>{`${calculateUnitProgress(currentUnit)}%`}</Text>
        </View>
      </View>

      {/* Danh sách bài học */}
      <FlatList
        data={currentLessons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lessonsList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.lessonCard,
              dynamicStyles.lessonCard,
              item.progress === 100 ? [styles.completedLesson, dynamicStyles.completedLesson] : {}
            ]}
            onPress={() => navigation.navigate('LessonDetailScreen', { lesson: item })}
          >
            <View style={styles.lessonImageContainer}>
              <Image source={item.image} style={styles.lessonImage} />
              {item.progress === 100 && (
                <View style={styles.completedBadge}>
                  <FontAwesome5 name="check" size={12} color="#fff" />
                </View>
              )}
            </View>
            
            <View style={styles.lessonContent}>
              <Text style={[styles.lessonTitle, dynamicStyles.lessonTitle]}>{item.title}</Text>
              <Text style={[styles.lessonDescription, dynamicStyles.lessonDescription]}>{item.description}</Text>
              
              <View style={styles.lessonProgressContainer}>
                <View style={[styles.lessonProgressBar, dynamicStyles.lessonProgressBar]}>
                  <View style={[styles.lessonProgressFill, dynamicStyles.lessonProgressFill, {width: `${item.progress}%`}]} />
                </View>
                <Text style={[styles.lessonProgressText, dynamicStyles.lessonProgressText]}>{`${item.progress}%`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  unitSelector: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  unitTab: {
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
    elevation: 1,
  },
  unitTabText: {
    fontWeight: '600',
  },
  unitProgressBar: {
    height: 4,
    width: '100%',
    borderRadius: 2,
    marginTop: 8,
  },
  unitProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  unitProgressText: {
    fontSize: 12,
    marginTop: 4,
  },
  currentUnitHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  currentUnitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overallProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  lessonsList: {
    padding: 16,
  },
  lessonCard: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  completedLesson: {
    borderLeftWidth: 4,
  },
  lessonImageContainer: {
    position: 'relative',
  },
  lessonImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  completedBadge: {
    position: 'absolute',
    top: -5,
    right: 7,
    backgroundColor: '#4CAF50',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonDescription: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  lessonProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonProgressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  lessonProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  lessonProgressText: {
    marginLeft: 8,
    fontSize: 12,
  },
});

export default BasicKoreanLessonsScreen;
