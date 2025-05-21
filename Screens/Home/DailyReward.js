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
import { useSelector } from 'react-redux';
import { sendPushNotification } from '../../utils/NotificationHelper';

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

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const storageKey = `goldRewards-${currentMonth}-${currentYear}`;

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const storedRewards = await AsyncStorage.getItem(storageKey);
        if (storedRewards) {
          setGoldRewards(JSON.parse(storedRewards));
        } else {
          const newRewards = generateGoldRewards(daysInMonth);
          setGoldRewards(newRewards);
          await AsyncStorage.setItem(storageKey, JSON.stringify(newRewards));
        }

        const storedClaimedDays = await AsyncStorage.getItem('rewardClaimedDays');
        if (storedClaimedDays) {
          setRewardClaimedDays(JSON.parse(storedClaimedDays));
        }
      } catch (error) {
        console.error('Error loading rewards:', error);
      }
    };

    fetchRewards();
  }, [currentMonth, currentYear]);

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
      await sendPushNotification('Điểm danh thành công!', `Bạn đã nhận được ${gold} xu hôm nay! 🎉`);
    } catch (error) {
      console.error('Error saving claimed days:', error);
    }
  };

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    title: {
      color: isDarkMode ? '#fff' : '#333',
    },
    subtitle: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    today: {
      backgroundColor: isDarkMode ? '#388e3c' : '#4caf50',
    },
    claimed: {
      backgroundColor: isDarkMode ? '#FFD70055' : '#ffa726',
    },
    missed: {
      backgroundColor: isDarkMode ? '#333' : '#e0e0e0',
    },
    unclaimed: {
      backgroundColor: isDarkMode ? '#232323' : '#90caf9',
    },
    modalView: {
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.95)',
    },
    modalText: {
      color: isDarkMode ? '#FFD700' : '#000',
    },
    closeButton: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    closeButtonText: {
      color: isDarkMode ? '#000' : '#fff',
    },
    backButton: {
      backgroundColor: isDarkMode ? '#6666FF' : '#4b46f1',
    },
    dayText: {
      color: isDarkMode ? '#fff' : '#000',
    },
    goldText: {
      color: isDarkMode ? '#FFD700' : '#FFA500',
    },
  };

  const renderDay = ({ item: day }) => {
    const isToday = day === currentDay;
    const isClaimed = rewardClaimedDays.includes(day);
    const isMissed = day < currentDay && !rewardClaimedDays.includes(day);

    let dayStyle;
    if (isClaimed) {
      dayStyle = dynamicStyles.claimed;
    } else if (isToday) {
      dayStyle = dynamicStyles.today;
    } else if (isMissed) {
      dayStyle = dynamicStyles.missed;
    } else {
      dayStyle = dynamicStyles.unclaimed;
    }

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
        disabled={!isToday && !isClaimed}
      >
        <Text style={[styles.dayText, dynamicStyles.dayText]}>{day}</Text>
        <Text style={[styles.goldText, dynamicStyles.goldText]}>
          💎 +{goldRewards[day]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
     

      <Text style={[styles.title, dynamicStyles.title]}>🎁 Thưởng hàng ngày</Text>
      <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
        Chọn ngày để nhận thưởng
      </Text>

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
        <View style={[styles.modalView, dynamicStyles.modalView]}>
          <Text style={[styles.modalText, dynamicStyles.modalText]}>
            🎉 Bạn đã nhận được {goldAmount} xu! 🎉
          </Text>
          <TouchableOpacity
            style={[styles.closeButton, dynamicStyles.closeButton]}
            onPress={() => setShowReward(false)}
          >
            <Text style={[styles.closeButtonText, dynamicStyles.closeButtonText]}>
              Đóng
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  calendar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 8,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goldText: {
    fontSize: 12,
  },
  today: {
    backgroundColor: '#4caf50',
  },
  claimed: {
    backgroundColor: '#ffa726',
  },
  missed: {
    backgroundColor: '#e0e0e0',
  },
  unclaimed: {
    backgroundColor: '#90caf9',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default DailyReward;