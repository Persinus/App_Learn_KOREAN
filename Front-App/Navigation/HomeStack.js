import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/Home/HomeScreen';
import NotificationsScreen from '../Screens/Notifications/NotificationsScreen';
import DailyReward from '../Screens/Home/DailyReward';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Stack.Screen name="DailyReward" component={DailyReward} />
    </Stack.Navigator>
  );
};

export default HomeStack;