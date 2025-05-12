const fastify = require('fastify')();
const fp = require('fastify-plugin');
const loginSchema = require('../Schema/courseSchema'); // Đảm bảo đúng đường dẫn

module.exports = fp(async (fastify, opts) => {
  const coursesCollection = fastify.mongo.db.collection('courses');

  // Route để lấy thông tin khóa học
  fastify.get('/courses/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: courseSchema,
      },
    },
  }, async (req, reply) => {
    const courseId = req.params.id;
    const course = await coursesCollection.findOne({ _id: fastify.mongo.ObjectId(courseId) });

    if (!course) {
      return reply.code(404).send({ msg: 'Course not found' });
    }

    reply.send(course);
  });

  // Route để thêm khóa học mới
  fastify.post('/courses', {
    schema: {
      body: courseSchema,
    },
  }, async (req, reply) => {
    const { name, image, teacher, lessons } = req.body;

    const newCourse = {
      name,
      image,
      teacher,
      lessons,
    };

    const result = await coursesCollection.insertOne(newCourse);
    reply.code(201).send({ msg: 'Course created successfully', id: result.insertedId });
  });
});
const sampleCourses = [
  {
    name: 'Khóa học tiếng Hàn cơ bản',
    image: 'https://example.com/course-image.jpg',
    teacher: 'Giáo viên A',
    lessons: [
      {
        id: '1',
        title: { vn: 'Bài 1: Giới thiệu', en: 'Lesson 1: Introduction' },
        duration: { vn: '15 phút', en: '15 minutes' },
        isLocked: false,
        type: 'video',
      },
      {
        id: '2',
        title: { vn: 'Bài 2: Ngữ pháp cơ bản', en: 'Lesson 2: Basic Grammar' },
        duration: { vn: '25 phút', en: '25 minutes' },
        isLocked: false,
        type: 'lesson',
      },
      {
        id: '3',
        title: { vn: 'Bài 3: Luyện tập', en: 'Lesson 3: Practice' },
        duration: { vn: '20 phút', en: '20 minutes' },
        isLocked: true,
        type: 'exercise',
      },
    ],
  },
];

// Route để thêm khóa học mẫu
fastify.post('/courses/sample', async (req, reply) => {
  const result = await coursesCollection.insertMany(sampleCourses);
  reply.code(201).send({ msg: `${result.insertedCount} sample courses added successfully!` });
});