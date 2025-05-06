import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        linkedinId: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
        },
        profilePicture: {
            type: String,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
