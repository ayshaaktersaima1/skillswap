"use client";

import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SubmitWorkModal = ({ task }) => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const router = useRouter();

    console.log(task)

    const [loading, setLoading] = useState(false);

    const handleSubmitDeliverable = async (e) => {
        e.preventDefault();

        const form = e.target;
        const deliverableUrl = form.deliverable_url.value;

        setLoading(true);

        const res = await fetch(`${baseUrl}/api/tasks/${task?._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                status: "completed",
                deliverable_url: deliverableUrl,
            }),
        });

        setLoading(false);

        if (res.ok) {
            router.refresh();
        }
    };

    return (
        <Modal>
            <Button className="h-11 rounded-xl bg-[#152A38] px-5 text-sm font-semibold text-white transition hover:bg-[#0F202B]">
                Submit Deliverable
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>Submit Deliverable</Modal.Heading>

                            <p className="mt-1.5 text-sm leading-6 text-[#52636C]">
                                Provide a link to your completed work for{" "}
                                <span className="font-semibold text-[#10202B]">
                                    {task?.title}
                                </span>
                                . This can be a Google Docs link, GitHub repo, live site, or any other URL.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form
                                    onSubmit={handleSubmitDeliverable}
                                    className="flex flex-col gap-4"
                                >
                                    <TextField
                                        className="w-full"
                                        name="deliverable_url"
                                        type="url"
                                        isRequired
                                    >
                                        <Label>Deliverable URL</Label>
                                        <Input placeholder="https://github.com/..." />
                                    </TextField>

                                    <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
                                        <p className="text-sm leading-6 text-yellow-700">
                                            <span className="font-bold">Note:</span>{" "}
                                            Once you mark this task as completed, the status will be changed to completed.
                                        </p>
                                    </div>

                                    <Modal.Footer>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-[#152A38] text-white"
                                        >
                                            {loading ? "Submitting..." : "Mark as Completed"}
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default SubmitWorkModal;