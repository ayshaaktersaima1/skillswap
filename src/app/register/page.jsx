'use client';

import { useState } from 'react';
import Link from 'next/link';
import GoogleBtn from '@/components/GoogleBtn';

export default function RegisterPage() {
    const [role, setRole] = useState('client');

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        const userData = {
            name: form.name.value,
            email: form.email.value,
            image: form.image.value,
            password: form.password.value,
            role,
        };

        console.log(userData);
    };

    return (
        <main className="min-h-screen bg-[#F7FAF9] px-5 py-10 md:px-8">
            <section className="mx-auto flex min-h-[calc(100vh-80px)] w-[95%] items-center justify-center md:w-[90%]">
                <div className="w-full max-w-[620px] rounded-[32px] bg-[#152A38] px-6 py-10 shadow-[0_30px_90px_rgba(21,42,56,0.22)] md:px-12 md:py-14">
                    {/* Header */}
                    <div className="mb-9 text-center">
                        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/55">
                            SkillSwap
                        </p>

                        <h1 className="text-[34px] font-semibold leading-[42px] tracking-[-0.05em] text-white md:text-[44px] md:leading-[52px]">
                            Create your account
                        </h1>

                        <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-[26px] text-white/65">
                            Join as a client to post tasks or as a freelancer to find
                            micro-work opportunities.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-white/75">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                required
                                className="h-13 w-full rounded-[14px] border border-white/15 bg-white px-4 text-[15px] font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-white focus:ring-4 focus:ring-white/15"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-white/75">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                                className="h-13 w-full rounded-[14px] border border-white/15 bg-white px-4 text-[15px] font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-white focus:ring-4 focus:ring-white/15"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-white/75">
                                Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                placeholder="Paste your profile image URL"
                                required
                                className="h-13 w-full rounded-[14px] border border-white/15 bg-white px-4 text-[15px] font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-white focus:ring-4 focus:ring-white/15"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-white/75">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                required
                                className="h-13 w-full rounded-[14px] border border-white/15 bg-white px-4 text-[15px] font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-white focus:ring-4 focus:ring-white/15"
                            />
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="mb-3 block text-[13px] font-semibold text-white/75">
                                Select Role
                            </label>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => setRole('client')}
                                    className={`flex min-h-[96px] w-full flex-col justify-between rounded-[16px] border px-5 py-4 text-left transition ${role === 'client'
                                        ? 'border-white bg-white text-[#152A38]'
                                        : 'border-white/20 bg-white/10 text-white hover:bg-white/15'
                                        }`}
                                >
                                    <div>
                                        <p className="text-[15px] font-semibold">Client</p>
                                        <p
                                            className={`mt-1 text-[13px] leading-[20px] ${role === 'client' ? 'text-[#52636C]' : 'text-white/55'
                                                }`}
                                        >
                                            Post tasks and hire freelancers
                                        </p>
                                    </div>

                                    <span
                                        className={`mt-4 flex h-5 w-5 items-center justify-center rounded-full border ${role === 'client'
                                            ? 'border-[#152A38] bg-[#152A38]'
                                            : 'border-white/40'
                                            }`}
                                    >
                                        {role === 'client' && <span className="h-2 w-2 rounded-full bg-white" />}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setRole('freelancer')}
                                    className={`flex min-h-[96px] w-full flex-col justify-between rounded-[16px] border px-5 py-4 text-left transition ${role === 'freelancer'
                                        ? 'border-white bg-white text-[#152A38]'
                                        : 'border-white/20 bg-white/10 text-white hover:bg-white/15'
                                        }`}
                                >
                                    <div>
                                        <p className="text-[15px] font-semibold">Freelancer</p>
                                        <p
                                            className={`mt-1 text-[13px] leading-5 ${role === 'freelancer' ? 'text-[#52636C]' : 'text-white/55'
                                                }`}
                                        >
                                            Find tasks and send proposals
                                        </p>
                                    </div>

                                    <span
                                        className={`mt-4 flex h-5 w-5 items-center justify-center rounded-full border ${role === 'freelancer'
                                            ? 'border-[#152A38] bg-[#152A38]'
                                            : 'border-white/40'
                                            }`}
                                    >
                                        {role === 'freelancer' && (
                                            <span className="h-2 w-2 rounded-full bg-white" />
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="mt-7 h-14 w-full rounded-[16px] bg-white text-[15px] font-semibold text-[#152A38] shadow-[0_14px_36px_rgba(255,255,255,0.16)] transition hover:bg-[#F7FAF9]"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="my-7 flex items-center gap-4">
                        <span className="h-px flex-1 bg-white/15" />
                        <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/45">
                            Or
                        </span>
                        <span className="h-px flex-1 bg-white/15" />
                    </div>

                    <GoogleBtn label="Sign up with Google" />

                    {/* Login Link */}
                    <p className="mt-7 text-center text-[14px] text-white/60">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-semibold text-white underline-offset-4 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}