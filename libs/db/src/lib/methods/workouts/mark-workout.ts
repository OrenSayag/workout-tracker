import { eq, and } from 'drizzle-orm';
import { db } from '../../../config';
import { workouts } from '../../schema';

type Input = {
  userId: string;
  workoutDate: Date;
};

type Output = {
  success: boolean;
  message: string;
};

export const markWorkout = async (input: Input): Promise<Output> => {
  try {
    // Check if workout already exists for this date and user
    const existingWorkout = await db
      .select()
      .from(workouts)
      .where(
        and(
          eq(workouts.userId, input.userId),
          eq(
            workouts.workoutDate,
            input.workoutDate.toISOString().split('T')[0]
          )
        )
      );

    if (existingWorkout.length > 0) {
      return {
        success: false,
        message: 'Workout already marked for this date',
      };
    }

    await db.insert(workouts).values({
      userId: input.userId,
      workoutDate: input.workoutDate.toISOString().split('T')[0],
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
