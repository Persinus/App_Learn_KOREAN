import React from 'react';
import AlphabetLearningScreen from './AlphabetLearningScreen';

const VowelsDoubleScreen = ({ navigation }) => {
  return <AlphabetLearningScreen route={{ params: { type: 'VowelsDouble' } }} navigation={navigation} />;
};

export default VowelsDoubleScreen;
