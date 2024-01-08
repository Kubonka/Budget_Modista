// import NextAuth from "next-auth";
// import authConfig from "@/auth.config";
// import prisma from "@/lib/db/db";

// export const {
// 	handlers: { GET, POST },
// 	auth,
// 	signIn,
// 	signOut,
// } = NextAuth({
// 	callbacks: {
// 		async signIn({ profile }) {
// 			try {
// 				console.log("profile", profile);
// 				return true;
// 			} catch (error) {
// 				console.log("error", error);
// 				return false;
// 			}
// 		},
// 		async jwt({ token }) {
// 			return token;
// 		},
// 		async session({ token, session }) {
// 			return session;
// 		},
// 	},
// 	session: { strategy: "jwt" },
// 	...authConfig,
// });
