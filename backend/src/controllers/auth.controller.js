import {
    JWT_SECRET,
} from "../config/config.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// const getAccessToken = async (code) => {
//     const params = new URLSearchParams({
//         grant_type: "authorization_code",
//         code,
//         redirect_uri: REDIRECT_URI,
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//     });

//     const response = await fetch(
//         "https://www.linkedin.com/oauth/v2/accessToken",
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: params.toString(),
//         }
//     );

//     if (!response.ok) {
//         const errorResponse = await response.text(); // or response.json() if available
//         console.error("LinkedIn Error Response:", errorResponse);
//         throw new Error(`Failed to fetch access token: ${errorResponse}`);
//     }

//     const accessToken = await response.json();

//     return accessToken.access_token;
// };

// const getUserData = async (accessToken) => {
//     const response = await fetch("https://api.linkedin.com/v2/userinfo", {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//             "X-Restli-Protocol-Version": "2.0.0", // ← REQUIRED HEADER
//         },
//     });

//     if (!response.ok) {
//         const errorResponse = await response.text(); // or response.json() if available
//         console.error("LinkedIn Error Response:", errorResponse);
//         throw new Error(`Failed to fetch user data: ${errorResponse}`);
//     }

//     const userData = await response.json();

//     return userData;
// };

// export const linkedInCallback = async (req, res) => {
//     try {
//         const { code } = req.query;

//         const accessToken = await getAccessToken(code);

//         //get user data
//         const userData = await getUserData(accessToken);

//         if (!userData) {
//             return res.status(500).json({
//                 message: "Failed to fetch user data",
//             });
//         }

//         let user;

//         user = await User.findOne({
//             email: userData.email,
//         });

//         if (!user) {
//             user = await new User({
//                 name: userData.name,
//                 email: userData.email,
//                 phoneNo: userData?.phone,

//                 profilePicture: userData?.picture,
//             });
//             await user.save();
//         }

//         const token = jwt.sign(
//             {
//                 name: user.name,
//                 email: user.email,
//                 avatar: user.picture,
//             },
//             JWT_SECRET
//         );

//         res.cookie("token", token, {
//             httpOnly: true,
//         });

//         res.redirect("http://localhost:3000/profile");
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             error: error.message,
//         });
//     }
// };

export const getUser = async (req, res) => {
    try {
        const token = req.query.token;
        console.log(token);
        
        
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.status(200).json({
            message: "successfully fetched user",
            user: {
                name: user.name,
                email: user.email,
                phoneNo: user.phoneNo,
                profilePicture: user.profilePicture,
            },
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const SignIn = async (req, res) => {
    try {
        const { email, name, image, linkedinId } = req.body;

        if (!email || !name || !linkedinId) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name: name,
                email: email,
                linkedinId: linkedinId,
                profilePicture: image,
            });
            await user.save();
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.profilePicture,
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );


        return res.status(200).json({
            success: true,
            redirectUrl: `/profile/${token}`,
        });
    } catch (error) {
        console.error("SignIn Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
