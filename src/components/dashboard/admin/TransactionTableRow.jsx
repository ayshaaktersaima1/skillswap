import { Chip, Table } from '@heroui/react';
import React from 'react';

const TransactionTableRow = ({ payment }) => {
    const status = payment?.payment_status?.toLowerCase() || 'unknown';

    const statusText =
        status.charAt(0).toUpperCase() + status.slice(1);

    const paymentDate = payment?.paid_at
        ? new Date(payment.paid_at).toLocaleDateString()
        : 'No date';

    const statusColor = {
        paid: 'success',
        unpaid: 'danger',
        pending: 'warning',
    };

    return (
        <Table.Row>
            <Table.Cell>
                <span className="block max-w-[220px] truncate text-sm font-medium text-[#10202B]">
                    {payment?.client_email || 'No client email'}
                </span>
            </Table.Cell>

            <Table.Cell>
                <span className="block max-w-[220px] truncate text-sm text-[#52636C]">
                    {payment?.freelancer_email || 'No freelancer email'}
                </span>
            </Table.Cell>

            <Table.Cell>
                <span className="font-bold text-[#10202B]">
                    ${payment?.amount || 0}
                </span>
            </Table.Cell>

            <Table.Cell>
                <span className="text-sm text-[#52636C]">
                    {paymentDate}
                </span>
            </Table.Cell>

            <Table.Cell>
                <Chip
                    size="sm"
                    variant="soft"
                    color={statusColor[status] || 'secondary'}
                >
                    {statusText}
                </Chip>
            </Table.Cell>
        </Table.Row>
    );
};

export default TransactionTableRow;