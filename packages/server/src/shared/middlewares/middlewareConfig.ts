import express, { Application, NextFunction, Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';
export class MiddlewareConfig {
  static init(app: Application): void {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));

    /** Should Compress Data */
    app.use(compression());

    /** Helmet Security */
    app.use(helmet());

    /** RULES OF OUR API */
    app.use((req: Request, res: Response, next: NextFunction) => {
      // set the CORS policy
      res.header('Access-Control-Allow-Origin', '*');
      // set the CORS headers
      res.header(
        'Access-Control-Allow-Headers',
        'origin, X-Requested-With,Content-Type,Accept, Authorization'
      );
      // set the CORS method headers
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,PATCH,DELETE,POST,PUT');
        return res.status(200).json({});
      }
      return next();
    });
  }
}
