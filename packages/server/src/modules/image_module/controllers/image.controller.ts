import { Request } from '../../../types';
import { inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import path from 'path';
import {
  controller,
  httpGet,
  BaseHttpController,
  interfaces,
  httpPost,
} from 'inversify-express-utils';

import { LogTypes, LoggerFactory } from 'logger';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import imageValidator from '../validators/index.chain';
import openAPI from './image.openapi';
import { ApiOperationGet, ApiOperationPost, ApiPath } from 'swagger-express-ts';

const { AWS_REGION, S3_BUCKET, ASSETS_URL } = process.env;

AWS.config.update({ region: AWS_REGION });

@ApiPath({
  path: '/upload',
  name: 'Assets',
  security: { basicAuth: [] },
})
@controller('/upload')
export class ImageController
  extends BaseHttpController
  implements interfaces.Controller
{
  private logger;
  private s3: AWS.S3;

  constructor(@inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory) {
    super();
    this.logger = loggerFactory.createLogger('ImageController');
    this.s3 = new AWS.S3();
  }

  /**
   * Info
   * @param req
   * @param res
   * @returns
   */
  @ApiOperationGet(openAPI.info)
  @httpGet('/info')
  public async info() {
    this.logger.info('Image module is working!');
    return this.json({ message: 'Image module is working!' }, 200);
  }

  @ApiOperationPost(openAPI.uploadImage)
  @httpPost(
    '/images',
    'BearerAuthMiddleware',
    'FileUploadMiddleware',
    ValidationMiddleware.validate(imageValidator.updateImage)
  )
  public async update(req: Request & { file: any }) {
    if (req.file) {
      console.log('file', req.file);
    }
    const file = req['file'];
    if (!file) {
      this.json({ message: 'Please upload a file' }, 400);
      return;
    }

    const filePrefix =
      (req.body.s3_image_path as string) ||
      `public/assets/images/${req.user.id}`;
    const customPath = `${filePrefix}/${Date.now().toString()}-${uuidv4()}${path.extname(
      file.originalname
    )}`;

    console.log('customPath', customPath);

    try {
      const s3Params: AWS.S3.PutObjectRequest = {
        Bucket: S3_BUCKET,
        Key: customPath,
        Body: file.buffer,
      };

      await this.s3.upload(s3Params).promise();
      const fileUrl = `${ASSETS_URL}/${customPath}`;
      console.log('try upload', fileUrl);

      this.json({ message: 'File uploaded successfully', fileUrl }, 200);
    } catch (error) {
      console.error(error);
      this.json({ message: 'Failed to upload file' }, 500);
    }
  }

  @ApiOperationPost(openAPI.uploadFile)
  @httpPost(
    '/files/',
    'BearerAuthMiddleware',
    'FileUploadMiddleware',
    ValidationMiddleware.validate(imageValidator.updateFile)
  )
  public async updateFiles(req: Request) {
    const file = req.body.file;
    if (!file) {
      this.json({ message: 'Please upload a file' }, 400);
      return;
    }

    const filePrefix =
      (req.body.s3_image_path as string) ||
      `public/assets/files/${req.user.id}`;
    const customPath = `${filePrefix}/${Date.now().toString()}-${uuidv4()}${path.extname(
      file.originalname
    )}`;

    try {
      const s3Params: AWS.S3.PutObjectRequest = {
        Bucket: S3_BUCKET,
        Key: customPath,
        Body: file.buffer,
      };

      await this.s3.upload(s3Params).promise();
      const fileUrl = `${ASSETS_URL}/${customPath}`;

      this.json({ message: 'File uploaded successfully', fileUrl }, 200);
    } catch (error) {
      console.error(error);
      this.json({ message: 'Failed to upload file' }, 500);
    }
  }
}
