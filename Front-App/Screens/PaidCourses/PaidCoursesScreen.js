import React, { useState } from "react";
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Animated 
} from "react-native";

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

const PaidCoursesScreen = () => {
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
      <Text style={styles.title}>🔥 Khóa học mất phí 🔥</Text>
      <FlatList
        data={paidCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View style={[styles.courseItem, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity 
              onPressIn={handlePressIn} 
              onPressOut={handlePressOut} 
              activeOpacity={0.8}
              style={styles.touchable}
            >
              <Image source={{ uri: item.cover }} style={styles.courseCover} />
              <View style={styles.content}>
                <Image source={{ uri: item.image }} style={styles.courseImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.courseName}>{item.name}</Text>
                  <Text style={styles.courseTeacher}>👨‍🏫 {item.teacher}</Text>
                  <Text style={styles.courseRating}>⭐ {item.rating} / 5</Text>
                  <Text style={styles.coursePrice}>💰 {item.price}</Text>
                  <Text style={styles.courseDescription}>{item.description}</Text>
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
    backgroundColor: "#f3e5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6a0dad",
    textAlign: "center",
    marginBottom: 20,
  },
  courseItem: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  touchable: {
    borderRadius: 15,
    overflow: "hidden",
  },
  courseCover: {
    width: "100%",
    height: 150,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  courseImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#6a0dad",
  },
  textContainer: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6a0dad",
  },
  courseTeacher: {
    fontSize: 14,
    color: "#333",
    marginTop: 2,
  },
  courseRating: {
    fontSize: 14,
    color: "#ff9800",
    marginTop: 2,
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d500f9",
    marginTop: 5,
  },
  courseDescription: {
    fontSize: 13,
    color: "#666",
    marginTop: 5,
  },
});

export default PaidCoursesScreen;
