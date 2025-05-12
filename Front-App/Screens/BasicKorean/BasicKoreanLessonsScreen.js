import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import headerStyles from '../../Styles/HeaderStyles';

const BasicKoreanLessonsScreen = ({ navigation }) => {
  const [currentUnit, setCurrentUnit] = useState(1);

  // Chia bài học thành các đơn vị (unit) dựa trên cấp độ học tập
  const units = [
    { id: 1, title: 'Đơn vị 1: Giao tiếp cơ bản', completed: 4, total: 5 },
    { id: 2, title: 'Đơn vị 2: Cuộc sống hàng ngày', completed: 2, total: 5 },
    { id: 3, title: 'Đơn vị 3: Thói quen và sở thích', completed: 0, total: 5 },
    { id: 4, title: 'Đơn vị 4: Giao thông và địa điểm', completed: 0, total: 5 },
  ];
  
  // Danh sách các bài học trong đơn vị hiện tại
  const lessonsByUnit = {
    1: [
      { id: '1', title: 'Bài 1: Chào hỏi và giới thiệu', description: 'Học cách chào hỏi và tự giới thiệu bản thân.', image: require('../../assets/logo.png'), progress: 100 },
      { id: '2', title: 'Bài 2: Gia đình', description: 'Học từ vựng về các thành viên trong gia đình.', image: require('../../assets/logo.png'), progress: 100 },
      { id: '3', title: 'Bài 3: Số đếm', description: 'Học cách đếm số trong tiếng Hàn.', image: require('../../assets/logo.png'), progress: 100 },
      { id: '4', title: 'Bài 4: Ngày tháng', description: 'Học cách nói về ngày, tháng, năm trong tiếng Hàn.', image: require('../../assets/logo.png'), progress: 100 },
      { id: '5', title: 'Bài 5: Màu sắc', description: 'Học từ vựng về màu sắc trong tiếng Hàn.', image: require('../../assets/logo.png'), progress: 0 },
    ],
    2: [
      { id: '6', title: 'Bài 6: Nhà cửa', description: 'Học từ vựng về nhà cửa và các vật dụng.', image: require('../../assets/logo.png'), progress: 100 },
      { id: '7', title: 'Bài 7: Thời tiết', description: 'Học từ vựng về thời tiết và khí hậu.', image: require('../../assets/logo.png'), progress: 100 },
      { id: '8', title: 'Bài 8: Đồ ăn', description: 'Học từ vựng về các món ăn và đồ uống.', image: require('../../assets/logo.png'), progress: 0 },
      { id: '9', title: 'Bài 9: Quần áo', description: 'Học từ vựng về quần áo và phụ kiện.', image: require('../../assets/logo.png'), progress: 0 },
      { id: '10', title: 'Bài 10: Mua sắm', description: 'Học cách giao tiếp khi đi mua sắm.', image: require('../../assets/logo.png'), progress: 0 },
    ],
    3: [
      // Bài học cho đơn vị 3
    ],
    4: [
      // Bài học cho đơn vị 4
    ]
  };

  // Tính toán tiến độ đơn vị
  const calculateUnitProgress = (unitId) => {
    const lessons = lessonsByUnit[unitId];
    if (!lessons) return 0;
    const completedLessons = lessons.filter(lesson => lesson.progress === 100).length;
    return Math.round((completedLessons / lessons.length) * 100);
  };

  const currentLessons = lessonsByUnit[currentUnit] || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={headerStyles.container}>
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#4b46f1" />
        </TouchableOpacity>
        <Text style={headerStyles.title}>Tiếng Hàn Cơ Bản</Text>
      </View>

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
                currentUnit === item.id && styles.activeUnitTab
              ]}
              onPress={() => setCurrentUnit(item.id)}
            >
              <Text style={[
                styles.unitTabText, 
                currentUnit === item.id && styles.activeUnitTabText
              ]}>
                {`Đơn vị ${item.id}`}
              </Text>
              <View style={styles.unitProgressBar}>
                <View 
                  style={[
                    styles.unitProgressFill, 
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
        <Text style={styles.currentUnitTitle}>
          {units.find(u => u.id === currentUnit)?.title || 'Đơn vị học tập'}
        </Text>
        <View style={styles.overallProgress}>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                {width: `${calculateUnitProgress(currentUnit)}%`}
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{`${calculateUnitProgress(currentUnit)}%`}</Text>
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
              item.progress === 100 ? styles.completedLesson : {}
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
              <Text style={styles.lessonTitle}>{item.title}</Text>
              <Text style={styles.lessonDescription}>{item.description}</Text>
              
              <View style={styles.lessonProgressContainer}>
                <View style={styles.lessonProgressBar}>
                  <View style={[styles.lessonProgressFill, {width: `${item.progress}%`}]} />
                </View>
                <Text style={styles.lessonProgressText}>{`${item.progress}%`}</Text>
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
    backgroundColor: '#f8f9fa',
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
    backgroundColor: '#fff',
    width: 100,
    alignItems: 'center',
    elevation: 1,
  },
  activeUnitTab: {
    backgroundColor: '#e6f0ff',
    borderColor: '#4b46f1',
    borderWidth: 1,
  },
  unitTabText: {
    fontWeight: '600',
    color: '#666',
  },
  activeUnitTabText: {
    color: '#4b46f1',
  },
  unitProgressBar: {
    height: 4,
    backgroundColor: '#eee',
    width: '100%',
    borderRadius: 2,
    marginTop: 8,
  },
  unitProgressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  unitProgressText: {
    fontSize: 12,
    color: '#666',
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
    color: '#333',
    marginBottom: 8,
  },
  overallProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4b46f1',
    borderRadius: 3,
  },
  progressText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4b46f1',
    fontWeight: 'bold',
  },
  lessonsList: {
    padding: 16,
  },
  lessonCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
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
    borderLeftColor: '#4CAF50',
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
    color: '#333',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
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
    backgroundColor: '#eee',
    borderRadius: 2,
  },
  lessonProgressFill: {
    height: '100%',
    backgroundColor: '#4b46f1',
    borderRadius: 2,
  },
  lessonProgressText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
  },
});

export default BasicKoreanLessonsScreen;
