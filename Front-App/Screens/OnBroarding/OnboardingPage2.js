import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import onboardingStyles from "../../Styles/onboardingStyles"; // ✅ Import styles chung

const OnboardingPage2 = ({ navigation }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  return (
    <View style={onboardingStyles.container}>
      <Image source={require("../../assets/illustration2.png")} style={onboardingStyles.image} />
      <Text style={onboardingStyles.title}>Bạn biết tiếng Hàn bao nhiêu?</Text>

      {["Mới bắt đầu", "Biết từ cơ bản", "Có thể giao tiếp", "Trình độ trung cấp"].map((level) => (
        <TouchableOpacity
          key={level}
          style={[
            onboardingStyles.optionButton,
            selectedLevel === level && onboardingStyles.selectedOption,
          ]}
          onPress={() => setSelectedLevel(level)}
        >
          <Text
            style={[
              onboardingStyles.optionText,
              selectedLevel === level && onboardingStyles.selectedText,
            ]}
          >
            {level}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[onboardingStyles.nextButton, !selectedLevel && onboardingStyles.disabledButton]}
        onPress={() => navigation.navigate("OnboardingPage3", { level: selectedLevel })}
        disabled={!selectedLevel}
      >
        <Text style={onboardingStyles.nextText}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingPage2;
