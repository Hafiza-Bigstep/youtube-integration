import { LogEntry, LogLevel, LogProvider } from '../types';
import * as winston from 'winston';

export class WinstonLogger implements LogProvider {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [new winston.transports.Console()],
    });
  }

  logLevelMapper(logLevel: LogLevel): string {
    switch (logLevel) {
      case LogLevel.Trace:
        return 'silly';
      case LogLevel.Debug:
        return 'debug';
      case LogLevel.Information:
        return 'info';
      case LogLevel.Warning:
        return 'warn';
      case LogLevel.Error:
        return 'error';
      case LogLevel.Critical:
        return 'error';
      default:
        return 'info';
    }
  }

  log(logEntry: LogEntry): void {
    this.logger.log({
      level: this.logLevelMapper(logEntry.logLevel),
      message: logEntry.message,
      error: logEntry.error,
      state: logEntry.state,
    });
  }
}
