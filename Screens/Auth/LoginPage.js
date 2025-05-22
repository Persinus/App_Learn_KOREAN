import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const Login = ({ navigation }) => {
  // Lấy trạng thái Dark Mode từ Redux store
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.85)" },
        ]}
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#4A148C" }]}>
            📚 Học tiếng Hàn dễ dàng hơn
          </Text>
          <Text style={[styles.description, { color: isDarkMode ? "#ccc" : "#555" }]}>
            Lộ trình học tập cá nhân hóa giúp bạn tiến bộ nhanh chóng!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              { backgroundColor: isDarkMode ? "#4A148C" : "#6a0dad" },
            ]}
            onPress={() => navigation.navigate("AuthStack", { screen: "SignUpScreen" })}
          >
            <Text style={styles.primaryButtonText}>Đăng ký</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryButton,
              {
                backgroundColor: isDarkMode ? "#333" : "#ffffff",
                borderColor: isDarkMode ? "#fff" : "#6a0dad",
              },
            ]}
            onPress={() => navigation.navigate("AuthStack", { screen: "LoginScreen" })}
          >
            <Text
              style={[
                styles.secondaryButtonText,
                { color: isDarkMode ? "#fff" : "#6a0dad" },
              ]}
            >
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
  },
  description: {
    fontSize: 18,
    textAlign: "center",
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
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;