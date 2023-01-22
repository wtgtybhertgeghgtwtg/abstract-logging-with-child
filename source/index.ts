export interface LogFunction {
  (message: string, ...args: unknown[]): void;
  (object: unknown, message?: string, ...args: unknown[]): void;
}

export interface Logger {
  child(bindings: Record<string, unknown>): Logger;
  debug: LogFunction;
  error: LogFunction;
  fatal: LogFunction;
  info: LogFunction;
  trace: LogFunction;
  warn: LogFunction;
}

export type LogLevels = (typeof logLevels)[number];

export type LogLevelsWithSilent = (typeof logLevelsWithSilent)[number];

export const logLevels = Object.freeze([
  'fatal',
  'error',
  'warn',
  'info',
  'debug',
  'trace',
] as const);

export const logLevelsWithSilent = Object.freeze([
  ...logLevels,
  'silent',
] as const);

export default Object.freeze({
  child() {
    return this;
  },
  debug: () => {},
  error: () => {},
  fatal: () => {},
  info: () => {},
  trace: () => {},
  warn: () => {},
} as Logger);
