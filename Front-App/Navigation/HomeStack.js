import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import HomeScreen from '../Screens/Home/HomeScreen';
import NotificationsScreen from '../Screens/Notifications/NotificationsScreen';
import DailyReward from '../Screens/Home/DailyReward';

const Stack = createStackNavigator();

const HomeStack = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const screenOptions = {
    headerStyle: {
      backgroundColor: isDarkMode ? '#6666FF' : '#4b46f1', // Màu tím cho header
    },
    headerTintColor: isDarkMode ? '#fff' : '#fff', // Màu chữ header
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: 'Trang chủ' }} 
      />
      <Stack.Screen 
        name="NotificationsScreen" 
        component={NotificationsScreen} 
        options={{ title: 'Thông báo' }} 
      />
      <Stack.Screen 
        name="DailyReward" 
        component={DailyReward} 
        options={{ title: 'Phần thưởng hàng ngày' }} 
      />
    </Stack.Navigator>
  );
};

export default HomeStack;