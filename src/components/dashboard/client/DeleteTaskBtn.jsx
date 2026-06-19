'use client';

import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function DeleteTaskBtn({ task, canDelete }) {

    const router = useRouter();

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const handleDelete = async () => {
        const res = await fetch(`${baseUrl}/api/tasks/${task?._id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        });
        router.refresh();
    };

    return (
        <AlertDialog>
            <Button
                variant="danger"
                isDisabled={!canDelete}
                className="h-11 flex-1 rounded-xl text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
                Delete Task
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>
                                Delete task permanently?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            <p className="text-sm leading-6 text-[#52636C]">
                                This will permanently delete{' '}
                                <strong className="text-[#10202B]">
                                    {task?.title}
                                </strong>
                                . This action cannot be undone.
                            </p>
                        </AlertDialog.Body>

                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>

                            <Button
                                slot="close"
                                variant="danger"
                                onPress={handleDelete}
                            >
                                Delete Task
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}