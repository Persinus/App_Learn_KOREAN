require('dotenv').config();
const path = require('path');
const fastify = require('fastify')({ logger: true });

// Đăng ký các plugin
fastify.register(require('@fastify/cors'), { origin: '*' });
fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: process.env.MONGO_URL
});
fastify.register(require('@fastify/jwt'), {
  secret: process.env.JWT_SECRET
});
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/', // Truy cập ảnh qua /uploads/...
});

// Đăng ký routes
fastify.register(require('./routes/auth'), { prefix: '/auth' });

const PORT = process.env.PORT || 3000;
fastify.listen({ port: PORT }, (err) => {
  if (err) throw err;
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
