import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PracticeScreen from '../Screens/Practice/PracticeScreen';
import VideoListScreen from '../Screens/Practice/VideoListScreen';
import VideoDetailScreen from '../Screens/Practice/VideoDetailScreen';

const Stack = createStackNavigator();

const PracticeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PracticeScreen">
      <Stack.Screen
        name="PracticeScreen"
        component={PracticeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoListScreen"
        component={VideoListScreen}
        options={{ title: 'VideoListScreen' }}
      />
      <Stack.Screen
        name="VideoDetailScreen"
        component={VideoDetailScreen}
        options={{ title: 'Video Detail' }}
      />
    </Stack.Navigator>
  );
};

export default PracticeStackNavigator;
