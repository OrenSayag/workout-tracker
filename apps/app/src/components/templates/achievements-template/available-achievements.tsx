import { achievements, Achievement } from '@workout-tracker/achievements';

// Item Component
type ItemProps = {
  achievement: Achievement;
};

const Item = ({ achievement }: ItemProps) => {
  return (
    <div className="flex items-start gap-4 bg-[#1c1c1e] rounded-xl shadow-lg p-5 w-[300px] min-h-[140px] text-white">
      <div className="text-4xl">{achievement.icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{achievement.name}</h3>
        <p className="text-gray-400 text-sm">{achievement.description}</p>
        <p className="mt-2 text-sm font-medium text-gray-300">Points: {achievement.points}</p>
      </div>
    </div>
  );
};

// List Component
export const AchievementsList = () => {
  return (
    <div className="flex flex-wrap gap-6">
      {achievements.map((achievement) => (
        <Item key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};