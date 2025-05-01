import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from '@life-stats/config';

export const db = drizzle(config.db.url);
