/* eslint-disable no-undef */
export const CONFIG = Object.freeze({
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  HOST: process.env.HOST || '0.0.0.0',
  DB: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_NAME: process.env.DATABASE_NAME,
  },
});
