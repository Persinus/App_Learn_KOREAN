import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

const VideoDetailScreen = ({ route }) => {
  const { youtubeId, title, question, koreanSub } = route.params;

  if (!youtubeId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy video YouTube!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.question}>{question}</Text>
      <YoutubeIframe
        videoId={youtubeId}
        height={200} // Chiều cao video
      />
      <Text style={styles.subtitle}>{koreanSub}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4b46f1',
    marginBottom: 10,
    textAlign: 'center',
  },
  question: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
});

export default VideoDetailScreen;