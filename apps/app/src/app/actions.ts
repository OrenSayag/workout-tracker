'use server';

import { auth } from '@/auth';
import {
  markWorkout,
  getMonthlyStats,
  checkTodaysWorkout,
} from '@workout-tracker/db';

export async function markTodaysWorkout() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const today = new Date();
  return markWorkout({
    userId: session.user.id,
    workoutDate: today,
  });
}

export async function getCurrentMonthStats() {
  const today = new Date();
  return getMonthlyStats({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
}

export async function checkTodaysWorkoutStatus() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const today = new Date();
  return checkTodaysWorkout({
    userId: session.user.id,
    workoutDate: today,
  });
}
