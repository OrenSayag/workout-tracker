import { cn } from '@workout-tracker/ui/lib/utils';
import { FC } from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const H1: FC<Props> = ({ className, children }) => {
  return (
    <>
      <h1 className={cn('text-2xl font-bold', className)}>{children}</h1>
    </>
  );
};
