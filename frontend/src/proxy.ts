import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const protectedRoutes = ["/gestion"];

function checkIsProtectedRoute(path: string) {
	return protectedRoutes.some((route) => path.startsWith(route));
}

export async function proxy(request: NextRequest) {
	const currentPath = request.nextUrl.pathname;

	const isProtectedRoute = checkIsProtectedRoute(currentPath);

	if (!isProtectedRoute) return NextResponse.next();

	try {
		const cookieStore = await cookies();
		const jwt = cookieStore.get("jwt")?.value;

		if (!jwt) return NextResponse.redirect(new URL("/login", request.url));
		// const response = await fetch(`${API_URL}/api/User/me`, {
		// 	headers: {
		// 		Authorization: `Bearer ${jwt}`,
		// 		"Content-Type": "application/json",
		// 	},
		// });

		// if (response.status === 401) {
		// 	return NextResponse.redirect(new URL("/login", request.url));
		// }

		// const userResponse = await response.json();

		// if (!userResponse) return NextResponse.redirect(new URL("/login", request.url));
		// if (!userResponse?.confirmed) return NextResponse.redirect(new URL("/", request.url));

		return NextResponse.next();
	} catch (error) {
		console.error("Authentication Error", error);
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/gestion", "/gestion/:path*"],
};
