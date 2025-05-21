import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from 'axios';
import BASE_API_URL from '../../Util/Baseapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const SOCKET_URL = BASE_API_URL.replace(/\/$/, '');

const dynamicStyles = (isDarkMode) => ({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#fff',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: isDarkMode ? '#333' : '#eee',
    backgroundColor: isDarkMode ? '#232323' : '#fff',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: isDarkMode ? '#333' : '#eee',
    borderWidth: 2,
    borderColor: isDarkMode ? '#FFD700' : '#00ADB5',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#222',
  },
  email: {
    color: isDarkMode ? '#B3B3B3' : '#666',
    fontSize: 13,
  },
  addButton: {
    backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: isDarkMode ? '#000' : '#fff',
    fontWeight: 'bold',
  },
  friendLabel: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: isDarkMode ? '#333' : '#e0ffe0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AddFriend = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [users, setUsers] = useState([]);
  const [myUsername, setMyUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        setMyUsername(username);
        const { data } = await axios.get(`${BASE_API_URL}users`);
        const filtered = data.filter(u => u.username !== username);
        setUsers(filtered);
      } catch (error) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const sendFriendRequest = async (toUsername) => {
    try {
      const from = myUsername;
      const options = {
        method: 'POST',
        url: `${BASE_API_URL}users/${toUsername}/friend-request`,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        data: { from }
      };
      await axios.request(options);
      Alert.alert('Thành công', 'Đã gửi lời mời kết bạn!');
      setUsers(users =>
        users.map(u =>
          u.username === toUsername
            ? { ...u, friendRequestSent: true }
            : u
        )
      );
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi lời mời kết bạn!');
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 32 }} />;
  }

  return (
    <FlatList
      style={dynamicStyles(isDarkMode).container}
      data={users}
      keyExtractor={item => item._id}
      renderItem={({ item }) => {
        const isFriend = item.friends?.includes(myUsername);
        const isRequestSent = item.friendRequests?.includes(myUsername) || item.friendRequestSent;

        return (
          <View style={dynamicStyles(isDarkMode).userRow}>
            <Image
              source={item.avatar ? { uri: item.avatar } : { uri: "https://i.pinimg.com/474x/e7/37/61/e73761b05e3921a209960b591787aa9c.jpg"}}
              style={dynamicStyles(isDarkMode).avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles(isDarkMode).username}>{item.username}</Text>
              <Text style={dynamicStyles(isDarkMode).email}>{item.email}</Text>
            </View>
            {isFriend ? (
              <View style={dynamicStyles(isDarkMode).friendLabel}>
                <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>Đã là bạn bè</Text>
              </View>
            ) : isRequestSent ? (
              <TouchableOpacity style={[dynamicStyles(isDarkMode).addButton, { backgroundColor: '#aaa' }]} disabled>
                <Text style={dynamicStyles(isDarkMode).addButtonText}>Đã gửi</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={dynamicStyles(isDarkMode).addButton}
                onPress={() => sendFriendRequest(item.username)}
              >
                <Text style={dynamicStyles(isDarkMode).addButtonText}>Thêm bạn</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      }}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>Không có người dùng nào.</Text>}
    />
  );
};

const AcceptFriend = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [requests, setRequests] = useState([]);
  const [myUsername, setMyUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        setMyUsername(username);
        const { data } = await axios.get(`${BASE_API_URL}users`);
        const me = data.find(u => u.username === username);
        if (!me || !me.friendRequestsReceived || me.friendRequestsReceived.length === 0) {
          setRequests([]);
          return;
        }
        const requestUsers = data.filter(u => me.friendRequestsReceived.includes(u.username));
        setRequests(requestUsers);
      } catch (error) {
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const acceptFriendRequest = async (fromUsername) => {
    try {
      const options = {
        method: 'POST',
        url: `${BASE_API_URL}users/${myUsername}/friend-request/respond`,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        data: { from: fromUsername, accept: true }
      };
      await axios.request(options);
      Alert.alert('Thành công', 'Đã chấp nhận lời mời!');
      setRequests(requests => requests.filter(u => u.username !== fromUsername));
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chấp nhận lời mời!');
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 32 }} />;
  }

  return (
    <FlatList
      style={dynamicStyles(isDarkMode).container}
      data={requests}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <View style={dynamicStyles(isDarkMode).userRow}>
          <Image
            source={item.avatar ? { uri: item.avatar } : { uri: "https://i.pinimg.com/474x/e7/37/61/e73761b05e3921a209960b591787aa9c.jpg"}}
            style={dynamicStyles(isDarkMode).avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={dynamicStyles(isDarkMode).username}>{item.username}</Text>
            <Text style={dynamicStyles(isDarkMode).email}>{item.email}</Text>
          </View>
          <TouchableOpacity
            style={[dynamicStyles(isDarkMode).addButton, { backgroundColor: '#4CAF50' }]}
            onPress={() => acceptFriendRequest(item.username)}
          >
            <Text style={dynamicStyles(isDarkMode).addButtonText}>Chấp nhận</Text>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>Không có lời mời nào.</Text>}
    />
  );
};

