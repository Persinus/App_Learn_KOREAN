import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BASE_API_URL from '../../Util/Baseapi';

const AllDailyMission = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Đa ngôn ngữ
  const translations = {
    vn: {
      allMissions: '🎯 Tất cả nhiệm vụ',
      gold: 'vàng',
      close: 'Đóng',
      expired: 'Hết hạn',
      unknown: 'Không rõ',
    },
    en: {
      allMissions: '🎯 All Missions',
      gold: 'gold',
      close: 'Close',
      expired: 'Expires',
      unknown: 'Unknown',
    }
  };
  const t = translations[language] || translations.vn;

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
    },
    title: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    missionTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    missionReward: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    progressText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
  };

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}daily-missions`);
        setMissions(data);
      } catch (error) {
        setMissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMissions();
  }, []);

  const renderMission = ({ item }) => (
    <View style={styles.missionItem}>
      <View style={styles.missionContent}>
        <Text style={[styles.missionTitle, dynamicStyles.missionTitle]}>{item.title}</Text>
        <View style={styles.rewardBtn}>
          <Text style={[styles.missionReward, dynamicStyles.missionReward]}>
            🪙 {item.reward?.gold || 0} {t.gold}
          </Text>
        </View>
      </View>
      <Text style={[styles.progressText, dynamicStyles.progressText]}>
        {item.description}
      </Text>
      <Text style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>
        {t.expired}: {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : t.unknown}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      
      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={missions}
          renderItem={renderMission}
          keyExtractor={item => item.missionId}
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
  missionItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#FFF5CC',
    elevation: 2,
  },
  missionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  missionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  rewardBtn: {
    backgroundColor: '#FFD70033',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  missionReward: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default AllDailyMission;