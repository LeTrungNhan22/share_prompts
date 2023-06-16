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
        console.log('=> Using existing database connection');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME || 'test',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            isConnected = true;
            console.log(`=> Connected to database ${process.env.DB_NAME} successfully`);
        });

    } catch (error) {
        console.log('=> Error connecting to database: ', error);
    }

}