const FriendsList = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);
  const [myUsername, setMyUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socketRef = React.useRef(null);

  useEffect(() => {
    const connectSocket = async () => {
      const username = await AsyncStorage.getItem('username');
      setMyUsername(username);
      socketRef.current = io(SOCKET_URL, { transports: ['websocket'] });
      socketRef.current.emit('register', username);
      socketRef.current.on('online-users', (users) => {
        setOnlineUsers(users);
      });
    };
    connectSocket();
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const fetchFriends = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      setMyUsername(username);

      const res = await axios.get(`${BASE_API_URL}users/${username}/friends`, {
        headers: { Accept: 'application/json' }
      });
      const friendUsernames = res.data.friends || [];

      if (friendUsernames.length === 0) {
        setFriends([]);
        return;
      }

      const allUsersRes = await axios.get(`${BASE_API_URL}users`);
      const allUsers = allUsersRes.data;

      const friendUsers = allUsers.filter(u => friendUsernames.includes(u.username));
      setFriends(friendUsers);
    } catch (error) {
      setFriends([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleChat = (friend) => {
    navigation.navigate('ChatRealTime', { toUser: friend.username });
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 32 }} />;
  }

  return (
    <FlatList
      style={dynamicStyles(isDarkMode).container}
      data={friends}
      keyExtractor={item => item._id}
      renderItem={({ item }) => {
        const isOnline = onlineUsers.includes(item.username);
        return (
          <View style={dynamicStyles(isDarkMode).userRow}>
            <Image
              source={item.avatar ? { uri: item.avatar } : { uri: "https://i.pinimg.com/474x/e7/37/61/e73761b05e3921a209960b591787aa9c.jpg"}}
              style={dynamicStyles(isDarkMode).avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles(isDarkMode).username}>{item.username}</Text>
              <Text style={dynamicStyles(isDarkMode).email}>{item.email}</Text>
              <Text style={{ color: '#4CAF50', fontWeight: 'bold', marginTop: 2 }}>Bạn bè</Text>
            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: isOnline ? '#4CAF50' : '#bbb',
                    marginRight: 6,
                  }}
                />
                <Text style={{ color: isOnline ? '#4CAF50' : '#bbb', fontWeight: 'bold' }}>
                  {isOnline ? 'Online' : 'Offline'}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: isOnline ? '#FFD700' : '#aaa',
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 20,
                  opacity: 1,
                }}
                onPress={() => handleChat(item)}
              >
                <Text style={{ color: isOnline ? '#000' : '#fff', fontWeight: 'bold' }}>Nhắn tin</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>Bạn chưa có bạn bè nào.</Text>}
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        fetchFriends();
      }}
    />
  );
};

const FriendScreen = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'add', title: 'Thêm bạn bè' },
    { key: 'accept', title: 'Chấp nhận' },
    { key: 'friends', title: 'Bạn bè' },
  ]);

  const renderScene = SceneMap({
    add: AddFriend,
    accept: AcceptFriend,
    friends: FriendsList,
  });

  return (
    <View style={dynamicStyles(isDarkMode).container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1' }}
            style={{ backgroundColor: isDarkMode ? '#232323' : '#fff' }}
            labelStyle={{ color: isDarkMode ? '#FFD700' : '#4b46f1', fontWeight: 'bold' }}
          />
        )}
      />
    </View>
  );
};

export default FriendScreen;