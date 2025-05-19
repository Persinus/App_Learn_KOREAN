import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../Store/DarkMode';

const DarkModeSwitch = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: isDarkMode ? '#fff' : '#000' }]}>
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={() => dispatch(toggleDarkMode())}
        thumbColor={isDarkMode ? '#fff' : '#000'}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DarkModeSwitch;