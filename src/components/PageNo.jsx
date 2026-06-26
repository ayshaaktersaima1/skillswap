'use client';

import Link from 'next/link';

export function PaginationBasic({ pageNo, totalPage }) {
    const currentPage = Number(pageNo) || 1;
    const totalPages = Number(totalPage) || 1;

    return (
        <div className="flex justify-center pt-10">
            <div className="flex items-center gap-2">
                {currentPage > 1 ? (
                    <Link
                        href={`/allTasks?page=${currentPage - 1}`}
                        className="rounded-xl border border-[#DDE7EB] bg-white px-4 py-2 text-sm font-semibold text-[#10202B]"
                    >
                        Previous
                    </Link>
                ) : (
                    <button
                        disabled
                        className="cursor-not-allowed rounded-xl border border-[#DDE7EB] bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-400"
                    >
                        Previous
                    </button>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                        key={p}
                        href={`/allTasks?page=${p}`}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold ${currentPage === p
                                ? 'border-[#152A38] bg-[#152A38] text-white'
                                : 'border-[#DDE7EB] bg-white text-[#10202B]'
                            }`}
                    >
                        {p}
                    </Link>
                ))}

                {currentPage < totalPages ? (
                    <Link
                        href={`/allTasks?page=${currentPage + 1}`}
                        className="rounded-xl border border-[#DDE7EB] bg-white px-4 py-2 text-sm font-semibold text-[#10202B]"
                    >
                        Next
                    </Link>
                ) : (
                    <button
                        disabled
                        className="cursor-not-allowed rounded-xl border border-[#DDE7EB] bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-400"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}