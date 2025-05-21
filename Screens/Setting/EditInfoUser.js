import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const EditInfoUser = ({ navigation, route }) => {
  const user = route?.params?.user || {};
  const [name, setName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [level, setLevel] = useState(user?.level ? String(user.level) : '');

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    header: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderBottomColor: isDarkMode ? '#444' : '#eee',
    },
    headerTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    backButton: {
      backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
    },
    changeAvatarButton: {
      backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
    },
    changeAvatarText: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    label: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    input: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderColor: isDarkMode ? '#555' : '#ddd',
      color: isDarkMode ? '#fff' : '#333',
    },
    saveButton: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    saveButtonText: {
      color: isDarkMode ? '#000' : '#fff',
    },
  };

  const handleSave = () => {
    // Logic lưu thông tin ở đây
    navigation.goBack();
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.header, dynamicStyles.header]}>
        <View style={styles.headerMain}>
          <TouchableOpacity
            style={[styles.backButton, dynamicStyles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={16} color={isDarkMode ? '#fff' : '#4b46f1'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>Chỉnh sửa thông tin</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.avatarSection}>
          <Image
            source={
              user?.avatar
                ? { uri: user.avatar }
                : { uri: 'https://example.com/default-avatar.png' }
            }
            style={styles.avatar}
          />
          <TouchableOpacity style={[styles.changeAvatarButton, dynamicStyles.changeAvatarButton]}>
            <Text style={[styles.changeAvatarText, dynamicStyles.changeAvatarText]}>Thay đổi ảnh</Text>
          </TouchableOpacity>
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
            <Text style={[styles.label, dynamicStyles.label]}>Số điện thoại</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={phone}
              onChangeText={setPhone}
              placeholder="Nhập số điện thoại"
              placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, dynamicStyles.label]}>Cấp độ</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={level}
              onChangeText={setLevel}
              placeholder="Chọn cấp độ"
              placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
              editable={false}
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
  header: {
    padding: 16,
    paddingTop: 45,
    borderBottomWidth: 1,
  },
  headerMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
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
  },
  changeAvatarButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  changeAvatarText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditInfoUser;
