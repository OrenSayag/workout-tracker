import { AchievementId } from '@workout-tracker/achievements';
import { db } from '../../../config';
import { user_achievements } from '../../schema';
import { and, eq } from 'drizzle-orm';

type Input = {
  userId: string;
  achievementId: AchievementId;
};

type Output = {
  isDeleted: boolean;
};

export const deleteUserAchievement = async (input: Input): Promise<Output> => {
  await db
    .delete(user_achievements)
    .where(
      and(
        eq(user_achievements.userId, input.userId),
        eq(user_achievements.achievementId, input.achievementId)
      )
    );

  return {
    isDeleted: true,
  };
};
