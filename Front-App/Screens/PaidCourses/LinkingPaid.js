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
    name: 'MoMo',
    icon: '🟣',
    placeholder: 'Số điện thoại MoMo'
  },
  {
    id: 'bank',
    name: 'Chuyển khoản ngân hàng',
    icon: '🏦',
    placeholder: 'Số tài khoản ngân hàng'
  },
  {
    id: 'card',
    name: 'Thẻ tín dụng/ghi nợ',
    icon: '💳',
    placeholder: 'Số thẻ'
  }
];

const LinkingPaid = ({ route, navigation }) => {
  const { course } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState('');
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#0099FF' : '#f8f9fa', // Nền xanh cho Dark Mode
    },
    header: {
      backgroundColor: isDarkMode ? '#6666FF' : '#4b46f1', // Màu tím cho header
    },
    headerTitle: {
      color: isDarkMode ? '#fff' : '#fff',
    },
    courseInfo: {
      backgroundColor: isDarkMode ? '#6666FF' : '#f8f4ff', // Màu tím cho thông tin khóa học
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
      backgroundColor: isDarkMode ? '#444' : '#fff',
      borderColor: isDarkMode ? '#6666FF' : '#ddd',
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
      Alert.alert('Thông báo', 'Vui lòng chọn phương thức thanh toán');
      return;
    }
    if (!paymentInfo.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập thông tin thanh toán');
      return;
    }

    Alert.alert(
      'Xác nhận thanh toán',
      `Bạn có chắc chắn muốn thanh toán ${course.price} qua ${selectedMethod.name}?`,
      [
        {
          text: 'Hủy',
          style: 'cancel'
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            Alert.alert(
              'Thành công',
              'Thanh toán thành công! Bạn đã mua khóa học.',
              [
                {
                  text: 'Vào học ngay',
                  onPress: () => navigation.navigate('JoinCourse', { course })
                }
              ]
            );
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[headerStyles.container, dynamicStyles.header]}>
        <View style={headerStyles.headerRow}>
          <TouchableOpacity 
            style={headerStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={[headerStyles.title, dynamicStyles.headerTitle]}>Thanh toán</Text>
          <View style={{width: 40}} />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.courseInfo, dynamicStyles.courseInfo]}>
          <Image source={{ uri: course.image }} style={styles.courseImage} />
          <View style={styles.courseDetails}>
            <Text style={[styles.courseName, dynamicStyles.courseName]}>{course.name}</Text>
            <Text style={[styles.coursePrice, dynamicStyles.coursePrice]}>{course.price}</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Chọn phương thức thanh toán</Text>
        {paymentMethods.map(method => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodItem,
              dynamicStyles.methodItem,
              selectedMethod?.id === method.id && dynamicStyles.selectedMethod
            ]}
            onPress={() => setSelectedMethod(method)}
          >
            <Text style={styles.methodIcon}>{method.icon}</Text>
            <Text style={[styles.methodName, dynamicStyles.methodName]}>{method.name}</Text>
          </TouchableOpacity>
        ))}

        {selectedMethod && (
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, dynamicStyles.inputLabel]}>{selectedMethod.placeholder}</Text>
            <TextInput
              style={[styles.input, dynamicStyles.input]}
              value={paymentInfo}
              onChangeText={setPaymentInfo}
              placeholder={`Nhập ${selectedMethod.placeholder.toLowerCase()}`}
              placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
            />
          </View>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={[styles.payButton, dynamicStyles.payButton]}
        onPress={handlePayment}
      >
        <Text style={[styles.payButtonText, dynamicStyles.payButtonText]}>Thanh toán ngay</Text>
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
    padding: 16
  },
  courseInfo: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 8
  },
  courseDetails: {
    marginLeft: 16,
    flex: 1
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16
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
    borderWidth: 1
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12
  },
  methodName: {
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 24
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  payButton: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600'
  }
});

export default LinkingPaid;
