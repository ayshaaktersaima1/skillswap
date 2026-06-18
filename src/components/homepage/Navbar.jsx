'use client';

import { useState } from 'react';
import { Link, Button } from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const navLinks = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Browse Tasks',
        href: '/tasks',
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

    const dashboardHref = `/dashboard/${user?.role}`;

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
        <nav className="sticky top-0 z-50 w-full border-b border-[#DDE7EB] bg-white/85 backdrop-blur-xl">
            <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8 xl:px-0">
                {/* Logo */}
                <Link
                    href="/"
                    onPress={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-[#10202B] no-underline"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#152A38] shadow-lg">
                        <span className="text-sm font-bold text-white">SS</span>
                    </div>

                    <div className="flex flex-col leading-none">
                        <span className="text-lg font-bold tracking-tight text-[#10202B]">
                            SKILLSWAP
                        </span>

                        <span className="mt-1 hidden text-xs font-medium text-[#52636C] sm:block">
                            Micro-task marketplace
                        </span>
                    </div>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden items-center gap-1 md:flex">
                    {navLinks.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`rounded-xl px-3 py-2 text-sm font-medium no-underline transition ${isActiveLink(item.href)
                                    ? 'bg-[#E8EEF1] text-[#152A38]'
                                    : 'text-[#52636C] hover:bg-[#F7FAF9] hover:text-[#152A38]'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Right Side */}
                <div className="hidden items-center gap-3 md:flex">
                    {user ? (
                        <>
                            {/* User Info */}
                            <div className="flex items-center gap-2 rounded-full border border-[#DDE7EB] bg-white px-3 py-2">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name || 'User'}
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

                            {/* Dashboard */}
                            <Link
                                href={dashboardHref}
                                className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#E8EEF1] px-4 text-sm font-semibold text-[#152A38] no-underline transition hover:bg-[#DDE7EB]"
                            >
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M4 4H10V10H4V4Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M14 4H20V10H14V4Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M4 14H10V20H4V14Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M14 14H20V20H14V14Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Dashboard
                            </Link>

                            {/* Logout */}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="h-10 rounded-xl border border-[#DDE7EB] bg-white px-4 text-sm font-semibold text-[#52636C] transition hover:bg-[#F7FAF9] hover:text-[#152A38]"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="rounded-xl px-3 py-2 text-sm font-semibold text-[#52636C] no-underline transition hover:bg-[#F7FAF9] hover:text-[#152A38]"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#152A38] px-4 text-sm font-semibold text-white no-underline shadow-sm transition hover:bg-[#0F202B] hover:shadow-lg"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DDE7EB] bg-white text-[#152A38] transition hover:bg-[#F7FAF9] md:hidden"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 7h16M4 12h16M4 17h16"
                            />
                        )}
                    </svg>
                </button>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="border-t border-[#DDE7EB] bg-white md:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onPress={() => setIsMenuOpen(false)}
                                className={`rounded-xl px-4 py-3 text-sm font-medium no-underline transition ${isActiveLink(item.href)
                                    ? 'bg-[#E8EEF1] text-[#152A38]'
                                    : 'text-[#52636C] hover:bg-[#F7FAF9] hover:text-[#152A38]'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="mt-3 border-t border-[#DDE7EB] pt-4">
                            {user ? (
                                <div className="space-y-3">
                                    {/* Mobile User Info */}
                                    <div className="flex items-center gap-3 rounded-2xl border border-[#DDE7EB] bg-[#F7FAF9] p-3">
                                        {user.image ? (
                                            <img
                                                src={user.image}
                                                alt={user.name || 'User'}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#152A38] text-sm font-bold text-white">
                                                {firstName[0]}
                                            </div>
                                        )}

                                        <div>
                                            <p className="text-sm font-semibold text-[#10202B]">
                                                {firstName}
                                            </p>
                                            <p className="text-xs font-medium capitalize text-[#52636C]">
                                                {user.role || 'member'}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        href={dashboardHref}
                                        onPress={() => setIsMenuOpen(false)}
                                        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#152A38] text-sm font-semibold text-white no-underline"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M4 4H10V10H4V4Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14 4H20V10H14V4Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M4 14H10V20H4V14Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14 14H20V20H14V14Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Dashboard
                                    </Link>

                                    <Button
                                        onPress={handleLogout}
                                        className="h-11 w-full rounded-xl border border-[#DDE7EB] bg-white text-sm font-semibold text-[#152A38]"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        as={Link}
                                        href="/login"
                                        onPress={() => setIsMenuOpen(false)}
                                        className="h-11 rounded-xl border border-[#DDE7EB] bg-white text-sm font-semibold text-[#152A38]"
                                    >
                                        Login
                                    </Button>

                                    <Button
                                        as={Link}
                                        href="/register"
                                        onPress={() => setIsMenuOpen(false)}
                                        className="h-11 rounded-xl bg-[#152A38] text-sm font-semibold text-white"
                                    >
                                        Register
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}