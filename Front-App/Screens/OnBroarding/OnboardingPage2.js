import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const OnboardingPage2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/illustration1.png")} // Thay bằng hình ảnh phù hợp
        style={styles.image}
      />
      <Text style={styles.title}>Học tiếng Hàn dễ dàng</Text>
      <Text style={styles.description}>
        Tiếng Hàn - chiếc chìa khóa mở ra cơ hội trong học tập và sự nghiệp.
        Bắt đầu hành trình học tập của bạn ngay hôm nay!
      </Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("LoginStack")}
      >
        <Text style={styles.startText}>Bắt đầu ngay</Text>
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
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  startText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default OnboardingPage2;