import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import các màn hình
import Login from './Screens/Auth/LoginPage';
import LoginScreen from './Screens/Auth/LoginScreen';
import SignInScreen from './Screens/Auth/SignInScreen';
import OnboardingPage1 from './Screens/OnBroarding/OnboardingPage1';
import OnboardingPage2 from './Screens/OnBroarding/OnboardingPage2';
import HomeScreen from './Screens/Home/HomeScreen';
import LessonsScreen from './Screens/Lesson/LessonsScreen';
import LessonsDetailScreen from './Screens/Lesson/LessonsDetailScreen';
import LoadingScreen from './Screens/Loading/LoadingScreen';
import PracticeScreen from './Screens/Practice/PracticeScreen';
import RankingsScreen from './Screens/Rankings/RankingsScreen';
import SettingsScreen from './Screens/Setting/SettingsScreen';
import SplashScreen from './Screens/SplashScreen';
import TabNavigator from './Navigation/AppNavigator';

const Stack = createStackNavigator();
// Login Stack
import AuthStack from './Navigation/AuthStack';



export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Splash Screen */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        {/* Main App */}
        <Stack.Screen name="App" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
