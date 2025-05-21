import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import headerStyles from '../../Styles/HeaderStyles';

const paymentMethods = [
  {
    id: 'momo',
    name: { vn: 'MoMo', en: 'MoMo' },
    icon: '🟣',
    placeholder: { vn: 'Số điện thoại MoMo', en: 'MoMo Phone Number' },
  },
  {
    id: 'bank',
    name: { vn: 'Chuyển khoản ngân hàng', en: 'Bank Transfer' },
    icon: '🏦',
    placeholder: { vn: 'Số tài khoản ngân hàng', en: 'Bank Account Number' },
  },
  {
    id: 'card',
    name: { vn: 'Thẻ tín dụng/ghi nợ', en: 'Credit/Debit Card' },
    icon: '💳',
    placeholder: { vn: 'Số thẻ', en: 'Card Number' },
  },
];

const LinkingPaid = ({ route, navigation }) => {
  const { course } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState('');
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  const translations = {
    vn: {
      payment: 'Thanh toán',
      selectMethod: 'Chọn phương thức thanh toán',
      payNow: 'Thanh toán ngay',
      alertTitle: 'Thông báo',
      alertMessage: 'Vui lòng chọn phương thức thanh toán',
      alertInfo: 'Vui lòng nhập thông tin thanh toán',
      confirmTitle: 'Xác nhận thanh toán',
      confirmMessage: 'Bạn có chắc chắn muốn thanh toán {price} qua {method}?',
      successTitle: 'Thành công',
      successMessage: 'Thanh toán thành công! Bạn đã mua khóa học.',
      goToCourse: 'Vào học ngay',
    },
    en: {
      payment: 'Payment',
      selectMethod: 'Select Payment Method',
      payNow: 'Pay Now',
      alertTitle: 'Notice',
      alertMessage: 'Please select a payment method',
      alertInfo: 'Please enter payment information',
      confirmTitle: 'Confirm Payment',
      confirmMessage: 'Are you sure you want to pay {price} via {method}?',
      successTitle: 'Success',
      successMessage: 'Payment successful! You have purchased the course.',
      goToCourse: 'Go to Course',
    },
  };

  const t = translations[language];

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f8f9fa',
    },
    courseInfo: {
      backgroundColor: isDarkMode ? '#232323' : '#f8f4ff',
    },
    courseName: {
      color: isDarkMode ? '#fff' : '#333',
    },
    coursePrice: {
      color: isDarkMode ? '#FFD700' : '#6a0dad',
    },
    sectionTitle: {
      color: isDarkMode ? '#fff' : '#333',
    },
    methodItem: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderColor: isDarkMode ? '#4b46f1' : '#ddd',
    },
    selectedMethod: {
      backgroundColor: isDarkMode ? '#4b46f1' : '#f0e6ff',
      borderColor: isDarkMode ? '#FFD700' : '#6a0dad',
    },
    methodName: {
      color: isDarkMode ? '#fff' : '#333',
    },
    input: {
      backgroundColor: isDarkMode ? '#333' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      borderColor: isDarkMode ? '#444' : '#ddd',
    },
    inputLabel: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    payButton: {
      backgroundColor: isDarkMode ? '#FFD700' : '#6a0dad',
    },
    payButtonText: {
      color: isDarkMode ? '#000' : '#fff',
    },
  };

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert(t.alertTitle, t.alertMessage);
      return;
    }
    if (!paymentInfo.trim()) {
      Alert.alert(t.alertTitle, t.alertInfo);
      return;
    }

    Alert.alert(
      t.confirmTitle,
      t.confirmMessage.replace('{price}', course.price).replace('{method}', selectedMethod.name[language]),
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert(
              t.successTitle,
              t.successMessage,
              [
                {
                  text: t.goToCourse,
                  onPress: () => navigation.navigate('JoinCourse', { course }),
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
     

      <ScrollView style={styles.content}>
        <View style={[styles.courseInfo, dynamicStyles.courseInfo]}>
          <Image source={{ uri: course.image }} style={styles.courseImage} />
          <View style={styles.courseDetails}>
            <Text style={[styles.courseName, dynamicStyles.courseName]}>{course.name}</Text>
            <Text style={[styles.coursePrice, dynamicStyles.coursePrice]}>{course.price}</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{t.selectMethod}</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodItem,
              dynamicStyles.methodItem,
              selectedMethod?.id === method.id && dynamicStyles.selectedMethod,
            ]}
            onPress={() => setSelectedMethod(method)}
          >
            <Text style={styles.methodIcon}>{method.icon}</Text>
            <Text style={[styles.methodName, dynamicStyles.methodName]}>{method.name[language]}</Text>
          </TouchableOpacity>
        ))}

        {selectedMethod && (
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, dynamicStyles.inputLabel]}>{selectedMethod.placeholder[language]}</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={paymentInfo}
              onChangeText={setPaymentInfo}
              placeholder={selectedMethod.placeholder[language]}
              placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
            />
          </View>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={[styles.payButton, dynamicStyles.payButton]}
        onPress={handlePayment}
      >
        <Text style={[styles.payButtonText, dynamicStyles.payButtonText]}>{t.payNow}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  courseInfo: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  courseDetails: {
    marginLeft: 16,
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedMethod: {
    borderWidth: 1,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodName: {
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 24,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  payButton: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LinkingPaid;
