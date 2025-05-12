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
import { useSelector } from 'react-redux';

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

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0099FF' : '#fff', // Nền xanh cho Dark Mode
    },
    header: {
      color: isDarkMode ? '#fff' : '#333',
    },
    friendCard: {
      backgroundColor: isDarkMode ? '#6666FF' : '#fff', // Màu tím cho Dark Mode
      shadowColor: isDarkMode ? '#000' : '#000',
      borderColor: isDarkMode ? '#444' : '#eee',
    },
    name: {
      color: isDarkMode ? '#fff' : '#333',
    },
    level: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    status: {
      backgroundColor: isDarkMode ? '#ccc' : '#ccc',
    },
    online: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4CAF50',
    },
    challengeButton: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    challengeText: {
      color: isDarkMode ? '#000' : '#fff',
    },
  };

  const renderFriendItem = ({ item }) => (
    <View style={[styles.friendCard, dynamicStyles.friendCard]}>
      <View style={styles.friendInfo}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={[styles.name, dynamicStyles.name]}>{item.name}</Text>
          <Text style={[styles.level, dynamicStyles.level]}>Level {item.level}</Text>
        </View>
        <View style={[styles.status, dynamicStyles.status, item.online && dynamicStyles.online]} />
      </View>

      <TouchableOpacity style={[styles.challengeButton, dynamicStyles.challengeButton]}>
        <FontAwesome5 name="gamepad" size={16} color={dynamicStyles.challengeText.color} />
        <Text style={[styles.challengeText, dynamicStyles.challengeText]}>Challenge</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.header, dynamicStyles.header]}>Challenge Friends</Text>
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  level: {
    fontSize: 14,
  },
  status: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  online: {},
  challengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  challengeText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default FriendChallengeScreen;
