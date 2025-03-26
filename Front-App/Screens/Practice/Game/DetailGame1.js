import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

const DetailMiniGame = ({ route, navigation }) => {
  const { card } = route.params;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerPress = (answer) => {
    setSelectedAnswer(answer);
    if (answer === card.correctAnswer) {
      Alert.alert("Chính xác!", "Bạn đã trả lời đúng.");
    } else {
      Alert.alert("Sai rồi!", "Câu trả lời không chính xác.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: card.image }} style={styles.cardImage} />
      <Text style={styles.title}>
        {card.value} {card.suit}
      </Text>
      <Text style={styles.type}>Chủ đề: {card.type}</Text>
      <Text style={styles.difficulty}>Độ khó: {card.difficulty}</Text>
      <Text style={styles.question}>Câu hỏi: {card.question}</Text>

      <View style={styles.answersContainer}>
        {card.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === answer && styles.selectedAnswer,
            ]}
            onPress={() => handleAnswerPress(answer)}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Quay lại" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cardImage: {
    width: 150,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  type: {
    fontSize: 18,
    marginBottom: 5,
  },
  difficulty: {
    fontSize: 18,
    marginBottom: 5,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  answersContainer: {
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  answerButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  selectedAnswer: {
    backgroundColor: "#87ceeb",
  },
  answerText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default DetailMiniGame;
