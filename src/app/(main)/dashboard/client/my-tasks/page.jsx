import MyTaskCard from '@/components/dashboard/client/MyTaskCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';


const MyTasks = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const { token } = await auth.api.getToken({
        headers: await headers()
    })


    const clientId = session?.user?.id;

    if (!clientId) {
        return (
            <div className="rounded-3xl border border-[#DDE7EB] bg-white p-6">
                <p className="text-sm font-medium text-[#52636C]">
                    Please login to view your tasks.
                </p>
            </div>
        );
    }

    const res = await fetch(`${baseUrl}/api/my-tasks/${clientId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const tasks = await res.json();

    return (
        <div>
            <div className="mb-8">


                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    My Tasks
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
                    View, edit, and manage all tasks you have posted on SkillSwap.
                </p>
            </div>

            {tasks.length === 0 ? (
                <div className="rounded-3xl border border-[#DDE7EB] bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-[#10202B]">
                        No tasks posted yet
                    </h2>

                    <p className="mt-2 text-sm text-[#52636C]">
                        Once you post a task, it will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    {tasks.map((task) => (
                        <MyTaskCard key={task._id} task={task} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTasks;