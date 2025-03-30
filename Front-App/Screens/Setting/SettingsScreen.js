import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, Alert, ScrollView, Animated } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 60],
    extrapolate: 'clamp'
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp'
  });

  const user = {
    name: 'Kim Seokjin',
    email: 'kimseokjin@example.com',
    level: 'Intermediate',
    profilePicture: 'https://i.pinimg.com/474x/e7/37/61/e73761b05e3921a209960b591787aa9c.jpg',
  };

  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Đăng xuất", onPress: () => navigation.replace('LoginScreen') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerMain}>
          <Text style={styles.headerTitle}>Cài đặt</Text>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate('InfoApp')}
          >
            <FontAwesome5 name="question-circle" size={16} color="#4b46f1" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileCard}>
          <Image source={{ uri: user.profilePicture }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userLevel}>🌟 Cấp độ: {user.level}</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditInfoUser', { user })}
          >
            <FontAwesome5 name="pen" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Cài đặt ứng dụng</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Ionicons name="notifications-outline" size={20} color="#4b46f1" />
              <Text style={styles.settingText}>Thông báo</Text>
            </View>
            <Switch value={isNotificationsEnabled} onValueChange={setIsNotificationsEnabled} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLabel}>
              <Ionicons name="location-outline" size={20} color="#4b46f1" />
              <Text style={styles.settingText}>Vị trí</Text>
            </View>
            <Switch value={isLocationEnabled} onValueChange={setIsLocationEnabled} />
          </View>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('UserFeedback')}
          >
            <View style={styles.settingLabel}>
              <Ionicons name="chatbubble-outline" size={20} color="#4b46f1" />
              <Text style={styles.settingText}>Phản hồi</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('InfoApp')}
          >
            <View style={styles.settingLabel}>
              <Ionicons name="information-circle-outline" size={20} color="#4b46f1" />
              <Text style={styles.settingText}>Thông tin ứng dụng</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <FontAwesome5 name="sign-out-alt" size={18} color="#ff4444" />
          <Text style={styles.logoutText}>Đăng xuất</Text>  
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: 45,
    paddingHorizontal: 16, 
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  helpButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20
  },
  profileCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#4b46f1',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  userLevel: {
    fontSize: 14,
    color: '#4b46f1',
    marginTop: 4,
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#4b46f1',
    padding: 8,
    borderRadius: 8,
  },
  settingsGroup: {
    margin: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    color: '#ff4444',
    marginLeft: 12,
  },
});

export default SettingsScreen;
