import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const rankings = [
  { id: '1', name: 'Nguyễn Văn A', score: 1500, image: require('../../assets/avatar1.png') },
  { id: '2', name: 'Trần Thị B', score: 1400, image: require('../../assets/avatar2.png') },
  { id: '3', name: 'Lê Văn C', score: 800, image: require('../../assets/avatar3.png') },
  { id: '4', name: 'Phạm D', score: 300, image: require('../../assets/avatar4.png') },
];

const rankIcons = {
  S: require('../../assets/rank-s.png'),
  A: require('../../assets/rank-a.png'),
  B: require('../../assets/rank-b.png'),
  C: require('../../assets/rank-c.png'),
};

const getRank = (score) => {
  if (score >= 1500) return 'S';
  if (score >= 1000) return 'A';
  if (score >= 500) return 'B';
  return 'C';
};

const RankingsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderRankCard = ({ item, index }) => {
    const rank = getRank(item.score);
    return (
      <View style={styles.rankCard}>
        <Text style={styles.rank}>{index + 1}</Text>
        <Image source={item.image} style={styles.avatar} />
        <View style={styles.rankInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.score}>{item.score} điểm</Text>
        </View>
        <Image source={rankIcons[rank]} style={styles.rankIcon} />
      </View>
    );
  };

  const renderRankDetails = () => (
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chi tiết Xếp hạng</Text>
          {Object.keys(rankIcons).map((rank) => (
            <View key={rank} style={styles.rankDetailRow}>
              <Image source={rankIcons[rank]} style={styles.rankDetailIcon} />
              <Text style={styles.rankDetailText}>Hạng {rank}</Text>
              <Text style={styles.rankDetailPoints}>
                {rank === 'S' && '1500+'}
                {rank === 'A' && '1000 - 1499'}
                {rank === 'B' && '500 - 999'}
                {rank === 'C' && '0 - 499'}
              </Text>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color="#4b46f1" />
        </TouchableOpacity>
        <Text style={styles.header}>Bảng xếp hạng</Text>
      </View>

      <FlatList
        data={rankings}
        keyExtractor={(item) => item.id}
        renderItem={renderRankCard}
      />

      {renderRankDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoButton: {
    marginRight: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b46f1',
  },
  rankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b46f1',
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  rankInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  score: {
    fontSize: 16,
    color: '#333',
  },
  rankIcon: {
    width: 40,
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#4b46f1',
  },
  rankDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rankDetailIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  rankDetailText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  rankDetailPoints: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#4b46f1',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RankingsScreen;
