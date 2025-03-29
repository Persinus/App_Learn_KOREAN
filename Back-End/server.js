require('dotenv').config();
const Fastify = require('fastify');
const mongoose = require('mongoose');
const fastifyMongoose = require('@fastify/mongoose');

const fastify = Fastify({ logger: true });

// Kết nối Mongoose
fastify.register(fastifyMongoose, {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase', // URI MongoDB của bạn
    settings: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
});

// Tạo Schema và Model ví dụ
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Định nghĩa API
fastify.post('/users', async (request, reply) => {
    try {
        const { name, email, password } = request.body;

        const user = new User({ name, email, password });
        await user.save();

        reply.code(201).send({ message: 'User created successfully', user });
    } catch (error) {
        reply.code(500).send({ error: error.message });
    }
});

fastify.get('/users', async (request, reply) => {
    try {
        const users = await User.find();
        reply.send(users);
    } catch (error) {
        reply.code(500).send({ error: error.message });
    }
});

// Khởi chạy server
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server is running at ${address}`);
});
