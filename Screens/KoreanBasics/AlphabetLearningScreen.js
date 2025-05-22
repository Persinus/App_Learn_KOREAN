import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useSelector } from "react-redux";
import { 
  consonantsSingle, 
  consonantsDouble, 
  vowelsSingle, 
  vowelsDouble 
} from '../../Test/data/alphabet';

const translations = {
  vn: {
    consonantsSingle: "Phụ âm đơn",
    consonantsDouble: "Phụ âm đôi",
    vowelsSingle: "Nguyên âm đơn",
    vowelsDouble: "Nguyên âm đôi",
    sound: "Tên",
    tip: "Mẹo đọc",
    strokeOrder: "Cách viết",
    example: "Ví dụ",
    listen: "Nghe phát âm",
    guideTitle: "Cách học hiệu quả",
    guideText: "- Tập đọc từng chữ cái và phát âm đúng\n- Tập viết theo đúng thứ tự nét\n- Luyện tập kết hợp với nguyên âm / phụ âm",
  },
  en: {
    consonantsSingle: "Single Consonants",
    consonantsDouble: "Double Consonants",
    vowelsSingle: "Single Vowels",
    vowelsDouble: "Double Vowels",
    sound: "Name",
    tip: "Tip",
    strokeOrder: "Stroke Order",
    example: "Example",
    listen: "Listen",
    guideTitle: "Effective Learning Tips",
    guideText: "- Practice reading each letter and correct pronunciation\n- Practice writing in the correct stroke order\n- Combine practice with vowels/consonants",
  }
};

const AlphabetLearningScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  let data = [];
  let title = '';
  
  switch (type) {
    case 'ConsonantsSingle':
      data = consonantsSingle;
      title = t.consonantsSingle;
      break;
    case 'ConsonantsDouble':
      data = consonantsDouble;
      title = t.consonantsDouble;
      break;
    case 'VowelsSingle':
      data = vowelsSingle;
      title = t.vowelsSingle;
      break;
    case 'VowelsDouble':
      data = vowelsDouble;
      title = t.vowelsDouble;
      break;
  }

  const speakLetter = (letter) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    
    Speech.speak(letter, {
      language: 'ko',
      pitch: 1.0,
      rate: 0.8,
      onDone: () => setIsSpeaking(false),
    });
  };

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? "#121212" : "#f4f7ff",
    },
    header: {
      backgroundColor: isDarkMode ? "#232323" : "#5271FF",
    },
    headerTitle: {
      color: isDarkMode ? "#FFD700" : "#fff",
    },
    letterCard: {
      backgroundColor: isDarkMode ? "#232323" : "#fff",
      borderColor: isDarkMode ? "#FFD70033" : "#e3e7fd",
      borderWidth: 1.5,
      elevation: 2,
      shadowColor: isDarkMode ? "#000" : "#4b46f1",
      shadowOpacity: isDarkMode ? 0.08 : 0.12,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    letterText: {
      color: isDarkMode ? "#FFD700" : "#333",
    },
    letterName: {
      color: isDarkMode ? "#ccc" : "#666",
    },
    detailContainer: {
      backgroundColor: isDarkMode ? "#232323" : "#fff",
      borderColor: isDarkMode ? "#FFD70033" : "#e3e7fd",
      borderWidth: 1.5,
      elevation: 3,
      shadowColor: isDarkMode ? "#000" : "#4b46f1",
      shadowOpacity: isDarkMode ? 0.08 : 0.12,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    letterCircle: {
      backgroundColor: isDarkMode ? "#333" : "#f0f0f0",
    },
    largeLetter: {
      color: isDarkMode ? "#FFD700" : "#333",
    },
    speakButton: {
      backgroundColor: isDarkMode ? "#FFD700" : "#5271FF",
    },
    speakButtonText: {
      color: isDarkMode ? "#232323" : "#fff",
    },
    detailLabel: {
      color: isDarkMode ? "#FFD700" : "#444",
    },
    detailValue: {
      color: isDarkMode ? "#ccc" : "#666",
    },
    infoBox: {
      backgroundColor: isDarkMode ? "#232323" : "#e1f5fe",
      borderLeftColor: isDarkMode ? "#FFD700" : "#03a9f4",
    },
    infoTitle: {
      color: isDarkMode ? "#FFD700" : "#01579b",
    },
    infoText: {
      color: isDarkMode ? "#fff" : "#333",
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>{title}</Text>
      </View>

      {selectedLetter && (
        <View style={[styles.detailContainer, dynamicStyles.detailContainer]}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedLetter(null)}
          >
            <FontAwesome5 name="times" size={18} color="#666" />
          </TouchableOpacity>
          
          <View style={[styles.letterCircle, dynamicStyles.letterCircle]}>
            <Text style={[styles.largeLetter, dynamicStyles.largeLetter]}>{selectedLetter.letter}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.speakButton, dynamicStyles.speakButton]}
            onPress={() => speakLetter(selectedLetter.letter)}
          >
            <FontAwesome5 name="volume-up" size={18} color={isDarkMode ? "#232323" : "#fff"} />
            <Text style={[styles.speakButtonText, dynamicStyles.speakButtonText]}>{t.listen}</Text>
          </TouchableOpacity>
          
          <View style={styles.detailInfo}>
            <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>{t.sound}:</Text>
            <Text style={[styles.detailValue, dynamicStyles.detailValue]}>{selectedLetter.sound}</Text>
          </View>
          
          <View style={styles.detailInfo}>
            <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>{t.tip}:</Text>
            <Text style={[styles.detailValue, dynamicStyles.detailValue]}>{selectedLetter.tip}</Text>
          </View>
          
          <View style={styles.detailInfo}>
            <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>{t.strokeOrder}:</Text>
            <Text style={[styles.detailValue, dynamicStyles.detailValue]}>{selectedLetter.strokeOrder}</Text>
          </View>
          
          <View style={styles.detailInfo}>
            <Text style={[styles.detailLabel, dynamicStyles.detailLabel]}>{t.example}:</Text>
            <Text style={[styles.detailValue, dynamicStyles.detailValue]}>{selectedLetter.example}</Text>
          </View>
        </View>
      )}

      <ScrollView style={styles.lettersList}>
        <View style={styles.lettersGrid}>
          {data.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.letterCard, dynamicStyles.letterCard]}
              onPress={() => setSelectedLetter(item)}
            >
              <Text style={[styles.letterText, dynamicStyles.letterText]}>{item.letter}</Text>
              <Text style={[styles.letterName, dynamicStyles.letterName]}>{item.sound}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={[styles.infoBox, dynamicStyles.infoBox]}>
          <Text style={[styles.infoTitle, dynamicStyles.infoTitle]}>{t.guideTitle}</Text>
          <Text style={[styles.infoText, dynamicStyles.infoText]}>
            {t.guideText}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 16,
    backgroundColor: '#5271FF',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  lettersList: {
    flex: 1,
  },
  lettersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  letterCard: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    margin: '1%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    padding: 4,
  },
  letterText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  letterName: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  detailContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    elevation: 3,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    zIndex: 10,
  },
  letterCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  largeLetter: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333',
  },
  speakButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5271FF',
    padding: 12,
    borderRadius: 25,
    marginBottom: 20,
  },
  speakButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  detailInfo: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    width: 80,
    fontWeight: 'bold',
    color: '#444',
    fontSize: 14,
  },
  detailValue: {
    flex: 1,
    color: '#666',
    fontSize: 14,
  },
  infoBox: {
    margin: 16,
    padding: 16,
    backgroundColor: '#e1f5fe',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#03a9f4',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#01579b',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default AlphabetLearningScreen;
