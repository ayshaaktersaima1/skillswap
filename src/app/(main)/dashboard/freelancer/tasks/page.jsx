// import FreelancerTaskCard from '@/components/dashboard/freelancer/FreelancerTaskCard';

// const BrowseTasks = async () => {
//     const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

//     const res = await fetch(`${baseUrl}/api/tasks?status=open`, {
//         cache: 'no-store',
//     });

//     const tasks = await res.json();

//     return (
//         <div>
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold tracking-tight text-[#10202B]">
//                     Browse Tasks
//                 </h1>

//                 <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52636C]">
//                     Explore open client tasks and send proposals for the work you want.
//                 </p>
//             </div>

//             {tasks.length === 0 ? (
//                 <div className="rounded-3xl border border-[#DDE7EB] bg-white p-8 text-center shadow-sm">
//                     <h2 className="text-xl font-bold text-[#10202B]">
//                         No open tasks available
//                     </h2>

//                     <p className="mt-2 text-sm text-[#52636C]">
//                         New client tasks will appear here when they are posted.
//                     </p>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
//                     {tasks.map((task) => (
//                         <FreelancerTaskCard key={task._id} task={task} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BrowseTasks;