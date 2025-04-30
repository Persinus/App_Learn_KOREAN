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

const UserFeedback = () => {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const categories = [
    'Lỗi ứng dụng',
    'Góp ý cải thiện',
    'Đánh giá nội dung',
    'Khác'
  ];

  const handleSubmit = () => {
    if (!selectedCategory) {
      Alert.alert('Thông báo', 'Vui lòng chọn danh mục phản hồi');
      return;
    }
    if (!feedback.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập nội dung phản hồi');
      return;
    }

    // Xử lý gửi feedback ở đây
    Alert.alert(
      'Thành công',
      'Cảm ơn bạn đã gửi phản hồi!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#0099FF' : '#fff', // Nền xanh cho Dark Mode
    },
    header: {
      backgroundColor: isDarkMode ? '#6666FF' : '#fff', // Màu tím cho Dark Mode
      borderBottomColor: isDarkMode ? '#444' : '#eee',
    },
    title: {
      color: isDarkMode ? '#fff' : '#333',
    },
    sectionTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    categoryButton: {
      backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
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
      backgroundColor: isDarkMode ? '#333' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      borderColor: isDarkMode ? '#444' : '#ddd',
    },
    submitButton: {
      backgroundColor: isDarkMode ? '#4b46f1' : '#4b46f1',
    },
    submitButtonText: {
      color: '#fff',
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color={isDarkMode ? '#fff' : '#4b46f1'} />
        </TouchableOpacity>
        <Text style={[styles.title, dynamicStyles.title]}>Phản hồi</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Chọn danh mục</Text>
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

        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Nội dung phản hồi</Text>
        <TextInput
          style={[styles.input, dynamicStyles.input]}
          multiline
          numberOfLines={6}
          placeholder="Nhập nội dung phản hồi của bạn..."
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
        <Text style={[styles.submitButtonText, dynamicStyles.submitButtonText]}>Gửi phản hồi</Text>
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
