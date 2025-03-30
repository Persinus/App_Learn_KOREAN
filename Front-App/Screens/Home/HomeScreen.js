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
import DailyMission from './DailyMission';
import Achievement from './Achievement';
import headerStyles from '../../Styles/HeaderStyles';

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

  const handleMissionPress = (mission) => {
    ToastAndroid.show(`Đang mở nhiệm vụ: ${mission.title}`, ToastAndroid.SHORT);
  };

  const handleAchievementPress = (achievement) => {
    if (achievement === 'all') {
      ToastAndroid.show('Đang mở tất cả thành tựu...', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(`Đang mở thành tựu: ${achievement.title}`, ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={headerStyles.container}>
        <Text style={headerStyles.title}>Trang chủ</Text>
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={() => navigation.navigate('NotificationsScreen')}
        >
          <FontAwesome5 name="bell" size={16} color="#4b46f1" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Image
          source={require("../../assets/illustration1.png")}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>Xin chào, Minh Hoàng!</Text>
          <Text style={styles.subtitle}>Hôm nay bạn muốn học gì?</Text>
        </View>
        <TouchableOpacity
          style={styles.attendanceButton}
          onPress={() => navigation.navigate("DailyReward")}
        >
          <Text style={styles.attendanceButtonText}>🎁</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.streakContainer}>
        <FontAwesome5 name="fire" size={20} color="#f44336" />
        <Text style={styles.streakText}>5 ngày liên tiếp 🔥</Text>
      </View>

      <DailyMission onPress={handleMissionPress} />
      <Achievement onPress={handleAchievementPress} />

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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
  },
  notificationBadge: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff4444",
  },
  attendanceButton: {
    padding: 8,
    backgroundColor: "#ff9800",
    borderRadius: 10,
    marginLeft: 8,
  },
  attendanceButtonText: {
    fontSize: 14,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    marginTop: 0,
    padding: 12,
    backgroundColor: "#fff4f4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffe0e0",
  },
  streakText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
    color: "#f44336",
  },
  section: { 
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: { 
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  courseCard: {
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    width: 140,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  courseProgress: { 
    fontSize: 14,
    color: "#4b46f1",
    fontWeight: "600",
    marginBottom: 4,
  },
  courseTitle: { 
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },
  featuredCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    alignItems: "center",
    width: 140,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  featuredImage: { 
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  featuredTitle: { 
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  featuredDuration: { 
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  rank: { 
    fontSize: 16,
    fontWeight: "600",
    color: "#4b46f1",
    width: 30,
  },
  studentName: { 
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  studentPoints: { 
    fontSize: 14,
    fontWeight: "600",
    color: "#4b46f1",
  },
});

export default HomeScreen;
