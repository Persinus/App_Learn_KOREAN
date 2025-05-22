import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  Animated,
  TextInput,
  Share,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import DailyMission from './DailyMission';
import Achievement from './Achievement';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getUsername } from '../../Util/UserStorage';
import BASE_API_URL from '../../Util/Baseapi';

import DailyLoginReward from '../../Components/Rewards/DailyLoginReward';
import AchievementUnlock from '../../Components/Achievements/AchievementUnlock';
import LevelUpModal from '../../Components/LevelUp/LevelUpModal';

const fetchUserProfile = async () => {
  try {
    const username = await getUsername();
    if (!username) return null;
    const options = {
      method: 'GET',
      url: BASE_API_URL + 'users/profile',
      params: { username },
      headers: { Accept: 'application/json' }
    };
    const { data } = await axios.request(options);
    return data.user;
  } catch (error) {
    console.error('Lỗi lấy profile:', error);
    return null;
  }
};

const topStudentsData = {
  vn: [
    { 
      id: "1", 
      name: "Nguyễn Văn A", 
      points: { total: 1200, learning: 500, streak: 300, missions: 400 },
      isFriend: true,
      categories: ['beginner', 'speaking'],
      avatar: require("../../assets/avatar_1.jpg")
    },
    { 
      id: "2", 
      name: "Trần Thị B", 
      points: { total: 1150, learning: 450, streak: 350, missions: 350 },
      isFriend: false,
      categories: ['intermediate'],
      avatar: require("../../assets/avatar_2.jpg")
    },
    { 
      id: "3", 
      name: "Lê Minh C", 
      points: { total: 1100, learning: 400, streak: 300, missions: 400 },
      isFriend: true,
      categories: ['advanced'],
      avatar: require("../../assets/avatar_3.jpg")
    },
  ],
  en: [
    { 
      id: "1", 
      name: "John Smith", 
      points: { total: 1200, learning: 500, streak: 300, missions: 400 },
      isFriend: true,
      categories: ['beginner', 'speaking'],
      avatar: require("../../assets/avatar_1.jpg")
    },
    { 
      id: "2", 
      name: "Emily Johnson", 
      points: { total: 1150, learning: 450, streak: 350, missions: 350 },
      isFriend: false,
      categories: ['intermediate'],
      avatar: require("../../assets/avatar_2.jpg")
    },
    { 
      id: "3", 
      name: "Michael Lee", 
      points: { total: 1100, learning: 400, streak: 300, missions: 400 },
      isFriend: true,
      categories: ['advanced'],
      avatar: require("../../assets/avatar_3.jpg")
    },
  ]
};

const coursesData = {
  vn: [
    { 
      id: "1", 
      title: "Tiếng Hàn Cơ Bản", 
      progress: "15/20",
      estimatedTime: "2 tháng",
      color: "#4b46f1",
      tag: 'beginner',
      isActive: true,
      description: "Phù hợp cho người mới bắt đầu"
    },
    {
      id: "2",
      title: "Tiếng Hàn Trung Cấp",
      progress: "10/30",
      estimatedTime: "3 tháng",
      color: "#ff9f43",
      tag: 'intermediate',
      isActive: false,
      description: "Nâng cao khả năng ngữ pháp và từ vựng"
    },
    {
      id: "3",
      title: "Giao tiếp hàng ngày",
      progress: "5/15",
      estimatedTime: "1 tháng",
      color: "#f44336",
      tag: 'speaking',
      isActive: false,
      description: "Học cách giao tiếp cơ bản hàng ngày"
    },
    {
      id: "4",
      title: "Nhập môn tiếng Hàn",
      progress: "3/10",
      estimatedTime: "1 tháng",
      color: "#2196F3",
      tag: 'beginner',
      isActive: false,
      description: "Làm quen với bảng chữ cái và phát âm cơ bản"
    },
    {
      id: "5",
      title: "Tiếng Hàn Nâng cao",
      progress: "2/25",
      estimatedTime: "4 tháng",
      color: "#9C27B0",
      tag: 'advanced',
      isActive: false,
      description: "Luyện kỹ năng ngôn ngữ nâng cao và văn học"
    }
  ],
  en: [
    { 
      id: "1", 
      title: "Basic Korean", 
      progress: "15/20",
      estimatedTime: "2 months",
      color: "#4b46f1",
      tag: 'beginner',
      isActive: true,
      description: "Suitable for beginners"
    },
    {
      id: "2",
      title: "Intermediate Korean",
      progress: "10/30",
      estimatedTime: "3 months",
      color: "#ff9f43",
      tag: 'intermediate',
      isActive: false,
      description: "Enhance grammar and vocabulary skills"
    },
    {
      id: "3",
      title: "Daily Conversations",
      progress: "5/15",
      estimatedTime: "1 month",
      color: "#f44336",
      tag: 'speaking',
      isActive: false,
      description: "Learn basic daily communication"
    },
    {
      id: "4",
      title: "Introduction to Korean",
      progress: "3/10",
      estimatedTime: "1 month",
      color: "#2196F3",
      tag: 'beginner',
      isActive: false,
      description: "Familiarize with the alphabet and basic pronunciation"
    },
    {
      id: "5",
      title: "Advanced Korean",
      progress: "2/25",
      estimatedTime: "4 months",
      color: "#9C27B0",
      tag: 'advanced',
      isActive: false,
      description: "Practice advanced language skills and literature"
    }
  ]
};

