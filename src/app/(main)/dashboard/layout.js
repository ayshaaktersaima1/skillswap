import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardMobileSidebar from '@/components/dashboard/DashboardMobileSidebar';

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#F7FAF9]">
            {/* Sidebar: md and larger */}
            <aside className="hidden h-screen w-72 shrink-0 overflow-y-auto border-r border-[#DDE7EB] bg-white md:block">
                <DashboardSidebar />
            </aside>

            {/* Content Area */}
            <div className="flex min-w-0 flex-1 flex-col">
                {/* Navbar */}
                <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b border-[#DDE7EB] bg-white px-5 md:px-6">
                    {/* Mobile Menu: only small devices */}
                    <div className="md:hidden">
                        <DashboardMobileSidebar />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-[#10202B]">
                            Dashboard
                        </h1>
                        <p className="hidden text-xs font-medium text-[#52636C] sm:block">
                            Manage your SkillSwap workspace
                        </p>
                    </div>
                </header>

                {/* Main */}
                <main className="flex-1 overflow-y-auto p-5 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}