import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(request) {
    try {
        const headersList = await headers();
        const origin = headersList.get('origin');

        const userSession = await auth.api.getSession({
            headers: headersList,
        });

        const user = userSession?.user;

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();

        const {
            proposalId,
            taskId,
            taskTitle,
            freelancerName,
            freelancerEmail,
            freelancersId,
            proposedBudget,
        } = body;

        if (!proposalId || !taskId || !proposedBudget) {
            return NextResponse.json(
                { error: 'Missing payment information' },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,

            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: taskTitle || 'SkillSwap Task Payment',
                            description: freelancerName
                                ? `Payment for proposal from ${freelancerName}`
                                : 'Payment for accepted freelancer proposal',
                        },
                        unit_amount: Math.round(Number(proposedBudget) * 100),
                    },
                    quantity: 1,
                },
            ],

            metadata: {
                clientId: user?.id,
                clientEmail: user?.email,
                proposalId,
                taskId,
                taskTitle,
                freelancerId: freelancersId,
                freelancerEmail,
                freelancerName,
            },

            mode: 'payment',

            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/dashboard/client/proposals`,
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        );
    }
}