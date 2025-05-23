import React, { useState, useEffect } from "react";
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Animated, ActivityIndicator, RefreshControl 
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_API_URL from '../../Util/Baseapi';

const PaidCoursesScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [paidCourses, setPaidCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}paid-courses`);
        setPaidCourses(data);
      } catch (error) {
        setPaidCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const { data } = await axios.get(`${BASE_API_URL}paid-courses`);
      setPaidCourses(data);
    } catch (error) {
      setPaidCourses([]);
    } finally {
      setRefreshing(false);
    }
  };

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
    },
    courseItem: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderRadius: 16,
      marginBottom: 16,
      elevation: 4,
      borderWidth: 1.5,
      borderColor: isDarkMode ? '#FFD70033' : '#e3e7fd',
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.1 : 0.08,
      shadowRadius: 8,
    },
    courseName: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#4b46f1',
      marginBottom: 4,
    },
    courseTeacher: {
      fontSize: 14,
      color: isDarkMode ? '#ccc' : '#666',
      marginBottom: 8,
    },
    courseRating: {
      fontSize: 14,
      color: '#ffa000',
    },
    coursePrice: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#00ADB5' : '#4b46f1',
    },
    header: {
      paddingTop: 45,
      paddingHorizontal: 16,
      paddingBottom: 16,
      backgroundColor: isDarkMode ? '#232323' : '#6a0dad',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    backButton: {
      padding: 8,
    },
  };

  return (
    <View style={dynamicStyles.container}>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 40 }}
          size="large"
          color={isDarkMode ? "#FFD700" : "#4b46f1"}
        />
      ) : (
        <FlatList
          data={paidCourses}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <Animated.View style={[dynamicStyles.courseItem, { transform: [{ scale: scaleAnim }] }]}>
              <TouchableOpacity 
                onPressIn={handlePressIn} 
                onPressOut={handlePressOut} 
                activeOpacity={0.8}
                style={styles.touchable}
                onPress={() => navigation.navigate('PaidCoursesDetail', { course: item })}
              >
                <Image source={{ uri: item.cover }} style={styles.courseCover} />
                <View style={styles.content}>
                  <Image source={{ uri: item.image }} style={styles.courseImage} />
                  <View style={styles.textContainer}>
                    <Text style={dynamicStyles.courseName}>{item.name}</Text>
                    <Text style={dynamicStyles.courseTeacher}>👨‍🏫 {item.teacher}</Text>
                    <View style={styles.ratingContainer}>
                      <Text style={dynamicStyles.courseRating}>⭐ {item.rating}/5</Text>
                      <Text style={dynamicStyles.coursePrice}>💰 {item.price} VND</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
          ListEmptyComponent={
            !loading && (
              <Text style={{ textAlign: 'center', marginTop: 32, color: isDarkMode ? '#fff' : '#333' }}>
                Không có khóa học nào.
              </Text>
            )
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[isDarkMode ? "#FFD700" : "#4b46f1"]}
              tintColor={isDarkMode ? "#FFD700" : "#4b46f1"}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 20
  },
  touchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  courseCover: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
    flexDirection: 'row',
  },
  courseImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#4b46f1',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PaidCoursesScreen;
