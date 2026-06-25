import UpdateTaskForm from '@/components/dashboard/client/UpdateTaskForm';
import { headers } from 'next/headers';
import React from 'react';

const UpdateTaskPage = async ({ params }) => {
    const { id } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const res = await fetch(`${baseUrl}/api/tasks/${id}`);
    const task = await res.json();

    return (
        <div>
            <UpdateTaskForm task={task}></UpdateTaskForm>
        </div>
    );
};

export default UpdateTaskPage;