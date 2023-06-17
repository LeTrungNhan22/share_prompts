/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */

/*
 * Author: Le Trung Nhan
 * Birthday:  22/08/2001
 * Role: Frontend Developer
 * Updated at: Mon Jun 12 2023 2:53:51 PM
 */

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user.model";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,

        }),
    ],
    callbacks: {
        async session({ session }) {
            await connectToDB();
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser?._id; // add id to session
            return session;

        },
        async signIn({ profile, account, user }) {
            try {
                await connectToDB();
                // check if a user exists already with this email
                const userExist = await User.findOne({ email: profile.email });
                // if not, create a new user
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.email.split("@")[0],
                        fullName: profile.name,
                        image: profile.picture,
                        provider: account.provider,
                        byUser: user
                    });

                }
                return true;
            } catch (error) {
                console.log(`Error: ${error}`);
                return false;
            }
        }

    }
});

export { handler as GET, handler as POST }



