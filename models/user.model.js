/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
/*
 * Author: Le Trung Nhan
 * Birthday:  22/08/2001
 * Role: Frontend Developer
 * Updated at: Wed Jun 14 2023 5:25:25 PM
 */


import { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exists in the system~!"],
        required: [true, "Email is required~!"],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        //     "Username invalid, it should contain 8-20 alphanumeric letters and be unique~!"]
    },
    fullName: {
        type: String,
        required: [true, 'FullName is required!'],
    },
    provider: {
        type: String,
        required: [true, 'Provider is required!'],
    },
    byUser: {
        type: Object,
        required: [true, 'ByUser is required!'],
    },
    image: {
        type: String,
    }
})

const User = models.User || model("User", UserSchema);
// Nếu model User đã tồn tại thì sử dụng lại, nếu chưa tồn tại thì tạo mới, điều này giúp tránh lỗi khi khởi tạo model nhiều lần

export default User;