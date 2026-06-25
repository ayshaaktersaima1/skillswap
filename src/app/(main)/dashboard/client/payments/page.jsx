import { auth } from '@/lib/auth';
import { Chip, Table } from '@heroui/react';
import { headers } from 'next/headers';
import React from 'react';

const ClientPayments = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const clientId = session?.user?.id;

    const res = await fetch(`${baseUrl}/api/paymentInfo/${clientId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const payments = await res.json();

    return (
        <section className="space-y-6">
            <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                    Client Payments
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Payment History
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                    View all payments you have made for accepted freelancer proposals.
                </p>
            </div>

            <div className="rounded-3xl border border-[#DDE7EB] bg-white p-4 shadow-sm">
                {payments.length === 0 ? (
                    <div className="p-8 text-center">
                        <h2 className="text-xl font-bold text-[#10202B]">
                            No payments found
                        </h2>

                        <p className="mt-2 text-sm text-[#52636C]">
                            Your Stripe payment history will appear here after you hire freelancers.
                        </p>
                    </div>
                ) : (
                    <Table>
                        <Table.ResizableContainer>
                            <Table.Content
                                aria-label="Client payment history table"
                                className="w-full"
                            >
                                <Table.Header>
                                    <Table.Column
                                        isRowHeader
                                        defaultWidth="1fr"
                                        id="task"
                                        minWidth={220}
                                    >
                                        Task
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="freelancer"
                                        minWidth={200}
                                    >
                                        Freelancer
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="amount"
                                        minWidth={120}
                                    >
                                        Amount
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="status"
                                        minWidth={130}
                                    >
                                        Status
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="date"
                                        minWidth={150}
                                    >
                                        Date
                                    </Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {payments.map((payment) => {
                                        const paymentDate = payment?.paid_at
                                            ? new Date(payment.paid_at).toLocaleDateString()
                                            : 'No date';

                                        const status = payment?.payment_status || 'unknown';

                                        return (
                                            <Table.Row key={payment._id}>
                                                <Table.Cell>
                                                    <p className="max-w-[220px] truncate font-semibold text-[#10202B]">
                                                        {payment?.task_title || 'No task title'}
                                                    </p>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <div>
                                                        <p className="max-w-[200px] truncate text-sm font-semibold text-[#10202B]">
                                                            {payment?.freelancer_name || 'Freelancer'}
                                                        </p>

                                                        <p className="max-w-[200px] truncate text-xs text-[#52636C]">
                                                            {payment?.freelancer_email || 'No email'}
                                                        </p>
                                                    </div>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <p className="font-bold text-[#10202B]">
                                                        ${payment?.amount || 0}
                                                    </p>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <Chip
                                                        size="sm"
                                                        variant="soft"
                                                        color={status === 'paid' ? 'success' : 'warning'}
                                                    >
                                                        {status}
                                                    </Chip>
                                                </Table.Cell>

                                                <Table.Cell>
                                                    <p className="text-sm font-medium text-[#52636C]">
                                                        {paymentDate}
                                                    </p>
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table.Content>
                        </Table.ResizableContainer>
                    </Table>
                )}
            </div>
        </section>
    );
};

export default ClientPayments;