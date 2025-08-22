'use client';
import { useEffect, useState } from 'react';
import {
  useGetUnreadAchievements,
  useMarkAchievementRead,
} from '../../hooks/use-achievements';
import { Skeleton } from '@workout-tracker/ui/components/skeleton';
import { NotifyNewAchievementsModal } from '../organisms/notify-new-achievement-modal';

export function AchievementsNotificationProvider() {
  const [isOpen, setModalOpen] = useState<boolean>(false);
  const { mutateAsync: markAchievementRead } = useMarkAchievementRead();
  const { data: unreadAchievementsObject, isLoading } =
    useGetUnreadAchievements();
  const unreadAchievements = unreadAchievementsObject?.unreadAchievements || [];

  const handleMarkAchievementRead = async () => {
    setModalOpen(false);
    await markAchievementRead(unreadAchievements[0].id);
  };

  useEffect(() => {
    if (unreadAchievements.length > 0) {
      setModalOpen(true);
    }
  }, [unreadAchievements.length]);


  return (
    <div>
      {isOpen ? (
        <NotifyNewAchievementsModal
          achievementIds={['first_workout']} //TODO Change this from hardcoded achievement id to a generic id
          onClose={() => handleMarkAchievementRead() }
          isOpen={isOpen}
        />
      ) : null}
    </div>
  );

  /*  return (
      <div>
        {isOpen ? (
          <div>
            You have some unread message ({unreadAchievements.length})
            <Button variant={'outline'} onClick={handleMarkAchievementRead}>
              X
            </Button>
          </div>
        ) : null}
      </div>
    );
    */
}
