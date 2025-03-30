import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, FontAwesome5 } from 'react-native-vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import các màn hình
import HomeStack from './HomeStack';
import PracticeStackNavigator from './PracticeStackNavigator';
import RankingsScreen from '../Screens/Rankings/RankingsScreen';
import SettingsScreen from '../Screens/Setting/SettingsScreen';
import PaidCoursesScreen from '../Screens/PaidCourses/PaidCoursesScreen';
import InfoApp from '../Screens/Setting/InfoApp';
import EditInfoUser from '../Screens/Setting/EditInfoUser';
import UserFeedback from '../Screens/Setting/UserFeedback';
import PaidCoursesDetail from '../Screens/PaidCourses/PaidCoursesDetail';
import LinkingPaid from '../Screens/PaidCourses/LinkingPaid';
import JoinCourse from '../Screens/PaidCourses/JoinCourse'; // Thêm dòng này
import DetailRanking from '../Screens/Rankings/DetailRanking';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="InfoApp" component={InfoApp} />
      <Stack.Screen name="EditInfoUser" component={EditInfoUser} />
      <Stack.Screen name="UserFeedback" component={UserFeedback} />
      {/* ...other setting screens... */}
    </Stack.Navigator>
  );
};

const PaidCoursesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaidCoursesScreen" component={PaidCoursesScreen} />
      <Stack.Screen name="PaidCoursesDetail" component={PaidCoursesDetail} />
      <Stack.Screen name="LinkingPaid" component={LinkingPaid} />
      <Stack.Screen name="JoinCourse" component={JoinCourse} />
    </Stack.Navigator>
  );
};

const RankingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RankingsScreen" component={RankingsScreen} />
      <Stack.Screen name="DetailRanking" component={DetailRanking} />
    </Stack.Navigator>
  );
};

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
          tabBarShowLabel: false, // Ẩn nhãn tab
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#eee',
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Practice" component={PracticeStackNavigator} />
        <Tab.Screen name="Rankings" component={RankingsStack} />
        <Tab.Screen name="PaidCourses" component={PaidCoursesStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default TabNavigator;
