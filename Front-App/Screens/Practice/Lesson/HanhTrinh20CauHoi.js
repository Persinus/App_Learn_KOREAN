import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Animated, 
  StyleSheet, 
  ScrollView, 
  Modal,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

// Danh sách nhân vật có thể chọn
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

// Tạo đường đi cho 20 câu hỏi theo thiết kế Figma
const generatePathPoints = () => {
  // Tạo đường đi zigzag đẹp hơn với điểm uốn
  return Array.from({ length: 20 }).map((_, i) => {
    // Thay đổi vị trí theo mẫu zigzag từ trái sang phải
    let x;
    if (i % 4 === 0) {
      x = width * 0.15; // Lề trái
    } else if (i % 4 === 1) {
      x = width * 0.35; // Gần lề trái
    } else if (i % 4 === 2) {
      x = width * 0.65; // Gần lề phải
    } else {
      x = width * 0.85; // Lề phải
    }
    
    // Khoảng cách dọc giữa các câu hỏi đều đặn
    return {
      x,
      y: 240 + i * 140, // Khoảng cách y hợp lý để nhìn rõ
      number: i + 1,
      completed: i < 5, // Giả sử 5 câu đầu đã hoàn thành
      locked: i > 5, // Khóa các câu hỏi tương lai (sau câu hiện tại là 5)
    };
  });
};

