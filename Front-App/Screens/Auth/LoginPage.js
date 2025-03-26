import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Button from "../../Component/Button";

import { useEffect, useState } from "react";
import { Animated, Easing } from "react-native"; // Animations

const Login = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in effect
  const [scaleAnim] = useState(new Animated.Value(0.8)); // For scale effect

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.background}
    >
     
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.content}>
          <Text style={styles.title}>📚 Học tiếng Hàn dễ dàng hơn</Text>
          <Text style={styles.description}>
            Lộ trình học tập cá nhân hóa giúp bạn tiến bộ nhanh chóng!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            text="Đăng ký"
            onPress={() =>
              navigation.navigate("AuthStack", { screen: "SignUpScreen" })
            }
            style={styles.signupButton}
            variant="purple"
          />
          <Button
            text="Đăng nhập"
            onPress={() =>
              navigation.navigate("AuthStack", { screen: "LoginScreen" })
            }
            style={styles.loginButton}
            variant="white"
          />
        </View>
      </Animated.View>
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
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Blurred effect
    paddingHorizontal: 20,
    borderRadius: 20, // Rounded edges for smoothness
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
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#dddddd",
    marginBottom: 25,
    paddingHorizontal: 10,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  signupButton: {
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButton: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Login;
