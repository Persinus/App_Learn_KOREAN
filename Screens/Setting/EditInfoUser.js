import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, RefreshControl } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BASE_API_URL from '../../Util/Baseapi';
import { getUsername } from '../../Util/UserStorage';

const EditInfoUser = ({ navigation, route }) => {
  const user = route?.params?.user || {};
  const [name, setName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [birthday, setBirthday] = useState(user?.birthday ? formatBirthdayToInput(user.birthday) : '');
  const [gender, setGender] = useState(user?.gender || '');
  const [refreshing, setRefreshing] = useState(false);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
    },
    label: {
      color: isDarkMode ? '#ccc' : '#4b46f1',
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 6,
    },
    input: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderColor: isDarkMode ? '#555' : '#4b46f1',
      color: isDarkMode ? '#fff' : '#222',
      borderWidth: 1.5,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      marginBottom: 2,
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      shadowOpacity: isDarkMode ? 0.1 : 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: isDarkMode ? 0 : 2,
    },
    saveButton: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
      margin: 16,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      elevation: 2,
    },
    saveButtonText: {
      color: isDarkMode ? '#000' : '#fff',
      fontSize: 17,
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
  };

  // Chuyển yyyy-mm-dd => dd/mm/yyyy để hiển thị
  function formatBirthdayToInput(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  // Chuyển dd/mm/yyyy => yyyy-mm-dd để gửi backend
  function formatBirthdayToApi(dateStr) {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  }

  const reloadUser = async () => {
    setRefreshing(true);
    try {
      const username = await getUsername();
      const options = {
        method: 'GET',
        url: `${BASE_API_URL}users/profile`,
        params: { username },
        headers: { Accept: 'application/json' }
      };
      const { data } = await axios.request(options);
      const user = data.user;
      setName(user?.fullName || '');
      setEmail(user?.email || '');
      setAvatar(user?.avatar || '');
      setBirthday(user?.birthday ? formatBirthdayToInput(user.birthday) : '');
      setGender(user?.gender || '');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải lại thông tin!');
    }
    setRefreshing(false);
  };

  const handleSave = async () => {
    if (!name || !email || !avatar || !birthday || !gender) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    // Validate ngày sinh
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthday)) {
      Alert.alert('Lỗi', 'Ngày sinh phải theo định dạng dd/mm/yyyy!');
      return;
    }
    try {
      const username = await getUsername();
      const options = {
        method: 'PUT',
        url: `${BASE_API_URL}users/${username}`,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        data: {
          email,
          avatar,
          fullName: name,
          birthday: formatBirthdayToApi(birthday),
          gender
        }
      };
      await axios.request(options);
      Alert.alert('Thành công', 'Cập nhật thông tin thành công!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin!');
    }
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={reloadUser}
            colors={["#4b46f1", "#00ADB5"]}
            tintColor={isDarkMode ? "#fff" : "#4b46f1"}
          />
        }
      >
        <View style={styles.avatarSection}>
          <Image
            source={
              avatar && avatar.trim() !== ''
                ? { uri: avatar }
                : { uri: 'https://example.com/default-avatar.png' }
            }
            style={styles.avatar}
          />
          <TextInput
            style={[styles.input, dynamicStyles.input, { marginTop: 8, width: 220 }]}
            value={avatar}
            onChangeText={setAvatar}
            placeholder="Dán link ảnh avatar..."
            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
          />
        </View>

        <View style={styles.inputSection}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, dynamicStyles.label]}>Họ và tên</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={name}
              onChangeText={setName}
              placeholder="Nhập họ và tên"
              placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, dynamicStyles.label]}>Email</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={email}
              onChangeText={setEmail}
              placeholder="Nhập email"
              placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, dynamicStyles.label]}>Ngày sinh</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={birthday}
              onChangeText={setBirthday}
              placeholder="Nhập dd/mm/yyyy"
              placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
              maxLength={10}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, dynamicStyles.label]}>Giới tính</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={gender}
              onChangeText={setGender}
              placeholder="male hoặc female"
              placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
              autoCapitalize="none"
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.saveButton, dynamicStyles.saveButton]} onPress={handleSave}>
        <Text style={[styles.saveButtonText, dynamicStyles.saveButtonText]}>Lưu thay đổi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#4b46f1',
    backgroundColor: '#e3e7fd',
    shadowColor: '#4b46f1',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 2,
  },
  saveButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default EditInfoUser;
