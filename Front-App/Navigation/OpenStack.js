import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import OnboardingPage1 from '../Screens/OnBroarding/OnboardingPage1';
import OnboardingPage2 from '../Screens/OnBroarding/OnboardingPage2';
import OnboardingPage3 from '../Screens/OnBroarding/OnbroadingPage3';
import OnboardingPage4 from '../Screens/OnBroarding/OnbroadingPage4';
import OnboardingPage5 from '../Screens/OnBroarding/OnbroadingPage5';
import LoginPage from '../Screens/Auth/LoginPage';
import BridgeScreen from "../Screens/bridge";

const Stack = createStackNavigator();

const OpenStack = () => {
  // Lấy trạng thái Dark Mode từ Redux store
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: isDarkMode ? '#000' : '#fff', // Nền của các màn hình
        },
      }}
    >
      
      <Stack.Screen name="BridgeScreen" component={BridgeScreen} />
      <Stack.Screen name="OnboardingPage1" component={OnboardingPage1} />
      <Stack.Screen name="OnboardingPage2" component={OnboardingPage2} />
      <Stack.Screen name="OnboardingPage3" component={OnboardingPage3} />
      <Stack.Screen name="OnboardingPage4" component={OnboardingPage4} />
      <Stack.Screen name="OnboardingPage5" component={OnboardingPage5} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
    </Stack.Navigator>
  );
};


export default OpenStack;
