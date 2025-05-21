// app/alphabet/ConsonantsSingle.js
import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { consonantsSingle } from '../data/alphabet';
import AlphabetDetail from '../Lythuyet/AlphabetDetail';

export default function ConsonantsSingle() {
    const [isSpeaking, setIsSpeaking] = useState(false);
  
    const speakLetter = (transliteration) => {
      if (isSpeaking) return;
      setIsSpeaking(true);
      
      // Sử dụng Speech.speak với tùy chỉnh tiếng Hàn và các thông số cao độ, tốc độ
      Speech.speak(`${transliteration}ㅏ`, {
        language: 'ko', // Tiếng Hàn
        pitch: 1.5,     // Cao độ giọng nói
        rate: 0.99,     // Tốc độ đọc
        onDone: () => setIsSpeaking(false),
      });
    };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Phụ âm đơn</Text>
      {consonantsSingle.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => speakLetter(item.transliteration)}>
          <AlphabetDetail
            letter={item.letter}
            sound={item.sound}
            tip={item.tip}
            strokeOrder={item.strokeOrder}
            example={item.example}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
});
