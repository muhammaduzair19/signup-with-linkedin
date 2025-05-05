// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import axios from "axios";

export default NextAuth({
    providers: [
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            issuer: "https://www.linkedin.com",
            authorization: {
                params: {
                    scope: "openid profile email",
                    client_id: process.env.LINKEDIN_CLIENT_ID,
                    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/linkedin`,
                },
            },
            jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                // Send user data to Express backend
                const response = await axios.post(
                    `${process.env.BACKEND_URL}/api/v1/auth/signin`,
                    {
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        accessToken: account.access_token, // Optional: store access token
                    }
                );

                if (response.status !== 200) {
                    throw new Error("Failed to save user");
                }

                return true;
            } catch (error) {
                console.error(
                    "User save error:",
                    error.response?.data || error.message
                );
                return false;
            }
        },
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
});
