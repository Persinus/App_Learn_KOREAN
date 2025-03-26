import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/Home/HomeScreen';
import DailyReward from '../Screens/Home/DailyReward';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DailyReward" component={DailyReward} />
    </Stack.Navigator>
  );
};

export default HomeStack;