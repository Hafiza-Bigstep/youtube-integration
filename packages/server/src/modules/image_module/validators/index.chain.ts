import { check } from 'express-validator';

const MAX_FILE_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

const allowedImageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/svg+xml',
];

export const updateImage = [
  check('s3_image_path').optional().isString().trim(),
  check('file').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    if (req.file.size > MAX_FILE_IMAGE_SIZE_BYTES) {
      throw new Error('File size exceeds the limit of 5MB');
    }
    if (!allowedImageMimeTypes.includes(req.file.mimetype)) {
      throw new Error(
        'Invalid file type. Only JPEG, PNG, GIF, and SVG files are allowed.'
      );
    }
    return true;
  }),
];
export const updateFile = [
  check('s3_image_path').optional().isString().trim(),
  check('file').notEmpty(),
];

export default { updateImage, updateFile };
