import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

const UnlockAchievementPopup = ({ achievement, onClose }) => {
  return (
    <Modal visible={!!achievement} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <LottieView
            source={require('../../assets/achievement-unlock.json')}
            autoPlay
            loop={false}
            style={styles.animation}
          />
          <Text style={styles.title}>Thành tích mới!</Text>
          <Text style={styles.achievementText}>{achievement?.title}</Text>
          <Text style={styles.rewardText}>Phần thưởng: {achievement?.reward}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Đã hiểu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center'
  },
  animation: {
    width: 150,
    height: 150
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#4b46f1'
  },
  achievementText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 5
  },
  rewardText: {
    fontSize: 16,
    color: '#FFD700',
    marginVertical: 5
  },
  button: {
    backgroundColor: '#4b46f1',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});

export default UnlockAchievementPopup;
