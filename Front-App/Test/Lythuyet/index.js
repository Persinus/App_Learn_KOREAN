import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function AlphabetHome({ navigation }) {
  const types = [
    { type: 'ConsonantsSingle', label: 'Nguyên âm đơn' },
    { type: 'ConsonantsDouble', label: 'Nguyên âm đôi' },
    { type: 'VowelsSingle', label: 'Phụ âm đơn' },
    { type: 'VowelsDouble', label: 'Phụ âm đôi' },
  ];

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#333' : '#F5F5F5',
    },
    title: {
      color: isDarkMode ? '#FFD700' : '#4CAF50',
    },
    button: {
      backgroundColor: isDarkMode ? '#444' : '#4CAF50',
    },
    buttonText: {
      color: isDarkMode ? '#FFD700' : '#FFF',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.title, dynamicStyles.title]}>Chọn nhóm chữ cái</Text>
      {types.map((item) => (
        <TouchableOpacity
          key={item.type}
          style={[styles.button, dynamicStyles.button]}
          onPress={() => navigation.navigate(item.type)}
        >
          <Text style={[styles.buttonText, dynamicStyles.buttonText]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
