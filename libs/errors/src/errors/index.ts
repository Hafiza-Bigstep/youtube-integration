import { StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';

@injectable()
export class ApiError extends Error {
  statusCode: number;
  errors: unknown = [];
  code: string;

  constructor(
    code: string,
    statusCode: number,
    message: string,
    errors?: unknown[]
  ) {
    super(message);

    this.code = code;
    this.statusCode = statusCode;
    if (errors) this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }

  toJson() {
    return {
      code: this.code,
      errors: this.errors,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

@injectable()
export class NotFoundError extends ApiError {
  constructor(path: string) {
    super(
      'NOT_FOUND',
      StatusCodes.NOT_FOUND,
      `The requested path ${path} not found!`
    );
  }
}

@injectable()
export class BadRequestError extends ApiError {
  constructor(message: string, errors: string[]) {
    super('BAD_REQUEST', StatusCodes.BAD_REQUEST, message, errors);
  }
}

@injectable()
export class ApplicationError extends ApiError {
  constructor(message: string, errors?: string[]) {
    super('APPLICATION', StatusCodes.BAD_REQUEST, message, errors);
  }
}

@injectable()
export class ValidationError extends ApiError {
  constructor(errors: any, message = 'Request Validation Failed') {
    super('INVALID_PARAMETER', StatusCodes.BAD_REQUEST, message, errors);
  }
}

@injectable()
export class MissingAuthorizationHeader extends ApiError {
  constructor() {
    super(
      'MISSING_AUTHORIZATION_HEADER',
      StatusCodes.UNAUTHORIZED,
      'Missing authorization header'
    );
  }
}

@injectable()
export class MissingBearerAuthorizationHeader extends ApiError {
  constructor() {
    super(
      'MISSING_BEARER_AUTHORIZATION_HEADER',
      StatusCodes.UNAUTHORIZED,
      'Missing bearer authorization header'
    );
  }
}

@injectable()
export class InvalidLoginAndPassword extends ApiError {
  constructor() {
    super(
      'INVALID_LOGIN_AND_PASSWORD',
      StatusCodes.UNAUTHORIZED,
      'Invalid login and password'
    );
  }
}
