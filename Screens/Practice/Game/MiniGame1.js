import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Modal,
} from "react-native";
import cardData from "../../../assets/Card.json";

// Filter cards to remove Joker
const filteredCardData = cardData.filter((card) => card.value !== "Joker");

const RulesModal = ({ visible, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>📜 Luật chơi</Text>
        <Text style={styles.modalText}>- Lá bài từ 1-10: Tính điểm tương ứng (1-10 điểm).</Text>
        <Text style={styles.modalText}>- Lá bài J, Q, K: Tương ứng 11, 12, 13 điểm.</Text>
        <Text style={styles.modalText}>- Bích: Danh từ; Tép: Động từ; Rô: Tính từ; Cơ: Trạng từ.</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const CardRow = ({ cards, onPress }) => (
  <View style={styles.row}>
    {cards.map((card, index) => (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => onPress(card)}
      >
        <Image
          source={{ uri: card.image }}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <Text style={styles.cardText}>
          {card.value} {card.suit}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const MiniGame1 = () => {
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setCards(filteredCardData);
  }, []);

  const handleCardPress = (card) => {
    Alert.alert(
      `Câu hỏi ${card.type}`,
      `Lá bài: ${card.value} ${card.suit}\nChủ đề: ${card.type}\nĐộ khó: ${card.difficulty}`
    );
  };

  // Group cards into rows of 4
  const groupedCards = [];
  for (let i = 0; i < cards.length; i += 4) {
    groupedCards.push(cards.slice(i, i + 4));
  }

  return (
    <View style={styles.screen}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.rulesButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.rulesButtonText}>📜 Luật chơi</Text>
        </TouchableOpacity>
      </View>

      {/* Rules Modal */}
      <RulesModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      {/* Scrollable Cards */}
      <ScrollView contentContainerStyle={styles.container}>
        {groupedCards.map((row, rowIndex) => (
          <CardRow key={rowIndex} cards={row} onPress={handleCardPress} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MiniGame1;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#6A0DAD",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    elevation: 5,
  },
  container: {
    padding: 15,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  card: {
    width: 80,
    margin: 3,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardImage: {
    width: 70,
    height: 100,
  },
  cardText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
    lineHeight: 22,
  },
  closeButton: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#6A0DAD",
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  rulesButton: {
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  rulesButtonText: {
    color: "#6A0DAD",
    fontWeight: "bold",
    fontSize: 16,
  },
});
