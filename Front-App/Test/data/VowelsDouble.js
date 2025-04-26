// app/alphabet/VowelsDouble.js
import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { vowelsDouble } from '../data/alphabet';
import AlphabetDetail from '../Lythuyet/AlphabetDetail';

export default function VowelsDouble() {
    const [isSpeaking, setIsSpeaking] = useState(false);
  
    const speakLetter = (transliteration) => {
      if (isSpeaking) return;
      setIsSpeaking(true);
      
      // Sử dụng Speech.speak với tùy chỉnh tiếng Hàn và các thông số cao độ, tốc độ
      Speech.speak(`${transliteration}ㅏ`, {
        language: 'ko', // Tiếng Hàn
        pitch: 1.3,     // Cao độ giọng nói
        rate: 1.0,     // Tốc độ đọc
        onDone: () => setIsSpeaking(false),
      });
    };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nguyên âm đôi</Text>
      {vowelsDouble.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => speakLetter(item.letter)}>
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
