import { eq, and } from 'drizzle-orm';
import { db } from '../../../config';
import { workouts } from '../../schema';

type Input = {
  userId: string;
  workoutDate: Date;
};

type Output = {
  completed: boolean;
};

export const checkTodaysWorkout = async (input: Input): Promise<Output> => {
  const existingWorkout = await db
    .select()
    .from(workouts)
    .where(
      and(
        eq(workouts.userId, input.userId),
        eq(workouts.workoutDate, input.workoutDate.toISOString().split('T')[0])
      )
    );

  return {
    completed: existingWorkout.length > 0,
  };
};
