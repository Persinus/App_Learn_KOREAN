import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from 'axios';
import BASE_API_URL from '../../Util/Baseapi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getUsername } from '../../Util/UserStorage';

const DEFAULT_AVATAR = "https://i.pinimg.com/474x/e7/37/61/e73761b05e3921a209960b591787aa9c.jpg";

const translations = {
  vn: {
    addFriend: 'Thêm bạn',
    viewInfo: 'Xem thông tin',
    sent: 'Đã gửi',
    alreadyFriend: 'Đã là bạn bè',
    accept: 'Chấp nhận',
    noUsers: 'Không có người dùng nào.',
    noRequests: 'Không có lời mời nào.',
    noFriends: 'Bạn chưa có bạn bè nào.',
    successAdd: 'Đã gửi lời mời kết bạn!',
    errorAdd: 'Không thể gửi lời mời kết bạn!',
    successAccept: 'Đã chấp nhận lời mời!',
    errorAccept: 'Không thể chấp nhận lời mời!',
    notUpdated: 'Chưa cập nhật email',
    addTab: 'Thêm bạn bè',
    acceptTab: 'Chấp nhận',
    friendsTab: 'Bạn bè',
    chat: 'Nhắn tin',
    online: 'Online',
    offline: 'Offline',
  },
  en: {
    addFriend: 'Add Friend',
    viewInfo: 'View Info',
    sent: 'Sent',
    alreadyFriend: 'Already friends',
    accept: 'Accept',
    noUsers: 'No users found.',
    noRequests: 'No friend requests.',
    noFriends: 'You have no friends yet.',
    successAdd: 'Friend request sent!',
    errorAdd: 'Cannot send friend request!',
    successAccept: 'Friend request accepted!',
    errorAccept: 'Cannot accept friend request!',
    notUpdated: 'Email not updated',
    addTab: 'Add Friend',
    acceptTab: 'Accept',
    friendsTab: 'Friends',
    chat: 'Chat',
    online: 'Online',
    offline: 'Offline',
  }
};

