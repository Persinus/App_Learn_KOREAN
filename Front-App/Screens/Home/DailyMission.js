import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const DailyMission = ({ onPress }) => {
  const missions = [
    { id: 1, title: 'Học 5 từ mới', progress: 3, total: 5, reward: 10 },
    { id: 2, title: 'Hoàn thành 1 bài nghe', progress: 0, total: 1, reward: 15 },
    { id: 3, title: 'Luyện phát âm 10 phút', progress: 5, total: 10, reward: 20 },
  ];

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0099FF' : '#fff', // Nền xanh cho Dark Mode
      borderColor: isDarkMode ? '#444' : '#eee',
    },
    title: {
      color: isDarkMode ? '#fff' : '#333',
    },
    rewards: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    missionTitle: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    missionReward: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    progressBar: {
      backgroundColor: isDarkMode ? '#444' : '#f0f0f0',
    },
    progress: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    progressText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <Text style={[styles.title, dynamicStyles.title]}>🎯 Nhiệm vụ hôm nay</Text>
        <Text style={[styles.rewards, dynamicStyles.rewards]}>+45 điểm</Text>
      </View>

      {missions.map((mission) => (
        <TouchableOpacity
          key={mission.id}
          style={styles.missionItem}
          onPress={() => onPress(mission)}
        >
          <View style={styles.missionContent}>
            <Text style={[styles.missionTitle, dynamicStyles.missionTitle]}>{mission.title}</Text>
            <Text style={[styles.missionReward, dynamicStyles.missionReward]}>+{mission.reward}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, dynamicStyles.progressBar]}>
              <View
                style={[
                  styles.progress,
                  dynamicStyles.progress,
                  { width: `${(mission.progress / mission.total) * 100}%` },
                ]}
              />
            </View>
            <Text style={[styles.progressText, dynamicStyles.progressText]}>
              {mission.progress}/{mission.total}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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
  rewards: {
    fontSize: 14,
    fontWeight: '600',
  },
  missionItem: {
    marginBottom: 12,
  },
  missionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  missionTitle: {
    fontSize: 14,
  },
  missionReward: {
    fontSize: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  progress: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    width: 35,
  },
});

export default DailyMission;
