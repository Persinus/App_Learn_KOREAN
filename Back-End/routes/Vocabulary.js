const fp = require('fastify-plugin');
const {
  getVocabularySchema,
  getVocabularyByCategorySchema,
  searchVocabularySchema,
} = require('../Schema/VocabularySchema'); // Import schema

module.exports = fp(async function (fastify, opts) {
  const collection = fastify.mongo.db.collection('vocabulary');

  // Lấy danh sách từ vựng
  fastify.get('/vocabulary', { schema: getVocabularySchema }, async (req, reply) => {
    const vocabulary = await collection.find().toArray();
    reply.send(vocabulary);
  });

  // Lấy từ vựng theo chủ đề
  fastify.get('/vocabulary/category/:category', { schema: getVocabularyByCategorySchema }, async (req, reply) => {
    const { category } = req.params;
    const vocabulary = await collection.find({ category }).toArray();
    reply.send(vocabulary);
  });

  // Tìm kiếm từ vựng
  fastify.get('/vocabulary/search', { schema: searchVocabularySchema }, async (req, reply) => {
    const { q } = req.query;
    const vocabulary = await collection
      .find({ word: { $regex: q, $options: 'i' } }) // Tìm kiếm từ vựng không phân biệt hoa thường
      .toArray();
    reply.send(vocabulary);
  });
});