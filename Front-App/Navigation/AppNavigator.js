import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, FontAwesome5 } from 'react-native-vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import các màn hình chính
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
import JoinCourse from '../Screens/PaidCourses/JoinCourse';
import DetailRanking from '../Screens/Rankings/DetailRanking';

// Import các màn hình mới
import AlphabetHomeScreen from '../Screens/KoreanBasics/AlphabetHomeScreen';
import ConsonantsSingleScreen from '../Screens/KoreanBasics/ConsonantsSingleScreen';
import ConsonantsDoubleScreen from '../Screens/KoreanBasics/ConsonantsDoubleScreen';
import VowelsSingleScreen from '../Screens/KoreanBasics/VowelsSingleScreen';
import VowelsDoubleScreen from '../Screens/KoreanBasics/VowelsDoubleScreen';
import BasicKoreanLessonsScreen from '../Screens/BasicKorean/BasicKoreanLessonsScreen';
import LessonDetailScreen from '../Screens/BasicKorean/LessonDetailScreen';
import VocabularyTopicsScreen from '../Screens/KoreanBasics/VocabularyTopicsScreen';
import VocabularyDetailScreen from '../Screens/KoreanBasics/VocabularyDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="InfoApp" component={InfoApp} />
      <Stack.Screen name="EditInfoUser" component={EditInfoUser} />
      <Stack.Screen name="UserFeedback" component={UserFeedback} />
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

const MainNavigator = () => {
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
          tabBarShowLabel: false,
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

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="AlphabetHomeScreen" component={AlphabetHomeScreen} />
      <Stack.Screen name="ConsonantsSingle" component={ConsonantsSingleScreen} />
      <Stack.Screen name="ConsonantsDouble" component={ConsonantsDoubleScreen} />
      <Stack.Screen name="VowelsSingle" component={VowelsSingleScreen} />
      <Stack.Screen name="VowelsDouble" component={VowelsDoubleScreen} />
      <Stack.Screen name="BasicKoreanLessonsScreen" component={BasicKoreanLessonsScreen} />
      <Stack.Screen name="LessonDetailScreen" component={LessonDetailScreen} />
      <Stack.Screen name="VocabularyTopicsScreen" component={VocabularyTopicsScreen} />
      <Stack.Screen name="VocabularyDetailScreen" component={VocabularyDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
