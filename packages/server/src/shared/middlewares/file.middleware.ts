import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import multer, { FileFilterCallback } from 'multer';

// Define constants
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const allowedImageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/svg+xml',
];

@injectable()
export class FileUploadMiddleware extends BaseMiddleware {
  constructor() {
    super();
  }

  async handler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const upload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: MAX_FILE_SIZE_BYTES },
      fileFilter: (req, file, cb: FileFilterCallback) => {
        if (allowedImageMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new Error(
              'Invalid file type. Only JPEG, PNG, GIF, and SVG files are allowed.'
            )
          );
        }
      },
    });

    return upload.single('file')(req, res, next);
  }
}
