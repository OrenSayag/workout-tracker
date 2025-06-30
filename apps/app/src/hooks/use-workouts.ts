import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  markTodaysWorkout,
  getCurrentMonthStats,
  checkTodaysWorkoutStatus,
} from '../app/actions';

export function useMonthlyStats() {
  return useQuery({
    queryKey: ['monthly-stats'],
    queryFn: getCurrentMonthStats,
  });
}

export function useMarkWorkout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markTodaysWorkout,
    onSuccess: () => {
      // Invalidate and refetch monthly stats
      queryClient.invalidateQueries({ queryKey: ['monthly-stats'] });
      queryClient.invalidateQueries({ queryKey: ['todays-workout-status'] });
    },
  });
}

export function useTodaysWorkoutStatus() {
  return useQuery({
    queryKey: ['todays-workout-status'],
    queryFn: checkTodaysWorkoutStatus,
  });
}
