import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import HomeScreen from '../Screens/Home/HomeScreen';
import NotificationsScreen from '../Screens/Notifications/NotificationsScreen';
import DailyReward from '../Screens/Home/DailyReward';
import LessonStack from '../Navigation/LessonStack';
import all from '../Screens/Home/allAchievement';
import AllDailyMission from '../Screens/Home/allDailyMission';
import ComingSoon from '../Screens/ComingSoon';
const Stack = createStackNavigator();

const HomeStack = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const screenOptions = {
    headerStyle: {
      backgroundColor: isDarkMode ? '#222' : '#4b46f1', // Màu tím cho header
    },
    headerTintColor: isDarkMode ? '#222' : '#fff', // Đen nhạt khi dark mode, trắng khi light mode
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: 'Trang chủ', headerShown: false }}
      />
      <Stack.Screen 
        name="NotificationsScreen" 
        component={NotificationsScreen} 
        options={{ title: 'Thông báo', headerShown: false }} 
      />
      <Stack.Screen 
        name="DailyReward" 
        component={DailyReward} 
        options={{ title: 'Phần thưởng hàng ngày' , headerShown: false }} 
      />
      <Stack.Screen 
        name="LessonStack" 
        component={LessonStack} 
        options={{ title: 'Bài học', headerShown: false }}
      />
      <Stack.Screen 
        name="all" 
        component={all} 
        options={{ title: 'Tất cả thành tựu', headerShown: false }}
      />
      <Stack.Screen 
        name="AllDailyMission" 
        component={AllDailyMission} 
        options={{ title: 'Tất cả nhiệm vụ hôm nay' }}
    
    />
      <Stack.Screen 
        name="ComingSoon" 
        component={ComingSoon} 
        options={{ title: 'Tính năng đang phát triển' }} 
      />
    </Stack.Navigator>


  );
};

export default HomeStack;