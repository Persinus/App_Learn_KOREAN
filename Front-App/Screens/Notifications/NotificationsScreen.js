import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const notificationsData = [
  { id: "1", title: "🎉 Nhận thưởng", message: "Bạn đã nhận được 50 điểm thưởng!", time: "5 phút trước", seen: false },
  { id: "2", title: "📢 Sự kiện sắp diễn ra", message: "Sự kiện học tiếng Hàn mới sắp diễn ra!", time: "1 giờ trước", seen: true },
  { id: "3", title: "📚 Chăm chỉ học tập", message: "Hôm nay bạn đã hoàn thành 3 bài học, tiếp tục cố gắng nhé!", time: "2 giờ trước", seen: false },
  { id: "4", title: "🔥 Ưu đãi đặc biệt", message: "Giảm 30% cho khóa học tiếng Hàn giao tiếp!", time: "Hôm qua", seen: true },
];

const NotificationsScreen = ({ navigation }) => {
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
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#4b46f1" />
        </TouchableOpacity>
        <Text style={styles.title}>Thông báo</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)} activeOpacity={0.7}>
            <Animated.View style={[styles.notificationItem, item.seen ? styles.seenNotification : styles.unseenNotification]}>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.message}>{item.message}</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
  },
  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  unseenNotification: {
    borderLeftWidth: 3,
    borderLeftColor: "#4b46f1",
  },
  seenNotification: {
    opacity: 0.8,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  message: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  time: {
    fontSize: 12,
    color: "#999",
    marginLeft: 8,
  },
});

export default NotificationsScreen;
