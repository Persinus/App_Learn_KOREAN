import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import onboardingStyles from "../../Styles/onboardingStyles"; // ✅ Import styles chung

const OnboardingPage3 = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  return (
    <View style={onboardingStyles.container}>
      <Image source={require("../../assets/illustration2.jpg")} style={onboardingStyles.image} />
      <Text style={onboardingStyles.title}>Bạn muốn học tiếng Hàn theo cách nào?</Text>

      {[
        "Học qua bài giảng",
        "Học qua hội thoại",
        "Học bằng cách xem phim",
        "Luyện viết và phát âm",
        "Kết hợp tất cả phương pháp",
      ].map((method) => (
        <TouchableOpacity
          key={method}
          style={[
            onboardingStyles.optionButton,
            selectedMethod === method && onboardingStyles.selectedOption,
          ]}
          onPress={() => setSelectedMethod(method)}
        >
          <Text
            style={[
              onboardingStyles.optionText,
              selectedMethod === method && onboardingStyles.selectedText,
            ]}
          >
            {method}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[onboardingStyles.nextButton, !selectedMethod && onboardingStyles.disabledButton]}
        onPress={() => navigation.navigate("OnboardingPage4", { method: selectedMethod })}
        disabled={!selectedMethod}
      >
        <Text style={onboardingStyles.nextText}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingPage3;