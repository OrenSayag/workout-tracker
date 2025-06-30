import { eq, sql } from 'drizzle-orm';
import { db } from '../../../config';
import { users, workouts } from '../../schema';

type Input = {
  year: number;
  month: number;
};

type Output = {
  stats: Array<{
    userId: string;
    userName: string;
    count: number;
  }>;
};

export const getMonthlyStats = async (input: Input): Promise<Output> => {
  const startDate = new Date(input.year, input.month - 1, 1);
  const endDate = new Date(input.year, input.month, 0);

  const stats = await db
    .select({
      userId: workouts.userId,
      userName: users.name,
      count: sql<number>`count(${workouts.id})`,
    })
    .from(workouts)
    .innerJoin(users, eq(workouts.userId, users.id))
    .where(
      sql`${workouts.workoutDate} >= ${startDate} AND ${workouts.workoutDate} <= ${endDate}`
    )
    .groupBy(workouts.userId, users.name);

  return { stats };
};
