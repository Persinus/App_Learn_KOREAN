import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';

const translations = {
  vn: {
    comingSoon: 'Tính năng đang phát triển',
    desc: 'Chức năng này sẽ sớm ra mắt. Vui lòng quay lại sau!',
  },
  en: {
    comingSoon: 'Feature Coming Soon',
    desc: 'This feature is under development. Please check back later!',
  },
};

const ComingSoon = () => {
  const isDarkMode = useSelector(state => state.darkMode.isDarkMode);
  const language = useSelector(state => state.language.language);
  const t = translations[language] || translations.vn;

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#121212' : '#fff' }
    ]}>
      <View style={styles.iconBox}>
        <FontAwesome5 name="tools" size={56} color={isDarkMode ? '#FFD700' : '#4b46f1'} />
      </View>
      <Text style={[
        styles.title,
        { color: isDarkMode ? '#FFD700' : '#4b46f1' }
      ]}>
        {t.comingSoon}
      </Text>
      <Text style={[
        styles.desc,
        { color: isDarkMode ? '#ccc' : '#666' }
      ]}>
        {t.desc}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  iconBox: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ComingSoon;