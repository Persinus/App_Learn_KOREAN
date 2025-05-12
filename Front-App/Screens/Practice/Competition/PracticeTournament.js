import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

// Định nghĩa các chuỗi đa ngôn ngữ
const translations = {
  vn: {
    title: "Giải đấu",
    ongoing: "Đang diễn ra",
    upcoming: "Sắp diễn ra",
    endTime: "Kết thúc trong",
    startTime: "Bắt đầu trong",
    participants: "người tham gia",
    rewards: "Phần thưởng",
    joinNow: "Tham gia ngay",
    comingSoon: "Sắp diễn ra",
    points: "điểm",
    badge: "huy hiệu",
  },
  en: {
    title: "Tournament",
    ongoing: "Ongoing",
    upcoming: "Upcoming",
    endTime: "Ends in",
    startTime: "Starts in",
    participants: "participants",
    rewards: "Rewards",
    joinNow: "Join Now",
    comingSoon: "Coming Soon",
    points: "points",
    badge: "badge",
  },
};

const PracticeTournament = ({ navigation }) => {
  const [tournaments] = useState([
    {
      id: 1,
      title: 'Weekly Tournament',
      status: 'ongoing',
      endTime: '6 days',
      participants: 128,
      rewards: [
        { rank: 1, reward: `500 ${translations.vn.points} + ${translations.vn.badge} Vàng` },
        { rank: 2, reward: `300 ${translations.vn.points} + ${translations.vn.badge} Bạc` },
        { rank: 3, reward: `200 ${translations.vn.points} + ${translations.vn.badge} Đồng` },
      ],
    },
    {
      id: 2,
      title: 'Monthly Tournament',
      status: 'upcoming',
      startTime: '15 days',
      participants: 256,
      rewards: [
        { rank: 1, reward: `1000 ${translations.vn.points} + Danh hiệu Cao thủ` },
        { rank: 2, reward: `600 ${translations.vn.points} + ${translations.vn.badge} Đặc biệt` },
        { rank: 3, reward: `400 ${translations.vn.points} + ${translations.vn.badge} Đặc biệt` },
      ],
    },
  ]);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  // Lấy chuỗi dịch dựa trên ngôn ngữ hiện tại
  const t = translations[language];

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#333' : '#f8f9fa',
    },
    title: {
      color: isDarkMode ? '#fff' : '#333',
    },
    tournamentCard: {
      backgroundColor: isDarkMode ? '#444' : '#fff',
    },
    tournamentTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    infoText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    rewardsTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    rewardText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    joinButton: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    joinButtonText: {
      color: isDarkMode ? '#333' : '#fff',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color={isDarkMode ? '#fff' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.title, dynamicStyles.title]}>{t.title}</Text>
      </View>

      <ScrollView style={styles.content}>
        {tournaments.map((tournament) => (
          <View key={tournament.id} style={[styles.tournamentCard, dynamicStyles.tournamentCard]}>
            <View style={styles.tournamentHeader}>
              <Text style={[styles.tournamentTitle, dynamicStyles.tournamentTitle]}>
                {tournament.title}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  tournament.status === 'ongoing' ? styles.ongoingBadge : styles.upcomingBadge,
                ]}
              >
                <Text style={styles.statusText}>
                  {tournament.status === 'ongoing' ? t.ongoing : t.upcoming}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <FontAwesome5 name="clock" size={14} color="#666" />
              <Text style={[styles.infoText, dynamicStyles.infoText]}>
                {tournament.status === 'ongoing'
                  ? `${t.endTime}: ${tournament.endTime}`
                  : `${t.startTime}: ${tournament.startTime}`}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <FontAwesome5 name="users" size={14} color="#666" />
              <Text style={[styles.infoText, dynamicStyles.infoText]}>
                {tournament.participants} {t.participants}
              </Text>
            </View>

            <View style={styles.rewardsSection}>
              <Text style={[styles.rewardsTitle, dynamicStyles.rewardsTitle]}>{t.rewards}:</Text>
              {tournament.rewards.map((reward, index) => (
                <Text key={index} style={[styles.rewardText, dynamicStyles.rewardText]}>
                  Top {reward.rank}: {reward.reward}
                </Text>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.joinButton,
                dynamicStyles.joinButton,
                tournament.status === 'upcoming' && styles.disabledButton,
              ]}
              disabled={tournament.status === 'upcoming'}
            >
              <Text style={[styles.joinButtonText, dynamicStyles.joinButtonText]}>
                {tournament.status === 'ongoing' ? t.joinNow : t.comingSoon}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  tournamentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tournamentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ongoingBadge: {
    backgroundColor: '#e6f4ea',
  },
  upcomingBadge: {
    backgroundColor: '#fff3e0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardsSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  rewardText: {
    marginBottom: 4,
  },
  joinButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  joinButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PracticeTournament;
