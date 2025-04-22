import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const PracticeCompetition = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Thách đấu</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={() => navigation.navigate('PracticeTournament')}
        >
          <FontAwesome5 name="trophy" size={24} color="#FFD700" />
          <Text style={styles.optionTitle}>Giải đấu tuần</Text>
          <Text style={styles.optionDescription}>Tham gia giải đấu để nhận thưởng lớn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard}>
          <FontAwesome5 name="user-friends" size={24} color="#4b46f1" />
          <Text style={styles.optionTitle}>Thách đấu bạn bè</Text>
          <Text style={styles.optionDescription}>Học cùng bạn bè</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16
  },
  content: {
    padding: 16
  },
  optionCard: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center'
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8
  },
  optionDescription: {
    color: '#666',
    textAlign: 'center'
  }
});

export default PracticeCompetition;
