"use client";

import { AlertDialog, Button } from "@heroui/react";

export function RejectProposal({ proposal }) {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const handleRejectProposal = async (proposal) => {
        const res = await fetch(`${baseUrl}/api/rejectingProposal/${proposal?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ status: 'rejected' }),
        });

        if (res.ok) {
            window.location.reload();
        }
    };

    return (
        <div className="flex-1">
            <AlertDialog>
                <Button
                    variant="bordered"
                    className="h-11 w-full rounded-xl border-2 border-red-500 bg-red-50/60 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100/80"
                >
                    Reject
                </Button>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>
                                    Reject this proposal?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p>
                                    This will mark the proposal from{' '}
                                    <strong>
                                        {proposal?.freelancerName || proposal?.freelancerEmail || 'this freelancer'}
                                    </strong>{' '}
                                    as rejected. The freelancer will no longer be considered for this task.
                                </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary" className={'rounded-xl border-2 border-gray-500'}>
                                    Cancel
                                </Button>

                                <Button
                                    onClick={() => handleRejectProposal(proposal)}
                                    slot="close"
                                    className={'rounded-xl border-2 border-red-500 bg-red-50/60 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100/80'}
                                >
                                    Reject Proposal
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
}