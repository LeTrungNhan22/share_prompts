/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/database.js"
// GET /api/prompt/[id] (read)

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) return new Response(
            "Prompt not found", {
            status: 404,
            statusText: 'Not Found',
        });
        return new Response(JSON.stringify(prompt), {
            status: 200,
            statusText: 'Get Prompt Success',
        });
    } catch (error) {
        return new Response(
            "Failed to get prompt", {
            status: 500,
            statusText: 'Internal Server Error',
        });
    }
}

// PATCH /api/prompt/[id] (update)
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Response(
            "Prompt not found", {
            status: 404,
            statusText: 'Not Found',
        });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {
            status: 200,
            statusText: 'Update Prompt Success',
        });

    } catch (error) {
        return new Response(
            "Failed to update prompt", {
            status: 500,
            statusText: 'Internal Server Error',
        });
    }
}


// DELETE /api/prompt/[id] (delete)

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response(
            "Delete Prompt Success", {
            status: 200,
            statusText: 'Delete Prompt Success',
        });

    } catch (error) {
        return new Response(
            "Failed to delete prompt", {
            status: 500,
            statusText: 'Internal Server Error',
        });

    }
}