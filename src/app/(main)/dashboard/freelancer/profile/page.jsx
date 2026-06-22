import EditProfileForm from '@/components/dashboard/freelancer/EditProfileForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const FreelancersProfile = async () => {

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const freelancersId = session?.user?.id;

    const res = await fetch(`${baseUrl}/api/freelancerInfo/${freelancersId}`);

    const freelancer = await res.json();


    return (
        <div>
            <EditProfileForm freelancer={freelancer}></EditProfileForm>
        </div>
    );
};

export default FreelancersProfile;