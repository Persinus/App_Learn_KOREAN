import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../../Component/Button"; // Import component Button đã code

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tạo kế hoạch học tiếng Hàn của bạn</Text>
        <Text style={styles.description}>
          Học tiếng Hàn dễ dàng hơn với lộ trình học tập cá nhân hóa.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Đăng ký"
          onPress={() => {
            console.log("Navigating to SignInScreen");
            navigation.navigate("SignInScreen");
          }}
          style={styles.signupButton}
          variant="purple"
        />
        <Button
          text="Đăng nhập"
          onPress={() => navigation.navigate("LoginScreen")}
          style={styles.loginButton}
          variant="white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 180,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  signupButton: {
    flex: 1,
    marginRight: 10,
  },
  loginButton: {
    flex: 1,
    marginLeft: 10,
  },
});

export default Login;
