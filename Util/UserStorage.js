import AsyncStorage from '@react-native-async-storage/async-storage';

const USERNAME_KEY = 'username';

export const saveUsername = async (username) => {
  try {
    await AsyncStorage.setItem(USERNAME_KEY, username);
  } catch (e) {
    // Xử lý lỗi nếu cần
    console.error('Failed to save username:', e);
  }
};

export const clearUsername = async () => {
  try {
    await AsyncStorage.removeItem(USERNAME_KEY);
  } catch (e) {
    // Xử lý lỗi nếu cần
    console.error('Failed to clear username:', e);
  }
};

export const getUsername = async () => {
  try {
    return await AsyncStorage.getItem(USERNAME_KEY);
  } catch (e) {
    console.error('Failed to get username:', e);
    return null;
  }
};