const HanhTrinh20CauHoi = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [pathPoints, setPathPoints] = useState(generatePathPoints());
  const [character, setCharacter] = useState(characterList[0].uri);
  const [characterPosition] = useState(new Animated.ValueXY({ 
    x: generatePathPoints()[4].x, // Vị trí của câu hiện tại (câu 5)
    y: generatePathPoints()[4].y - 100 // Nhân vật hiển thị phía trên nút
  }));
  const [isCharacterPanelVisible, setCharacterPanelVisible] = useState(false);
  const [gems, setGems] = useState(600);
  const [characters, setCharacters] = useState(characterList);
  const [currentQuestion, setCurrentQuestion] = useState(5); // Câu hiện tại là câu 5
  
  // Hiệu ứng chớp sáng cho nút câu hỏi hiện tại
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Tạo hiệu ứng nhấp nháy cho câu hỏi hiện tại
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Auto-scroll đến vị trí câu hỏi hiện tại khi lần đầu mở màn hình
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ 
        y: pathPoints[currentQuestion-1].y - 300, 
        animated: true 
      });
    }, 500);
  }, []);
  
  // Di chuyển nhân vật đến vị trí câu hỏi đã chọn
  const moveCharacter = (index, x, y) => {
    const point = pathPoints[index];
    
    // Nếu câu hỏi bị khóa, không cho phép di chuyển
    if (point.locked) {
      alert("Vui lòng hoàn thành các bài học trước để mở khóa!");
      return;
    }
    
    // Di chuyển nhân vật với hiệu ứng mượt mà
    Animated.timing(characterPosition, {
      toValue: { x, y: y - 100 }, // Nhân vật luôn ở phía trên nút
      duration: 800,
      useNativeDriver: false, 
    }).start(() => {
      // Scroll đến vị trí phù hợp
      scrollViewRef.current?.scrollTo({ y: y - 300, animated: true });
      
      // Chuyển đến màn hình chi tiết câu hỏi
      navigation.navigate("DetailScreen", { id: point.number });
    });
  };

  // Xử lý mua và chọn nhân vật
  const handleCharacterSelect = (char, index) => {
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
  };

  return (
    <View style={styles.container}>
      {/* Header với nút quay lại */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Hành trình 20 câu hỏi</Text>
        <View style={{width: 40}} />
      </View>
      
      {/* Kim cương hiển thị ở góc phải trên */}
      <View style={styles.gemsContainer}>
        <Text style={styles.gemsText}>💎 {gems}</Text>
      </View>

      {/* Nút chọn nhân vật */}
      <TouchableOpacity 
        style={styles.characterSelectButton} 
        onPress={() => setCharacterPanelVisible(true)}
      >
        <FontAwesome5 name="user-astronaut" size={16} color="#fff" style={{marginRight: 5}} />
        <Text style={styles.buttonText}>Chọn nhân vật</Text>
      </TouchableOpacity>

      {/* Thanh tiến độ */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentQuestion/20)*100}%` }]} />
        </View>
        <Text style={styles.progressText}>{currentQuestion}/20 câu hỏi</Text>
      </View>

      {/* Nội dung chính - Hành trình zigzag */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Nhân vật di chuyển */}
        <Animated.Image
          source={{ uri: character }}
          style={[styles.character, characterPosition.getLayout()]}
        />
        
        {/* Các đường nối giữa các điểm */}
        {pathPoints.map((point, index) => {
          if (index < pathPoints.length - 1) {
            const nextPoint = pathPoints[index + 1];
            return (
              <View key={`path-${index}`} style={[
                styles.pathLine,
                point.locked && styles.lockedPathLine,
                {
                  left: point.x + 25, 
                  top: point.y + 25,
                  width: Math.sqrt(Math.pow(nextPoint.x - point.x, 2) + Math.pow(nextPoint.y - point.y, 2)),
                  transform: [{ 
                    rotate: `${Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI)}deg` 
                  }]
                }
              ]} />
            );
          }
          return null;
        })}

        {/* Các nút câu hỏi */}
        {pathPoints.map((point, index) => (
          <View key={index} style={[styles.rowContainer, { top: point.y }]}>
            <TouchableOpacity 
              style={[
                styles.node, 
                { left: point.x },
                point.completed && styles.completedNode,
                point.locked && styles.lockedNode
              ]} 
              onPress={() => moveCharacter(index, point.x, point.y)}
              disabled={point.locked}
            >
              {point.completed ? (
                <View style={styles.completedCircle}>
                  <FontAwesome5 name="check" size={20} color="#fff" />
                </View>
              ) : point.locked ? (
                <View style={styles.questionCircle}>
                  <FontAwesome5 name="lock" size={20} color="#fff" />
                </View>
              ) : (
                <Animated.View 
                  style={[
                    styles.questionCircle,
                    index === currentQuestion - 1 && styles.currentQuestionCircle,
                    index === currentQuestion - 1 && {
                      transform: [{ scale: pulseAnim }]
                    }
                  ]}
                >
                  <Text style={styles.questionText}>{point.number}</Text>
                </Animated.View>
              )}
              
              {/* Nhãn dưới nút */}
              <Text style={[
                styles.nodeLabel,
                point.locked && styles.lockedText
              ]}>
                Bài {point.number}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal chọn nhân vật */}
      <Modal visible={isCharacterPanelVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn Nhân Vật</Text>
            <ScrollView style={styles.characterScrollView}>
              <View style={styles.characterGrid}>
                {characters.map((char, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.characterItem}
                    onPress={() => handleCharacterSelect(char, index)}
                  >
                    <Image source={{ uri: char.uri }} style={styles.characterOption} />
                    <Text style={styles.characterName}>{char.name}</Text>
                    {char.isOwned ? (
                      <Text style={styles.ownedText}>Đã sở hữu</Text>
                    ) : (
                      <View style={styles.priceTag}>
                        <Text style={styles.priceText}>{char.price}</Text>
                        <Text style={styles.priceIcon}>💎</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setCharacterPanelVisible(false)}
            >
              <Text style={styles.buttonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FF", // Màu nền nhẹ nhàng hơn theo Figma
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#5271FF", // Màu chủ đạo theo Figma
    paddingVertical: 15,
    paddingHorizontal: 16,
    paddingTop: 50, // Dành cho statusbar
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gemsContainer: {
    position: "absolute",
    top: 50,
    right: 16,
    backgroundColor: "#FFD700",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  gemsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  characterSelectButton: {
    position: "absolute",
    top: 50,
    left: 16,
    backgroundColor: "#FF9800", // Màu cam theo Figma
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    marginTop: 80,
    marginBottom: 15,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    marginVertical: 5,
  },
  progressFill: {
    height: 10,
    backgroundColor: "#4CAF50", // Màu xanh lá
    borderRadius: 10,
  },
  progressText: {
    fontSize: 14,
    color: "#444",
    textAlign: "right",
  },
  scrollContainer: {
    paddingTop: 20,
    paddingBottom: 3500, // Đủ cho 20 câu hỏi
  },
  character: {
    width: 70,
    height: 70,
    position: "absolute",
    borderRadius: 35,
    zIndex: 10,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    justifyContent: "center",
  },
  pathLine: {
    height: 4,
    backgroundColor: "#D0D0D0",
    position: "absolute",
    transformOrigin: "left",
  },
  lockedPathLine: {
    backgroundColor: "#A0A0A0",
    borderStyle: "dashed",
    opacity: 0.5,
  },
  node: {
    width: 70, 
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  completedNode: {
    opacity: 0.9,
  },
  lockedNode: {
    opacity: 0.6,
  },
  questionCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#5271FF", // Màu xanh dương theo Figma
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  currentQuestionCircle: {
    backgroundColor: "#FF9800", // Màu cam cho câu hiện tại
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#FFC107",
  },
  completedCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4CAF50", // Màu xanh lá
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  nodeLabel: {
    position: "absolute",
    top: 60,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  lockedText: {
    color: "#888",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    width: "85%",
    maxHeight: "80%",
    alignItems: "center",
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5271FF",
  },
  characterScrollView: {
    width: "100%",
    maxHeight: height * 0.5,
  },
  characterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  characterItem: {
    width: "30%",
    marginBottom: 20,
    alignItems: "center",
  },
  characterOption: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  characterName: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
  },
  ownedText: {
    textAlign: "center",
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 4,
  },
  priceTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
  },
  priceText: {
    color: "#5271FF",
    fontWeight: "bold",
    fontSize: 12,
    marginRight: 2,
  },
  priceIcon: {
    fontSize: 12,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#5271FF",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 3,
  },
});

export default HanhTrinh20CauHoi;
