import { getToken } from "next-auth/jwt";
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	publicRoutes,
	authRoutes,
} from "./routes";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const { nextUrl } = req;
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	//? begin
	//console.log("session", session);
	//console.log("isApiAuthRoute", isApiAuthRoute);
	//console.log("isAuthRoute", isAuthRoute);
	//console.log("isPublicRoute", isPublicRoute);
	if (isApiAuthRoute) return NextResponse.next();
	if (isAuthRoute) {
		if (session) {
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
		}
		return NextResponse.next();
	}
	if (session && isPublicRoute) {
		return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
	}
	if (!session && !isPublicRoute) {
		const requestedPage = req.nextUrl.pathname;
		const url = req.nextUrl.clone();
		url.pathname = "/auth/login";
		//url.search = `p=${requestedPage}`;
		return NextResponse.redirect(url);
	}
	return NextResponse.next();
}
export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// import NextAuth from "next-auth";
// import authConfig from "@/auth.config";
// import {
// 	DEFAULT_LOGIN_REDIRECT,
// 	apiAuthPrefix,
// 	publicRoutes,
// 	authRoutes,
// } from "./routes";

// const { auth } = NextAuth(authConfig);
// export default auth((req) => {
// 	const { nextUrl } = req;
// 	const isLoggedIn = !!req.auth;
// 	console.log("isLoggedIn", isLoggedIn, "url", nextUrl);
// 	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
// 	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
// 	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
// 	if (isApiAuthRoute) return null;
// 	if (isAuthRoute) {
// 		if (isLoggedIn) {
// 			//return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
// 			console.log("logged");
// 		}
// 		return null;
// 	}
// 	if (!isLoggedIn && !isPublicRoute) {
// 		//		return Response.redirect(new URL("/auth/login", nextUrl));
// 	}
// 	return null;
// });

// // Optionally, don't invoke Middleware on some paths
// export const config = {
// 	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
