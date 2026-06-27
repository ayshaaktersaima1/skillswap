import MyEarningCard from '@/components/dashboard/freelancer/MyEarningCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const EarningsOfFreelancer = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const freelancersId = session?.user?.id;

    const paymentRes = await fetch(`${baseUrl}/api/paymentInfoFreelancer/${freelancersId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
    const payments = await paymentRes.json();



    return (
        <section className="space-y-6">
            <div>


                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    My Earnings
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#52636C]">
                    A complete breakdown of tasks and payments received.
                </p>
            </div>

            <MyEarningCard payments={payments} />
        </section>
    );
};

export default EarningsOfFreelancer;