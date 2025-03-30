import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ProgressBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const DailyMission = ({ onPress }) => {
  const missions = [
    { id: 1, title: 'Học 5 từ mới', progress: 3, total: 5, reward: 10 },
    { id: 2, title: 'Hoàn thành 1 bài nghe', progress: 0, total: 1, reward: 15 },
    { id: 3, title: 'Luyện phát âm 10 phút', progress: 5, total: 10, reward: 20 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎯 Nhiệm vụ hôm nay</Text>
        <Text style={styles.rewards}>+45 điểm</Text>
      </View>
      
      {missions.map((mission) => (
        <TouchableOpacity 
          key={mission.id} 
          style={styles.missionItem}
          onPress={() => onPress(mission)}
        >
          <View style={styles.missionContent}>
            <Text style={styles.missionTitle}>{mission.title}</Text>
            <Text style={styles.missionReward}>+{mission.reward}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progress, 
                  { width: `${(mission.progress / mission.total) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
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
    color: '#333',
  },
  rewards: {
    fontSize: 14,
    color: '#4b46f1',
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
    color: '#666',
  },
  missionReward: {
    fontSize: 12,
    color: '#4b46f1',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginRight: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4b46f1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    width: 35,
  },
});

export default DailyMission;
