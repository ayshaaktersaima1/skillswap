const testimonials = [
    {
        id: '1',
        quote:
            'SKILLSWAP made it easy to find a reliable freelancer without going through a long hiring process. I posted the task, reviewed proposals, and had the work delivered on time.',
        name: 'Amelia Rhodes',
        role: 'Startup Founder',
        type: 'Client',
    },
    {
        id: '2',
        quote:
            'The platform feels clean and focused. I can quickly find micro-tasks that match my skills, send proposals, and track my active work from one place.',
        name: 'Leo Martinez',
        role: 'Freelance Developer',
        type: 'Freelancer',
    },
    {
        id: '3',
        quote:
            'For small business tasks, this is exactly what I needed. The process is simple, the freelancers are skilled, and the workflow feels trustworthy.',
        name: 'Nora Williams',
        role: 'Small Business Owner',
        type: 'Client',
    },
];

export default function Testimonials() {
    return (
        <section className="bg-[#F7FAF9] px-5 py-16 md:px-8 md:py-24">
            <div className="mx-auto w-[95%] md:w-[90%]">
                {/* Section Header */}
                <div className="mb-12 flex flex-col gap-8 border-b border-[#DDE7EB] pb-10 md:mb-14 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-[760px]">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#152A38]" />
                            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#52636C]">
                                Testimonials
                            </span>
                        </div>

                        <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-0.05em] text-[#10202B] md:text-[58px] md:leading-[66px]">
                            Trusted by clients and freelancers
                        </h2>

                        <p className="mt-5 max-w-[620px] text-[16px] leading-[28px] text-[#52636C] md:text-[18px] md:leading-[30px]">
                            Real feedback from people using SKILLSWAP to hire faster, find
                            focused work, and complete micro-tasks with confidence.
                        </p>
                    </div>
                </div>

                {/* Review Cards */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    {testimonials.map((item) => (
                        <article
                            key={item.id}
                            className="group flex min-h-[380px] flex-col justify-between rounded-[32px] border border-[#DDE7EB] bg-white p-7 shadow-[0_18px_50px_rgba(21,42,56,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#C8D4DA] hover:shadow-[0_28px_70px_rgba(21,42,56,0.12)] md:p-8"
                        >
                            <div>
                                {/* Quote Icon */}
                                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#152A38] text-[34px] font-serif leading-none text-white shadow-[0_14px_36px_rgba(21,42,56,0.20)]">
                                    “
                                </div>

                                <blockquote className="text-[22px] font-medium leading-[34px] tracking-[-0.035em] text-[#10202B]">
                                    {item.quote}
                                </blockquote>
                            </div>

                            <div className="mt-10 border-t border-[#DDE7EB] pt-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-[#10202B]">
                                            {item.name}
                                        </h3>

                                        <p className="mt-1 text-[14px] font-medium text-[#52636C]">
                                            {item.role}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-[#E8EEF1] px-3 py-1.5 text-[12px] font-semibold text-[#152A38]">
                                        {item.type}
                                    </span>
                                </div>

                                <div className="mt-5 flex items-center gap-1 text-[#152A38]">
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}