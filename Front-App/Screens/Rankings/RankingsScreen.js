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
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import headerStyles from '../../Styles/HeaderStyles';

const rankings = [
  { id: "1", name: "Nguyễn Văn A", score: 1500, image: require("../../assets/avatar1.png") },
  { id: "2", name: "Trần Thị B", score: 1400, image: require("../../assets/avatar2.png") },
  { id: "3", name: "Lê Văn C", score: 800, image: require("../../assets/avatar3.png") },
  { id: "4", name: "Phạm D", score: 300, image: require("../../assets/avatar4.png") },
  { id: "5", name: "Ngô Văn E", score: 200, image: require("../../assets/avatar4.png") },
];

const rankIcons = {
  S: require("../../assets/rank-s.png"),
  A: require("../../assets/rank-a.png"),
  B: require("../../assets/rank-b.png"),
  C: require("../../assets/rank-c.png"),
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

// 🎖️ Component Podium hiển thị top 3
const Podium = ({ topThree, navigation }) => {
  return (
    <View style={styles.podiumWrapper}>
      <Text style={styles.sectionTitle}>🏆 Top 3 Người Chơi</Text>
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
              <Text style={[styles.rankText, { color: rankStyles.A.color }]}>{topThree[1].score} điểm</Text>
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
              <Text style={[styles.rankText, { color: rankStyles.S.color }]}>{topThree[0].score} điểm</Text>
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
              <Text style={[styles.rankText, { color: rankStyles.B.color }]}>{topThree[2].score} điểm</Text>
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

// 🎖️ Component hiển thị danh sách các người chơi còn lại
const RankingList = ({ data, navigation }) => {
  return (
    <View style={styles.rankingListContainer}>
      <Text style={styles.sectionTitle}>📊 Bảng Xếp Hạng</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const rank = getRank(item.score);
          return (
            <TouchableOpacity 
              style={[styles.rankCard, { borderColor: rankStyles[rank].borderColor }]}
              onPress={() => navigation.navigate('DetailRanking', { user: {...item, rank} })}
            >
              <View style={styles.rankNumberContainer}>
                <Text style={styles.rankNumber}>#{index + 4}</Text>
              </View>
              <Image source={item.image} style={styles.rankAvatar} />
              <View style={styles.rankInfo}>
                <Text style={styles.rankName} numberOfLines={1}>{item.name}</Text>
                <View style={[styles.rankBadge, { backgroundColor: rankStyles[rank].backgroundColor }]}>
                  <Text style={[styles.rankText, { color: rankStyles[rank].color }]}>{item.score} điểm</Text>
                </View>
              </View>
              <FontAwesome5 name="chevron-right" size={16} color="#ccc" />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

// 🎖️ Màn hình chính
const RankingsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderHeader = () => (
    <Podium topThree={rankings.slice(0, 3)} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View style={headerStyles.container}>
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#4b46f1" />
        </TouchableOpacity>
        <Text style={headerStyles.title}>Bảng xếp hạng</Text>
      </View>

      <FlatList
        data={rankings.slice(3)}
        ListHeaderComponent={renderHeader}
        renderItem={({ item, index }) => {
          const rank = getRank(item.score);
          return (
            <TouchableOpacity 
              style={[styles.rankCard, { borderColor: rankStyles[rank].borderColor }]}
              onPress={() => navigation.navigate('DetailRanking', { user: {...item, rank} })}
            >
              <View style={styles.rankNumberContainer}>
                <Text style={styles.rankNumber}>#{index + 4}</Text>
              </View>
              <Image source={item.image} style={styles.rankAvatar} />
              <View style={styles.rankInfo}>
                <Text style={styles.rankName} numberOfLines={1}>{item.name}</Text>
                <View style={[styles.rankBadge, { backgroundColor: rankStyles[rank].backgroundColor }]}>
                  <Text style={[styles.rankText, { color: rankStyles[rank].color }]}>{item.score} điểm</Text>
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

      {/* Modal chi tiết hạng */}
      {modalVisible && (
  <Modal
    visible={modalVisible}
    transparent
    animationType="slide"
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>🏆 Chi tiết Xếp hạng</Text>

        {/* Danh sách Rank */}
        {Object.keys(rankIcons).map((rank) => (
          <View key={rank} style={styles.rankDetailRow}>
            <Image source={rankIcons[rank]} style={styles.rankDetailIcon} />
            <Text style={styles.rankDetailText}>Hạng {rank}</Text>
            <Text style={styles.rankDetailPoints}>
              {rank === "S" && "1500+ điểm"}
              {rank === "A" && "1000 - 1499 điểm"}
              {rank === "B" && "500 - 999 điểm"}
              {rank === "C" && "0 - 499 điểm"}
            </Text>
          </View>
        ))}

        {/* Nút Đóng */}
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}
    </View>
  );
};

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
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
  },
  rankCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
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
    marginBottom: 4,
  },
  rankBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '600',
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
    paddingBottom: 20
  },
});

export default RankingsScreen;
