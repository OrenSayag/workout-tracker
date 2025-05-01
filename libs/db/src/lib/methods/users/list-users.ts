import { db } from '../../../config';
import { users } from '../../schema';
import { User } from '../../types';

type Output = {
  users: User[];
};

export const listUsers = async (): Promise<Output> => {
  const results = await db.select().from(users);
  return { users: results };
};
