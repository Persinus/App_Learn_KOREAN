import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const courses = [
    { id: "1", title: "Tiếng Hàn Cơ Bản", progress: "15/20", color: "#4b46f1" },
    {
      id: "2",
      title: "Tiếng Hàn Trung Cấp",
      progress: "10/30",
      color: "#ff9f43",
    },
    {
      id: "3",
      title: "Giao tiếp hàng ngày",
      progress: "5/15",
      color: "#f44336",
    },
  ];

  const featuredLessons = [
    {
      id: "1",
      title: "Ngữ pháp cơ bản",
      duration: "2 giờ",
      image: require("../../assets/logo.png"),
    },
    {
      id: "2",
      title: "Từ vựng thông dụng",
      duration: "1.5 giờ",
      image: require("../../assets/illustration2.png"),
    },
    {
      id: "3",
      title: "Đặt mục tiêu học tập",
      duration: "Tuần này",
      image: require("../../assets/illustration2.png"),
    },
  ];

  const topStudents = [
    { id: "1", name: "Nguyễn Văn A", points: "1200" },
    { id: "2", name: "Trần Thị B", points: "1150" },
    { id: "3", name: "Lê Minh C", points: "1100" },
  ];

  return (
    
    <ScrollView style={styles.container}>
    
      {/* Header Section */}
      <View style={styles.header}>
         
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/illustration1.png")}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>Xin chào, Minh Hoàng!</Text>
            <Text style={styles.subtitle}>Hôm nay bạn muốn học gì?</Text>
          </View>
         
        </View>

       
      </View>
      <TouchableOpacity
  style={styles.attendanceButton}
  onPress={() => navigation.navigate("DailyReward")}
>
  <Text style={styles.attendanceButtonText}>🎁 Điểm Danh</Text>
</TouchableOpacity>
      <View style={styles.streakContainer}>
        <FontAwesome5 name="fire" size={24} color="#f44336" />
        <Text style={styles.streakText}>
          Chuỗi học tập: 5 ngày liên tiếp 🔥
        </Text>
      </View>

      {/* Continue Courses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Khóa học đang học</Text>
        <FlatList
          horizontal
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.courseCard, { backgroundColor: item.color }]}
            >
              <Text style={styles.courseProgress}>{item.progress} bài</Text>
              <Text style={styles.courseTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Featured Lessons */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Bài học nổi bật</Text>
        <FlatList
          horizontal
          data={featuredLessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.featuredCard}
              onPress={() =>
                ToastAndroid.show("Đang mở bài học...", ToastAndroid.SHORT)
              } // Thêm thông báo
            >
              <Image source={item.image} style={styles.featuredImage} />
              <Text style={styles.featuredTitle}>{item.title}</Text>
              <Text style={styles.featuredDuration}>{item.duration}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Top Students */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Bảng xếp hạng học viên</Text>
        {topStudents.map((student, index) => (
          <View key={student.id} style={styles.studentCard}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.studentPoints}>{student.points} điểm</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: {
    padding: 16,
    backgroundColor: "#ffffffffffff",
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 40,  // Thêm marginTop để lùi header xuống
  },
  avatarContainer: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 16 },
  textContainer: { flex: 1 },
  greeting: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 16, color: "#d1d1ff", marginTop: 4 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  courseCard: {
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    width: 150,
    transform: [{ scale: 1 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  attendanceButton: {
    position: "absolute", // Makes the button absolutely positioned
    // Distance from the top of the screen
    right: 10, // Distance from the right side of the screen
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ff9800",
    borderRadius: 8,
    elevation: 5, // Adds a shadow effect for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  attendanceButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  courseProgress: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  courseTitle: { fontSize: 14, color: "#fff" },
  featuredCard: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
    width: 150,
    transform: [{ scale: 1 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#ffebee",
    borderRadius: 8,
  },
  streakText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#f44336",
  },
  featuredImage: { width: 100, height: 100, borderRadius: 8, marginBottom: 8 },
  featuredTitle: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  featuredDuration: { fontSize: 12, color: "#888", textAlign: "center" },
  studentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  rank: { fontSize: 18, fontWeight: "bold", color: "#4b46f1" },
  studentName: { fontSize: 16, flex: 1, marginLeft: 10 },
  studentPoints: { fontSize: 16, fontWeight: "bold" },
});

export default HomeScreen;
