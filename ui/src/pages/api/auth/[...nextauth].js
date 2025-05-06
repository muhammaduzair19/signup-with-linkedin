import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

export default NextAuth({
    providers: [
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid profile email",
                    client_id: process.env.LINKEDIN_CLIENT_ID,
                    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/linkedin`,
                },
            },
            issuer: "https://www.linkedin.com/oauth",
            jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            },
            client: {
                token_endpoint_auth_method: "client_secret_post",
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
        async signIn({ user, account, profile }) {
            try {
                const response = await fetch(
                    `${process.env.BACKEND_URL}/api/v1/auth/signin`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                            linkedinId: user.id,
                            image: user.image,
                        }),
                        credentials: "include", 
                    }
                );

                const data = await response.json();
                console.log(data);

                if (data.success) {
                    return data.redirectUrl || `/profile/${data.token}`;
                }

                return false;
            } catch (error) {
                console.error("SignIn Error:", error);
                return false;
            }
        },
    },
});
