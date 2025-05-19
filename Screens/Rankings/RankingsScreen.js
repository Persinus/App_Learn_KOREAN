import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import headerStyles from '../../Styles/HeaderStyles';

// Định nghĩa các chuỗi đa ngôn ngữ
const translations = {
  vn: {
    community: "Cộng đồng",
    rankings: "Xếp hạng",
    social: "Cộng đồng",
    top3Players: "🏆 Top 3 Người Chơi",
    confirm: "Xác nhận",
    acceptFriendRequest: "Chấp nhận lời mời kết bạn?",
    declineFriendRequest: "Từ chối lời mời kết bạn?",
    cancel: "Hủy",
    agree: "Đồng ý",
    friends: "Bạn bè",
    friendRequests: "Lời mời kết bạn",
    friendsList: "Danh sách bạn bè",
    online: "Đang hoạt động",
    lastActive: "Hoạt động lần cuối",
    points: "điểm",
  },
  en: {
    community: "Community",
    rankings: "Rankings",
    social: "Social",
    top3Players: "🏆 Top 3 Players",
    confirm: "Confirm",
    acceptFriendRequest: "Accept friend request?",
    declineFriendRequest: "Decline friend request?",
    cancel: "Cancel",
    agree: "Agree",
    friends: "Friends",
    friendRequests: "Friend Requests",
    friendsList: "Friends List",
    online: "Online",
    lastActive: "Last Active",
    points: "points",
  },
};

const rankings = [
  { id: "1", name: "Nguyễn Văn A", score: 1500, image: require("../../assets/avatar_1.jpg") },
  { id: "2", name: "Trần Thị B", score: 1400, image: require("../../assets/avatar_2.jpg") },
  { id: "3", name: "Lê Văn C", score: 800, image: require("../../assets/avatar_3.jpg") },
  { id: "4", name: "Phạm D", score: 300, image: require("../../assets/avatar_4.jpg") },
  { id: "5", name: "Ngô Văn E", score: 200, image: require("../../assets/avatar_4.jpg") },
];

const rankIcons = {
  S: require("../../assets/rank_s.jpg"),
  A: require("../../assets/rank_a.jpg"),
  B: require("../../assets/rank_b.jpg"),
  C: require("../../assets/rank_c.jpg"),
};

const getRank = (score) => {
  if (score >= 1500) return "S";
  if (score >= 1000) return "A";
  if (score >= 500) return "B";
  return "C";
};

const rankStyles = {
  S: {
    color: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderColor: '#FFD700'
  },
  A: {
    color: '#C0C0C0',
    backgroundColor: 'rgba(192, 192, 192, 0.1)',
    borderColor: '#C0C0C0'
  },
  B: {
    color: '#CD7F32',
    backgroundColor: 'rgba(205, 127, 50, 0.1)',
    borderColor: '#CD7F32'
  },
  C: {
    color: '#666',
    backgroundColor: 'rgba(102, 102, 102, 0.1)',
    borderColor: '#666'
  }
};

const socialFeatures = [
  {
    id: 'friends',
    title: 'Bạn bè',
    icon: 'user-friends',
    count: 25
  },
  {
    id: 'groups',
    title: 'Nhóm học',
    icon: 'users',
    count: 3
  },
  {
    id: 'challenges',
    title: 'Thử thách',
    icon: 'trophy',
    count: 5
  },
  {
    id: 'messages',
    title: 'Tin nhắn',
    icon: 'comment-dots',
    count: 12
  }
];

const activities = [
  {
    id: '1',
    user: "Nguyễn Văn A", 
    avatar: require("../../assets/avatar_1.jpg"),
    action: "đã hoàn thành",
    target: "Bài học số 5",
    time: "2 giờ trước"
  },
  {
    id: '2', 
    user: "Trần Thị B",
    avatar: require("../../assets/avatar_2.jpg"),
    action: "đạt thành tích",
    target: "Học 7 ngày liên tiếp", 
    time: "5 giờ trước"
  },
  {
    id: '3',
    user: "Kim Min Ho",
    avatar: require("../../assets/avatar_3.jpg"),
    action: "đã chia sẻ tiến độ",
    target: "Hoàn thành 80% khóa học Giao tiếp cơ bản",
    time: "6 giờ trước",
    progress: 80
  }
];

const friendSystem = {
  requests: [
    { id: '1', name: 'Nguyen Van X', avatar: require("../../assets/avatar_1.jpg"), status: 'pending' },
    { id: '2', name: 'Tran Thi Y', avatar: require("../../assets/avatar_2.jpg"), status: 'pending' }
  ],
  friends: [
    { id: '1', name: 'Le Van A', avatar: require("../../assets/avatar_3.jpg"), status: 'online', lastActive: 'Vừa xong' },
    { id: '2', name: 'Pham Thi B', avatar: require("../../assets/avatar_4.jpg"), status: 'offline', lastActive: '2 giờ trước' }
  ]
};

const studyGroups = [
  {
    id: '1',
    name: 'Nhóm TOPIK 2023',
    members: 15,
    avatar: require("../../assets/avatar_1.jpg"), // Using existing avatar as placeholder
    lastActivity: 'Vừa xong'
  },
  {
    id: '2', 
    name: 'Giao tiếp cơ bản',
    members: 8,
    avatar: require("../../assets/avatar_2.jpg"), // Using existing avatar as placeholder 
    lastActivity: '1 giờ trước'
  }
];

const Podium = ({ topThree, navigation, t }) => {
  return (
    <View style={styles.podiumWrapper}>
      <Text style={styles.sectionTitle}>{t.top3Players}</Text>
      <View style={styles.podiumContainer}>
        {/* Hạng 2 */}
        <TouchableOpacity 
          style={[styles.podiumItem, styles.secondPlace]}
          onPress={() => navigation.navigate('DetailRanking', { user: {...topThree[1], rank: getRank(topThree[1].score)} })}
        >
          <View style={styles.podiumContent}>
            <Image source={topThree[1].image} style={styles.podiumAvatar} />
            <Text style={styles.podiumName} numberOfLines={1}>{topThree[1].name}</Text>
            <View style={[styles.rankBadge, { backgroundColor: rankStyles.A.backgroundColor }]}>
              <Text style={[styles.rankText, { color: rankStyles.A.color }]}>{topThree[1].score} {t.points}</Text>
            </View>
          </View>
          <View style={styles.medalContainer}>
            <FontAwesome5 name="medal" size={24} color="#C0C0C0" />
          </View>
        </TouchableOpacity>

        {/* Hạng 1 */}
        <TouchableOpacity 
          style={[styles.podiumItem, styles.firstPlace]}
          onPress={() => navigation.navigate('DetailRanking', { user: {...topThree[0], rank: getRank(topThree[0].score)} })}
        >
          <View style={styles.podiumContent}>
            <Image source={topThree[0].image} style={styles.podiumAvatar} />
            <Text style={styles.podiumName} numberOfLines={1}>{topThree[0].name}</Text>
            <View style={[styles.rankBadge, { backgroundColor: rankStyles.S.backgroundColor }]}>
              <Text style={[styles.rankText, { color: rankStyles.S.color }]}>{topThree[0].score} {t.points}</Text>
            </View>
          </View>
          <View style={styles.medalContainer}>
            <FontAwesome5 name="crown" size={24} color="#FFD700" />
          </View>
        </TouchableOpacity>

        {/* Hạng 3 */}
        <TouchableOpacity 
          style={[styles.podiumItem, styles.thirdPlace]}
          onPress={() => navigation.navigate('DetailRanking', { user: {...topThree[2], rank: getRank(topThree[2].score)} })}
        >
          <View style={styles.podiumContent}>
            <Image source={topThree[2].image} style={styles.podiumAvatar} />
            <Text style={styles.podiumName} numberOfLines={1}>{topThree[2].name}</Text>
            <View style={[styles.rankBadge, { backgroundColor: rankStyles.B.backgroundColor }]}>
              <Text style={[styles.rankText, { color: rankStyles.B.color }]}>{topThree[2].score} {t.points}</Text>
            </View>
          </View>
          <View style={styles.medalContainer}>
            <FontAwesome5 name="medal" size={24} color="#CD7F32" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RankingsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('rankings');
  const [showSocialModal, setShowSocialModal] = useState(false); 
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  // Lấy trạng thái ngôn ngữ từ Redux
  const language = useSelector((state) => state.language.language);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  // Lấy chuỗi dịch dựa trên ngôn ngữ hiện tại
  const t = translations[language];

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#0099FF' : '#fff', // Nền xanh cho Dark Mode
    },
    sectionTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    rankCard: {
      backgroundColor: isDarkMode ? '#6666FF' : '#fff', // Màu tím cho Dark Mode
      borderColor: isDarkMode ? '#444' : '#eee',
    },
    rankName: {
      color: isDarkMode ? '#fff' : '#333',
    },
    rankText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    tab: {
      backgroundColor: isDarkMode ? '#6666FF' : '#fff',
    },
    tabText: {
      color: isDarkMode ? '#fff' : '#666',
    },
    activeTabText: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
  };

  const renderProgress = (progress) => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );

  const renderHeader = () => (
    <Podium topThree={rankings.slice(0, 3)} navigation={navigation} t={t} />
  );

  const handleFriendRequest = (id, action) => {
    Alert.alert(
      t.confirm,
      action === 'accept' ? t.acceptFriendRequest : t.declineFriendRequest,
      [
        { text: t.cancel, style: 'cancel' },
        { 
          text: t.agree,
          onPress: () => {
            console.log(`Friend request ${action}ed:`, id);
          }
        }
      ]
    );
  };

  const renderFriendModal = () => (
    <Modal
      visible={showFriendModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowFriendModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t.friends}</Text>
          
          {friendSystem.requests.length > 0 && (
            <View style={styles.requestsSection}>
              <Text style={styles.sectionTitle}>{t.friendRequests}</Text>
              {friendSystem.requests.map(request => (
                <View key={request.id} style={styles.friendRequest}>
                  <Image source={request.avatar} style={styles.requestAvatar} />
                  <Text style={styles.requestName}>{request.name}</Text>
                  <View style={styles.requestActions}>
                    <TouchableOpacity 
                      style={styles.acceptButton}
                      onPress={() => handleFriendRequest(request.id, 'accept')}
                    >
                      <Text style={styles.buttonText}>{t.agree}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.declineButton}
                      onPress={() => handleFriendRequest(request.id, 'decline')}
                    >
                      <Text style={styles.buttonText}>{t.cancel}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={styles.friendsList}>
            <Text style={styles.sectionTitle}>{t.friendsList}</Text>
            {friendSystem.friends.map(friend => (
              <TouchableOpacity 
                key={friend.id} 
                style={styles.friendItem}
                onPress={() => {
                  setShowFriendModal(false);
                  setShowChatModal(true);
                }}
              >
                <Image source={friend.avatar} style={styles.friendAvatar} />
                <View style={styles.friendInfo}>
                  <Text style={styles.friendName}>{friend.name}</Text>
                  <Text style={[
                    styles.friendStatus,
                    {color: friend.status === 'online' ? '#4CAF50' : '#999'}
                  ]}>
                    {friend.status === 'online' ? t.online : `${t.lastActive}: ${friend.lastActive}`}
                  </Text>
                </View>
                <FontAwesome5 name="comment" size={16} color="#4b46f1" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );

  const handleSocialFeaturePress = (feature) => {
    switch(feature) {
      case 'friends':
        setShowFriendModal(true);
        break;
      case 'groups':
        setShowGroupModal(true);
        break;
      case 'messages':
        setShowChatModal(true);
        break;
      default:
        setShowSocialModal(true);
        setSelectedFeature(feature);
    }
  };

  const renderSocialFeatures = () => (
    <View style={styles.socialContainer}>
      <Text style={styles.sectionTitle}>🤝 {t.social}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {socialFeatures.map(feature => (
          <TouchableOpacity
            key={feature.id}
            style={styles.socialCard}
            onPress={() => handleSocialFeaturePress(feature.id)}
          >
            <View style={styles.socialIconContainer}>
              <FontAwesome5 name={feature.icon} size={20} color="#4b46f1" />
              {feature.count > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{feature.count}</Text>
                </View>
              )}
            </View>
            <Text style={styles.socialTitle}>{feature.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderActivityFeed = () => (
    <View style={styles.activityContainer}>
      <Text style={styles.sectionTitle}>📱 {t.social}</Text>
      {activities.map(activity => (
        <View key={activity.id} style={styles.activityCard}>
          <Image source={activity.avatar} style={styles.activityAvatar} />
          <View style={styles.activityContent}>
            <Text style={styles.activityText}>
              <Text style={styles.activityUser}>{activity.user}</Text>
              {" "}{activity.action}{" "}
              <Text style={styles.activityTarget}>{activity.target}</Text>
            </Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
            {activity.progress && renderProgress(activity.progress)}
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={headerStyles.container}>
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color={isDarkMode ? '#fff' : '#4b46f1'} />
        </TouchableOpacity>
        <Text style={[headerStyles.title, { color: isDarkMode ? '#fff' : '#333' }]}>{t.community}</Text>
      </View>

      <View style={[styles.tabContainer, dynamicStyles.tab]}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'rankings' && styles.activeTab]}
          onPress={() => setActiveTab('rankings')}
        >
          <Text style={[styles.tabText, dynamicStyles.tabText, activeTab === 'rankings' && dynamicStyles.activeTabText]}>
            {t.rankings}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'social' && styles.activeTab]}
          onPress={() => setActiveTab('social')}
        >
          <Text style={[styles.tabText, dynamicStyles.tabText, activeTab === 'social' && dynamicStyles.activeTabText]}>
            {t.social}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'rankings' ? (
        <FlatList
          data={rankings.slice(3)}
          ListHeaderComponent={renderHeader}
          renderItem={({ item, index }) => {
            const rank = getRank(item.score);
            return (
              <TouchableOpacity 
                style={[styles.rankCard, dynamicStyles.rankCard, { borderColor: rankStyles[rank].borderColor }]}
                onPress={() => navigation.navigate('DetailRanking', { user: {...item, rank} })}
              >
                <View style={styles.rankNumberContainer}>
                  <Text style={styles.rankNumber}>#{index + 4}</Text>
                </View>
                <Image source={item.image} style={styles.rankAvatar} />
                <View style={styles.rankInfo}>
                  <Text style={[styles.rankName, dynamicStyles.rankName]} numberOfLines={1}>{item.name}</Text>
                  <View style={[styles.rankBadge, { backgroundColor: rankStyles[rank].backgroundColor }]}>
                    <Text style={[styles.rankText, dynamicStyles.rankText, { color: rankStyles[rank].color }]}>{item.score} {t.points}</Text>
                  </View>
                </View>
                <FontAwesome5 name="chevron-right" size={16} color="#ccc" />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView style={styles.socialContent}>
          {renderSocialFeatures()}
          {renderActivityFeed()}
        </ScrollView>
      )}

      <Modal
        visible={showSocialModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSocialModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal content based on selectedFeature */}
          </View>
        </View>
      </Modal>

      {renderFriendModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  podiumWrapper: {
    marginTop: 16,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  podiumItem: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  podiumContent: {
    alignItems: 'center',
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  medalContainer: {
    position: 'absolute',
    top: -12,
    right: -12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 4,
  },
  rankingListContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  rankCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  rankNumberContainer: {
    width: 30,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rankAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  rankInfo: {
    flex: 1,
  },
  rankName: {
    fontSize: 16,
    fontWeight: '600',
  },
  rankBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  rankText: {
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4b46f1",
    marginBottom: 15,
  },
  rankDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  rankDetailIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  rankDetailText: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: "#4b46f1",
  },
  rankDetailPoints: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff5733",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#4b46f1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4b46f1',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
  },
  socialContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  socialCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  socialIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f1fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  socialTitle: {
    fontSize: 13,
    color: '#333',
  },
  activityContainer: {
    backgroundColor: '#fff',
    padding: 16,
  },
  activityCard: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  activityUser: {
    fontWeight: '600',
    color: '#333',
  },
  activityTarget: {
    color: '#4b46f1',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4b46f1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  friendRequest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  requestAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  requestName: {
    fontSize: 16,
    color: '#333',
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#4b46f1',
    padding: 8,
    borderRadius: 8,
  },
  declineButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  requestsSection: {
    marginBottom: 20,
    width: '100%',
  },
  friendsList: {
    width: '100%',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  friendStatus: {
    fontSize: 12,
  }
});

export default RankingsScreen;
