import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const ClientDashboardHomepage = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const clientId = session?.user?.id;

    const tasksRes = await fetch(`${baseUrl}/api/my-tasks/${clientId}`);

    const tasks = await tasksRes.json();

    const PaymentRes = await fetch(`${baseUrl}/api/paymentInfo/${clientId}`);
    const paymentInfo = await PaymentRes.json();

    const totalTasks = tasks.length;

    const openTasks = tasks.filter(t => t.status === 'open').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in progress').length;

    const totalPayment = paymentInfo.reduce((total, payment) => {
        return total + Number(payment.amount)
    }, 0);

    return (
        <section className="space-y-6">
            <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                    Client Overview
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#52636C]">
                    Track your posted tasks, active projects, and total spending.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#52636C]">
                            Total Tasks
                        </p>

                        <span className="rounded-full bg-[#F7FAF9] px-3 py-1 text-xs font-bold text-[#152A38]">
                            All
                        </span>
                    </div>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#10202B]">
                        {totalTasks}
                    </h2>

                    <p className="mt-2 text-xs font-medium text-[#7A8A92]">
                        Tasks created by you
                    </p>
                </div>

                <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#52636C]">
                            Open Tasks
                        </p>

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                            Open
                        </span>
                    </div>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-green-700">
                        {openTasks}
                    </h2>

                    <p className="mt-2 text-xs font-medium text-[#7A8A92]">
                        Waiting for proposals
                    </p>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#52636C]">
                            Tasks In Progress
                        </p>

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                            Active
                        </span>
                    </div>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-blue-700">
                        {inProgressTasks}
                    </h2>

                    <p className="mt-2 text-xs font-medium text-[#7A8A92]">
                        Currently being worked on
                    </p>
                </div>

                <div className="rounded-3xl border border-[#DDE7EB] bg-[#152A38] p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white/80">
                            Total Spent
                        </p>

                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                            USD
                        </span>
                    </div>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-white">
                        ${totalPayment}
                    </h2>

                    <p className="mt-2 text-xs font-medium text-white/60">
                        Total successful payments
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ClientDashboardHomepage;