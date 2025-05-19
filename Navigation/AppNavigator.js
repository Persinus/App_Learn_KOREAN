import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5 } from 'react-native-vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Thêm dòng này

// Stack imports
import HomeStack from './HomeStack';
import PracticeStackNavigator from './PracticeStackNavigator';
import SettingsStack from './SettingStack';
import PaidCoursesStack from './PaidCoursesStack';
import RankingsStack from './RankingsStack';

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
    },
    en: {
      Home: 'Home',
      Practice: 'Practice',
      Rankings: 'Rankings',
      PaidCourses: 'Courses',
      Settings: 'Settings',
    },
  };

  const t = translations[language];

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              default:
                return null;
            }
          },
          tabBarLabel: t[route.name],
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#4b46f1' : '#7AC74F',
            borderTopWidth: 1,
            borderTopColor: isDarkMode ? '#333' : '#eee',
            height: 60 + insets.bottom, // Thêm insets.bottom vào chiều cao
            paddingBottom: 8 + insets.bottom, // Thêm insets.bottom vào padding dưới
            paddingTop: 8,
          },
          tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
          tabBarInactiveTintColor: isDarkMode ? '#ccc' : '#666',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Practice" component={PracticeStackNavigator} />
        <Tab.Screen name="Rankings" component={RankingsStack} />
        <Tab.Screen name="PaidCourses" component={PaidCoursesStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainNavigator;