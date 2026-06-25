'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const Footer = () => {
    const pathname = usePathname();

    if (pathname.includes('dashboard')) {
        return null;
    }

    return (
        <footer className="bg-[#10202B] px-5 pt-16 pb-8 text-white md:px-8">
            <div className="mx-auto grid w-[95%] grid-cols-1 gap-10 sm:grid-cols-2 md:w-[90%] lg:grid-cols-4">
                {/* Logo + About */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-3 no-underline">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#152A38]">
                            SS
                        </div>

                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-white">
                                SKILLSWAP
                            </h2>

                            <p className="text-xs font-medium text-white/60">
                                Micro-task marketplace
                            </p>
                        </div>
                    </Link>

                    <p className="max-w-sm text-sm leading-6 text-white/60">
                        SKILLSWAP helps clients post micro-tasks and connect with skilled
                        freelancers for fast, focused, and reliable work.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="mb-5 text-lg font-bold text-white">
                        Quick Links
                    </h3>

                    <div className="flex flex-col gap-3 text-sm text-white/60">
                        <Link
                            href="/"
                            className="w-fit no-underline transition hover:text-white"
                        >
                            Home
                        </Link>

                        <Link
                            href="/allTasks"
                            className="w-fit no-underline transition hover:text-white"
                        >
                            Browse Tasks
                        </Link>

                        <Link
                            href="/freelancers"
                            className="w-fit no-underline transition hover:text-white"
                        >
                            Browse Freelancers
                        </Link>

                        <Link
                            href="/login"
                            className="w-fit no-underline transition hover:text-white"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="w-fit no-underline transition hover:text-white"
                        >
                            Register
                        </Link>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="mb-5 text-lg font-bold text-white">
                        Contact Info
                    </h3>

                    <div className="space-y-4 text-sm text-white/60">
                        <div className="flex items-center gap-3">
                            <MdEmail className="text-xl text-white" />
                            <p>support@skillswap.com</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <MdLocationOn className="text-xl text-white" />
                            <p>Chittagong, Bangladesh</p>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="mb-5 text-lg font-bold text-white">
                        Follow Us
                    </h3>

                    <div className="flex items-center gap-4">
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-[#152A38]"
                        >
                            <FaFacebookF />
                        </Link>

                        <Link
                            href="https://github.com"
                            target="_blank"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-[#152A38]"
                        >
                            <FaGithub />
                        </Link>

                        <Link
                            href="https://x.com"
                            target="_blank"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-[#152A38]"
                        >
                            <FaXTwitter />
                        </Link>

                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-[#152A38]"
                        >
                            <FaInstagram />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-12 w-[95%] border-t border-white/10 pt-6 text-center text-sm text-white/50 md:w-[90%]">
                © 2026 SKILLSWAP. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;