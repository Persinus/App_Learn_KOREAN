import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Video from "react-native-video";

const VideoPlayer = ({ videoUri }) => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUri }}
        style={styles.video}
        controls={true} // Hiển thị điều khiển phát video
        resizeMode="contain"
        paused={false} // Tự động phát
      />
      <Text style={styles.caption}>Đang phát video học tiếng Hàn...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  video: {
    width: "90%",
    height: 200,
  },
  caption: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default VideoPlayer;
