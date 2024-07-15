import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { AuthStrategyTypes, AuthStrategy } from 'auth-strategies';

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  private authStrategy: AuthStrategy;

  constructor(
    @inject(AuthStrategyTypes.AuthStrategy) authStrategy: AuthStrategy
  ) {
    super();
    this.authStrategy = authStrategy;
  }

  async handler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.authStrategy.authenticate(req, res);
      next();
    } catch (error) {
      next(error);
    }
  }
}
