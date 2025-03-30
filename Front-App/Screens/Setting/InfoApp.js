import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const InfoApp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerMain}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={16} color="#4b46f1" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thông tin ứng dụng</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.appInfoCard}>
          <Image 
            source={require('../../assets/logo.png')}
            style={styles.appLogo}
          />
          <Text style={styles.appName}>Korean Learning App</Text>
          <Text style={styles.version}>Phiên bản 1.0.0</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Giới thiệu</Text>
            <Text style={styles.description}>
              Ứng dụng học tiếng Hàn thông minh, giúp người học tiếp cận ngôn ngữ Hàn Quốc một cách hiệu quả.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tính năng</Text>
            {[
              {icon: 'book', text: 'Bài học tương tác'},
              {icon: 'video', text: 'Học qua video'},
              {icon: 'gamepad', text: 'Trò chơi học tập'}
            ].map((item, index) => (
              <View key={index} style={styles.featureItem}>
                <FontAwesome5 name={item.icon} size={18} color="#4b46f1" />
                <Text style={styles.featureText}>{item.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hỗ trợ</Text>
            <View style={styles.contactItem}>
              <FontAwesome5 name="envelope" size={18} color="#4b46f1" style={styles.contactIcon} />
              <Text style={styles.contactText}>support@koreanapp.com</Text>
            </View>
            <View style={styles.contactItem}>
              <FontAwesome5 name="globe" size={18} color="#4b46f1" style={styles.contactIcon} />
              <Text style={styles.contactText}>www.koreanapp.com</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Text style={styles.copyright}>© 2024 Korean Learning App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    paddingTop: 45,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    color: '#333',
  },
  content: {
    flex: 1,
  },
  appInfoCard: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
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
    color: '#333',
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    color: '#666',
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
    color: '#4b46f1',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 15,
    color: '#444',
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
    color: '#666',
  },
  copyright: {
    textAlign: 'center',
    padding: 15,
    color: '#999',
    fontSize: 13,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default InfoApp;
