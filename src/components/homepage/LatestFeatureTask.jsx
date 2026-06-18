import Link from 'next/link';

const latestTasks = [
    {
        id: '1',
        title: 'Design a modern landing page for a startup',
        clientName: 'Nova Studio',
        category: 'UI/UX Design',
        budget: 250,
        deadline: 'Jun 28, 2026',
    },
    {
        id: '2',
        title: 'Build a responsive dashboard with React',
        clientName: 'Orbit Labs',
        category: 'Web Development',
        budget: 420,
        deadline: 'Jul 02, 2026',
    },
    {
        id: '3',
        title: 'Write product descriptions for ecommerce store',
        clientName: 'Marketly',
        category: 'Copywriting',
        budget: 120,
        deadline: 'Jun 25, 2026',
    },
    {
        id: '4',
        title: 'Create social media graphics for new campaign',
        clientName: 'Bloom Agency',
        category: 'Graphic Design',
        budget: 180,
        deadline: 'Jul 05, 2026',
    },
];

export default function LatestFeaturedTasks() {
    return (
        <section className="bg-[#F7FAF9] px-5 py-16 md:px-8 md:py-24">
            <div className="mx-auto w-[95%] md:w-[90%]">
                {/* Section Header */}
                <div className="mb-12 flex flex-col gap-8 border-b border-[#DDE7EB] pb-10 md:mb-14 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-[760px]">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#152A38]" />
                            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#52636C]">
                                Latest Featured Tasks
                            </span>
                        </div>

                        <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-0.05em] text-[#10202B] md:text-[58px] md:leading-[66px]">
                            Fresh tasks from clients ready to hire
                        </h2>

                        <p className="mt-5 max-w-[620px] text-[16px] leading-[28px] text-[#52636C] md:text-[18px] md:leading-[30px]">
                            Browse the latest open micro-tasks across design, development,
                            writing, marketing, and business support.
                        </p>
                    </div>

                    <Link
                        href="/tasks"
                        className="inline-flex h-12 w-fit items-center justify-center rounded-full border border-[#C8D4DA] bg-white px-7 text-[15px] font-semibold text-[#152A38] shadow-[0_10px_30px_rgba(21,42,56,0.05)] transition hover:border-[#152A38] hover:bg-[#F7FAF9]"
                    >
                        View All Tasks
                    </Link>
                </div>

                {/* Task Cards */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {latestTasks.map((task) => (
                        <article
                            key={task.id}
                            className="group flex min-h-[310px] flex-col justify-between rounded-[28px] border border-[#DDE7EB] bg-white p-6 shadow-[0_18px_50px_rgba(21,42,56,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#C8D4DA] hover:shadow-[0_28px_70px_rgba(21,42,56,0.12)]"
                        >
                            <div>
                                {/* Top Row */}
                                <div className="mb-7 flex items-center justify-between gap-3">
                                    <span className="rounded-full bg-[#E8EEF1] px-3 py-1.5 text-[12px] font-semibold text-[#152A38]">
                                        {task.category}
                                    </span>

                                    <span className="rounded-full border border-[#DDE7EB] px-3 py-1.5 text-[12px] font-medium text-[#52636C]">
                                        Open
                                    </span>
                                </div>

                                {/* Task Title */}
                                <h3 className="line-clamp-2 text-[22px] font-semibold leading-[30px] tracking-[-0.035em] text-[#10202B]">
                                    {task.title}
                                </h3>

                                {/* Client Name */}
                                <p className="mt-4 text-[14px] font-medium text-[#52636C]">
                                    Client:{' '}
                                    <span className="font-semibold text-[#10202B]">
                                        {task.clientName}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-8">
                                {/* Budget + Deadline */}
                                <div className="grid grid-cols-2 gap-3 border-t border-[#DDE7EB] pt-5">
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A8A92]">
                                            Budget
                                        </p>
                                        <p className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-[#10202B]">
                                            ${task.budget}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A8A92]">
                                            Due Date
                                        </p>
                                        <p className="mt-3 text-[14px] font-semibold text-[#10202B]">
                                            {task.deadline}
                                        </p>
                                    </div>
                                </div>

                                {/* CTA */}
                                <Link
                                    href={`/tasks/${task.id}`}
                                    className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#152A38] text-[14px] font-semibold text-white transition hover:bg-[#0F202B]"
                                >
                                    View Task
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}