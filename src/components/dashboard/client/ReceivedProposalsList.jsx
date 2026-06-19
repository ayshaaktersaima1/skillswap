import { RejectProposal } from "./RejectProposal";

const statusStyles = {
    pending: 'border-yellow-200 bg-yellow-50 text-yellow-700',
    accepted: 'border-green-200 bg-green-50 text-green-700',
    rejected: 'border-red-200 bg-red-50 text-red-700',
};

const ReceivedProposalsList = ({ receivedProposals }) => {


    const pendingProposals = receivedProposals?.filter(
        (proposal) => proposal?.status?.toLowerCase() === 'pending'
    ) || [];



    return (
        <div>
            {pendingProposals.length === 0 ? (
                <div className="rounded-3xl border border-[#DDE7EB] bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-[#10202B]">
                        No pending proposals
                    </h2>

                    <p className="mt-2 text-sm text-[#52636C]">
                        New freelancer applications will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {pendingProposals.map((proposal) => {
                        const status = proposal?.status?.toLowerCase() || 'pending';

                        const statusText =
                            status.charAt(0).toUpperCase() + status.slice(1);

                        return (
                            <article
                                key={proposal._id}
                                className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm transition hover:shadow-md"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                            Task
                                        </p>

                                        <h2 className="mt-2 text-xl font-bold text-[#10202B]">
                                            {proposal?.taskTitle || 'Task Title Not Found'}
                                        </h2>

                                        <p className="mt-2 text-sm font-medium text-[#52636C]">
                                            Proposal from{' '}
                                            <span className="font-bold text-[#10202B]">
                                                {proposal?.freelancerName}
                                            </span>
                                        </p>
                                    </div>

                                    <span
                                        className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[status] || statusStyles.pending
                                            }`}
                                    >
                                        {statusText}
                                    </span>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-4 border-y border-[#DDE7EB] py-5 sm:grid-cols-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                            Budget Price
                                        </p>

                                        <p className="mt-2 text-lg font-bold text-[#10202B]">
                                            ${proposal?.proposedBudget}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                            Completion Days
                                        </p>

                                        <p className="mt-2 text-lg font-bold text-[#10202B]">
                                            {proposal?.estimatedDays} days
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                            Freelancer Email
                                        </p>

                                        <p className="mt-2 text-sm font-semibold text-[#10202B]">
                                            {proposal?.freelancerEmail}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                        Message Note
                                    </p>

                                    <p className="mt-2 rounded-2xl bg-[#F7FAF9] p-4 text-sm leading-6 text-[#52636C]">
                                        {proposal?.message}
                                    </p>
                                </div>

                                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        className="h-11 flex-1 rounded-xl bg-[#152A38] text-sm font-semibold text-white transition hover:bg-[#0F202B]"
                                    >
                                        Accept
                                    </button>

                                    <RejectProposal proposal={proposal} />
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ReceivedProposalsList;