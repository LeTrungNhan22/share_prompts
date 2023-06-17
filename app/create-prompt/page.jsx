'use client'


import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from 'react'


import Form from "@components/Form"
import { toast } from "react-hot-toast"


const CreatePromptScreen = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch("api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session.user.id,
                    tag: post.tag,
                }),
            })
            // console.log(response);
            if (response.ok) {
                router.push("/");
                toast.success("Prompt created successfully");
            }
        } catch (error) {
            console.log(`Error: ${error}`);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePromptScreen