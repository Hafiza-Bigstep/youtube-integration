import { StatusCodes } from 'http-status-codes';

export class SuccessResponse {
  statusCode: StatusCodes;
  message: string;
  data: any;

  constructor(
    data: any,
    message = 'Sucessfully providing response',
    statusCode = 200
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
