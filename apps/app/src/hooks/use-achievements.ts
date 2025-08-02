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

export function useMarkAchievementReadAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAchievementReadAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unread-achievements'] });
    },
  });
}
