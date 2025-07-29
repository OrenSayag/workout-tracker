import { H1 } from '@/src/components/atoms/h1';
import { UpdateUserData } from '@/src/components/update-user-data';

export const AchievementsTemplate = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <H1>Settings</H1>
      <UpdateUserData />
    </div>
  );
};
