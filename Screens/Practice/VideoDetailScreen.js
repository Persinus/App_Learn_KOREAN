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

  const dynamicStyles = {
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
    },
    songTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFD700' : '#6A0DAD',
      marginBottom: 20,
      textAlign: 'center',
      backgroundColor: isDarkMode ? '#232323' : '#FFD700',
      padding: 10,
      borderRadius: 10,
      textShadowColor: isDarkMode ? '#333' : '#D1C4E9',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
      elevation: 5,
    },
    question: {
      fontSize: 18,
      fontStyle: 'italic',
      color: isDarkMode ? '#FFD700' : '#6A0DAD',
      marginBottom: 20,
      textAlign: 'center',
      backgroundColor: isDarkMode ? '#232323' : '#E0BBE4',
      padding: 8,
      borderRadius: 8,
      elevation: 3,
    },
    videoContainer: {
      width: width * 0.9,
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderRadius: 15,
      overflow: 'hidden',
      shadowColor: isDarkMode ? '#FFD700' : '#6C4AB6',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 8,
      borderColor: isDarkMode ? '#FFD700' : '#FFD700',
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
      backgroundColor: isDarkMode ? '#232323' : '#ADD8E6',
      color: isDarkMode ? '#eee' : '#0000FF',
      fontSize: 20,
    },
    subtitleOrigin: {
      backgroundColor: isDarkMode ? '#333' : '#FFFACD',
      color: isDarkMode ? '#FFD700' : '#FFD700',
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
      backgroundColor: isDarkMode ? '#FFD700' : '#6C4AB6',
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
      color: isDarkMode ? '#232323' : '#FFF',
      fontWeight: 'bold',
      fontSize: 20,
    },
    wordListContainer: {
      marginTop: 24,
      backgroundColor: isDarkMode ? '#232323' : '#fffbe6',
      borderRadius: 12,
      padding: 16,
      width: '100%',
      elevation: 2,
    },
    wordListTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      color: isDarkMode ? '#FFD700' : '#6A0DAD',
      marginBottom: 12,
      textAlign: 'center',
    },
    wordItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333' : '#eee',
    },
    wordText: {
      fontWeight: 'bold',
      color: isDarkMode ? '#FFD700' : '#333',
      fontSize: 16,
    },
    meaningText: {
      color: isDarkMode ? '#FFD700' : '#6C4AB6',
      fontSize: 16,
      marginLeft: 12,
      flex: 1,
      textAlign: 'right',
    },
  };

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.songTitle}>🎵 {title} 🎵</Text>
      <Text style={dynamicStyles.question}>{question}</Text>
      <View style={dynamicStyles.videoContainer}>
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
            dynamicStyles.subtitle,
            dynamicStyles.subtitleOrigin,
            { opacity: subtitleOriginAnim }
          ]}
        >
          {subtitleOrigin}
        </Animated.Text>
      ) : null}
      {subtitle ? (
        <Animated.Text
          style={[
            dynamicStyles.subtitle,
            dynamicStyles.subtitlePrimary,
            { opacity: subtitleAnim }
          ]}
        >
          {subtitle}
        </Animated.Text>
      ) : null}
      {isVideoEnded && id === '4' ? (
        <View style={dynamicStyles.wordListContainer}>
          <Text style={dynamicStyles.wordListTitle}>📚 Từ mới trong bài:</Text>
          {(newWords || []).map((item, idx) => (
            <View key={idx} style={dynamicStyles.wordItem}>
              <Text style={dynamicStyles.wordText}>{item.word}</Text>
              <Text style={dynamicStyles.meaningText}>{item.meaning}</Text>
            </View>
          ))}
        </View>
      ) : null}
      {isVideoEnded && id !== '4' ? (
        <View style={dynamicStyles.buttonContainer}>
          <Button
            title="Trả lời câu hỏi"
            color="#6C4AB6"
            onPress={() => navigation.navigate('QuestionScreen', { question })}
          />
        </View>
      ) : null}
      {isLast10Seconds && !isVideoEnded && id !== '4' && (
        <TouchableOpacity
          style={dynamicStyles.floatingButton}
          onPress={() => navigation.navigate('QuestionScreen', { question })}
        >
          <Text style={dynamicStyles.floatingButtonText}>Trả lời</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoDetailScreen;