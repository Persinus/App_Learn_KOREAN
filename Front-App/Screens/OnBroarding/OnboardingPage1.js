import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import onboardingStyles from "../../Styles/onboardingStyles"; // ✅ Import styles chung

const OnboardingPage1 = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <View style={onboardingStyles.container}>
      <Image source={require("../../assets/illustration1.png")} style={onboardingStyles.image} />
      <Text style={onboardingStyles.title}>Mục tiêu học tiếng Hàn của bạn?</Text>

      {["Giao tiếp cơ bản", "Xem phim không phụ đề", "Thi TOPIK", "Cơ hội du học"].map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            onboardingStyles.optionButton,
            selectedOption === option && onboardingStyles.selectedOption,
          ]}
          onPress={() => setSelectedOption(option)}
        >
          <Text
            style={[
              onboardingStyles.optionText,
              selectedOption === option && onboardingStyles.selectedText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[onboardingStyles.nextButton, !selectedOption && onboardingStyles.disabledButton]}
        onPress={() => navigation.navigate("OnboardingPage2", { goal: selectedOption })}
        disabled={!selectedOption}
      >
        <Text style={onboardingStyles.nextText}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingPage1;
