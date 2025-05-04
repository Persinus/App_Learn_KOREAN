// loginSchema.js
const loginSchema = {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['username', 'password']
  };
  
  module.exports = loginSchema;
  