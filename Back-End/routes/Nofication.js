const fp = require('fastify-plugin');
const {
  getNotificationsSchema,
  markAsReadSchema,
  markAllAsReadSchema,
} = require('../Schema/notificationSchema'); // Import schema

module.exports = fp(async function (fastify, opts) {
  const notificationsCollection = fastify.mongo.db.collection('notifications');
  const usersCollection = fastify.mongo.db.collection('users');

  // Lấy danh sách thông báo
  fastify.get('/notifications', {
    preValidation: [fastify.authenticate],
    schema: getNotificationsSchema,
  }, async (req, reply) => {
    const notifications = await notificationsCollection
      .find({ username: req.user.username })
      .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo mới nhất
      .toArray();
    reply.send(notifications);
  });

  // Đánh dấu thông báo đã đọc
  fastify.post('/notifications/mark-as-read', {
    preValidation: [fastify.authenticate],
    schema: markAsReadSchema,
  }, async (req, reply) => {
    const { notificationId } = req.body;

    const result = await notificationsCollection.updateOne(
      { username: req.user.username, notificationId },
      { $set: { isRead: true } }
    );

    if (result.matchedCount === 0) {
      return reply.code(404).send({ msg: 'Notification not found' });
    }

    reply.send({ msg: 'Notification marked as read' });
  });

  // Đánh dấu tất cả thông báo đã đọc
  fastify.post('/notifications/mark-all-as-read', {
    preValidation: [fastify.authenticate],
    schema: markAllAsReadSchema,
  }, async (req, reply) => {
    await notificationsCollection.updateMany(
      { username: req.user.username, isRead: false },
      { $set: { isRead: true } }
    );

    reply.send({ msg: 'All notifications marked as read' });
  });
});