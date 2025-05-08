const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {
  const usersCollection = fastify.mongo.db.collection('users');
  const lessonsCollection = fastify.mongo.db.collection('lessons');
  const achievementsCollection = fastify.mongo.db.collection('achievements');
  const dailyMissionsCollection = fastify.mongo.db.collection('dailyMissions');

  // Lấy danh sách tất cả người dùng
  fastify.get('/users', {
    preValidation: [fastify.authenticate], // Xác thực JWT
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              email: { type: 'string' },
              avatar: { type: 'string' },
              lessons: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    lessonId: { type: 'string' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                  },
                },
              },
              achievements: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    achievementId: { type: 'string' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    isClaimed: { type: 'boolean' },
                  },
                },
              },
              dailyMissions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    missionId: { type: 'string' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    isCompleted: { type: 'boolean' },
                    isClaimed: { type: 'boolean' },
                  },
                },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const users = await usersCollection.find().toArray();

    // Populate dữ liệu từ các bảng liên quan
    const populatedUsers = await Promise.all(users.map(async (user) => {
      // Populate lessons
      const lessons = await lessonsCollection
        .find({ lessonId: { $in: user.lessons || [] } })
        .project({ lessonId: 1, title: 1, description: 1 })
        .toArray();

      // Populate achievements
      const achievements = await Promise.all(
        (user.achievements || []).map(async (achievement) => {
          const achievementData = await achievementsCollection.findOne(
            { achievementId: achievement.achievementId },
            { projection: { achievementId: 1, title: 1, description: 1 } }
          );
          return {
            ...achievementData,
            isClaimed: achievement.isClaimed,
          };
        })
      );

      // Populate daily missions
      const dailyMissions = await Promise.all(
        (user.dailyMissions || []).map(async (mission) => {
          const missionData = await dailyMissionsCollection.findOne(
            { missionId: mission.missionId },
            { projection: { missionId: 1, title: 1, description: 1 } }
          );
          return {
            ...missionData,
            isCompleted: mission.isCompleted,
            isClaimed: mission.isClaimed,
          };
        })
      );

      return {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        lessons,
        achievements,
        dailyMissions,
      };
    }));

    reply.send(populatedUsers);
  });
});