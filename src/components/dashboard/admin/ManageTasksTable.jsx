import { Button, Chip, Table } from '@heroui/react';
import React from 'react';
import DeleteTaskBtnAdmins from './DeleteTaskBtnAdmin';



const ManageTasksTable = ({ task }) => {


    const status = task?.status?.toLowerCase() || 'open';

    const statusText =
        status.charAt(0).toUpperCase() + status.slice(1);

    const createdDate = task?.createdAt
        ? new Date(task.createdAt).toLocaleDateString()
        : 'No date';

    const proposalCount =
        task?.proposalCount || task?.proposals?.length || 0;


    const statusColor = {
        open: 'success',
        'in progress': 'primary',
        completed: 'secondary',
    };

    return (
        <Table.Row>
            <Table.Cell>
                <div>
                    <p className="max-w-[160px] truncate font-semibold text-[#10202B]">
                        {task?.title || 'No title'}
                    </p>

                    <p className="mt-1 max-w-[160px] truncate text-xs text-[#52636C]">
                        {task?.description || 'No description'}
                    </p>
                </div>
            </Table.Cell>

            <Table.Cell>
                <span className="block max-w-[100px] truncate text-sm text-[#52636C]">
                    {task?.category || 'No category'}
                </span>
            </Table.Cell>

            <Table.Cell>
                <span className="block max-w-[170px] truncate text-sm text-[#52636C]">
                    {task?.clientEmail || 'No client email'}
                </span>
            </Table.Cell>

            <Table.Cell>
                <span className="font-bold text-[#10202B]">
                    ${task?.budget}
                </span>
            </Table.Cell>

            <Table.Cell>
                <Chip
                    size="sm"
                    variant="soft"
                    color={statusColor[status] || 'warning'}
                >
                    {statusText}
                </Chip>
            </Table.Cell>

            <Table.Cell>
                <span className="font-semibold text-[#10202B]">
                    {proposalCount}
                </span>
            </Table.Cell>

            <Table.Cell>
                <span className="text-sm text-[#52636C]">
                    {createdDate}
                </span>
            </Table.Cell>

            <Table.Cell>

                <DeleteTaskBtnAdmins task={task}></DeleteTaskBtnAdmins>
            </Table.Cell>
        </Table.Row>
    );
};

export default ManageTasksTable;