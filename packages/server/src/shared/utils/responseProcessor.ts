/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { SuccessResponse } from './successResponse';
import { ApiError, BadRequestError } from './apiError';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const responseProcessor =
  (handler: AsyncFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next))
      .then((response: SuccessResponse) => {
        return res.status(response.statusCode).send(response);
      })
      .catch(error => {
        return errorResProcessor(error, res);
      });
  };

export const errorResProcessor = (error: Error, res: Response) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).send(error.toJson());
  }

  const badRequest = new BadRequestError(error.message, []);
  return res.status(badRequest.statusCode).send(badRequest.toJson());
};
