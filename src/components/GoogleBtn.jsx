'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function GoogleBtn({ label = 'Continue with Google' }) {
    const handleGoogleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <div className="w-full">
            <Button
                type="button"
                onPress={handleGoogleLogin}
                variant="bordered"
                className="h-14 w-full rounded-4 border border-white/20 bg-white/10 text-[15px] font-semibold text-white transition hover:border-white/40 hover:bg-white/15"
            >
                <Icon icon="devicon:google" className="text-[22px]" />
                {label}
            </Button>
        </div>
    );
}