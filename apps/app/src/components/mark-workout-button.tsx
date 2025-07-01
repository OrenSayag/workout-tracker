'use client';

import {
    useMarkWorkout,
    useTodaysWorkoutStatus,
    useUnmarkWorkout,
} from '../hooks/use-workouts';
import { Button } from '@workout-tracker/ui/components/button';
import { ShareWorkoutModal } from './share-workout-modal';
import { useState } from 'react';

export function MarkWorkoutButton() {
    const markWorkoutMutation = useMarkWorkout();
    const unmarkWorkoutMutation = useUnmarkWorkout();
    const { data: status, isLoading: statusLoading } = useTodaysWorkoutStatus();
    const [message, setMessage] = useState<string | null>(null);

    const handleMarkWorkout = async () => {
        try {
            const result = await markWorkoutMutation.mutateAsync();
            setMessage(result.message);
            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage('Failed to mark workout');
            setTimeout(() => setMessage(null), 3000);
        }
    };

    if (statusLoading) {
        return <Button disabled>Loading...</Button>;
    }

    if ((status as { completed: boolean } | undefined)?.completed) {
        return (
            <div className="flex flex-col items-center space-y-2">
                <span
                    role="img"
                    aria-label="celebration"
                    style={{ fontSize: 48 }}
                >
                    🎉
                </span>
                <p className="text-green-600 font-semibold">
                    You completed your workout today!
                </p>
                <ShareWorkoutModal trigger={<Button>Share</Button>} />
                <Button
                    variant={'outline'}
                    disabled={unmarkWorkoutMutation.isPending}
                    onClick={() => unmarkWorkoutMutation.mutate()}
                >
                    Unmark
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <Button
                onClick={handleMarkWorkout}
                disabled={markWorkoutMutation.isPending}
                className="w-full"
            >
                {markWorkoutMutation.isPending
                    ? 'Marking...'
                    : "Mark Today's Workout"}
            </Button>
            {message && (
                <p
                    className={`text-sm ${
                        message.includes('successfully')
                            ? 'text-green-600'
                            : 'text-red-600'
                    }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
}
