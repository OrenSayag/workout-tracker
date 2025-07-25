export enum AchievementId {
    FirstWorkout = 'first_workout',
    WeeklyStreak = 'weekly_streak',
}

export const achievements = [
    {
        id: AchievementId.FirstWorkout,
        name: 'First Workout',
        description: 'Complete your first workout.',
        icon: '🏋️‍♂️',
        points: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: AchievementId.WeeklyStreak,
        name: 'Weekly Streak',
        description: 'Complete workouts for 7 consecutive days.',
        icon: '📅',
        points: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
] as const;

export type Achievement = (typeof achievements)[number];
