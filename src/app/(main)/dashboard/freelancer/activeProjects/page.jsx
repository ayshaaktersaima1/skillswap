import ActiveProjectCard from '@/components/dashboard/freelancer/ActiveProjectsCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const ActiveProjectsPage = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const freelancersId = session?.user?.id;
    const freelancersEmail = session?.user?.email;
    const freelancersName = session?.user?.name;

    const res = await fetch(`${baseUrl}/api/myProposals/${freelancersId}?status=accepted`);
    const acceptedProjects = await res.json();





    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-[#10202B]">
                    Active Projects
                </h1>

                <p className="mt-2 text-sm text-[#52636C]">
                    Track your in-progress and completed projects.
                </p>
            </div>

            <div className="space-y-5">
                {acceptedProjects.map((project) => (
                    <ActiveProjectCard
                        key={project._id}
                        project={project}
                        freelancersId={freelancersId}
                        freelancersEmail={freelancersEmail}
                        freelancersName={freelancersName}
                    />
                ))}
            </div>
        </section>
    );
};

export default ActiveProjectsPage;