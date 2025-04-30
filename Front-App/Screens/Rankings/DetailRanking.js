import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  FlatList 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const achievements = [
  { id: '1', title: 'Học liên tục 7 ngày', points: 100, completed: true },
  { id: '2', title: 'Hoàn thành 10 bài học', points: 200, completed: true },
  { id: '3', title: 'Đạt điểm tuyệt đối', points: 300, completed: false },
  { id: '4', title: 'Giữ hạng A trong 1 tuần', points: 400, completed: false },
];

const DetailRanking = ({ route, navigation }) => {
  const { user } = route.params;
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#0099FF' : '#f8f9fa',
    },
    header: {
      backgroundColor: isDarkMode ? '#6666FF' : '#4b46f1',
    },
    headerTitle: {
      color: isDarkMode ? '#fff' : '#fff',
    },
    profileSection: {
      backgroundColor: isDarkMode ? '#6666FF' : '#fff',
    },
    userName: {
      color: isDarkMode ? '#fff' : '#333',
    },
    userRank: {
      color: isDarkMode ? '#FFD700' : '#ffa000',
    },
    statValue: {
      color: isDarkMode ? '#fff' : '#333',
    },
    statLabel: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    achievementItem: {
      backgroundColor: isDarkMode ? '#444' : '#fff',
    },
    achievementTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    lockedText: {
      color: isDarkMode ? '#999' : '#999',
    },
    chartPlaceholder: {
      backgroundColor: isDarkMode ? '#333' : '#f8f9fa',
    },
    chartText: {
      color: isDarkMode ? '#ccc' : '#999',
    },
  };

  const renderAchievementItem = ({ item }) => (
    <View style={[styles.achievementItem, dynamicStyles.achievementItem]}>
      <View style={styles.achievementIcon}>
        <FontAwesome5 
          name={item.completed ? 'trophy' : 'lock'} 
          size={20} 
          color={item.completed ? '#FFD700' : '#999'} 
        />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={[
          styles.achievementTitle,
          dynamicStyles.achievementTitle,
          !item.completed && dynamicStyles.lockedText
        ]}>
          {item.title}
        </Text>
        <Text style={styles.achievementPoints}>+{item.points} điểm</Text>
      </View>
      {item.completed && (
        <FontAwesome5 name="check-circle" size={20} color="#4CAF50" />
      )}
    </View>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>Chi tiết xếp hạng</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.profileSection, dynamicStyles.profileSection]}>
          <View style={styles.profileBackground} />
          <View style={styles.profileContent}>
            <Image source={user.image} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={[styles.userName, dynamicStyles.userName]}>{user.name}</Text>
              <View style={styles.rankBadge}>
                <FontAwesome5 name="crown" size={16} color="#FFD700" />
                <Text style={[styles.userRank, dynamicStyles.userRank]}>Hạng {user.rank}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <FontAwesome5 name="star" size={20} color="#4b46f1" />
            </View>
            <Text style={[styles.statValue, dynamicStyles.statValue]}>{user.score}</Text>
            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Điểm số</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <FontAwesome5 name="trophy" size={20} color="#4b46f1" />
            </View>
            <Text style={[styles.statValue, dynamicStyles.statValue]}>
              {achievements.filter(a => a.completed).length}
            </Text>
            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Thành tựu</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <FontAwesome5 name="calendar-check" size={20} color="#4b46f1" />
            </View>
            <Text style={[styles.statValue, dynamicStyles.statValue]}>7</Text>
            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Ngày học</Text>
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Thành tựu đạt được</Text>
          <FlatList
            data={achievements}
            renderItem={renderAchievementItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Lịch sử xếp hạng</Text>
          <View style={[styles.historyChart, dynamicStyles.chartPlaceholder]}>
            <Text style={[styles.chartText, dynamicStyles.chartText]}>Biểu đồ xếp hạng</Text>
          </View>
        </View>
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
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 16,
    backgroundColor: '#4b46f1',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1
  },
  profileSection: {
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 4,
    overflow: 'hidden',
  },
  profileBackground: {
    height: 100,
    backgroundColor: '#4b46f1',
    opacity: 0.9
  },
  profileContent: {
    marginTop: -50,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3dc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  userRank: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffa000',
    marginLeft: 6,
  },
  statsSection: {
    flexDirection: 'row',
    margin: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f1fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#eee',
    marginHorizontal: 15,
  },
  achievementsSection: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  achievementInfo: {
    flex: 1
  },
  achievementTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4
  },
  achievementPoints: {
    fontSize: 14,
    color: '#4b46f1'
  },
  lockedText: {
    color: '#999'
  },
  historySection: {
    padding: 16,
    paddingBottom: 32
  },
  historyChart: {
    height: 200,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    overflow: 'hidden'
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chartText: {
    fontSize: 16,
    color: '#999'
  }
});

export default DetailRanking;
