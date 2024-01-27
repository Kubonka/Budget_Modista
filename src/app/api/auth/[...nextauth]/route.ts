//export { GET, POST } from "../../../../auth";

import { upsertUser } from "@/actions/users";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const handler = NextAuth({
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			// const userId = await getUserByEmail(token?.email as string);
			// token.id = userId;
			return token;
		},
		async session({ session }) {
			// const userId = await getUserByEmail(session.user.email as string);
			// session.user.userId = userId;
			//console.log("session", session);
			return session;
		},
		async signIn({ profile }) {
			try {
				if (!profile) return false;
				const result = await upsertUser({
					email: profile.email as string,
					name: profile.name as string,
					image: profile.image as string,
				});
				if ((result.status = "SUCCESS")) return true;
				return false;
			} catch (error) {
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };

//$
/*{
  iss: 'https://accounts.google.com',
  azp: '499260713203-i7cjtgsfphcrla87r29u8cuiv8kcishg.apps.googleusercontent.com',
  aud: '499260713203-i7cjtgsfphcrla87r29u8cuiv8kcishg.apps.googleusercontent.com',
  sub: '105189079140311574735',
  email: 'srbetito85@gmail.com',
  email_verified: true,
  at_hash: '6QXAgt6z9NxslX_BTYO6gw',
  name: 'Alberto Martinez',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocL5gVibAJ4X1DJmuqZZLx8neM8EJe4P-6HWfthSlDYO=s96-c',
  given_name: 'Alberto',
  family_name: 'Martinez',
  locale: 'en',
  iat: 1704660849,
  exp: 1704664449
}*/

// /*{
// 	providers: [
// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_ID as string,
// 			clientSecret: process.env.GOOGLE_SECRET as string,
// 		}),
// 	],
// 	callbacks: {
// 		async session({ session }) {
// 			return session;
// 		},
// 		async signIn({ profile }) {
// 			console.log("a", profile);
// 			console.log(process.env.GOOGLE_ID);
// 			console.log(process.env.GOOGLE_SECRET);
// 			try {
// 				return true;
// 			} catch (error) {
// 				console.log("e", error);
// 				return false;
// 			}
// 		},
// 	},
// }
//*/
