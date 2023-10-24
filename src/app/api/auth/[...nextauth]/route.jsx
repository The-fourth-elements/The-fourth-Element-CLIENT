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
				const form = {
					email: credentials.Email,
					password: credentials.Password,
				};
				//esto se usa para el logueo del usuario ya registrado.
				//manejo la peticiondel front (/api/auth) y la preparo para el back
				const response = await postData(
					`${process.env.API_BACKEND}login`,
					form
				);
				// Decodifica el token JWT para obtener el ID
				const decodedToken = Jwt.decode(response.token);
				// CookieOption("idk", {value: "este es el valor"})
				const user = {
					...decodedToken?.data,
				};
				return {
					...user,
					id: user.id.toString(),
				};
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
						await postData(`${process.env.API_BACKEND}auth`, form);
					} else {
						const lol = await postData(`${process.env.API_BACKEND}login`, {
							email: token.email,
							username: token.name,
							provider: true,
						});
						const decodedToken = Jwt.decode(lol?.token);
						console.log(decodedToken);
						if (user) token.user = decodedToken?.data;
						return token;
					}
				} catch (error) {
					console.log(error?.message);
				}
			}
			if (user) token.user = user;
			console.log(token);
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
