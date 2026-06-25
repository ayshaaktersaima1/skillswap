import ReviewCard from './ReviewCard';

export default async function Testimonials() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const res = await fetch(`${baseUrl}/api/reviews`, {
        cache: 'no-store',
    });

    const data = await res.json();

    const reviews = Array.isArray(data) ? data.slice(0, 6) : [];

    return (
        <section className="bg-white px-5 py-16 md:px-8 md:py-24">
            <div className="mx-auto w-[95%] md:w-[90%]">
                <div className="mb-12 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#52636C]">
                        Testimonials
                    </p>

                    <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#10202B] md:text-5xl">
                        What clients are saying
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#52636C]">
                        Real reviews from clients after completed work on SKILLSWAP.
                    </p>
                </div>

                {reviews.length === 0 ? (
                    <div className="rounded-3xl border border-[#DDE7EB] bg-[#F7FAF9] p-8 text-center">
                        <h3 className="text-xl font-bold text-[#10202B]">
                            No reviews yet
                        </h3>

                        <p className="mt-2 text-sm text-[#52636C]">
                            Client reviews will appear here after completed tasks.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {reviews.map((rev) => (
                            <ReviewCard
                                key={rev._id}
                                rev={rev}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}