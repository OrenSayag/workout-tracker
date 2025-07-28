import { and, eq } from 'drizzle-orm';
import { db } from '../../../config';
import { workouts } from '../../schema';

type Input = {
  userId: string;
};

type Output = {
  workoutCount: number;
};

export const getUserWorkoutCount = async (input: Input): Promise<Output> => {
  const existingWorkouts = await db
    .select()
    .from(workouts)
    .where(and(eq(workouts.userId, input.userId)));

  return {
    workoutCount: existingWorkouts.length,
  };
};
