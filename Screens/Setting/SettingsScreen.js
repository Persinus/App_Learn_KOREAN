import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  Image,
  TextInput,
  RefreshControl,
} from 'react-native';
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../../Store/DarkMode';
import { toggleLanguage } from '../../Store/Language';
import { clearUsername, getUsername } from '../../Util/UserStorage';
import axios from 'axios';
import BASE_API_URL from '../../Util/Baseapi';

const SettingsScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [giftcode, setGiftcode] = useState('');
  const [giftResult, setGiftResult] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
    },
    groupTitle: {
      color: isDarkMode ? '#fff' : '#4b46f1',
    },
    settingText: {
      color: isDarkMode ? '#ccc' : '#222',
    },
    settingsGroup: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#f4f7ff',
      borderColor: isDarkMode ? '#444' : '#e3e7fd',
    },
    userInfoBox: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      margin: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 35,
      marginRight: 18,
      borderWidth: 2,
      borderColor: '#4b46f1',
      backgroundColor: '#e3e7fd',
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      color: isDarkMode ? '#fff' : '#4b46f1',
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 4,
    },
    userEmail: {
      color: isDarkMode ? '#B3B3B3' : '#666',
      fontSize: 15,
    },
    editIcon: {
      padding: 10,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#f4f7ff',
      marginLeft: 10,
      borderWidth: 1,
      borderColor: isDarkMode ? '#333' : '#e3e7fd',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoutBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20,
      padding: 14,
      borderRadius: 10,
      backgroundColor: '#CF6679',
      elevation: 2,
    },
    logoutText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 17,
      marginLeft: 10,
    },
    giftInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 12,
      marginBottom: 8,
    },
    giftInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#4b46f1',
      borderRadius: 8,
      padding: 10,
      color: isDarkMode ? '#fff' : '#222',
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      marginRight: 8,
    },
    giftBtn: {
      backgroundColor: '#4b46f1',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    giftBtnText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    giftResult: {
      marginTop: 6,
      color: '#00ADB5',
      fontWeight: 'bold',
    }
  };

  const translations = {
    vn: {
      appSettings: 'Cài đặt ứng dụng',
      darkMode: 'Giao diện tối',
      language: 'Ngôn ngữ',
      feedback: 'Phản hồi',
      appInfo: 'Thông tin ứng dụng',
      logout: 'Đăng xuất',
      editInfo: 'Sửa thông tin',
      giftcode: 'Nhận thưởng giftcode',
      enterGiftcode: 'Nhập giftcode...',
      giftSuccess: 'Nhận thưởng thành công!',
      giftFail: 'Giftcode không hợp lệ hoặc đã nhận!',
    },
    en: {
      appSettings: 'App Settings',
      darkMode: 'Dark Mode',
      language: 'Language',
      feedback: 'Feedback',
      appInfo: 'App Info',
      logout: 'Logout',
      editInfo: 'Edit Info',
      giftcode: 'Redeem Giftcode',
      enterGiftcode: 'Enter giftcode...',
      giftSuccess: 'Reward received successfully!',
      giftFail: 'Invalid or already redeemed giftcode!',
    },
  };

  const t = translations[language];

  const fetchProfile = async () => {
    try {
      const username = await getUsername();
      if (!username) return;
      const options = {
        method: 'GET',
        url: BASE_API_URL + 'users/profile',
        params: { username },
        headers: { Accept: 'application/json' }
      };
      const { data } = await axios.request(options);
      setProfile(data.user);
    } catch (error) {
      setProfile(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProfile();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await clearUsername();
    navigation.navigate('AuthStack', { screen: 'LoginScreen' });
  };

  const handleGiftcode = async () => {
    const code = giftcode.trim();
    if (!code) return;
    try {
      const username = await getUsername();
      const options = {
        method: 'POST',
        url: BASE_API_URL + 'giftcodes/redeem',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        data: { code, username }
      };
      const { data } = await axios.request(options);
      setGiftResult(`${t.giftSuccess} +${data.gold || 0} vàng, +${data.diamond || 0} kim cương, +${data.score || 0} điểm`);
    } catch (error) {
      setGiftResult(t.giftFail);
    }
  };

  return (
    <ScrollView
      style={dynamicStyles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#4b46f1", "#00ADB5"]}
          tintColor={isDarkMode ? "#fff" : "#4b46f1"}
        />
      }
    >
      <View style={dynamicStyles.userInfoBox}>
        <Image
          source={{ uri: profile?.avatar || 'https://i.pinimg.com/736x/a4/11/f9/a411f94f4622cfa7c1a87f4f79328064.jpg' }}
          style={dynamicStyles.avatar}
        />
        <View style={dynamicStyles.userDetails}>
          <Text style={dynamicStyles.userName}>{profile?.username || ''}</Text>
          <Text style={dynamicStyles.userEmail}>{profile?.email || ''}</Text>
        </View>
        <TouchableOpacity
          style={dynamicStyles.editIcon}
          onPress={() => navigation.navigate('EditInfoUser', { user: profile })}
        >
          <Feather name="edit-2" size={18} color={isDarkMode ? "#fff" : "#333"} />
        </TouchableOpacity>
      </View>

      <View style={[styles.settingsGroup, dynamicStyles.settingsGroup]}>
        <Text style={[styles.groupTitle, dynamicStyles.groupTitle]}>
          {t.appSettings}
        </Text>

        <View style={dynamicStyles.giftInputRow}>
          <TextInput
            style={dynamicStyles.giftInput}
            placeholder={t.enterGiftcode}
            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
            value={giftcode}
            onChangeText={setGiftcode}
          />
          <TouchableOpacity style={dynamicStyles.giftBtn} onPress={handleGiftcode}>
            <Text style={dynamicStyles.giftBtnText}>{t.giftcode}</Text>
          </TouchableOpacity>
        </View>
        {giftResult ? <Text style={dynamicStyles.giftResult}>{giftResult}</Text> : null}

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

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('ChangePasswordScreen')}
        >
          <View style={styles.settingLabel}>
            <Ionicons name="key-outline" size={20} color="#4b46f1" />
            <Text style={[styles.settingText, dynamicStyles.settingText]}>
              {language === 'en' ? 'Change Password' : 'Đổi mật khẩu'}
            </Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={dynamicStyles.logoutBtn} onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" size={18} color="#fff" />
        <Text style={dynamicStyles.logoutText}>{t.logout}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settingsGroup: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f4f7ff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  groupTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4b46f1',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e7fd',
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 18,
    marginLeft: 14,
    fontWeight: '500',
    color: '#222',
  },
});

export default SettingsScreen;