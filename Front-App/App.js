import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainNavigator from './Navigation/AppNavigator';
import SplashStack from './Navigation/SplashStack';
import AuthStack from './Navigation/AuthStack';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="SplashStack" component={SplashStack} />
        <RootStack.Screen name="AuthStack" component={AuthStack} />
        <RootStack.Screen name="MainNavigator" component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}