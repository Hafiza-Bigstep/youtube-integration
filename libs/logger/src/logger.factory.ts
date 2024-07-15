import { injectable } from 'inversify';
import {
  LogProvider,
  LoggerFactory,
  ExtendedLogger,
  LogLevel,
  LogState,
  LogEntry,
} from './types';

import { WinstonLogger } from './providers/winston.logger';
import { DatadogLogger } from './providers/datadog.logger';
import { ConsoleLogger } from './providers/console.logger';

@injectable()
export class DefaultLoggerFactory implements LoggerFactory {
  private loggerProviders: LogProvider[];

  constructor() {
    // Initialize logger providers based on configuration
    this.loggerProviders = this.initializeProviders();
  }

  private initializeProviders(): LogProvider[] {
    const providers: LogProvider[] = [];
    const logProviders = process.env['LOG_PROVIDERS']?.split(',');

    logProviders?.forEach(provider => {
      switch (provider.trim().toLowerCase()) {
        case 'datadog':
          providers.push(new DatadogLogger());
          break;
        case 'winston':
          providers.push(new WinstonLogger());
          break;
        case 'console':
          providers.push(new ConsoleLogger());
          break;
        // Add other providers here based on different environment variables
        default:
          throw new Error(`Unsupported LOG_PROVIDER: ${provider}`);
      }
    });
    return providers;
  }

  createLogger(logCategory: string): ExtendedLogger {
    const log = (
      logLevel: LogLevel,
      message: string,
      error?: Error,
      state?: LogState
    ) => {
      const logEntry: LogEntry = {
        logCategory,
        logLevel,
        message,
        error,
        state,
      };
      this.loggerProviders.forEach(provider => provider.log(logEntry));
    };

    return {
      log,
      trace: (message, state) => log(LogLevel.Trace, message, undefined, state),
      debug: (message, state) => log(LogLevel.Debug, message, undefined, state),
      info: (message, state) =>
        log(LogLevel.Information, message, undefined, state),
      warn: (message, state) =>
        log(LogLevel.Warning, message, undefined, state),
      error: (error, message, state) =>
        log(LogLevel.Error, message, error, state),
      critical: (error, message, state) =>
        log(LogLevel.Critical, message, error, state),
    };
  }
}
