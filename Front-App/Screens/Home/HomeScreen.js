import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity, 
  Image,
  ScrollView,
  Animated,
  TextInput,
  Share,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import DailyMission from './DailyMission';
import Achievement from './Achievement';
import headerStyles from '../../Styles/HeaderStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import DailyLoginReward from '../../Components/Rewards/DailyLoginReward';
import AchievementUnlock from '../../Components/Achievements/AchievementUnlock';
import LevelUpModal from '../../Components/LevelUp/LevelUpModal';

const HomeScreen = ({ navigation }) => {
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
  const [milestones] = useState([
    {id: 1, title: 'Học 7 ngày liên tiếp', target: 7, progress: streakDays, reward: '100 xu'},
    {id: 2, title: 'Hoàn thành 50 bài học', target: 50, progress: 23, reward: '200 xu'},
    {id: 3, title: 'Đạt level 10', target: 10, progress: userLevel, reward: 'Avatar khung đặc biệt'}
  ]);

  const courseTags = [
    { id: 'all', name: 'Tất cả' },
    { id: 'beginner', name: 'Sơ cấp' },
    { id: 'intermediate', name: 'Trung cấp' },
    { id: 'advanced', name: 'Cao cấp' },
    { id: 'speaking', name: 'Giao tiếp' },
  ];

  const [badges, setBadges] = useState([
    { id: '1', name: 'Siêng năng', icon: '🌟' },
    { id: '2', name: 'Học giỏi', icon: '🏆' },
    { id: '3', name: 'Xuất sắc', icon: '👑' }
  ]);

  const courses = [
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
    }
  ];

  const featuredLessons = [
    { 
      id: "featured_1",
      title: "Ngữ pháp cơ bản",
      duration: "2 giờ",
      image: require("../../assets/logo.png"),
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
      image: require("../../assets/illustration2.png"),
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
      image: require("../../assets/illustration2.png"),
      preview: "Luyện nghe với tốc độ thực tế của người bản xứ",
      difficulty: "Khó",
      studentsCount: 650,
      rating: 4.7,
      reviews: 89,
      level: "intermediate"
    }
  ];

  const topStudents = [
    { 
      id: "1", 
      name: "Nguyễn Văn A", 
      points: {
        total: 1200,
        learning: 500,
        streak: 300,
        missions: 400
      },
      isFriend: true,
      categories: ['beginner', 'speaking'],
      avatar: require("../../assets/avatar1.png")
    },
    { 
      id: "2", 
      name: "Trần Thị B", 
      points: {
        total: 1150,
        learning: 450,
        streak: 350,
        missions: 350
      },
      isFriend: false,
      categories: ['intermediate'],
      avatar: require("../../assets/avatar2.png")
    },
    { 
      id: "3", 
      name: "Lê Minh C", 
      points: {
        total: 1100,
        learning: 400,
        streak: 300,
        missions: 400
      },
      isFriend: true,
      categories: ['advanced'],
      avatar: require("../../assets/avatar3.png")
    },
  ];

  const rankingPeriods = [
    { id: 'week', label: 'Tuần này' },
    { id: 'month', label: 'Tháng này' }
  ];

  const rankingCategories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'friends', label: 'Bạn bè' },
    { id: 'beginner', label: 'Sơ cấp' },
    { id: 'intermediate', label: 'Trung cấp' },
    { id: 'speaking', label: 'Giao tiếp' }
  ];

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000" : "#fff",
    },
    text: {
      color: isDarkMode ? "#fff" : "#333",
    },
    subtitle: {
      color: isDarkMode ? "#ccc" : "#666",
    },
    card: {
      backgroundColor: isDarkMode ? "#333" : "#fff",
      borderColor: isDarkMode ? "#444" : "#eee",
    },
    input: {
      backgroundColor: isDarkMode ? "#444" : "#f5f5f5",
      color: isDarkMode ? "#fff" : "#000",
    },
    button: {
      backgroundColor: isDarkMode ? "#6a0dad" : "#ffd700",
    },
    buttonText: {
      color: isDarkMode ? "#fff" : "#000",
    },
  };

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
    if (level < 5) return isDarkMode ? "#6a0dad" : "#4b46f1";
    if (level < 10) return "#ffd700";
    return "#ff4081";
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

  const courseListRef = React.useRef(null);

  const renderCourseSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📚 Khóa học của bạn</Text>
      
      <TextInput
        style={[styles.searchInput, dynamicStyles.input]}
        placeholder="Tìm khóa học..."
        placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
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
              {tag.name}
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
            <Text style={styles.courseTag}>#{courseTags.find(t => t.id === item.tag)?.name}</Text>
          </TouchableOpacity>
        )}
      />

      {getRecommendedCourses().length > 0 && (
        <>
          <Text style={styles.recommendedTitle}>
            Đề xuất cho trình độ của bạn
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
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🔥 Bài học nổi bật</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllLessons')}>
          <Text style={styles.viewAll}>Xem tất cả</Text>
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
              <Text style={styles.featuredTitle}>{item.title}</Text>
              
              <Text style={styles.featuredPreview} numberOfLines={2}>
                {item.preview}
              </Text>

              <View style={styles.featuredMeta}>
                <View style={styles.metaItem}>
                  <Text style={[styles.difficultyTag, 
                    {backgroundColor: 
                      item.difficulty === "Dễ" ? "#4CAF50" :
                      item.difficulty === "Trung bình" ? "#FFA000" : "#F44336"
                    }
                  ]}>
                    {item.difficulty}
                  </Text>
                </View>

                <View style={styles.metaItem}>
                  <FontAwesome5 name="clock" size={12} color="#666" />
                  <Text style={styles.metaText}>{item.duration}</Text>
                </View>

                <View style={styles.metaItem}>
                  <FontAwesome5 name="user-friends" size={12} color="#666" />
                  <Text style={styles.metaText}>
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
                <Text style={styles.ratingText}>
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
    <View style={styles.section}>
      <View style={styles.rankingHeader}>
        <Text style={styles.sectionTitle}>🏆 Bảng xếp hạng</Text>
        
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
                {period.label}
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
                {category.label}
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
              <Text style={styles.studentName}>{student.name}</Text>
              <View style={styles.pointsBreakdown}>
                <Text style={styles.pointsText}>🎯 Học tập: {student.points.learning}</Text>
                <Text style={styles.pointsText}>🔥 Chuỗi: {student.points.streak}</Text>
                <Text style={styles.pointsText}>✨ Nhiệm vụ: {student.points.missions}</Text>
              </View>
            </View>
          </View>

          <View style={styles.studentActions}>
            <Text style={styles.totalPoints}>{student.points.total}</Text>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => handleShareRanking(student)}
            >
              <FontAwesome5 name="share-alt" size={16} color="#4b46f1" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      ))}
    </View>
  );

  return (
    <ScrollView style={dynamicStyles.container}>
      <View style={headerStyles.container}>
        <Text style={[headerStyles.title, dynamicStyles.text]}>Trang chủ</Text>
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={() => navigation.navigate('NotificationsScreen')}
        >
          <FontAwesome5 name="bell" size={16} color={isDarkMode ? "#6a0dad" : "#4b46f1"} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <RewardPopup />

      <View style={styles.userInfo}>
        <View style={[styles.avatarContainer, { borderColor: getLevelBorderColor(userLevel) }]}>
          <Image
            source={require("../../assets/illustration1.png")}
            style={styles.avatar}
          />
          <View style={[styles.levelBadge, { backgroundColor: isDarkMode ? "#6a0dad" : "#4b46f1" }]}>
            <Text style={styles.levelText}>Lv.{userLevel}</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.greeting, dynamicStyles.text]}>Xin chào, Minh Hoàng!</Text>
          <Text style={[styles.subtitle, dynamicStyles.subtitle]}>Hôm nay bạn muốn học gì?</Text>
          {renderProgressBar()}
        </View>
        <TouchableOpacity 
          style={[styles.badgesButton, dynamicStyles.button]}
          onPress={() => setShowBadges(!showBadges)}
        >
          <Text style={[styles.badgesButtonText, dynamicStyles.buttonText]}>🏅</Text>
        </TouchableOpacity>
      </View>

      {showBadges && (
        <View style={[styles.badgesContainer, dynamicStyles.card]}>
          {badges.map(badge => (
            <TouchableOpacity key={badge.id} style={styles.badgeItem}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <Text style={[styles.badgeName, dynamicStyles.text]}>{badge.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={[styles.streakContainer, dynamicStyles.card]}>
        <FontAwesome5 name="fire" size={20} color="#f44336" />
        <Text style={[styles.streakText, dynamicStyles.text]}>{streakDays} ngày liên tiếp 🔥</Text>
      </View>

      <View style={styles.missionHeader}>
        <Text style={[styles.sectionTitle, dynamicStyles.text]}>🎯 Nhiệm vụ hàng ngày</Text>
        <Text style={[styles.resetTimer, dynamicStyles.subtitle]}>Làm mới sau {timeUntilReset}</Text>
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
    backgroundColor: "#fff",
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
    position: "absolute",
    bottom: -5,
    right: -5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  levelText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 15,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 13,
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
    color: '#666',
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
    color: '#666',
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
  badgesButton: {
    padding: 8,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgesButtonText: {
    fontSize: 14,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
    borderWidth: 1,
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
    borderRadius: 8,
    borderWidth: 1,
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  courseProgress: {
    fontSize: 14,
    color: "#4b46f1",
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
  tagButtonActive: {
    backgroundColor: '#4b46f1',
  },
  tagText: {
    color: '#666',
  },
  tagTextActive: {
    color: '#fff',
  },
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
  featuredCard: {
    borderRadius: 12,
    marginRight: 12,
    width: 280,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  featuredImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredContent: {
    padding: 12,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featuredPreview: {
    fontSize: 13,
    marginBottom: 8,
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
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAll: {
    fontSize: 14,
    color: '#4b46f1',
  },
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  rank: {
    fontSize: 16,
    fontWeight: "600",
    width: 30,
  },
  studentName: {
    fontSize: 14,
    flex: 1,
  },
  studentPoints: {
    fontSize: 14,
    fontWeight: "600",
  },
  rewardPopup: {
    position: 'absolute',
    top: 100,
    left: '50%',
    transform: [{ translateX: -75 }],
    width: 150,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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
  filterButtonActive: {
    backgroundColor: '#4b46f1',
  },
  filterText: {
    fontSize: 12,
  },
  filterTextActive: {
    color: '#fff',
  },
  leaderCard: {
    borderColor: '#ffd700',
    borderWidth: 2,
  },
  leaderRank: {
    color: '#ffd700',
  },
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
});

export default HomeScreen;
