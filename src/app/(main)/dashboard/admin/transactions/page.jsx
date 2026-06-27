import TransactionTableRow from '@/components/dashboard/admin/TransactionTableRow';
import { auth } from '@/lib/auth';
import { Table } from '@heroui/react';
import { headers } from 'next/headers';
import React from 'react';

const TransactionsAdmin = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`${baseUrl}/api/payments`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const payments = await res.json();

    return (
        <section className="space-y-6">
            <div>


                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Transactions History
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                    View all Stripe payments processed across the platform.
                </p>
            </div>

            <div className="rounded-3xl border border-[#DDE7EB] bg-white p-4 shadow-sm">
                {payments.length === 0 ? (
                    <div className="p-8 text-center">
                        <h2 className="text-xl font-bold text-[#10202B]">
                            No transactions found
                        </h2>

                        <p className="mt-2 text-sm text-[#52636C]">
                            Stripe payments will appear here after clients make payments.
                        </p>
                    </div>
                ) : (
                    <Table>
                        <Table.ResizableContainer>
                            <Table.Content
                                aria-label="Transactions history table"
                                className="w-full"
                            >
                                <Table.Header>
                                    <Table.Column
                                        isRowHeader
                                        defaultWidth="1fr"
                                        id="clientEmail"
                                        minWidth={220}
                                    >
                                        Client Email
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="freelancerEmail"
                                        minWidth={220}
                                    >
                                        Freelancer Email
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="payoutSize"
                                        minWidth={140}
                                    >
                                        Payout Size
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="paymentDate"
                                        minWidth={160}
                                    >
                                        Payment Date
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="paymentStatus"
                                        minWidth={170}
                                    >
                                        Payment Status
                                    </Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {payments.map((payment) => (
                                        <TransactionTableRow
                                            key={payment._id}
                                            payment={payment}
                                        />
                                    ))}
                                </Table.Body>
                            </Table.Content>
                        </Table.ResizableContainer>
                    </Table>
                )}
            </div>
        </section>
    );
};

export default TransactionsAdmin;