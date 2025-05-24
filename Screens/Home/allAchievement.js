import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BASE_API_URL from '../../Util/Baseapi';

const AllAchievementsScreen = ({ navigation }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  // Đa ngôn ngữ
  const translations = {
    vn: {
      allAchievements: '🎖️ Tất cả thành tựu',
      loading: 'Đang tải...',
      requirement: 'Yêu cầu',
      level: 'Cấp',
      gold: 'Vàng',
      close: 'Đóng',
    },
    en: {
      allAchievements: '🎖️ All Achievements',
      loading: 'Loading...',
      requirement: 'Requirement',
      level: 'Level',
      gold: 'Gold',
      close: 'Close',
    },
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}achievements`);
        setAchievements(data);
        // Log tên các thành tựu ngắn gọn ra console
        if (Array.isArray(data)) {
          console.log("Tên các thành tựu:", data.map(a => a.title).join(", "));
        }
      } catch (error) {
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    card: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      shadowColor: isDarkMode ? '#000' : '#aaa',
    },
    title: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    desc: {
      color: isDarkMode ? '#ccc' : '#666',
    },
  };

  const renderAchievement = ({ item }) => (
    <View style={[styles.achievementItem, dynamicStyles.card]}>
      <View style={styles.iconWrapper}>
        <Image source={{ uri: item.icon }} style={styles.iconImage} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.achievementTitle, dynamicStyles.title]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.achievementDesc, dynamicStyles.desc]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.rewardRow}>
          <Text style={styles.rewardText}>🪙 {item.reward?.gold || 0} {translations[language].gold}</Text>
        </View>
        {item.requirement?.level && (
          <Text style={styles.requirementText}>
            {translations[language].requirement}: {translations[language].level} {item.requirement.level}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 18 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{translations[language].allAchievements}</Text>
        <View style={{ width: 32 }} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={achievements}
          renderItem={renderAchievement}
          keyExtractor={item => item.achievementId.toString()}
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  iconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 13,
    marginBottom: 6,
  },
  rewardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 2,
  },
  rewardText: {
    fontSize: 12,
    color: '#FFD700',
    marginRight: 8,
  },
  requirementText: {
    fontSize: 12,
    color: '#888',
  },
});

export default AllAchievementsScreen;