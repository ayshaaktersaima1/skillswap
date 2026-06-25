'use client'

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const ReviewForm = ({ task }) => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(5);

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        const form = e.target;
        const comment = form.comment.value;

        const reviewInfo = {
            task_id: task?._id,
            reviewer_email: task?.clientEmail,
            reviewer_id: task?.clientId,
            rating: Number(rating),
            comment,
            completedByEmail: task?.completedByEmail,
            completedByName: task?.completedByName,
            created_at: new Date().toISOString(),
        };
        const { data: tokenData } = await authClient.token();

        const res = await fetch(`${baseUrl}/api/reviews`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`

            },
            body: JSON.stringify(reviewInfo),
        });

        if (res.ok) {
            alert('Review submitted');
            setShowForm(false);
            form.reset();
            setRating(5);
        }
    };

    return (
        <div className="mt-5">
            {!showForm ? (
                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="h-11 w-full rounded-xl bg-[#152A38] text-sm font-semibold text-white"
                >
                    Leave a Review
                </button>
            ) : (
                <form
                    onSubmit={handleSubmitReview}
                    className="rounded-2xl border border-[#DDE7EB] bg-[#F7FAF9] p-4"
                >
                    <h3 className="text-lg font-bold text-[#10202B]">
                        Leave a Review
                    </h3>

                    <div className="mt-4 flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="text-2xl"
                            >
                                {star <= rating ? '★' : '☆'}
                            </button>
                        ))}
                    </div>

                    <textarea
                        name="comment"
                        required
                        rows="4"
                        placeholder="Write your review..."
                        className="mt-4 w-full rounded-xl border border-[#DDE7EB] bg-white p-3 text-sm outline-none"
                    />

                    <div className="mt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="h-10 flex-1 rounded-xl border border-[#DDE7EB] bg-white text-sm font-semibold text-[#152A38]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="h-10 flex-1 rounded-xl bg-[#152A38] text-sm font-semibold text-white"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ReviewForm;