import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const OnboardingPage4 = ({ navigation }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/illustration2.png")} style={styles.image} />
      <Text style={styles.title}>Bạn muốn học tiếng Hàn theo chủ đề nào?</Text>

      {[
        "Du lịch và giao tiếp cơ bản",
        "Cuộc sống hằng ngày và văn hóa Hàn Quốc",
        "Tiếng Hàn cho công việc và kinh doanh",
        "Tiếng Hàn dành cho người yêu K-pop & K-drama",
        "Luyện thi TOPIK và tiếng Hàn học thuật",
      ].map((topic) => (
        <TouchableOpacity
          key={topic}
          style={[
            styles.optionButton,
            selectedTopic === topic && styles.selectedOption,
          ]}
          onPress={() => handleSelectTopic(topic)}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionText, selectedTopic === topic && styles.selectedText]}>
            {topic}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.nextButton, !selectedTopic && styles.disabledButton]}
        onPress={() => navigation.navigate("OnboardingPage5", { topic: selectedTopic })}
        disabled={!selectedTopic}
        activeOpacity={0.8}
      >
        <Text style={styles.nextText}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fafafa",
      paddingHorizontal: 20,
    },
    image: {
      width: 220,
      height: 220,
      marginBottom: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      color: "#4A148C",
      marginBottom: 20,
    },
    optionButton: {
      width: "100%",
      backgroundColor: "#EDE7F6",
      paddingVertical: 14,
      paddingHorizontal: 15,
      borderRadius: 12,
      marginBottom: 10,
      shadowColor: "#4A148C",
      shadowOffset: { width: 2, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3, // Android shadow
    },
    selectedOption: {
      backgroundColor: "#B39DDB",
    },
    optionText: {
      fontSize: 16,
      textAlign: "center",
      color: "#4A148C",
      fontWeight: "500",
    },
    selectedText: {
      fontWeight: "bold",
      color: "#FFF",
    },
    nextButton: {
      backgroundColor: "#4A148C",
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderRadius: 8,
      marginTop: 20,
      shadowColor: "#4A148C",
      shadowOffset: { width: 1, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    disabledButton: {
      backgroundColor: "#D1C4E9",
    },
    nextText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
export default OnboardingPage4;  