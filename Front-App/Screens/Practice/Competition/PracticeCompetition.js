import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const PracticeCompetition = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0099FF' : '#fff', // Nền xanh cho Dark Mode
    },
    header: {
      borderBottomColor: isDarkMode ? '#444' : '#eee',
    },
    title: {
      color: isDarkMode ? '#fff' : '#333',
    },
    optionCard: {
      backgroundColor: isDarkMode ? '#6666FF' : '#f8f8f8',
    },
    optionTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    optionDescription: {
      color: isDarkMode ? '#ccc' : '#666',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={20} color={isDarkMode ? '#fff' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.title, dynamicStyles.title]}>Thách đấu</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={[styles.optionCard, dynamicStyles.optionCard]}
          onPress={() => navigation.navigate('PracticeTournament')}
        >
          <FontAwesome5 name="trophy" size={24} color="#FFD700" />
          <Text style={[styles.optionTitle, dynamicStyles.optionTitle]}>Giải đấu tuần</Text>
          <Text style={[styles.optionDescription, dynamicStyles.optionDescription]}>
            Tham gia giải đấu để nhận thưởng lớn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.optionCard, dynamicStyles.optionCard]}>
          <FontAwesome5 name="user-friends" size={24} color={isDarkMode ? '#FFD700' : '#4b46f1'} />
          <Text style={[styles.optionTitle, dynamicStyles.optionTitle]}>Thách đấu bạn bè</Text>
          <Text style={[styles.optionDescription, dynamicStyles.optionDescription]}>
            Học cùng bạn bè
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  optionCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  optionDescription: {
    textAlign: 'center',
  },
});

export default PracticeCompetition;
