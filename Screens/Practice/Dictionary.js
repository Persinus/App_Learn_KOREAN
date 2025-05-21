import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BASE_API_URL = 'https://back-end-fastify-app-learn-korean.onrender.com/';

const Dictionary = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [vocabularies, setVocabularies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_API_URL}vocabulary`);
      setVocabularies(res.data);
      const cats = Array.from(new Set(res.data.map(item => item.category))).filter(Boolean);
      setCategories(cats);
    } catch (error) {
      setVocabularies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchByCategory = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    setSearch('');
    try {
      if (category === 'all') {
        fetchAll();
        return;
      }
      const res = await axios.get(`${BASE_API_URL}vocabulary/category/${category}`);
      setVocabularies(res.data);
    } catch (error) {
      setVocabularies([]);
    } finally {
      setLoading(false);
    }
  };

  const searchVocabulary = async (keyword) => {
    setSearch(keyword);
    setSelectedCategory('all');
    if (!keyword.trim()) {
      fetchAll();
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_API_URL}vocabulary/search`, {
        params: { q: keyword }
      });
      setVocabularies(res.data);
    } catch (error) {
      setVocabularies([]);
    } finally {
      setLoading(false);
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#181A20' : '#f6f8fa',
      paddingTop: 24,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      marginBottom: 16,
      textAlign: 'center',
      letterSpacing: 1,
    },
    searchWrap: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderRadius: 30,
      paddingHorizontal: 12,
      paddingVertical: 4,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    },
    search: {
      fontSize: 16,
      paddingVertical: 8,
      paddingHorizontal: 10,
      color: isDarkMode ? '#fff' : '#222',
    },
    categoryBar: {
      flexDirection: 'row',
      marginBottom: 14,
      paddingLeft: 2,
      minHeight: 42,
    },
    categoryBtn: {
      paddingHorizontal: 18,
      backgroundColor: isDarkMode ? '#232323' : '#e3e7fa',
      borderRadius: 18,
      marginRight: 8,
      marginBottom: 2,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 60,
    },
    categoryBtnActive: {
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
      height: 36,
    },
    categoryBtnText: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      fontWeight: '500',
      fontSize: 15,
      includeFontPadding: false,
      textAlign: 'center',
      textAlignVertical: 'center',
      lineHeight: 36, // Đặt lineHeight = height của nút
    },
    categoryBtnTextActive: {
      color: isDarkMode ? '#232323' : '#fff',
      fontWeight: '500',
      fontSize: 15,
      textAlign: 'center',
      textAlignVertical: 'center',
      lineHeight: 36, // Đặt lineHeight = height của nút
    },
    card: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderRadius: 18,
      padding: 18,
      marginBottom: 14,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 3,
      borderLeftWidth: 5,
      borderLeftColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    word: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#222',
      letterSpacing: 0.5,
    },
    categoryTag: {
      backgroundColor: isDarkMode ? '#181A20' : '#e3e7fa',
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 3,
      marginLeft: 8,
      flexShrink: 1,
      maxWidth: 120,
    },
    categoryText: {
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      fontWeight: 'bold',
      fontSize: 13,
    },
    meaning: {
      fontSize: 17,
      color: isDarkMode ? '#FFD700' : '#222',
      marginTop: 2,
      marginBottom: 2,
    },
    example: {
      fontSize: 15,
      color: isDarkMode ? '#4b46f1' : '#4b46f1',
      marginTop: 8,
      fontStyle: 'italic',
    },
  });

  const renderItem = ({ item }) => (
    <View style={dynamicStyles.card}>
      <View style={dynamicStyles.cardHeader}>
        <Text style={dynamicStyles.word}>{item.word}</Text>
        <View style={dynamicStyles.categoryTag}>
          <Text style={dynamicStyles.categoryText} numberOfLines={1}>{item.category}</Text>
        </View>
      </View>
      <Text style={dynamicStyles.meaning}>{item.meaning}</Text>
      {item.example && <Text style={dynamicStyles.example}>💡 {item.example}</Text>}
    </View>
  );

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>📚 Từ điển tiếng Hàn</Text>
      <View style={dynamicStyles.searchWrap}>
        <TextInput
          style={dynamicStyles.search}
          placeholder="🔍 Tìm kiếm từ vựng..."
          value={search}
          onChangeText={searchVocabulary}
          placeholderTextColor={isDarkMode ? "#888" : "#bbb"}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={dynamicStyles.categoryBar}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <TouchableOpacity
          style={[
            dynamicStyles.categoryBtn,
            selectedCategory === 'all' && dynamicStyles.categoryBtnActive
          ]}
          onPress={() => fetchByCategory('all')}
          activeOpacity={0.7}
        >
          <Text
            style={[
              dynamicStyles.categoryBtnText,
              selectedCategory === 'all' && dynamicStyles.categoryBtnTextActive
            ]}
            numberOfLines={1}
          >
            Tất cả
          </Text>
        </TouchableOpacity>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              dynamicStyles.categoryBtn,
              selectedCategory === cat && dynamicStyles.categoryBtnActive
            ]}
            onPress={() => fetchByCategory(cat)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                dynamicStyles.categoryBtnText,
                selectedCategory === cat && dynamicStyles.categoryBtnTextActive
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} size="large" color={isDarkMode ? "#FFD700" : "#4b46f1"} />
      ) : (
        <FlatList
          data={vocabularies}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 8 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32, color: isDarkMode ? "#888" : "#888" }}>Không có từ vựng nào.</Text>}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Dictionary;