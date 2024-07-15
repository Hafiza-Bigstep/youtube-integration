import { param } from 'express-validator';
import { SwaggerDefinitionConstant } from 'swagger-express-ts';

export default {
  create: {
    path: '/',
    description: 'Create Permission',
    summary: 'Create Permission',
    parameters: {
      body: {
        properties: {
          name: { type: SwaggerDefinitionConstant.STRING },
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
    description: 'Update Permission',
    summary: 'Update Permission',
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
    parameters: {
      path: {
        id: {
          type: SwaggerDefinitionConstant.STRING,
          description: 'User ID',
        },
      },
    },
    summary: 'Delete Permossion',
    responses: {
      200: {
        description: 'Success',
      },
    },
  },
};
