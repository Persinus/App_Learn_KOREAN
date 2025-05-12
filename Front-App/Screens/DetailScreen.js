import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

// Danh sách nội dung 20 bài học với định dạng cải thiện
const questionDetails = [
  {
    title: "Âm cơ bản trong tiếng Hàn",
    content: "Tiếng Hàn có 14 phụ âm cơ bản và 10 nguyên âm cơ bản. Mỗi ký tự đều có cách phát âm riêng.",
    example: "ㄱ (g/k), ㄴ (n), ㄷ (d/t), ㄹ (r/l), ㅁ (m)...",
    image: require("../../assets/illustration1.png")
  },
  {
    title: "Cách chào hỏi",
    content: "Học cách chào hỏi cơ bản trong tiếng Hàn. Các bạn cần lưu ý rằng tiếng Hàn có các mức độ kính ngữ khác nhau.",
    example: "안녕하세요 (Annyeonghaseyo) - Xin chào (kính ngữ)\n안녕 (Annyeong) - Chào (thân mật)",
    image: require("../../assets/illustration2.png")
  },
  // Tiếp tục với 18 câu còn lại (rút gọn ở đây)
];

// Thêm nội dung cho các câu hỏi còn lại
for (let i = 2; i < 20; i++) {
  questionDetails.push({
    title: `Bài học số ${i+1}`,
    content: `Đây là nội dung bài học số ${i+1}. Bạn sẽ học những từ vựng và ngữ pháp cơ bản trong tiếng Hàn.`,
    example: `Ví dụ ${i+1}: 감사합니다 (Gamsahamnida) - Cảm ơn bạn`,
    image: i % 2 === 0 ? require("../../assets/illustration1.png") : require("../../assets/illustration2.png")
  });
}

const DetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params; // Nhận id từ màn hình trước
  const questionData = questionDetails[id - 1]; // Dữ liệu câu hỏi

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <FontAwesome5 name="arrow-left" size={16} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Bài học {id}</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Image source={questionData.image} style={styles.image} />
          <Text style={styles.title}>{questionData.title}</Text>
          <Text style={styles.content}>{questionData.content}</Text>
          
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleTitle}>Ví dụ:</Text>
            <Text style={styles.example}>{questionData.example}</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.practiceeButton}>
              <Text style={styles.buttonText}>Luyện tập</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={() => {
                if (id < 20) {
                  navigation.navigate("DetailScreen", { id: id + 1 });
                } else {
                  navigation.goBack();
                }
              }}
            >
              <Text style={styles.buttonText}>
                {id < 20 ? "Bài tiếp theo" : "Hoàn thành"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FF",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 15,
    backgroundColor: '#5271FF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: "cover",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginBottom: 20,
  },
  exampleContainer: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  example: {
    fontSize: 16,
    color: "#5271FF",
    fontWeight: "500",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  practiceeButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
    elevation: 2,
  },
  nextButton: {
    backgroundColor: "#5271FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
