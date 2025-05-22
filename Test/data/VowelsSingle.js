import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import * as Speech from 'expo-speech';
import { vowelsSingle } from '../data/alphabet';
import AlphabetDetail from '../Lythuyet/AlphabetDetail';

const translations = {
  vn: { title: "Nguyên âm đơn" },
  en: { title: "Single Vowels" }
};

export default function VowelsSingleSingle() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const dynamicStyles = {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
  };

  const speakLetter = (transliteration) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    Speech.speak(`${transliteration}ㅏ`, {
      language: 'ko',
      pitch: 1.5,
      rate: 0.99,
      onDone: () => setIsSpeaking(false),
    });
  };

  return (
    <ScrollView style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>{t.title}</Text>
      {vowelsSingle.map((item, index) => (
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