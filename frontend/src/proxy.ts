import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "./utils";

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

		const isValid = validateToken(jwt);

		if (!isValid) {
			cookieStore.delete("jwt");
			return NextResponse.redirect(new URL("/login", request.url));
		}

		return NextResponse.next();
	} catch (error) {
		console.error("Authentication Error", error);
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/gestion", "/gestion/:path*"],
};
