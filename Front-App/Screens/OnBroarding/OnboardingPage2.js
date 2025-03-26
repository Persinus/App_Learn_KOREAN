import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const OnboardingPage2 = ({ navigation }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/illustration2.png")} style={styles.image} />
      <Text style={styles.title}>Bạn biết tiếng Hàn bao nhiêu?</Text>

      {[
        "Mới bắt đầu học",
        "Biết một số từ và cụm từ",
        "Có thể giao tiếp đơn giản",
        "Trình độ trung cấp trở lên",
      ].map((level) => (
        <TouchableOpacity
          key={level}
          style={[
            styles.optionButton,
            selectedLevel === level && styles.selectedOption,
          ]}
          onPress={() => handleSelectLevel(level)}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionText, selectedLevel === level && styles.selectedText]}>
            {level}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.nextButton, !selectedLevel && styles.disabledButton]}
        onPress={() => navigation.navigate("OnboardingPage3", { level: selectedLevel })}
        disabled={!selectedLevel}
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

export default OnboardingPage2;