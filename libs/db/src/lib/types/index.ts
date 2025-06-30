import { InferSelectModel } from 'drizzle-orm';
import { users, workouts } from '../schema';

export type User = InferSelectModel<typeof users>;
export type Workout = InferSelectModel<typeof workouts>;
