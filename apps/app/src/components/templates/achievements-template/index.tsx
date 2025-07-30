import { H1 } from '@/src/components/atoms/h1';
import { AchievementsList } from '@/src/components/templates/achievements-template/available-achievements';

export const AchievementsTemplate = () => {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <H1>Achievements</H1>
            <p className="text-muted-foreground">Available Achievements</p>
            <AchievementsList />
        </div>
    );
};
