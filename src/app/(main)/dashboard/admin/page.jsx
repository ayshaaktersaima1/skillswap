import React from 'react';

const AdminOverview = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const usersRes = await fetch(`${baseUrl}/api/users`, {
        cache: 'no-store',
    });
    const users = await usersRes.json();

    const tasksRes = await fetch(`${baseUrl}/api/tasks`, {
        cache: 'no-store',
    });
    const tasks = await tasksRes.json();

    const paymentsRes = await fetch(`${baseUrl}/api/payments`, {
        cache: 'no-store',
    });
    const payments = await paymentsRes.json();

    const totalUsers = users.length;

    const totalTasks = tasks.length;

    const totalRevenue = payments.reduce((total, payment) => {
        return total + Number(payment.amount || 0);
    }, 0);

    const activeTasks = tasks.filter((task) => {
        return task.status === 'open' || task.status === 'in progress';
    }).length;

    return (
        <section className="space-y-6">
            <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                    Admin Overview
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Dashboard
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                    Track platform users, tasks, active work, and total revenue.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                        Total Users
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-[#10202B]">
                        {totalUsers}
                    </h2>

                    <p className="mt-2 text-sm text-[#52636C]">
                        Registered clients and freelancers
                    </p>
                </div>

                <div className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                        Total Tasks
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-[#10202B]">
                        {totalTasks}
                    </h2>

                    <p className="mt-2 text-sm text-[#52636C]">
                        All task posts on the platform
                    </p>
                </div>

                <div className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                        Total Revenue
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-green-700">
                        ${totalRevenue}
                    </h2>

                    <p className="mt-2 text-sm text-[#52636C]">
                        Total Stripe payments processed
                    </p>
                </div>

                <div className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                        Active Tasks
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-[#10202B]">
                        {activeTasks}
                    </h2>

                    <p className="mt-2 text-sm text-[#52636C]">
                        Open and in-progress tasks
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AdminOverview;