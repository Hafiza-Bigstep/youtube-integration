import { SwaggerDefinitionConstant } from 'swagger-express-ts';

export default {
  create: {
    path: '/',
    description: 'Create User',
    summary: 'Create User',
    parameters: {
      body: {
        properties: {
          firstname: { type: SwaggerDefinitionConstant.STRING },
          lastname: { type: SwaggerDefinitionConstant.STRING },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
  update: {
    path: '/{id}',
    description: 'Update User',
    summary: 'Update User',
    parameters: {
      path: {
        id: {
          type: SwaggerDefinitionConstant.STRING,
          description: 'User ID',
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
  getById: {
    path: '/{id}',
    description: 'Get Permossion ',
    summary: 'Get Permossion',
    parameters: {
      path: {
        id: {
          type: SwaggerDefinitionConstant.STRING,
          description: 'User ID',
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
  delete: {
    path: '/{id}',
    description: 'Delete Permossion ',
    summary: 'Delete Permossion',
    parameters: {
      path: {
        id: {
          type: SwaggerDefinitionConstant.STRING,
          description: 'User ID',
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
};
