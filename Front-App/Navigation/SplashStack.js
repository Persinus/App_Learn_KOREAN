import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Screens/SplashScreen';
import OnboardingPage1 from '../Screens/OnBroarding/OnboardingPage1';
import OnboardingPage2 from '../Screens/OnBroarding/OnboardingPage2';
import OnboardingPage3 from '../Screens/OnBroarding/OnbroadingPage3';
import OnboardingPage4 from '../Screens/OnBroarding/OnbroadingPage4';
import OnboardingPage5 from '../Screens/OnBroarding/OnbroadingPage5';
import LoginPage from '../Screens/Auth/LoginPage';

const Stack = createStackNavigator();

const SplashStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnboardingPage1" component={OnboardingPage1} />
      <Stack.Screen name="OnboardingPage2" component={OnboardingPage2} />
      <Stack.Screen name="OnboardingPage3" component={OnboardingPage3} />
      <Stack.Screen name="OnboardingPage4" component={OnboardingPage4} />
      <Stack.Screen name="OnboardingPage5" component={OnboardingPage5} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
    </Stack.Navigator>
  );
};

export default SplashStack;
