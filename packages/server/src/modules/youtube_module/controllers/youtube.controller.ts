import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  BaseHttpController,
} from 'inversify-express-utils';

import { YoutubeService } from '../services/youtube.service';
import { TYPES } from '../types';
import { LogTypes, LoggerFactory } from 'logger';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import { searchQueryValidation } from '../validators/index.chain';

@controller('/youtube')
export class YoutubeController extends BaseHttpController {
  private youtubeService: YoutubeService;
  private logger;

  constructor(
    @inject(TYPES.YoutubeService)
    youtubeService: YoutubeService,
    @inject(LogTypes.LoggerFactory) loggerFactory: LoggerFactory
  ) {
    super();
    this.youtubeService = youtubeService;
    this.logger = loggerFactory.createLogger('YoutubeController');
  }

  @httpGet('/search', ValidationMiddleware.validate(searchQueryValidation))
  public async search(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.youtubeService.searchVideos(req);
      return this.json(result, 200);
    } catch (error) {
      next(error);
    }
  }
}
