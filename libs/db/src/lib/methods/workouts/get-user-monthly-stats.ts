import { sql } from 'drizzle-orm';
import { db } from '../../../config';
import { workouts } from '../../schema';

type Input = {
    userId: string;
    year: number;
    month: number;
};

type Output = {
    count: number;
};

export const getUserMonthlyStats = async (input: Input): Promise<Output> => {
    const startDate = new Date(input.year, input.month - 1, 1);
    const endDate = new Date(input.year, input.month, 0);

    const result = await db
        .select({
            count: sql<number>`count(${workouts.id})`,
        })
        .from(workouts)
        .where(
            sql`${workouts.userId} = ${input.userId} AND ${workouts.workoutDate} >= ${startDate} AND ${workouts.workoutDate} <= ${endDate}`
        );

    return { count: result[0]?.count || 0 };
};
