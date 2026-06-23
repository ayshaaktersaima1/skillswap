'use client';

import { authClient } from '@/lib/auth-client';
import { useState } from 'react';

const PostTask = () => {
    const [loading, setLoading] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const { data: session } = authClient.useSession();

    const ClientId = session?.user?.id;
    const ClientEmail = session?.user?.email;

    const handlePostTask = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;



        const taskData = {
            title: form.title.value,
            category: form.category.value,
            description: form.description.value,
            budget: Number(form.budget.value),
            deadline: form.deadline.value,
            status: 'open',
            createdAt: new Date().toISOString(),
            clientId: ClientId,
            clientEmail: ClientEmail,
        };


        const res = await fetch(`${baseUrl}/api/tasks`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })

        // Later connect this with your backend
        // await fetch('http://localhost:5000/tasks', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(taskData),
        // });

        setLoading(false);
        form.reset();
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Post a Task
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                    Create a new micro-task and publish it for freelancers to send
                    proposals.
                </p>
            </div>

            <form
                onSubmit={handlePostTask}
                className="max-w-3xl rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm"
            >
                <div className="space-y-5">
                    {/* Task Title */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#10202B]">
                            Task Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Example: Design a modern landing page"
                            required
                            className="h-12 w-full rounded-xl border border-[#DDE7EB] bg-white px-4 text-sm font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-[#152A38] focus:ring-4 focus:ring-[#152A38]/10"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#10202B]">
                            Category
                        </label>

                        <select
                            name="category"
                            required
                            defaultValue=""
                            className="h-12 w-full rounded-xl border border-[#DDE7EB] bg-white px-4 text-sm font-medium text-[#10202B] outline-none transition focus:border-[#152A38] focus:ring-4 focus:ring-[#152A38]/10"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="Web Development">Web Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Writing">Writing</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Data Entry">Data Entry</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-[#10202B]">
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Describe what you need, requirements, and expected result..."
                            required
                            rows={6}
                            className="w-full resize-none rounded-xl border border-[#DDE7EB] bg-white px-4 py-3 text-sm font-medium leading-6 text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-[#152A38] focus:ring-4 focus:ring-[#152A38]/10"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Budget */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#10202B]">
                                Budget (USD)
                            </label>

                            <input
                                type="number"
                                name="budget"
                                placeholder="250"
                                min="1"
                                required
                                className="h-12 w-full rounded-xl border border-[#DDE7EB] bg-white px-4 text-sm font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-[#152A38] focus:ring-4 focus:ring-[#152A38]/10"
                            />
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#10202B]">
                                Deadline Date
                            </label>

                            <input
                                type="date"
                                name="deadline"
                                required
                                className="h-12 w-full rounded-xl border border-[#DDE7EB] bg-white px-4 text-sm font-medium text-[#10202B] outline-none transition focus:border-[#152A38] focus:ring-4 focus:ring-[#152A38]/10"
                            />
                        </div>
                    </div>

                    {/* Status Info */}
                    <div className="rounded-2xl border border-[#DDE7EB] bg-[#F7FAF9] p-4">
                        <p className="text-sm font-semibold text-[#10202B]">
                            Default Status: <span className="text-[#152A38]">Open</span>
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#52636C]">
                            After publishing, freelancers will be able to view this task
                            and send proposals.
                        </p>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="h-12 rounded-xl bg-[#152A38] px-6 text-sm font-semibold text-white transition hover:bg-[#0F202B] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Publishing...' : 'Publish Task'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostTask;