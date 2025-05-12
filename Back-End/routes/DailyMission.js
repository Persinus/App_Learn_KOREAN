const fp = require('fastify-plugin');
const {
  getDailyMissionsSchema,
  completeMissionSchema,
  claimMissionSchema,
} = require('../Schema/DailymissionSchema'); // Import schema

module.exports = fp(async function (fastify, opts) {
  const missionsCollection = fastify.mongo.db.collection('dailyMissions');
  const usersCollection = fastify.mongo.db.collection('users');

  // Lấy danh sách nhiệm vụ hàng ngày
  fastify.get('/daily-missions', { schema: getDailyMissionsSchema }, async (req, reply) => {
    const missions = await missionsCollection.find().toArray();
    reply.send(missions);
  });

  // Đánh dấu hoàn thành nhiệm vụ
  fastify.post('/daily-missions/:id/complete', {
    preValidation: [fastify.authenticate],
    schema: completeMissionSchema,
  }, async (req, reply) => {
    const { id } = req.params;

    const user = await usersCollection.findOne({ username: req.user.username });
    if (!user) return reply.code(404).send({ msg: 'User not found' });

    const mission = await missionsCollection.findOne({ missionId: id });
    if (!mission) return reply.code(404).send({ msg: 'Mission not found' });

    const isCompleted = user.dailyMissions?.find(m => m.missionId === id)?.isCompleted;
    if (isCompleted) return reply.code(400).send({ msg: 'Mission already completed' });

    // Đánh dấu nhiệm vụ là đã hoàn thành
    await usersCollection.updateOne(
      { username: req.user.username },
      { $push: { dailyMissions: { missionId: id, isCompleted: true, isClaimed: false } } }
    );

    reply.send({ msg: 'Mission marked as completed' });
  });

  // Nhận phần thưởng nhiệm vụ
  fastify.post('/daily-missions/:id/claim', {
    preValidation: [fastify.authenticate],
    schema: claimMissionSchema,
  }, async (req, reply) => {
    const { id } = req.params;

    const user = await usersCollection.findOne({ username: req.user.username });
    if (!user) return reply.code(404).send({ msg: 'User not found' });

    const mission = await missionsCollection.findOne({ missionId: id });
    if (!mission) return reply.code(404).send({ msg: 'Mission not found' });

    const userMission = user.dailyMissions?.find(m => m.missionId === id);
    if (!userMission || userMission.isClaimed) {
      return reply.code(400).send({ msg: 'Mission already claimed or not completed' });
    }

    // Đánh dấu nhiệm vụ là đã nhận phần thưởng
    await usersCollection.updateOne(
      { username: req.user.username, 'dailyMissions.missionId': id },
      { $set: { 'dailyMissions.$.isClaimed': true } }
    );

    reply.send({ msg: 'Reward claimed successfully', reward: mission.reward });
  });
});