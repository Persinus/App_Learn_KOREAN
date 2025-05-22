import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const subscriptionOptions = [
  {
    title: "Bài học hàng tháng",
    description: "Truy cập tất cả các bài học và tài nguyên trong một tháng.",
    color: "#E6D6FF",
    icon: require('../../assets/avatar_1.jpg'),
    onPress: (navigation) => navigation.navigate('LessionScreen'),
  },
  {
    title: "Mini Games",
    description: "Học thông qua các trò chơi tương tác thú vị.",
    color: "#D6E6FF", 
    icon: require('../../assets/avatar_2.jpg'),
    onPress: (navigation) => navigation.navigate('MiniGame1'),
  },
  {
    title: "Thư viện Video",
    description: "Học qua video K-pop và phim Hàn Quốc có phụ đề.",
    color: "#FFE6C7",
    icon: require('../../assets/avatar_3.jpg'),
    onPress: (navigation) => navigation.navigate('VideoListScreen'),
  },
   {
    title: "Từ Điển",
    description: "Tra cứu từ vựng.",
    color: "#E6D6FF",
    icon: require('../../assets/avatar_4.jpg'),
    onPress: (navigation) => navigation.navigate('Dictionary'),
  },
 
];

const PracticeScreen = ({ navigation }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  const translations = {
    vn: {
      header: "📚 Các Tiện ích học tập ",
      subscriptionOptions: [
        {
          title: "Bài học hàng tháng",
          description: "Truy cập tất cả các bài học và tài nguyên trong một tháng.",
        },
        {
          title: "Trò chơi nhỏ ",
          description: "Học thông qua các trò chơi tương tác thú vị.",
        },
      
        {
          title: "Thư viện Video",
          description: "Học qua video K-pop và phim Hàn Quốc có phụ đề.",
        },
          {
          title: "Từ Điển",
          description: "Tra cứu từ vựng ",
        },
       
        
   
       
      ],
    },
    en: {
      header: "📚 Study Plans",
      subscriptionOptions: [
        {
          title: "Monthly Lessons",
          description: "Access all lessons and resources for one month.",
        },
        {
          title: "Mini Games",
          description: "Learn through fun interactive games.",
        },
        {
          title: "Video Library",
          description: "Learn through K-pop videos and Korean movies with subtitles.",
        },
           {
          title: "Dictionary",
          description: "Look up vocabulary.",
        },
      
     
       
      ],
    },
  };

  const t = translations[language];

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkMode ? '#fff' : '#4b46f1',
      textAlign: "center",
      marginBottom: 15,
      letterSpacing: 0.2,
    },
    card: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: isDarkMode ? '#FFD70033' : '#e3e7fd',
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      shadowOpacity: isDarkMode ? 0.12 : 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
    },
    title: {
      color: isDarkMode ? '#fff' : '#4b46f1',
      fontWeight: "bold",
      fontSize: 18,
    },
    description: {
      color: isDarkMode ? '#ccc' : '#666',
      fontSize: 14,
      marginVertical: 5,
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.header, dynamicStyles.header]}>{t.header}</Text>
      <FlatList
        data={t.subscriptionOptions}
        keyExtractor={(item) => item.title}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.card,
              dynamicStyles.card,
              isDarkMode
                ? { backgroundColor: '#232323' }
                : { backgroundColor: subscriptionOptions[index].color }
            ]}
            onPress={() => subscriptionOptions[index].onPress && subscriptionOptions[index].onPress(navigation)}
            activeOpacity={0.7}
          >
            <Image source={subscriptionOptions[index].icon} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={[styles.title, dynamicStyles.title]}>{item.title}</Text>
              <Text style={[styles.description, dynamicStyles.description]}>{item.description}</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
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
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
});

export default PracticeScreen;
