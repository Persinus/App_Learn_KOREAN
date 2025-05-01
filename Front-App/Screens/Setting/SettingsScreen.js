import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../Store/DarkMode';
import { toggleLanguage } from '../../Store/Language';

const SettingsScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();

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
    },
    en: {
      appSettings: 'App Settings',
      notifications: 'Notifications',
      location: 'Location',
      darkMode: 'Dark Mode',
      language: 'Language',
      feedback: 'Feedback',
      appInfo: 'App Info',
    },
  };

  const t = translations[language];

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
              {t.notifications}
            </Text>
          </View>
          <Switch value={true} onValueChange={() => {}} />
        </View>

        {/* Location */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="location-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              {t.location}
            </Text>
          </View>
          <Switch value={false} onValueChange={() => {}} />
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