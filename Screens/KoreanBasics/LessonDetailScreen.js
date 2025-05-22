import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useSelector } from 'react-redux';
import headerStyles from '../../Styles/HeaderStyles';

const LessonDetailScreen = ({ route, navigation }) => {
  const { lesson } = route.params;
  const [activeSection, setActiveSection] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const language = useSelector((state) => state.language.language);

  // Đa ngôn ngữ
  const translations = {
    vn: {
      introduction: 'Giới thiệu',
      vocabulary: 'Từ vựng',
      grammar: 'Ngữ pháp',
      practice: 'Luyện tập',
      conversation: 'Hội thoại',
      quiz: 'Kiểm tra',
      lessonGoal: 'Mục tiêu bài học:',
      practiceConversation: 'Luyện tập hội thoại',
      startQuiz: 'Bắt đầu kiểm tra',
    },
    en: {
      introduction: 'Introduction',
      vocabulary: 'Vocabulary',
      grammar: 'Grammar',
      practice: 'Practice',
      conversation: 'Conversation',
      quiz: 'Quiz',
      lessonGoal: 'Lesson goals:',
      practiceConversation: 'Practice conversation',
      startQuiz: 'Start quiz',
    }
  };
  const t = translations[language] || translations.vn;

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
    },
    tabContainer: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      borderBottomColor: isDarkMode ? '#333' : '#e3e7fd',
      borderBottomWidth: 1,
    },
    tabButton: {
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    activeTabButton: {
      borderBottomWidth: 2,
      borderBottomColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    tabText: {
      marginLeft: 8,
      fontWeight: '500',
      color: isDarkMode ? '#ccc' : '#666',
    },
    activeTabText: {
      fontWeight: 'bold',
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    content: {
      flex: 1,
      padding: 16,
      backgroundColor: isDarkMode ? '#121212' : '#f4f7ff',
    },
    sectionContainer: {
      borderRadius: 16,
      padding: 18,
      backgroundColor: isDarkMode ? '#232323' : '#fff',
      elevation: 4,
      borderWidth: 1.5,
      borderColor: isDarkMode ? '#FFD70033' : '#e3e7fd',
      shadowColor: isDarkMode ? '#000' : '#4b46f1',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDarkMode ? 0.1 : 0.08,
      shadowRadius: 8,
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: 18,
      marginLeft: 8,
      color: isDarkMode ? '#fff' : '#4b46f1',
      fontWeight: 'bold',
    },
    sectionText: {
      fontSize: 15,
      lineHeight: 22,
      color: isDarkMode ? '#ccc' : '#444',
    },
    goalTitle: {
      fontSize: 16,
      marginTop: 16,
      marginBottom: 8,
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      fontWeight: 'bold',
    },
    goalText: {
      fontSize: 15,
      color: isDarkMode ? '#ccc' : '#444',
      flex: 1,
    },
    vocabularyItem: {
      marginBottom: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333' : '#e3e7fd',
    },
    koreanWord: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#4b46f1',
    },
    pronunciation: {
      fontSize: 14,
      marginTop: 4,
      color: isDarkMode ? '#FFD700' : '#666',
    },
    meaning: {
      fontSize: 16,
      marginTop: 4,
      fontWeight: '500',
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    exampleContainer: {
      marginTop: 8,
      padding: 8,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#202124' : '#e6f0ff',
    },
    exampleKorean: {
      fontSize: 15,
      color: isDarkMode ? '#fff' : '#333',
    },
    exampleTranslation: {
      fontSize: 14,
      fontStyle: 'italic',
      marginTop: 4,
      color: isDarkMode ? '#ccc' : '#666',
    },
    grammarPattern: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 8,
      borderRadius: 8,
      color: isDarkMode ? '#FFD700' : '#4b46f1',
      backgroundColor: isDarkMode ? '#232323' : '#e6f0ff',
    },
    grammarExplanation: {
      fontSize: 15,
      marginVertical: 8,
      lineHeight: 22,
      color: isDarkMode ? '#ccc' : '#444',
    },
    grammarExample: {
      padding: 8,
      borderRadius: 8,
      marginBottom: 8,
      backgroundColor: isDarkMode ? '#202124' : '#f9f9f9',
    },
    grammarKorean: {
      fontSize: 15,
      color: isDarkMode ? '#fff' : '#333',
    },
    grammarTranslation: {
      fontSize: 14,
      fontStyle: 'italic',
      marginTop: 4,
      color: isDarkMode ? '#ccc' : '#666',
    },
    practiceItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      backgroundColor: isDarkMode ? '#202124' : '#e6f0ff',
    },
    practiceName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#4b46f1',
    },
    practiceDescription: {
      fontSize: 14,
      marginTop: 2,
      color: isDarkMode ? '#ccc' : '#666',
    },
    dialogueTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 12,
      color: isDarkMode ? '#fff' : '#4b46f1',
    },
    speakerName: {
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 4,
      color: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    dialogueTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#232323' : '#e6f0ff',
    },
    dialogueText: {
      fontSize: 15,
      flex: 1,
      color: isDarkMode ? '#fff' : '#333',
    },
    dialogueTranslation: {
      fontSize: 14,
      fontStyle: 'italic',
      marginTop: 4,
      marginLeft: 8,
      color: isDarkMode ? '#ccc' : '#666',
    },
    conversationPracticeButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12,
      borderRadius: 8,
      marginTop: 16,
      backgroundColor: isDarkMode ? '#FFD700' : '#4b46f1',
    },
    conversationPracticeText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#000' : '#fff',
    },
    quizDescription: {
      fontSize: 15,
      lineHeight: 22,
      marginBottom: 16,
      color: isDarkMode ? '#ccc' : '#444',
    },
    quizButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 14,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#FFD700' : '#4CAF50',
    },
    quizButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#000' : '#fff',
    },
  };

  // Dữ liệu ví dụ - trong ứng dụng thật, dữ liệu này sẽ được lấy từ API hoặc cơ sở dữ liệu
  const lessonContent = {
    introduction: {
      title: "Giới thiệu bài học",
      content: "Trong bài học này, bạn sẽ học cách chào hỏi và giới thiệu bản thân trong tiếng Hàn. Đây là những kỹ năng cơ bản và thiết yếu để bắt đầu giao tiếp.",
      goals: [
        "Biết cách chào hỏi trong các tình huống khác nhau",
        "Có thể tự giới thiệu bản thân bằng tiếng Hàn",
        "Nắm vững mẫu câu cơ bản \"저는 ... 입니다\" (Tôi là ...)"
      ]
    },
    vocabulary: [
      { word: "안녕하세요", pronunciation: "annyeonghaseyo", meaning: "Xin chào (kính ngữ)", example: "안녕하세요, 처음 뵙겠습니다.", exampleTranslation: "Xin chào, rất vui được gặp bạn." },
      { word: "안녕", pronunciation: "annyeong", meaning: "Chào (thân mật)", example: "안녕, 잘 지냈어?", exampleTranslation: "Chào, dạo này bạn thế nào?" },
      { word: "저는", pronunciation: "jeoneun", meaning: "Tôi (chủ ngữ)", example: "저는 베트남 사람입니다.", exampleTranslation: "Tôi là người Việt Nam." },
      { word: "이름", pronunciation: "ireum", meaning: "Tên", example: "제 이름은 민호예요.", exampleTranslation: "Tên tôi là Minho." },
      { word: "만나서 반갑습니다", pronunciation: "mannaseo bangapseumnida", meaning: "Rất vui được gặp bạn", example: "만나서 반갑습니다. 잘 부탁드립니다.", exampleTranslation: "Rất vui được gặp bạn. Mong được giúp đỡ." }
    ],
    grammar: {
      title: "Ngữ pháp cơ bản",
      points: [
        {
          pattern: "저는 ... 입니다/예요 (Tôi là ...)",
          explanation: "Đây là mẫu câu cơ bản để giới thiệu bản thân. Sử dụng 입니다 trong văn viết hoặc tình huống trang trọng, và 예요 trong giao tiếp hàng ngày.",
          examples: [
            { korean: "저는 학생입니다.", translation: "Tôi là học sinh." },
            { korean: "저는 선생님이에요.", translation: "Tôi là giáo viên." }
          ]
        },
        {
          pattern: "저는 ... 에서 왔어요 (Tôi đến từ ...)",
          explanation: "Dùng để nói về nơi bạn đến. 에서 là trợ từ chỉ nơi xuất phát.",
          examples: [
            { korean: "저는 베트남에서 왔어요.", translation: "Tôi đến từ Việt Nam." },
            { korean: "저는 하노이에서 왔어요.", translation: "Tôi đến từ Hà Nội." }
          ]
        }
      ]
    },
    practice: {
      title: "Luyện tập",
      types: [
        { 
          name: "Flashcard từ vựng", 
          description: "Ôn tập các từ vựng của bài học",
          screen: "VocabularyFlashcardScreen"
        },
        { 
          name: "Trắc nghiệm",
          description: "Kiểm tra kiến thức bằng câu hỏi trắc nghiệm", 
          screen: "QuizScreen"
        },
        { 
          name: "Nối từ - nghĩa",
          description: "Luyện tập bằng cách nối từ vựng với nghĩa tương ứng",
          screen: "MatchingScreen"
        },
        { 
          name: "Viết lại từ",
          description: "Luyện tập viết lại các từ vựng đã học", 
          screen: "WritingPracticeScreen"
        }
      ]
    },
    conversation: {
      title: "Hội thoại mẫu",
      dialogues: [
        {
          title: "Giới thiệu khi gặp người mới",
          speakers: [
            { name: "민호 (Minho)", text: "안녕하세요. 저는 민호입니다. 만나서 반갑습니다.", translation: "Xin chào. Tôi là Minho. Rất vui được gặp bạn." },
            { name: "지연 (Jiyeon)", text: "안녕하세요, 민호 씨. 저는 지연이에요. 저는 한국 사람이에요. 민호 씨는 어디에서 왔어요?", translation: "Xin chào, Minho. Tôi là Jiyeon. Tôi là người Hàn Quốc. Minho đến từ đâu?" },
            { name: "민호 (Minho)", text: "저는 베트남에서 왔어요. 지금 한국어를 공부하고 있어요.", translation: "Tôi đến từ Việt Nam. Hiện tại tôi đang học tiếng Hàn." },
            { name: "지연 (Jiyeon)", text: "아, 그래요? 베트남어를 가르쳐 주세요!", translation: "Ồ, vậy sao? Hãy dạy tôi tiếng Việt nhé!" }
          ]
        }
      ]
    },
    quiz: {
      title: "Kiểm tra",
      description: "Hãy kiểm tra kiến thức của bạn với 5 câu hỏi tổng hợp từ bài học này.",
      screen: "LessonQuizScreen"
    }
  };

  // Danh sách các section trong bài học
  const sections = [
    { id: 'introduction', title: t.introduction, icon: 'info-circle' },
    { id: 'vocabulary', title: t.vocabulary, icon: 'book' },
    { id: 'grammar', title: t.grammar, icon: 'paragraph' },
    { id: 'practice', title: t.practice, icon: 'pencil-alt' },
    { id: 'conversation', title: t.conversation, icon: 'comments' },
    { id: 'quiz', title: t.quiz, icon: 'question-circle' },
  ];

  // Hàm phát âm từ vựng
  const speakWord = (text) => {
    if (speaking) return;
    
    setSpeaking(true);
    Speech.speak(text, {
      language: 'ko',
      rate: 0.75,
      onDone: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  // Hiển thị phần giới thiệu
  const renderIntroduction = () => (
    <View style={[styles.sectionContainer, dynamicStyles.sectionContainer]}>
      <Text style={[styles.sectionText, dynamicStyles.sectionText]}>{lessonContent.introduction.content}</Text>
      
      <Text style={[styles.goalTitle, dynamicStyles.goalTitle]}>{t.lessonGoal}</Text>
      {lessonContent.introduction.goals.map((goal, index) => (
        <View key={index} style={styles.goalItem}>
          <FontAwesome5 name="check-circle" size={16} color="#4CAF50" style={styles.goalIcon} />
          <Text style={[styles.goalText, dynamicStyles.goalText]}>{goal}</Text>
        </View>
      ))}
    </View>
  );

  // Hiển thị phần từ vựng
  const renderVocabulary = () => (
    <View style={[styles.sectionContainer, dynamicStyles.sectionContainer]}>
      {lessonContent.vocabulary.map((item, index) => (
        <View key={index} style={[styles.vocabularyItem, dynamicStyles.vocabularyItem]}>
          <TouchableOpacity 
            style={styles.vocabularyHeader}
            onPress={() => speakWord(item.word)}
          >
            <Text style={[styles.koreanWord, dynamicStyles.koreanWord]}>{item.word}</Text>
            <FontAwesome5 
              name={speaking ? "volume-up" : "volume"} 
              size={16} 
              color="#4b46f1" 
            />
          </TouchableOpacity>
          
          <Text style={[styles.pronunciation, dynamicStyles.pronunciation]}>[{item.pronunciation}]</Text>
          <Text style={[styles.meaning, dynamicStyles.meaning]}>{item.meaning}</Text>
          
          <View style={[styles.exampleContainer, dynamicStyles.exampleContainer]}>
            <Text style={[styles.exampleKorean, dynamicStyles.exampleKorean]}>{item.example}</Text>
            <Text style={[styles.exampleTranslation, dynamicStyles.exampleTranslation]}>{item.exampleTranslation}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  // Hiển thị phần ngữ pháp
  const renderGrammar = () => (
    <View style={[styles.sectionContainer, dynamicStyles.sectionContainer]}>
      {lessonContent.grammar.points.map((point, index) => (
        <View key={index} style={styles.grammarPoint}>
          <Text style={[styles.grammarPattern, dynamicStyles.grammarPattern]}>{point.pattern}</Text>
          <Text style={[styles.grammarExplanation, dynamicStyles.grammarExplanation]}>{point.explanation}</Text>
          
          <View style={styles.examplesContainer}>
            {point.examples.map((example, i) => (
              <View key={i} style={[styles.grammarExample, dynamicStyles.grammarExample]}>
                <Text style={[styles.grammarKorean, dynamicStyles.grammarKorean]}>{example.korean}</Text>
                <Text style={[styles.grammarTranslation, dynamicStyles.grammarTranslation]}>{example.translation}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );

  // Hiển thị phần luyện tập
  const renderPractice = () => (
    <View style={[styles.sectionContainer, dynamicStyles.sectionContainer]}>
      {lessonContent.practice.types.map((practice, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.practiceItem, dynamicStyles.practiceItem]}
          onPress={() => navigation.navigate(practice.screen, { lessonId: lesson.id, type: practice.name })}
        >
          <View style={styles.practiceContent}>
            <Text style={[styles.practiceName, dynamicStyles.practiceName]}>{practice.name}</Text>
            <Text style={[styles.practiceDescription, dynamicStyles.practiceDescription]}>{practice.description}</Text>
          </View>
          <FontAwesome5 name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
      ))}
    </View>
  );

  // Hiển thị phần hội thoại
  const renderConversation = () => (
    <View style={[styles.sectionContainer, dynamicStyles.sectionContainer]}>
      {lessonContent.conversation.dialogues.map((dialogue, index) => (
        <View key={index} style={styles.dialogue}>
          <Text style={[styles.dialogueTitle, dynamicStyles.dialogueTitle]}>{dialogue.title}</Text>
          
          {dialogue.speakers.map((speaker, i) => (
            <View key={i} style={styles.dialogueLine}>
              <Text style={[styles.speakerName, dynamicStyles.speakerName]}>{speaker.name}:</Text>
              <TouchableOpacity 
                style={[styles.dialogueTextContainer, dynamicStyles.dialogueTextContainer]}
                onPress={() => speakWord(speaker.text)}
              >
                <Text style={[styles.dialogueText, dynamicStyles.dialogueText]}>{speaker.text}</Text>
                <FontAwesome5 name="volume" size={12} color="#4b46f1" style={styles.volumeIcon} />
              </TouchableOpacity>
              <Text style={[styles.dialogueTranslation, dynamicStyles.dialogueTranslation]}>{speaker.translation}</Text>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity 
        style={[styles.conversationPracticeButton, dynamicStyles.conversationPracticeButton]}
        onPress={() => navigation.navigate('ConversationPracticeScreen', { lessonId: lesson.id })}
      >
        <Text style={[styles.conversationPracticeText, dynamicStyles.conversationPracticeText]}>{t.practiceConversation}</Text>
        <FontAwesome5 name="microphone" size={16} color="#fff" style={{marginLeft: 8}} />
      </TouchableOpacity>
    </View>
  );

  // Hiển thị phần kiểm tra
  const renderQuiz = () => (
    <View style={[styles.sectionContainer, dynamicStyles.sectionContainer]}>
      <Text style={[styles.quizDescription, dynamicStyles.quizDescription]}>{lessonContent.quiz.description}</Text>
      
      <TouchableOpacity 
        style={[styles.quizButton, dynamicStyles.quizButton]}
        onPress={() => navigation.navigate(lessonContent.quiz.screen, { lessonId: lesson.id })}
      >
        <Text style={[styles.quizButtonText, dynamicStyles.quizButtonText]}>{t.startQuiz}</Text>
        <FontAwesome5 name="play" size={16} color="#fff" style={{marginLeft: 8}} />
      </TouchableOpacity>
    </View>
  );

  // Hàm render nội dung của section hiện tại
  const renderSectionContent = () => {
    switch(sections[activeSection].id) {
      case 'introduction': return renderIntroduction();
      case 'vocabulary': return renderVocabulary();
      case 'grammar': return renderGrammar();
      case 'practice': return renderPractice();
      case 'conversation': return renderConversation();
      case 'quiz': return renderQuiz();
      default: return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      

      <View style={[styles.tabContainer, dynamicStyles.tabContainer]}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {sections.map((section, index) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.tabButton,
                dynamicStyles.tabButton,
                activeSection === index && [styles.activeTabButton, dynamicStyles.activeTabButton]
              ]}
              onPress={() => setActiveSection(index)}
            >
              <FontAwesome5 
                name={section.icon} 
                size={16} 
                color={activeSection === index ? "#4b46f1" : "#666"} 
              />
              <Text 
                style={[
                  styles.tabText,
                  dynamicStyles.tabText,
                  activeSection === index && [styles.activeTabText, dynamicStyles.activeTabText]
                ]}
              >
                {section.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={[styles.content, dynamicStyles.content]}>
        <View style={styles.sectionHeader}>
          <FontAwesome5 name={sections[activeSection].icon} size={18} color="#4b46f1" />
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>{sections[activeSection].title}</Text>
        </View>
        
        {renderSectionContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    borderBottomWidth: 1,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
  },
  tabText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginLeft: 8,
  },
  sectionContainer: {
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  goalTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  goalIcon: {
    marginRight: 8,
    marginTop: 3,
  },
  goalText: {
    fontSize: 15,
    flex: 1,
  },
  vocabularyItem: {
    marginBottom: 20,
    paddingBottom: 16,
  },
  vocabularyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  koreanWord: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pronunciation: {
    fontSize: 14,
    marginTop: 4,
  },
  meaning: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
  },
  exampleContainer: {
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
  },
  exampleKorean: {
    fontSize: 15,
  },
  exampleTranslation: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  grammarPoint: {
    marginBottom: 24,
  },
  grammarPattern: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 8,
  },
  grammarExplanation: {
    fontSize: 15,
    marginVertical: 8,
    lineHeight: 22,
  },
  examplesContainer: {
    marginTop: 8,
  },
  grammarExample: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  grammarKorean: {
    fontSize: 15,
  },
  grammarTranslation: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  practiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  practiceContent: {
    flex: 1,
  },
  practiceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  practiceDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  dialogue: {
    marginBottom: 20,
  },
  dialogueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dialogueLine: {
    marginBottom: 12,
  },
  speakerName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dialogueTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  dialogueText: {
    fontSize: 15,
    flex: 1,
  },
  volumeIcon: {
    marginLeft: 8,
  },
  dialogueTranslation: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
    marginLeft: 8,
  },
  conversationPracticeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  conversationPracticeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  quizButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
  },
  quizButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LessonDetailScreen;
