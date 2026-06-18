'use client';

import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function GoogleBtn({ label = 'Continue with Google' }) {
    const handleGoogleLogin = () => {
        console.log('Google login clicked');

        // Later you will add Google auth logic here
    };

    return (
        <div className="w-full">
            <Button
                type="button"
                onPress={handleGoogleLogin}
                variant="bordered"
                className="h-14 w-full rounded-[16px] border border-white/20 bg-white/10 text-[15px] font-semibold text-white transition hover:border-white/40 hover:bg-white/15"
            >
                <Icon icon="devicon:google" className="text-[22px]" />
                {label}
            </Button>
        </div>
    );
}