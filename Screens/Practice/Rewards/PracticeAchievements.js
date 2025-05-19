import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const PracticeAchievements = ({ navigation }) => {
  const achievements = [
    { id: 1, title: 'Hoàn thành bài học đầu tiên', progress: 1, total: 1, unlocked: true },
    { id: 2, title: 'Đạt 3 ngày học liên tiếp', progress: 2, total: 3, unlocked: false },
    { id: 3, title: 'Hoàn thành 5 bài kiểm tra', progress: 3, total: 5, unlocked: false }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Thành tích</Text>
      </View>
      <ScrollView>
        {achievements.map(achievement => (
          <View key={achievement.id} style={styles.achievementCard}>
            <FontAwesome5 
              name={achievement.unlocked ? 'trophy' : 'lock'} 
              size={24} 
              color={achievement.unlocked ? '#FFD700' : '#ccc'} 
            />
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.progressText}>
                {achievement.progress}/{achievement.total}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16
  },
  achievementCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center'
  },
  achievementInfo: {
    marginLeft: 16
  },
  achievementTitle: {
    fontSize: 16,
    marginBottom: 4
  },
  progressText: {
    color: '#666'
  }
});

export default PracticeAchievements;
