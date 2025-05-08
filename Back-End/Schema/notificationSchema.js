// Schema cho lấy danh sách thông báo
const getNotificationsSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          notificationId: { type: 'string' },
          title: { type: 'string' },
          message: { type: 'string' },
          isRead: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};

// Schema cho đánh dấu thông báo đã đọc
const markAsReadSchema = {
  body: {
    type: 'object',
    required: ['notificationId'],
    properties: {
      notificationId: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        msg: { type: 'string' },
      },
    },
  },
};

// Schema cho đánh dấu tất cả thông báo đã đọc
const markAllAsReadSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        msg: { type: 'string' },
      },
    },
  },
};

module.exports = {
  getNotificationsSchema,
  markAsReadSchema,
  markAllAsReadSchema,
};