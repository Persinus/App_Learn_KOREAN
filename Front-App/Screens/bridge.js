import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const BridgeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem("userToken"); // Lưu userToken khi đăng nhập
      if (userToken) {
        navigation.replace("HomeScreen"); // Nếu có token, vào Home
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bạn đã từng đăng nhập chưa?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("OnboardingPage1")}
      >
        <Text style={styles.buttonText}>🔰 Chưa từng đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("AuthStack", { screen: "LoginScreen" })
        }
      >
        <Text style={styles.buttonText}>🔑 Đã có tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BridgeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
    paddingHorizontal: 10,
    lineHeight: 30,
  },
  button: {
    width: "80%",
    backgroundColor: "#6A0DAD",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
