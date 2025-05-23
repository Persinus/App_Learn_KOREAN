import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BASE_API_URL from '../../Util/Baseapi';
import { useNavigation } from '@react-navigation/native';

const DailyMission = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  // Đa ngôn ngữ
  const translations = {
    vn: {
      today: '🎯 Nhiệm vụ hôm nay',
      all: 'Tất cả',
      gold: 'vàng',
    },
    en: {
      today: '🎯 Today\'s Missions',
      all: 'All',
      gold: 'gold',
    }
  };
  const t = translations[language] || translations.vn;

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#232323' : '#f4f3',
      borderColor: isDarkMode ? '#FFD70033' : '#e3e7fd',
    },
    title: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      fontWeight: 'bold',
    },
    missionTitle: {
      color: isDarkMode ? '#fff' : '#4b46f1',
      fontWeight: 'bold',
    },
    missionReward: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      fontWeight: 'bold',
    },
    progressText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    rewards: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
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

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <Text style={[styles.title, dynamicStyles.title]}>{t.today}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllDailyMission')}>
          <Text style={[styles.viewAll, dynamicStyles.rewards]}>{t.all}</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="small" color="#FFD700" />
      ) : (
        <>
          {missions.slice(0, 3).map((mission) => (
            <TouchableOpacity
              key={mission.missionId}
              style={styles.missionItem}
              onPress={() => navigation.navigate('AllDailyMission')}
            >
              <View style={styles.missionContent}>
                <Text style={[styles.missionTitle, dynamicStyles.missionTitle]}>{mission.title}</Text>
                <View style={styles.rewardBtn}>
                  <Text style={[styles.missionReward, dynamicStyles.missionReward]}>
                    🪙 {mission.reward?.gold || 0} {t.gold}
                  </Text>
                </View>
              </View>
              <Text style={[styles.progressText, dynamicStyles.progressText]}>
                {mission.description}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
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
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: '#FFD70022',
  },
  missionItem: {
    marginBottom: 12,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#fff0',
  },
  missionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  missionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  rewardBtn: {
    backgroundColor: '#FFF5CC',
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

export default DailyMission;
