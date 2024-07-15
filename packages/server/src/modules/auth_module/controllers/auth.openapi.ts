import { SwaggerDefinitionConstant } from 'swagger-express-ts';

export default {
  login: {
    path: '/login',
    description: 'Login User',
    summary: 'Login User',
    parameters: {
      body: {
        properties: {
          email: { type: SwaggerDefinitionConstant.STRING, required: true },
          password: { type: SwaggerDefinitionConstant.STRING, required: true },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
  register: {
    path: '/register',
    description: 'Register User',
    summary: 'Register User',
    parameters: {
      body: {
        properties: {
          firstname: { type: SwaggerDefinitionConstant.STRING, required: true },
          lastname: { type: SwaggerDefinitionConstant.STRING, required: true },
          email: { type: SwaggerDefinitionConstant.STRING, required: true },
          password: { type: SwaggerDefinitionConstant.STRING, required: true },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
  info: {
    path: '/info',
    description: 'Check Auth Module',
    summary: 'Check Auth Module',
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
};
