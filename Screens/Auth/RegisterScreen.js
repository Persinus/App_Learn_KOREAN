import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import authStyles from "../../Styles/AuthStyles";
import BASE_API_URL from "../../Util/Baseapi";
import { saveUsername } from "../../Util/UserStorage";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu không khớp");
      return;
    }

    try {
      // Gửi yêu cầu đăng ký đến API
      const response = await axios.post(BASE_API_URL + "register", {
        username: name,
        email: email,
        password: password,
      });

      Alert.alert("Thành công", response.data.msg);

      // KHÔNG lưu username vào AsyncStorage ở đây nữa

      navigation.navigate("LoginScreen");
    } catch (error) {
      if (error.response) {
        Alert.alert("Lỗi", error.response.data.msg || "Có lỗi xảy ra khi đăng ký.");
      } else {
        Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại!");
      }
      console.error("SignUp Error:", error);
    }
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Sign Up</Text>

      <Text style={authStyles.label}>Your Name</Text>
      <TextInput 
        style={authStyles.input} 
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

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
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={20} color="gray" style={authStyles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <Text style={authStyles.label}>Confirm Password</Text>
      <View style={authStyles.passwordContainer}>
        <TextInput 
          style={[authStyles.input, authStyles.passwordInput]} 
          placeholder="Re-enter your password" 
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <FontAwesome name={showConfirmPassword ? "eye-slash" : "eye"} size={20} color="gray" style={authStyles.eyeIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={authStyles.primaryButton} onPress={handleSignUp}>
        <Text style={authStyles.primaryButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={authStyles.secondaryContainer}>
        <Text style={authStyles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={authStyles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;