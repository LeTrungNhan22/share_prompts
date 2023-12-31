'use client'

import Profile from "@components/Profile"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ProfileScreen = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if (session?.user.id) fetchPosts();
    }, [session]);


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {

        const hasConfirmed = confirm(`Are you sure you want to delete "${post._id}"?`);
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: "DELETE",
                }).then(() => toast.success("Post deleted!"));
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        }
    }
    return (
        <>
            <Profile
                name="My"
                description="Welcome to my personalized profile page!~"
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default ProfileScreen