import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const FreelancerDashboardHomePage = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const freelancersId = session?.user?.id;

    const proposalRes = await fetch(`${baseUrl}/api/myProposals/${freelancersId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const proposalData = await proposalRes.json();


    const paymentRes = await fetch(`${baseUrl}/api/paymentInfoFreelancer/${freelancersId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const paymentInfo = await paymentRes.json();

    const totalEarning = paymentInfo.reduce((total, payment) => {
        return total + Number(payment.amount)
    }, 0
    )

    const totalProposalCount = proposalData.length;

    const pendingProposalCount = proposalData.filter(p => p.status === 'pending').length;
    const acceptedProposalCount = proposalData.filter(p => p.status === 'accepted').length;



    return (
        <section className="space-y-6">
            <div>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#52636C]">
                    Track your proposals, accepted work, and total earnings.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#52636C]">
                            Total Proposals
                        </p>

                        <span className="rounded-full bg-[#F7FAF9] px-3 py-1 text-xs font-bold text-[#152A38]">
                            All
                        </span>
                    </div>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#10202B]">
                        {totalProposalCount}
                    </h2>

                    <p className="mt-2 text-xs font-medium text-[#7A8A92]">
                        Proposals you submitted
                    </p>
                </div>

                <div className="rounded-3xl border border-yellow-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#52636C]">
                            Pending Proposals
                        </p>

                        <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-700">
                            Pending
                        </span>
                    </div>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-yellow-700">
                        {pendingProposalCount}
                    </h2>

                    <p className="mt-2 text-xs font-medium text-[#7A8A92]">
                        Waiting for client response
                    </p>
                </div>

                <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#52636C]">
                            Accepted Proposals
                        </p>

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                            Accepted
                        </span>
                    </div>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-green-700">
                        {acceptedProposalCount}
                    </h2>

                    <p className="mt-2 text-xs font-medium text-[#7A8A92]">
                        Approved by clients
                    </p>
                </div>

                <div className="rounded-3xl border border-[#DDE7EB] bg-[#152A38] p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white/80">
                            Total Earnings
                        </p>

                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                            USD
                        </span>
                    </div>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-white">
                        ${totalEarning}
                    </h2>

                    <p className="mt-2 text-xs font-medium text-white/60">
                        From accepted paid projects
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FreelancerDashboardHomePage;