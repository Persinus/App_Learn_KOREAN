import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from "react-native";

const notificationsData = [
  { id: "1", title: "🎉 Nhận thưởng", message: "Bạn đã nhận được 50 điểm thưởng!", time: "5 phút trước", seen: false },
  { id: "2", title: "📢 Sự kiện sắp diễn ra", message: "Sự kiện học tiếng Hàn mới sắp diễn ra!", time: "1 giờ trước", seen: true },
  { id: "3", title: "📚 Chăm chỉ học tập", message: "Hôm nay bạn đã hoàn thành 3 bài học, tiếp tục cố gắng nhé!", time: "2 giờ trước", seen: false },
  { id: "4", title: "🔥 Ưu đãi đặc biệt", message: "Giảm 30% cho khóa học tiếng Hàn giao tiếp!", time: "Hôm qua", seen: true },
];

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [fadeAnim] = useState(new Animated.Value(1));

  const handlePress = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, seen: true } : notification
    ));
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Thông báo</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)} activeOpacity={0.8}>
            <Animated.View style={[styles.notificationItem, item.seen ? styles.seenNotification : styles.unseenNotification, { opacity: fadeAnim }]}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </Animated.View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6a0dad",
    textAlign: "center",
    marginBottom: 20,
  },
  notificationItem: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unseenNotification: {
    backgroundColor: "#d1c4e9",
  },
  seenNotification: {
    backgroundColor: "#f3e5f5",
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6a0dad",
  },
  message: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  time: {
    fontSize: 12,
    color: "#777",
    marginTop: 8,
    textAlign: "right",
  },
});

export default NotificationsScreen;
