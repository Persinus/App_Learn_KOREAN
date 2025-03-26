import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Icon for Google and Facebook

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const fadeAnim = new Animated.Value(0); // Initial animation value for fade-in

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    if (email && password) {
      Alert.alert("Login Successful", `Welcome, ${email}!`);
      navigation.navigate("TabNavigator", { screen: "HomeScreen" });
    } else {
      Alert.alert("Error", "Please enter your email and password.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
       
          <Text style={styles.title}>Log In</Text>

          {/* Email Input */}
          <Text style={styles.label}>Your Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <FontAwesome
                name={isPasswordVisible ? "eye-slash" : "eye"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.link}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Log In Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
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
            <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
              <FontAwesome name="google" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
            >
              <FontAwesome name="facebook" size={20} color="white" />
            </TouchableOpacity>
          </View>
       
      </ScrollView>
    </KeyboardAvoidingView>
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
    color: "#6a0dad",
  },
  label: {
    fontSize: 14,
    color: "#6a0dad",
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
  googleButton: {
    backgroundColor: "#db4437",
  },
  facebookButton: {
    backgroundColor: "#3b5998",
  },
});

export default LoginScreen;