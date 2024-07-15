/* eslint-disable no-unused-vars */
// src/types/express.d.ts

import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // Add your custom property here
  }
}
