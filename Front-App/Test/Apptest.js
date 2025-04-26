// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AlphabetHome from './Test/Lythuyet/index';
import ConsonantsSingle from './Test/data/consonantsSingle';
import ConsonantsDouble from './Test/data/consonantsDouble';
import VowelsSingle from './Test/data/VowelsSingle';
import VowelsDouble from './Test/data/VowelsDouble';

import { LogBox } from 'react-native';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AlphabetHome">
        <Stack.Screen name="AlphabetHome" component={AlphabetHome} />
        <Stack.Screen name="ConsonantsSingle" component={ConsonantsSingle} />
        <Stack.Screen name="ConsonantsDouble" component={ConsonantsDouble} />
        <Stack.Screen name="VowelsSingle" component={VowelsSingle} />
        <Stack.Screen name="VowelsDouble" component={VowelsDouble} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}