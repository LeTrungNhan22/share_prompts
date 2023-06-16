'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React from 'react';
import { toast } from "react-hot-toast";

const PromptCart = ({ post, handleTagClick, handleEdit, handleDelete, searchText }) => {
    const [copied, setCopied] = React.useState('');
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const handleCopy = () => {
        toast.success("Prompt copied successfully");
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => { setCopied('') }, 3000);
    }

    return (
        <div
            className="prompt_card hover:rounded-xl hover:shadow-lg transition duration-200 ease-in-out"
        >
            <div
                className="flex justify-between items-start gap-5"
            >
                <div
                    className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
                >

                    <Image
                        src={post.creator.image}
                        alt="user_image"
                        width={50}
                        height={50}
                        className="rounded-full object-contain"
                    />

                    <div


                        className="flex flex-col"
                    >
                        <Link href={
                            session?.user.id === post.creator._id ?
                                '/profile' :
                                `/user/profile/${post.creator._id}`
                        }>
                            <h3 className="
                            font-satoshi 
                            font-semibold
                             text-gray-800
                             hover:underline
                             "
                            >

                                {post.creator.username}


                            </h3>
                        </Link>
                        <p className="font-inter text-sm text-gray-500">
                            {post.creator.email}
                        </p>
                    </div>
                </div>

                <div
                    className="copy_btn"
                    onClick={handleCopy}
                >
                    <Image
                        src={
                            copied === post.prompt
                                ? "/assets/icons/tick.svg"
                                : "/assets/icons/copy.svg"}
                        height={15}
                        width={15}
                        alt="copy"
                    />



                </div>

            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">
                {
                    post.prompt.split(' ').map((word, index) => {
                        if (word.toLowerCase().includes(searchText?.toLowerCase().split(' ')[0])) {
                            return (
                                <span
                                    key={index}
                                    className="bg-yellow-200"
                                >
                                    {word}{' '}
                                </span>
                            )
                        }
                        return (
                            <span
                                key={index}
                            >
                                {word}{' '}
                            </span>
                        )
                    }
                    )
                }
            </p>
            <p
                className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
                #{post.tag}
            </p>
            {session?.user.id === post.creator._id &&
                pathName === '/profile' ?
                (<div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">

                    <p
                        className="font-inter text-sm blue_gradient cursor-pointer"
                        onClick={() => handleEdit(post)}
                    >
                        Edit
                    </p>
                    <p
                        className="font-inter text-sm orange_gradient cursor-pointer"
                        onClick={() => handleDelete(post)}
                    >
                        Delete
                    </p>
                </div>)
                :
                (<>

                </>)}

        </div>
    )
}

export default PromptCart