import { InferSelectModel } from 'drizzle-orm';
import { users, workouts,userAchievements } from '../schema';

export type User = InferSelectModel<typeof users>;
export type Workout = InferSelectModel<typeof workouts>;
export type UserAchievement = InferSelectModel<typeof userAchievements>;
