import Link from 'next/link';
import LatestFeaturedTaskCard from './LatestFeaturedTaskCard';

export default async function LatestFeaturedTasks() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const res = await fetch(`${baseUrl}/api/tasks?status=open`, {
        cache: 'no-store',
    });

    const tasks = await res.json();

    const latestTasks = tasks.slice(0, 3);

    return (
        <section className="bg-[#F7FAF9] px-5 py-16 md:px-8 md:py-24">
            <div className="mx-auto w-[95%] md:w-[90%]">
                <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                            Latest Featured Tasks
                        </p>

                        <h2 className="text-3xl font-bold text-[#10202B] md:text-5xl">
                            Fresh tasks from clients ready to hire
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#52636C] md:text-base">
                            Browse the latest open micro-tasks across design, development,
                            writing, marketing, and business support.
                        </p>
                    </div>

                    <Link
                        href="/allTasks"
                        className="inline-flex h-11 w-fit items-center justify-center rounded-xl border border-[#DDE7EB] bg-white px-5 text-sm font-semibold text-[#152A38]"
                    >
                        View All Tasks
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {latestTasks.length === 0 ? (
                        <div className="rounded-2xl border border-[#DDE7EB] bg-white p-8 text-center shadow-md md:col-span-2 xl:col-span-4">
                            <h3 className="text-xl font-bold text-[#10202B]">
                                No open tasks available
                            </h3>

                            <p className="mt-2 text-sm text-[#52636C]">
                                New client tasks will appear here when they are posted.
                            </p>
                        </div>
                    ) : (
                        latestTasks.map((task) => (
                            <LatestFeaturedTaskCard
                                key={task._id}
                                task={task}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}