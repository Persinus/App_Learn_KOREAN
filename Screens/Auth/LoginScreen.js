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
  ActivityIndicator,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useSelector } from "react-redux";
import authStyles from "../../Styles/AuthStyles";
import axios from 'axios';
import BASE_API_URL from '../../Util/Baseapi';
import { saveUsername } from '../../Util/UserStorage';

const translations = {
  vn: {
    title: "Đăng nhập",
    emailLabel: "Tên đăng nhập",
    passwordLabel: "Mật khẩu",
    forgotPassword: "Quên mật khẩu?",
    loginButton: "Đăng nhập",
    noAccount: "Chưa có tài khoản?",
    signUp: "Đăng ký",
    orLoginWith: "Hoặc đăng nhập bằng",
    googleLoginSuccess: "Đăng nhập Google thành công!",
    loginSuccess: "Đăng nhập thành công!",
    loginError: "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!",
    enterEmailPassword: "Vui lòng nhập tên đăng nhập và mật khẩu.",
  },
  en: {
    title: "Log In",
    emailLabel: "Username",
    passwordLabel: "Password",
    forgotPassword: "Forgot password?",
    loginButton: "Log In",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    orLoginWith: "Or log in with",
    googleLoginSuccess: "Google login successful!",
    loginSuccess: "Login successful!",
    loginError: "An error occurred during login. Please try again!",
    enterEmailPassword: "Please enter your username and password.",
  },
};

// Bắt buộc để Expo xử lý redirect URL
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  // Lấy chuỗi dịch dựa trên ngôn ngữ hiện tại
  const t = translations[language];

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#f4f7ff",
    },
    title: {
      color: isDarkMode ? "#FFD700" : "#4b46f1",
      fontWeight: "bold",
      fontSize: 28,
      marginBottom: 24,
      textAlign: "center",
    },
    label: {
      color: isDarkMode ? "#ccc" : "#4b46f1",
      fontWeight: "bold",
      fontSize: 15,
      marginBottom: 6,
    },
    input: {
      backgroundColor: isDarkMode ? "#232323" : "#fff",
      color: isDarkMode ? "#fff" : "#222",
      borderColor: isDarkMode ? "#555" : "#4b46f1",
      borderWidth: 1.5,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      marginBottom: 2,
      shadowColor: isDarkMode ? "#000" : "#4b46f1",
      shadowOpacity: isDarkMode ? 0.1 : 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: isDarkMode ? 0 : 2,
    },
    primaryButton: {
      backgroundColor: isDarkMode ? "#FFD700" : "#4b46f1",
      marginTop: 16,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      elevation: 2,
    },
    primaryButtonText: {
      color: isDarkMode ? "#000" : "#fff",
      fontSize: 17,
      fontWeight: "bold",
      letterSpacing: 0.5,
    },
    link: {
      color: isDarkMode ? "#FFD700" : "#4b46f1",
      fontWeight: "bold",
    },
    socialButton: {
      borderColor: isDarkMode ? "#444" : "#e3e7fd",
      borderWidth: 1.5,
      borderRadius: 8,
      marginHorizontal: 8,
      marginTop: 8,
    },
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "789555058501-qechpaj94ikr27gkpte3off6ra5r3k75.apps.googleusercontent.com",
    androidClientId: "789555058501-qechpaj94ikr27gkpte3off6ra5r3k75.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      
      Alert.alert(t.googleLoginSuccess);
      AsyncStorage.setItem("userToken", "true");
      navigation.reset({
        index: 0,
        routes: [{ name: "MainNavigator" }],
      });
    }
  }, [response]);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", t.enterEmailPassword);
      return;
    }
    setLoading(true); // Hiện modal loading

    const options = {
      method: 'POST',
      url: BASE_API_URL + 'login',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data: {
        username,
        password
      }
    };

    try {
      const { data } = await axios.request(options);

      await AsyncStorage.setItem("userToken", data.token || "true");
      await saveUsername(username);

      setLoading(false); // Tắt modal loading
      Alert.alert(t.loginSuccess, `${t.emailLabel}: ${username}`);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainNavigator" }],
      });
    } catch (error) {
      setLoading(false); // Tắt modal loading
      if (error.response) {
        Alert.alert("Error", error.response.data.msg || t.loginError);
        console.log("Login error:", error.response.data);
      } else {
        Alert.alert("Error", t.loginError);
        console.log("Login error:", error);
      }
    }
  };

  return (
    <>
      {/* Modal loading */}
      <Modal
        visible={loading}
        transparent
        animationType="fade"
      >
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.3)",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <View style={{
            backgroundColor: isDarkMode ? "#232323" : "#fff",
            padding: 32,
            borderRadius: 16,
            alignItems: "center"
          }}>
            <ActivityIndicator size="large" color={isDarkMode ? "#FFD700" : "#4b46f1"} />
            <Text style={{ marginTop: 16, color: isDarkMode ? "#FFD700" : "#4b46f1", fontWeight: "bold" }}>
              {t.loginButton}...
            </Text>
          </View>
        </View>
      </Modal>

      {/* Main login UI */}
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
            value={username}
            onChangeText={setUsername}
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
    </>
  );
};

export default LoginScreen;

