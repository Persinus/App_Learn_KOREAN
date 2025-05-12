import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { 
  consonantsSingle, 
  consonantsDouble, 
  vowelsSingle, 
  vowelsDouble 
} from '../../Test/data/alphabet';

const AlphabetLearningScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  
  let data = [];
  let title = '';
  
  switch (type) {
    case 'ConsonantsSingle':
      data = consonantsSingle;
      title = 'Phụ âm đơn';
      break;
    case 'ConsonantsDouble':
      data = consonantsDouble;
      title = 'Phụ âm đôi';
      break;
    case 'VowelsSingle':
      data = vowelsSingle;
      title = 'Nguyên âm đơn';
      break;
    case 'VowelsDouble':
      data = vowelsDouble;
      title = 'Nguyên âm đôi';
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {selectedLetter && (
        <View style={styles.detailContainer}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setSelectedLetter(null)}
          >
            <FontAwesome5 name="times" size={18} color="#666" />
          </TouchableOpacity>
          
          <View style={styles.letterCircle}>
            <Text style={styles.largeLetter}>{selectedLetter.letter}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.speakButton}
            onPress={() => speakLetter(selectedLetter.letter)}
          >
            <FontAwesome5 name={isSpeaking ? "volume-up" : "volume-up"} size={18} color="#fff" />
            <Text style={styles.speakButtonText}>Nghe phát âm</Text>
          </TouchableOpacity>
          
          <View style={styles.detailInfo}>
            <Text style={styles.detailLabel}>Tên:</Text>
            <Text style={styles.detailValue}>{selectedLetter.sound}</Text>
          </View>
          
          <View style={styles.detailInfo}>
            <Text style={styles.detailLabel}>Mẹo đọc:</Text>
            <Text style={styles.detailValue}>{selectedLetter.tip}</Text>
          </View>
          
          <View style={styles.detailInfo}>
            <Text style={styles.detailLabel}>Cách viết:</Text>
            <Text style={styles.detailValue}>{selectedLetter.strokeOrder}</Text>
          </View>
          
          <View style={styles.detailInfo}>
            <Text style={styles.detailLabel}>Ví dụ:</Text>
            <Text style={styles.detailValue}>{selectedLetter.example}</Text>
          </View>
        </View>
      )}

      <ScrollView style={styles.lettersList}>
        <View style={styles.lettersGrid}>
          {data.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.letterCard}
              onPress={() => setSelectedLetter(item)}
            >
              <Text style={styles.letterText}>{item.letter}</Text>
              <Text style={styles.letterName}>{item.sound}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Cách học hiệu quả</Text>
          <Text style={styles.infoText}>
            - Tập đọc từng chữ cái và phát âm đúng{'\n'}
            - Tập viết theo đúng thứ tự nét{'\n'}
            - Luyện tập kết hợp với nguyên âm / phụ âm
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
