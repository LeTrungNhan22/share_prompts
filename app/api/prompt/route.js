/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/database.js"


export const GET = async (req) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {
            status: 200,
            statusText: 'Get Prompts Success',
        });
    } catch (error) {
        return new Response(
            "Failed to get prompts", {
            status: 500,
            statusText: 'Internal Server Error',
        });
    }
}

