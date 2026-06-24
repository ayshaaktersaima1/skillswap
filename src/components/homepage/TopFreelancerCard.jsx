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
        averageRating,
        rating,
        hourlyRate,
    } = freelancer;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const finishedJobsRes = await fetch(`${baseUrl}/api/finishedJobs/${_id}`);

    const finishedJobs = await finishedJobsRes.json();

    console.log('jojo', finishedJobs)


    const freelancerRating = averageRating || rating || 0;
    const totalFinishedJobs = finishedJobs.length || 0;


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
                    {skills?.map((skill) => (
                        <span
                            key={skill}
                            className="rounded-full border border-[#DDE7EB] bg-[#F7FAF9] px-3 py-1 text-xs font-semibold text-[#52636C]"
                        >
                            {skill}
                        </span>
                    ))}
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