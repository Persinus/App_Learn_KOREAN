import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

// Danh sách nội dung 20 bài học
const questionDetails = [
  "Câu hỏi 1: Đây là nội dung câu hỏi số 1.",
  "Câu hỏi 2: Đây là nội dung câu hỏi số 2.",
  "Câu hỏi 3: Đây là nội dung câu hỏi số 3.",
  "Câu hỏi 4: Đây là nội dung câu hỏi số 4.",
  "Câu hỏi 5: Đây là nội dung câu hỏi số 5.",
  "Câu hỏi 6: Đây là nội dung câu hỏi số 6.",
  "Câu hỏi 7: Đây là nội dung câu hỏi số 7.",
  "Câu hỏi 8: Đây là nội dung câu hỏi số 8.",
  "Câu hỏi 9: Đây là nội dung câu hỏi số 9.",
  "Câu hỏi 10: Đây là nội dung câu hỏi số 10.",
  "Câu hỏi 11: Đây là nội dung câu hỏi số 11.",
  "Câu hỏi 12: Đây là nội dung câu hỏi số 12.",
  "Câu hỏi 13: Đây là nội dung câu hỏi số 13.",
  "Câu hỏi 14: Đây là nội dung câu hỏi số 14.",
  "Câu hỏi 15: Đây là nội dung câu hỏi số 15.",
  "Câu hỏi 16: Đây là nội dung câu hỏi số 16.",
  "Câu hỏi 17: Đây là nội dung câu hỏi số 17.",
  "Câu hỏi 18: Đây là nội dung câu hỏi số 18.",
  "Câu hỏi 19: Đây là nội dung câu hỏi số 19.",
  "Câu hỏi 20: Đây là nội dung câu hỏi số 20.",
];

const DetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params; // Nhận id từ màn hình trước

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài {id}</Text>
      <Text style={styles.content}>{questionDetails[id - 1]}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>⬅ Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
