import React, { useState } from "react";
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
import authStyles from "../../Styles/AuthStyles"; // ✅ Import styles chung

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        routes: [{ name: 'MainNavigator' }],
      });
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!");
      console.error("Login Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={authStyles.container} keyboardShouldPersistTaps="handled">
        <Text style={authStyles.title}>Log In</Text>

        <Text style={authStyles.label}>Your Email</Text>
        <TextInput
          style={authStyles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={authStyles.label}>Password</Text>
        <View style={authStyles.passwordContainer}>
          <TextInput
            style={[authStyles.input, authStyles.passwordInput]}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={authStyles.eyeIcon}>
            <FontAwesome name={isPasswordVisible ? "eye-slash" : "eye"} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={authStyles.forgotPassword}>
          <Text style={authStyles.link}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={authStyles.primaryButton} onPress={handleLogin}>
          <Text style={authStyles.primaryButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={authStyles.secondaryContainer}>
          <Text style={authStyles.text}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <Text style={authStyles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <Text style={authStyles.orText}>Or log in with</Text>
        <View style={authStyles.socialContainer}>
          <TouchableOpacity style={[authStyles.socialButton, { backgroundColor: "#db4437" }]}>
            <FontAwesome name="google" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[authStyles.socialButton, { backgroundColor: "#3b5998" }]}>
            <FontAwesome name="facebook" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;