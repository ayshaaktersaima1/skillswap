'use client';

import { authClient } from '@/lib/auth-client';
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from '@heroui/react';
import React from 'react';

const EditProfileForm = ({ freelancer }) => {

    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const freelancersInfo = Object.fromEntries(formData.entries());

        const { data: tokenData } = await authClient.token();


        const res = await fetch(`${baseUrl}/api/freelancerInfo/${freelancer?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(freelancersInfo)

        })

        alert('successful')
    };




    const skillsValue = Array.isArray(freelancer?.skills)
        ? freelancer.skills.join(', ')
        : freelancer?.skills || '';

    return (
        <Form
            onSubmit={onSubmit}
            className="flex w-full rounded-3xl border border-[#DDE7EB] bg-white p-8 shadow-sm md:p-10 flex-col gap-5"
        >
            <div className="mb-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#52636C]">
                    Freelancer Profile
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#10202B]">
                    Edit Profile
                </h1>

                <p className="mt-2 text-sm leading-6 text-[#52636C]">
                    Update your public freelancer details anytime.
                </p>
            </div>

            <TextField
                name="name"
                type="text"
                defaultValue={freelancer?.name}
                isRequired
            >
                <Label>Name</Label>
                <Input placeholder="Enter your name" />
                <FieldError />
            </TextField>

            <TextField
                name="image"
                type="url"
                defaultValue={freelancer?.image}
                isRequired
            >
                <Label>Profile Photo Link</Label>
                <Input placeholder="Enter your profile photo link" />
                <FieldError />
            </TextField>

            <TextField
                name="skills"
                type="text"
                defaultValue={skillsValue}
                isRequired
            >
                <Label>Skills</Label>
                <Input placeholder="React, Node.js, MongoDB" />
                <Description>
                    Separate skills with commas.
                </Description>
                <FieldError />
            </TextField>

            <TextField
                name="bio"
                type="text"
                defaultValue={freelancer?.bio}
                isRequired
            >
                <Label>Bio</Label>
                <Input placeholder="Write a short professional bio" />
                <FieldError />
            </TextField>

            <TextField
                name="hourlyRate"
                type="number"
                defaultValue={freelancer?.hourlyRate}
                isRequired
            >
                <Label>Hourly Rate (USD)</Label>
                <Input placeholder="15" />
                <FieldError />
            </TextField>

            <div className="flex w-full gap-2">
                <Button
                    type="submit"
                    className="mt-5 h-12 w-full rounded-xl bg-[#152A38] text-white"
                >
                    Update Profile
                </Button>
            </div>
        </Form>
    );
};

export default EditProfileForm;