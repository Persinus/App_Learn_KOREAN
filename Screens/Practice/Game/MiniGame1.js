import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cardData from "../../../assets/Card.json";
import { getUsername } from "../../../Util/UserStorage";
import BASE_API_URL from "../../../Util/Baseapi";
import axios from "axios";

const translations = {
  vn: {
    rules: "📜 Luật chơi",
    score: "Điểm",
    gold: "Vàng",
    diamond: "Kim cương",
    win: (amount, type) => `🎉 Chính xác! Bạn nhận được +${amount} ${type}!`,
    lose: "Sai rồi! Đáp án đúng là:",
    tryAgain: "Cố gắng lần sau nhé!",
    close: "Đóng",
    chooseToContinue: "Chọn đáp án để tiếp tục",
  },
  en: {
    rules: "📜 Rules",
    score: "Score",
    gold: "Gold",
    diamond: "Diamond",
    win: (amount, type) => `🎉 Correct! You get +${amount} ${type}!`,
    lose: "Incorrect! The correct answer is:",
    tryAgain: "Try again next time!",
    close: "Close",
    chooseToContinue: "Choose an answer to continue",
  },
};

// Filter cards to remove Joker
const filteredCardData = cardData.filter((card) => card.value !== "Joker");

// Luật chơi modal, truyền thêm userProfile
const RulesModal = ({ visible, onClose, userProfile }) => {
  const isDarkMode = useSelector(state => state.darkMode.isDarkMode);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
        <View style={[
          styles.modalContent,
          { backgroundColor: isDarkMode ? "#232323" : "#FFF" }
        ]}>
          <Text style={[
            styles.modalTitle,
            { color: isDarkMode ? "#FFD700" : "#6A0DAD" }
          ]}>
            {translations[useSelector(state => state.language.language)].rules}
          </Text>
          <Text style={[styles.modalText, { color: isDarkMode ? "#fff" : "#333" }]}>- Lá bài từ 1-10: Tính điểm tương ứng (1-10 điểm).</Text>
          <Text style={[styles.modalText, { color: isDarkMode ? "#fff" : "#333" }]}>- Lá bài J, Q, K: Tương ứng 11, 12, 13 điểm.</Text>
          <Text style={[styles.modalText, { color: isDarkMode ? "#fff" : "#333" }]}>- Bích: Danh từ; Tép: Động từ; Rô: Tính từ; Cơ: Trạng từ.</Text>
          <View style={{ marginVertical: 12, alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: isDarkMode ? "#FFD700" : "#6A0DAD" }}>
              Tài nguyên của bạn:
            </Text>
            <Text style={{ fontSize: 16, marginTop: 4, color: isDarkMode ? "#FFD700" : "#6A0DAD" }}>
              ⭐ {userProfile?.score ?? "?"}   🪙 {userProfile?.gold ?? "?"}   💎 {userProfile?.diamond ?? "?"}
            </Text>
          </View>
          <TouchableOpacity style={[styles.closeButton, { backgroundColor: isDarkMode ? "#FFD700" : "#6A0DAD" }]} onPress={onClose}>
            <Text style={[styles.closeButtonText, { color: isDarkMode ? "#232323" : "#FFF" }]}>{translations[useSelector(state => state.language.language)].close}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const CardRow = ({ cards, onPress, disabledCards }) => (
  <View style={styles.row}>
    {cards.map((card, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.card,
          disabledCards.includes(card.suit + card.value) && { opacity: 0.4 }
        ]}
        onPress={() => !disabledCards.includes(card.suit + card.value) && onPress(card)}
        disabled={disabledCards.includes(card.suit + card.value)}
      >
        <Image
          source={{ uri: card.image }}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <Text style={styles.cardText}>
          {card.value} {card.suit}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const MiniGame1 = () => {
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [answeredCards, setAnsweredCards] = useState([]); // lưu các lá đã trả lời
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [username, setUsername] = useState("");
  const isDarkMode = useSelector(state => state.darkMode.isDarkMode);
  const language = useSelector(state => state.language.language);
  const t = translations[language];

  // Lấy profile user
  const fetchProfile = async () => {
    try {
      const username = await getUsername();
      const options = {
        method: "GET",
        url: `${BASE_API_URL}users/profile`,
        params: { username },
        headers: { Accept: "application/json" }
      };
      const { data } = await axios.request(options);
      setUserProfile(data.user);
    } catch (error) {
      setUserProfile(null);
    }
  };

  // Lấy username và trạng thái đã chơi
  useEffect(() => {
    const init = async () => {
      const user = await getUsername();
      setUsername(user);
      // Lấy trạng thái đã chơi từ AsyncStorage
      const played = await AsyncStorage.getItem(`minigame1_played_${user}`);
      if (played) setAnsweredCards(JSON.parse(played));
      else setAnsweredCards([]); // Nếu chưa có thì là mảng rỗng
    };
    setCards(filteredCardData);
    fetchProfile();
    init();
  }, []);

  // Nếu muốn cập nhật trạng thái khi username đổi (ví dụ khi logout/login user khác)
  useEffect(() => {
    if (!username) return;
    const loadPlayed = async () => {
      const played = await AsyncStorage.getItem(`minigame1_played_${username}`);
      if (played) setAnsweredCards(JSON.parse(played));
      else setAnsweredCards([]);
    };
    loadPlayed();
  }, [username]);

  // Khi trả lời xong 1 lá, lưu trạng thái vào AsyncStorage
  const handleAnswered = async (cardKey) => {
    const newAnswered = [...answeredCards, cardKey];
    setAnsweredCards(newAnswered);
    if (username) {
      await AsyncStorage.setItem(
        `minigame1_played_${username}`,
        JSON.stringify(newAnswered)
      );
    }
  };

  const handleCardPress = (card) => {
    if (answeredCards.includes(card.suit + card.value)) return;
    setCurrentCard(card);
    setSelectedAnswer(null);
    setExplanation("");
    setIsCorrect(null);
    setQuestionModal(true);
  };

  // Group cards into rows of 4
  const groupedCards = [];
  for (let i = 0; i < cards.length; i += 4) {
    groupedCards.push(cards.slice(i, i + 4));
  }

  // Gọi API thưởng
  const rewardUser = async (card) => {
    const username = await getUsername();
    let url = "";
    let amount = card.score || card.gold || card.diamond || 1;
    if (card.value === "J") url = `${BASE_API_URL}users/${username}/add-score`;
    else if (card.value === "Q") url = `${BASE_API_URL}users/${username}/add-gold`;
    else if (card.value === "K") url = `${BASE_API_URL}users/${username}/add-diamond`;
    else return;
    try {
      await axios.post(url, { amount });
      await fetchProfile(); // Refresh tài nguyên sau khi cộng
    } catch (e) {}
  };

  // Giải thích đáp án
  const getExplanation = (card, isCorrect) => {
    const correct = card.answers.find(a => a.id === card.valueTrue);
    if (isCorrect) {
      let amount = card.score || card.gold || card.diamond || 1;
      let type = card.value === "J" ? t.score : card.value === "Q" ? t.gold : card.value === "K" ? t.diamond : t.score;
      return t.win(amount, type);
    }
    return `${t.lose} "${correct.text}".\n${t.tryAgain}`;
  };

  // Modal câu hỏi
  const renderQuestionModal = () => {
    if (!currentCard) return null;
    return (
      <Modal
        visible={questionModal}
        transparent
        animationType="fade"
        onRequestClose={() => setQuestionModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[
            styles.modalContent,
            { backgroundColor: isDarkMode ? "#232323" : "#FFF" }
          ]}>
            <Text style={[
              styles.modalTitle,
              { color: isDarkMode ? "#FFD700" : "#6A0DAD" }
            ]}>
              {currentCard.question}
            </Text>
            {currentCard.answers.map((ans) => (
              <TouchableOpacity
                key={ans.id}
                style={[
                  styles.answerButton,
                  selectedAnswer === ans.id && (isCorrect
                    ? styles.answerCorrect
                    : styles.answerWrong),
                  selectedAnswer && currentCard.valueTrue === ans.id && styles.answerHighlight
                ]}
                disabled={!!selectedAnswer}
                onPress={async () => {
                  if (selectedAnswer) return;
                  const correct = ans.id === currentCard.valueTrue;
                  setSelectedAnswer(ans.id);
                  setIsCorrect(correct);
                  setExplanation(getExplanation(currentCard, correct));
                  await handleAnswered(currentCard.suit + currentCard.value);
                  if (correct) await rewardUser(currentCard);
                }}
              >
                <Text style={[styles.answerText, { color: isDarkMode ? "#fff" : "#333" }]}>{ans.text}</Text>
              </TouchableOpacity>
            ))}
            {selectedAnswer && (
              <Text style={[
                styles.explanationText,
                { color: isCorrect ? (isDarkMode ? "#b6e388" : "#388e3c") : (isDarkMode ? "#ffb3b3" : "#d32f2f") }
              ]}>
                {explanation}
              </Text>
            )}
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: isDarkMode ? "#FFD700" : "#6A0DAD" }]}
              onPress={() => setQuestionModal(false)}
              disabled={!selectedAnswer}
            >
              <Text style={[styles.closeButtonText, { color: isDarkMode ? "#232323" : "#FFF" }]}>
                {selectedAnswer ? t.close : t.chooseToContinue}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[
      styles.screen,
      { backgroundColor: isDarkMode ? "#121212" : "#F5F5F5" }
    ]}>
      {/* Header: Rules + Resource in one row */}
      <View style={[
        styles.headerRow,
        { backgroundColor: isDarkMode ? "#232323" : "#6A0DAD" }
      ]}>
        <TouchableOpacity
          style={[
            styles.rulesButton,
            { backgroundColor: isDarkMode ? "#444" : "#FFF" }
          ]}
          onPress={() => {
            fetchProfile();
            setModalVisible(true);
          }}
        >
          <Text style={[
            styles.rulesButtonText,
            { color: isDarkMode ? "#FFD700" : "#6A0DAD" }
          ]}>
            {t.rules}
          </Text>
        </TouchableOpacity>
        <View style={[
          styles.resourceBox,
          { backgroundColor: isDarkMode ? "#444" : "#FFF" }
        ]}>
          <Text style={[
            styles.resourceText,
            { color: isDarkMode ? "#FFD700" : "#6A0DAD" }
          ]}>
            ⭐ {userProfile?.score ?? "?"}   🪙 {userProfile?.gold ?? "?"}   💎 {userProfile?.diamond ?? "?"}
          </Text>
        </View>
      </View>

      {/* Rules Modal */}
      <RulesModal visible={modalVisible} onClose={() => setModalVisible(false)} userProfile={userProfile} />

      {/* Question Modal */}
      {renderQuestionModal()}

      {/* Scrollable Cards */}
      <ScrollView contentContainerStyle={styles.container}>
        {groupedCards.map((row, rowIndex) => (
          <CardRow
            key={rowIndex}
            cards={row}
            onPress={handleCardPress}
            disabledCards={answeredCards}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MiniGame1;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 5,
  },
  container: {
    padding: 15,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  card: {
    width: 80,
    margin: 3,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardImage: {
    width: 70,
    height: 100,
  },
  cardText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6A0DAD",
    marginBottom: 15,
    textAlign: "center",
  },
  answerButton: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginVertical: 6,
    alignItems: "center",
  },
  answerText: {
    fontSize: 16,
    color: "#333",
  },
  answerCorrect: {
    backgroundColor: "#b6e388",
  },
  answerWrong: {
    backgroundColor: "#ffb3b3",
  },
  answerHighlight: {
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  explanationText: {
    marginTop: 12,
    fontSize: 15,
    color: "#6A0DAD",
    textAlign: "center",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#6A0DAD",
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  rulesButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  rulesButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  resourceBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  resourceText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
