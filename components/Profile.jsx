import React from 'react'
import PromptCard from "./PromptCard"
import PromptCardSkeleton from "./PromptCardSkeleton ";

const Profile = ({ name, description, data, handleEdit, handleDelete
}) => {
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">
                    {name} Profile
                </span>
            </h1>
            <p className="text-left desc">
                {description}
            </p>
            <div
                className="prompt_layout mt-10"
            >
                {

                    data.length === 0 ? (
                        <>
                            {[...Array(3)].map((_, index) => (
                                <PromptCardSkeleton key={index} />
                            ))}</>
                    ) : (
                        data.map((post) => (
                            <PromptCard
                                key={post._id}
                                post={post}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        ))
                    )
                }
            </div>
        </section>
    )
}

export default Profile