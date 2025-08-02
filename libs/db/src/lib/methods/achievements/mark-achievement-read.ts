import { db } from '../../../config';
import { userAchievements } from '../../schema';
import { eq } from 'drizzle-orm';


type Input = {
  userAchievementId: string;
};

export const markAchievementRead = async (input: Input): Promise<void> => {
  await db.update(userAchievements)
    .set({ isRead: true })
    .where(eq(userAchievements.id, input.userAchievementId));
};