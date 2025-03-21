import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Dùng cho icon Google và Facebook

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      {/* Email Input */}
      <Text style={styles.label}>Your Email</Text>
      <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Enter your password"
          secureTextEntry
        />
        <FontAwesome name="eye" size={20} color="gray" style={styles.eyeIcon} />
      </View>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Log In Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      {/* Sign Up Section */}
      <View style={styles.signUpContainer}>
        <Text style={styles.text}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Social Login Section */}
      <Text style={styles.orText}>Or log in with</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 12,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  link: {
    color: "#6a0dad",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  text: {
    color: "#666",
  },
  orText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  socialButton: {
    backgroundColor: "#6a0dad",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    width: 50,
    alignItems: "center",
  },
});

export default LoginScreen;
