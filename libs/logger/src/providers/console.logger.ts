import { LogProvider, LogEntry, LogLevel } from '../types';

export class ConsoleLogger implements LogProvider {
  log(logEntry: LogEntry): void {
    console.log(
      `[Console] [${logEntry.logCategory}] [${LogLevel[logEntry.logLevel]}] ${
        logEntry.message
      }`,
      logEntry.state ? logEntry.state : '',
      logEntry.error ? logEntry.error : ''
    );
  }
}