const courseTags = [
  { id: 'all', name: { vn: 'Tất cả', en: 'All' } },
  { id: 'beginner', name: { vn: 'Sơ cấp', en: 'Beginner' } },
  { id: 'intermediate', name: { vn: 'Trung cấp', en: 'Intermediate' } },
  { id: 'advanced', name: { vn: 'Cao cấp', en: 'Advanced' } },
  { id: 'speaking', name: { vn: 'Giao tiếp', en: 'Speaking' } },
];

const badgesData = {
  vn: [
    { id: '1', name: 'Siêng năng', icon: '🌟' },
    { id: '2', name: 'Học giỏi', icon: '🏆' },
    { id: '3', name: 'Xuất sắc', icon: '👑' }
  ],
  en: [
    { id: '1', name: 'Diligent', icon: '🌟' },
    { id: '2', name: 'Excellent Learner', icon: '🏆' },
    { id: '3', name: 'Outstanding', icon: '👑' }
  ]
};

const featuredLessonsData = {
  vn: [
    { 
      id: "featured_1",
      title: "Ngữ pháp cơ bản",
      duration: "2 giờ",
      image: require("../../assets/logo-icon.jpg"),
      preview: "Học cách sử dụng các mẫu câu cơ bản trong tiếng Hàn",
      difficulty: "Dễ",
      studentsCount: 1200,
      rating: 4.8,
      reviews: 156,
      level: "beginner"
    },
    {
      id: "featured_2", 
      title: "Từ vựng thông dụng",
      duration: "1.5 giờ",
      image: require("../../assets/illustration2.jpg"),
      preview: "500 từ vựng thông dụng nhất trong giao tiếp",
      difficulty: "Trung bình",
      studentsCount: 980,
      rating: 4.6,
      reviews: 124,
      level: "beginner"
    },
    {
      id: "featured_3",
      title: "Luyện nghe nâng cao",
      duration: "2.5 giờ", 
      image: require("../../assets/illustration2.jpg"),
      preview: "Luyện nghe với tốc độ thực tế của người bản xứ",
      difficulty: "Khó",
      studentsCount: 650,
      rating: 4.7,
      reviews: 89,
      level: "intermediate"
    }
  ],
  en: [
    { 
      id: "featured_1",
      title: "Basic Grammar",
      duration: "2 hours",
      image: require("../../assets/logo-icon.jpg"),
      preview: "Learn how to use basic Korean sentence patterns",
      difficulty: "Easy",
      studentsCount: 1200,
      rating: 4.8,
      reviews: 156,
      level: "beginner"
    },
    {
      id: "featured_2", 
      title: "Common Vocabulary",
      duration: "1.5 hours",
      image: require("../../assets/illustration2.jpg"),
      preview: "500 most common words in conversation",
      difficulty: "Medium",
      studentsCount: 980,
      rating: 4.6,
      reviews: 124,
      level: "beginner"
    },
    {
      id: "featured_3",
      title: "Advanced Listening Practice",
      duration: "2.5 hours", 
      image: require("../../assets/illustration2.jpg"),
      preview: "Practice listening at native speed",
      difficulty: "Hard",
      studentsCount: 650,
      rating: 4.7,
      reviews: 89,
      level: "intermediate"
    }
  ]
};

