import React from 'react';
import AlphabetLearningScreen from './AlphabetLearningScreen';

const VowelsSingleScreen = ({ navigation }) => {
  return <AlphabetLearningScreen route={{ params: { type: 'VowelsSingle' } }} navigation={navigation} />;
};

export default VowelsSingleScreen;
