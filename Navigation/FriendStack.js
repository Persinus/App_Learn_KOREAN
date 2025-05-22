import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FriendScreen from '../Screens/Friend/FriendScreen';
import ChatRealTime from '../Screens/Friend/ChatRealtime';

import UserDetail from '../Screens/Friend/UserDetail';

const Stack = createStackNavigator();

const FriendStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="FriendScreen" component={FriendScreen} options={{ title: 'Bạn bè' , headerShown: false }} />
    <Stack.Screen name="ChatRealTime" component={ChatRealTime} options={{ title: 'Chat', headerShown: false }} />
  
    <Stack.Screen name="UserDetail" component={UserDetail} options={{ title: 'Thông tin người dùng' }} />
  </Stack.Navigator>
);


export default FriendStack;