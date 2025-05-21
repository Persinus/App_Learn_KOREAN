import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import BASE_API_URL from "../../Util/Baseapi";
import { getUsername } from "../../Util/UserStorage";

const translations = {
  vn: {
    rankings: "Xếp hạng",
    top3Players: "🏆 Top 3 Người Chơi",
    points: "điểm",
    noRank: "Chưa có hạng",
  },
  en: {
    rankings: "Rankings",
    top3Players: "🏆 Top 3 Players",
    points: "points",
    noRank: "No ranking yet",
  },
};

const RankingsScreen = ({ navigation }) => {
  const language = useSelector((state) => state.language.language);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const t = translations[language];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUsername, setCurrentUsername] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uname = await getUsername();
        setCurrentUsername(uname);

        const res = await fetch(BASE_API_URL + "users", {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();

        const usersData = data.map(u => ({
          username: u.username,
          score: u.score,
          avatar: u.avatar,
        }));

        const sorted = [...usersData].sort((a, b) => b.score - a.score);
        setUsers(sorted);
      } catch (e) {
        setUsers([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const topUsers = users.filter(u => u.score > 0).slice(0, 3);
  const otherUsers = users.filter(u => u.score > 0).slice(3);
  const zeroScoreUsers = users.filter(u => u.score === 0);

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    sectionTitle: {
      color: isDarkMode ? '#fff' : '#333',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 12,
      marginTop: 20,
      paddingHorizontal: 20,
    },
    podiumRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 24,
      marginHorizontal: 8,
    },
    podiumCard: {
      alignItems: "center",
      backgroundColor: isDarkMode ? "#1E1E1E" : "#f8f9fa",
      borderRadius: 16,
      padding: 14,
      width: 110,
      elevation: 2,
      borderWidth: 2,
      marginHorizontal: 2,
    },
    podiumAvatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 3,
      marginBottom: 8,
    },
    podiumName: {
      color: isDarkMode ? "#fff" : "#333",
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: 2,
      textAlign: "center",
    },
    podiumScore: {
      color: "#FFD700",
      fontWeight: "bold",
      fontSize: 14,
      marginBottom: 2,
    },
    podiumMedal: {
      marginTop: 2,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#1E1E1E" : "#fff",
      borderRadius: 12,
      padding: 12,
      marginBottom: 10,
      marginHorizontal: 16,
      borderWidth: 2,
      borderColor: "#eee",
      elevation: 2,
    },
    cardActive: {
      borderColor: "#00ADB5",
      backgroundColor: isDarkMode ? "#222" : "#E0F7FA",
    },
    rankNumber: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDarkMode ? "#00ADB5" : "#4b46f1",
      width: 36,
      textAlign: 'center',
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      marginRight: 12,
      borderWidth: 2,
      borderColor: "#00ADB5",
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? "#fff" : "#333",
      flex: 1,
    },
    score: {
      fontSize: 14,
      color: isDarkMode ? "#B3B3B3" : "#666",
      marginLeft: 8,
      fontWeight: "bold",
    },
    medal: {
      marginLeft: 8,
    },
    zeroSection: {
      marginTop: 24,
      paddingHorizontal: 20,
    },
    zeroTitle: {
      color: isDarkMode ? "#B3B3B3" : "#888",
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    zeroUser: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#232323" : "#f3f3f3",
      borderRadius: 10,
      padding: 10,
      marginBottom: 8,
    },
    zeroAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 10,
      borderWidth: 1,
      borderColor: "#aaa",
    },
    zeroName: {
      color: isDarkMode ? "#B3B3B3" : "#888",
      fontSize: 14,
      flex: 1,
    },
    zeroScore: {
      color: isDarkMode ? "#B3B3B3" : "#888",
      fontSize: 13,
      fontWeight: "bold",
    },
  };

  return (
    <ScrollView style={dynamicStyles.container} contentContainerStyle={{paddingBottom: 32}}>
      <Text style={dynamicStyles.sectionTitle}>{t.rankings}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00ADB5" style={{ marginTop: 40 }} />
      ) : (topUsers.length === 0) ? (
        <Text style={dynamicStyles.zeroTitle}>{t.noRank}</Text>
      ) : (
        <>
          {/* Top 3 podium */}
          <View style={dynamicStyles.podiumRow}>
            {topUsers.map((user, idx) => (
              <TouchableOpacity
                key={user.username}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("DetailRanking", { user })}
                style={[
                  dynamicStyles.podiumCard,
                  user.username === currentUsername && { borderColor: "#00ADB5" },
                  idx === 0 && { borderColor: "#FFD700" },
                  idx === 1 && { borderColor: "#C0C0C0" },
                  idx === 2 && { borderColor: "#CD7F32" },
                ]}
              >
                <Image
                  source={{ uri: user.avatar }}
                  style={[
                    dynamicStyles.podiumAvatar,
                    user.username === currentUsername && { borderColor: "#00ADB5" },
                    idx === 0 && { borderColor: "#FFD700" },
                    idx === 1 && { borderColor: "#C0C0C0" },
                    idx === 2 && { borderColor: "#CD7F32" },
                  ]}
                />
                <Text
                  style={[
                    dynamicStyles.podiumName,
                    user.username === currentUsername && { color: "#00ADB5" },
                  ]}
                  numberOfLines={1}
                >
                  {user.username}
                  {user.username === currentUsername && (
                    <Text style={{ color: "#00ADB5", fontWeight: "bold" }}>
                      {language === "vn" ? " (Bạn)" : " (You)"}
                    </Text>
                  )}
                </Text>
                <Text style={dynamicStyles.podiumScore}>
                  {user.score} {t.points}
                </Text>
                <FontAwesome5
                  name={idx === 0 ? "crown" : "medal"}
                  size={22}
                  color={idx === 0 ? "#FFD700" : idx === 1 ? "#C0C0C0" : "#CD7F32"}
                  style={dynamicStyles.podiumMedal}
                />
              </TouchableOpacity>
            ))}
          </View>
          {/* Danh sách còn lại */}
          {otherUsers.map((item, index) => (
            <TouchableOpacity
              key={item.username}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("DetailRanking", { user: item })}
              style={[
                dynamicStyles.card,
                item.username === currentUsername && dynamicStyles.cardActive,
              ]}
            >
              <Text style={dynamicStyles.rankNumber}>#{index + 4}</Text>
              <Image source={{ uri: item.avatar }} style={dynamicStyles.avatar} />
              <Text
                style={[
                  dynamicStyles.name,
                  item.username === currentUsername && { color: "#00ADB5", fontWeight: "bold" },
                ]}
                numberOfLines={1}
              >
                {item.username}
                {item.username === currentUsername && (
                  <Text style={{ color: "#00ADB5", fontWeight: "bold" }}>
                    {language === "vn" ? " (Bạn)" : " (You)"}
                  </Text>
                )}
              </Text>
              <Text style={dynamicStyles.score}>{item.score} {t.points}</Text>
              <FontAwesome5 name="medal" size={18} color="#FFD700" style={dynamicStyles.medal} />
            </TouchableOpacity>
          ))}
        </>
      )}
      {/* Danh sách chưa có hạng */}
      {zeroScoreUsers.length > 0 && (
        <View style={dynamicStyles.zeroSection}>
          <Text style={dynamicStyles.zeroTitle}>{t.noRank}</Text>
          {zeroScoreUsers.map(u => (
            <View key={u.username} style={dynamicStyles.zeroUser}>
              <Image source={{ uri: u.avatar }} style={dynamicStyles.zeroAvatar} />
              <Text style={dynamicStyles.zeroName}>{u.username}</Text>
              <Text style={dynamicStyles.zeroScore}>0 {t.points}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default RankingsScreen;
