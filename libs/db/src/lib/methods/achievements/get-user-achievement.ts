import { db } from '../../../config';
import { userAchievements } from '../../schema';
import { AchievementId } from '@workout-tracker/achievements';
import { UserAchievement } from '../../types';
import { and, eq } from 'drizzle-orm';

type Input = {
  userId: string;
  achievementId: AchievementId;
};

type Output = {
  achievement: UserAchievement[];
};

export const getUserAchievement = async (input: Input): Promise<Output> => {
  const userAchievement = await db
    .select()
    .from(userAchievements)
    .where(
      and(
        eq(userAchievements.userId, input.userId),
        eq(userAchievements.achievementId, input.achievementId)
      )
    );
  return {
    achievement: userAchievement,
  };
};
