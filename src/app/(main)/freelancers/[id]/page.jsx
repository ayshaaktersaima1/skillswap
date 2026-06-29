import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FreelancerDetailsPage = async ({ params }) => {
    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const freelancerRes = await fetch(`${baseUrl}/api/freelancerInfo/${id}`, {
        cache: 'no-store',
    });

    const freelancer = await freelancerRes.json();


    const freelancersEmail = freelancer?.email;

    const reviewsRes = await fetch(`${baseUrl}/api/reviews/${freelancersEmail}`, {
        cache: 'no-store',
    });

    const reviews = await reviewsRes.json();


    const totalReviews = Array.isArray(reviews) ? reviews.length : 0;

    const averageRating =
        totalReviews > 0
            ? (
                reviews.reduce((total, review) => {
                    return total + Number(review.rating || 0);
                }, 0) / totalReviews
            ).toFixed(1)
            : 0;

    const initials = freelancer?.name
        ?.split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2);

    return (
        <section className="bg-[#F7FAF9] px-5 py-12 md:px-8 md:py-16">
            <div className="mx-auto w-[95%] md:w-[90%]">
                <div className="mb-8">
                    <Link
                        href="/freelancers"
                        className="text-sm font-semibold text-[#152A38] no-underline"
                    >
                        ← Back to Freelancers
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="overflow-hidden rounded-3xl border border-[#DDE7EB] bg-white shadow-sm">
                        <div className="relative h-80 w-full bg-[#EAF1F3]">
                            {freelancer?.image ? (
                                <Image
                                    src={freelancer.image}
                                    alt={freelancer?.name || 'Freelancer'}
                                    fill
                                    className="object-cover object-center"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#152A38] text-2xl font-bold text-white">
                                        {initials || 'F'}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-[#10202B]">
                                {freelancer?.name || 'Unnamed Freelancer'}
                            </h1>

                            <p className="mt-2 text-lg font-bold text-[#10202B]">
                                ${freelancer?.hourlyRate || 0}
                                <span className="text-sm font-medium text-[#52636C]">
                                    /hour
                                </span>
                            </p>

                            <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#F7FAF9] p-4">
                                <p className="text-sm font-semibold text-[#10202B]">
                                    ⭐ {averageRating}/5
                                </p>

                                <p className="text-sm font-semibold text-[#52636C]">
                                    {totalReviews} reviews
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-[#10202B]">
                                About Freelancer
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-[#52636C]">
                                {freelancer?.bio || 'No bio added yet.'}
                            </p>

                            <div className="mt-6">
                                <h3 className="text-sm font-semibold uppercase tracking-widest text-[#7A8A92]">
                                    Skills
                                </h3>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {freelancer?.skills?.length > 0 ? (
                                        freelancer.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full border border-[#DDE7EB] bg-[#F7FAF9] px-3 py-1 text-xs font-semibold text-[#52636C]"
                                            >
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="rounded-full border border-[#DDE7EB] bg-[#F7FAF9] px-3 py-1 text-xs font-semibold text-[#52636C]">
                                            No skills
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm">
                            <h2 className="text-2xl font-bold text-[#10202B]">
                                Client Reviews
                            </h2>

                            {totalReviews === 0 ? (
                                <div className="mt-5 rounded-2xl bg-[#F7FAF9] p-5 text-center">
                                    <h3 className="text-lg font-bold text-[#10202B]">
                                        No reviews yet
                                    </h3>

                                    <p className="mt-2 text-sm text-[#52636C]">
                                        Client reviews will appear here after completed tasks.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-5 space-y-4">
                                    {reviews.map((review) => (
                                        <div
                                            key={review._id}
                                            className="rounded-2xl border border-[#DDE7EB] bg-[#F7FAF9] p-5"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-sm font-bold text-[#10202B]">
                                                        {review?.reviewer_email}
                                                    </p>

                                                    <p className="mt-1 text-xs text-[#52636C]">
                                                        {review?.created_at
                                                            ? new Date(review.created_at).toLocaleDateString()
                                                            : 'No date'}
                                                    </p>
                                                </div>

                                                <p className="text-sm font-bold text-[#10202B]">
                                                    ⭐ {review?.rating}/5
                                                </p>
                                            </div>

                                            <p className="mt-4 text-sm leading-6 text-[#52636C]">
                                                {review?.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FreelancerDetailsPage;