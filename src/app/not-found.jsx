import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-[100vh] items-center justify-center bg-[#F7FAF9] px-5 py-10 md:px-8">
            <div className="w-full max-w-3xl rounded-3xl border border-[#DDE7EB] bg-white p-8 text-center shadow-xl md:p-12">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#152A38] text-xl font-black text-white">
                    SS
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#52636C]">
                    Page Not Found
                </p>

                <h1 className="mt-5 text-8xl font-black leading-none tracking-tight text-[#152A38] md:text-9xl">
                    404
                </h1>

                <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#10202B] md:text-4xl">
                    This page does not exist
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#52636C] md:text-base">
                    The page you are looking for may have been moved, deleted, or the
                    link may be incorrect.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex h-13 items-center justify-center rounded-xl bg-[#152A38] px-8 text-sm font-bold text-white no-underline transition hover:bg-[#0F202B]"
                    >
                        Back to Home
                    </Link>

                    <Link
                        href="/allTasks"
                        className="inline-flex h-13 items-center justify-center rounded-xl border border-[#DDE7EB] bg-white px-8 text-sm font-bold text-[#152A38] no-underline transition hover:bg-[#F7FAF9]"
                    >
                        Browse Tasks
                    </Link>
                </div>
            </div>
        </div>
    );
}