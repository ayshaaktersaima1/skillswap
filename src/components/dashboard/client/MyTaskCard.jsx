'use client'

import Link from "next/link";
import DeleteTaskBtn from "./DeleteTaskBtn";
import ReviewForm from "./ReviewForm";

const statusStyles = {
    open: 'bg-green-50 text-green-700 border-green-200',
    'in progress': 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-[#E8EEF1] text-[#152A38] border-[#DDE7EB]',
};

export default function MyTaskCard({ task }) {
    const status = task.status?.toLowerCase() || 'open';

    const statusLabel =
        status === 'in progress'
            ? 'In Progress'
            : status.charAt(0).toUpperCase() + status.slice(1);

    const canEdit = status === 'open';

    const hasApprovedProposal =
        task.approvedProposalId || task.hasApprovedProposal || status !== 'open';

    const canDelete = !hasApprovedProposal;

    const formattedDeadline = task.deadline
        ? new Date(task.deadline).toLocaleDateString()
        : 'No deadline';

    return (
        <article className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                    <span className="rounded-full bg-[#E8EEF1] px-3 py-1 text-xs font-semibold text-[#152A38]">
                        {task.category}
                    </span>

                    <h2 className="mt-4 text-xl font-bold leading-7 tracking-tight text-[#10202B]">
                        {task.title}
                    </h2>
                </div>

                <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[status] || statusStyles.open}`}
                >
                    {statusLabel}
                </span>
            </div>

            <p className="line-clamp-3 text-sm leading-6 text-[#52636C]">
                {task.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#DDE7EB] pt-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                        Budget
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#10202B]">
                        ${task.budget}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                        Deadline
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#10202B]">
                        {formattedDeadline}
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {canEdit ? (
                    <Link
                        href={`/dashboard/client/my-tasks/updateTask/${task._id}`}
                        className="flex h-11 flex-1 items-center justify-center rounded-xl border border-[#DDE7EB] bg-white text-sm font-semibold text-[#152A38] no-underline transition hover:bg-[#F7FAF9]"
                    >
                        Edit Task
                    </Link>
                ) : (
                    <button
                        type="button"
                        disabled
                        className="h-11 flex-1 rounded-xl border border-[#DDE7EB] bg-white text-sm font-semibold text-[#152A38] opacity-50"
                    >
                        Edit Task
                    </button>
                )}

                <DeleteTaskBtn
                    task={task}
                    canDelete={canDelete}
                />
            </div>

            {status === 'completed' && (
                <ReviewForm task={task} />
            )}

            {!canEdit && (
                <p className="mt-3 text-xs leading-5 text-[#52636C]">
                    Editing is only available while the task status is Open.
                </p>
            )}

            {!canDelete && (
                <p className="mt-2 text-xs leading-5 text-[#52636C]">
                    Delete is disabled because a proposal has already been approved.
                </p>
            )}
        </article>
    );
}