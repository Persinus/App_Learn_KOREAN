import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const TournamentScreen = () => {
  const [tournaments, setTournaments] = useState([
    {
      id: '1',
      title: 'Weekly Challenge',
      endTime: '6d 23h',
      participants: 128,
      prize: '1000 coins + 10 gems',
      top3: [
        {name: 'Player 1', score: 2500},
        {name: 'Player 2', score: 2300},
        {name: 'Player 3', score: 2100}
      ]
    },
    // Add more tournaments...
  ]);

  const renderTournamentItem = ({item}) => (
    <View style={styles.tournamentCard}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.timeContainer}>
          <FontAwesome5 name="clock" size={12} color="#666" />
          <Text style={styles.timeText}>{item.endTime}</Text>
        </View>
      </View>

      <View style={styles.prizeContainer}>
        <Text style={styles.prizeLabel}>Prize Pool:</Text>
        <Text style={styles.prizeValue}>{item.prize}</Text>
      </View>

      <View style={styles.top3Container}>
        {item.top3.map((player, index) => (
          <View key={index} style={styles.playerRow}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.score}>{player.score}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinText}>Join Tournament</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Tournaments</Text>
      <FlatList
        data={tournaments}
        renderItem={renderTournamentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#333'
  },
  listContainer: {
    padding: 16
  },
  tournamentCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timeText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 12
  },
  prizeContainer: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  prizeLabel: {
    fontSize: 12,
    color: '#666'
  },
  prizeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b46f1'
  },
  top3Container: {
    marginBottom: 16
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  rank: {
    width: 30,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666'
  },
  playerName: {
    flex: 1,
    fontSize: 14,
    color: '#333'
  },
  score: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4b46f1'
  },
  joinButton: {
    backgroundColor: '#4b46f1',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center'
  },
  joinText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default TournamentScreen;
