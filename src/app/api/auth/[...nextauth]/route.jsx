import { postData } from "@/hooks/postData";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "iope" },
                password: { label: "Password", type: "password" },
                username: { label: "Username", type: "text", placeholder: "iope" },
            },
            async authorize(credentials) {
                const form = {
                    email: credentials.email,
                    password: credentials.password,

                }
                //esto se usa para el logueo del usuario ya registrado. 
                //manejo la peticiondel front (/api/auth) y la propago al back para 
                const response = await postData('http://localhost:3001/login', form );
                return response;
            },
        }),  
    ],
    debug: false,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}