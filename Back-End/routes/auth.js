const bcrypt = require('bcrypt');
const fp = require('fastify-plugin');
const path = require('path');
const multer = require('fastify-multer');
const registerSchema = require('../Schema/registerSchema'); // Đảm bảo đúng đường dẫn
const loginSchema = require('../Schema/loginSchema'); // Đảm bảo đúng đường dẫn

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

module.exports = fp(async function (fastify, opts) {
  // Middleware xác thực JWT
  fastify.decorate("authenticate", async function (req, reply) {
    try {
      await req.jwtVerify();
    } catch (err) {
      reply.code(401).send({ msg: 'Invalid token' });
    }
  });
  // Lấy collection 'users' từ MongoDB
  const collection = fastify.mongo.db.collection('users');  // Thêm dòng này
  // Đăng ký
  fastify.post('/register', { schema: registerSchema }, async (req, reply) => {
    const { username, password, email, avatarUrl } = req.body;
    
    const existing = await collection.findOne({ username });
    if (existing) return reply.code(400).send({ msg: 'Username already exists' });
  
    const hashed = await bcrypt.hash(password, 10);
  
    const newUser = {
      username,
      email: email || '',
      password: hashed,
      avatar: avatarUrl || '/uploads/default-avatar.png',
      score: 0,
      gold: 0,
      diamond: 0,
      lessons: [],
      level: 1,
      experience: 0,
      dailyStreak: 0,
      lastLogin: new Date(),
      achievements: [],
    };
  
    await collection.insertOne(newUser);
    reply.send({ msg: 'Registration successful' });
  });

  // Đăng nhập
  fastify.post('/login', { schema: loginSchema }, async (req, reply) => {
    const { username, password } = req.body;
  
    const user = await collection.findOne({ username });
    if (!user) return reply.code(400).send({ msg: 'Invalid credentials' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return reply.code(400).send({ msg: 'Invalid credentials' });
  
    // Tạo JWT chứa thông tin người dùng
    const token = fastify.jwt.sign({ username, role: user.role || 'user' });
  
    // Cập nhật thời gian đăng nhập cuối
    await collection.updateOne(
      { username },
      { $set: { lastLogin: new Date() } }
    );
  
    // Gửi JWT về client
    reply.send({ token });
  });

  // Upload avatar
  fastify.post('/upload-avatar', {
    preValidation: [fastify.authenticate],
    preHandler: upload.single('avatar'),
  }, async (req, reply) => {
    const filePath = '/' + req.file.path.replace(/\\/g, '/');
    await collection.updateOne(
      { username: req.user.username },
      { $set: { avatar: filePath } }
    );
    reply.send({ msg: 'Avatar uploaded and updated', avatar: filePath });
  });

  // Lấy profile
  fastify.get('/profile', {
    preValidation: [fastify.authenticate],
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                username: { type: 'string' },
                email: { type: 'string' },
                avatar: { type: 'string' },
                score: { type: 'number' },
                gold: { type: 'number' },
                diamond: { type: 'number' },
                lessons: { type: 'array', items: { type: 'string' } },
                level: { type: 'number' },
                experience: { type: 'number' },
                dailyStreak: { type: 'number' },
                lastLogin: { type: 'string', format: 'date-time' },
                achievements: { type: 'array', items: { type: 'string' } },
              },
            },
          },
        },
      },
    },
  }, async (req, reply) => {
    const user = await collection.findOne(
      { username: req.user.username },
      { projection: { password: 0 } } // Loại bỏ trường password
    );
    reply.send({ user });
  });
   
  // Đăng xuất
  fastify.post('/logout', { preValidation: [fastify.authenticate] }, async (req, reply) => {
    reply.send({ msg: 'Logged out' });
  });

  // Cập nhật profile
  fastify.put('/update-profile', {
    preValidation: [fastify.authenticate],
    schema: {
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', nullable: true },
          avatar: { type: 'string', nullable: true },
          score: { type: 'number', nullable: true },
          gold: { type: 'number', nullable: true },
          diamond: { type: 'number', nullable: true },
        },
      },
    },
  }, async (req, reply) => {
    const updates = req.body;

    await collection.updateOne(
      { username: req.user.username },
      { $set: updates }
    );

    const token = fastify.jwt.sign({ username: req.user.username });
    reply.send({ msg: 'Profile updated successfully', token });
  });
});