const rankingPeriods = [
  { id: 'week', label: { vn: 'Tuần này', en: 'This week' } },
  { id: 'month', label: { vn: 'Tháng này', en: 'This month' } }
];

const rankingCategories = [
  { id: 'all', label: { vn: 'Tất cả', en: 'All' } },
  { id: 'friends', label: { vn: 'Bạn bè', en: 'Friends' } },
  { id: 'beginner', label: { vn: 'Sơ cấp', en: 'Beginner' } },
  { id: 'intermediate', label: { vn: 'Trung cấp', en: 'Intermediate' } },
  { id: 'speaking', label: { vn: 'Giao tiếp', en: 'Speaking' } }
];

const sectionTitles = {
  vn: {
    yourCourses: "📚 Khóa học của bạn",
    recommended: "Đề xuất cho trình độ của bạn",
    featured: "🔥 Bài học nổi bật",
    viewAll: "Xem tất cả",
    rankings: "🏆 Bảng xếp hạng",
    dailyMission: "🎯 Nhiệm vụ hàng ngày",
    resetIn: "Làm mới sau",
    searchCourse: "Tìm khóa học...",
    todayLearn: "Hôm nay bạn muốn học gì?",
    hello: "Xin chào,",
    streak: "ngày liên tiếp 🔥"
  },
  en: {
    yourCourses: "📚 Your Courses",
    recommended: "Recommended for your level",
    featured: "🔥 Featured Lessons",
    viewAll: "View all",
    rankings: "🏆 Rankings",
    dailyMission: "🎯 Daily Missions",
    resetIn: "Reset in",
    searchCourse: "Search courses...",
    todayLearn: "What do you want to learn today?",
    hello: "Hello,",
    streak: "days in a row 🔥"
  }
};

const milestonesData = {
  vn: [
    {id: 1, title: 'Học 7 ngày liên tiếp', target: 7, reward: '100 xu'},
    {id: 2, title: 'Hoàn thành 50 bài học', target: 50, reward: '200 xu'},
    {id: 3, title: 'Đạt level 10', target: 10, reward: 'Avatar khung đặc biệt'}
  ],
  en: [
    {id: 1, title: 'Study 7 days in a row', target: 7, reward: '100 coins'},
    {id: 2, title: 'Complete 50 lessons', target: 50, reward: '200 coins'},
    {id: 3, title: 'Reach level 10', target: 10, reward: 'Special avatar frame'}
  ]
};

const HomeScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const translations = {
    vn: {
      gold: "Vàng",
      diamond: "Kim cương",
      score: "Điểm",
      rankings: "Xếp hạng",
      points: "điểm",
      nhiemvu: "Nhiệm vụ",
    },
    en: {
      gold: "Gold",
      diamond: "Diamond",
      score: "Score",
      rankings: "Rankings",
      points: "points",
      nhiemvu: "Missions",
    }
  };
  const t = translations[language];
  const tSection = sectionTitles[language];
  const badges = badgesData[language];
  const featuredLessons = featuredLessonsData[language];
  const milestones = milestonesData[language];
  const courses = coursesData[language];
  const topStudents = topStudentsData[language];

  // Dynamic styles for dark mode
  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#f4f3ff',
    },
    card: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
      borderRadius: 16,
      padding: 18,
      shadowColor: "#4b46f1",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDarkMode ? 0.18 : 0.10,
      shadowRadius: 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: isDarkMode ? '#2C2C2C' : '#e3e7fd',
    },
    label: {
      color: isDarkMode ? '#fff' : '#4b46f1',
      fontWeight: 'bold',
    },
    subtitle: {
      color: isDarkMode ? '#B3B3B3' : '#666',
      fontSize: 15,
      marginBottom: 2,
    },
    input: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderColor: isDarkMode ? '#555' : '#4b46f1',
      color: isDarkMode ? '#fff' : '#222',
      borderWidth: 1.5,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      marginBottom: 2,
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      shadowOpacity: isDarkMode ? 0.1 : 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: isDarkMode ? 0 : 2,
    },
    primaryButton: {
      backgroundColor: '#4b46f1',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderColor: '#4b46f1',
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    secondaryButtonText: {
      color: '#4b46f1',
      fontWeight: 'bold',
    },
  };

  const [userLevel, setUserLevel] = useState(5);
  const [userExp, setUserExp] = useState(750);
  const [maxExp, setMaxExp] = useState(1000);
  const [streakDays, setStreakDays] = useState(5);
  const [showBadges, setShowBadges] = useState(false);
  const [timeUntilReset, setTimeUntilReset] = useState('');
  const [missionHistory, setMissionHistory] = useState([]);
  const [streakBonus, setStreakBonus] = useState(1);
  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const rewardAnim = new Animated.Value(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [activeScrollCourse, setActiveScrollCourse] = useState(null);
  const [rankingPeriod, setRankingPeriod] = useState('week'); // week/month
  const [rankingCategory, setRankingCategory] = useState('all'); // all/friends/category
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const courseListRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow - now;
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilReset(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadMissionHistory();
    setupNotifications();
    loadUserProgress();
  }, []);

  useEffect(() => {
    if (activeScrollCourse) {
      setTimeout(() => {
        courseListRef.current?.scrollToItem({
          item: activeScrollCourse,
          animated: true
        });
      }, 500);
    }
  }, [activeScrollCourse]);

  useEffect(() => {
    // Check milestone completion
    milestones.forEach(milestone => {
      if (milestone.progress >= milestone.target) {
        // Show unlock animation
        setUnlockedAchievement({
          title: milestone.title,
          reward: milestone.reward
        });
      }
    });
    
    // Check level up
    if (userExp >= maxExp) {
      const newLevel = userLevel + 1;
      setUserLevel(newLevel);
      setUserExp(userExp - maxExp);
      setShowLevelUp(true);
    }
  }, [userExp, streakDays]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoadingProfile(true);
    const user = await fetchUserProfile();
    if (user) setUserProfile(user);
    setLoadingProfile(false);
  };

  const loadMissionHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('missionHistory');
      if (history) {
        setMissionHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading mission history:', error);
    }
  };

  const setupNotifications = async () => {
    const permission = await Notifications.requestPermissionsAsync();
    if (permission.granted) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Nhiệm vụ hàng ngày đang chờ!",
          body: "Hoàn thành nhiệm vụ để nhận thưởng đặc biệt nhé!"
        },
        trigger: { 
          hour: 20,
          minute: 0,
          repeats: true
        }
      });
    }
  };

  const loadUserProgress = async () => {
    try {
      const storedStreakDays = await AsyncStorage.getItem('streakDays');
      if (storedStreakDays) {
        setStreakDays(parseInt(storedStreakDays));
      }

      const totalLessons = courses.reduce((total, course) => {
        const [completed, all] = course.progress.split('/');
        return total + (parseInt(completed) / parseInt(all));
      }, 0);
      
      const averageProgress = (totalLessons / courses.length) * 100;
      setTotalProgress(averageProgress);
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  };

  const updateStreakDays = async (days) => {
    try {
      await AsyncStorage.setItem('streakDays', days.toString());
      setStreakDays(days);
    } catch (error) {
      console.error('Error updating streak days:', error);
    }
  };

  const handleMissionComplete = async (mission) => {
    const streakMultiplier = Math.floor(streakDays / 5);
    const bonusReward = mission.reward * (1 + streakMultiplier * 0.5);
    setRewardAmount(bonusReward);

    rewardAnim.setValue(0);
    setShowReward(true);
    Animated.sequence([
      Animated.spring(rewardAnim, {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true
      }),
      Animated.delay(1000),
      Animated.timing(rewardAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => setShowReward(false));

    const newHistory = [...missionHistory, {
      id: Date.now(),
      missionId: mission.id,
      reward: bonusReward,
      completedAt: new Date().toISOString()
    }];
    setMissionHistory(newHistory);
    await AsyncStorage.setItem('missionHistory', JSON.stringify(newHistory));

    setUserExp(prev => prev + bonusReward);
  };

  const handleMissionPress = (mission) => {
    handleMissionComplete(mission);
  };

  const handleAchievementPress = (achievement) => {
    if (!achievement) return;

    if (achievement === 'all') {
      navigation.navigate('Rankings', { screen: 'DetailRanking' });
      return;
    }

    ToastAndroid.show(
      `Thành tựu: ${achievement.title} - Tiến độ: ${achievement.progress}/${achievement.total}`, 
      ToastAndroid.SHORT
    );

    if (achievement.progress >= achievement.total) {
      const reward = Math.floor(achievement.total * 1.5);
      setUserExp(prev => prev + reward);
      
      ToastAndroid.show(
        `Chúc mừng! Bạn nhận được +${reward} EXP`, 
        ToastAndroid.LONG
      );
    }
  };

  const handleShareRanking = async (student) => {
    try {
      const result = await Share.share({
        message: `🏆 ${student.name} đã đạt ${student.points.total} điểm trên ứng dụng Korean Learning!`,
        title: 'Chia sẻ thành tích'
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share was dismissed');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const getLevelBorderColor = (level) => {
    if (level < 5) return '#4b46f1';
    if (level < 10) return '#ffd700';
    return '#ff4081';
  };

  const renderProgressBar = () => {
    const levelProgress = (userExp / maxExp) * 100;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>EXP:</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${levelProgress}%` }]} />
          </View>
          <Text style={styles.progressText}>{userExp}/{maxExp}</Text>
        </View>
        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Tổng tiến độ:</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${totalProgress}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round(totalProgress)}%</Text>
        </View>
      </View>
    );
  };

  const RewardPopup = () => {
    if (!showReward) return null;
    
    return (
      <Animated.View style={[styles.rewardPopup, {
        transform: [
          { scale: rewardAnim },
          { translateY: rewardAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0]
          })}
        ],
        opacity: rewardAnim
      }]}>
        <Text style={styles.rewardText}>+{rewardAmount} EXP</Text>
      </Animated.View>
    );
  };

  const getFilteredCourses = () => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === 'all' || course.tag === selectedTag;
      return matchesSearch && matchesTag;
    });
  };

  const getRecommendedCourses = () => {
    const userLevelTags = {
      0: 'beginner',
      5: 'intermediate', 
      10: 'advanced'
    };
    const recommendedTag = userLevelTags[Math.floor(userLevel/5)*5] || 'beginner';
    return courses.filter(course => course.tag === recommendedTag);
  };

  const getRecommendedLessons = () => {
    let levelTag;
    if (userLevel < 5) levelTag = "beginner";
    else if (userLevel < 10) levelTag = "intermediate";
    else levelTag = "advanced";
    
    return featuredLessons
      .filter(lesson => lesson.level === levelTag)
      .map(lesson => ({
        ...lesson,
        id: `recommended_${lesson.id}`
      }));
  };

  const getFilteredRankings = () => {
    let filtered = [...topStudents];
    
    if (rankingCategory === 'friends') {
      filtered = filtered.filter(student => student.isFriend);
    } else if (rankingCategory !== 'all') {
      filtered = filtered.filter(student => 
        student.categories.includes(rankingCategory)
      );
    }
    
    return filtered.sort((a, b) => b.points.total - a.points.total);
  };

  const renderCourseSection = () => (
    <View style={[styles.section, dynamicStyles.card]}>
      <Text style={[styles.sectionTitle, dynamicStyles.label]}>{tSection.yourCourses}</Text>
      
      <TextInput
        style={[styles.searchInput, dynamicStyles.input]}
        placeholder={tSection.searchCourse}
        placeholderTextColor={isDarkMode ? '#888888' : '#666'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tagContainer}
      >
        {courseTags.map(tag => (
          <TouchableOpacity
            key={tag.id}
            style={[
              styles.tagButton,
              selectedTag === tag.id && styles.tagButtonActive
            ]}
            onPress={() => setSelectedTag(tag.id)}
          >
            <Text style={[
              styles.tagText,
              selectedTag === tag.id && styles.tagTextActive
            ]}>
              {tag.name[language]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        ref={courseListRef}
        horizontal
        data={getFilteredCourses()}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.courseCard, { backgroundColor: item.color }]}
            onPress={() => {
              if (item.title === "Tiếng Hàn Cơ Bản" || item.title === "Basic Korean") {
                navigation.navigate('LessonStack', {
                  screen: 'BasicKoreanLessonsScreen',
                });
              } else if (item.title === "Nhập môn tiếng Hàn" || item.title === "Introduction to Korean") {
                navigation.navigate("LessonStack", {
                  screen: "AlphabetHomeScreen",
                });
              } else {
                alert(`Bạn đã chọn khóa học: ${item.title}`);
              }
            }}
          >
            <Text style={styles.courseProgress}>{item.progress} bài</Text>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <View style={styles.courseProgressBar}>
              <View 
                style={[
                  styles.courseProgressFill,
                  {width: `${(parseInt(item.progress)/parseInt(item.progress.split('/')[1])*100)}%`}
                ]} 
              />
            </View>
            <Text style={styles.courseTime}>⏱️ {item.estimatedTime}</Text>
            <Text style={styles.courseTag}>#{courseTags.find(t => t.id === item.tag)?.name[language]}</Text>
          </TouchableOpacity>
        )}
      />

      {getRecommendedCourses().length > 0 && (
        <>
          <Text style={[styles.recommendedTitle, dynamicStyles.label]}>
            {tSection.recommended}
          </Text>
          <FlatList
            horizontal
            data={getRecommendedCourses()}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity 
                style={[styles.recommendedCard, {backgroundColor: item.color}]}
              >
                <Text style={styles.recommendedTitle}>{item.title}</Text>
                <Text style={styles.recommendedDesc}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );

  const renderFeaturedSection = () => (
    <View style={[styles.section, dynamicStyles.card]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, dynamicStyles.label]}>{tSection.featured}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllLessons')}>
          <Text style={[styles.viewAll, dynamicStyles.label]}>{tSection.viewAll}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={[...getRecommendedLessons(), ...featuredLessons]} 
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() => {
              navigation.navigate('LessonDetail', { lesson: item });
            }}
          >
            <Image source={item.image} style={styles.featuredImage} />
            <View style={styles.featuredContent}>
              <Text style={[styles.featuredTitle, dynamicStyles.label]}>{item.title}</Text>
              
              <Text style={[styles.featuredPreview, dynamicStyles.label]} numberOfLines={2}>
                {item.preview}
              </Text>

              <View style={styles.featuredMeta}>
                <View style={styles.metaItem}>
                  <Text style={[styles.difficultyTag, 
                    {backgroundColor: 
                      item.difficulty === "Dễ" || item.difficulty === "Easy" ? "#4CAF50" :
                      item.difficulty === "Trung bình" || item.difficulty === "Medium" ? "#FFA000" : "#F44336"
                    }
                  ]}>
                    {item.difficulty}
                  </Text>
                </View>
                
                <View style={styles.metaItem}>
                  <FontAwesome5 name="clock" size={12} color="#666" />
                  <Text style={[styles.metaText, dynamicStyles.label]}>{item.duration}</Text>
                </View>

                <View style={styles.metaItem}>
                  <FontAwesome5 name="user-friends" size={12} color="#666" />
                  <Text style={[styles.metaText, dynamicStyles.label]}>
                    {item.studentsCount.toLocaleString()}
                  </Text>
                </View>
              </View>

              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  {Array(5).fill(0).map((_, i) => (
                    <FontAwesome5 
                      key={i}
                      name="star"
                      size={12}
                      color={i < Math.floor(item.rating) ? "#FFC107" : "#ddd"}
                    />
                  ))}
                </View>
                <Text style={[styles.ratingText, dynamicStyles.label]}>
                  {item.rating} ({item.reviews})
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderRankingSection = () => (
    <View style={[styles.section, dynamicStyles.card]}>
      <View style={styles.rankingHeader}>
        <Text style={[styles.sectionTitle, dynamicStyles.label]}>{tSection.rankings}</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {rankingPeriods.map(period => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.filterButton,
                rankingPeriod === period.id && styles.filterButtonActive
              ]}
              onPress={() => setRankingPeriod(period.id)}
            >
              <Text style={[
                styles.filterText,
                rankingPeriod === period.id && styles.filterTextActive
              ]}>
                {period.label[language]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {rankingCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.filterButton,
                rankingCategory === category.id && styles.filterButtonActive
              ]}
              onPress={() => setRankingCategory(category.id)}
            >
              <Text style={[
                styles.filterText,
                rankingCategory === category.id && styles.filterTextActive
              ]}>
                {category.label[language]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {getFilteredRankings().map((student, index) => (
        <Animated.View 
          key={student.id} 
          style={[
            styles.studentCard,
            index === 0 && styles.leaderCard,
            {
              transform: [
                { scale: index === 0 ? 1.02 : 1 }
              ]
            }
          ]}
        >
          <View style={styles.studentInfo}>
            <Text style={[
              styles.rank, 
              index === 0 && styles.leaderRank
            ]}>#{index + 1}</Text>
            <Image 
              source={student.avatar} 
              style={styles.studentAvatar}
            />
            <View style={styles.studentDetails}>
              <Text style={[styles.studentName, dynamicStyles.label]}>{student.name}</Text>
              <View style={styles.pointsBreakdown}>
                <Text style={[styles.pointsText, dynamicStyles.label]}>🎯 Học tập: {student.points.learning}</Text>
                <Text style={[styles.pointsText, dynamicStyles.label]}>🔥 Chuỗi: {student.points.streak}</Text>
                <Text style={[styles.pointsText, dynamicStyles.label]}>✨ Nhiệm vụ: {student.points.missions}</Text>
              </View>
            </View>
          </View>

          <View style={styles.studentActions}>
            <Text style={[styles.totalPoints, dynamicStyles.label]}>{student.points.total}</Text>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => handleShareRanking(student)}
            >
              <FontAwesome5 name="share-alt" size={16} color={isDarkMode ? "#00ADB5" : "#4b46f1"} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      ))}
    </View>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProfile();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={[styles.container, dynamicStyles.container]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#4b46f1", "#00ADB5"]}
          tintColor={isDarkMode ? "#fff" : "#4b46f1"}
        />
      }
    >
      <View style={styles.userInfo}>
        <View style={[styles.avatarContainer, { borderColor: getLevelBorderColor(userProfile?.level ?? 1) }]}>
          <Image
            source={
              userProfile?.avatar && typeof userProfile.avatar === 'string' && userProfile.avatar.trim() !== ''
                ? { uri: userProfile.avatar }
                : { uri: 'https://via.placeholder.com/150' }
            }
            style={styles.avatar}
          />
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Lv.{userProfile?.level ?? 1}</Text>
          </View>
        </View>
     
      
      
        <View style={styles.textContainer}>
          <Text style={[styles.greeting, dynamicStyles.label]}>{tSection.hello} {userProfile?.username || 'User'}!</Text>
          <Text style={[styles.subtitle, dynamicStyles.subtitle]}>{tSection.todayLearn}</Text>
          {/* Thanh EXP */}
          <View style={styles.progressContainer}>
            <View style={styles.progressRow}>
              <Text style={[styles.progressLabel, dynamicStyles.label]}>EXP:</Text>
              <View style={styles.progressBar}>
                <View style={[
                  styles.progressFill,
                  { width: `${((userProfile?.experience ?? 0) / 1000) * 100}%` }
                ]} />
              </View>
              <Text style={[styles.progressText, dynamicStyles.label]}>{userProfile?.experience ?? 0}/1000</Text>
            </View>
          </View>
        </View>
        {/* Nút refresh profile */}
         <TouchableOpacity 
        
          onPress={() => navigation.navigate('NotificationsScreen')}
        >
          <FontAwesome5 name="bell" size={16} color="#4b46f1" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {userProfile?.dailyStreak > 0 && (
        <View style={styles.streakContainer}>
          <FontAwesome5 name="fire" size={20} color="#f44336" />
          <Text style={[styles.streakText, dynamicStyles.label]}>
            {userProfile.dailyStreak} {tSection.streak}
          </Text>
        </View>
      )}

      {showBadges && (
        <View style={styles.badgesContainer}>
          {badges.map(badge => (
            <TouchableOpacity key={badge.id} style={styles.badgeItem}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <Text style={[styles.badgeName, dynamicStyles.label]}>{badge.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 16 }}>
        {/* Nút nhận thưởng hàng ngày */}
        <TouchableOpacity
          style={{
            backgroundColor: '#4CAF50',
            padding: 10,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
          }}
          onPress={() => navigation.navigate('DailyReward')}
        >
          <FontAwesome5 name="gift" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Thông tin vàng, kim cương, điểm */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', marginHorizontal: 8 }}>
            <Text style={{ fontSize: 20 }}>🪙</Text>
            <Text style={[{ fontSize: 12, fontWeight: 'bold' }, dynamicStyles.label]}>{userProfile?.gold ?? 0}</Text>
            <Text style={{ fontSize: 10 }}>{t.gold}</Text>
          </View>
          <View style={{ alignItems: 'center', marginHorizontal: 8 }}>
            <Text style={{ fontSize: 20 }}>💎</Text>
            <Text style={[{ fontSize: 12, fontWeight: 'bold' }, dynamicStyles.label]}>{userProfile?.diamond ?? 0}</Text>
            <Text style={{ fontSize: 10 }}>{t.diamond}</Text>
          </View>
          <View style={{ alignItems: 'center', marginHorizontal: 8 }}>
            <Text style={{ fontSize: 20 }}>⭐</Text>
            <Text style={[{ fontSize: 12, fontWeight: 'bold' }, dynamicStyles.label]}>{userProfile?.score ?? 0}</Text>
            <Text style={{ fontSize: 10 }}>{t.score}</Text>
          </View>
        </View>
      </View>

      <View style={styles.missionHeader}>
        <Text style={[styles.sectionTitle, dynamicStyles.label]}>{tSection.dailyMission}</Text>
        <Text style={[styles.resetTimer, dynamicStyles.label]}>{tSection.resetIn} {timeUntilReset}</Text>
      </View>

      <DailyMission onPress={handleMissionPress} />
      <Achievement onPress={handleAchievementPress} />

      <DailyLoginReward />
      
      {unlockedAchievement && (
        <AchievementUnlock
          achievement={unlockedAchievement}
          onComplete={() => setUnlockedAchievement(null)}
        />
      )}
      
      <LevelUpModal
        visible={showLevelUp}
        level={userLevel}
        rewards={[
          {icon: '💰', description: '1000 coins'},
          {icon: '💎', description: '5 gems'},
          {icon: '🎁', description: 'New avatar frame'}
        ]}
        onClose={() => setShowLevelUp(false)}
      />

      {renderCourseSection()}
      {renderFeaturedSection()}
      {renderRankingSection()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: 'relative',
    borderWidth: 3,
    borderRadius: 25,
    padding: 2,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    marginRight: 12,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#00ADB5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 5,
    width: '100%',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  progressLabel: {
    fontSize: 12,
    width: 80,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    flex: 1,
    marginHorizontal: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4b46f1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    marginTop: 2,
  },
  notificationBadge: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff4444",
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#eee',
  },
  badgeItem: {
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  badgeName: {
    fontSize: 12,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    marginTop: 0,
    padding: 12,
    backgroundColor: "#fff4f4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffe0e0",
  },
  streakText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  missionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  resetTimer: {
    fontSize: 12,
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  courseCard: {
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    width: 140,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  courseProgress: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  courseProgressBar: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginTop: 8,
  },
  courseProgressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  courseTime: {
    fontSize: 12,
    marginTop: 8,
  },
  courseTag: {
    fontSize: 11,
    marginTop: 4,
  },
  searchInput: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  tagContainer: {
    marginBottom: 12,
  },
  tagButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tagButtonActive: {},
  tagText: {},
  tagTextActive: {},
  recommendedTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
  },
  recommendedCard: {
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 200,
  },
  recommendedDesc: {
    fontSize: 12,
    marginTop: 8,
  },
  featuredPreview: {
    fontSize: 13,
    marginBottom: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    lineHeight: 18,
  },
  featuredMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  difficultyTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 11,
  },
  stars: {
    flexDirection: 'row',
    marginLeft: 4,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {
    fontSize: 14,
  },
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  rank: {
    fontSize: 16,
    fontWeight: "600",
    width: 30,
  },
  

  rewardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rankingHeader: {
    marginBottom: 16,
  },
  filterContainer: {
    marginTop: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  filterButtonActive: {},
  filterText: {
    fontSize: 12,
  },
  filterTextActive: {},
  leaderCard: {
    borderWidth: 2,
  },
  leaderRank: {},
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  studentDetails: {
    flex: 1,
  },
  pointsBreakdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  pointsText: {
    fontSize: 11,
    marginRight: 8,
  },
  studentActions: {
    alignItems: 'center',
  },
  totalPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  shareButton: {
    padding: 4,
  },
  featuredImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 10,
    // khoang cach giua cac hinh 
    margin: 4,

  },
  rewardPopup: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  rewardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default HomeScreen;
