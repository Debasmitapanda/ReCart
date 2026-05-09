// backend/src/services/notificationService.js
import Notification from '../models/Notification.js';

export const sendNotification = async (userId, message, type = 'System') => {
  const notification = await Notification.create({ user: userId, message, type });
  // TODO: Integrate with Socket.io or Firebase to push real-time alerts
  return notification;
};
