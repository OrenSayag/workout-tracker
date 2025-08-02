import { AchievementId } from '@workout-tracker/achievements';
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: varchar('id', { length: 255 }).primaryKey(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
    softDeletedAt: timestamp('soft_deleted_at'),
    name: varchar({ length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).unique(),
    emailVerified: timestamp('email_verified', {
        mode: 'date',
    }),
    image: varchar('image', { length: 255 }),
    phone: varchar('phone', { length: 20 }),
});

export const betaUsers = pgTable('beta_users', {
    id: uuid().primaryKey().defaultRandom(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
    email: varchar('email', { length: 255 }).unique(),
});

export const sessions = pgTable('session', {
    sessionToken: varchar('session_token', { length: 255 }).primaryKey(),
    userId: varchar('user_id', { length: 255 })
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const accounts = pgTable(
    'account',
    {
        userId: varchar('user_id', { length: 255 })
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: varchar('type', { length: 255 }).notNull(),
        provider: varchar('provider', { length: 255 }).notNull(),
        providerAccountId: varchar('provider_account_id', {
            length: 255,
        }).notNull(),
        refresh_token: varchar('refresh_token', { length: 255 }),
        access_token: varchar('access_token', { length: 255 }),
        expires_at: integer('expires_at'),
        token_type: varchar('token_type', { length: 255 }),
        scope: varchar('scope', { length: 255 }),
        id_token: varchar('id_token', { length: 2048 }),
        session_state: varchar('session_state', { length: 255 }),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const achievementId = pgEnum('achievement_id', [
    AchievementId.FirstWorkout,
    AchievementId.WeeklyStreak,
    AchievementId.MonthlyStreak,
    AchievementId.WeekendWarrior,
]);

export const workouts = pgTable('workouts', {
    id: uuid().primaryKey().defaultRandom(),
    userId: varchar('user_id', { length: 255 })
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    workoutDate: date('workout_date').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});

export const userAchievements = pgTable('user_achievements', {
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
    achievementId: achievementId('achievement_id').notNull(),
    userId: varchar('user_id', { length: 255 })
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
  isRead: boolean('is_read').default(false),
});
