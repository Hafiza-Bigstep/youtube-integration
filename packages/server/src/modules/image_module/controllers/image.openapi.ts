export default {
  uploadImage: {
    path: '/images',
    description: 'Upload Image',
    consumes: ['multipart/form-data'],
    produces: ['application/json'],
    summary: 'Upload Image',
    parameters: {
      formData: {
        file: {
          type: 'file',
          description: 'Image File (Binary)',
          required: true,
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  },
  uploadFile: {
    path: '/files',
    description: 'Upload File',
    summary: 'Upload File',
    parameters: {
      formData: {
        file: {
          type: 'file',
          description: 'File (Binary)',
          required: true,
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  },
  info: {
    path: '/info',
    description: 'Check Image Module',
    summary: 'Check Image Module',
    responses: {
      200: {
        description: 'Success',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  },
};
