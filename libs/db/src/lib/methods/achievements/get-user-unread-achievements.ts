import { db } from '../../../config';
import { userAchievements } from '../../schema';
import { UserAchievement } from '../../types';
import { and, eq } from 'drizzle-orm';

type Input = {
  userId: string;
};

type Output = {
  unreadAchievements: UserAchievement[];
};

export const getUserUnreadAchievement = async (input: Input): Promise<Output> => {
  const userUnreadAchievements = await db
    .select()
    .from(userAchievements)
    .where(
      and(
        eq(userAchievements.userId, input.userId),
        eq(userAchievements.isRead, false)
      )
    );
  return {
    unreadAchievements: userUnreadAchievements,
  };
};