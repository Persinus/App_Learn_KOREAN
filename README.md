# 🇰🇷 App Learn Korean

An interactive Korean learning app built using Expo (React Native) for the frontend and Fastify for the backend.

<div align="center">
  <img src="./assets/logo.png" alt="App Icon" width="180" />
</div>

🎥 Demo video: [Watch on YouTube](https://youtu.be/FxwFww0zoiA)  
📦 APK Download: Check the `App-Learn-Korean.apk` file in this repository.

---

## ✨ Features

- 🔐 User registration and login
- 👥 Friend list and friend request system
- 🏆 Achievements and daily missions
- 🧠 Vocabulary mini-games
- 🎨 Clean and modern UI using React Native
- ⚛️ State management with Redux
- 🌗 Dark mode support

---

## 📂 Repository Structure & Main Files

Below are the main files and their purposes:

| File/Folder                              | Description                                                                                   |
|-------------------------------------------|-----------------------------------------------------------------------------------------------|
| **App.js**                               | Entry point of the app. Sets up Redux, navigation, and dark mode support.                     |
| **index.js**                             | Registers the root component for Expo.                                                        |
| **/Navigation/AppNavigator.js**           | Main bottom tab navigator, handles navigation between Home, Practice, Rankings, etc.           |
| **/Navigation/HomeStack.js**              | Stack navigator for Home and related screens.                                                 |
| **/Navigation/PracticeStackNavigator.js** | Stack navigator for Practice screens (mini games, video, lessons, etc.).                      |
| **/Navigation/SettingStack.js**           | Stack navigator for Settings and related screens.                                             |
| **/Navigation/FriendStack.js**            | Stack navigator for Friend features (friend list, chat, user detail).                         |
| **/Screens/SplashScreen.js**              | Splash/loading screen with animation and auto navigation.                                     |
| **/Screens/Home/HomeScreen.js**           | Main dashboard: greeting, progress, quick access to lessons, missions, achievements, etc.     |
| **/Screens/Home/DailyMission.js**         | Shows daily missions and progress.                                                            |
| **/Screens/Home/Achievement.js**          | Shows a preview of user achievements.                                                         |
| **/Screens/Home/allAchievement.js**       | Lists all achievements with details.                                                          |
| **/Screens/Home/allDailyMission.js**      | Lists all daily missions with details.                                                        |
| **/Screens/Home/DailyReward.js**          | Daily login reward calendar and claim logic.                                                  |
| **/Screens/Practice/PracticeScreen.js**   | Entry for practice features: mini games, video, dictionary, etc.                              |
| **/Screens/Practice/Game/MiniGame1.js**   | Vocabulary mini-game with reward/feedback modals and dark mode.                               |
| **/Screens/Practice/VideoListScreen.js**  | Lists available videos for learning (music, movies).                                          |
| **/Screens/Practice/VideoDetailScreen.js**| Video player with subtitle and vocabulary features.                                           |
| **/Screens/Setting/SettingsScreen.js**    | User settings: dark mode, language, profile, feedback, etc.                                   |
| **/Screens/Setting/EditInfoUser.js**      | Edit user profile information.                                                                |
| **/Screens/Setting/ChangePasswordScreen.js** | Change user password.                                                                     |
| **/Screens/Setting/UserFeedback.js**      | Submit feedback and rate the app.                                                             |
| **/Screens/Setting/InfoApp.js**           | App information and features overview.                                                        |
| **/Screens/Friend/FriendScreen.js**       | Friend management: add, accept, list, chat.                                                   |
| **/Screens/Friend/ChatRealtime.js**       | Real-time chat between users using socket.io.                                                 |
| **/Screens/Friend/UserDetail.js**         | View detailed information of a user.                                                          |
| **/Screens/KoreanBasics/AlphabetHomeScreen.js** | Entry to alphabet and vocabulary learning.                                              |
| **/Screens/KoreanBasics/VocabularyTopicsScreen.js** | List of vocabulary topics.                                                           |
| **/Screens/KoreanBasics/BasicKoreanLessonsScreen.js** | List of basic Korean lessons.                                                        |
| **/Screens/KoreanBasics/LessonDetailScreen.js** | Lesson details: vocabulary, grammar, practice, etc.                                     |
| **/Screens/Rankings/RankingsScreen.js**   | User rankings and leaderboard.                                                               |
| **/Screens/PaidCourses/PaidCoursesScreen.js** | List of paid courses.                                                                  |
| **/Screens/PaidCourses/PaidCoursesDetail.js** | Course detail and purchase.                                                            |
| **/Screens/PaidCourses/JoinCourse.js**    | Join and track progress in a paid course.                                                    |
| **/Screens/PaidCourses/LinkingPaid.js**   | Payment method selection and processing.                                                     |
| **/Store/Store.js**                       | Redux store setup and reducers.                                                              |
| **/Util/Baseapi.js**                      | Base URL for backend API.                                                                    |
| **/Util/UserStorage.js**                  | AsyncStorage helpers for username.                                                           |
| **/assets/**                              | App images, logos, card data, subtitles, etc.                                                |
| **/Test/data/**                           | Data for alphabet learning (consonants, vowels, etc.).                                       |
| **package.json**                          | Project dependencies and scripts.                                                            |
| **app.json**                              | Expo app configuration.                                                                      |
| **.gitignore**                            | Files/folders to ignore in git.                                                              |

> Backend using Fastify is referenced but not included in this repository.

---

## 🚀 Getting Started

Make sure you have Node.js and Expo CLI installed.

1. Install Expo CLI:

    ```bash
    npm install -g expo-cli
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the app:

    ```bash
    expo start
    ```

You can test the app using the **Expo Go** mobile app or an Android/iOS emulator.

---

## 🛠️ Tech Stack

- **React Native** with Expo
- **Redux** for state management
- **Fastify** for backend APIs

---

## 📚 References

- 📘 [Expo Documentation](https://docs.expo.dev/)
- 📘 [React Native Documentation](https://reactnative.dev/docs/getting-started)
- 📘 [Fastify Documentation](https://www.fastify.io/docs/latest/)

---

## 📦 Assets & APK

Demo APK: Included as [`/App-Learn-Korean.apk`](./App-Learn-Korean.apk) in this repo.

---

## 🤝 Credits

Developed by **Persinus** and contributors.  
Feel free to fork, contribute, or give feedback!


