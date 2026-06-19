import MyProposalsTable from '@/components/dashboard/freelancer/MyProposalsTable';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';


const MyProposals = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const freelancersId = session?.user?.id;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const res = await fetch(`${baseUrl}/api/myProposals/${freelancersId}`, {
        cache: 'no-store',
    });

    const myProposals = await res.json();

    return (
        <div>
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                    Freelancer Dashboard
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    My Proposals
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                    View all proposal applications you have sent to clients.
                </p>
            </div>

            <MyProposalsTable myProposals={myProposals} />
        </div>
    );
};

export default MyProposals;