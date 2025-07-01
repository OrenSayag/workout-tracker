import { auth } from '@/auth';
import { H1 } from '@/src/components/atoms/h1';
import { MarkWorkoutButton } from '@/src/components/mark-workout-button';
import { WorkoutStatsTable } from '@/src/components/workout-stats-table';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@workout-tracker/ui/components/card';
import { CurrentUserStats } from '../../components/current-user-stats';

export default async function HomePage() {
    const session = await auth();
    return (
        <div className="container mx-auto p-6 space-y-6">
            <H1>Workout Tracker</H1>
            <p className="text-muted-foreground">
                Welcome, {session?.user?.name}.
            </p>
            <CurrentUserStats />

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Mark Workout</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MarkWorkoutButton />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WorkoutStatsTable />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
