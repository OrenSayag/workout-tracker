import { db } from '../../../config';
import { userAchievements } from '../../schema';
import { AchievementId } from '@workout-tracker/achievements';

type Input = {
  userId: string;
  achievementId: AchievementId;
};

export const insertUserAchievement = async (input: Input): Promise<void> => {
  await db.insert(userAchievements).values({
    userId: input.userId,
    achievementId: input.achievementId,
  });
};
