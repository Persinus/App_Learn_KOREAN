import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5 } from 'react-native-vector-icons'; // Sử dụng icon vector
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PracticeStackNavigator from './PracticeStackNavigator'; 
// Import các màn hình
import HomeScreen from '../Screens/Home/HomeScreen';
import LessonsScreen from '../Screens/Lesson/LessonsScreen';
import RankingsScreen from '../Screens/Rankings/RankingsScreen';
import SettingsScreen from '../Screens/Setting/SettingsScreen';
import UserProfileScreen from '../Screens/Profile/UserProfileScreen'; // Import màn hình hồ sơ người dùng

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        shifting={true} // Hiệu ứng shifting
        activeColor="#fff" // Màu tab được chọn
        inactiveColor="#ccc" // Màu tab không được chọn
        barStyle={{ backgroundColor: '#4b46f1' }} // Màu nền của thanh tab
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                return <MaterialIcons name={iconName} size={24} color={color} />;
              case 'Lessons':
                iconName = 'book';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              case 'Practice':
                iconName = 'clipboard-list';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              case 'Rankings':
                iconName = 'trophy';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              case 'Settings':
                iconName = 'cog';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              case 'Profile': // Thêm icon cho tab Profile
                iconName = 'user';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              default:
                return null;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Lessons" component={LessonsScreen} />
        <Tab.Screen name="Practice" component={PracticeStackNavigator} />
        <Tab.Screen name="Rankings" component={RankingsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen 
          name="Profile" 
          component={UserProfileScreen} 
          options={{ title: 'Hồ sơ' }} // Thêm tiêu đề
        />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default TabNavigator;