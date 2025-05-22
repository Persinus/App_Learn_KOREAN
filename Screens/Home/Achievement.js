import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BASE_API_URL from '../../Util/Baseapi';
import { useNavigation } from '@react-navigation/native';

const Achievement = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language); // Lấy ngôn ngữ
  const navigation = useNavigation();

  // Đa ngôn ngữ
  const translations = {
    vn: {
      achievement: '🏆 Thành tựu',
      all: 'Tất cả',
      loading: 'Đang tải...',
    },
    en: {
      achievement: '🏆 Achievements',
      all: 'All',
      loading: 'Loading...',
    }
  };
  const t = translations[language] || translations.vn;

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
      borderRadius: 18,
    },
    title: {
      color: isDarkMode ? '#fff' : '#4b46f1',
      fontWeight: 'bold',
    },
    viewAll: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      borderColor: isDarkMode ? '#FFD70033' : '#e3e7fd',
      borderWidth: 1.5,
      elevation: 4,
    },
    progressText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}achievements`);
        setAchievements(data);
      } catch (error) {
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const renderAchievement = ({ item }) => (
    <TouchableOpacity
      style={[styles.achievementItem, dynamicStyles.card]}
      onPress={() => navigation.navigate('all')}
      activeOpacity={0.8}
    >
      <View style={styles.iconWrapper}>
        <Image source={{ uri: item.icon }} style={styles.iconImage} />
      </View>
      <Text style={[styles.achievementTitle, dynamicStyles.title]} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={[styles.achievementDesc, dynamicStyles.progressText]} numberOfLines={2}>
        {item.description}
      </Text>
      {item.gold && (
        <View style={styles.rewardRow}>
          <Text style={styles.goldEmoji}>🪙</Text>
          <Text style={styles.goldValue}>{item.gold}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <Text style={[styles.title, dynamicStyles.title]}>{t.achievement}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('all')}>
          <Text style={[styles.viewAll, dynamicStyles.viewAll]}>{t.all}</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        <FlatList
          data={achievements.slice(0, 6)}
          renderItem={renderAchievement}
          keyExtractor={(item, index) =>
            item.achievementId ? item.achievementId.toString() + index : index.toString()
          }
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
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
    fontWeight: 'bold',
  },
  achievementItem: {
    width: 130,
    marginRight: 16,
    alignItems: 'center',
    borderRadius: 18,
    padding: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FFD70033',
    marginBottom: 8,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  iconImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 12,
    textAlign: 'center',
    minHeight: 32,
    marginBottom: 6,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  goldEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  goldValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});

export default Achievement;
