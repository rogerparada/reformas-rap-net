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

	if (!response.isSuccess) {
		return {
			success: false,
			message: "Login Error",
			errors: null,
			serverErrors: [response.getError().message],
			data: fields,
		};
	}

	const cookieStore = await cookies();

	cookieStore.set("jwt", response.getValue().token, {
		maxAge: 60 * 60 * 24 * 7, // 1 week,
		path: "/",
		httpOnly: true,
		// domain: process.env.NODE_ENV === "production" ? "reformasrap.com" : "localhost",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
	});
	redirect("/gestion");
};
