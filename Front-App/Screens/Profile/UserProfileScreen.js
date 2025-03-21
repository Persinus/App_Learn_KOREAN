import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const UserProfileScreen = ({ navigation }) => {
  const user = {
    name: 'Kim Seokjin',
    email: 'kimseokjin@example.com',
    level: 'Intermediate',
    profilePicture: 'https://i.pinimg.com/474x/e7/37/61/e73761b05e3921a209960b591787aa9c.jpg', // Đường dẫn ảnh đại diện
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.level}>Level: {user.level}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfileScreen', { user })}
      >
        <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  level: {
    fontSize: 18,
    color: '#4b46f1',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#4b46f1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserProfileScreen;