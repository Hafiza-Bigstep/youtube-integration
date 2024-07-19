import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  BaseHttpController,
} from 'inversify-express-utils';

import { YoutubeService } from '../services/youtube.service';
import { TYPES } from '../types';
import { ValidationMiddleware } from '../../../shared/middlewares/validator.middleware';
import { searchQueryValidation } from '../validators/index.chain';

@controller('/youtube')
export class YoutubeController extends BaseHttpController {
  private youtubeService: YoutubeService;

  constructor(
    @inject(TYPES.YoutubeService)
    youtubeService: YoutubeService
  ) {
    super();
    this.youtubeService = youtubeService;
  }

  @httpGet('/search', ValidationMiddleware.validate(searchQueryValidation))
  public async search(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.youtubeService.searchVideos(req);
      return res.send(result).status(200);
    } catch (error) {
      next(error);
    }
  }
}
