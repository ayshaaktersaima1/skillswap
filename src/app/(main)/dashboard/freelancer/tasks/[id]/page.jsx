import ProposalForm from '@/components/dashboard/freelancer/ProposalForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';

const TaskDetailsAndProposalSendingPages = async ({ params }) => {
    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
        cache: 'no-store',
    });

    const taskDetails = await res.json();

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const freelancersId = session?.user?.id;

    const checkRes = await fetch(`${baseUrl}/api/checkProposal/${id}/${freelancersId}`);

    const checkAlreadyApplied = await checkRes.json();

    const formattedDeadline = taskDetails?.deadline
        ? new Date(taskDetails.deadline).toLocaleDateString()
        : 'No deadline';

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                    Freelancer Dashboard
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Task Details
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                    Review the task details and send your proposal to the client.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                {/* Task Details Card */}
                <section className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            <span className="rounded-full bg-[#E8EEF1] px-3 py-1 text-xs font-semibold text-[#152A38]">
                                {taskDetails?.category}
                            </span>

                            <h2 className="mt-4 text-2xl font-bold leading-8 tracking-tight text-[#10202B]">
                                {taskDetails?.title}
                            </h2>
                        </div>

                        <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                            {taskDetails?.status || 'open'}
                        </span>
                    </div>

                    <p className="text-sm leading-7 text-[#52636C]">
                        {taskDetails?.description}
                    </p>

                    <div className="mt-7 grid grid-cols-1 gap-4 border-t border-[#DDE7EB] pt-6 sm:grid-cols-3">
                        <div className="rounded-2xl bg-[#F7FAF9] p-4">
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                Budget
                            </p>
                            <p className="mt-2 text-xl font-bold text-[#10202B]">
                                ${taskDetails?.budget}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#F7FAF9] p-4">
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                Deadline
                            </p>
                            <p className="mt-2 text-sm font-bold text-[#10202B]">
                                {formattedDeadline}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#F7FAF9] p-4">
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                Client
                            </p>
                            <p className="mt-2 text-sm font-bold text-[#10202B]">
                                {taskDetails?.clientName || 'Client'}
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/dashboard/freelancer/tasks"
                        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-[#DDE7EB] bg-white px-5 text-sm font-semibold text-[#152A38] no-underline transition hover:bg-[#F7FAF9]"
                    >
                        Back to Tasks
                    </Link>
                </section>

                {/* Proposal Form */}
                <ProposalForm taskTitle={taskDetails?.title} taskId={taskDetails?._id} clientId={taskDetails?.
                    clientId} checkAlreadyApplied={checkAlreadyApplied?.alreadyApplied}></ProposalForm>
            </div>
        </div>
    );
};

export default TaskDetailsAndProposalSendingPages;