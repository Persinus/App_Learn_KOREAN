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
    <View style={styles.container}>
      <View style={headerStyles.container}>
        <View style={headerStyles.headerRow}>
          <TouchableOpacity 
            style={headerStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={headerStyles.title}>Thanh toán</Text>
          <View style={{width: 40}} />
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.courseInfo}>
          <Image source={{ uri: course.image }} style={styles.courseImage} />
          <View style={styles.courseDetails}>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.coursePrice}>{course.price}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Chọn phương thức thanh toán</Text>
        {paymentMethods.map(method => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodItem,
              selectedMethod?.id === method.id && styles.selectedMethod
            ]}
            onPress={() => setSelectedMethod(method)}
          >
            <Text style={styles.methodIcon}>{method.icon}</Text>
            <Text style={styles.methodName}>{method.name}</Text>
          </TouchableOpacity>
        ))}

        {selectedMethod && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{selectedMethod.placeholder}</Text>
            <TextInput
              style={styles.input}
              value={paymentInfo}
              onChangeText={setPaymentInfo}
              placeholder={`Nhập ${selectedMethod.placeholder.toLowerCase()}`}
            />
          </View>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={styles.payButton}
        onPress={handlePayment}
      >
        <Text style={styles.payButtonText}>Thanh toán ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 16
  },
  courseInfo: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f8f4ff',
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
    color: '#333',
    marginBottom: 4
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a0dad'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedMethod: {
    backgroundColor: '#f0e6ff',
    borderColor: '#6a0dad',
    borderWidth: 1
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12
  },
  methodName: {
    fontSize: 16,
    color: '#333'
  },
  inputContainer: {
    marginTop: 24
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  payButton: {
    backgroundColor: '#6a0dad',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default LinkingPaid;
