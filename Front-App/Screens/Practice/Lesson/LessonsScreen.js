import React, { useState, useRef } from "react";
import { 
  View, Text, TouchableOpacity, Image, Animated, StyleSheet, ScrollView, Modal 
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const characterList = [
    { name: "Nhân Vật 1", uri: "https://i.pinimg.com/474x/39/da/a0/39daa05b8c3389b679f31c9745f3e9c4.jpg", price: 0, isOwned: true },
    { name: "Nhân Vật 2", uri: "https://i.pinimg.com/474x/64/d8/43/64d8437e21236d3750e5b7e877b8b54a.jpg", price: 0, isOwned: true },
    { name: "Nhân Vật 3", uri: "https://i.pinimg.com/474x/47/3d/8d/473d8d6347484a7d34c7946c06f50e29.jpg", price: 100, isOwned: false },
    { name: "Nhân Vật 4", uri: "https://i.pinimg.com/474x/c9/03/8f/c9038ffb9fec4de75d3f8db2f77d0d00.jpg", price: 150, isOwned: false },
    { name: "Nhân Vật 5", uri: "https://i.pinimg.com/474x/7e/aa/cc/7eaacce1ce2352fa71209c18d568bbde.jpg", price: 200, isOwned: false },
    { name: "Nhân Vật 6", uri: "https://i.pinimg.com/474x/c4/2c/8e/c42c8e60b5496acfd15f9834ef980cc0.jpg", price: 250, isOwned: false },
    { name: "Nhân Vật 7", uri: "https://i.pinimg.com/474x/f6/10/20/f6102023124c2da37de8fb7d154ef178.jpg", price: 300, isOwned: false },
    { name: "Nhân Vật 8", uri: "https://i.pinimg.com/474x/64/d8/43/64d8437e21236d3750e5b7e877b8b54a.jpg", price: 350, isOwned: false },
    { name: "Nhân Vật 9", uri: "https://i.pinimg.com/474x/56/f0/b3/56f0b382c9b6b16aaa94f4682c7f2803.jpg", price: 400, isOwned: false },
  ];

// ✅ Tạo danh sách 20 câu hỏi
const pathPoints = Array.from({ length: 20 }).map((_, i) => ({
  x: i % 2 === 0 ? 70 : 220, // Zigzag trái/phải
  y: 200 + i * 120, // Câu 1 ở y = 200, các câu sau cách 120px
  number: i + 1,
}));

const MapScreen = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [character, setCharacter] = useState(characterList[0].uri);
  const [characterPosition] = useState(new Animated.ValueXY({ 
    x: pathPoints[0].x, 
    y: pathPoints[0].y - 110 // Để nhân vật đứng phía trên nút
  }));
  const [isCharacterPanelVisible, setCharacterPanelVisible] = useState(false);
  const [gems, setGems] = useState(900);  // Kim cương ban đầu
  const [characters, setCharacters] = useState(characterList)
  // ✅ Di chuyển nhân vật và cuộn theo
  const moveCharacter = (index, x, y) => {
    Animated.timing(characterPosition, {
      toValue: { x, y: y - 110 }, // ✅ Nhân vật luôn nằm phía trên nút
      duration: 800,
      useNativeDriver: false, 
    }).start(() => {
      // ✅ Scroll đến vị trí chính xác
      scrollViewRef.current?.scrollTo({ y: y - 250, animated: true });

      // ✅ Chuyển sang màn hình câu hỏi
      navigation.navigate("DetailScreen", { id: pathPoints[index].number });
    });
  };

  return (
    <View style={styles.container}>
      {/* Nút mở panel chọn nhân vật */}
      <TouchableOpacity style={styles.characterSelectButton} onPress={() => setCharacterPanelVisible(true)}>
        <Text style={styles.buttonText}>🎭 Chọn Nhân Vật</Text>
      </TouchableOpacity>

      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hành trình 20 câu hỏi</Text>
      </View>

      {/* ✅ ScrollView cuộn đúng */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ✅ Nhân vật */}
        <Animated.Image
          source={{ uri: character }}
          style={[styles.character, characterPosition.getLayout()]}
        />

        {/* ✅ Đường đi */}
        {pathPoints.map((point, index) => (
          <View key={index} style={[styles.rowContainer, { top: point.y }]}>
            {/* Nút câu hỏi */}
            <TouchableOpacity 
              style={[styles.node, { left: point.x }]} 
              onPress={() => moveCharacter(index, point.x, point.y)}
            >
              <View style={styles.questionCircle}>
                <Text style={styles.questionText}>{point.number}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* ✅ Panel chọn nhân vật */}
      <Modal visible={isCharacterPanelVisible} transparent={true} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Chọn Nhân Vật</Text>
      <View style={styles.characterGrid}>
        {characters.map((char, index) => (
        <TouchableOpacity key={index} onPress={() => {
            if (char.isOwned) {
              setCharacter(char.uri);
              setCharacterPanelVisible(false);
            } else if (gems >= char.price) {
              setGems(gems - char.price);
              const updatedCharacters = [...characters];
              updatedCharacters[index].isOwned = true;
              setCharacters(updatedCharacters);
              setCharacter(char.uri);
              alert(`Mua thành công! ${char.name} đã được thêm vào bộ sưu tập.`);
              setCharacterPanelVisible(false);
            } else {
              alert("Không đủ kim cương để mua nhân vật này!");
            }
          }}>
            <Image source={{ uri: char.uri }} style={styles.characterOption} />
            <Text style={styles.characterName}>{char.name}</Text>
            {char.isOwned ? (
              <Text style={styles.ownedText}>Đã sở hữu</Text>
            ) : (
              <Text style={styles.priceText}>{char.price} 💎</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={() => setCharacterPanelVisible(false)}>
        <Text style={styles.buttonText}>Đóng</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F4EA",
   
  },
  header: {
    backgroundColor: "#7AC74F",
    paddingVertical: 15,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 2660, // ✅ Cuộn đủ 20 câu
  },
  character: {
    width: 70,
    height: 70,
    position: "absolute",
    borderRadius: 35,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    justifyContent: "center",
  },
  node: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF5CC",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  questionCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  characterSelectButton: {
    position: "absolute",
    top: 70,
    left: 10,
    backgroundColor: "#FFCC00",
    padding: 10,
    borderRadius: 10,
    zIndex: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  characterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  characterOption: {
    width: 70,
    height: 70,
    margin: 5,
    borderRadius: 35,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#FF5733",
    padding: 10,
    borderRadius: 10,
  },
});
