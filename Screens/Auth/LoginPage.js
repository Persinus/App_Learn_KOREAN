import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const Login = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: isDarkMode ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)",
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
      color: isDarkMode ? "#fff" : "#4A148C",
    },
    description: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 20,
      color: isDarkMode ? "#ccc" : "#555",
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
      backgroundColor: isDarkMode ? "#4A148C" : "#6a0dad",
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
      backgroundColor: isDarkMode ? "#333" : "#ffffff",
      borderWidth: 1,
      borderColor: isDarkMode ? "#fff" : "#6a0dad",
    },
    secondaryButtonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#6a0dad",
    },
  };

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.content}>
        <Text style={dynamicStyles.title}>📚 Học tiếng Hàn dễ dàng hơn</Text>
        <Text style={dynamicStyles.description}>
          Lộ trình học tập cá nhân hóa giúp bạn tiến bộ nhanh chóng!
        </Text>
      </View>

      <View style={dynamicStyles.buttonContainer}>
        <TouchableOpacity
          style={dynamicStyles.primaryButton}
          onPress={() => navigation.navigate("AuthStack", { screen: "SignUpScreen" })}
        >
          <Text style={dynamicStyles.primaryButtonText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={dynamicStyles.secondaryButton}
          onPress={() => navigation.navigate("AuthStack", { screen: "LoginScreen" })}
        >
          <Text style={dynamicStyles.secondaryButtonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;