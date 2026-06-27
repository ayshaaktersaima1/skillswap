import { auth } from '@/lib/auth';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TopFreelancerCard = async ({ freelancer }) => {
    const {
        _id,
        name,
        image,
        skills,
        hourlyRate,
        email
    } = freelancer;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;



    const finishedJobsRes = await fetch(`${baseUrl}/api/finishedJobs/${_id}`);

    const finishedJobs = await finishedJobsRes.json();

    const reviewsRes = await fetch(`${baseUrl}/api/reviews/${email}`);

    const reviews = await reviewsRes.json();

    const totalFinishedJobs = Array.isArray(finishedJobs)
        ? finishedJobs.length
        : 0;

    const freelancerRating = Array.isArray(reviews) && reviews.length > 0
        ? (
            reviews.reduce((total, review) => {
                return total + Number(review.rating || 0);
            }, 0) / reviews.length
        ).toFixed(1)
        : 0;

    return (
        <div className="h-full overflow-hidden rounded-2xl border border-[#DDE7EB] bg-white shadow-md transition duration-300 hover:-translate-y-2">
            <div className="relative h-56 w-full bg-[#EAF1F3]">
                <Image
                    src={image}
                    alt={name || 'Freelancer'}
                    fill
                    className="object-cover object-center"
                />
            </div>

            <div className="p-6">
                <h3 className="line-clamp-1 text-xl font-bold text-[#10202B]">
                    {name}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                    {skills?.length > 0 ? (
                        skills.map((skill) => (
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

                <div className="mt-6 flex items-center justify-between border-t border-[#DDE7EB] pt-5">
                    <p className="text-sm font-semibold text-[#10202B]">
                        ⭐ {freelancerRating}/5
                    </p>

                    <p className="text-sm font-semibold text-[#52636C]">
                        {totalFinishedJobs} finished jobs
                    </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                    <p className="text-lg font-bold text-[#10202B]">
                        ${hourlyRate || 0}
                        <span className="text-sm font-medium text-[#52636C]">
                            /hour
                        </span>
                    </p>

                    <Link href={`/freelancers/${_id}`}>
                        <Button className="h-11 rounded-xl bg-[#152A38] px-5 text-sm font-semibold text-white">
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopFreelancerCard;