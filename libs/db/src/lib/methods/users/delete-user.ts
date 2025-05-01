import { eq } from 'drizzle-orm';
import { db } from '../../../config';
import { users } from '../../schema';

type Input = {
  id: string;
};

export const deleteUser = async (input: Input) => {
  await db
    .update(users)
    .set({ softDeletedAt: new Date() })
    .where(eq(users.id, input.id));
};
