import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import LevelUpModal from '../../../Components/LevelUp/LevelUpModal';

const PracticeLevelUp = ({ navigation, route }) => {
  const { level = 1 } = route.params || {};
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0099FF' : '#fff', // Nền xanh cho Dark Mode
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <LevelUpModal
        visible={true}
        level={level}
        rewards={[
          { icon: '📚', description: 'Mở khóa bài học mới' },
          { icon: '⭐', description: 'Nhận 100 sao' },
          { icon: '🎯', description: 'Mở khóa thử thách mới' },
        ]}
        onClose={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PracticeLevelUp;
