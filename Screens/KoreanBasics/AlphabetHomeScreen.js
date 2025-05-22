import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import headerStyles from '../../Styles/HeaderStyles';

const translations = {
  vn: {
    welcome: "Chào mừng đến với khóa học",
    intro: "Hãy bắt đầu hành trình học tiếng Hàn của bạn với bảng chữ cái và từ vựng cơ bản!",
    alphabet: "Bảng chữ cái Hangeul",
    vocab: "Từ vựng cơ bản",
    consonantsSingle: "Phụ âm đơn",
    consonantsDouble: "Phụ âm đôi",
    vowelsSingle: "Nguyên âm đơn",
    vowelsDouble: "Nguyên âm đôi",
    vocabTopic: "Chủ đề từ vựng",
  },
  en: {
    welcome: "Welcome to the course",
    intro: "Start your Korean learning journey with the alphabet and basic vocabulary!",
    alphabet: "Hangeul Alphabet",
    vocab: "Basic Vocabulary",
    consonantsSingle: "Single Consonants",
    consonantsDouble: "Double Consonants",
    vowelsSingle: "Single Vowels",
    vowelsDouble: "Double Vowels",
    vocabTopic: "Vocabulary Topics",
  }
};

const AlphabetHomeScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
    },
    introTitle: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      fontWeight: 'bold',
    },
    introText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    sectionTitle: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderColor: isDarkMode ? '#FFD70033' : '#e3e7fd',
      borderWidth: 1.5,
      elevation: 3,
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      shadowOpacity: isDarkMode ? 0.08 : 0.12,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      fontWeight: 'bold',
    },
  };

  const sections = [
    {
      title: t.alphabet,
      items: [
        { type: 'ConsonantsSingle', label: t.consonantsSingle, icon: 'ㄱ' },
        { type: 'ConsonantsDouble', label: t.consonantsDouble, icon: 'ㄲ' },
        { type: 'VowelsSingle', label: t.vowelsSingle, icon: 'ㅏ' },
        { type: 'VowelsDouble', label: t.vowelsDouble, icon: 'ㅐ' },
      ]
    },
    {
      title: t.vocab,
      items: [
        { type: 'VocabularyTopicsScreen', label: t.vocabTopic, icon: '📚' },
      ]
    }
  ];

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <ScrollView style={styles.content}>
        <View style={styles.introContainer}>
          <Image 
            source={require('../../assets/illustration1.jpg')} 
            style={styles.introImage}
            resizeMode="contain"
          />
          <Text style={[styles.introTitle, dynamicStyles.introTitle]}>{t.welcome}</Text>
          <Text style={[styles.introText, dynamicStyles.introText]}>
            {t.intro}
          </Text>
        </View>

        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{section.title}</Text>
            <View style={styles.gridContainer}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.button, dynamicStyles.button]}
                  onPress={() => navigation.navigate(item.type)}
                >
                  <Text style={styles.buttonIcon}>{item.icon}</Text>
                  <Text style={[styles.buttonText, dynamicStyles.buttonText]}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  introContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  introImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});

export default AlphabetHomeScreen;