const dynamicStyles = (isDarkMode) => ({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: isDarkMode ? '#333' : '#e3e7fd',
    backgroundColor: isDarkMode ? '#232323' : '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    shadowColor: isDarkMode ? '#000' : '#4b46f1',
    shadowOpacity: isDarkMode ? 0.08 : 0.10,
    shadowRadius: 6,
    elevation: isDarkMode ? 0 : 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: isDarkMode ? '#333' : '#e3e7fd',
    borderWidth: 2,
    borderColor: isDarkMode ? '#FFD700' : '#4b46f1',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#4b46f1',
  },
  email: {
    color: isDarkMode ? '#B3B3B3' : '#666',
    fontSize: 13,
  },
  addButton: {
    backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 20,
    width: 120,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    elevation: 2,
  },
  addButtonText: {
    color: isDarkMode ? '#000' : '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
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
  const language = useSelector((state) => state.language.language);
  const [users, setUsers] = useState([]);
  const [myUsername, setMyUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

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
      setRefreshing(false);
    }
  };

  useEffect(() => {
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
      Alert.alert(translations[language].successAdd);
      setUsers(users =>
        users.map(u =>
          u.username === toUsername
            ? { ...u, friendRequestSent: true }
            : u
        )
      );
    } catch (error) {
      Alert.alert(translations[language].errorAdd);
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
        const t = translations[language];

        return (
          <View style={dynamicStyles(isDarkMode).userRow}>
            <Image
              source={item.avatar ? { uri: item.avatar } : { uri: DEFAULT_AVATAR }}
              style={dynamicStyles(isDarkMode).avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles(isDarkMode).username}>{item.username}</Text>
              <Text style={dynamicStyles(isDarkMode).email}>{item.email}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              {isFriend ? (
                <View style={dynamicStyles(isDarkMode).friendLabel}>
                  <Text style={{ color: '#4CAF50', fontWeight: 'bold' }}>{t.alreadyFriend}</Text>
                </View>
              ) : isRequestSent ? (
                <TouchableOpacity style={[dynamicStyles(isDarkMode).addButton, { backgroundColor: '#aaa' }]} disabled>
                  <Text style={dynamicStyles(isDarkMode).addButtonText}>{t.sent}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={dynamicStyles(isDarkMode).addButton}
                  onPress={() => sendFriendRequest(item.username)}
                >
                  <Text style={dynamicStyles(isDarkMode).addButtonText}>{t.addFriend}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[dynamicStyles(isDarkMode).addButton, { backgroundColor: '#00ADB5' }]}
                onPress={() => navigation.navigate('UserDetail', { username: item.username })}
              >
                <Text style={dynamicStyles(isDarkMode).addButtonText}>{t.viewInfo}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>{translations[language].noUsers}</Text>}
      refreshing={refreshing}
      onRefresh={() => {
        setRefreshing(true);
        fetchUsers();
      }}
    />
  );
};

const AcceptFriend = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userMap, setUserMap] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = async () => {
    try {
      const username = await getUsername();
      if (!username) {
        setRequests([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }
      const { data } = await axios.get(`${BASE_API_URL}users/${username}/friend-requests`, {
        headers: { Accept: 'application/json' }
      });
      const requestsArr = data.requests || [];
      setRequests(requestsArr);
      if (requestsArr.length > 0) {
        const fromUsernames = requestsArr.map(r => r.from);
        const usersRes = await axios.get(`${BASE_API_URL}users`, {
          headers: { Accept: 'application/json' }
        });
        const allUsers = usersRes.data;
        const map = {};
        allUsers.forEach(u => {
          if (fromUsernames.includes(u.username)) map[u.username] = u;
        });
        setUserMap(map);
      }
    } catch (error) {
      setRequests([]);
      setUserMap({});
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const acceptFriendRequest = async (fromUsername) => {
    try {
      const username = await getUsername();
      const options = {
        method: 'POST',
        url: `${BASE_API_URL}users/${username}/friend-request/respond`,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        data: { from: fromUsername, accept: true }
      };
      await axios.request(options);
      Alert.alert(translations[language].successAccept);
      setRequests(requests => requests.filter(r => r.from !== fromUsername));
    } catch (error) {
      Alert.alert(translations[language].errorAccept);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 32 }} />;
  }

  return (
    <FlatList
      style={dynamicStyles(isDarkMode).container}
      data={requests}
      keyExtractor={item => item.from}
      renderItem={({ item }) => {
        const user = userMap[item.from] || {};
        return (
          <View style={dynamicStyles(isDarkMode).userRow}>
            <Image
              source={user.avatar ? { uri: user.avatar } : { uri: DEFAULT_AVATAR }}
              style={dynamicStyles(isDarkMode).avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles(isDarkMode).username}>{user.username || item.from}</Text>
              <Text style={dynamicStyles(isDarkMode).email}>{user.email || translations[language].notUpdated}</Text>
            </View>
            <TouchableOpacity
              style={[dynamicStyles(isDarkMode).addButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => acceptFriendRequest(item.from)}
            >
              <Text style={dynamicStyles(isDarkMode).addButtonText}>{translations[language].accept}</Text>
            </TouchableOpacity>
          </View>
        );
      }}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>{translations[language].noRequests}</Text>}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchRequests();
          }}
          colors={[isDarkMode ? "#FFD700" : "#4b46f1"]}
          tintColor={isDarkMode ? "#FFD700" : "#4b46f1"}
        />
      }
    />
  );
};

const FriendsList = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
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
      socketRef.current = io(BASE_API_URL.replace(/\/$/, ''), { transports: ['websocket'] });
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
              source={item.avatar ? { uri: item.avatar } : { uri: DEFAULT_AVATAR }}
              style={dynamicStyles(isDarkMode).avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles(isDarkMode).username}>{item.username}</Text>
              <Text style={dynamicStyles(isDarkMode).email}>{item.email}</Text>
              <Text style={{ color: '#4CAF50', fontWeight: 'bold', marginTop: 2 }}>{translations[language].alreadyFriend}</Text>
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
                  {isOnline ? translations[language].online : translations[language].offline}
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
                <Text style={{ color: isOnline ? '#000' : '#fff', fontWeight: 'bold' }}>{translations[language].chat}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>{translations[language].noFriends}</Text>}
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
  const language = useSelector((state) => state.language.language);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'add', title: translations[language].addTab },
    { key: 'accept', title: translations[language].acceptTab },
    { key: 'friends', title: translations[language].friendsTab },
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