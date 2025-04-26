import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AlphabetDetail({ letter, sound, tip, strokeOrder, example }) {
  return (
    <View style={styles.container}>
      <Text style={styles.letter}>{letter}</Text>
      <Text style={styles.sound}>Âm: {sound}</Text>
      <Text style={styles.tip}>Mẹo đọc: {tip}</Text>
      <Text style={styles.strokeOrder}>Cách viết: {strokeOrder}</Text>
      <Text style={styles.example}>Ví dụ: {example}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  letter: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  sound: {
    fontSize: 18,
    marginBottom: 5,
  },
  tip: {
    fontSize: 16,
    marginBottom: 5,
  },
  strokeOrder: {
    fontSize: 16,
    marginBottom: 5,
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});