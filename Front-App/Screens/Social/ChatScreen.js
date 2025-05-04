import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'How is your study going? 😊', sender: 'them', time: '10:30' },
    { id: '2', text: 'I am on lesson 5 📘', sender: 'me', time: '10:31' },
  ]);

  // Redux states
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: Date.now().toString(),
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
      setMessage('');
    }
  };

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#333' : '#fff',
    },
    messageContainer: {
      backgroundColor: isDarkMode ? '#555' : '#f0f0f0',
    },
    sentMessage: {
      backgroundColor: isDarkMode ? '#6666FF' : '#4b46f1',
    },
    messageText: {
      color: isDarkMode ? '#fff' : '#000',
    },
    timeText: {
      color: isDarkMode ? '#ccc' : '#888',
    },
    inputContainer: {
      borderTopColor: isDarkMode ? '#444' : '#eee',
    },
    input: {
      backgroundColor: isDarkMode ? '#555' : '#f5f5f5',
      color: isDarkMode ? '#fff' : '#000',
    },
    sendButton: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    sendButtonIcon: {
      color: isDarkMode ? '#333' : '#fff',
    },
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, dynamicStyles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            item.sender === 'me'
              ? [styles.sentMessage, dynamicStyles.sentMessage]
              : [styles.receivedMessage, dynamicStyles.messageContainer]
          ]}>
            <View style={styles.messageContent}>
              {item.sender === 'them' && (
                <FontAwesome5 name="user-circle" size={24} color={isDarkMode ? '#FFD700' : '#4b46f1'} style={styles.userIcon} />
              )}
              <Text style={[styles.messageText, dynamicStyles.messageText]}>
                {item.text}
              </Text>
            </View>
            <Text style={[styles.timeText, dynamicStyles.timeText]}>
              {item.time}
            </Text>
          </View>
        )}
        inverted // Reverse the list to show the latest message at the bottom
      />
      <View style={[styles.inputContainer, dynamicStyles.inputContainer]}>
        <TextInput
          style={[styles.input, dynamicStyles.input]}
          value={message}
          onChangeText={setMessage}
          placeholder={language === 'vn' ? 'Nhập tin nhắn...' : 'Type a message...'}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        />
        <TouchableOpacity style={[styles.sendButton, dynamicStyles.sendButton]} onPress={sendMessage}>
          <FontAwesome5 name="paper-plane" size={20} style={dynamicStyles.sendButtonIcon} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    margin: 8,
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    marginRight: 8,
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    marginRight: 12,
    padding: 12,
    borderRadius: 24,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
