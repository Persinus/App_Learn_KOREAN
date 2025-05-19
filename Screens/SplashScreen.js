import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login } from '../Store/Authorization';

const SplashScreen = ({ navigation }) => {
  const [progress] = useState(new Animated.Value(0));
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000, // Thời gian chạy splash
        useNativeDriver: false,
      }).start(() => {
        if (storedToken) {
          dispatch(login(storedToken)); // Cập nhật Redux
          navigation.replace('Home');   // Chuyển tới Home nếu đã đăng nhập
        } else {
          navigation.replace('BridgeScreen'); // Chưa có token -> màn trung gian
        }
      });
    };

    checkTokenAndNavigate();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/test.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.title}>Welcome to Korean Learning</Text>
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b46f1',
    marginVertical: 20,
  },
  progressContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4b46f1',
  },
});

export default SplashScreen;
