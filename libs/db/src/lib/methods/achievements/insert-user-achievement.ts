import { db } from '../../../config';
import { user_achievements } from '../../schema';
import { AchievementId } from '@workout-tracker/achievements';

type Input = {
  userId: string;
  achievementId: AchievementId;
};

type Output = {
  success: boolean;
  message: string;
};

export const insertUserAchievement = async (input: Input): Promise<Output> => {
  try {
    await db.insert(user_achievements).values({
      userId: input.userId,
      achievementId: input.achievementId,


    });
    console.log("success?!")

    return {
      success: true,
      message: 'Achievement inserted successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to insert achievement',
    };
  }
};
