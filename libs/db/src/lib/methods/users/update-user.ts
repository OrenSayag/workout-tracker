import { eq } from 'drizzle-orm';
import { db } from '../../../config';
import { users } from '../../schema';
import { User } from '../../types';

type Input = {
    id: string;
    name?: string;
    phone?: string;
};

type Output = {
    user: User;
};

export const updateUser = async (input: Input): Promise<Output> => {
    const { id, ...updateData } = input;
    await db.update(users).set(updateData).where(eq(users.id, id));

    const updated = await db.select().from(users).where(eq(users.id, id));

    return { user: updated[0] };
};
