'use client';

import { useState } from 'react';
import Link from 'next/link';
import GoogleBtn from '@/components/GoogleBtn';
import { authClient } from '@/lib/auth-client';

export default function RegisterPage() {
    const [role, setRole] = useState('client');

    const handleRegister = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        const userData = {
            name: form.name.value,
            email: form.email.value,
            image: form.image.value,
            password: form.password.value,
            role,
        };
        console.log('nee', userData)

        const { data, error } = await authClient.signUp.email({
            email: userData?.email,
            password: userData?.password,
            name: userData?.name,
            image: userData?.image,
            role: userData?.role,
            plan: 'free',
            callbackURL: "/dashboard"
        })
        console.log('khaa', data?.user)
        if (error) {
            alert(error.message)
        }
        else {
            alert('account created')
        }

    };

    return (
        <main className="min-h-screen bg-[#F7FAF9] px-5 py-10 md:px-8">
            <section className="mx-auto flex min-h-screen w-[95%] items-center justify-center md:w-[90%]">
                <div className="w-full max-w-xl rounded-3xl bg-[#152A38] px-6 py-10 shadow-2xl md:px-12 md:py-14">
                    {/* Header */}
                    <div className="mb-9 text-center">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">
                            SkillSwap
                        </p>

                        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                            Create your account
                        </h1>

                        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/70">
                            Join as a client to post tasks or as a freelancer to find
                            micro-work opportunities.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-white/75">
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                required
                                className="h-14 w-full rounded-xl border border-white/20 bg-white px-4 text-sm font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-white focus:ring-4 focus:ring-white/20"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-white/75">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                                className="h-14 w-full rounded-xl border border-white/20 bg-white px-4 text-sm font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-white focus:ring-4 focus:ring-white/20"
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-white/75">
                                Image URL
                            </label>

                            <input
                                type="url"
                                name="image"
                                placeholder="Paste your profile image URL"
                                required
                                className="h-14 w-full rounded-xl border border-white/20 bg-white px-4 text-sm font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-white focus:ring-4 focus:ring-white/20"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-white/75">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                required
                                className="h-14 w-full rounded-xl border border-white/20 bg-white px-4 text-sm font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-white focus:ring-4 focus:ring-white/20"
                            />
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="mb-3 block text-sm font-semibold text-white/75">
                                Select Role
                            </label>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => setRole('client')}
                                    className={`flex min-h-24 w-full flex-col justify-between rounded-2xl border px-5 py-4 text-left transition ${role === 'client'
                                        ? 'border-white bg-white text-[#152A38]'
                                        : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    <div>
                                        <p className="text-sm font-semibold">Client</p>

                                        <p
                                            className={`mt-1 text-xs leading-5 ${role === 'client' ? 'text-[#52636C]' : 'text-white/60'
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
                                        {role === 'client' && (
                                            <span className="h-2 w-2 rounded-full bg-white" />
                                        )}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setRole('freelancer')}
                                    className={`flex min-h-24 w-full flex-col justify-between rounded-2xl border px-5 py-4 text-left transition ${role === 'freelancer'
                                        ? 'border-white bg-white text-[#152A38]'
                                        : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    <div>
                                        <p className="text-sm font-semibold">Freelancer</p>

                                        <p
                                            className={`mt-1 text-xs leading-5 ${role === 'freelancer'
                                                ? 'text-[#52636C]'
                                                : 'text-white/60'
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
                            className="mt-7 h-14 w-full rounded-2xl bg-white text-sm font-semibold text-[#152A38] shadow-xl transition hover:bg-[#F7FAF9]"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="my-7 flex items-center gap-4">
                        <span className="h-px flex-1 bg-white/20" />

                        <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                            Or
                        </span>

                        <span className="h-px flex-1 bg-white/20" />
                    </div>

                    <GoogleBtn label="Sign up with Google" />

                    {/* Login Link */}
                    <p className="mt-7 text-center text-sm text-white/60">
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