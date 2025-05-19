// React와 React Native의 모듈을 불러옵니다.
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Card 컴포넌트를 정의합니다.
const Card = ({ title, content, image, onPress }) => {
  return (
    // 카드 전체를 TouchableOpacity로 감싸 클릭 가능하게 만듭니다.
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* 이미지가 있을 경우에만 출력되도록 조건부 렌더링 */}
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {/* 카드의 텍스트와 콘텐츠를 담는 영역 */}
      <View style={styles.content}>
        {/* 카드 제목을 출력 */}
        <Text style={styles.title}>{title}</Text>
        {/* 카드 설명을 출력 */}
        <Text style={styles.description}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  // 카드 전체 스타일
  card: {
    borderWidth: 1, // 테두리 두께
    borderColor: "#ddd", // 테두리 색상
    borderRadius: 8, // 모서리 둥글게 처리
    overflow: "hidden", // 경계선을 넘는 콘텐츠 숨김
    margin: 10, // 카드 간격
    width: 300, // 카드 폭
    shadowColor: "#000", // 그림자 색상
    shadowOpacity: 0.1, // 그림자 투명도
    shadowRadius: 8, // 그림자 크기
    elevation: 2, // 안드로이드에서의 그림자 높이
    backgroundColor: "#fff", // 배경색 흰색
  },
  // 카드 이미지 스타일
  image: {
    width: "100%", // 이미지의 너비를 카드에 맞춤
    height: 150, // 이미지 높이 설정
    resizeMode: "cover", // 이미지의 크기를 유지하며 카드에 맞춤
  },
  // 콘텐츠 영역 스타일
  content: {
    padding: 16, // 콘텐츠 내부 여백
  },
  // 제목 텍스트 스타일
  title: {
    fontSize: 18, // 글자 크기
    fontWeight: "bold", // 글자 굵기
    color: "#333", // 글자 색상
    marginBottom: 8, // 아래 간격
  },
  // 설명 텍스트 스타일
  description: {
    fontSize: 14, // 글자 크기
    color: "#555", // 글자 색상
  },
});

// Card 컴포넌트를 내보냅니다.
export default Card;
