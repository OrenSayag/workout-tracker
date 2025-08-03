import { auth } from '@/auth';
import { AppSidebar } from '@/src/components/app-sidebar';
import ReactQueryProvider from '@/src/components/providers/react-query-provider';
import { isBetaUser } from '@workout-tracker/db';
import { SidebarProvider } from '@workout-tracker/ui/components/sidebar';
import { Toaster } from '@workout-tracker/ui/components/sonner';
import {
  ModeToggle,
  ThemeProvider,
} from '@workout-tracker/ui/providers/theme-provider';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import { AchievementsNotificationProvider } from '@/src/components/providers/achievements-notification-provider';

interface Props {
  children: React.ReactNode;
}

const AppLayout: FC<Props> = async ({ children }) => {
  const session = await auth();
  if (!session) {
    redirect('/auth/login');
  }
  const validBetaUser = await isBetaUser(session.user?.email!);
  if (!validBetaUser) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">You are not a beta user.</h1>
          <p className="text-sm text-muted-foreground">
            The platform is currently in beta. Please contact us to get access
            to the platform.
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full px-4 py-6">{children}</main>
            <AchievementsNotificationProvider/>
          </SidebarProvider>

          <div className="fixed bottom-4 right-4">
            <ModeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </ReactQueryProvider>
    </>
  );
};

export default AppLayout;
