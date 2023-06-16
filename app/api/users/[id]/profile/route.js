/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import User from "@models/user.model";
import { connectToDB } from "@utils/database.js"


export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const user = await User.findById(params.id);
        if (!user) return new Response(
            "User not found", {
            status: 404,
            statusText: 'Not Found User',
        });
        return new Response(JSON.stringify(user), {
            status: 200,
            statusText: 'Get User Success',
        });
    } catch (error) {
        return new Response(
            "Failed to get user", {
            status: 500,
            statusText: 'Internal Server Error',
        });
    }
}
