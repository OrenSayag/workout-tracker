import { and, eq } from 'drizzle-orm';
import { db } from '../../../config';
import { workouts } from '../../schema';

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
};
