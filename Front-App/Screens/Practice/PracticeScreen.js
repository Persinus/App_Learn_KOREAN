import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Audio } from 'expo-av';

const PracticeScreen = ({ navigation }) => {
  const practiceOptions = [
    {
      title: "Bài Học",
      description: "Học Bài",
      icon: require('../../assets/avatar1.png'), // Replace with your image path
      onPress: () => console.log("Bài học Pressed"),
    },
    {
      
      title: "Flashcards",
      description: "Học từ vựng dễ dàng qua thẻ nhớ",
      icon: require('../../assets/avatar1.png'), // Replace with your image path
      onPress: () => console.log("Flashcards Pressed"),
    },
    {
      title: "Câu hỏi trắc nghiệm",
      description: "Kiểm tra kiến thức với các câu hỏi thú vị",
      icon: require('../../assets/avatar1.png'), // Replace with your image path
      onPress: () => console.log("Quiz Pressed"),
    },

    {
      title: "Nghe hiểu",
      description: "Luyện nghe qua đoạn hội thoại thực tế",
      icon: require('../../assets/avatar1.png'), // Replace with your image path
      onPress: () => console.log("Listening Pressed"),
    },
    {
      title: "Xem Video / Âm nhạc",
      description: "Học tiếng Hàn qua video và bài hát",
      icon: require('../../assets/avatar1.png'), // Replace with your image path
      onPress: () => navigation.navigate('VideoListScreen'),
    },
    {
      title: "Trò chơi",
      description: "Thử sức với các trò chơi thú vị",
      icon: require('../../assets/avatar1.png'), // Replace with your image path
      onPress: () => navigation.navigate('DetailGameScreen'),
    },
  ];

  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require('../../assets/reward-sound.mp3')); // Thay bằng đường dẫn tới file âm thanh của bạn
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🎯 Luyện tập tiếng Hàn</Text>
      <Text style={styles.subHeader}>
        Tận hưởng các bài học thú vị và thực hành qua các công cụ hấp dẫn!
      </Text>

      <View style={styles.grid}>
        {practiceOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={option.onPress}
            activeOpacity={0.8}
          >
            <Image source={option.icon} style={styles.icon} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{option.title}</Text>
              <Text style={styles.cardDesc}>{option.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Nút phát âm thanh */}
        <TouchableOpacity style={styles.playButton} onPress={playSound}>
          <Text style={styles.playButtonText}>🔊 Phát âm thanh</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>© 2025 Your App Name</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4b46f1',
    textAlign: 'center',
    marginVertical: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#4b46f1',
    borderRadius: 16,
    marginVertical: 10,
    width: '48%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    transform: [{ scale: 1 }],
    transition: 'transform 0.2s',
  },
  cardHovered: {
    transform: [{ scale: 1.05 }],
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDesc: {
    color: '#dcdcfb',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default PracticeScreen;