'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ProposalForm = ({ taskId, taskTitle, clientId, checkAlreadyApplied }) => {
    const router = useRouter();

    const [applied, setApplied] = useState(checkAlreadyApplied);

    const { data: session } = authClient.useSession();
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const freelancerEmail = session?.user?.email || '';
    const freelancerId = session?.user?.id || '';
    const freelancerName = session?.user?.name || '';

    const handleSubmitProposal = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const proposalInfo = Object.fromEntries(formData.entries());

        proposalInfo.proposedBudget = Number(proposalInfo.proposedBudget);
        proposalInfo.estimatedDays = Number(proposalInfo.estimatedDays);
        proposalInfo.status = 'pending';
        proposalInfo.createdAt = new Date().toISOString();

        proposalInfo.freelancersId = freelancerId;
        proposalInfo.freelancerEmail = freelancerEmail;
        proposalInfo.freelancerName = freelancerName;

        proposalInfo.taskId = taskId;
        proposalInfo.taskTitle = taskTitle;
        proposalInfo.clientId = clientId;

        const { data: tokenData } = await authClient.token();

        const res = await fetch(`${baseUrl}/api/proposals`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`,
            },
            body: JSON.stringify(proposalInfo),
        });

        const data = await res.json();

        if (!res.ok) {
            toast.warning(data.message || 'Failed to submit proposal');

            if (res.status === 409) {
                setApplied(true);
                router.refresh();
            }

            return;
        }

        toast.success('Proposal submitted successfully');
        setApplied(true);
        router.refresh();
    };

    return (
        <section className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm">
            {applied ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                    <h3 className="text-lg font-bold text-green-700">
                        You already applied for this task
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-green-700">
                        Your proposal has already been submitted. You can check the status from My Proposals.
                    </p>
                </div>
            ) : (
                <>
                    <h3 className="text-xl font-bold tracking-tight text-[#10202B]">
                        Send Proposal
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#52636C]">
                        Submit your budget, estimated timeline, and a short cover note.
                    </p>

                    <form onSubmit={handleSubmitProposal} className="mt-6 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#10202B]">
                                Task ID
                            </label>

                            <input
                                type="text"
                                name="taskId"
                                defaultValue={taskId}
                                readOnly
                                className="h-12 w-full rounded-xl border border-[#DDE7EB] bg-[#F7FAF9] px-4 text-sm font-medium text-[#52636C] outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#10202B]">
                                Freelancer Email
                            </label>

                            <input
                                type="email"
                                name="freelancerEmail"
                                value={freelancerEmail}
                                readOnly
                                required
                                className="h-12 w-full rounded-xl border border-[#DDE7EB] bg-[#F7FAF9] px-4 text-sm font-medium text-[#52636C] outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#10202B]">
                                Proposed Budget (USD)
                            </label>

                            <input
                                type="number"
                                name="proposedBudget"
                                placeholder="Example: 200"
                                min="1"
                                required
                                className="h-12 w-full rounded-xl border border-[#DDE7EB] bg-white px-4 text-sm font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-[#152A38] focus:ring-4 focus:ring-[#152A38]/10"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#10202B]">
                                Estimated Days
                            </label>

                            <input
                                type="number"
                                name="estimatedDays"
                                placeholder="Example: 5"
                                min="1"
                                required
                                className="h-12 w-full rounded-xl border border-[#DDE7EB] bg-white px-4 text-sm font-medium text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-[#152A38] focus:ring-4 focus:ring-[#152A38]/10"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#10202B]">
                                Cover Note Message
                            </label>

                            <textarea
                                name="message"
                                placeholder="Write a short message to the client..."
                                rows={5}
                                required
                                className="w-full resize-none rounded-xl border border-[#DDE7EB] bg-white px-4 py-3 text-sm font-medium leading-6 text-[#10202B] outline-none transition placeholder:text-[#7A8A92] focus:border-[#152A38] focus:ring-4 focus:ring-[#152A38]/10"
                            />
                        </div>

                        <button
                            type="submit"
                            className="h-12 w-full rounded-xl bg-[#152A38] text-sm font-semibold text-white transition hover:bg-[#0F202B]"
                        >
                            Send Proposal
                        </button>
                    </form>
                </>
            )}
        </section>
    );
};

export default ProposalForm;