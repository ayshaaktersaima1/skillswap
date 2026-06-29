import ManageTasksTable from '@/components/dashboard/admin/ManageTasksTable';
import { auth } from '@/lib/auth';
import { Table } from '@heroui/react';
import { headers } from 'next/headers';
import React from 'react';

const Tasks = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`${baseUrl}/api/allTaskForAdmin`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const tasks = await res.json()


    return (
        <section className="space-y-6">
            <div>


                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Manage Tasks
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                    Look up every task item on the website with its current live status label.
                </p>
            </div>

            <div className="rounded-3xl border border-[#DDE7EB] bg-white p-4 shadow-sm">
                {tasks.length === 0 ? (
                    <div className="p-8 text-center">
                        <h2 className="text-xl font-bold text-[#10202B]">
                            No tasks found
                        </h2>

                        <p className="mt-2 text-sm text-[#52636C]">
                            Platform tasks will appear here when clients post them.
                        </p>
                    </div>
                ) : (
                    <Table>
                        <Table.ResizableContainer>
                            <Table.Content
                                aria-label="Manage tasks table"
                                className="w-full"
                            >
                                <Table.Header>
                                    <Table.Column
                                        isRowHeader
                                        defaultWidth="1fr"
                                        id="title"
                                        minWidth={160}
                                    >
                                        Title
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="category"
                                        minWidth={100}
                                    >
                                        Category
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="client"
                                        minWidth={170}
                                    >
                                        Client
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="budget"
                                        minWidth={80}
                                    >
                                        Budget
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="status"
                                        minWidth={100}
                                    >
                                        Status
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="proposals"
                                        minWidth={90}
                                    >
                                        Proposals
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="created"
                                        minWidth={110}
                                    >
                                        Created
                                        <Table.ColumnResizer />
                                    </Table.Column>

                                    <Table.Column
                                        defaultWidth="1fr"
                                        id="actions"
                                        minWidth={90}
                                    >
                                        Actions
                                    </Table.Column>
                                </Table.Header>

                                <Table.Body>
                                    {tasks.map((task) => (
                                        <ManageTasksTable
                                            key={task._id}
                                            task={task}
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

export default Tasks;