import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import ReceivedProposalsList from '@/components/dashboard/client/ReceivedProposalsList';

const ReceivedProposalsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const clientId = session?.user?.id;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const res = await fetch(`${baseUrl}/api/receivedProposals/${clientId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const receivedProposals = res.ok ? await res.json() : [];

    return (
        <div>
            <div className="mb-8">

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Manage Proposals
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                    Review freelancer applications for your posted tasks and accept or reject proposals.
                </p>
            </div>

            <ReceivedProposalsList receivedProposals={receivedProposals} />
        </div>
    );
};

export default ReceivedProposalsPage;