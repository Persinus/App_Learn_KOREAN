import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated
} from 'react-native';


const LevelUpModal = ({ visible, level, rewards, onClose }) => {
  const scaleAnim = new Animated.Value(0);

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true
      }).start();
    }
  }, [visible]);

  const renderAnimation = () => {
    try {
      return (
        <LottieView
          source={require('../../assets/levelup-animation.json')}
          autoPlay
          loop={false}
          style={styles.animation}
          onError={error => console.warn('Lottie animation error:', error)}
        />
      );
    } catch (error) {
      // Fallback when animation fails to load
      return (
        <View style={[styles.animation, styles.fallbackAnimation]}>
          <Text style={styles.fallbackText}>🎉</Text>
        </View>
      );
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <Animated.View 
          style={[
            styles.content,
            {transform: [{scale: scaleAnim}]}
          ]}
        >
          {renderAnimation()}
          
          <Text style={styles.levelText}>Level {level}!</Text>
          
          <View style={styles.rewardsContainer}>
            <Text style={styles.rewardsTitle}>Rewards Unlocked:</Text>
            {rewards.map((reward, index) => (
              <View key={index} style={styles.rewardItem}>
                <Text style={styles.rewardIcon}>{reward.icon}</Text>
                <Text style={styles.rewardText}>{reward.description}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Continue</Text>
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
  content: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '90%'
  },
  animation: {
    width: 200,
    height: 200
  },
  levelText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4b46f1',
    marginVertical: 20
  },
  rewardsContainer: {
    width: '100%',
    marginBottom: 20
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  rewardIcon: {
    fontSize: 24,
    marginRight: 12
  },
  rewardText: {
    fontSize: 16,
    color: '#333'
  },
  closeButton: {
    backgroundColor: '#4b46f1',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  fallbackAnimation: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  fallbackText: {
    fontSize: 72
  }
});

export default LevelUpModal;
