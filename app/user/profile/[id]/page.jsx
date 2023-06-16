'use client'

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from 'react'


const UserProfileScreen = () => {
    const router = useRouter();
    const pathname = usePathname();
    const useId = pathname.split("/")[3];
    const [userProfile, setUserProfile] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const { data: session } = useSession();




    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/users/${useId}/profile`)
            const data = await response.json()
            setUserProfile(data)
        }
        if (useId) {
            fetchUser();
            fetchPosts(useId);
        }
    }, [useId]);




    const fetchPosts = async (userId) => {
        const response = await fetch(`/api/users/${userId}/posts`);
        const data = await response.json();
        setUserPosts(data);
    }

    // console.log(userProfile);
    // console.log(userPosts);





    return (
        <div>
            <Profile
                name={userProfile.username}
                description={`
                Welcome to ${userProfile.fullName}'s personalized profile page!~
             `}
                data={userPosts}
            />

        </div>
    )
}

export default UserProfileScreen