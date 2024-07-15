import { Request } from 'express';
import { AuthStrategy, BasicStrategyOptions } from '../types';
import { InvalidLoginAndPassword } from 'errors';

export default class BasicStrategy implements AuthStrategy {
  options: BasicStrategyOptions;

  constructor(options: BasicStrategyOptions) {
    this.options = options;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async authenticate(req: Request & { user: any }): Promise<void> {
    const { username, password } = req.body;

    const user = await this.options.findUser(username, password);
    if (!user) {
      throw new InvalidLoginAndPassword();
    }
    req.user = user;
  }
}
