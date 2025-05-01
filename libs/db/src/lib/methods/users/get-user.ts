import { eq } from 'drizzle-orm';
import { db } from '../../../config';
import { users } from '../../schema';
import { User } from '../../types';

type Input = {
  id: string;
};

type Output = {
  user?: User;
};

export const getUser = async (input: Input): Promise<Output> => {
  const user = await db.select().from(users).where(eq(users.id, input.id));
  return { user: user[0] };
};
