import { and, eq } from 'drizzle-orm';
import { db } from '../../../config';
import { workouts } from '../../schema';
import { getCurrentDate } from '@workout-tracker/time';

type Input = {
    userId: string;
    workoutDate: Date;
};

type Output = {
    completed: boolean;
};

export const checkTodaysWorkout = async (input: Input): Promise<Output> => {
    const currentDate = getCurrentDate();
    const existingWorkout = await db
        .select()
        .from(workouts)
        .where(
            and(
                eq(workouts.userId, input.userId),
                eq(workouts.workoutDate, currentDate)
            )
        );

    return {
        completed: existingWorkout.length > 0,
    };
};
