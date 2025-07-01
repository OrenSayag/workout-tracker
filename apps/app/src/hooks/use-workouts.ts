import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    markTodaysWorkout,
    getCurrentUserMonthlyStats,
    checkTodaysWorkoutStatus,
    unmarkWorkoutAction,
    getMonthlyStatsAction,
} from '../actions';

export function useMonthlyStats() {
    return useQuery({
        queryKey: ['monthly-stats'],
        queryFn: getMonthlyStatsAction,
    });
}

export function useMarkWorkout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markTodaysWorkout,
        onSuccess: () => {
            // Invalidate and refetch monthly stats
            queryClient.invalidateQueries({ queryKey: ['monthly-stats'] });
            queryClient.invalidateQueries({
                queryKey: ['current-user-monthly-stats'],
            });
            queryClient.invalidateQueries({
                queryKey: ['todays-workout-status'],
            });
        },
    });
}

export function useUnmarkWorkout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unmarkWorkoutAction,
        onSuccess: () => {
            // Invalidate and refetch monthly stats
            queryClient.invalidateQueries({ queryKey: ['monthly-stats'] });
            queryClient.invalidateQueries({
                queryKey: ['current-user-monthly-stats'],
            });
            queryClient.invalidateQueries({
                queryKey: ['todays-workout-status'],
            });
        },
    });
}

export function useTodaysWorkoutStatus() {
    return useQuery({
        queryKey: ['todays-workout-status'],
        queryFn: checkTodaysWorkoutStatus,
    });
}

export function useCurrentUserMonthlyStats() {
    return useQuery({
        queryKey: ['current-user-monthly-stats'],
        queryFn: getCurrentUserMonthlyStats,
    });
}
