import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Achievement = ({ onPress }) => {
  const achievements = [
    {
      id: 1,
      title: 'Siêng Năng',
      progress: 5,
      total: 7,
      icon: 'calendar-check',
      color: '#4CAF50',
    },
    {
      id: 2,
      title: 'Từ Vựng',
      progress: 45,
      total: 100,
      icon: 'book-reader',
      color: '#2196F3',
    },
    {
      id: 3,
      title: 'Phát Âm',
      progress: 20,
      total: 50,
      icon: 'microphone',
      color: '#FF9800',
    },
  ];

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0099FF' : '#fff', // Nền xanh cho Dark Mode
    },
    title: {
      color: isDarkMode ? '#fff' : '#333',
    },
    viewAll: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    progressBar: {
      backgroundColor: isDarkMode ? '#444' : '#f0f0f0',
    },
    progressText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
  };

  const renderAchievement = ({ item }) => (
    <TouchableOpacity
      style={styles.achievementItem}
      onPress={() => onPress(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <FontAwesome5 name={item.icon} size={14} color="#fff" />
      </View>
      <View style={[styles.progressBar, dynamicStyles.progressBar]}>
        <View
          style={[
            styles.progress,
            {
              width: `${(item.progress / item.total) * 100}%`,
              backgroundColor: item.color,
            },
          ]}
        />
      </View>
      <Text style={[styles.progressText, dynamicStyles.progressText]}>
        {item.progress}/{item.total}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <Text style={[styles.title, dynamicStyles.title]}>🏆 Thành tựu</Text>
        <TouchableOpacity onPress={() => onPress('all')}>
          <Text style={[styles.viewAll, dynamicStyles.viewAll]}>Tất cả</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={achievements}
        renderItem={renderAchievement}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewAll: {
    fontSize: 13,
  },
  achievementItem: {
    width: 100,
    marginRight: 12,
    alignItems: 'center',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 3,
    borderRadius: 2,
    marginBottom: 4,
  },
  progress: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
  },
});

export default Achievement;
