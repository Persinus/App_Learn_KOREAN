import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PracticeScreen from "../Screens/Practice/PracticeScreen";
import VideoListScreen from "../Screens/Practice/VideoListScreen";
import VideoDetailScreen from "../Screens/Practice/VideoDetailScreen";
import LessionScreen from "../Screens/Practice/Lesson/LessonsScreen"; 
import MiniGame1 from "../Screens/Practice/Game/MiniGame1";
import DetailGame1 from "../Screens/Practice/Game/DetailGame1";


import Dictionary from "../Screens/Practice/Dictionary";

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
        name="Dictionary"
        component={Dictionary}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PracticeStackNavigator;
