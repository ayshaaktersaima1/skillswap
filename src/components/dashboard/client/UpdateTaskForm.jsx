'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Form, Input, Label, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify';

const UpdateTaskForm = ({ task }) => {
    const { _id } = task;


    const router = useRouter();

    const deadlineValue = task?.deadline
        ? new Date(task.deadline).toISOString().slice(0, 10)
        : '';

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const taskInfo = Object.fromEntries(formData.entries());

        taskInfo.budget = Number(taskInfo.budget);

        const { data: tokenData } = await authClient.token();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/tasks/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(taskInfo),
        });

        if (!res.ok) {
            alert('Failed to update task');
            return;
        }
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;



        toast.success('Task updated successfully');
        router.push('/dashboard/client/my-tasks');
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Update Task
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                    Update your task information while the task is still open.
                </p>
            </div>

            <Form
                onSubmit={onSubmit}
                className="flex w-full max-w-3xl flex-col gap-4 rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm"
            >
                <TextField
                    name="title"
                    type="text"
                    defaultValue={task?.title}
                    isRequired
                >
                    <Label>Task Title</Label>
                    <Input placeholder="Task Title" />
                </TextField>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#10202B]">
                        Category
                    </label>

                    <select
                        name="category"
                        defaultValue={task?.category || ''}
                        required
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

                <TextField
                    name="description"
                    type="text"
                    defaultValue={task?.description}
                    isRequired
                >
                    <Label>Description</Label>
                    <Input placeholder="Task description" />
                </TextField>

                <TextField
                    name="budget"
                    type="number"
                    defaultValue={String(task?.budget || '')}
                    isRequired
                >
                    <Label>Budget (USD)</Label>
                    <Input placeholder="Budget" />
                </TextField>

                <TextField
                    name="deadline"
                    type="date"
                    defaultValue={deadlineValue}
                    isRequired
                >
                    <Label>Deadline Date</Label>
                    <Input />
                </TextField>

                <Button
                    type="submit"
                    className="mt-5 h-12 w-full rounded-xl bg-[#152A38] text-sm font-semibold text-white"
                >
                    Update Task
                </Button>
            </Form>
        </div>
    );
};

export default UpdateTaskForm;