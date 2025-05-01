import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const InfoApp = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  const translations = {
    vn: {
      appInfo: 'Thông tin ứng dụng',
      introduction: 'Giới thiệu',
      description: 'Ứng dụng học tiếng Hàn thông minh, giúp người học tiếp cận ngôn ngữ Hàn Quốc một cách hiệu quả.',
      features: 'Tính năng',
      support: 'Hỗ trợ',
      email: 'support@koreanapp.com',
      website: 'www.koreanapp.com',
      version: 'Phiên bản 1.0.0',
      featuresList: [
        { icon: 'book', text: 'Bài học tương tác' },
        { icon: 'video', text: 'Học qua video' },
        { icon: 'gamepad', text: 'Trò chơi học tập' },
      ],
      copyright: '© 2024 Korean Learning App',
    },
    en: {
      appInfo: 'App Information',
      introduction: 'Introduction',
      description: 'A smart Korean learning app that helps learners effectively approach the Korean language.',
      features: 'Features',
      support: 'Support',
      email: 'support@koreanapp.com',
      website: 'www.koreanapp.com',
      version: 'Version 1.0.0',
      featuresList: [
        { icon: 'book', text: 'Interactive Lessons' },
        { icon: 'video', text: 'Learn through Videos' },
        { icon: 'gamepad', text: 'Educational Games' },
      ],
      copyright: '© 2024 Korean Learning App',
    },
  };

  const t = translations[language];

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#0099FF' : '#fff',
    },
    header: {
      backgroundColor: isDarkMode ? '#6666FF' : '#fff',
      borderBottomColor: isDarkMode ? '#444' : '#eee',
    },
    headerTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    appInfoCard: {
      backgroundColor: isDarkMode ? '#6666FF' : '#fff',
      shadowColor: isDarkMode ? '#000' : '#000',
    },
    appName: {
      color: isDarkMode ? '#fff' : '#333',
    },
    version: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    sectionTitle: {
      color: isDarkMode ? '#fff' : '#4b46f1',
    },
    description: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    featureText: {
      color: isDarkMode ? '#fff' : '#444',
    },
    contactText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    copyright: {
      color: isDarkMode ? '#ccc' : '#999',
      borderTopColor: isDarkMode ? '#444' : '#eee',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.header, dynamicStyles.header]}>
        <View style={styles.headerMain}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={16} color={isDarkMode ? '#fff' : '#4b46f1'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>{t.appInfo}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.appInfoCard, dynamicStyles.appInfoCard]}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.appLogo}
          />
          <Text style={[styles.appName, dynamicStyles.appName]}>Korean Learning App</Text>
          <Text style={[styles.version, dynamicStyles.version]}>{t.version}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{t.introduction}</Text>
            <Text style={[styles.description, dynamicStyles.description]}>{t.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{t.features}</Text>
            {t.featuresList.map((item, index) => (
              <View key={index} style={styles.featureItem}>
                <FontAwesome5 name={item.icon} size={18} color={isDarkMode ? '#fff' : '#4b46f1'} />
                <Text style={[styles.featureText, dynamicStyles.featureText]}>{item.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{t.support}</Text>
            <View style={styles.contactItem}>
              <FontAwesome5 name="envelope" size={18} color={isDarkMode ? '#fff' : '#4b46f1'} style={styles.contactIcon} />
              <Text style={[styles.contactText, dynamicStyles.contactText]}>{t.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <FontAwesome5 name="globe" size={18} color={isDarkMode ? '#fff' : '#4b46f1'} style={styles.contactIcon} />
              <Text style={[styles.contactText, dynamicStyles.contactText]}>{t.website}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Text style={[styles.copyright, dynamicStyles.copyright]}>
        {t.copyright}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 45,
    borderBottomWidth: 1,
  },
  headerMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  appInfoCard: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  appLogo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
  },
  infoContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 15,
    marginLeft: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  contactIcon: {
    width: 25,
  },
  contactText: {
    fontSize: 15,
  },
  copyright: {
    textAlign: 'center',
    padding: 15,
    fontSize: 13,
    borderTopWidth: 1,
  },
});

export default InfoApp;
