import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FriendScreen from '../Screens/Friend/FriendScreen';
import ChatRealTime from '../Screens/Friend/ChatRealtime';

const Stack = createStackNavigator();

const FriendStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="FriendScreen" component={FriendScreen} options={{ title: 'Bạn bè' }} />
    <Stack.Screen name="ChatRealTime" component={ChatRealTime} options={{ title: 'Chat' }} />
  </Stack.Navigator>
);


export default FriendStack;