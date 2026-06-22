'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from '@heroui/react';
import GoogleBtn from '@/components/GoogleBtn';
import { authClient } from '@/lib/auth-client';

export default function RegisterPage() {
    const [role, setRole] = useState('client');

    const onSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        const skills =
            role === 'freelancer'
                ? form.skills.value
                    .split(',')
                    .map(skill => skill.trim())
                    .filter(Boolean)
                : [];

        const userData = {
            name: form.name.value,
            email: form.email.value,
            image: form.image.value,
            password: form.password.value,
            role,
            isBlocked: false,

            skills,
            bio: role === 'freelancer' ? form.bio.value : '',
            hourlyRate: role === 'freelancer' ? Number(form.hourlyRate.value) : 0,
        };

        const { data, error } = await authClient.signUp.email({
            email: userData.email,
            password: userData.password,
            name: userData.name,
            image: userData.image,
            role: userData.role,
            plan: userData.plan,

            skills: userData.skills,
            bio: userData.bio,
            hourlyRate: userData.hourlyRate,

            callbackURL: '/dashboard',
        });

        if (error) {
            alert(error.message);
        } else {
            alert('Account created');
        }
    };

    return (
        <main className="min-h-screen bg-[#F7FAF9] px-5 py-10 md:px-8">
            <section className="mx-auto flex min-h-screen w-[95%] items-center justify-center md:w-[90%]">
                <div className="w-full max-w-xl rounded-3xl bg-[#152A38] px-6 py-10 shadow-2xl md:px-12 md:py-14">
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

                    <Form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <TextField isRequired name="name" type="text">
                            <Label className="text-white/75">Name</Label>
                            <Input placeholder="Enter your full name" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return 'Please enter a valid email address';
                                }

                                return null;
                            }}
                        >
                            <Label className="text-white/75">Email</Label>
                            <Input placeholder="Enter your email address" />
                            <FieldError />
                        </TextField>

                        <TextField isRequired name="image" type="url">
                            <Label className="text-white/75">Profile Photo Link</Label>
                            <Input placeholder="Paste your profile image URL" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            minLength={6}
                            validate={(value) => {
                                if (value.length < 6) {
                                    return 'Password must be at least 6 characters long';
                                }

                                if (!/[A-Z]/.test(value)) {
                                    return 'Password must contain at least one capital letter';
                                }

                                if (!/[a-z]/.test(value)) {
                                    return 'Password must contain at least one lowercase letter';
                                }

                                return null;
                            }}
                        >
                            <Label className="text-white/75">Password</Label>
                            <Input placeholder="Create a password" />
                            <Description className="text-white/60">
                                At least 6 characters long, one capital letter, and one lowercase letter.
                            </Description>
                            <FieldError />
                        </TextField>

                        <div>
                            <Label className="mb-3 block text-sm font-semibold text-white/75">
                                Select Role
                            </Label>

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
                                            className={`mt-1 text-xs leading-5 ${role === 'client'
                                                ? 'text-[#52636C]'
                                                : 'text-white/60'
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

                        {role === 'freelancer' && (
                            <div className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/10 p-5">
                                <TextField isRequired name="skills" type="text">
                                    <Label className="text-white/75">Skills</Label>
                                    <Input placeholder="React, Node.js, MongoDB" />
                                    <Description className="text-white/60">
                                        Separate skills with commas.
                                    </Description>
                                    <FieldError />
                                </TextField>

                                <TextField isRequired name="bio" type="text">
                                    <Label className="text-white/75">Bio</Label>
                                    <Input placeholder="Write a short professional bio" />
                                    <FieldError />
                                </TextField>

                                <TextField isRequired name="hourlyRate" type="number">
                                    <Label className="text-white/75">
                                        Hourly Rate (USD)
                                    </Label>
                                    <Input placeholder="15" />
                                    <FieldError />
                                </TextField>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="mt-3 h-14 w-full rounded-2xl bg-white text-sm font-semibold text-[#152A38] shadow-xl transition hover:bg-[#F7FAF9]"
                        >
                            Create Account
                        </Button>
                    </Form>

                    <div className="my-7 flex items-center gap-4">
                        <span className="h-px flex-1 bg-white/20" />

                        <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                            Or
                        </span>

                        <span className="h-px flex-1 bg-white/20" />
                    </div>

                    <GoogleBtn label="Sign up with Google" />

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