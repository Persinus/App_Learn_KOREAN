import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BASE_API_URL from '../../Util/Baseapi';
import { useNavigation } from '@react-navigation/native'; // Thêm dòng này

const Achievement = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const navigation = useNavigation(); // Thêm dòng này

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    title: {
      color: isDarkMode ? '#fff' : '#333',
    },
    viewAll: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    card: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      shadowColor: isDarkMode ? '#000' : '#aaa',
    },
    progressText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}achievements`);
        setAchievements(data);
      } catch (error) {
        setAchievements([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const renderAchievement = ({ item }) => (
    <TouchableOpacity
      style={[styles.achievementItem, dynamicStyles.card]}
      onPress={() => navigation.navigate('all')} // Sửa ở đây
      activeOpacity={0.8}
    >
      <View style={styles.iconWrapper}>
        <Image source={{ uri: item.icon }} style={styles.iconImage} />
      </View>
      <Text style={[styles.achievementTitle, dynamicStyles.title]} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={[styles.achievementDesc, dynamicStyles.progressText]} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.header}>
        <Text style={[styles.title, dynamicStyles.title]}>🏆 Thành tựu</Text>
        <TouchableOpacity onPress={() => navigation.navigate('all')}> {/* Sửa ở đây */}
          <Text style={[styles.viewAll, dynamicStyles.viewAll]}>Tất cả</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        <FlatList
          data={achievements.slice(0, 6)}
          renderItem={renderAchievement}
          keyExtractor={(item, index) =>
            item.achievementId ? item.achievementId.toString() + index : index.toString()
          }
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewAll: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  achievementItem: {
    width: 120,
    marginRight: 16,
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  iconImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 12,
    textAlign: 'center',
    minHeight: 32,
  },
});

export default Achievement;
