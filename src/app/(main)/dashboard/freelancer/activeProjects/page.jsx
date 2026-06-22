import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const ActiveProjectsPage = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const freelancersId = session?.user?.id;

    const res = await fetch(`${baseUrl}/api/myProposals/${freelancersId}?status=accepted`);
    const activeProjects = await res.json();


    return (
        <div>
            <h1>p</h1>
        </div>
    );
};

export default ActiveProjectsPage;