import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5 } from 'react-native-vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Thêm dòng này

// Stack imports
import HomeStack from './HomeStack';
import PracticeStackNavigator from './PracticeStackNavigator';
import SettingsStack from './SettingStack';
import PaidCoursesStack from './PaidCoursesStack';
import RankingsStack from './RankingsStack';
import FriendStack from './FriendStack';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const insets = useSafeAreaInsets(); // Lấy thông tin safe area

  const translations = {
    vn: {
      Home: 'Trang chủ',
      Practice: 'Luyện tập',
      Rankings: 'Xếp hạng',
      PaidCourses: 'Khóa học',
      Settings: 'Cài đặt',
      Friend: 'Bạn bè',
    },
    en: {
      Home: 'Home',
      Practice: 'Practice',
      Rankings: 'Rankings',
      PaidCourses: 'Courses',
      Settings: 'Settings',
      Friend: 'Friend',
    },
  };

  const t = translations[language];

  return (
    <View style={{ flex: 1 }}>
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
              case 'PaidCourses':
                iconName = 'shopping-cart';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              case 'Settings':
                iconName = 'cog';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              case 'Friend':
                iconName = 'user-friends';
                return <FontAwesome5 name={iconName} size={20} color={color} />;
              default:
                return null;
            }
          },
          tabBarLabel: t[route.name],
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#23272A' : '#7AC74F',
            borderTopWidth: 1,
            borderTopColor: isDarkMode ? '#222' : '#eee',
          },
          tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
          tabBarInactiveTintColor: isDarkMode ? '#ccc' : '#666',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Practice" component={PracticeStackNavigator} />
        <Tab.Screen name="Rankings" component={RankingsStack} options={{ headerShown: false }} />
        <Tab.Screen name="PaidCourses" component={PaidCoursesStack} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={SettingsStack} options={{ headerShown: false }} />
        <Tab.Screen
          name="Friend"
          component={FriendStack}
          options={{
            tabBarLabel: t['Friend'],
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-friends" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default MainNavigator;