// Schema cho lấy danh sách tất cả thành tựu
const getAchievementsSchema = {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            achievementId: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            icon: { type: 'string' },
            reward: { type: 'object', additionalProperties: true },
            requirement: { type: 'object', additionalProperties: true },
          },
        },
      },
    },
  };
  
  // Schema cho lấy thành tựu của người dùng hiện tại
  const getUserAchievementsSchema = {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            achievementId: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            icon: { type: 'string' },
            reward: { type: 'object', additionalProperties: true },
            requirement: { type: 'object', additionalProperties: true },
            isClaimed: { type: 'boolean' },
          },
        },
      },
    },
  };
  
  // Schema cho nhận phần thưởng từ thành tựu
  const claimAchievementSchema = {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          msg: { type: 'string' },
          reward: { type: 'object', additionalProperties: true },
        },
      },
    },
  };
  
  module.exports = {
    getAchievementsSchema,
    getUserAchievementsSchema,
    claimAchievementSchema,
  };