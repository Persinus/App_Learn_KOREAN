import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import BASE_API_URL from '../../Util/Baseapi';

const SOCKET_URL = BASE_API_URL.replace(/\/$/, '');

const ChatRealtime = ({ route }) => {
  const { toUser } = route.params;
  const [myUsername, setMyUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);
  const isDarkMode = useSelector(state => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: { flex: 1, backgroundColor: isDarkMode ? '#232323' : '#f4f7ff' },
    header: { color: isDarkMode ? '#FFD700' : '#4b46f1', fontSize: 18, fontWeight: 'bold', textAlign: 'center', margin: 12 },
    message: { marginVertical: 4, padding: 10, borderRadius: 8, maxWidth: '80%' },
    myMessage: { backgroundColor: isDarkMode ? '#4b46f1' : '#e3e7fd', alignSelf: 'flex-end' },
    theirMessage: { backgroundColor: isDarkMode ? '#444' : '#fff', alignSelf: 'flex-start', borderWidth: isDarkMode ? 0 : 1, borderColor: isDarkMode ? undefined : '#e3e7fd' },
    messageText: { color: isDarkMode ? '#fff' : '#222', fontSize: 16 },
    time: { color: isDarkMode ? '#ccc' : '#666', fontSize: 10, marginTop: 2, textAlign: 'right' },
    inputRow: { flexDirection: 'row', padding: 8, backgroundColor: isDarkMode ? '#232323' : '#fff' },
    input: { flex: 1, backgroundColor: isDarkMode ? '#fff' : '#f4f7ff', borderRadius: 20, paddingHorizontal: 16, fontSize: 16, color: '#222' },
    sendBtn: { backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1', borderRadius: 20, paddingHorizontal: 18, justifyContent: 'center', marginLeft: 8 },
    sendBtnText: { color: isDarkMode ? '#000' : '#fff', fontWeight: 'bold' },
  };

  useEffect(() => {
    const connect = async () => {
      const username = await AsyncStorage.getItem('username');
      setMyUsername(username);
      socketRef.current = io(SOCKET_URL, { transports: ['websocket'] });
      socketRef.current.emit('register', username);

      // Lấy lịch sử
      socketRef.current.emit('get-history', { user1: username, user2: toUser });
      socketRef.current.on('history', (msgs) => setMessages(msgs));

      // Lắng nghe tin nhắn mới
      socketRef.current.on('private-message', (msg) => {
        if (
          (msg.from === username && msg.to === toUser) ||
          (msg.from === toUser && msg.to === username)
        ) {
          setMessages((prev) => [...prev, msg]);
        }
      });
    };
    connect();
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [toUser]);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;
    socketRef.current.emit('private-message', {
      from: myUsername,
      to: toUser,
      content: input.trim(),
    });
    setInput('');
  };

  return (
    <KeyboardAvoidingView style={dynamicStyles.container} behavior="padding">
      <Text style={dynamicStyles.header}>Nhắn tin với {toUser}</Text>
      <FlatList
        data={messages}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={[
            dynamicStyles.message,
            item.from === myUsername ? dynamicStyles.myMessage : dynamicStyles.theirMessage
          ]}>
            <Text style={dynamicStyles.messageText}>{item.content}</Text>
            <Text style={dynamicStyles.time}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
      <View style={dynamicStyles.inputRow}>
        <TextInput
          style={dynamicStyles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
        />
        <TouchableOpacity
          style={dynamicStyles.sendBtn}
          onPress={sendMessage}
          disabled={!socketRef.current}
        >
          <Text style={dynamicStyles.sendBtnText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRealtime;