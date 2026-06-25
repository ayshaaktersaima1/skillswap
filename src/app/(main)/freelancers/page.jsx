import TopFreelancerCard from '@/components/homepage/TopFreelancerCard';
import React from 'react';

const FreelancersPage = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;



    const res = await fetch(`${baseUrl}/api/freelancers`);

    const freelancers = await res.json();

    return (
        <section className="bg-[#F7FAF9] px-5 py-12 md:px-8 md:py-16">
            <div className="mx-auto w-[95%] md:w-[90%]">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                        Browse Freelancers
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                        Find Skilled Freelancers
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                        Explore freelancer profiles, skills, ratings, and completed work.
                    </p>
                </div>

                {freelancers.length === 0 ? (
                    <div className="rounded-3xl border border-[#DDE7EB] bg-white p-8 text-center shadow-sm">
                        <h2 className="text-xl font-bold text-[#10202B]">
                            No freelancers available
                        </h2>

                        <p className="mt-2 text-sm text-[#52636C]">
                            Freelancer profiles will appear here after registration.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {freelancers.map((freelancer) => (
                            <TopFreelancerCard
                                key={freelancer._id}
                                freelancer={freelancer}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FreelancersPage;