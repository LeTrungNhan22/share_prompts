/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */

import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/database.js"

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        });
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt, {
            status: 201,
            statusText: 'Created',
        }));
    } catch (error) {
        return new Response(JSON.stringify(error, {
            status: 500,
            statusText: 'Internal Server Error',
        }));

    }
}
