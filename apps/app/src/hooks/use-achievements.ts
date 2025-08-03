import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getUserUnreadAchievementsAction,
  markAchievementReadAction,
} from '../actions';

export function useGetUnreadAchievements() {
  return useQuery({
    queryKey: ['unread-achievements'],
    queryFn: getUserUnreadAchievementsAction,
  });
}

export function useMarkAchievementRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userAchievementIdToMark: string) =>
      markAchievementReadAction(userAchievementIdToMark),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unread-achievements'] });
    },
  });
}