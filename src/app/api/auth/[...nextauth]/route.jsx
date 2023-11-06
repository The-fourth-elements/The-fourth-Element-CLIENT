import { postData } from '@/hooks/postData';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import Jwt from 'jsonwebtoken';
export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'iope' },
				password: { label: 'Password', type: 'password' },
				username: { label: 'Username', type: 'text', placeholder: 'iope' },
			},
			async authorize(credentials) {
				try {
					const form = {
						email: credentials.Email,
						password: credentials.Password,
					};
					const response = await postData(
						`${process.env.API_BACKEND}login`,
						form
					);
					if(response?.error){
						throw response;
					}
					const decodedToken = Jwt.decode(response.token);
					const user = {
						...decodedToken?.data,
					};
					return {
						...user,
						id: user.id.toString(),
					};
				} catch (error) {
					console.log(error);
				}
				
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ account, token, user, profile, session }) {
			if (account?.provider == 'google') {
				try {
					const response = await fetch(
						`${process.env.API_BACKEND}user/email?email=${token?.email}`
					);
					const responseParsed = await response.json();
					if (responseParsed?.error) {
						const form = {
							username: user.name,
							email: token?.email,
							providerId: user?.id,
							provider: true,
						};
						const response = await postData(`${process.env.API_BACKEND}auth`, form);
						if(response?.success){
							if(user){
								user.id = response.userId;
							}
						}
					} else {
						const lol = await postData(`${process.env.API_BACKEND}login`, {
							email: token.email,
							username: token.name,
							provider: true,
						});
						const decodedToken = Jwt.decode(lol?.token);
						if (user) token.user = decodedToken?.data;
						return token;
					}
				} catch (error) {
					console.log(error?.message);
				}
			}
			if (user) token.user = user;
			return token;
		},
		async session({ session, token }) {
			session.token = token;
			return session;
		},
	},
	debug: false,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
