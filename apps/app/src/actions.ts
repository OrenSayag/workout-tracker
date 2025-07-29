'use server';

import { auth } from '@/auth';
import {
  checkTodaysWorkout,
  getMonthlyStats,
  getUserMonthlyStats,
  getUsersWithPhones,
  markWorkout,
  unmarkWorkout,
  updateUser,
} from '@workout-tracker/db';
import { getCurrentDate } from '../../../libs/time/src';

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

export async function getMonthlyStatsAction() {
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

export async function getUsersWithPhonesAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  return getUsersWithPhones({
    currentUserId: session.user.id,
  });
}

export async function getCurrentUserMonthlyStats() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const today = new Date();
  return getUserMonthlyStats({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    userId: session.user.id,
  });
}

export async function unmarkWorkoutAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }
  const currentDate = getCurrentDate();
  return unmarkWorkout({
    userId: session.user.id,
    workoutDate: currentDate,
  });
}

export async function updateUserData() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  return updateUser({
    id: session.user.id,
    name: "test",
    phone: "054"
  });
}
