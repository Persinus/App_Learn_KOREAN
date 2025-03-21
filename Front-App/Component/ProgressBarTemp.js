import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tiến độ học: {Math.round(progress * 100)}%</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  progressBar: {
    width: "100%",
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
});

export default ProgressBar;
