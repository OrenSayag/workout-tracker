'use client';

import { useMonthlyStats } from '../hooks/use-workouts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workout-tracker/ui/components/table';
import { Skeleton } from '@workout-tracker/ui/components/skeleton';

export function WorkoutStatsTable() {
  const { data, isLoading, error } = useMonthlyStats();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading workout stats</div>;
  }

  const currentMonth = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{currentMonth} Workout Counts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Workout Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.stats
            .sort((a, b) => b.count - a.count)
            .map((stat) => (
              <TableRow key={stat.userId}>
                <TableCell>{stat.userName}</TableCell>
                <TableCell>{stat.count}</TableCell>
              </TableRow>
            ))}
          {data?.stats.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-muted-foreground"
              >
                No workouts recorded this month
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
