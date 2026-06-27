'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { authClient } from '@/lib/auth-client';

export default function Banner() {
    const { data: session } = authClient.useSession();

    const user = session?.user;
    const role = user?.role?.toLowerCase();

    const isClient = user && role === 'client';
    const isFreelancer = user && role === 'freelancer';

    return (
        <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#10202B] px-5 py-16 md:px-8">
            <motion.div
                initial={{ scale: 1.28 }}
                animate={{ scale: 1 }}
                transition={{
                    duration: 10,
                    ease: 'easeOut',
                }}
                className="absolute -inset-10 bg-[url('/assets/banner.jpg')] bg-cover bg-center"
            />

            <div className="absolute inset-0 bg-black/70"></div>

            <div className="relative z-10 mx-auto flex w-[95%] max-w-5xl flex-col items-center justify-center text-center md:w-[90%]">
                <div className="mb-5 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/80 md:text-sm">
                        Freelance Micro-Task Platform
                    </p>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                    }}
                    className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
                >
                    Get your tasks done by skilled freelancers
                </motion.h1>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 md:text-lg md:leading-8">
                    Post small tasks, compare proposals, and connect with trusted
                    freelancers through a simple, secure marketplace.
                </p>

                {(isClient || isFreelancer) && (
                    <div className="mt-9 w-full max-w-xs">
                        {isClient && (
                            <Link
                                href="/dashboard/client/post-task"
                                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-white px-8 text-base font-bold text-[#152A38] no-underline transition hover:bg-[#F7FAF9]"
                            >
                                Post a Task
                            </Link>
                        )}

                        {isFreelancer && (
                            <Link
                                href="/allTasks"
                                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-white px-8 text-base font-bold text-[#152A38] no-underline transition hover:bg-[#F7FAF9]"
                            >
                                Browse Tasks
                            </Link>
                        )}
                    </div>
                )}

                <p className="mt-5 text-sm font-medium text-white/60">
                    For clients, freelancers, remote workers, startups, and small businesses.
                </p>
            </div>
        </section>
    );
}