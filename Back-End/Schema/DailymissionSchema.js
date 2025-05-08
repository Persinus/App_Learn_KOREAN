// Schema cho lấy danh sách nhiệm vụ hàng ngày
const getDailyMissionsSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          missionId: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          reward: { type: 'object', additionalProperties: true },
          requirement: { type: 'object', additionalProperties: true },
          expiryDate: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};

// Schema cho đánh dấu hoàn thành nhiệm vụ
const completeMissionSchema = {
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
      },
    },
  },
};

// Schema cho nhận phần thưởng nhiệm vụ
const claimMissionSchema = {
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
  getDailyMissionsSchema,
  completeMissionSchema,
  claimMissionSchema,
};