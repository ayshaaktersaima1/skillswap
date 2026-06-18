'use client';

import { useState } from 'react';
import { Link, Button } from '@heroui/react';
import { usePathname } from 'next/navigation';

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

    const isActiveLink = (href) => {
        if (href === '/') {
            return pathname === '/';
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-[#DDE7EB] bg-white/85 backdrop-blur-xl">
            <header className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:h-[72px] md:px-8 xl:px-0">
                {/* Logo */}
                <Link
                    href="/"
                    onPress={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-[#10202B] no-underline"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#152A38] shadow-[0_8px_20px_rgba(21,42,56,0.24)]">
                        <span className="text-[15px] font-bold text-white">SS</span>
                    </div>

                    <div className="flex flex-col leading-none">
                        <span className="text-[18px] font-bold tracking-[-0.03em] text-[#10202B]">
                            SKILLSWAP
                        </span>
                        <span className="mt-1 hidden text-[11px] font-medium text-[#52636C] sm:block">
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
                                className={`rounded-[10px] px-3 py-2 text-[14px] font-medium no-underline transition ${isActiveLink(item.href)
                                    ? 'bg-[#E8EEF1] text-[#152A38]'
                                    : 'text-[#52636C] hover:bg-[#F7FAF9] hover:text-[#152A38]'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Auth Buttons */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/login"
                        className="rounded-[10px] px-3 py-2 text-[14px] font-semibold text-[#52636C] no-underline transition hover:bg-[#F7FAF9] hover:text-[#152A38]"
                    >
                        Login
                    </Link>

                    <Link

                        href="/register"
                        className="h-10 rounded-[10px] bg-[#152A38] px-4 text-[14px] font-semibold text-white shadow-sm transition hover:bg-[#0F202B] hover:shadow-[0_12px_28px_rgba(21,42,56,0.28)]"
                    >
                        Register
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#DDE7EB] bg-white text-[#152A38] transition hover:bg-[#F7FAF9] md:hidden"
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
                    <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-4">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onPress={() => setIsMenuOpen(false)}
                                className={`rounded-[12px] px-4 py-3 text-[15px] font-medium no-underline transition ${isActiveLink(item.href)
                                    ? 'bg-[#E8EEF1] text-[#152A38]'
                                    : 'text-[#52636C] hover:bg-[#F7FAF9] hover:text-[#152A38]'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#DDE7EB] pt-4">
                            <Button
                                as={Link}
                                href="/login"
                                onPress={() => setIsMenuOpen(false)}
                                className="h-11 rounded-[10px] border border-[#DDE7EB] bg-white text-[14px] font-semibold text-[#152A38]"
                            >
                                Login
                            </Button>

                            <Button
                                as={Link}
                                href="/register"
                                onPress={() => setIsMenuOpen(false)}
                                className="h-11 rounded-[10px] bg-[#152A38] text-[14px] font-semibold text-white"
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}