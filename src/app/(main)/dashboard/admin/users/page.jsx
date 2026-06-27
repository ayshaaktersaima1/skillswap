import ManageUsersTable from '@/components/dashboard/admin/ManageUsersTable';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Users = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`${baseUrl}/api/users`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const users = await res.json();

    return (
        <section className="space-y-6">
            <div>


                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Manage Users
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                    View all platform accounts, manage user access, and block or unblock accounts when needed.
                </p>
            </div>

            <ManageUsersTable users={users} />
        </section>
    );
};

export default Users;