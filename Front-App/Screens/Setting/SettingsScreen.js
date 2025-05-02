import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../Store/DarkMode';
import { toggleLanguage } from '../../Store/Language';

const SettingsScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();

  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#0099FF' : '#fff',
    },
    groupTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    settingText: {
      color: isDarkMode ? '#ccc' : '#333',
    },
    settingsGroup: {
      backgroundColor: isDarkMode ? '#6666FF' : '#99FFFF',
      borderColor: isDarkMode ? '#444' : '#eee',
    },
  };

  const translations = {
    vn: {
      appSettings: 'Cài đặt ứng dụng',
      notifications: 'Thông báo',
      location: 'Vị trí',
      darkMode: 'Giao diện tối',
      language: 'Ngôn ngữ',
      feedback: 'Phản hồi',
      appInfo: 'Thông tin ứng dụng',
      enableLocation: 'Bật vị trí',
      locationError: 'Không thể lấy vị trí. Vui lòng kiểm tra cài đặt quyền.',
      locationSuccess: 'Vị trí của bạn đã được lấy thành công!',
      enableNotifications: 'Bật thông báo',
      notificationError: 'Không thể bật thông báo. Vui lòng kiểm tra cài đặt quyền.',
      notificationSuccess: 'Thông báo đã được bật thành công!',
    },
    en: {
      appSettings: 'App Settings',
      notifications: 'Notifications',
      location: 'Location',
      darkMode: 'Dark Mode',
      language: 'Language',
      feedback: 'Feedback',
      appInfo: 'App Info',
      enableLocation: 'Enable Location',
      locationError: 'Unable to fetch location. Please check permission settings.',
      locationSuccess: 'Your location has been successfully retrieved!',
      enableNotifications: 'Enable Notifications',
      notificationError: 'Unable to enable notifications. Please check permission settings.',
      notificationSuccess: 'Notifications have been successfully enabled!',
    },
  };

  const t = translations[language];

  const handleLocationToggle = async () => {
    if (!isLocationEnabled) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', t.locationError);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      Alert.alert('Success', `${t.locationSuccess}\nLatitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
    }
    setIsLocationEnabled(!isLocationEnabled);
  };

  const handleNotificationToggle = async () => {
    if (!isNotificationEnabled) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', t.notificationError);
        return;
      }

      Alert.alert('Success', t.notificationSuccess);
    }
    setIsNotificationEnabled(!isNotificationEnabled);
  };

  return (
    <ScrollView style={dynamicStyles.container}>
      <View style={[styles.settingsGroup, dynamicStyles.settingsGroup]}>
        <Text style={[styles.groupTitle, dynamicStyles.groupTitle]}>
          {t.appSettings}
        </Text>

        {/* Notifications */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="notifications-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              {t.enableNotifications}
            </Text>
          </View>
          <Switch
            value={isNotificationEnabled}
            onValueChange={handleNotificationToggle}
            thumbColor={isNotificationEnabled ? '#fff' : '#000'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Location */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="location-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              {t.enableLocation}
            </Text>
          </View>
          <Switch
            value={isLocationEnabled}
            onValueChange={handleLocationToggle}
            thumbColor={isLocationEnabled ? '#fff' : '#000'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Dark Mode */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="moon-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              {t.darkMode}
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={() => dispatch(toggleDarkMode())}
            thumbColor={isDarkMode ? '#fff' : '#000'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Language */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="language-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              {t.language}
            </Text>
          </View>
          <Switch
            value={language === 'en'}
            onValueChange={() => dispatch(toggleLanguage())}
            thumbColor={language === 'en' ? '#fff' : '#000'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Feedback */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('UserFeedback')}
        >
          <View style={styles.settingLabel}>
            <Ionicons name="chatbubble-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              {t.feedback}
            </Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>

        {/* App Info */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('InfoApp')}
        >
          <View style={styles.settingLabel}>
            <Ionicons name="information-circle-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              {t.appInfo}
            </Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settingsGroup: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    marginLeft: 12,
  },
});

export default SettingsScreen;