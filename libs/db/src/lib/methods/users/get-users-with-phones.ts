import { and, ne, isNotNull } from 'drizzle-orm';
import { db } from '../../../config';
import { users } from '../../schema';

type Input = {
  currentUserId: string;
};

type Output = {
  users: Array<{
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    image: string | null;
  }>;
};

export const getUsersWithPhones = async (input: Input): Promise<Output> => {
  const usersWithPhones = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      image: users.image,
    })
    .from(users)
    .where(and(ne(users.id, input.currentUserId), isNotNull(users.phone)));

  return { users: usersWithPhones };
};
