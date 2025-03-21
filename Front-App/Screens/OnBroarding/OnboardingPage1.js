import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const OnboardingPage1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/illustration1.png")} style={styles.image} />
      <Text style={styles.title}>Học tiếng Hàn dễ dàng</Text>
      <Text style={styles.description}>
        Khám phá các khóa học miễn phí để bắt đầu hành trình học tiếng Hàn của bạn.
      </Text>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("OnboardingPage2")}
      >
        <Text style={styles.nextText}>Tiếp theo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skip} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.skipText}>Bỏ qua</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  nextButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
  },
  skip: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  skipText: {
    fontSize: 14,
    color: "#6a0dad",
  },
});

export default OnboardingPage1;