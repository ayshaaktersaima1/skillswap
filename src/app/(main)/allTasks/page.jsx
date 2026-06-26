import FreelancerTaskCard from "@/components/dashboard/freelancer/FreelancerTaskCard";
import LatestFeaturedTaskCard from "@/components/homepage/LatestFeaturedTaskCard";
import { PaginationBasic } from "@/components/PageNo";

const BrowseTasks = async ({ searchParams }) => {

    let { page } = await searchParams;
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;



    if (!page) {
        page = 1;
    }

    const res = await fetch(`${baseUrl}/api/tasks?status=open&page=${page}`);

    const data = await res.json();
    const tasks = data?.data;
    const pageNo = data?.page;
    const totalPage = data?.totalPage;


    return (
        <section className="bg-[#F7FAF9] px-5 py-12 md:px-8 md:py-16">
            <div className="mx-auto w-[95%] md:w-[90%]">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-[#10202B]">
                        Browse Tasks
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                        Explore open client tasks and send proposals for the work you want.
                    </p>
                </div>

                {tasks.length === 0 ? (
                    <div className="rounded-3xl border border-[#DDE7EB] bg-white p-8 text-center shadow-sm">
                        <h2 className="text-xl font-bold text-[#10202B]">
                            No open tasks available
                        </h2>

                        <p className="mt-2 text-sm text-[#52636C]">
                            New client tasks will appear here when they are posted.
                        </p>
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {tasks.map((task) => (
                                <LatestFeaturedTaskCard
                                    key={task._id}
                                    task={task}
                                />
                            ))}
                        </div>
                        <PaginationBasic pageNo={pageNo} totalPage={totalPage}></PaginationBasic>

                    </div>

                )}
            </div>
        </section>
    );
};

export default BrowseTasks;