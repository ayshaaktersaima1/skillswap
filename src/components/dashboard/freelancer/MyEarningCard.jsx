import { Table } from '@heroui/react';
import React from 'react';

const MyEarningCard = ({ payments }) => {
    return (
        <div className="rounded-3xl border border-[#DDE7EB] bg-white p-4 shadow-sm">
            <Table>
                <Table.ResizableContainer>
                    <Table.Content
                        aria-label="My earnings table"
                        className="min-w-[760px]"
                    >
                        <Table.Header>
                            <Table.Column
                                isRowHeader
                                defaultWidth="1fr"
                                id="taskTitle"
                                minWidth={240}
                            >
                                Task Title
                                <Table.ColumnResizer />
                            </Table.Column>

                            <Table.Column
                                defaultWidth="1fr"
                                id="client"
                                minWidth={200}
                            >
                                Client
                                <Table.ColumnResizer />
                            </Table.Column>

                            <Table.Column
                                defaultWidth="1fr"
                                id="amountMade"
                                minWidth={150}
                            >
                                Amount Made
                                <Table.ColumnResizer />
                            </Table.Column>

                            <Table.Column
                                defaultWidth="1fr"
                                id="completionDate"
                                minWidth={170}
                            >
                                Completion Date
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {payments.map((payment) => {
                                const date = payment?.paid_at
                                    ? new Date(payment.paid_at).toLocaleDateString()
                                    : 'No date';

                                return (
                                    <Table.Row key={payment._id}>
                                        <Table.Cell>
                                            <span className="font-semibold text-[#10202B]">
                                                {payment?.task_title || payment?.taskTitle || 'Task title not found'}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="text-[#52636C]">
                                                {payment?.client_name || payment?.client_email || 'Client not found'}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="font-bold text-green-700">
                                                ${payment?.amount}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="text-[#52636C]">
                                                {date}
                                            </span>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default MyEarningCard;