import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const LatestFeaturedTaskCard = ({ task }) => {
    const {
        _id,
        title,
        category,
        clientName,
        clientEmail,
        budget,
        deadline,
        status,
    } = task;

    const taskStatus = status || 'open';

    const dueDate = deadline
        ? new Date(deadline).toLocaleDateString()
        : 'No deadline';

    return (
        <div className="h-full rounded-2xl border border-[#DDE7EB] bg-white shadow-md transition duration-300 hover:-translate-y-2">
            <div className="flex h-full flex-col justify-between p-6">
                <div>
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#EAF1F3] px-3 py-1 text-xs font-semibold text-[#152A38]">
                            {category || 'General'}
                        </span>

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                            {taskStatus}
                        </span>
                    </div>

                    <h1 className="line-clamp-2 text-lg font-bold text-[#10202B]">
                        {title || 'Untitled Task'}
                    </h1>

                    <p className="mt-3 line-clamp-1 text-sm text-[#52636C]">
                        Client: {clientEmail || 'Unknown client'}
                    </p>
                </div>

                <div className="mt-8 border-t border-[#DDE7EB] pt-5">
                    <div className="mb-5 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                Budget
                            </p>

                            <h2 className="mt-1 text-xl font-bold text-[#10202B]">
                                ${budget}
                            </h2>
                        </div>

                        <div className="text-right">
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
                                Due Date
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#10202B]">
                                {dueDate}
                            </p>
                        </div>
                    </div>

                    <Link href={`/allTasks/${_id}`}>
                        <Button className="h-11 w-full rounded-xl bg-[#152A38] text-sm font-semibold text-white">
                            View Task
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LatestFeaturedTaskCard;