import { and, eq } from 'drizzle-orm';
import { db } from '../../../config';
import { workouts } from '../../schema';
import { deleteUserAchievement } from '../achievements/delete-user-achievement';
import { getUserWorkoutCount } from './get-user-workout-count';
import { AchievementId } from '@workout-tracker/achievements';

type Input = {
    userId: string;
    workoutDate: string;
};

export const unmarkWorkout = async (input: Input) => {
    await db
        .delete(workouts)
        .where(
            and(
                eq(workouts.userId, input.userId),
                eq(workouts.workoutDate, input.workoutDate)
            )
        );
    await handleAchievements(input);
    async function handleAchievements(input: Input) {
        async function deleteFirstWorkout() {
            const userWorkoutCount = await getUserWorkoutCount(input);
            if (userWorkoutCount.workoutCount === 0) {
                const achievementData = {
                    userId: input.userId,
                    achievementId: AchievementId.FirstWorkout,
                };

                await deleteUserAchievement(achievementData);
            }
        }

        await deleteFirstWorkout();
    }
};
