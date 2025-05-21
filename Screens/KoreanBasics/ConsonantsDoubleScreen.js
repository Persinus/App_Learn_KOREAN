import React from 'react';
import AlphabetLearningScreen from './AlphabetLearningScreen';

const ConsonantsDoubleScreen = ({ navigation }) => {
  return <AlphabetLearningScreen route={{ params: { type: 'ConsonantsDouble' } }} navigation={navigation} />;
};

export default ConsonantsDoubleScreen;
