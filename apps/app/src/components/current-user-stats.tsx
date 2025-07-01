'use client';

import { useCurrentUserMonthlyStats } from '../hooks/use-workouts';
import { Skeleton } from '@workout-tracker/ui/components/skeleton';

export function CurrentUserStats() {
    const { data: userStats, isLoading } = useCurrentUserMonthlyStats();

    if (isLoading) {
        return <Skeleton className="h-6 w-48" />;
    }

    if (!userStats) {
        return null;
    }

    const currentMonth = new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="text-sm text-muted-foreground">
            You've completed {userStats.count} workouts in {currentMonth}{' '}
            {userStats.count > 0 ? '💪' : '🤨'}
        </div>
    );
}
