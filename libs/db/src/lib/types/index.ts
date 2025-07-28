import { InferSelectModel } from 'drizzle-orm';
import { users, workouts,user_achievements } from '../schema';

export type User = InferSelectModel<typeof users>;
export type Workout = InferSelectModel<typeof workouts>;
export type UserAchievement = InferSelectModel<typeof user_achievements>;
