"use server";
import { cookies } from "next/headers";
import { LoginFormValues } from "../../validations/auth";

const API_URL = process.env.STRAPI_API_URL || "http://localhost:1337";

export async function loginUserService(userData: LoginFormValues) {
	const url = `${API_URL}/api/Auth/login`;

	try {
		const { username: email, password } = userData;
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error login user:", error);
		throw error;
	}
}

export async function isAuthenticated(): Promise<string | undefined> {
	const cookiesStore = await cookies();
	return cookiesStore.get("jwt")?.value;
}
