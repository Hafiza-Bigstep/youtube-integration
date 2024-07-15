export enum LogLevel {
  Trace = 0,
  Debug = 1,
  Information = 2,
  Warning = 3,
  Error = 4,
  Critical = 5,
}

export type LogState = any;

export interface LogEntry {
  logCategory: string;
  logLevel: LogLevel;
  message: string;
  error?: Error;
  state?: LogState;
}

export interface LogProvider {
  log: (logEntry: LogEntry) => void;
}

export interface Logger {
  log: (
    logLevel: LogLevel,
    message: string,
    error?: Error,
    state?: LogState
  ) => void;
}

export interface ExtendedLogger extends Logger {
  trace: (message: string, state?: LogState) => void;
  debug: (message: string, state?: LogState) => void;
  info: (message: string, state?: LogState) => void;
  warn: (message: string, state?: LogState) => void;
  error: (
    error: Error | undefined | any,
    message: string,
    state?: LogState
  ) => void;
  critical: (
    error: Error | undefined | any,
    message: string,
    state: LogState
  ) => void;
}

export interface LoggerFactory {
  createLogger(logCategory: string): ExtendedLogger;
}

const TYPES = {
  LoggerFactory: Symbol.for('LoggerFactory'),
};
export { TYPES };
