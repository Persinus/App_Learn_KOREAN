import React, { useState } from 'react';
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

const SettingsScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
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

  return (
    <ScrollView style={dynamicStyles.container}>
      <View style={[styles.settingsGroup, dynamicStyles.settingsGroup]}>
        <Text style={[styles.groupTitle, dynamicStyles.groupTitle]}>
          Cài đặt ứng dụng
        </Text>

        {/* Thông báo */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="notifications-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              Thông báo
            </Text>
          </View>
          <Switch value={true} onValueChange={() => {}} />
        </View>

        {/* Vị trí */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="location-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              Vị trí
            </Text>
          </View>
          <Switch value={false} onValueChange={() => {}} />
        </View>

        {/* Giao diện tối */}
        <View style={styles.settingItem}>
          <View style={styles.settingLabel}>
            <Ionicons name="moon-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              Giao diện tối
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={() => dispatch(toggleDarkMode())}
            thumbColor={isDarkMode ? '#fff' : '#000'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        {/* Phản hồi */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('UserFeedback')}
        >
          <View style={styles.settingLabel}>
            <Ionicons name="chatbubble-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              Phản hồi
            </Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>

        {/* Thông tin ứng dụng */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('InfoApp')}
        >
          <View style={styles.settingLabel}>
            <Ionicons name="information-circle-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              Thông tin ứng dụng
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