import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import authStyles from "../../Styles/AuthStyles"; // ✅ Import styles chung

const SignInScreen = ({ navigation }) => {
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Sign Up</Text>

      <Text style={authStyles.label}>Your Name</Text>
      <TextInput style={authStyles.input} placeholder="Enter your name" />

      <Text style={authStyles.label}>Your Email</Text>
      <TextInput style={authStyles.input} placeholder="Enter your email" keyboardType="email-address" />

      <Text style={authStyles.label}>Password</Text>
      <View style={authStyles.passwordContainer}>
        <TextInput style={[authStyles.input, authStyles.passwordInput]} placeholder="Enter your password" secureTextEntry />
        <FontAwesome name="eye" size={20} color="gray" style={authStyles.eyeIcon} />
      </View>

      <Text style={authStyles.label}>Confirm Password</Text>
      <View style={authStyles.passwordContainer}>
        <TextInput style={[authStyles.input, authStyles.passwordInput]} placeholder="Re-enter your password" secureTextEntry />
        <FontAwesome name="eye" size={20} color="gray" style={authStyles.eyeIcon} />
      </View>

      <TouchableOpacity style={authStyles.primaryButton}>
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
