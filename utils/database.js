/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
/*
 * Author: Le Trung Nhan
 * Birthday:  22/08/2001
 * Role: Frontend Developer
 * Updated at: Wed Jun 14 2023 5:01:27 PM
 */


import mongoose from "mongoose";

let isConnected = false; // Biến kiểm tra kết nối

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('=> database is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME || 'test',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;

        console.log('=> database connected successfully');

    } catch (error) {
        console.log('=> Error connecting to database: ', error);
    }

}



