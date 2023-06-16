import React from 'react'
import Feed from '@components/Feed'

const Home = () => {
    return (
        <section
            className="w-full flex-center flex-col"
        >
            <h1
                className="head_text text-center"
            >
                Discover & Share
                <br className="max-md:hidden" />
                <span
                    className="orange_gradient text-center"
                >  AI-Powred Prompts</span>
            </h1>
            <p
                className="desc text-center"
            >
                The AI-Powered Prompts are generated by a GPT-3 model trained and fine-tuned on the best-selling books of all time. The model is trained to generate prompts that are open-ended and can be used to write stories, poems, or anything else you can think of.
            </p>
            {/* Feed */}
            <Feed />
        </section>
    )
}

export default Home