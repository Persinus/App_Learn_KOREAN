import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PracticeScreen from "../Screens/Practice/PracticeScreen";
import VideoListScreen from "../Screens/Practice/VideoListScreen";
import VideoDetailScreen from "../Screens/Practice/VideoDetailScreen";
import LessionScreen from "../Screens/Practice/Lesson/LessonsScreen"; 
import HanhTrinh20CauHoi from "../Screens/Practice/Lesson/HanhTrinh20CauHoi";
import MiniGame1 from "../Screens/Practice/Game/MiniGame1";
import DetailGame1 from "../Screens/Practice/Game/DetailGame1";
import PracticeDailyReward from "../Screens/Practice/Rewards/PracticeDailyReward";
import PracticeAchievements from "../Screens/Practice/Rewards/PracticeAchievements";
import PracticeLevelUp from "../Screens/Practice/Rewards/PracticeLevelUp";
import PracticeCompetition from "../Screens/Practice/Competition/PracticeCompetition";
import PracticeTournament from "../Screens/Practice/Competition/PracticeTournament";

const Stack = createStackNavigator();

const PracticeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PracticeScreen">
      <Stack.Screen 
        name="PracticeScreen" 
        component={PracticeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoListScreen"
        component={VideoListScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoDetailScreen" 
        component={VideoDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LessionScreen"
        component={LessionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MiniGame1"
        component={MiniGame1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailGame1" 
        component={DetailGame1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PracticeDailyReward"
        component={PracticeDailyReward}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="PracticeAchievements"
        component={PracticeAchievements}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PracticeLevelUp"
        component={PracticeLevelUp} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PracticeCompetition"
        component={PracticeCompetition}
        options={{ headerShown: false }}
      /><Stack.Screen
        name="PracticeTournament"
        component={PracticeTournament}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HanhTrinh20CauHoi"
        component={HanhTrinh20CauHoi}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PracticeStackNavigator;
