'use client';

import { Button, Link } from '@heroui/react';

export default function Banner() {
    return (
        <section className="bg-[#F7FAF9] px-5 py-8 md:px-8 md:py-10">
            <div className="mx-auto w-[95%] md:w-[90%]">
                <div className="relative min-h-[640px] overflow-hidden rounded-[28px] bg-[url('/assets/banner.jpg')] bg-cover bg-center bg-no-repeat shadow-[0_30px_90px_rgba(21,42,56,0.18)] md:min-h-[760px] md:rounded-[32px]">
                    {/* Dark luxury overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#061016]/90 via-[#061016]/60 to-[#061016]/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061016]/60 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="relative z-10 flex min-h-[640px] flex-col justify-center px-6 py-14 md:min-h-[760px] md:px-12 lg:px-20 xl:px-24">
                        <div className="max-w-[980px] animate-fade-up">
                            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-xl">
                                <span className="text-[13px] font-semibold tracking-[-0.01em] text-white/80">
                                    Freelance Micro-Task Platform
                                </span>
                            </div>

                            <h1 className="max-w-[960px] text-[44px] font-semibold leading-[52px] tracking-[-0.055em] text-white md:text-[76px] md:leading-[84px] lg:text-[92px] lg:leading-[98px]">
                                Get your tasks done by skilled freelancers
                            </h1>

                            <p className="mt-7 max-w-[650px] text-[16px] leading-[28px] text-white/75 md:text-[19px] md:leading-[34px]">
                                Post small tasks, connect with trusted freelancers, compare
                                proposals, and move from idea to completed work through a
                                simple, secure marketplace.
                            </p>
                        </div>

                        {/* Glass action box */}
                        <div className="mt-12 w-full max-w-[720px] animate-fade-up-delay rounded-[24px] border border-white/15 bg-white/10 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:rounded-[28px] md:p-5">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <Button
                                    as={Link}
                                    href="/register"
                                    className="h-14 rounded-full bg-white text-[15px] font-semibold text-[#152A38] shadow-[0_14px_36px_rgba(255,255,255,0.18)] transition hover:bg-[#F7FAF9]"
                                >
                                    Post a Task
                                </Button>

                                <Button
                                    as={Link}
                                    href="/tasks"
                                    variant="bordered"
                                    className="h-14 rounded-full border border-white/40 bg-white/10 text-[15px] font-semibold text-white backdrop-blur-xl transition hover:bg-white/20"
                                >
                                    Browse Tasks
                                </Button>
                            </div>

                            <p className="mt-4 text-center text-[13px] font-medium text-white/55">
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