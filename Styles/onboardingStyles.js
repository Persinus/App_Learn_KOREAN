import { StyleSheet } from "react-native";

const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
    paddingHorizontal: 20,
  },
  image: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4A148C",
    marginBottom: 20,
  },
  optionButton: {
    width: "100%",
    backgroundColor: "#EDE7F6",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#4A148C",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: "#B39DDB",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
    color: "#4A148C",
    fontWeight: "500",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#FFF",
  },
  nextButton: {
    backgroundColor: "#4A148C",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: "#4A148C",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#D1C4E9",
  },
  nextText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default onboardingStyles;
