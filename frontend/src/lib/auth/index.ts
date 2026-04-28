"use server";
import { cookies } from "next/headers";
import { LoginFormValues } from "../../validations/auth";
import { validateToken } from "@/shared/utils";
import { Result } from "@/shared/core/Result";
import { AuthSuccess } from "@/types/apiResponse";

const API_URL = process.env.STRAPI_API_URL || "http://localhost:1337";

export async function loginUserService(userData: LoginFormValues): Promise<Result<AuthSuccess, Error>> {
	const url = `${API_URL}/api/Auth/login`;

	const { username: email, password } = userData;
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		return Result.fail<AuthSuccess, Error>(new Error("Login failed"));
	}
	const data = await response.json();

	return Result.ok(data as AuthSuccess);
}

export async function isAuthenticated(): Promise<string | undefined> {
	const cookiesStore = await cookies();
	const token = cookiesStore.get("jwt")?.value;
	return validateToken(token) ? token : undefined;
}
