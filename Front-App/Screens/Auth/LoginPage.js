import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

const Login = ({ navigation }) => {
  return (
    <ImageBackground source={require("../../assets/background.png")} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>📚 Học tiếng Hàn dễ dàng hơn</Text>
          <Text style={styles.description}>
            Lộ trình học tập cá nhân hóa giúp bạn tiến bộ nhanh chóng!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("AuthStack", { screen: "SignUpScreen" })}
          >
            <Text style={styles.primaryButtonText}>Đăng ký</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("AuthStack", { screen: "LoginScreen" })}
          >
            <Text style={styles.secondaryButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Màu trắng mờ để làm nổi chữ
    borderRadius: 20,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#4A148C",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  primaryButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#6a0dad",
    paddingVertical: 15,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  secondaryButton: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6a0dad",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6a0dad",
  },
});

export default Login;