/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Client,
  User,
  Callback,
  Token,
  Falsey,
  AuthorizationCodeModel,
  ClientCredentialsModel,
  RefreshTokenModel,
  PasswordModel,
  ExtensionModel,
} from 'oauth2-server';

type Scope = string | string[];
type Model =
  | AuthorizationCodeModel
  | ClientCredentialsModel
  | RefreshTokenModel
  | PasswordModel
  | ExtensionModel;
/**
 * To learn more about OAuth2 Server model spec and implementation, visit https://oauth2-server.readthedocs.io/en/latest/model/spec.html
 */
const model: Model = {
  generateAccessToken(
    client: Client,
    user: User,
    scope: Scope
  ): Promise<string> {
    return Promise.resolve('generateAccessToken!!');
  },

  generateRefreshToken(
    client: Client,
    user: User,
    scope: Scope
  ): Promise<string> {
    return Promise.resolve('generateRefreshToken!!');
  },

  generateAuthorizationCode(
    client: Client,
    user: User,
    scope: Scope
  ): Promise<string> {
    return Promise.resolve('generateRefreshToken!!');
  },

  getAccessToken(
    token: string,
    callback?: Callback<Token>
  ): Promise<Token | Falsey> {
    return Promise.resolve({} as Token);
  },

  getClient(
    clientId: string,
    clientSecret: string,
    callback?: Callback<Client | Falsey>
  ): Promise<Client | Falsey> {
    return Promise.resolve({
      id: clientId,
      grants: ['authorization_code', 'refresh_token'],
    });
  },

  getUserFromClient(
    client: Client,
    callback?: Callback<User | Falsey>
  ): Promise<User | Falsey> {
    return Promise.resolve({
      id: '1',
      username: 'admin',
      password: 'admin',
    });
  },

  saveToken(
    token: Token,
    client: Client,
    user: User,
    callback?: Callback<Token>
  ): Promise<Token | Falsey> {
    return Promise.resolve(token);
  },

  verifyScope(
    token: Token,
    scope: string | string[],
    callback?: Callback<boolean>
  ): Promise<boolean> {
    return Promise.resolve(true);
  },
};

export default model;
