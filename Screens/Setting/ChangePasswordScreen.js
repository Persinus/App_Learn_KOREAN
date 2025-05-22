import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BASE_API_URL from '../../Util/Baseapi';
import { getUsername } from '../../Util/UserStorage';

const translations = {
  vn: {
    title: 'Đổi mật khẩu',
    oldPassword: 'Mật khẩu cũ',
    newPassword: 'Mật khẩu mới',
    confirmPassword: 'Nhập lại mật khẩu mới',
    save: 'Lưu',
    success: 'Đổi mật khẩu thành công!',
    error: 'Không thể đổi mật khẩu!',
    empty: 'Vui lòng nhập đủ các trường!',
    notMatch: 'Mật khẩu mới không khớp!',
    short: 'Mật khẩu mới phải từ 6 ký tự!',
  },
  en: {
    title: 'Change Password',
    oldPassword: 'Old Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    save: 'Save',
    success: 'Password changed successfully!',
    error: 'Cannot change password!',
    empty: 'Please fill in all fields!',
    notMatch: 'New passwords do not match!',
    short: 'New password must be at least 6 characters!',
  }
};

const ChangePasswordScreen = ({ navigation }) => {
  const isDarkMode = useSelector(state => state.darkMode.isDarkMode);
  const language = useSelector(state => state.language.language);
  const t = translations[language] || translations.vn;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirm) {
      Alert.alert(t.error, t.empty);
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert(t.error, t.short);
      return;
    }
    if (newPassword !== confirm) {
      Alert.alert(t.error, t.notMatch);
      return;
    }
    setLoading(true);
    try {
      const username = await getUsername();
      const options = {
        method: 'PUT',
        url: `${BASE_API_URL}users/${username}/password`,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        data: { oldPassword, newPassword }
      };
      await axios.request(options);
      Alert.alert(t.success);
      navigation.goBack();
    } catch (error) {
      Alert.alert(t.error, error?.response?.data?.msg || t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkMode ? '#FFD700' : '#4b46f1' }]}>{t.title}</Text>
      <TextInput
        style={[styles.input, { color: isDarkMode ? '#fff' : '#222', backgroundColor: isDarkMode ? '#232323' : '#fff', borderColor: isDarkMode ? '#555' : '#ddd' }]}
        placeholder={t.oldPassword}
        placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <TextInput
        style={[styles.input, { color: isDarkMode ? '#fff' : '#222', backgroundColor: isDarkMode ? '#232323' : '#fff', borderColor: isDarkMode ? '#555' : '#ddd' }]}
        placeholder={t.newPassword}
        placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={[styles.input, { color: isDarkMode ? '#fff' : '#222', backgroundColor: isDarkMode ? '#232323' : '#fff', borderColor: isDarkMode ? '#555' : '#ddd' }]}
        placeholder={t.confirmPassword}
        placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1' }]}
        onPress={handleChangePassword}
        disabled={loading}
      >
        <Text style={[styles.saveButtonText, { color: isDarkMode ? '#000' : '#fff' }]}>{t.save}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 16 },
  saveButton: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  saveButtonText: { fontSize: 16, fontWeight: '600' },
});

export default ChangePasswordScreen;