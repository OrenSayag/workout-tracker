'use client';

import { Button } from '@workout-tracker/ui/components/button';
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
} from '@workout-tracker/ui/components/sidebar';
import { Home } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
    {
        title: 'Home',
        url: '/app',
        icon: Home,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Workout Tracker</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        disabled={item.disabled}
                                    >
                                        <Link
                                            href={item.url}
                                            className={`${
                                                item.disabled
                                                    ? 'opacity-50 pointer-events-none'
                                                    : ''
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
