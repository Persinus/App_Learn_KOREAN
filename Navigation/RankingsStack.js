import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RankingsScreen from '../Screens/Rankings/RankingsScreen';
import DetailRanking from '../Screens/Rankings/DetailRanking';

const Stack = createStackNavigator();

const RankingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RankingsScreen" component={RankingsScreen} />
      <Stack.Screen name="DetailRanking" component={DetailRanking} />
    </Stack.Navigator>
  );
};

export default RankingsStack;
