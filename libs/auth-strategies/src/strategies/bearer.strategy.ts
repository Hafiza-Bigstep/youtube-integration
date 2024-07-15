import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { AuthStrategy } from '../types';
import {
  MissingAuthorizationHeader,
  MissingBearerAuthorizationHeader,
} from 'errors';
export class BearerStrategy implements AuthStrategy {
  options: Record<string, string>;

  constructor(secret: string) {
    this.options = { secret };
  }

  async authenticate(req: Request & { user: any }) {
    const { secret } = this.options;

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new MissingAuthorizationHeader();
    }
    const [authType, token] = authorizationHeader.split(' ');

    if (authType.toLowerCase() !== 'bearer') {
      throw new MissingBearerAuthorizationHeader();
    }

    const decoded = await this.promisifyVerify(token, secret);

    req.user = decoded;
  }

  async token(payload: any) {
    const token = await this.promisifySign(payload, this.options['secret']);
    return token;
  }

  private promisifySign(payload: any, secret: string) {
    return new Promise((resolve, reject) => {
      sign(payload, secret, {}, (err, token) => {
        if (err) reject(err);
        else resolve(token);
      });
    });
  }
  private promisifyVerify(token: string, secret: string) {
    return new Promise((resolve, reject) => {
      verify(token, secret, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
      });
    });
  }
}
