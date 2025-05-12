import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const EditProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0099FF' : '#f8f9fa',
    },
    label: {
      color: isDarkMode ? '#fff' : '#333',
    },
    input: {
      backgroundColor: isDarkMode ? '#444' : '#fff',
      borderColor: isDarkMode ? '#555' : '#ddd',
      color: isDarkMode ? '#fff' : '#000',
    },
    saveButton: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    saveButtonText: {
      color: isDarkMode ? '#000' : '#fff',
    },
  };

  const saveChanges = () => {
    // Xử lý logic lưu thay đổi (gửi lên API hoặc cập nhật state)
    navigation.goBack();
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.label, dynamicStyles.label]}>Tên</Text>
      <TextInput
        style={[styles.input, dynamicStyles.input]}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={[styles.label, dynamicStyles.label]}>Email</Text>
      <TextInput
        style={[styles.input, dynamicStyles.input]}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <TouchableOpacity style={[styles.saveButton, dynamicStyles.saveButton]} onPress={saveChanges}>
        <Text style={[styles.saveButtonText, dynamicStyles.saveButtonText]}>Lưu thay đổi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
  },
});

export default EditProfileScreen;