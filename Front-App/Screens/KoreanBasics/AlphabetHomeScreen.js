import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import headerStyles from '../../Styles/HeaderStyles';

const AlphabetHomeScreen = ({ navigation }) => {
  const sections = [
    {
      title: 'Bảng chữ cái Hangeul',
      items: [
        { type: 'ConsonantsSingle', label: 'Phụ âm đơn', icon: 'ㄱ' },
        { type: 'ConsonantsDouble', label: 'Phụ âm đôi', icon: 'ㄲ' },
        { type: 'VowelsSingle', label: 'Nguyên âm đơn', icon: 'ㅏ' },
        { type: 'VowelsDouble', label: 'Nguyên âm đôi', icon: 'ㅐ' },
      ]
    },
    {
      title: 'Từ vựng cơ bản',
      items: [
        { type: 'VocabularyTopicsScreen', label: 'Chủ đề từ vựng', icon: '📚' },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <View style={headerStyles.container}>
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#4b46f1" />
        </TouchableOpacity>
        <Text style={headerStyles.title}>Nhập môn tiếng Hàn</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.introContainer}>
          <Image 
            source={require('../../assets/illustration1.png')} 
            style={styles.introImage}
            resizeMode="contain"
          />
          <Text style={styles.introTitle}>Chào mừng đến với khóa học</Text>
          <Text style={styles.introText}>
            Hãy bắt đầu hành trình học tiếng Hàn của bạn với bảng chữ cái và từ vựng cơ bản!
          </Text>
        </View>

        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.gridContainer}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.button}
                  onPress={() => navigation.navigate(item.type)}
                >
                  <Text style={styles.buttonIcon}>{item.icon}</Text>
                  <Text style={styles.buttonText}>{item.label}</Text>
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
