'use client';

import GoogleBtn from '@/components/GoogleBtn';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

export default function LoginPage() {
    const handleLogin = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        const loginData = {
            email: form.email.value,
            password: form.password.value,
        };

        const { data, error } = await authClient.signIn.email({

            email: loginData?.email,
            password: loginData?.password,
            callbackURL: "/",

        })


    };

    return (
        <main className="min-h-screen bg-[#F7FAF9] px-5 py-10 md:px-8">
            <section className="mx-auto flex min-h-screen w-[95%] items-center justify-center md:w-[90%]">
                <div className="w-full max-w-lg rounded-3xl bg-[#152A38] px-6 py-10 shadow-2xl md:px-12 md:py-14">
                    {/* Header */}
                    <div className="mb-9 text-center">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">
                            SkillSwap
                        </p>

                        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                            Welcome back
                        </h1>

                        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-white/70">
                            Login to manage your tasks, proposals, projects, and freelance
                            workflow.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
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

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-white/75">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                className="h-14 w-full rounded-xl border border-white/20 bg-white px-4 text-sm font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-white focus:ring-4 focus:ring-white/20"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="mt-7 h-14 w-full rounded-2xl bg-white text-sm font-semibold text-[#152A38] shadow-xl transition hover:bg-[#F7FAF9]"
                        >
                            Login
                        </button>
                    </form>

                    <div className="my-7 flex items-center gap-4">
                        <span className="h-px flex-1 bg-white/20" />

                        <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                            Or
                        </span>

                        <span className="h-px flex-1 bg-white/20" />
                    </div>

                    <GoogleBtn label="Sign in with Google" />

                    {/* Register Link */}
                    <p className="mt-7 text-center text-sm text-white/60">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/register"
                            className="font-semibold text-white underline-offset-4 hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}