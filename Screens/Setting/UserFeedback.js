import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BASE_API_URL from '../../Util/Baseapi';
import { getUsername } from '../../Util/UserStorage';

const UserFeedback = () => {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rating, setRating] = useState(0);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  const translations = {
    vn: {
      feedback: 'Phản hồi',
      selectCategory: 'Chọn danh mục',
      categories: ['Lỗi ứng dụng', 'Góp ý cải thiện', 'Đánh giá nội dung', 'Khác'],
      feedbackContent: 'Nội dung phản hồi',
      placeholder: 'Nhập nội dung phản hồi của bạn...',
      submit: 'Gửi phản hồi',
      success: 'Thành công',
      successMessage: 'Cảm ơn bạn đã gửi phản hồi!',
      errorCategory: 'Vui lòng chọn danh mục phản hồi',
      errorContent: 'Vui lòng nhập nội dung phản hồi',
      errorRating: 'Vui lòng chọn số sao đánh giá',
      rating: 'Đánh giá',
    },
    en: {
      feedback: 'Feedback',
      selectCategory: 'Select Category',
      categories: ['App Bug', 'Improvement Suggestion', 'Content Review', 'Other'],
      feedbackContent: 'Feedback Content',
      placeholder: 'Enter your feedback...',
      submit: 'Submit Feedback',
      success: 'Success',
      successMessage: 'Thank you for your feedback!',
      errorCategory: 'Please select a feedback category',
      errorContent: 'Please enter feedback content',
      errorRating: 'Please select a rating',
      rating: 'Rating',
    },
  };

  const t = translations[language];
  const categories = t.categories;

  const handleSubmit = async () => {
    if (!selectedCategory) {
      Alert.alert(t.errorCategory);
      return;
    }
    if (!feedback.trim()) {
      Alert.alert(t.errorContent);
      return;
    }
    if (!rating) {
      Alert.alert(t.errorRating);
      return;
    }
    try {
      const name = await getUsername();
      const options = {
        method: 'POST',
        url: BASE_API_URL + 'feedback',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        data: {
          name,
          rating,
          comment: `[${selectedCategory}] ${feedback}`,
          role: 'vote',
        },
      };
      await axios.request(options);
      Alert.alert(
        t.success,
        t.successMessage,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Gửi phản hồi thất bại!');
      console.error(error);
    }
  };

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#fff',
    },
    header: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderBottomColor: isDarkMode ? '#333' : '#eee',
    },
    title: {
      color: isDarkMode ? '#fff' : '#333',
    },
    sectionTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    categoryButton: {
      backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
    },
    selectedCategory: {
      backgroundColor: isDarkMode ? '#4b46f1' : '#4b46f1',
    },
    categoryText: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    selectedCategoryText: {
      color: '#fff',
    },
    input: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      borderColor: isDarkMode ? '#333' : '#ddd',
    },
    submitButton: {
      backgroundColor: isDarkMode ? '#4b46f1' : '#4b46f1',
    },
    submitButtonText: {
      color: '#fff',
    },
    star: {
      marginHorizontal: 2,
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      

      <ScrollView style={styles.content}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{t.selectCategory}</Text>
        <View style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                dynamicStyles.categoryButton,
                selectedCategory === category && dynamicStyles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  dynamicStyles.categoryText,
                  selectedCategory === category && dynamicStyles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{t.rating}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          {[1,2,3,4,5].map(star => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <FontAwesome5
                name="star"
                solid={rating >= star}
                size={28}
                color={rating >= star ? "#FFD700" : isDarkMode ? "#555" : "#ccc"}
                style={dynamicStyles.star}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{t.feedbackContent}</Text>
        <TextInput
          style={[styles.input, dynamicStyles.input]}
          multiline
          numberOfLines={6}
          placeholder={t.placeholder}
          placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
          value={feedback}
          onChangeText={setFeedback}
          textAlignVertical="top"
        />
      </ScrollView>

      <TouchableOpacity 
        style={[styles.submitButton, dynamicStyles.submitButton]} 
        onPress={handleSubmit}
      >
        <Text style={[styles.submitButtonText, dynamicStyles.submitButtonText]}>{t.submit}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 150,
    marginBottom: 24,
  },
  submitButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserFeedback;
