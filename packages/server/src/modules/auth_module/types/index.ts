import { IRegisterUser } from './IRegisterUser';

const TYPES = {
  AuthController: Symbol.for('AuthController'),
  AuthService: Symbol.for('AuthService'),
  AuthPolicy: Symbol.for('AuthPolicy'),
  AuthRepository: Symbol.for('AuthRepository'),
};
export { type IRegisterUser, TYPES };
