import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Button } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const VideoDetailScreen = ({ route }) => {
  const { youtubeId, title, question, jsonSub, jsonOrigin } = route.params;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [subtitle, setSubtitle] = useState('');
  const [subtitleOrigin, setSubtitleOrigin] = useState('');
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const playerRef = useRef(null);
  const navigation = useNavigation();
  const [subtitleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current) {
        const time = await playerRef.current.getCurrentTime();
        setCurrentTime(time);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getDuration = async () => {
      if (playerRef.current) {
        const videoDuration = await playerRef.current.getDuration();
        setDuration(videoDuration);
      }
    };
    getDuration();
  }, []);

  useEffect(() => {
    if (jsonOrigin) {
      const currentOriginSub = jsonOrigin.find(
        (sub) => currentTime >= sub.start && currentTime <= sub.end
      );
      setSubtitleOrigin(currentOriginSub ? currentOriginSub.text : '');
    }

    if (jsonSub) {
      const currentSub = jsonSub.find(
        (sub) => currentTime >= sub.start && currentTime <= sub.end
      );
      setSubtitle(currentSub ? currentSub.text : '');

      // Reset opacity và chạy animation
      subtitleAnim.setValue(0);
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [currentTime, jsonSub, jsonOrigin, subtitleAnim]);

  const handleVideoStateChange = (state) => {
    if (state === 'ended') {
      setIsVideoEnded(true);
    }
  };

  const isLast10Seconds = duration > 0 && duration - currentTime <= 10 && currentTime > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.songTitle}>🎵 {title} 🎵</Text>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.videoContainer}>
        <YoutubeIframe
          ref={playerRef}
          videoId={youtubeId}
          height={180}
          onChangeState={handleVideoStateChange}
          play={true}
          forceAndroidAutoplay={true}
          webViewProps={{
            allowsInlineMediaPlayback: true,
          }}
          playerParams={{
            controls: 0,
            modestbranding: 1,
            showinfo: 0,
            rel: 0,
          }}
        />
      </View>
      {subtitleOrigin ? (
        <Animated.Text style={[styles.subtitle, styles.subtitleOrigin, { opacity: subtitleAnim }]}>
          {subtitleOrigin}
        </Animated.Text>
      ) : null}
      {subtitle ? (
        <Animated.Text style={[styles.subtitle, styles.subtitlePrimary, { opacity: subtitleAnim }]}>
          {subtitle}
        </Animated.Text>
      ) : null}
      {isVideoEnded ? (
        <View style={styles.buttonContainer}>
          <Button
            title="Trả lời câu hỏi"
            color="#6C4AB6"
            onPress={() => navigation.navigate('QuestionScreen', { question })}
          />
        </View>
      ) : null}
      {isLast10Seconds && !isVideoEnded && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate('QuestionScreen', { question })}
        >
          <Text style={styles.floatingButtonText}>Trả lời</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
    textShadowColor: '#D1C4E9',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    elevation: 5,
  },
  question: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#6A0DAD',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#E0BBE4',
    padding: 8,
    borderRadius: 8,
    elevation: 3,
  },
  videoContainer: {
    width: width * 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#6C4AB6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    borderColor: '#FFD700',
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    padding: 10,
    elevation: 3,
  },
  subtitlePrimary: {
    backgroundColor: '#ADD8E6',
    color: '#0000FF',
    fontSize: 20,
  },
  subtitleOrigin: {
    backgroundColor: '#FFFACD',
    color: '#FFD700',
    fontSize: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6C4AB6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default VideoDetailScreen;