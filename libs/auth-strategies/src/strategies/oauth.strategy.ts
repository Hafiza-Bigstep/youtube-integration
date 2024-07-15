import { Request, Response } from 'express';
import OAuth2Server, {
  Request as OAuth2Request,
  Response as OAuth2Response,
  TokenOptions,
  AuthorizeOptions,
  ServerOptions,
} from 'oauth2-server';
import { AuthStrategy } from '../types';

export class OAuthStrategy implements AuthStrategy {
  options: ServerOptions;
  oauth: OAuth2Server;

  constructor(options: ServerOptions) {
    this.options = options;
    this.oauth = new OAuth2Server(this.options);
  }
  async authenticate(
    req: Request & { user: any },
    res: Response
  ): Promise<void> {
    const request = new OAuth2Request(req);
    const response = new OAuth2Response(res);
    const token = await this.oauth.authenticate(request, response);
    req.user = { token: token };
  }

  async token(req: Request, res: Response, options?: TokenOptions) {
    const request = new OAuth2Request(req);
    const response = new OAuth2Response(res);
    return await this.oauth.token(request, response, options);
  }

  async authorize(req: Request, res: Response, options?: AuthorizeOptions) {
    const request = new OAuth2Request(req);
    const response = new OAuth2Response(res);
    return await this.oauth.authorize(request, response, options);
  }
}
