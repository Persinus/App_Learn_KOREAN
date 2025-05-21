import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RankingsScreen from '../Screens/Rankings/RankingsScreen';


const Stack = createStackNavigator();

const RankingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RankingsScreen" component={RankingsScreen} />

    </Stack.Navigator>
  );
};

export default RankingsStack;
