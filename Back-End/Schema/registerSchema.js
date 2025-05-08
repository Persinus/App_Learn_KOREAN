// registerSchema.js
const registerSchema = {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      email: { type: 'string', format: 'email' },
      avatarUrl: { type: 'string', format: 'uri', nullable: true }
    },
    required: ['username', 'password'],
  };
  
  module.exports = registerSchema;
  