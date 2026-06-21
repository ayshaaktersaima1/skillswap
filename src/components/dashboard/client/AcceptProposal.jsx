'use client'
import React from 'react';

const AcceptProposal = ({ proposal }) => {


    const handleAccept = async (proposal) => {

        const res = await fetch('/api/payment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                proposalId: proposal._id,
                taskId: proposal.taskId,
                taskTitle: proposal.taskTitle,
                freelancerName: proposal.freelancerName,
                freelancersId: proposal.freelancersId,
                proposedBudget: proposal.proposedBudget,
            }),
        });

        const data = await res.json();

        if (data.url) {
            window.location.href = data.url;
        }

    }


    return (
        <div className='flex-1'>
            <button
                onClick={() => handleAccept(proposal)}
                type="button"
                className="h-11 w-full rounded-xl bg-[#152A38] text-sm font-semibold text-white transition hover:bg-[#0F202B]"
            >
                Accept
            </button>

        </div>
    );
};

export default AcceptProposal;