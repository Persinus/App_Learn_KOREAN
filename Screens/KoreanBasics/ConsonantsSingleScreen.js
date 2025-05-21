import React from 'react';
import AlphabetLearningScreen from './AlphabetLearningScreen';

const ConsonantsSingleScreen = ({ navigation }) => {
  return <AlphabetLearningScreen route={{ params: { type: 'ConsonantsSingle' } }} navigation={navigation} />;
};

export default ConsonantsSingleScreen;
