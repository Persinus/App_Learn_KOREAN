import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PracticeScreen from "../Screens/Practice/PracticeScreen";
import VideoListScreen from "../Screens/Practice/VideoListScreen";
import VideoDetailScreen from "../Screens/Practice/VideoDetailScreen";
import LessionScreen from "../Screens/Practice/Lesson/LessonsScreen";
import MiniGame1 from "../Screens/Practice/Game/MiniGame1";
const Stack = createStackNavigator();

const PracticeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PracticeScreen">
      <Stack.Screen
        name="PracticeScreen"
        component={PracticeScreen}
        options={{ headerShown: false }} // ✅ Ẩn hoàn toàn tiêu đề
      />
      <Stack.Screen
        name="VideoListScreen"
        component={VideoListScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          title: "VideoListScreen",
        }}
      />
      <Stack.Screen
        name="VideoDetailScreen"
        component={VideoDetailScreen}
        options={{ headerShown: false }} // ✅ Ẩn hoàn toàn tiêu đề
      />
      <Stack.Screen
        name="LessionScreen"
        component={LessionScreen}
        options={{ headerShown: false }} // ✅ Ẩn hoàn toàn tiêu đề
      />
      <Stack.Screen
        name="MiniGame1"
        component={MiniGame1}
        options={{ headerShown: false }} // ✅ Ẩn hoàn toàn tiêu đề
      />
    </Stack.Navigator>
  );
};

export default PracticeStackNavigator;
