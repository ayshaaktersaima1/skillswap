'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Bell,
    Briefcase,
    Envelope,
    Gear,
    House,
    Magnifier,
    Person,
} from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';

const dashboardItems = {
    client: [
        {
            icon: House,
            label: 'Dashboard',
            href: '/dashboard/client',
        },
        {
            icon: Briefcase,
            label: 'Post a Task',
            href: '/dashboard/client/post-task',
        },
        {
            icon: Magnifier,
            label: 'My Tasks',
            href: '/dashboard/client/my-tasks',
        },
        {
            icon: Person,
            label: 'Proposals',
            href: '/dashboard/client/receivedProposals',
        },
        {
            icon: Envelope,
            label: 'Payments',
            href: '/dashboard/client/payments',
        },
        {
            icon: Gear,
            label: 'Settings',
            href: '/dashboard/client/settings',
        },
    ],

    freelancer: [
        {
            icon: House,
            label: 'Dashboard',
            href: '/dashboard/freelancer',
        },
        {
            icon: Magnifier,
            label: 'Browse Tasks',
            href: '/allTasks',
        },
        {
            icon: Envelope,
            label: 'My Proposals',
            href: '/dashboard/freelancer/my-proposals',
        },
        {
            icon: Bell,
            label: 'Active Projects',
            href: '/dashboard/freelancer/activeProjects',
        },
        {
            icon: Gear,
            label: 'My Earnings',
            href: '/dashboard/freelancer/earnings',
        },
        {
            icon: Person,
            label: 'Edit Profile',
            href: '/dashboard/freelancer/profile',
        },
    ],

    admin: [
        {
            icon: House,
            label: 'Dashboard',
            href: '/dashboard/admin',
        },
        {
            icon: Person,
            label: 'Manage Users',
            href: '/dashboard/admin/users',
        },
        {
            icon: Magnifier,
            label: 'Manage Tasks',
            href: '/dashboard/admin/tasks',
        },
        {
            icon: Envelope,
            label: 'Transactions',
            href: '/dashboard/admin/transactions',
        },
    ],
};

export default function DashboardSidebar({ closeDrawer }) {
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();

    const userRole = session?.user?.role?.toLowerCase();

    const navItems = dashboardItems[userRole] || [];

    const isActiveLink = (href) => {
        if (
            href === '/dashboard/client' ||
            href === '/dashboard/freelancer' ||
            href === '/dashboard/admin'
        ) {
            return pathname === href;
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <div className="flex h-full flex-col bg-white">
            {/* Logo */}
            <div className="flex h-16 items-center gap-3 border-b border-[#DDE7EB] px-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#152A38] text-sm font-bold text-white shadow-lg">
                    SS
                </div>

                <div>
                    <h2 className="text-lg font-bold tracking-tight text-[#10202B]">
                        SKILLSWAP
                    </h2>
                    <p className="text-xs font-medium text-[#52636C]">
                        Dashboard
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-1 px-4 py-5">
                {isPending && (
                    <p className="px-3 py-3 text-sm font-medium text-[#52636C]">
                        Loading menu...
                    </p>
                )}

                {!isPending && navItems.length === 0 && (
                    <p className="px-3 py-3 text-sm font-medium text-red-500">
                        No dashboard role found
                    </p>
                )}

                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActiveLink(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeDrawer}
                            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold no-underline transition ${active
                                ? 'bg-[#152A38] text-white shadow-lg'
                                : 'text-[#52636C] hover:bg-[#F7FAF9] hover:text-[#152A38]'
                                }`}
                        >
                            <Icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="border-t border-[#DDE7EB] p-4">
                <div className="rounded-2xl bg-[#F7FAF9] p-4">
                    <p className="text-sm font-semibold text-[#10202B]">
                        SkillSwap Pro
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#52636C]">
                        Manage tasks, proposals, projects, and profile settings.
                    </p>
                </div>
            </div>
        </div>
    );
}