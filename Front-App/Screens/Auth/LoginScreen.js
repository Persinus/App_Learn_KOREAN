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

// Định nghĩa các chuỗi đa ngôn ngữ
const translations = {
  vn: {
    title: "Đăng nhập",
    emailLabel: "Email của bạn",
    passwordLabel: "Mật khẩu",
    forgotPassword: "Quên mật khẩu?",
    loginButton: "Đăng nhập",
    noAccount: "Chưa có tài khoản?",
    signUp: "Đăng ký",
    orLoginWith: "Hoặc đăng nhập bằng",
    googleLoginSuccess: "Đăng nhập Google thành công!",
    loginSuccess: "Đăng nhập thành công!",
    loginError: "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!",
    enterEmailPassword: "Vui lòng nhập email và mật khẩu.",
  },
  en: {
    title: "Log In",
    emailLabel: "Your Email",
    passwordLabel: "Password",
    forgotPassword: "Forgot password?",
    loginButton: "Log In",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    orLoginWith: "Or log in with",
    googleLoginSuccess: "Google login successful!",
    loginSuccess: "Login successful!",
    loginError: "An error occurred during login. Please try again!",
    enterEmailPassword: "Please enter your email and password.",
  },
};

// Bắt buộc để Expo xử lý redirect URL
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  // Lấy chuỗi dịch dựa trên ngôn ngữ hiện tại
  const t = translations[language];

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? "#0099FF" : "#fff",
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
      Alert.alert(t.googleLoginSuccess);
      AsyncStorage.setItem("userToken", "true");
      navigation.reset({
        index: 0,
        routes: [{ name: "MainNavigator" }],
      });
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", t.enterEmailPassword);
      return;
    }
    try {
      await AsyncStorage.setItem("userToken", "true");
      Alert.alert(t.loginSuccess, `${t.emailLabel}: ${email}`);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainNavigator" }],
      });
    } catch (error) {
      Alert.alert("Error", t.loginError);
      console.error("Login Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, dynamicStyles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={authStyles.container} keyboardShouldPersistTaps="handled">
        <Text style={[authStyles.title, dynamicStyles.title]}>{t.title}</Text>

        <Text style={[authStyles.label, dynamicStyles.label]}>{t.emailLabel}</Text>
        <TextInput
          style={[authStyles.input, dynamicStyles.input]}
          placeholder={t.emailLabel}
          placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[authStyles.label, dynamicStyles.label]}>{t.passwordLabel}</Text>
        <View style={authStyles.passwordContainer}>
          <TextInput
            style={[authStyles.input, authStyles.passwordInput, dynamicStyles.input]}
            placeholder={t.passwordLabel}
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
          <Text style={[authStyles.link, dynamicStyles.link]}>{t.forgotPassword}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[authStyles.primaryButton, dynamicStyles.primaryButton]}
          onPress={handleLogin}
        >
          <Text style={[authStyles.primaryButtonText, dynamicStyles.primaryButtonText]}>
            {t.loginButton}
          </Text>
        </TouchableOpacity>

        <View style={authStyles.secondaryContainer}>
          <Text style={authStyles.text}>{t.noAccount} </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <Text style={[authStyles.link, dynamicStyles.link]}>{t.signUp}</Text>
          </TouchableOpacity>
        </View>

        <Text style={authStyles.orText}>{t.orLoginWith}</Text>
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

