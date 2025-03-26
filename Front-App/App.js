
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import các màn hình
import TabNavigator from './Navigation/AppNavigator';
import SplashStack from './Navigation/SplashStack';
import AuthStack from './Navigation/AuthStack';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashStack" component={SplashStack} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}