import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DailyLoginReward = () => {
  const [visible, setVisible] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [rewards] = useState([
    { day: 1, reward: '50 coins', icon: '💰' },
    { day: 2, reward: '100 coins', icon: '💰' },
    { day: 3, reward: '1 gem', icon: '💎' },
    { day: 4, reward: '150 coins', icon: '💰' },
    { day: 5, reward: '2 gems', icon: '💎' },
    { day: 6, reward: '200 coins', icon: '💰' }, 
    { day: 7, reward: '5 gems', icon: '💎' },
  ]);
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    checkDailyLogin();
  }, []);

  const checkDailyLogin = async () => {
    const lastLogin = await AsyncStorage.getItem('lastLoginDate');
    const today = new Date().toDateString();
    
    if (lastLogin !== today) {
      setVisible(true);
      await AsyncStorage.setItem('lastLoginDate', today);
      
      const currentLoginStreak = await AsyncStorage.getItem('loginStreak') || '0';
      const newStreak = Math.min(parseInt(currentLoginStreak) + 1, 7);
      await AsyncStorage.setItem('loginStreak', newStreak.toString());
      setCurrentDay(newStreak);
      
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 70,
        friction: 5,
        useNativeDriver: true
      }).start();
    }
  };

  const claimReward = async () => {
    // Handle reward claiming logic
    const reward = rewards[currentDay - 1];
    if (reward.icon === '💰') {
      const currentCoins = await AsyncStorage.getItem('coins') || '0';
      const coins = parseInt(currentCoins) + parseInt(reward.reward);
      await AsyncStorage.setItem('coins', coins.toString());
    } else {
      const currentGems = await AsyncStorage.getItem('gems') || '0';
      const gems = parseInt(currentGems) + parseInt(reward.reward);
      await AsyncStorage.setItem('gems', gems.toString());
    }
    setVisible(false);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <Animated.View 
          style={[
            styles.rewardBox,
            {transform: [{scale: scaleAnim}]}
          ]}
        >
          <Text style={styles.title}>Daily Login Reward!</Text>
          <Text style={styles.subtitle}>Day {currentDay}</Text>
          
          <View style={styles.rewardsContainer}>
            {rewards.map((item, index) => (
              <View 
                key={index}
                style={[
                  styles.rewardItem,
                  index + 1 === currentDay && styles.currentDay
                ]}
              >
                <Text style={styles.rewardDay}>Day {item.day}</Text>
                <Text style={styles.rewardIcon}>{item.icon}</Text>
                <Text style={styles.rewardText}>{item.reward}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.claimButton} onPress={claimReward}>
            <Text style={styles.claimText}>Claim Reward</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rewardBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b46f1',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20
  },
  rewardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20
  },
  rewardItem: {
    width: '30%',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center'
  },
  currentDay: {
    backgroundColor: '#4b46f1',
  },
  rewardDay: {
    fontSize: 12,
    color: '#666'
  },
  rewardIcon: {
    fontSize: 24,
    marginVertical: 5
  },
  rewardText: {
    fontSize: 12,
    color: '#333'
  },
  claimButton: {
    backgroundColor: '#4b46f1',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25
  },
  claimText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default DailyLoginReward;
