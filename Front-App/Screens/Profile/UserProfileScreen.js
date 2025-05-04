import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const UserProfileScreen = ({ navigation }) => {
  const user = {
    name: 'Kim Seokjin',
    email: 'kimseokjin@example.com',
    level: 'Intermediate',
    profilePicture: 'https://i.pinimg.com/474x/e7/37/61/e73761b05e3921a209960b591787aa9c.jpg', // Đường dẫn ảnh đại diện
  };

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  // Đa ngôn ngữ
  const translations = {
    vn: {
      editProfile: 'Chỉnh sửa hồ sơ',
      level: 'Cấp độ',
    },
    en: {
      editProfile: 'Edit Profile',
      level: 'Level',
    },
  };

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0099FF' : '#f8f9fa',
    },
    name: {
      color: isDarkMode ? '#fff' : '#333',
    },
    email: {
      color: isDarkMode ? '#ccc' : '#555',
    },
    level: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    editButton: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    editButtonText: {
      color: isDarkMode ? '#000' : '#fff',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      <Text style={[styles.name, dynamicStyles.name]}>{user.name}</Text>
      <Text style={[styles.email, dynamicStyles.email]}>{user.email}</Text>
      <Text style={[styles.level, dynamicStyles.level]}>
        {translations[language].level}: {user.level}
      </Text>

      <TouchableOpacity
        style={[styles.editButton, dynamicStyles.editButton]}
        onPress={() => navigation.navigate('EditProfileScreen', { user })}
      >
        <Text style={[styles.editButtonText, dynamicStyles.editButtonText]}>
          {translations[language].editProfile}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  level: {
    fontSize: 18,
    marginBottom: 20,
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    fontSize: 16,
  },
});

export default UserProfileScreen;