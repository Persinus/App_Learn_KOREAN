import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ text, onPress, style, disabled, variant = "purple" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === "purple" ? styles.purpleButton : styles.whiteButton,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          variant === "purple" ? styles.purpleText : styles.whiteText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  purpleButton: {
    backgroundColor: "#6a0dad",
    borderColor: "#6a0dad",
  },
  whiteButton: {
    backgroundColor: "#fff",
    borderColor: "#6a0dad",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  purpleText: {
    color: "#fff",
  },
  whiteText: {
    color: "#6a0dad",
  },
  disabled: {
    backgroundColor: "#d3d3d3",
    borderColor: "#d3d3d3",
  },
});

export default Button;
