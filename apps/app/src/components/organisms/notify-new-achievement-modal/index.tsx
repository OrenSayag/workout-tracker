'use client';

import { Button } from '@workout-tracker/ui/components/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@workout-tracker/ui/components/dialog';

import { Item } from '@/src/components/templates/achievements-template/available-achievements';
import { AchievementId } from '@workout-tracker/achievements';

interface NotifyNewAchievementModalProps {
    achievementIds: string[],
    onClose: () => void,
    isOpen:boolean
}

export function NotifyNewAchievementsModal({ achievementIds, onClose, isOpen }: NotifyNewAchievementModalProps) {

    return (
      //TODO Figure how to display data for each achievement not using an explicit object
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations! you've achieved a new achievement!</DialogTitle>
                <DialogDescription>
                    <Item  achievement={{
                        id: AchievementId.FirstWorkout,
                        name: 'First Workout',
                        description: 'Complete your first workout.',
                        icon: '🏋️‍♂️',
                        points: 10
                    }} />
                </DialogDescription>

          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
}
