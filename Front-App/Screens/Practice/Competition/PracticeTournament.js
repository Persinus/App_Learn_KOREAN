import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const PracticeTournament = ({ navigation }) => {
  const [tournaments] = useState([
    {
      id: 1,
      title: 'Giải đấu tuần',
      status: 'ongoing',
      endTime: '6 ngày',
      participants: 128,
      rewards: [
        { rank: 1, reward: '500 điểm + Huy hiệu Vàng' },
        { rank: 2, reward: '300 điểm + Huy hiệu Bạc' },
        { rank: 3, reward: '200 điểm + Huy hiệu Đồng' }
      ]
    },
    {
      id: 2,
      title: 'Giải đấu tháng',
      status: 'upcoming',
      startTime: '15 ngày',
      participants: 256,
      rewards: [
        { rank: 1, reward: '1000 điểm + Danh hiệu Cao thủ' },
        { rank: 2, reward: '600 điểm + Huy hiệu Đặc biệt' },
        { rank: 3, reward: '400 điểm + Huy hiệu Đặc biệt' }
      ]
    }
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Giải đấu</Text>
      </View>

      <ScrollView style={styles.content}>
        {tournaments.map(tournament => (
          <View key={tournament.id} style={styles.tournamentCard}>
            <View style={styles.tournamentHeader}>
              <Text style={styles.tournamentTitle}>{tournament.title}</Text>
              <View style={[
                styles.statusBadge,
                tournament.status === 'ongoing' ? styles.ongoingBadge : styles.upcomingBadge
              ]}>
                <Text style={styles.statusText}>
                  {tournament.status === 'ongoing' ? 'Đang diễn ra' : 'Sắp diễn ra'}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <FontAwesome5 name="clock" size={14} color="#666" />
              <Text style={styles.infoText}>
                {tournament.status === 'ongoing' ? `Kết thúc trong: ${tournament.endTime}` : `Bắt đầu trong: ${tournament.startTime}`}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <FontAwesome5 name="users" size={14} color="#666" />
              <Text style={styles.infoText}>{tournament.participants} người tham gia</Text>
            </View>

            <View style={styles.rewardsSection}>
              <Text style={styles.rewardsTitle}>Phần thưởng:</Text>
              {tournament.rewards.map((reward, index) => (
                <Text key={index} style={styles.rewardText}>
                  Top {reward.rank}: {reward.reward}
                </Text>
              ))}
            </View>

            <TouchableOpacity 
              style={[
                styles.joinButton,
                tournament.status === 'upcoming' && styles.disabledButton
              ]}
              disabled={tournament.status === 'upcoming'}
            >
              <Text style={styles.joinButtonText}>
                {tournament.status === 'ongoing' ? 'Tham gia ngay' : 'Sắp diễn ra'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  backButton: {
    padding: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16
  },
  content: {
    padding: 16
  },
  tournamentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  tournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  tournamentTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  ongoingBadge: {
    backgroundColor: '#e6f4ea'
  },
  upcomingBadge: {
    backgroundColor: '#fff3e0'
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  infoText: {
    marginLeft: 8,
    color: '#666'
  },
  rewardsSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  rewardText: {
    color: '#666',
    marginBottom: 4
  },
  joinButton: {
    backgroundColor: '#4b46f1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16
  },
  disabledButton: {
    backgroundColor: '#ccc'
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  }
});

export default PracticeTournament;
