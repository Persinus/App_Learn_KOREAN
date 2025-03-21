import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const courses = [
    { id: '1', title: 'Tiếng Hàn Cơ Bản', progress: '15/20', color: '#4b46f1' },
    { id: '2', title: 'Tiếng Hàn Trung Cấp', progress: '10/30', color: '#ff9f43' },
  ];

  const featuredLessons = [
    { id: '1', title: 'Ngữ pháp cơ bản', duration: '2 giờ', image: require('../../assets/logo.png') },
    // { id: '2', title: 'Từ vựng thông dụng', duration: '2 giờ', image: require('./assets/lesson2.png') },
    // { id: '3', title: 'Đặt mục tiêu học tập', duration: 'Tuần này', image: require('./assets/goal.png') },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={require('../../assets/illustration1.png')} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>Xin chào, Minh Hoàng!</Text>
            <Text style={styles.subtitle}>Hôm nay bạn muốn học gì?</Text>
          </View>
        </View>
      </View>

      {/* Continue Courses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Khóa học đang học</Text>
        <FlatList
          horizontal
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.courseCard, { backgroundColor: item.color }]}>
              <Text style={styles.courseProgress}>{item.progress}</Text>
              <Text style={styles.courseTitle}>{item.title}</Text>
            </View>
          )}
        />
      </View>

      {/* Featured Lessons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bài học nổi bật</Text>
        <FlatList
          horizontal
          data={featuredLessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.featuredCard}>
              <Image source={item.image} style={styles.featuredImage} />
              <Text style={styles.featuredTitle}>{item.title}</Text>
              <Text style={styles.featuredDuration}>{item.duration}</Text>
            </View>
          )}
        />
      </View>
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
    padding: 16,
    backgroundColor: '#4b46f1',
    borderRadius: 8,
    marginBottom: 16,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d1ff',
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseCard: {
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    width: 150,
  },
  courseProgress: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  courseTitle: {
    fontSize: 14,
    color: '#fff',
  },
  featuredCard: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    width: 150,
  },
  featuredImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  featuredDuration: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});

export default HomeScreen;
