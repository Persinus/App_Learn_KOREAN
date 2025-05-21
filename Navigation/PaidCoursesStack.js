import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PaidCoursesScreen from '../Screens/PaidCourses/PaidCoursesScreen';
import PaidCoursesDetail from '../Screens/PaidCourses/PaidCoursesDetail';
import LinkingPaid from '../Screens/PaidCourses/LinkingPaid';
import JoinCourse from '../Screens/PaidCourses/JoinCourse';

const Stack = createStackNavigator();

const PaidCoursesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PaidCoursesScreen" component={PaidCoursesScreen} />
      <Stack.Screen name="PaidCoursesDetail" component={PaidCoursesDetail} />
      <Stack.Screen name="LinkingPaid" component={LinkingPaid} />
      <Stack.Screen name="JoinCourse" component={JoinCourse} />
    </Stack.Navigator>
  );
};

export default PaidCoursesStack;
