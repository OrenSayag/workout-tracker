import { and, eq } from 'drizzle-orm';
import { db } from '../../../config';
import { workouts } from '../../schema';
import { getCurrentDate } from '@workout-tracker/time';
import { getUserWorkoutCount } from './get-user-workout-count';
import { insertUserAchievement } from '../achievements/insert-user-achievement';
import { AchievementId } from '@workout-tracker/achievements';

type Input = {
  userId: string;
  workoutDate: Date;
};

type Output = {
  success: boolean;
  message: string;
};

async function handleAchievements(input: Input) {
  async function firstWorkout() {
  const userWorkoutCount = await getUserWorkoutCount(input);
    if (userWorkoutCount.workoutCount === 0) {
      const achievementData = {
        userId: input.userId,
        achievementId: AchievementId.FirstWorkout,
      };
      await insertUserAchievement(achievementData);
    }
  }

  await firstWorkout();
}

export const markWorkout = async (input: Input): Promise<Output> => {
  const currentDate = getCurrentDate();

  try {
    const existingWorkout = await db
      .select()
      .from(workouts)
      .where(
        and(
          eq(workouts.userId, input.userId),
          eq(workouts.workoutDate, currentDate)
        )
      );

    if (existingWorkout.length > 0) {
      return {
        success: false,
        message: 'Workout already marked for this date',
      };
    }
    await handleAchievements(input);

    await db.insert(workouts).values({
      userId: input.userId,
      workoutDate: currentDate,
    });

    return {
      success: true,
      message: 'Workout marked successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to mark workout',
    };
  }
};
