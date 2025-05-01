import { eq } from 'drizzle-orm';
import { db } from '../../../config';
import { betaUsers } from '../../schema';

export const isBetaUser = async (email: string) => {
  const exists = await db
    .select()
    .from(betaUsers)
    .where(eq(betaUsers.email, email));
  return exists.length > 0;
};
