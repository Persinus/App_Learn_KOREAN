import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, Alert } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const ProfileSettingsScreen = ({ navigation }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = useState(true);

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
        { text: "Đăng xuất", onPress: () => navigation.replace('LoginScreen') },
      ]
    );
  };

  const handleSyncData = () => {
    Alert.alert("Đồng bộ dữ liệu", "Dữ liệu của bạn đã được đồng bộ hóa thành công!");
  };

  const handlePrivacySettings = () => {
    navigation.navigate('PrivacyScreen'); // Chuyển đến màn hình quyền riêng tư
  };

  return (
    <View style={styles.container}>
      {/* Hồ sơ người dùng */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.level}>🌟 Cấp độ: {user.level}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfileScreen', { user })}
        >
          <FontAwesome5 name="edit" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Cài đặt */}
      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>⚙️ Cài đặt</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="notifications-outline" size={20} color="#4b46f1" />
            <Text style={styles.settingText}>Thông báo</Text>
          </View>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={(value) => setIsNotificationsEnabled(value)}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="location-outline" size={20} color="#4b46f1" />
            <Text style={styles.settingText}>Vị trí</Text>
          </View>
          <Switch
            value={isLocationEnabled}
            onValueChange={(value) => setIsLocationEnabled(value)}
          />
        </View>

        <TouchableOpacity style={styles.settingItem} onPress={handleSyncData}>
          <View style={styles.settingLabel}>
            <Ionicons name="sync-outline" size={20} color="#4b46f1" />
            <Text style={styles.settingText}>Đồng bộ dữ liệu</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handlePrivacySettings}>
          <View style={styles.settingLabel}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#4b46f1" />
            <Text style={styles.settingText}>Quyền riêng tư</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <View style={styles.settingLabel}>
            <Ionicons name="log-out-outline" size={20} color="#f00" />
            <Text style={[styles.settingText, { color: '#f00' }]}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    position: 'relative',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  level: {
    fontSize: 16,
    color: '#4b46f1',
  },
  editButton: {
    backgroundColor: '#4b46f1',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    top: 16,
  },
  settingsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#4b46f1',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
});

export default ProfileSettingsScreen;
