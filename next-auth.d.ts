import { DefaultJWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		id: string;
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			message?: IAuthenticationErrror | null;
			user: Users | null;
		};
	}
}

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** The user's name. */
			userId: string;
			name: string;
			email: string;
			image: string;
		};
	}
}
