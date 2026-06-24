// import Link from 'next/link';

// const FreelancerTaskCard = ({ task }) => {
//     const formattedDeadline = task?.deadline
//         ? new Date(task.deadline).toLocaleDateString()
//         : 'No deadline';

//     return (
//         <article className="rounded-3xl border border-[#DDE7EB] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
//             <div className="mb-5 flex items-start justify-between gap-4">
//                 <div>
//                     <span className="rounded-full bg-[#E8EEF1] px-3 py-1 text-xs font-semibold text-[#152A38]">
//                         {task?.category}
//                     </span>

//                     <h2 className="mt-4 text-xl font-bold leading-7 tracking-tight text-[#10202B]">
//                         {task?.title}
//                     </h2>
//                 </div>

//                 <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
//                     Open
//                 </span>
//             </div>

//             <p className="line-clamp-3 text-sm leading-6 text-[#52636C]">
//                 {task?.description}
//             </p>

//             <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#DDE7EB] pt-5">
//                 <div>
//                     <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
//                         Budget
//                     </p>

//                     <p className="mt-1 text-xl font-bold text-[#10202B]">
//                         ${task?.budget}
//                     </p>
//                 </div>

//                 <div>
//                     <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
//                         Deadline
//                     </p>

//                     <p className="mt-2 text-sm font-semibold text-[#10202B]">
//                         {formattedDeadline}
//                     </p>
//                 </div>
//             </div>

//             <div className="mt-5 rounded-2xl bg-[#F7FAF9] p-4">
//                 <p className="text-xs font-semibold uppercase tracking-widest text-[#7A8A92]">
//                     Client
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-[#10202B]">
//                     {task?.clientName || 'Client'}
//                 </p>
//             </div>

//             <Link
//                 href={`/allTasks/${task?._id}`}
//                 className="mt-6 flex h-11 items-center justify-center rounded-xl bg-[#152A38] text-sm font-semibold text-white no-underline transition hover:bg-[#0F202B]"
//             >
//                 View Details & Send Proposal
//             </Link>
//         </article>
//     );
// };

// export default FreelancerTaskCard;