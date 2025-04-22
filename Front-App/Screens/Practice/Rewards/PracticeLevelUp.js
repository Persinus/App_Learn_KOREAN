import React from 'react';
import { View } from 'react-native';
import LevelUpModal from '../../../Components/LevelUp/LevelUpModal';

const PracticeLevelUp = ({ navigation, route }) => {
  const { level = 1 } = route.params || {};
  
  return (
    <View style={{ flex: 1 }}>
      <LevelUpModal
        visible={true}
        level={level}
        rewards={[
          {icon: '📚', description: 'Mở khóa bài học mới'},
          {icon: '⭐', description: 'Nhận 100 sao'},
          {icon: '🎯', description: 'Mở khóa thử thách mới'}
        ]}
        onClose={() => navigation.goBack()}
      />
    </View>
  );
};

export default PracticeLevelUp;
