const fp = require('fastify-plugin');
const {
  createLessonSchema,
  getLessonsSchema,
  getLessonByIdSchema,
  updateLessonSchema,
  deleteLessonSchema,
} = require('../Schema/lessonSchema'); // Import schema

module.exports = fp(async function (fastify, opts) {
  const collection = fastify.mongo.db.collection('lessons');

  // Tạo bài học mới
  fastify.post('/lessons', { schema: createLessonSchema }, async (req, reply) => {
    const lesson = req.body;

    const existing = await collection.findOne({ lessonId: lesson.lessonId });
    if (existing) return reply.code(400).send({ msg: 'Lesson ID already exists' });

    await collection.insertOne(lesson);
    reply.send({ msg: 'Lesson created successfully' });
  });

  // Lấy danh sách tất cả bài học
  fastify.get('/lessons', { schema: getLessonsSchema }, async (req, reply) => {
    const lessons = await collection.find().toArray();
    reply.send(lessons);
  });

  // Lấy chi tiết bài học theo ID
  fastify.get('/lessons/:lessonId', { schema: getLessonByIdSchema }, async (req, reply) => {
    const { lessonId } = req.params;
    const lesson = await collection.findOne({ lessonId });
    if (!lesson) return reply.code(404).send({ msg: 'Lesson not found' });

    reply.send(lesson);
  });

  // Cập nhật bài học
  fastify.put('/lessons/:lessonId', { schema: updateLessonSchema }, async (req, reply) => {
    const { lessonId } = req.params;
    const updates = req.body;

    const result = await collection.updateOne({ lessonId }, { $set: updates });
    if (result.matchedCount === 0) return reply.code(404).send({ msg: 'Lesson not found' });

    reply.send({ msg: 'Lesson updated successfully' });
  });

  // Xóa bài học
  fastify.delete('/lessons/:lessonId', { schema: deleteLessonSchema }, async (req, reply) => {
    const { lessonId } = req.params;

    const result = await collection.deleteOne({ lessonId });
    if (result.deletedCount === 0) return reply.code(404).send({ msg: 'Lesson not found' });

    reply.send({ msg: 'Lesson deleted successfully' });
  });
});