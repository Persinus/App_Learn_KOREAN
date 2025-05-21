import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Button } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const VideoDetailScreen = ({ route }) => {
  const { youtubeId, title, question, jsonSub, jsonOrigin, id, newWords } = route.params;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [subtitle, setSubtitle] = useState('');
  const [subtitleOrigin, setSubtitleOrigin] = useState('');
  const [prevSubtitle, setPrevSubtitle] = useState('');
  const [prevSubtitleOrigin, setPrevSubtitleOrigin] = useState('');
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const playerRef = useRef(null);
  const navigation = useNavigation();
  const [subtitleAnim] = useState(new Animated.Value(1));
  const [subtitleOriginAnim] = useState(new Animated.Value(1));
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

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
    if (!jsonSub && !jsonOrigin) return;

    // Xử lý phụ đề tiếng Hàn
    const currentSub = jsonSub?.find(
      (sub) => currentTime >= sub.start && currentTime <= sub.end
    );
    if (currentSub?.text !== subtitle) {
      if (currentSub) {
        // Có phụ đề mới: fade out nhanh, đổi text, fade in nhanh
        Animated.timing(subtitleAnim, {
          toValue: 0,
          duration: 80,
          useNativeDriver: true,
        }).start(() => {
          setSubtitle(currentSub.text);
          Animated.timing(subtitleAnim, {
            toValue: 1,
            duration: 120,
            useNativeDriver: true,
          }).start();
        });
      } else if (subtitle) {
        // Hết phụ đề: fade out nhanh
        Animated.timing(subtitleAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(() => setSubtitle(''));
      }
    }

    // Xử lý phụ đề gốc (subtitleOrigin) với animation riêng
    const currentOriginSub = jsonOrigin?.find(
      (sub) => currentTime >= sub.start && currentTime <= sub.end
    );
    if (currentOriginSub?.text !== subtitleOrigin) {
      if (currentOriginSub) {
        Animated.timing(subtitleOriginAnim, {
          toValue: 0,
          duration: 80,
          useNativeDriver: true,
        }).start(() => {
          setSubtitleOrigin(currentOriginSub.text);
          Animated.timing(subtitleOriginAnim, {
            toValue: 1,
            duration: 120,
            useNativeDriver: true,
          }).start();
        });
      } else if (subtitleOrigin) {
        Animated.timing(subtitleOriginAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(() => setSubtitleOrigin(''));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, jsonSub, jsonOrigin]);

  const handleVideoStateChange = (state) => {
    if (state === 'ended') {
      setIsVideoEnded(true);
    }
  };

  const isLast10Seconds = duration > 0 && duration - currentTime <= 10 && currentTime > 0;

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#121212' : '#F5F5F5' }
    ]}>
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
        <Animated.Text
          style={[
            styles.subtitle,
            styles.subtitleOrigin,
            { opacity: subtitleOriginAnim },
            isDarkMode && { backgroundColor: '#333', color: '#FFD700' }
          ]}
        >
          {subtitleOrigin}
        </Animated.Text>
      ) : null}
      {subtitle ? (
        <Animated.Text
          style={[
            styles.subtitle,
            styles.subtitlePrimary,
            { opacity: subtitleAnim },
            isDarkMode && { backgroundColor: '#232323', color: '#eee' }
          ]}
        >
          {subtitle}
        </Animated.Text>
      ) : null}
      {isVideoEnded && id === '4' ? (
        <View style={styles.wordListContainer}>
          <Text style={styles.wordListTitle}>📚 Từ mới trong bài:</Text>
          {(newWords || []).map((item, idx) => (
            <View key={idx} style={styles.wordItem}>
              <Text style={styles.wordText}>{item.word}</Text>
              <Text style={styles.meaningText}>{item.meaning}</Text>
            </View>
          ))}
        </View>
      ) : null}
      {isVideoEnded && id !== '4' ? (
        <View style={styles.buttonContainer}>
          <Button
            title="Trả lời câu hỏi"
            color="#6C4AB6"
            onPress={() => navigation.navigate('QuestionScreen', { question })}
          />
        </View>
      ) : null}
      {isLast10Seconds && !isVideoEnded && id !== '4' && (
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
    // màu sẽ được override bằng dynamicStyles khi render
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
    fontSize: 20,
  },
  wordListContainer: {
    marginTop: 24,
    backgroundColor: '#fffbe6',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    elevation: 2,
  },
  wordListTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#6A0DAD',
    marginBottom: 12,
    textAlign: 'center',
  },
  wordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  wordText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  meaningText: {
    color: '#6C4AB6',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
    textAlign: 'right',
  },
});

export default VideoDetailScreen;