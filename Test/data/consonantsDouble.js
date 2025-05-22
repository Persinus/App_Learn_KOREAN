// app/alphabet/ConsonantsDouble.js
import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import * as Speech from 'expo-speech';
import { consonantsDouble } from '../data/alphabet';
import AlphabetDetail from '../Lythuyet/AlphabetDetail';

const translations = {
  vn: {
    title: "Phụ âm đôi",
  },
  en: {
    title: "Double Consonants",
  }
};

export default function ConsonantsDouble() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const language = useSelector((state) => state.language.currentLanguage);

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
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
        {translations[language]?.title || translations.vn.title}
      </Text>
      {consonantsDouble.map((item, index) => (
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
  darkContainer: { backgroundColor: '#333' },
  darkTitle: { color: '#fff' },
});
