import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import headerStyles from '../../Styles/HeaderStyles';

const PaidCoursesDetail = ({ route, navigation }) => {
  const { course } = route.params;
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      backgroundColor: isDarkMode ? '#0099FF' : '#f8f9fa', // Nền xanh cho Dark Mode
    },
    infoSection: {
      backgroundColor: isDarkMode ? '#6666FF' : '#fff',
      shadowColor: isDarkMode ? '#000' : '#000',
    },
    courseName: {
      color: isDarkMode ? '#fff' : '#333',
    },
    courseTeacher: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    ratingText: {
      color: isDarkMode ? '#FFD700' : '#ff9800',
    },
    priceText: {
      color: isDarkMode ? '#FFD700' : '#6a0dad',
    },
    sectionTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    description: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    contentItem: {
      color: isDarkMode ? '#fff' : '#444',
    },
    footer: {
      backgroundColor: isDarkMode ? '#444' : '#fff',
      borderTopColor: isDarkMode ? '#333' : '#eee',
    },
    purchaseButton: {
      backgroundColor: isDarkMode ? '#FFD700' : '#6a0dad',
    },
    purchaseButtonText: {
      color: isDarkMode ? '#000' : '#fff',
    },
  };

  const handlePurchase = () => {
    Alert.alert(
      'Xác nhận mua khóa học',
      `Bạn có chắc chắn muốn mua khóa học "${course.name}" với giá ${course.price}?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Tiếp tục',
          onPress: () => {
            navigation.navigate('LinkingPaid', { course });
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={headerStyles.container}>
        <View style={headerStyles.headerRow}>
          <TouchableOpacity 
            style={headerStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={headerStyles.title}>Chi tiết khóa học</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Image source={{ uri: course.cover }} style={styles.coverImage} />
        
        <View style={[styles.infoSection, dynamicStyles.infoSection]}>
          <Image source={{ uri: course.image }} style={styles.teacherImage} />
          <View style={styles.courseInfo}>
            <Text style={[styles.courseName, dynamicStyles.courseName]}>{course.name}</Text>
            <Text style={[styles.courseTeacher, dynamicStyles.courseTeacher]}>👨‍🏫 {course.teacher}</Text>
            <View style={styles.ratingContainer}>
              <Text style={[styles.ratingText, dynamicStyles.ratingText]}>⭐ {course.rating}/5</Text>
              <Text style={[styles.priceText, dynamicStyles.priceText]}>💰 {course.price}</Text>
            </View>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Mô tả khóa học</Text>
          <Text style={[styles.description, dynamicStyles.description]}>{course.description}</Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Nội dung bao gồm</Text>
          {[
            '✓ 50+ bài học video',
            '✓ Tài liệu PDF đầy đủ',
            '✓ Bài tập tương tác',
            '✓ Chứng chỉ hoàn thành',
            '✓ Hỗ trợ trực tuyến 24/7'
          ].map((item, index) => (
            <Text key={index} style={[styles.contentItem, dynamicStyles.contentItem]}>{item}</Text>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, dynamicStyles.footer]}>
        <TouchableOpacity 
          style={[styles.purchaseButton, dynamicStyles.purchaseButton]}
          onPress={handlePurchase}
        >
          <Text style={[styles.purchaseButtonText, dynamicStyles.purchaseButtonText]}>Mua khóa học</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoSection: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  teacherImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseTeacher: {
    fontSize: 16,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginRight: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionSection: {
    padding: 16,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  contentSection: {
    padding: 16,
  },
  contentItem: {
    fontSize: 15,
    marginBottom: 8,
    lineHeight: 22,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  purchaseButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaidCoursesDetail;
