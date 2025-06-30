import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from '@workout-tracker/config';

export const db = drizzle(config.db.url);
