import React from 'react';
import SubmitWorkModal from './SubmitWorkModal';

const ActiveProjectCard = async ({ project, freelancersId, freelancersEmail, freelancersName }) => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const taskRes = await fetch(`${baseUrl}/api/tasks/${project.taskId}`, {
        cache: 'no-store',
    });

    const task = await taskRes.json();

    return (
        <article className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                        Active Project
                    </p>

                    <h2 className="mt-3 text-xl font-bold text-[#10202B]">
                        {project.taskTitle}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#52636C]">
                        {task?.description}
                    </p>
                </div>

                <span className={`rounded-full border px-3 py-1 text-xs font-bold ${task?.status === 'completed'
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : 'border-blue-200 bg-blue-50 text-blue-700'
                    }`}>
                    {task?.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#F7FAF9] p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                        Budget
                    </p>

                    <p className="mt-2 text-lg font-bold text-[#10202B]">
                        ${project.proposedBudget}
                    </p>
                </div>

                <div className="rounded-2xl bg-[#F7FAF9] p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                        Category
                    </p>

                    <p className="mt-2 text-lg font-bold text-[#10202B]">
                        {task?.category}
                    </p>
                </div>

                <div className="rounded-2xl bg-[#F7FAF9] p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                        Deadline
                    </p>

                    <p className="mt-2 text-sm font-bold text-[#10202B]">
                        {task?.deadline
                            ? new Date(task.deadline).toLocaleDateString()
                            : 'No deadline'}
                    </p>
                </div>
            </div>

            <div className="mt-6">
                {task?.status === 'in progress' && (
                    <SubmitWorkModal task={task} freelancersId={freelancersId} freelancersEmail={freelancersEmail} freelancersName={freelancersName}></SubmitWorkModal>
                )}

                {task?.status === 'completed' && task?.deliverable_url && (
                    <a
                        href={task.deliverable_url}
                        target="_blank"
                        className="inline-flex h-11 items-center rounded-xl border border-[#DDE7EB] px-5 text-sm font-semibold text-[#152A38] no-underline"
                    >
                        View Deliverable
                    </a>
                )}
            </div>
        </article>
    );
};

export default ActiveProjectCard;