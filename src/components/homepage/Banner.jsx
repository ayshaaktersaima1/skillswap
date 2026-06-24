'use client';

import Image from 'next/image';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function Banner() {
    const { data: session } = authClient.useSession();

    const user = session?.user;
    const role = user?.role?.toLowerCase();

    const isClient = user && role === 'client';

    return (
        <section className="bg-[#F7FAF9] px-5 py-8 md:px-8 md:py-10">
            <div className="mx-auto w-[95%] md:w-[90%]">
                <div className="relative min-h-[640px] overflow-hidden rounded-3xl shadow-2xl md:min-h-[760px]">
                    <Image
                        src="/assets/banner.jpg"
                        alt="SkillSwap banner"
                        fill
                        priority
                        className="object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#061016] via-[#061016]/70 to-[#061016]/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061016]/70 via-transparent to-transparent" />

                    <div className="relative z-10 flex min-h-[640px] flex-col justify-center px-6 py-14 md:min-h-[760px] md:px-12 lg:px-20">
                        <div className="max-w-5xl">
                            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-xl">
                                <span className="text-sm font-semibold text-white/80">
                                    Freelance Micro-Task Platform
                                </span>
                            </div>

                            <h1 className="max-w-5xl text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
                                Get your tasks done by skilled freelancers
                            </h1>

                            <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
                                Post small tasks, connect with trusted freelancers, compare
                                proposals, and move from idea to completed work through a
                                simple, secure marketplace.
                            </p>
                        </div>

                        <div className="mt-12 w-full max-w-2xl rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl md:p-5">
                            <div className="flex flex-col gap-3 sm:flex-row">
                                {isClient && (
                                    <Link
                                        href="/dashboard/client/post-task"
                                        className="inline-flex h-14 flex-1 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#152A38] no-underline transition hover:bg-[#F7FAF9]"
                                    >
                                        Post a Task
                                    </Link>
                                )}

                                <Link
                                    href="/allTasks"
                                    className="inline-flex h-14 flex-1 items-center justify-center rounded-full border border-white/40 bg-white/10 text-sm font-semibold text-white no-underline backdrop-blur-xl transition hover:bg-white/20"
                                >
                                    Browse Tasks
                                </Link>
                            </div>

                            <p className="mt-4 text-center text-sm font-medium text-white/55">
                                For clients, freelancers, remote workers, startups, and small
                                businesses.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}