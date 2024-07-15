import { injectable } from 'inversify';
import { AuthStrategies, AuthStrategy, StrategyFactory } from './types';

@injectable()
export class AuthStrategyFactory implements StrategyFactory {
  strategies: AuthStrategies;

  constructor() {
    this.strategies = {};
  }

  register(strategyType: string, strategy: AuthStrategy): AuthStrategy {
    this.strategies[strategyType.toLowerCase()] = strategy;
    return strategy;
  }

  get(strategyType: string): AuthStrategy {
    const strategy = this.strategies[strategyType.toLowerCase()];

    if (!strategy) {
      throw new Error(`Authentication strategy '${strategyType}' not found`);
    }

    return strategy;
  }
}
