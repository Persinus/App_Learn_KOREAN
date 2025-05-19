// app/alphabet/ConsonantsDouble.js
import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Speech from 'expo-speech';
import { consonantsDouble } from '../data/alphabet';
import AlphabetDetail from '../Lythuyet/AlphabetDetail';

export default function ConsonantsDouble() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const COLORS = [
    '#FF6B6B', // Red
    '#FFD93D', // Yellow
    '#6BCB77', // Green
    '#4D96FF', // Blue
    '#9A77CF', // Purple
    '#FF9F68', // Orange
    '#3DC9D6', // Cyan
  ];

  const getCardColor = (index) => COLORS[index % COLORS.length];

  const brightenColor = (color) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = 30; // Brightness increase factor
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `rgb(${R}, ${G}, ${B})`;
  };

  const speakLetter = (transliteration, index) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    setSelectedCardIndex(index);

    Speech.speak(`${transliteration}ㅏ`, {
      language: 'ko',
      pitch: 1.5,
      rate: 0.99,
      onDone: () => setIsSpeaking(false),
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nguyên Âm đôi</Text>
      <View style={styles.cardContainer}>
        {consonantsDouble.map((item, index) => {
          const cardColor = getCardColor(index);
          const isSelected = selectedCardIndex === index;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => speakLetter(item.transliteration, index)}
              style={[
                styles.card,
                {
                  backgroundColor: isSelected ? brightenColor(cardColor) : cardColor,
                  shadowColor: isSelected ? brightenColor(cardColor) : '#000',
                },
                isSelected && styles.cardSelected, // Highlight style
              ]}
            >
              <View style={styles.cardContent}>
                <Text style={[styles.letter, isSelected && styles.letterSelected]}>
                  {item.letter}
                </Text>
                <View style={styles.divider} />
                <Text style={styles.sound}>{item.sound}</Text>
                <View style={styles.divider} />
                <Text style={styles.tip}>{item.tip}</Text>
                <View style={styles.divider} />
                <Text style={styles.example}>{item.example}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#F3F4F6', // Light gray background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937', // Dark gray for title
    marginBottom: 25,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 15, // Smooth rounded corners
    padding: 16,
    marginBottom: 20,
    width: '48%', // Two cards per row
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  cardSelected: {
    shadowOpacity: 0.6, // Stronger shadow for glow effect
    shadowRadius: 15, // Larger shadow for a glow effect
    transform: [{ scale: 1.1 }], // Scale up the selected card
    borderWidth: 3,
    borderColor: '#FFFFFF', // Add a white border for extra emphasis
  },
  cardContent: {
    alignItems: 'center',
  },
  letter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    textAlign: 'center',
  },
  letterSelected: {
    color: '#FFFFFF', // Bright white for selected letters
    textShadowColor: '#000000', // Add a shadow to make the letter pop
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  sound: {
    fontSize: 18,
    fontWeight: '500',
    color: '#F8F9FA', // Slightly lighter text
    textAlign: 'center',
  },
  tip: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#E2E8F0', // Light grayish-white text for tips
    textAlign: 'center',
  },
  example: {
    fontSize: 14,
    color: '#D1D5DB', // Subtle text for examples
    textAlign: 'center',
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#FFFFFF', // White divider
    marginVertical: 8,
    opacity: 0.4, // Subtle divider effect
  },
});
