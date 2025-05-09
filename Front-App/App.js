import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';

import MainNavigator from './Navigation/AppNavigator';
import OpenStack from './Navigation/OpenStack';
import { SplashScreen } from './Screens/SplashScreen';
import AuthStack from './Navigation/AuthStack';
import store from './Store/Store';

const RootStack = createStackNavigator();

function AppContent() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language); // 👈 lấy ngôn ngữ từ Redux
// siuuuuuuuuuuuuuuuusiuuuuuuuuuuuuuuuu
  // Có thể in log để debug (nếu cần)
  console.log('Language đang dùng:', language);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="SplashScreen" component={SplashScreen} />
          <RootStack.Screen name="OpenStack" component={OpenStack}/>
          <RootStack.Screen name="AuthStack" component={AuthStack} />
          <RootStack.Screen name="MainNavigator" component={MainNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
