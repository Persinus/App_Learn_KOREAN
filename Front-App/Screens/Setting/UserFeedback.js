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

const UserFeedback = () => {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={16} color="#4b46f1" />
        </TouchableOpacity>
        <Text style={styles.title}>Phản hồi</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Chọn danh mục</Text>
        <View style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Nội dung phản hồi</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={6}
          placeholder="Nhập nội dung phản hồi của bạn..."
          value={feedback}
          onChangeText={setFeedback}
          textAlignVertical="top"
        />
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gửi phản hồi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 45,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
    backgroundColor: '#f5f5f5',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#4b46f1',
  },
  categoryText: {
    color: '#666',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 150,
    marginBottom: 24,
  },
  submitButton: {
    margin: 16,
    backgroundColor: '#4b46f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserFeedback;
