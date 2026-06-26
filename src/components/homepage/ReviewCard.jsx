import Image from 'next/image';
import React from 'react';

const ReviewCard = async ({ rev }) => {
    const {
        reviewer_email,
        reviewer_id,
        rating,
        comment,
        created_at,
    } = rev;

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const res = await fetch(`${baseUrl}/api/onlyClient/${reviewer_id}`, {
        cache: 'no-store',
    });

    const clientImg = await res.json();

    const clientImage = clientImg?.image || '';
    const clientEmail = reviewer_email || 'Client';
    const clientInitial = clientEmail.charAt(0).toUpperCase();

    const reviewDate = created_at
        ? new Date(created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
        : 'No date';

    return (
        <article className="relative w-full max-w-full overflow-hidden rounded-3xl border border-[#DDE7EB] bg-white p-5 shadow-sm md:p-6">
            <span className="absolute right-5 top-4 text-4xl font-bold leading-none text-[#152A38]/15">
                ”
            </span>

            <div className="relative z-10">
                <div className="mb-6 flex w-full max-w-full items-center gap-3 pr-8">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#152A38]">
                        {clientImage ? (
                            <Image
                                src={clientImage}
                                alt={clientEmail}
                                fill
                                className="object-cover object-center"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                                {clientInitial}
                            </div>
                        )}
                    </div>

                    <div className="min-w-0 flex-1 overflow-hidden">
                        <h3 className="max-w-full break-all text-sm font-bold leading-5 text-[#10202B]">
                            {clientEmail}
                        </h3>

                        <p className="mt-1 text-xs font-medium text-[#52636C]">
                            Client
                        </p>
                    </div>
                </div>

                <p className="min-h-20 max-w-full break-words text-sm italic leading-6 text-[#52636C]">
                    {comment || 'No review comment.'}
                </p>

                <div className="mt-7">
                    <div className="mb-4 flex items-center gap-1 text-sm text-[#152A38]">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>
                                {star <= Number(rating || 0) ? '★' : '☆'}
                            </span>
                        ))}
                    </div>

                    <p className="text-xs font-bold text-[#52636C]">
                        {reviewDate}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default ReviewCard;