import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector } from "react-redux";
import BASE_API_URL from "../../Util/Baseapi";

const translations = {
  vn: {
    title: "Đăng ký",
    name: "Tên người dùng",
    email: "Email",
    password: "Mật khẩu",
    confirmPassword: "Nhập lại mật khẩu",
    signUp: "Đăng ký",
    alreadyHaveAccount: "Đã có tài khoản?",
    login: "Đăng nhập",
    fillAll: "Vui lòng điền đầy đủ thông tin",
    passwordNotMatch: "Mật khẩu không khớp",
    success: "Đăng ký thành công!",
    error: "Có lỗi xảy ra khi đăng ký.",
    enterName: "Nhập tên người dùng",
    enterEmail: "Nhập email",
    enterPassword: "Nhập mật khẩu",
    reenterPassword: "Nhập lại mật khẩu",
  },
  en: {
    title: "Sign Up",
    name: "Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    signUp: "Sign Up",
    alreadyHaveAccount: "Already have an account?",
    login: "Log in",
    fillAll: "Please fill all fields",
    passwordNotMatch: "Passwords do not match",
    success: "Registration successful!",
    error: "An error occurred during registration.",
    enterName: "Enter your username",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    reenterPassword: "Re-enter your password",
  },
};

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#f4f7ff",
      padding: 24,
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
      marginBottom: 12,
      shadowColor: isDarkMode ? "#000" : "#4b46f1",
      shadowOpacity: isDarkMode ? 0.1 : 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: isDarkMode ? 0 : 2,
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    passwordInput: {
      flex: 1,
    },
    eyeIcon: {
      marginLeft: 8,
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
    secondaryContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 18,
    },
    text: {
      color: isDarkMode ? "#ccc" : "#222",
    },
    link: {
      color: isDarkMode ? "#FFD700" : "#4b46f1",
      fontWeight: "bold",
      marginLeft: 4,
    },
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Lỗi", t.fillAll);
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", t.passwordNotMatch);
      return;
    }

    const options = {
      method: 'POST',
      url: BASE_API_URL + "register",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data: {
        username: name,
        password: password,
        email: email,
        avatarUrl: "https://i.pinimg.com/474x/e7/37/61/e73761b05e3921a209960b591787aa9c.jpg" // hoặc cho phép user chọn
      }
    };

    try {
      const { data } = await axios.request(options);
      Alert.alert("Thành công", data.msg || t.success);
      navigation.navigate("LoginScreen");
    } catch (error) {
      if (error.response) {
        Alert.alert("Lỗi", error.response.data.msg || t.error);
      } else {
        Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại!");
      }
      console.error("SignUp Error:", error);
    }
  };

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>{t.title}</Text>

      <Text style={dynamicStyles.label}>{t.name}</Text>
      <TextInput
        style={dynamicStyles.input}
        placeholder={t.enterName}
        placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
        value={name}
        onChangeText={setName}
      />

      <Text style={dynamicStyles.label}>{t.email}</Text>
      <TextInput
        style={dynamicStyles.input}
        placeholder={t.enterEmail}
        placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={dynamicStyles.label}>{t.password}</Text>
      <View style={dynamicStyles.passwordContainer}>
        <TextInput
          style={[dynamicStyles.input, dynamicStyles.passwordInput]}
          placeholder={t.enterPassword}
          placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="gray" style={dynamicStyles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <Text style={dynamicStyles.label}>{t.confirmPassword}</Text>
      <View style={dynamicStyles.passwordContainer}>
        <TextInput
          style={[dynamicStyles.input, dynamicStyles.passwordInput]}
          placeholder={t.reenterPassword}
          placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <FontAwesome name={showConfirmPassword ? "eye-slash" : "eye"} size={20} color="gray" style={dynamicStyles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={dynamicStyles.primaryButton} onPress={handleSignUp}>
        <Text style={dynamicStyles.primaryButtonText}>{t.signUp}</Text>
      </TouchableOpacity>

      <View style={dynamicStyles.secondaryContainer}>
        <Text style={dynamicStyles.text}>{t.alreadyHaveAccount} </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={dynamicStyles.link}>{t.login}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;