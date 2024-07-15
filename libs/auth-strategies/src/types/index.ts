/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';

export interface AuthStrategy {
  // options for the strategy
  options: unknown;

  /**
   * Authenticate incoming request
   *
   * @param {Request} req - Incoming request object
   * @param args - Additional arguments
   */
  authenticate<T = any>(
    req: Request,
    res: Response,
    ...args: any
  ): Promise<void>;
}

export interface BasicStrategyOptions {
  findUser<T>(username: string, password: string): Promise<T>;
}

export interface StrategyFactory {
  register(strategyType: string, strategy: AuthStrategy): AuthStrategy;
  get(strategyType: string): AuthStrategy;
}

export type AuthStrategies = Record<string, AuthStrategy>;

export const TYPES = {
  StrategyFactory: Symbol.for('StrategyFactory'),
  AuthStrategy: Symbol.for('AuthStrategy'),
};
