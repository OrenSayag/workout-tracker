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
import { Label } from '@workout-tracker/ui/components/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@workout-tracker/ui/components/select';
import { useIsMobile } from '@workout-tracker/ui/hooks/use-mobile';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useUsersWithPhones } from '../../hooks/use-users';
import { useCurrentUserMonthlyStats } from '../../hooks/use-workouts';
import { workoutMessages } from './messages';

interface ShareWorkoutModalProps {
    trigger: React.ReactNode;
}

export function ShareWorkoutModal({ trigger }: ShareWorkoutModalProps) {
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();
    const { data: usersData, isLoading, isError } = useUsersWithPhones();
    const {
        data: userStats,
        isLoading: isLoadingUserStats,
        isError: isUserStatsError,
    } = useCurrentUserMonthlyStats();

    const whatsAppShareUrl = useMemo(() => {
        if (!selectedUserId) {
            return;
        }
        const selectedUser = usersData?.users.find(
            (user: any) => user.id === selectedUserId
        );
        if (!selectedUser?.phone) {
            return;
        }
        const formattedNumber = selectedUser.phone.replace(/[^\d+]/g, '');

        const message = encodeURIComponent(
            [
                workoutMessages[
                    Math.floor(Math.random() * (workoutMessages.length + 1))
                ]!,
                `התאמנתי החודש ${
                    userStats!.count == 1
                        ? 'פעם ראשונה!'
                        : userStats!.count + ' פעמים!'
                }`.replaceAll('\t', ''),
            ].join('\n')
        );
        const baseUrl = isMobile
            ? 'whatsapp://send'
            : 'https://web.whatsapp.com/send';
        const whatsappUrl = `${baseUrl}?phone=${formattedNumber}&text=${message}`;
        return whatsappUrl;
    }, [selectedUserId, isMobile]);

    const handleShare = () => {
        if (!whatsAppShareUrl) {
            return;
        }

        window.open(whatsAppShareUrl, '_blank');

        setIsOpen(false);
        setSelectedUserId('');
    };

    const copyShareLink = () => {
        if (!whatsAppShareUrl) {
            return;
        }
        navigator.clipboard.writeText(whatsAppShareUrl).then(() => {
            toast.success('✅ Copied');
        });
    };

    if (isError || isUserStatsError) {
        return <div>Error</div>;
    }

    if (isLoading || isLoadingUserStats) {
        return <div>Loading...</div>;
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share Your Achievement</DialogTitle>
                    <DialogDescription>
                        Share your workout completion via WhatsApp
                        {userStats && (
                            <div className="mt-2 text-sm text-muted-foreground">
                                You've completed {userStats.count} workouts this
                                month! 💪
                            </div>
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                        <Label htmlFor="user-select">Select a user</Label>
                        <Select
                            value={selectedUserId}
                            onValueChange={setSelectedUserId}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Choose someone to share with..." />
                            </SelectTrigger>
                            <SelectContent>
                                {isLoading ? (
                                    <SelectItem value="loading" disabled>
                                        Loading users...
                                    </SelectItem>
                                ) : usersData?.users.length === 0 ? (
                                    <SelectItem value="no" disabled>
                                        No users with phone numbers found
                                    </SelectItem>
                                ) : (
                                    usersData?.users.map((user) => (
                                        <SelectItem
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.name}{' '}
                                            {user.phone && `(${user.phone})`}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2 pt-4">
                        <Button
                            onClick={handleShare}
                            disabled={!selectedUserId}
                            className="flex-1"
                        >
                            Share via WhatsApp
                        </Button>
                        <Button
                            onClick={copyShareLink}
                            disabled={!selectedUserId}
                            className="flex-1"
                        >
                            Copy Share Link
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
