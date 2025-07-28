import { db } from '../../../config';
import { user_achievements } from '../../schema';
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
    .from(user_achievements)
    .where(
      and(
        eq(user_achievements.userId, input.userId),
        eq(user_achievements.achievementId, input.achievementId)
      )
    );
  return {
    achievement: userAchievement,
  };
};
