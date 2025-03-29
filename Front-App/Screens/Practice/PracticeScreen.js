import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

const subscriptionOptions = [
  {
    title: "Monthly Lessons",
    description: "Access all lesson plans and resources for one month to boost your learning.",
    color: "#E6D6FF",
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('LessionScreen'),
  },
  {
    title: "Yearly Mini Games",
    description: "Enjoy mini games designed to make learning fun throughout the year.",
    color: "#D6E6FF",
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('MiniGame1'),
  },
  {
    title: "Lifetime Video Library",
    description: "Get lifetime access to a rich library of educational videos and resources.",
    color: "#FFE6C7",
    icon: require('../../assets/avatar1.png'),
    onPress: (navigation) => navigation.navigate('VideoListScreen'), // Điều hướng đến màn hình khác
  },
];

const PracticeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Subscription Plans</Text>
      <FlatList
        data={subscriptionOptions}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: item.color }]} 
            onPress={() => item.onPress && item.onPress(navigation)} // Xử lý điều hướng
            activeOpacity={0.7} // Làm mờ khi nhấn
          >
            <Image source={item.icon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6A0DAD",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
});

export default PracticeScreen;
