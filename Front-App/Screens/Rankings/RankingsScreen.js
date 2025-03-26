import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

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

// 🎖️ Component Podium hiển thị top 3
const Podium = ({ topThree }) => {
  return (
    <View style={styles.podiumContainer}>
      {/* Hạng 2 */}
      <View style={[styles.podiumItem, styles.secondPlace]}>
        <Image source={topThree[1].image} style={styles.podiumAvatar} />
        <Text style={styles.podiumName}>{topThree[1].name}</Text>
        <Text style={styles.podiumScore}>{topThree[1].score} điểm</Text>
      </View>

      {/* Hạng 1 */}
      <View style={[styles.podiumItem, styles.firstPlace]}>
        <Image source={topThree[0].image} style={styles.podiumAvatar} />
        <Text style={styles.podiumName}>{topThree[0].name}</Text>
        <Text style={styles.podiumScore}>{topThree[0].score} điểm</Text>
        <FontAwesome5 name="crown" size={24} color="#FFD700" style={styles.crownIcon} />
      </View>

      {/* Hạng 3 */}
      <View style={[styles.podiumItem, styles.thirdPlace]}>
        <Image source={topThree[2].image} style={styles.podiumAvatar} />
        <Text style={styles.podiumName}>{topThree[2].name}</Text>
        <Text style={styles.podiumScore}>{topThree[2].score} điểm</Text>
      </View>
    </View>
  );
};

// 🎖️ Component hiển thị danh sách các người chơi còn lại
const RankingList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        const rank = getRank(item.score);
        return (
          <View style={styles.rankCard}>
            <Text style={styles.rank}>{index + 4}</Text>
            <Image source={item.image} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score} điểm</Text>
            <Image source={rankIcons[rank]} style={styles.rankIcon} />
          </View>
        );
      }}
    />
  );
};

// 🎖️ Màn hình chính
const RankingsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.header}>🏅 Bảng xếp hạng</Text>
      </View>

      {/* Podium Top 3 */}
      <Podium topThree={rankings.slice(0, 3)} />

      {/* Danh sách còn lại */}
      <RankingList data={rankings.slice(3)} />

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
    backgroundColor: "#4b46f1",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
  },
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 160,
    marginBottom: 20,
  },
  podiumItem: {
    alignItems: "center",
    width: 80,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  firstPlace: { backgroundColor: "#FFD700", height: 140 },
  secondPlace: { backgroundColor: "#C0C0C0", height: 120 },
  thirdPlace: { backgroundColor: "#CD7F32", height: 110 },
  podiumAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  podiumName: { fontSize: 14, fontWeight: "bold" },
  podiumScore: { fontSize: 12, color: "#333" },
  crownIcon: { position: "absolute", top: -10 },
  rankCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  rank: { fontSize: 18, fontWeight: "bold", width: 30 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  name: { flex: 1, fontSize: 16 },
  score: { fontSize: 16, fontWeight: "bold", color: "#4b46f1" },
  rankIcon: { width: 40, height: 40 },
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
  
  
});

export default RankingsScreen;
