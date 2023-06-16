'use client'

import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from 'react'

import Form from "@components/Form"
import { toast } from "react-hot-toast"

const EditPromptScreen = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })

        }
        if (promptId) getPromptDetails();
    }, [promptId])
    console.log(post);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert("Prompt ID not found");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            })
            console.log(response);
            if (response.ok) {
                toast.success("Prompt updated successfully");
                router.push("/");
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPromptScreen