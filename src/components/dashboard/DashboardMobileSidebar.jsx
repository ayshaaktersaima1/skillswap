'use client';

import { useState } from 'react';
import { Bars } from '@gravity-ui/icons';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardMobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex h-10 items-center gap-2 rounded-xl border border-[#DDE7EB] bg-white px-3 text-sm font-semibold text-[#152A38]"
            >
                <Bars className="h-5 w-5" />
                Menu
            </button>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <button
                        type="button"
                        aria-label="Close sidebar"
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/40"
                    />

                    {/* Drawer */}
                    <aside className="relative h-screen w-72 border-r border-[#DDE7EB] bg-white shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#DDE7EB] bg-white text-lg font-bold text-[#152A38]"
                        >
                            ×
                        </button>

                        <DashboardSidebar closeDrawer={() => setIsOpen(false)} />
                    </aside>
                </div>
            )}
        </>
    );
}