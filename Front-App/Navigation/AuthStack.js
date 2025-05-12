import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

// Import các màn hình liên quan đến Auth
import Login from '../Screens/Auth/LoginPage';
import LoginScreen from '../Screens/Auth/LoginScreen';
import SignInScreen from '../Screens/Auth/SignInScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
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
      <Stack.Screen name="LoginPage" component={Login} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;