'use client';

import { Button } from '@life-stats/ui/components/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@life-stats/ui/components/sidebar';
import {
  Calendar,
  CreditCard,
  Diff,
  FileText,
  Home,
  List,
  MessageCircle,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {
    title: 'Home',
    url: '/app',
    icon: Home,
  },
  {
    title: 'Day',
    url: '/app/day',
    icon: Calendar,
    disabled: true,
  },
  {
    title: 'Habits',
    url: '/app/habits',
    icon: Diff,
    disabled: true,
  },
  {
    title: 'Chat',
    url: '/app/chat',
    icon: MessageCircle,
    disabled: true,
  },
  {
    title: 'Finance',
    url: '/app/finance',
    icon: CreditCard,
    disabled: true,
  },
  {
    title: 'Calendar',
    url: '/app/calendar',
    icon: Calendar,
    disabled: true,
  },
  {
    title: 'Notes',
    url: '/app/notes',
    icon: FileText,
    disabled: true,
  },
  {
    title: 'Tasks',
    url: '/app/tasks',
    icon: List,
    disabled: true,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Life Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild disabled={item.disabled}>
                    <Link
                      href={item.url}
                      className={`${
                        item.disabled ? 'opacity-50 pointer-events-none' : ''
                      } ${
                        pathname === item.url
                          ? 'bg-accent text-accent-foreground'
                          : ''
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="outline"
          onClick={() =>
            signOut({
              redirectTo: '/',
            })
          }
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
