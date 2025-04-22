import * as Notifications from 'expo-notifications';

export const sendPushNotification = async (title, body) => {
  try {
    const permission = await Notifications.requestPermissionsAsync();
    if (!permission.granted) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        priority: 'high',
      },
      trigger: null, // Show immediately
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
