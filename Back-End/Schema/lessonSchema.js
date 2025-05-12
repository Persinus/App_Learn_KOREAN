// Schema cho tạo bài học mới
const createLessonSchema = {
  body: {
    type: 'object',
    required: ['lessonId', 'title', 'description', 'category', 'level', 'content', 'exercises', 'isPremium'],
    properties: {
      lessonId: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string' },
      category: { type: 'string' },
      level: { type: 'number' },
      content: { type: 'array', items: { type: 'string' } },
      exercises: { type: 'array', items: { type: 'string' } },
      isPremium: { type: 'boolean' },
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

// Schema cho lấy danh sách bài học
const getLessonsSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          lessonId: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          category: { type: 'string' },
          level: { type: 'number' },
          content: { type: 'array', items: { type: 'string' } },
          exercises: { type: 'array', items: { type: 'string' } },
          isPremium: { type: 'boolean' },
        },
      },
    },
  },
};

// Schema cho lấy bài học theo ID
const getLessonByIdSchema = {
  params: {
    type: 'object',
    properties: {
      lessonId: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        lessonId: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        category: { type: 'string' },
        level: { type: 'number' },
        content: { type: 'array', items: { type: 'string' } },
        exercises: { type: 'array', items: { type: 'string' } },
        isPremium: { type: 'boolean' },
      },
    },
  },
};

// Schema cho cập nhật bài học
const updateLessonSchema = {
  params: {
    type: 'object',
    properties: {
      lessonId: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      category: { type: 'string' },
      level: { type: 'number' },
      content: { type: 'array', items: { type: 'string' } },
      exercises: { type: 'array', items: { type: 'string' } },
      isPremium: { type: 'boolean' },
    },
  },
};

// Schema cho xóa bài học
const deleteLessonSchema = {
  params: {
    type: 'object',
    properties: {
      lessonId: { type: 'string' },
    },
  },
};

module.exports = {
  createLessonSchema,
  getLessonsSchema,
  getLessonByIdSchema,
  updateLessonSchema,
  deleteLessonSchema,
};