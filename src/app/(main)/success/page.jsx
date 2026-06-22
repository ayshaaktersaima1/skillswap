import Link from 'next/link';
import { redirect } from 'next/navigation';
import { stripe } from '@/lib/stripe';

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error('Please provide a valid session_id');
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent'],
    });

    const status = session?.status;
    const clientEmail = session?.customer_details?.email;
    const amountTotal = session?.amount_total ? session.amount_total / 100 : 0;

    const taskTitle = session?.metadata?.taskTitle || 'Accepted Task';
    const freelancerName = session?.metadata?.freelancerName || 'Freelancer';

    if (status === 'open') {
        redirect('/dashboard/client/proposals');
    }

    if (status === 'complete') {

        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payments`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                client_id: session?.metadata?.clientId,
                client_email: session?.metadata?.clientEmail,
                freelancer_id: session?.metadata?.freelancerId,
                freelancer_email: session?.metadata?.freelancerEmail,
                freelancer_name: session?.metadata?.freelancerName,
                taskId: session?.metadata?.taskId,
                task_title: session?.metadata?.taskTitle,
                amount: session?.amount_total / 100,
                transaction_id: session?.payment_intent?.id,
                payment_status: session?.payment_status,
                proposalId: session?.metadata?.proposalId,
            }),
        });

        return (
            <section className="min-h-[70vh] bg-[#F7FAF9] px-5 py-10">
                <div className="mx-auto max-w-3xl">
                    <div className="rounded-3xl border border-[#DDE7EB] bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl text-green-600">
                            ✓
                        </div>

                        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                            Payment Successful
                        </p>

                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#10202B]">
                            Your task is now in progress
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-[#52636C]">
                            You successfully accepted the proposal from{' '}
                            <span className="font-bold text-[#10202B]">
                                {freelancerName}
                            </span>
                            . The freelancer can now start working on your task.
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl bg-[#F7FAF9] p-5 text-left sm:grid-cols-2">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                    Task
                                </p>
                                <p className="mt-2 text-sm font-bold text-[#10202B]">
                                    {taskTitle}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                    Paid Amount
                                </p>
                                <p className="mt-2 text-sm font-bold text-[#10202B]">
                                    ${amountTotal}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                    Client Email
                                </p>
                                <p className="mt-2 text-sm font-bold text-[#10202B]">
                                    {clientEmail}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                    Status
                                </p>
                                <p className="mt-2 text-sm font-bold text-green-700">
                                    In Progress
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/dashboard/client/receivedProposals"
                                className="flex h-12 flex-1 items-center justify-center rounded-xl border border-[#DDE7EB] bg-white text-sm font-semibold text-[#152A38] no-underline transition hover:bg-[#F7FAF9]"
                            >
                                Back to Proposals
                            </Link>

                            <Link
                                href="/dashboard/client/my-tasks"
                                className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#152A38] text-sm font-semibold text-white no-underline transition hover:bg-[#0F202B]"
                            >
                                View My Tasks
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-[70vh] bg-[#F7FAF9] px-5 py-10">
            <div className="mx-auto max-w-2xl rounded-3xl border border-[#DDE7EB] bg-white p-8 text-center shadow-sm">
                <h1 className="text-2xl font-bold text-[#10202B]">
                    Payment status unavailable
                </h1>

                <p className="mt-2 text-sm text-[#52636C]">
                    We could not confirm this payment session. Please return to your dashboard.
                </p>

                <Link
                    href="/dashboard/client/proposals"
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-[#152A38] px-6 text-sm font-semibold text-white no-underline"
                >
                    Back to Proposals
                </Link>
            </div>
        </section>
    );
}