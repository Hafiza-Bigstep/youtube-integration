/* eslint-disable no-undef */
import 'reflect-metadata';
import * as winston from 'winston';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { mainContainer } from './modules';
import { config } from 'dotenv';
import { MiddlewareConfig } from './shared/middlewares/middlewareConfig';
import * as swagger from 'swagger-express-ts';

import { errorMiddleware } from './shared/middlewares/error.middleware';
import { SwaggerDefinitionConstant } from 'swagger-express-ts';

import { CONFIG } from './config';

/** Load Envrionment Variables form .env file */
config();

/** Server */
const server = new InversifyExpressServer(mainContainer);
server
  .setErrorConfig(app => {
    app.use(errorMiddleware);
  })
  .setConfig(app => {
    app.use('/api-docs', express.static('packages/server/swagger'));
    app.use(bodyParser.json());
    MiddlewareConfig.init(app);
    app.use(
      swagger.express({
        definition: {
          info: {
            title: 'Boilerplate API',
            version: '1.0',
          },
          externalDocs: {
            url: 'https://localhost:3001',
          },
          securityDefinitions: {
            apiKeyHeader: {
              type: SwaggerDefinitionConstant.Security.Type.API_KEY,
              in: SwaggerDefinitionConstant.Security.In.HEADER,
              name: 'Authorization',
            },
          },
          // Models can be defined here
        },
      })
    );
  });

const app = server.build();

app
  .listen(CONFIG.PORT, () =>
    console.log(`The server is running on port ${CONFIG.PORT}`)
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      console.log('server startup error: address already in use');
    } else {
      console.log(error);
    }
  });
process.on('beforeExit', function (err) {
  winston.error(JSON.stringify(err));
  console.error(err);
});
