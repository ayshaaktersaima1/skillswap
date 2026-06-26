import Link from 'next/link';
import TopFreelancerCard from './TopFreelancerCard';

export default async function TopFreelancers() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const res = await fetch(`${baseUrl}/api/freelancers`);

    const allUsers = await res.json();
    const users = allUsers.slice(0, 6);


    return (
        <section className="bg-[#F7FAF9] px-5 py-16 md:px-8 md:py-24">
            <div className="mx-auto w-[95%] md:w-[90%]">
                <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                            Top Freelancers
                        </p>

                        <h2 className="text-3xl font-bold text-[#10202B] md:text-5xl">
                            Skilled freelancers trusted by clients
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#52636C] md:text-base">
                            Discover freelancers with strong skills, public profiles,
                            and professional service details.
                        </p>
                    </div>

                    <Link
                        href="/freelancers"
                        className="inline-flex h-11 w-fit items-center justify-center rounded-xl border border-[#DDE7EB] bg-white px-5 text-sm font-semibold text-[#152A38]"
                    >
                        View All Freelancers
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {users.length === 0 ? (
                        <div className="rounded-2xl border border-[#DDE7EB] bg-white p-8 text-center shadow-md md:col-span-2 xl:col-span-4">
                            <h3 className="text-xl font-bold text-[#10202B]">
                                No freelancers available
                            </h3>

                            <p className="mt-2 text-sm text-[#52636C]">
                                Freelancer profiles will appear here after registration.
                            </p>
                        </div>
                    ) : (
                        users.map((freelancer) => (
                            <TopFreelancerCard
                                key={freelancer._id}
                                freelancer={freelancer}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}