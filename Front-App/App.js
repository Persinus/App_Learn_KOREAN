import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';

import MainNavigator from './Navigation/AppNavigator';
import SplashStack from './Navigation/SplashStack';
import AuthStack from './Navigation/AuthStack';
import store from './Store/Store'; // Đảm bảo đường dẫn đúng

const RootStack = createStackNavigator();

function AppContent() {
  // Lấy trạng thái Dark Mode từ Redux store
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="SplashStack" component={SplashStack} />
        <RootStack.Screen name="AuthStack" component={AuthStack} />
        <RootStack.Screen name="MainNavigator" component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}