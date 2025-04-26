import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AlphabetHome({ navigation }) {
  const types = [
    { type: 'ConsonantsSingle', label: 'Phụ âm đơn' },
    { type: 'ConsonantsDouble', label: 'Phụ âm đôi' },
    { type: 'VowelsSingle', label: 'Nguyên âm đơn' },
    { type: 'VowelsDouble', label: 'Nguyên âm đôi' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn nhóm chữ cái</Text>
      {types.map((item) => (
        <TouchableOpacity
          key={item.type}
          style={styles.button}
          onPress={() => navigation.navigate(item.type)}
        >
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  button: { backgroundColor: '#4CAF50', padding: 15, marginVertical: 10, borderRadius: 10, width: '80%', alignItems: 'center' },
  buttonText: { fontSize: 18, color: 'white' },
});
