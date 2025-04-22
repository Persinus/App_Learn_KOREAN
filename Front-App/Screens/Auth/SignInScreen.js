import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authStyles from "../../Styles/AuthStyles";

const SignInScreen = ({ navigation }) => {
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
      // Tạo tài khoản demo mặc định
      const demoAccount = {
        name: "Demo User",
        email: "demo@gmail.com",
        password: "123456"
      };
      
      // Lưu tài khoản demo
      await AsyncStorage.setItem('demoAccount', JSON.stringify(demoAccount));

      // Lưu tài khoản người dùng đăng ký
      const userData = {
        name,
        email,
        password,
        level: "Beginner",
        points: 0,
        avatar: "https://i.pinimg.com/474x/e7/37/61/e73761b05e3921a209960b591787aa9c.jpg"
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('userToken', 'true');

      Alert.alert(
        "Thành công", 
        `Đăng ký tài khoản thành công!\n\nTài khoản demo để test:\nEmail: ${demoAccount.email}\nPassword: ${demoAccount.password}`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("TabNavigator", { screen: "HomeScreen" })
          }
        ]
      );
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!");
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

export default SignInScreen;
