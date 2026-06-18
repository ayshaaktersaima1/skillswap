import Link from 'next/link';

const topFreelancers = [
    {
        id: '1',
        name: 'Sophia Bennett',
        image: '/assets/freelancers/freelancer-1.jpg',
        skills: ['UI Design', 'Figma', 'Landing Pages'],
        rating: 4.9,
        finishedJobs: 86,
    },
    {
        id: '2',
        name: 'Daniel Carter',
        image: '/assets/freelancers/freelancer-2.jpg',
        skills: ['React', 'Next.js', 'Dashboards'],
        rating: 5.0,
        finishedJobs: 124,
    },
    {
        id: '3',
        name: 'Maya Collins',
        image: '/assets/freelancers/freelancer-3.jpg',
        skills: ['Copywriting', 'SEO', 'Brand Voice'],
        rating: 4.8,
        finishedJobs: 73,
    },
    {
        id: '4',
        name: 'Ethan Brooks',
        image: '/assets/freelancers/freelancer-4.jpg',
        skills: ['Marketing', 'Ads', 'Strategy'],
        rating: 4.9,
        finishedJobs: 98,
    },
];

export default function TopFreelancers() {
    return (
        <section className="bg-[#F7FAF9] px-5 py-16 md:px-8 md:py-24">
            <div className="mx-auto w-[95%] md:w-[90%]">
                {/* Section Header */}
                <div className="mb-12 flex flex-col gap-8 border-b border-[#DDE7EB] pb-10 md:mb-14 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-[760px]">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#152A38]" />
                            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#52636C]">
                                Top Freelancers
                            </span>
                        </div>

                        <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-0.05em] text-[#10202B] md:text-[58px] md:leading-[66px]">
                            Skilled freelancers trusted by clients
                        </h2>

                        <p className="mt-5 max-w-[620px] text-[16px] leading-[28px] text-[#52636C] md:text-[18px] md:leading-[30px]">
                            Discover high-performing freelancers with proven skills, strong
                            ratings, and completed work across the platform.
                        </p>
                    </div>

                    <Link
                        href="/freelancers"
                        className="inline-flex h-12 w-fit items-center justify-center rounded-full border border-[#C8D4DA] bg-white px-7 text-[15px] font-semibold text-[#152A38] shadow-[0_10px_30px_rgba(21,42,56,0.05)] transition hover:border-[#152A38] hover:bg-[#F7FAF9]"
                    >
                        View All Freelancers
                    </Link>
                </div>

                {/* Freelancer Cards */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {topFreelancers.map((freelancer) => (
                        <article
                            key={freelancer.id}
                            className="group overflow-hidden rounded-[30px] border border-[#DDE7EB] bg-white shadow-[0_18px_50px_rgba(21,42,56,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#C8D4DA] hover:shadow-[0_28px_70px_rgba(21,42,56,0.12)]"
                        >
                            {/* Image Area */}
                            <div className="relative h-[260px] overflow-hidden bg-[#E8EEF1]">
                                <img
                                    src={freelancer.image}
                                    alt={freelancer.name}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#061016]/60 via-transparent to-transparent" />

                                <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-xl">
                                    <span className="text-[13px] font-semibold text-white">
                                        ⭐ {freelancer.rating}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-[22px] font-semibold leading-[30px] tracking-[-0.035em] text-[#10202B]">
                                            {freelancer.name}
                                        </h3>

                                        <p className="mt-2 text-[14px] font-medium text-[#52636C]">
                                            {freelancer.finishedJobs} finished jobs
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8EEF1] text-[13px] font-bold text-[#152A38]">
                                        {freelancer.name
                                            .split(' ')
                                            .map((word) => word[0])
                                            .join('')}
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {freelancer.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-[#DDE7EB] bg-[#F7FAF9] px-3 py-1.5 text-[12px] font-semibold text-[#52636C]"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Rating + CTA */}
                                <div className="mt-7 border-t border-[#DDE7EB] pt-5">
                                    <div className="mb-5 flex items-center justify-between">
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A8A92]">
                                                Average Rating
                                            </p>
                                            <p className="mt-2 text-[20px] font-semibold tracking-[-0.03em] text-[#10202B]">
                                                {freelancer.rating}/5.0
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A8A92]">
                                                Jobs
                                            </p>
                                            <p className="mt-2 text-[20px] font-semibold tracking-[-0.03em] text-[#10202B]">
                                                {freelancer.finishedJobs}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/freelancers/${freelancer.id}`}
                                        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#152A38] text-[14px] font-semibold text-white transition hover:bg-[#0F202B]"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}