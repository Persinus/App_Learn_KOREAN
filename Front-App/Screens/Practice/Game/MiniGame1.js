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
  Button,
} from "react-native";
import cardData from '../../../assets/Card.json';

// Filter cards to remove Joker
const filteredCardData = cardData.filter(card => card.value !== "Joker");

const RulesModal = ({ visible, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Luật chơi</Text>
        <Text style={styles.modalText}>
          - Lá bài từ 1-10: Tính điểm tương ứng (1-10 điểm).
        </Text>
        <Text style={styles.modalText}>
          - Lá bài J, Q, K: Tương ứng 11, 12, 13 điểm.
        </Text>
        <Text style={styles.modalText}>
          - Bích: Danh từ; Tép: Động từ; Rô: Tính từ; Cơ: Trạng từ.
        </Text>
        <Button title="Đóng" onPress={onClose} />
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
    <View style={{ flex: 1 }}>
      {/* Button to show rules */}
      <Button title="Luật chơi" onPress={() => setModalVisible(true)} />

      {/* Rules Modal */}
      <RulesModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      {/* Display cards */}
      <ScrollView contentContainerStyle={styles.container}>
        {groupedCards.map((row, rowIndex) => (
          <CardRow key={rowIndex} cards={row} onPress={handleCardPress} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  card: {
    width: 80,
    margin: 5,
    alignItems: "center",
  },
  cardImage: {
    width: 70,
    height: 100,
  },
  cardText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default MiniGame1;
