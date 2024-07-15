export enum ENVIRONMENTS {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEMO = 'demo',
  DEVELOPMENT = 'development',
  LOCAL = 'local',
  TEST = 'test',
}

export const DEV_ENV = [
  ENVIRONMENTS.DEVELOPMENT,
  ENVIRONMENTS.LOCAL,
  ENVIRONMENTS.TEST,
];
