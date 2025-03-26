import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5 } from 'react-native-vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import các màn hình
import HomeStack from './HomeStack';

import PracticeStackNavigator from './PracticeStackNavigator';
import RankingsScreen from '../Screens/Rankings/RankingsScreen';
import SettingsScreen from '../Screens/Setting/SettingsScreen';
import NotificationsScreen from '../Screens/Notifications/NotificationsScreen'; 
import PaidCoursesScreen from '../Screens/PaidCourses/PaidCoursesScreen'; 

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                return <MaterialIcons name={iconName} size={24} color={color} />;
           
              case 'Practice':
                iconName = 'clipboard-list';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              case 'Rankings':
                iconName = 'trophy';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              case 'Notifications':
                iconName = 'bell';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              case 'PaidCourses':
                iconName = 'shopping-cart';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              case 'Settings':
                iconName = 'cog';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              default:
                return null;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
      
        <Tab.Screen name="Practice" component={PracticeStackNavigator} />
        <Tab.Screen name="Rankings" component={RankingsScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Thông báo' }} />
        <Tab.Screen name="PaidCourses" component={PaidCoursesScreen} options={{ title: 'Khóa học' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default TabNavigator;
