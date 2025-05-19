import React, { useState } from "react";
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Animated 
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const paidCourses = [
  { 
    id: "1",
    name: "Khóa học tiếng Hàn sơ cấp",
    price: "5.0000.000 VND",
    teacher: "Thầy Jack 5 củ",
    rating: 4.5,
    description: "Khóa học dành cho người mới bắt đầu làm quen với tiếng Hàn.",
    image: "https://i.pinimg.com/474x/41/13/1d/41131d2238586a902c35ac80356f1997.jpg",
    cover: "https://i.pinimg.com/474x/19/de/4b/19de4b205c1d078026a2a532fa44bea6.jpg"
  },
  { 
    id: "2",
    name: "Luyện nghe và phản xạ tiếng Hàn",
    price: "1.200.000 VND",
    teacher: "Cô Kim Yi WonWon",
    rating: 4.8,
    description: "Rèn luyện kỹ năng nghe, phản xạ nhanh với người bản xứ.",
    image: "https://i.pinimg.com/474x/b2/e5/d7/b2e5d7b860a49038444ed9c065b5520a.jpg",
    cover: "https://i.pinimg.com/474x/43/ea/64/43ea641d750086ed6306b0b5fd783af6.jpg"
  },
  { 
    id: "3",
    name: "Luyện thi TOPIK cấp tốc",
    price: "300.000 VND",
    teacher: "Thầy Park Ji Sung",
    rating: 4.7,
    description: "Bí kíp chinh phục kỳ thi TOPIK trong thời gian ngắn.",
    image: "https://source.unsplash.com/200x200/?test,exam",
    cover: "https://source.unsplash.com/800x400/?exam,study"
  },
  { 
    id: "4",
    name: "Giao tiếp tiếng Hàn chuyên sâu",
    price: "400.000 VND",
    teacher: "Cô Kim Soo",
    rating: 5.0,
    description: "Tập trung nâng cao kỹ năng giao tiếp thực tế và đàm thoại.",
    image: "https://source.unsplash.com/200x200/?conversation,speaking",
    cover: "https://source.unsplash.com/800x400/?talking,speaking"
  },
];

const PaidCoursesScreen = ({ navigation }) => {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={headerStyles.container}>
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#4b46f1" />
        </TouchableOpacity>
        <Text style={headerStyles.title}>Khóa học</Text>
      </View>

      <FlatList
        data={paidCourses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Animated.View style={[styles.courseItem, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut} 
              activeOpacity={0.8}
              style={styles.touchable}
              onPress={() => navigation.navigate('PaidCoursesDetail', { course: item })}
            >
              <Image source={{ uri: item.cover }} style={styles.courseCover} />
              <View style={styles.content}>
                <Image source={{ uri: item.image }} style={styles.courseImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.courseName}>{item.name}</Text>
                  <Text style={styles.courseTeacher}>👨‍🏫 {item.teacher}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.courseRating}>⭐ {item.rating}/5</Text>
                    <Text style={styles.coursePrice}>💰 {item.price}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
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
    paddingBottom: 20
  },
  courseItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  touchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  courseCover: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
    flexDirection: 'row',
  },
  courseImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#4b46f1',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  courseTeacher: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  courseRating: {
    fontSize: 14,
    color: '#ffa000',
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4b46f1',
  },
});

const headerStyles = StyleSheet.create({
  container: {
    paddingTop: 45,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#6a0dad',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  rightButton: {
    padding: 8,
  },
  backButton: {
    padding: 8,
  },
});

export default PaidCoursesScreen;
