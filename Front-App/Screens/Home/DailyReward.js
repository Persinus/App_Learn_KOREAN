import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const getDaysInMonth = (month, year) => {
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => i + 1);
};

const generateGoldRewards = (daysInMonth) => {
  return daysInMonth.reduce((acc, day) => {
    acc[day] = Math.floor(Math.random() * 50) + 50; // Gold between 50-100
    return acc;
  }, {});
};

const DailyReward = ({ navigation }) => {
  const [rewardClaimedDays, setRewardClaimedDays] = useState([]);
  const [goldRewards, setGoldRewards] = useState({});
  const [showReward, setShowReward] = useState(false);
  const [goldAmount, setGoldAmount] = useState(0);

  const today = new Date();
  const currentDay = new Date().getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const storageKey = `goldRewards-${currentMonth}-${currentYear}`;

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        // Lấy dữ liệu phần thưởng lưu trữ
        const storedRewards = await AsyncStorage.getItem(storageKey);
        if (storedRewards) {
          setGoldRewards(JSON.parse(storedRewards));
        } else {
          const newRewards = generateGoldRewards(daysInMonth);
          setGoldRewards(newRewards);
          await AsyncStorage.setItem(storageKey, JSON.stringify(newRewards));
        }
  
        // Lấy danh sách các ngày đã nhận
        const storedClaimedDays = await AsyncStorage.getItem('rewardClaimedDays');
        if (storedClaimedDays) {
          let claimedDays = JSON.parse(storedClaimedDays);
          // Reset lại ngày hôm nay (chỉ cho mục đích test)
          claimedDays = claimedDays.filter((day) => day !== currentDay);
          setRewardClaimedDays(claimedDays);
  
          // Cập nhật lại vào AsyncStorage
          await AsyncStorage.setItem('rewardClaimedDays', JSON.stringify(claimedDays));
        }
      } catch (error) {
        console.error('Error loading rewards:', error);
      }
    };
  
    fetchRewards();
  }, [currentMonth, currentYear, currentDay]);


  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require('../../assets/reward-sound.mp3'));
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  
const handleClaimReward = async (day) => {
  if (rewardClaimedDays.includes(day)) {
    Alert.alert('Thông báo', 'Bạn đã nhận thưởng hôm nay rồi!');
    return;
  }

  if (day !== currentDay) {
    Alert.alert('Thông báo', 'Bạn chỉ có thể nhận thưởng vào hôm nay!');
    return;
  }

  const gold = goldRewards[day];
  setGoldAmount(gold);
  setRewardClaimedDays([...rewardClaimedDays, day]);
  setShowReward(true);
  await playSound();

  try {
    await AsyncStorage.setItem('rewardClaimedDays', JSON.stringify([...rewardClaimedDays, day]));
  } catch (error) {
    console.error('Error saving claimed days:', error);
  }
};

  const renderDay = ({ item: day }) => {
    const isToday = day === currentDay;
    const isClaimed = rewardClaimedDays.includes(day);
    const isMissed = day < currentDay && !rewardClaimedDays.includes(day);
  
    const dayStyle = isClaimed
      ? styles.claimed
      : isToday
      ? styles.today
      : isMissed
      ? styles.missed
      : styles.unclaimed;
  
    const handleDayPress = () => {
      if (isClaimed) {
        Alert.alert('Thông báo', 'Bạn đã nhận thưởng ngày này!');
      } else {
        handleClaimReward(day);
      }
    };
  
    return (
      <TouchableOpacity
      style={[styles.day, dayStyle]}
      onPress={handleDayPress}
      disabled={!isToday && !isClaimed} // Chỉ cho phép bấm ngày hôm nay hoặc ngày đã nhận
    >
      <Text style={styles.dayText}>{day}</Text>
      <Text style={styles.goldText}>💎 +{goldRewards[day]}</Text>
    </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Quay lại</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/avatar1.png')} // Replace with your header image
        style={styles.headerIcon}
      />

      <Text style={styles.title}>🎁 Thưởng hàng ngày</Text>
      <Text style={styles.subtitle}>Chọn ngày để nhận thưởng</Text>

      <FlatList
        data={daysInMonth}
        keyExtractor={(item) => item.toString()}
        numColumns={6}
        renderItem={renderDay}
        contentContainerStyle={styles.calendar}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showReward}
        onRequestClose={() => setShowReward(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            🎉 Bạn đã nhận được {goldAmount} xu! 🎉
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowReward(false)}
          >
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e2d', paddingTop: 40 },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#4b46f1',
    borderRadius: 8,
  },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 16,
  },
  calendar: { alignItems: 'center', justifyContent: 'center' },
  day: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 8,
  },
  dayText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  goldContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  goldIcon: { width: 16, height: 16, marginRight: 4 },
  goldText: { fontSize: 12, color: '#ffd700' },
  today: {
    backgroundColor: '#4caf50', // Xanh lá cho hôm nay
  },
  claimed: {
    backgroundColor: '#ffa726', // Cam cho ngày đã nhận
  },
  missed: {
    backgroundColor: '#e0e0e0', // Xám cho ngày đã lỡ
  },
  unclaimed: {
    backgroundColor: '#90caf9', // Xanh dương cho ngày chưa nhận
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 12,
    backgroundColor: '#4caf50',
    borderRadius: 8,
  },
  closeButtonText: { color: '#fff', fontSize: 16 },
});

export default DailyReward;
