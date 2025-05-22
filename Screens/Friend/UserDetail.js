import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BASE_API_URL from '../../Util/Baseapi';

const DEFAULT_AVATAR = "https://i.pinimg.com/474x/e7/37/61/e73761b05e3921a209960b591787aa9c.jpg";

const UserDetail = ({ route }) => {
  const { username } = route.params;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const isDarkMode = useSelector(state => state.darkMode.isDarkMode);

  const dynamicStyles = {
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 24,
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
    },
    avatar: {
      width: 110,
      height: 110,
      borderRadius: 55,
      marginBottom: 18,
      borderWidth: 3,
      borderColor: isDarkMode ? '#FFD700' : '#4b46f1',
      backgroundColor: isDarkMode ? '#232323' : '#e3e7fd',
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      shadowOpacity: isDarkMode ? 0.10 : 0.13,
      shadowRadius: 8,
      elevation: 3,
    },
    username: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 8,
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    email: {
      fontSize: 16,
      color: isDarkMode ? '#B3B3B3' : '#666',
      marginBottom: 8,
    },
    info: {
      fontSize: 15,
      marginBottom: 4,
      color: isDarkMode ? '#fff' : '#222',
    },
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}users/profile`, {
          params: { username },
          headers: { Accept: 'application/json' }
        });
        setProfile(data.user);
      } catch (error) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  if (loading) return <ActivityIndicator style={{ marginTop: 32 }} />;
  if (!profile) return <Text style={{ textAlign: 'center', marginTop: 32 }}>Không tìm thấy thông tin.</Text>;

  return (
    <View style={dynamicStyles.container}>
      <Image
        source={
          profile.avatar && typeof profile.avatar === 'string' && profile.avatar.trim() !== '' ? { uri: profile.avatar } : { uri: DEFAULT_AVATAR }
        }
        style={dynamicStyles.avatar}
      />
      <Text style={dynamicStyles.username}>{profile.username}</Text>
      <Text style={dynamicStyles.email}>{profile.email}</Text>
      <Text style={dynamicStyles.info}>Tên: {profile.fullName && profile.fullName.trim() !== '' ? profile.fullName : 'Chưa cập nhật'}</Text>
      <Text style={dynamicStyles.info}>Giới tính: {profile.gender && profile.gender.trim() !== '' ? profile.gender : 'Chưa cập nhật'}</Text>
      <Text style={dynamicStyles.info}>Ngày sinh: {profile.birthday && profile.birthday.trim() !== '' ? profile.birthday : 'Chưa cập nhật'}</Text>
    </View>
  );
};

export default UserDetail;