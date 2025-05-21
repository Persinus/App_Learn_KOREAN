import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AlphabetHomeScreen from '../Screens/KoreanBasics/AlphabetHomeScreen';
import ConsonantsSingleScreen from '../Screens/KoreanBasics/ConsonantsSingleScreen';
import ConsonantsDoubleScreen from '../Screens/KoreanBasics/ConsonantsDoubleScreen';
import VowelsSingleScreen from '../Screens/KoreanBasics/VowelsSingleScreen';
import VowelsDoubleScreen from '../Screens/KoreanBasics/VowelsDoubleScreen';
import BasicKoreanLessonsScreen from '../Screens/KoreanBasics/BasicKoreanLessonsScreen';
import LessonDetailScreen from '../Screens/KoreanBasics/LessonDetailScreen';
import VocabularyTopicsScreen from '../Screens/KoreanBasics/VocabularyTopicsScreen';
import VocabularyDetailScreen from '../Screens/KoreanBasics/VocabularyDetailScreen';

const Stack = createStackNavigator();

const LessionStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
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

export default LessionStack;