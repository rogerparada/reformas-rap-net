"use server";

import z from "zod";
import { LoginFromSchema } from "../validations/auth";
import { auth } from "../lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormState } from "../types";

export const loginUserAction = async (prevState: FormState, formData: FormData): Promise<FormState> => {
	const fields = {
		username: formData.get("username") as string,
		password: formData.get("password") as string,
	};

	const result = LoginFromSchema.safeParse(fields);
	if (!result.success) {
		return {
			success: false,
			message: "Validation Error",
			serverErrors: null,
			errors: z.flattenError(result.error).fieldErrors,
			data: fields,
		};
	}

	const response = await auth.loginUserService(result.data);

	if (!response || response.errors) {
		return {
			success: false,
			message: "Login Error",
			errors: null,
			serverErrors: response.errors,
			data: fields,
		};
	}

	const cookieStore = await cookies();
	console.log(response);
	cookieStore.set("jwt", response.token, {
		maxAge: 60 * 60 * 24 * 7, // 1 week,
		path: "/",
		httpOnly: true,
		// domain: process.env.NODE_ENV === "production" ? "reformasrap.com" : "localhost",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
	});
	redirect("/gestion");
};
