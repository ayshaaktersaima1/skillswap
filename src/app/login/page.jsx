'use client';

import GoogleBtn from '@/components/GoogleBtn';
import Link from 'next/link';

export default function LoginPage() {
    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        const loginData = {
            email: form.email.value,
            password: form.password.value,
        };

        console.log(loginData);

        // Later:
        // 1. Check user from database/auth
        // 2. Get user role
        // 3. Redirect:
        // client -> /client/dashboard
        // freelancer -> /freelancer/dashboard
        // admin -> /admin/dashboard
    };

    return (
        <main className="min-h-screen bg-[#F7FAF9] px-5 py-10 md:px-8">
            <section className="mx-auto flex min-h-[calc(100vh-80px)] w-[95%] items-center justify-center md:w-[90%]">
                <div className="w-full max-w-[540px] rounded-[32px] bg-[#152A38] px-6 py-10 shadow-[0_30px_90px_rgba(21,42,56,0.22)] md:px-12 md:py-14">
                    {/* Header */}
                    <div className="mb-9 text-center">
                        <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/55">
                            SkillSwap
                        </p>

                        <h1 className="text-[34px] font-semibold leading-[42px] tracking-[-0.05em] text-white md:text-[44px] md:leading-[52px]">
                            Welcome back
                        </h1>

                        <p className="mx-auto mt-4 max-w-[390px] text-[15px] leading-[26px] text-white/65">
                            Login to manage your tasks, proposals, projects, and freelance
                            workflow.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
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
                                className="h-[52px] w-full rounded-[14px] border border-white/15 bg-white px-4 text-[15px] font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-white focus:ring-4 focus:ring-white/15"
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
                                placeholder="Enter your password"
                                required
                                className="h-[52px] w-full rounded-[14px] border border-white/15 bg-white px-4 text-[15px] font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-white focus:ring-4 focus:ring-white/15"
                            />
                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            className="mt-7 h-14 w-full rounded-[16px] bg-white text-[15px] font-semibold text-[#152A38] shadow-[0_14px_36px_rgba(255,255,255,0.16)] transition hover:bg-[#F7FAF9]"
                        >
                            Login
                        </button>
                    </form>

                    <div className="my-7 flex items-center gap-4">
                        <span className="h-px flex-1 bg-white/15" />
                        <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/45">
                            Or
                        </span>
                        <span className="h-px flex-1 bg-white/15" />
                    </div>

                    <GoogleBtn label="Sign in with Google" />

                    {/* Register Link */}
                    <p className="mt-7 text-center text-[14px] text-white/60">
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