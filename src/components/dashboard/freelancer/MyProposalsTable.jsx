'use client';

import { Chip, Table } from '@heroui/react';

const statusColor = {
    pending: 'warning',
    accepted: 'success',
    rejected: 'danger',
};

const MyProposalsTable = ({ myProposals }) => {
    if (!myProposals || myProposals.length === 0) {
        return (
            <div className="rounded-3xl border border-[#DDE7EB] bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-bold text-[#10202B]">
                    No proposals sent yet
                </h2>

                <p className="mt-2 text-sm text-[#52636C]">
                    Your submitted task proposals will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-[#DDE7EB] bg-white p-4 shadow-sm">
            <Table>
                <Table.ResizableContainer>
                    <Table.Content
                        aria-label="My proposals table"
                        className="min-w-[700px]"
                    >
                        <Table.Header>
                            <Table.Column
                                isRowHeader
                                defaultWidth="1fr"
                                id="taskTitle"
                                minWidth={220}
                            >
                                Task Title
                                <Table.ColumnResizer />
                            </Table.Column>

                            <Table.Column
                                defaultWidth="1fr"
                                id="budgetBid"
                                minWidth={140}
                            >
                                Budget Bid
                                <Table.ColumnResizer />
                            </Table.Column>

                            <Table.Column
                                defaultWidth="1fr"
                                id="dateSent"
                                minWidth={160}
                            >
                                Date Sent
                                <Table.ColumnResizer />
                            </Table.Column>

                            <Table.Column
                                defaultWidth="1fr"
                                id="status"
                                minWidth={140}
                            >
                                Status
                            </Table.Column>
                        </Table.Header>

                        <Table.Body>
                            {myProposals.map((proposal) => {
                                const status = proposal?.status?.toLowerCase() || 'pending';

                                const statusText =
                                    status.charAt(0).toUpperCase() + status.slice(1);

                                const dateSent = proposal?.createdAt
                                    ? new Date(proposal.createdAt).toLocaleDateString()
                                    : 'No date';

                                return (
                                    <Table.Row key={proposal._id}>
                                        <Table.Cell>
                                            {proposal?.taskTitle ||
                                                proposal?.task?.title ||
                                                proposal?.title ||
                                                'Task title not found'}
                                        </Table.Cell>

                                        <Table.Cell>
                                            ${proposal?.proposedBudget}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {dateSent}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Chip
                                                color={statusColor[status] || 'warning'}
                                                size="sm"
                                                variant="soft"
                                            >
                                                {statusText}
                                            </Chip>
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

export default MyProposalsTable;