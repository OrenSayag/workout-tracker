import { AchievementId } from '@workout-tracker/achievements';
import { db } from '../../../config';
import { userAchievements } from '../../schema';
import { and, eq } from 'drizzle-orm';

type Input = {
  userId: string;
  achievementId: AchievementId;
};

export const deleteUserAchievement = async (input: Input) => {
  await db
    .delete(userAchievements)
    .where(
      and(
        eq(userAchievements.userId, input.userId),
        eq(userAchievements.achievementId, input.achievementId)
      )
    );
};
