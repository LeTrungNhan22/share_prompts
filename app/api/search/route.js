/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
// [] Implement search 
// search by prompt
// search by tag
// search by username

import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/database.js"


export const GET = async (req, res) => {
    //get search query from url
    const search = req.query.search;

    try {
        await connectToDB();

        //find prompts that match search query
        const prompts = await Prompt.find({
            $or: [
                { prompt: { $regex: search, $options: 'i' } },
                { tag: { $regex: search, $options: 'i' } },
                { creator: { $regex: search, $options: 'i' } }
            ]
        }).populate('creator', 'username', 'User');//populate creator field with username from User model
        return new Response(JSON.stringify(prompts), {
            status: 200,
            statusText: 'Get Prompt Success',
        });
    } catch (error) {
        return new Response(
            "Failed to get prompts", {
            status: 500,
            statusText: 'Internal Server Error',
        });
    }
}
