import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const FriendChallengeScreen = () => {
  const [friends, setFriends] = useState([
    {
      id: '1',
      name: 'Jane Doe',
      level: 15,
      avatar: require('../../assets/avatar1.png'),
      online: true
    },
    // Add more friends...
  ]);

  const renderFriendItem = ({item}) => (
    <View style={styles.friendCard}>
      <View style={styles.friendInfo}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.level}>Level {item.level}</Text>
        </View>
        <View style={[styles.status, item.online && styles.online]} />
      </View>

      <TouchableOpacity style={styles.challengeButton}>
        <FontAwesome5 name="gamepad" size={16} color="#fff" />
        <Text style={styles.challengeText}>Challenge</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Challenge Friends</Text>
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
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
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  textContainer: {
    marginRight: 12
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  level: {
    fontSize: 14,
    color: '#666'
  },
  status: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc'
  },
  online: {
    backgroundColor: '#4CAF50'
  },
  challengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4b46f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  challengeText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold'
  }
});

export default FriendChallengeScreen;
