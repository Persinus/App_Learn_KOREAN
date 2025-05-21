import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native';
import io from 'socket.io-client';
import BASE_API_URL from '../../Util/Baseapi';

const SOCKET_URL = BASE_API_URL.replace(/\/$/, '');

const ChatRealtime = ({ route }) => {
  const { toUser } = route.params;
  const [myUsername, setMyUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.header}>Nhắn tin với {toUser}</Text>
      <FlatList
        data={messages}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.message,
            item.from === myUsername ? styles.myMessage : styles.theirMessage
          ]}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.time}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={sendMessage}
          disabled={!socketRef.current}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#232323' },
  header: { color: '#FFD700', fontSize: 18, fontWeight: 'bold', textAlign: 'center', margin: 12 },
  message: { marginVertical: 4, padding: 10, borderRadius: 8, maxWidth: '80%' },
  myMessage: { backgroundColor: '#4b46f1', alignSelf: 'flex-end' },
  theirMessage: { backgroundColor: '#444', alignSelf: 'flex-start' },
  messageText: { color: '#fff', fontSize: 16 },
  time: { color: '#ccc', fontSize: 10, marginTop: 2, textAlign: 'right' },
  inputRow: { flexDirection: 'row', padding: 8, backgroundColor: '#232323' },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 16, fontSize: 16 },
  sendBtn: { backgroundColor: '#FFD700', borderRadius: 20, paddingHorizontal: 18, justifyContent: 'center', marginLeft: 8 },
});

export default ChatRealtime;