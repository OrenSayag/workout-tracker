import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  LOG_LEVEL: str({ default: 'info' }),
  LOG_DIR: str({ default: undefined }),
});

export const config = {
  db: {
    url: env.DATABASE_URL,
  },
  logger: {
    level: env.LOG_LEVEL,
    dir: env.LOG_DIR,
  },
  devMode: process.env.NODE_ENV === 'development',
};
