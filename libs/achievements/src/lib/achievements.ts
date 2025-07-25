export enum AchievementId {
  FirstWorkout = 'first_workout',
  WeeklyStreak = 'weekly_streak',
  MonthlyStreak ='monthly_streak',
  WeekendWarrior ='weekend_warrior',
}

export const achievements = [
  {
    id: AchievementId.FirstWorkout,
    name: 'First Workout',
    description: 'Complete your first workout.',
    icon: '🏋️‍♂️',
    points: 10,
  },
  {
    id: AchievementId.WeeklyStreak,
    name: 'Weekly Streak',
    description: 'Complete workouts for 7 consecutive days.',
    icon: '📅',
    points: 50,
  },
  {
    id: AchievementId.MonthlyStreak,
    name: 'Monthly Streak',
    description: 'Complete workouts for the whole month.',
    icon: '📅',
    points: 100,
  },
  {
    id: AchievementId.WeekendWarrior,
    name: 'Weekend Warrior',
    description: 'Complete a workout in the weekend.',
    icon: '🏅',
    points: 50,
  }
] as const;

export type Achievement = (typeof achievements)[number];
