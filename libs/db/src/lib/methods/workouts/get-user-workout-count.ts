import { and, eq, count } from 'drizzle-orm';
import { db } from '../../../config';
import { workouts } from '../../schema';

type Input = {
  userId: string;
};

type Output = {
  workoutCount: number;
};

export const getUserWorkoutCount = async (input: Input): Promise<Output> => {
  const existingWorkoutsCount = await db
    .select({count: count()})
    .from(workouts)
    .where(and(eq(workouts.userId, input.userId)));
  return {
    workoutCount: existingWorkoutsCount[0].count,
  };
};
