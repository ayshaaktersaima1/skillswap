const steps = [
    {
        number: '01',
        title: 'Post a Task',
        description:
            'Share what you need done, set your budget, choose a category, and add a clear deadline.',
    },
    {
        number: '02',
        title: 'Get Proposals',
        description:
            'Skilled freelancers review your task and send proposals with pricing, timelines, and experience.',
    },
    {
        number: '03',
        title: 'Hire and Pay',
        description:
            'Choose the right freelancer, start the work, and complete payment through a simple secure flow.',
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-[#F7FAF9] px-5 py-16 md:px-8 md:py-24">
            <div className="mx-auto w-[95%] md:w-[90%]">
                {/* Section Header */}
                <div className="mb-12 flex flex-col gap-8 border-b border-[#DDE7EB] pb-10 md:mb-14 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-[760px]">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#152A38]" />
                            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#52636C]">
                                How It Works
                            </span>
                        </div>

                        <h2 className="text-[40px] font-semibold leading-[48px] tracking-[-0.05em] text-[#10202B] md:text-[58px] md:leading-[66px]">
                            From task to finished work in three simple steps
                        </h2>

                        <p className="mt-5 max-w-[620px] text-[16px] leading-[28px] text-[#52636C] md:text-[18px] md:leading-[30px]">
                            SKILLSWAP keeps the hiring process simple for clients and clear
                            for freelancers, from posting a task to completing the payment.
                        </p>
                    </div>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative">
                            <article className="group min-h-[360px] rounded-[32px] border border-[#DDE7EB] bg-white p-7 shadow-[0_18px_50px_rgba(21,42,56,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#C8D4DA] hover:shadow-[0_28px_70px_rgba(21,42,56,0.12)] md:p-8">
                                {/* Step Number */}
                                <div className="mb-16 flex items-center justify-between">
                                    <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#7A8A92]">
                                        Step {step.number}
                                    </span>

                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#152A38] text-[18px] font-semibold text-white shadow-[0_14px_36px_rgba(21,42,56,0.20)]">
                                        {step.number}
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="text-[30px] font-semibold leading-[38px] tracking-[-0.045em] text-[#10202B]">
                                        {step.title}
                                    </h3>

                                    <p className="mt-5 text-[16px] leading-[28px] text-[#52636C]">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Bottom line */}
                                <div className="mt-10 h-px w-full bg-gradient-to-r from-[#152A38] via-[#C8D4DA] to-transparent" />
                            </article>

                            {/* Desktop Arrow Connector */}
                            {index !== steps.length - 1 && (
                                <div className="pointer-events-none absolute right-[-22px] top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#DDE7EB] bg-[#F7FAF9] text-[#152A38] shadow-[0_10px_30px_rgba(21,42,56,0.06)] lg:flex">
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 12H19M13 6L19 12L13 18"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}