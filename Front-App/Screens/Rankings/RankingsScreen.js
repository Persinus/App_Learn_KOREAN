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

const RankingsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderRankCard = ({ item, index }) => {
    const rank = getRank(item.score);
    return (
      <TouchableOpacity style={styles.rankCard} activeOpacity={0.9}>
        <Text style={[styles.rank, index === 0 && styles.firstRank]}>{index + 1}</Text>
        <Image source={item.image} style={styles.avatar} />
        <View style={styles.rankInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.score}>{item.score} điểm</Text>
        </View>
        <Image source={rankIcons[rank]} style={styles.rankIcon} />
        {index === 0 && <FontAwesome5 name="crown" size={24} color="#FFD700" style={styles.crownIcon} />}
      </TouchableOpacity>
    );
  };

  const renderRankDetails = () => (
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>🏆 Chi tiết Xếp hạng</Text>
          {Object.keys(rankIcons).map((rank) => (
            <View key={rank} style={styles.rankDetailRow}>
              <Image source={rankIcons[rank]} style={styles.rankDetailIcon} />
              <Text style={styles.rankDetailText}>Hạng {rank}</Text>
              <Text style={styles.rankDetailPoints}>
                {rank === "S" && "1500+"}
                {rank === "A" && "1000 - 1499"}
                {rank === "B" && "500 - 999"}
                {rank === "C" && "0 - 499"}
              </Text>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.header}>🏅 Bảng xếp hạng</Text>
      </View>

      <FlatList
        data={rankings}
        keyExtractor={(item) => item.id}
        renderItem={renderRankCard}
      />

      {renderRankDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4b46f1", // Purple background
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
  rankCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    position: "relative",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4b46f1",
    marginRight: 16,
  },
  firstRank: {
    color: "#FFD700",
    fontSize: 22,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  rankInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  score: {
    fontSize: 16,
    color: "#4b46f1",
  },
  rankIcon: {
    width: 40,
    height: 40,
  },
  crownIcon: {
    position: "absolute",
    top: 5,
    left: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#4b46f1",
  },
  rankDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  rankDetailIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  rankDetailText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    color: "#4b46f1",
  },
  rankDetailPoints: {
    fontSize: 16,
    color: "#333333",
  },
  closeButton: {
    backgroundColor: "#4b46f1",
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default RankingsScreen;
