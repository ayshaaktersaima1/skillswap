'use client';

import { authClient } from '@/lib/auth-client';
import { Button, Chip, Table } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const ManageUsersTable = ({ users }) => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const router = useRouter();

    const handleBlockStatus = async (user) => {

        const status = user?.isBlocked;
        window.location.reload();
        // toast.success(``)

        const { data: tokenData } = await authClient.token();



        const res = await fetch(`${baseUrl}/api/users/${user?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify({ isBlocked: !status })
        })

    };

    return (
        <div className="rounded-3xl border border-[#DDE7EB] bg-white p-4 shadow-sm">
            {users.length === 0 ? (
                <div className="p-8 text-center">
                    <h2 className="text-xl font-bold text-[#10202B]">
                        No users found
                    </h2>

                    <p className="mt-2 text-sm text-[#52636C]">
                        Platform users will appear here after registration.
                    </p>
                </div>
            ) : (
                <Table>
                    <Table.ResizableContainer>
                        <Table.Content
                            aria-label="Manage users table"
                            className="min-w-[850px]"
                        >
                            <Table.Header>
                                <Table.Column
                                    isRowHeader
                                    defaultWidth="1fr"
                                    id="name"
                                    minWidth={220}
                                >
                                    Name
                                    <Table.ColumnResizer />
                                </Table.Column>

                                <Table.Column
                                    defaultWidth="1fr"
                                    id="email"
                                    minWidth={260}
                                >
                                    Email Address
                                    <Table.ColumnResizer />
                                </Table.Column>

                                <Table.Column
                                    defaultWidth="1fr"
                                    id="role"
                                    minWidth={140}
                                >
                                    Role
                                    <Table.ColumnResizer />
                                </Table.Column>

                                <Table.Column
                                    defaultWidth="1fr"
                                    id="status"
                                    minWidth={160}
                                >
                                    Status
                                    <Table.ColumnResizer />
                                </Table.Column>

                                <Table.Column
                                    defaultWidth="1fr"
                                    id="action"
                                    minWidth={160}
                                >
                                    Action
                                </Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {users.map((user) => {
                                    const isBlocked = user?.isBlocked === true;

                                    return (
                                        <Table.Row key={user._id}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3">
                                                    <Image

                                                        src={user?.image}
                                                        alt={user?.name || 'User'}
                                                        width={40}
                                                        height={40}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />

                                                    <div>
                                                        <p className="font-semibold text-[#10202B]">
                                                            {user?.name || 'No name'}
                                                        </p>


                                                    </div>
                                                </div>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <span className="text-sm text-[#52636C]">
                                                    {user?.email}
                                                </span>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Chip
                                                    size="sm"
                                                    variant="soft"
                                                    color={
                                                        user?.role === 'freelancer'
                                                            ? 'primary'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {user?.role}
                                                </Chip>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Chip
                                                    size="sm"
                                                    variant="soft"
                                                    color={isBlocked ? 'danger' : 'success'}
                                                >
                                                    {isBlocked ? 'Blocked' : 'Active'}
                                                </Chip>
                                            </Table.Cell>

                                            <Table.Cell>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleBlockStatus(user)}
                                                    className={
                                                        isBlocked
                                                            ? 'bg-green-600 text-white'
                                                            : 'bg-red-600 text-white'
                                                    }
                                                >
                                                    {isBlocked ? 'Unblock' : 'Block'}
                                                </Button>
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
    );
};

export default ManageUsersTable;