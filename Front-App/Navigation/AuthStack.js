import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import các màn hình liên quan đến Auth
import Login from '../Screens/Auth/LoginPage';
import LoginScreen from '../Screens/Auth/LoginScreen';
import SignInScreen from '../Screens/Auth/SignInScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginPage" component={Login} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;