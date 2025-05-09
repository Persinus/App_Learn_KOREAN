// Schema cho Khóa Học
const courseSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    image: { type: 'string' },
    teacher: { type: 'string' },
    lessons: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'object' }, // Chứa title theo ngôn ngữ
          duration: { type: 'object' }, // Chứa duration theo ngôn ngữ
          isLocked: { type: 'boolean' },
          type: { type: 'string' },
        },
      },
    },
  },
  required: ['name', 'image', 'teacher', 'lessons'],
};