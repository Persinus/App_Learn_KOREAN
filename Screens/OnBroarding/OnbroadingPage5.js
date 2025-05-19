import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import onboardingStyles from "../../Styles/onboardingStyles"; // ✅ Import styles chung

const OnboardingPage5 = ({ navigation }) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  return (
    <View style={onboardingStyles.container}>
      <Image source={require("../../assets/illustration2.jpg")} style={onboardingStyles.image} />
      <Text style={onboardingStyles.title}>Bạn muốn học bao lâu mỗi ngày?</Text>

      {[
        "5 phút/ngày",
        "10 phút/ngày",
        "20 phút/ngày",
        "30 phút/ngày",
        "60 phút/ngày",
      ].map((schedule) => (
        <TouchableOpacity
          key={schedule}
          style={[
            onboardingStyles.optionButton,
            selectedSchedule === schedule && onboardingStyles.selectedOption,
          ]}
          onPress={() => setSelectedSchedule(schedule)}
        >
          <Text
            style={[
              onboardingStyles.optionText,
              selectedSchedule === schedule && onboardingStyles.selectedText,
            ]}
          >
            {schedule}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[onboardingStyles.nextButton, !selectedSchedule && onboardingStyles.disabledButton]}
        onPress={() => navigation.navigate("LoginPage", { schedule: selectedSchedule })}
        disabled={!selectedSchedule}
      >
        <Text style={onboardingStyles.nextText}>Hoàn tất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingPage5;
