'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { authClient } from '@/lib/auth-client';

const navLinks = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Browse Tasks',
        href: '/allTasks',
    },
    {
        label: 'Browse Freelancers',
        href: '/freelancers',
    },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const { data: session } = authClient.useSession();

    const user = session?.user;
    const firstName = user?.name ? user.name.split(' ')[0] : 'User';
    const dashboardHref = user?.role
        ? `/dashboard/${user.role.toLowerCase()}`
        : '/login';

    if (pathname.includes('dashboard')) {
        return null;
    }

    const isActiveLink = (href) => {
        if (href === '/') {
            return pathname === '/';
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const handleLogout = async () => {
        await authClient.signOut();

        setIsMenuOpen(false);
        router.push('/login');
        router.refresh();
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-[#DDE7EB] bg-white/90 backdrop-blur-xl">
            <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8 xl:px-0">
                <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-[#10202B] no-underline"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#152A38] shadow-lg">
                        <span className="text-sm font-bold text-white">SS</span>
                    </div>

                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-bold tracking-tight text-[#10202B]">
                            SKILLSWAP
                        </span>

                        <span className="mt-2 text-sm font-semibold text-[#52636C]">
                            Micro-task marketplace
                        </span>
                    </div>
                </Link>

                <ul className="hidden items-center gap-1 lg:flex">
                    {navLinks.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`rounded-xl px-4 py-2 text-sm font-semibold no-underline transition ${isActiveLink(item.href)
                                        ? 'bg-[#E8EEF1] text-[#152A38]'
                                        : 'text-[#52636C] hover:bg-[#F7FAF9] hover:text-[#152A38]'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center gap-3 lg:flex">
                    {user ? (
                        <>
                            <div className="flex items-center gap-2 rounded-full border border-[#DDE7EB] bg-white px-3 py-2">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || 'User'}
                                        width={32}
                                        height={32}
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#152A38] text-xs font-bold text-white">
                                        {firstName[0]}
                                    </div>
                                )}

                                <span className="text-sm font-semibold text-[#10202B]">
                                    {firstName}
                                </span>
                            </div>

                            <Link
                                href={dashboardHref}
                                className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#E8EEF1] px-5 text-sm font-bold text-[#152A38] no-underline transition hover:bg-[#DDE7EB]"
                            >
                                <MdDashboard className="text-lg" />
                                Dashboard
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="h-12 rounded-xl border border-[#DDE7EB] bg-white px-5 text-sm font-bold text-[#52636C] transition hover:bg-[#F7FAF9] hover:text-[#152A38]"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="rounded-xl px-4 py-2 text-sm font-bold text-[#52636C] no-underline transition hover:bg-[#F7FAF9] hover:text-[#152A38]"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#152A38] px-5 text-sm font-bold text-white no-underline shadow-sm transition hover:bg-[#0F202B]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-3 lg:hidden">
                    {user && (
                        <div className="flex items-center gap-2 rounded-full border border-[#DDE7EB] bg-white px-2 py-2">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || 'User'}
                                    width={34}
                                    height={34}
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#152A38] text-xs font-bold text-white">
                                    {firstName[0]}
                                </div>
                            )}

                            <span className="hidden max-w-20 truncate text-sm font-bold text-[#10202B] sm:block">
                                {firstName}
                            </span>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#DDE7EB] bg-white text-[#152A38] transition hover:bg-[#F7FAF9]"
                    >
                        {isMenuOpen ? (
                            <HiX className="text-2xl" />
                        ) : (
                            <HiMenuAlt3 className="text-2xl" />
                        )}
                    </button>
                </div>
            </header>

            {isMenuOpen && (
                <div className="border-t border-[#DDE7EB] bg-white shadow-lg lg:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 md:px-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex h-12 items-center rounded-2xl px-4 text-sm font-bold no-underline transition ${isActiveLink(item.href)
                                        ? 'bg-[#E8EEF1] text-[#152A38]'
                                        : 'bg-[#F7FAF9] text-[#52636C] hover:bg-[#E8EEF1] hover:text-[#152A38]'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="mt-2 border-t border-[#DDE7EB] pt-4">
                            {user ? (
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <Link
                                        href={dashboardHref}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#152A38] text-sm font-bold text-white no-underline transition hover:bg-[#0F202B]"
                                    >
                                        <MdDashboard className="text-lg" />
                                        Dashboard
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="h-12 rounded-2xl border border-[#DDE7EB] bg-white text-sm font-bold text-[#152A38] transition hover:bg-[#F7FAF9]"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex h-12 items-center justify-center rounded-2xl border border-[#DDE7EB] bg-white text-sm font-bold text-[#152A38] no-underline transition hover:bg-[#F7FAF9]"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex h-12 items-center justify-center rounded-2xl bg-[#152A38] text-sm font-bold text-white no-underline transition hover:bg-[#0F202B]"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}