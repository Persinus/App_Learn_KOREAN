import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from '../Screens/Setting/SettingsScreen';
import InfoApp from '../Screens/Setting/InfoApp';
import EditInfoUser from '../Screens/Setting/EditInfoUser';
import UserFeedback from '../Screens/Setting/UserFeedback';

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="InfoApp" component={InfoApp} />
      <Stack.Screen name="EditInfoUser" component={EditInfoUser} />
      <Stack.Screen name="UserFeedback" component={UserFeedback} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
