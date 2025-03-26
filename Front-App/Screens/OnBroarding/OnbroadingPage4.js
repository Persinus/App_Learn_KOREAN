import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import onboardingStyles from "../../Styles/onboardingStyles"; // ✅ Import styles chung

const OnboardingPage4 = ({ navigation }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <View style={onboardingStyles.container}>
      <Image source={require("../../assets/illustration2.png")} style={onboardingStyles.image} />
      <Text style={onboardingStyles.title}>Bạn muốn học theo chủ đề nào?</Text>

      {[
        "Du lịch và giao tiếp",
        "Cuộc sống và văn hóa",
        "Tiếng Hàn cho công việc",
        "K-pop & K-drama",
        "Luyện thi TOPIK",
      ].map((topic) => (
        <TouchableOpacity
          key={topic}
          style={[
            onboardingStyles.optionButton,
            selectedTopic === topic && onboardingStyles.selectedOption,
          ]}
          onPress={() => setSelectedTopic(topic)}
        >
          <Text
            style={[
              onboardingStyles.optionText,
              selectedTopic === topic && onboardingStyles.selectedText,
            ]}
          >
            {topic}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[onboardingStyles.nextButton, !selectedTopic && onboardingStyles.disabledButton]}
        onPress={() => navigation.navigate("OnboardingPage5", { topic: selectedTopic })}
        disabled={!selectedTopic}
      >
        <Text style={onboardingStyles.nextText}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingPage4;