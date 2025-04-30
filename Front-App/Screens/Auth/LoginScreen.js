import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useSelector } from "react-redux";
import authStyles from "../../Styles/AuthStyles";

// Bắt buộc để Expo xử lý redirect URL
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? "#0099FF" : "#fff", // Nền xanh cho Dark Mode
    },
    title: {
      color: isDarkMode ? "#fff" : "#333",
    },
    label: {
      color: isDarkMode ? "#ccc" : "#666",
    },
    input: {
      backgroundColor: isDarkMode ? "#333" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      borderColor: isDarkMode ? "#444" : "#ddd",
    },
    primaryButton: {
      backgroundColor: isDarkMode ? "#FFD700" : "#4b46f1",
    },
    primaryButtonText: {
      color: isDarkMode ? "#000" : "#fff",
    },
    link: {
      color: isDarkMode ? "#FFD700" : "#4b46f1",
    },
    socialButton: {
      borderColor: isDarkMode ? "#444" : "#ddd",
    },
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "789555058501-qechpaj94ikr27gkpte3off6ra5r3k75.apps.googleusercontent.com",
    androidClientId: "789555058501-qechpaj94ikr27gkpte3off6ra5r3k75.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      Alert.alert("Đăng nhập Google thành công!");
      AsyncStorage.setItem("userToken", "true");
      navigation.reset({
        index: 0,
        routes: [{ name: "MainNavigator" }],
      });
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu.");
      return;
    }
    try {
      await AsyncStorage.setItem("userToken", "true");
      Alert.alert("Đăng nhập thành công!", `Chào mừng, ${email}!`);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainNavigator" }],
      });
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!");
      console.error("Login Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, dynamicStyles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={authStyles.container} keyboardShouldPersistTaps="handled">
        <Text style={[authStyles.title, dynamicStyles.title]}>Log In</Text>

        <Text style={[authStyles.label, dynamicStyles.label]}>Your Email</Text>
        <TextInput
          style={[authStyles.input, dynamicStyles.input]}
          placeholder="Enter your email"
          placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[authStyles.label, dynamicStyles.label]}>Password</Text>
        <View style={authStyles.passwordContainer}>
          <TextInput
            style={[authStyles.input, authStyles.passwordInput, dynamicStyles.input]}
            placeholder="Enter your password"
            placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={authStyles.eyeIcon}
          >
            <FontAwesome name={isPasswordVisible ? "eye-slash" : "eye"} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={authStyles.forgotPassword}>
          <Text style={[authStyles.link, dynamicStyles.link]}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[authStyles.primaryButton, dynamicStyles.primaryButton]}
          onPress={handleLogin}
        >
          <Text style={[authStyles.primaryButtonText, dynamicStyles.primaryButtonText]}>Log In</Text>
        </TouchableOpacity>

        <View style={authStyles.secondaryContainer}>
          <Text style={authStyles.text}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <Text style={[authStyles.link, dynamicStyles.link]}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <Text style={authStyles.orText}>Or log in with</Text>
        <View style={authStyles.socialContainer}>
          <TouchableOpacity
            style={[authStyles.socialButton, dynamicStyles.socialButton, { backgroundColor: "#db4437" }]}
            onPress={() => promptAsync()}
          >
            <FontAwesome name="google" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[authStyles.socialButton, dynamicStyles.socialButton, { backgroundColor: "#3b5998" }]}
          >
            <FontAwesome name="facebook" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

