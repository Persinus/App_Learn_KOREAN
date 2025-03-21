import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cài đặt</Text>

      {/* Profile Settings */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Cài đặt hồ sơ</Text>
        <Text style={styles.settingText}>Chỉnh sửa hồ sơ của bạn</Text>
      </View>

      {/* Notification Settings */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Thông báo</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={(value) => setIsNotificationsEnabled(value)}
        />
      </View>

      {/* Location Settings */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Vị trí</Text>
        <Switch
          value={isLocationEnabled}
          onValueChange={(value) => setIsLocationEnabled(value)}
        />
      </View>

      {/* Privacy Settings */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Cài đặt quyền riêng tư</Text>
        <Text style={styles.settingText}>Quản lý quyền riêng tư của bạn</Text>
      </View>

      {/* About App */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Về ứng dụng</Text>
        <Text style={styles.settingText}>Thông tin về phiên bản và nhà phát triển</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b46f1',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
  },
  settingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});

export default SettingsScreen;
