import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const OnboardingPage5 = ({ navigation }) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleSelectSchedule = (schedule) => {
    setSelectedSchedule(schedule);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/illustration2.png")} style={styles.image} />
      <Text style={styles.title}>Bạn muốn học tiếng Hàn bao lâu mỗi ngày?</Text>

      {[
        "5 phút/ngày – Duy trì thói quen nhỏ",
        "10 phút/ngày – Học tập thoải mái",
        "20 phút/ngày – Nâng cao kỹ năng",
        "30 phút/ngày – Học tập nghiêm túc",
        "60 phút/ngày – Cải thiện nhanh chóng",
      ].map((schedule) => (
        <TouchableOpacity
          key={schedule}
          style={[
            styles.optionButton,
            selectedSchedule === schedule && styles.selectedOption,
          ]}
          onPress={() => handleSelectSchedule(schedule)}
          activeOpacity={0.7}
        >
          <Text style={[styles.optionText, selectedSchedule === schedule && styles.selectedText]}>
            {schedule}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.nextButton, !selectedSchedule && styles.disabledButton]}
        onPress={() => navigation.navigate("LoginPage", { schedule: selectedSchedule })}
        disabled={!selectedSchedule}
        activeOpacity={0.8}
      >
        <Text style={styles.nextText}>Hoàn tất</Text>
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

export default OnboardingPage5;
