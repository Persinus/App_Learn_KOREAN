import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const subscriptionOptions = [
  {
    title: "Bài học hàng tháng",
    description: "Truy cập tất cả các bài học và tài nguyên trong một tháng.",
    color: "#E6D6FF",
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('LessionScreen'),
  },
  {
    title: "Mini Games",
    description: "Học thông qua các trò chơi tương tác thú vị.",
    color: "#D6E6FF", 
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('MiniGame1'),
  },
  {
    title: "Thư viện Video",
    description: "Học qua video K-pop và phim Hàn Quốc có phụ đề.",
    color: "#FFE6C7",
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('VideoListScreen'),
  },
  {
    title: "Phần thưởng",
    description: "Nhận thưởng đăng nhập và thành tích học tập.",
    color: "#FFD6D6",
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('PracticeDailyReward'),
  },
  {
    title: "Thách đấu",
    description: "Thi đấu với bạn bè và tham gia giải đấu hàng tuần.",
    color: "#D6FFE6",
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('PracticeCompetition'),
  },
  {
    title: "Daily Rewards",
    description: "Đăng nhập hàng ngày để nhận thưởng.",
    color: "#FFE6C7",
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('PracticeDailyReward'),
  },
  {
    title: "Milestones", 
    description: "Đạt cột mốc để nhận phần thưởng đặc biệt.",
    color: "#E6FFD6",
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('PracticeMilestones'),
  },
  {
    title: "PvP Arena",
    description: "Thách đấu với người chơi khác.",
    color: "#FFD6D6", 
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('PracticeCompetition'),
  },
  {
    title: "Tournament",
    description: "Tham gia giải đấu tuần để nhận thưởng lớn.",
    color: "#D6FFE6",
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('PracticeTournament'), 
  }
];

const PracticeScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#0099FF' : '#F8F8F8',
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkMode ? '#fff' : '#6A0DAD',
      textAlign: "center",
      marginBottom: 15,
    },
    card: {
      backgroundColor: isDarkMode ? '#6666FF' : '#f8f8f8',
      shadowColor: isDarkMode ? '#000' : '#000',
    },
    title: {
      color: isDarkMode ? '#fff' : '#333',
    },
    description: {
      color: isDarkMode ? '#ccc' : '#666',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.header, dynamicStyles.header]}>📚 Subscription Plans</Text>
      <FlatList
        data={subscriptionOptions}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, dynamicStyles.card, { backgroundColor: item.color }]} 
            onPress={() => item.onPress && item.onPress(navigation)}
            activeOpacity={0.7}
          >
            <Image source={item.icon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={[styles.title, dynamicStyles.title]}>{item.title}</Text>
              <Text style={[styles.description, dynamicStyles.description]}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
});

export default PracticeScreen;
