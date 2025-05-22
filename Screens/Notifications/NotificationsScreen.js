import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const initialNotifications = [
  { id: "1", title: "🎉 Nhận thưởng", message: "Bạn đã nhận được 50 điểm thưởng!", time: "5 phút trước", seen: false },
  { id: "2", title: "📢 Sự kiện sắp diễn ra", message: "Sự kiện học tiếng Hàn mới sắp diễn ra!", time: "1 giờ trước", seen: true },
  { id: "3", title: "📚 Chăm chỉ học tập", message: "Hôm nay bạn đã hoàn thành 3 bài học, tiếp tục cố gắng nhé!", time: "2 giờ trước", seen: false },
  { id: "4", title: "🔥 Ưu đãi đặc biệt", message: "Giảm 30% cho khóa học tiếng Hàn giao tiếp!", time: "Hôm qua", seen: true },
];

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [fadeAnim] = useState(new Animated.Value(1));
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const handlePress = (id) => {
    setNotifications(prev =>
      prev.map(item => item.id === id ? { ...item, seen: true } : item)
    );
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? "#121212" : "#fff",
    },
    header: {
      backgroundColor: isDarkMode ? "#232323" : "#fff",
      borderBottomColor: isDarkMode ? "#444" : "#eee",
    },
    title: {
      color: isDarkMode ? "#fff" : "#333",
    },
    backButton: {
      backgroundColor: isDarkMode ? "#232323" : "#f5f5f5",
    },
    notificationItem: {
      backgroundColor: isDarkMode ? "#232323" : "#fff",
      borderColor: isDarkMode ? "#444" : "#eee",
    },
    unseenNotification: {
      borderLeftColor: isDarkMode ? "#FFD700" : "#4b46f1",
    },
    notificationTitle: {
      color: isDarkMode ? "#fff" : "#333",
    },
    message: {
      color: isDarkMode ? "#ccc" : "#666",
    },
    time: {
      color: isDarkMode ? "#aaa" : "#999",
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity 
          style={[styles.backButton, dynamicStyles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color={isDarkMode ? "#fff" : "#4b46f1"} />
        </TouchableOpacity>
        <Text style={[styles.title, dynamicStyles.title]}>Thông báo</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)} activeOpacity={0.7}>
            <Animated.View style={[
              styles.notificationItem,
              dynamicStyles.notificationItem,
              item.seen ? styles.seenNotification : [styles.unseenNotification, dynamicStyles.unseenNotification]
            ]}>
              <View style={styles.notificationContent}>
                <Text style={[styles.notificationTitle, dynamicStyles.notificationTitle]}>{item.title}</Text>
                <Text style={[styles.time, dynamicStyles.time]}>{item.time}</Text>
              </View>
              <Text style={[styles.message, dynamicStyles.message]}>{item.message}</Text>
            </Animated.View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  listContainer: { padding: 16 },
  notificationItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  unseenNotification: {
    borderLeftWidth: 3,
  },
  seenNotification: {
    opacity: 0.8,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
  },
  time: {
    fontSize: 12,
    marginLeft: 8,
  },
});

export default NotificationsScreen;
