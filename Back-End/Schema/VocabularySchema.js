// Schema cho lấy danh sách từ vựng
const getVocabularySchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          word: { type: 'string' },
          pronunciation: { type: 'string' },
          meaning: { type: 'string' },
          example: { type: 'string' },
          category: { type: 'string' },
          level: { type: 'number' },
        },
      },
    },
  },
};

// Schema cho lấy từ vựng theo chủ đề
const getVocabularyByCategorySchema = {
  params: {
    type: 'object',
    properties: {
      category: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          word: { type: 'string' },
          pronunciation: { type: 'string' },
          meaning: { type: 'string' },
          example: { type: 'string' },
          category: { type: 'string' },
          level: { type: 'number' },
        },
      },
    },
  },
};

// Schema cho tìm kiếm từ vựng
const searchVocabularySchema = {
  querystring: {
    type: 'object',
    properties: {
      q: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          word: { type: 'string' },
          pronunciation: { type: 'string' },
          meaning: { type: 'string' },
          example: { type: 'string' },
          category: { type: 'string' },
          level: { type: 'number' },
        },
      },
    },
  },
};

module.exports = {
  getVocabularySchema,
  getVocabularyByCategorySchema,
  searchVocabularySchema,
};