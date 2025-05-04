const bcrypt = require('bcrypt');
const fp = require('fastify-plugin');
const path = require('path');
const multer = require('fastify-multer');
const registerSchema = require('../registerSchema'); // Đảm bảo đúng đường dẫn
const loginSchema = require('../loginSchema'); // Đảm bảo đúng đường dẫn

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
    const avatar = avatarUrl || '/uploads/default-avatar.png';
  
    const newUser = {
      username,
      email: email || '',
      password: hashed,
      score: 0,
      gold: 0,
      diamond: 0,
      lessons: [],
      avatar: avatar,
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
  
    const token = fastify.jwt.sign({ username });
    reply.send({ token });
  });

  // Upload avatar
  fastify.post('/upload-avatar', {
    preValidation: [fastify.authenticate],
    preHandler: upload.single('avatar')
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
                score: { type: 'number' },
                gold: { type: 'number' },
                diamond: { type: 'number' },
                lessons: { type: 'array', items: { type: 'string' } },
                avatar: { type: 'string' },
              }
            }
          }
        }
      }
    }
  }, async (req, reply) => {
    const user = await collection.findOne(
      { username: req.user.username },
      { projection: { password: 0 } } // chỉ bỏ password đi
    );
    reply.send({ user });
  });
   
    // Đăng xuất
    fastify.post('/logout', { preValidation: [fastify.authenticate] }, async (req, reply) => {
        reply.send({ msg: 'Logged out' });
    });
});
    
   
    